import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import { promises as fs } from "fs";
import path from "path";
import { mockData, pdfMap } from "@/lib/mockData";

export async function POST(request: Request) {
    try {
        const { personaType, extractedData } = await request.json();

        if (!personaType || !pdfMap[personaType as keyof typeof pdfMap]) {
            return NextResponse.json(
                { error: "Invalid or missing personaType" },
                { status: 400 }
            );
        }

        const typeKey = personaType as keyof typeof pdfMap;
        const fileName = pdfMap[typeKey];
        
        // Load PDF Document
        const pdfPath = path.join(process.cwd(), "src", "lib", "templates", "pdf", fileName);
        const pdfBytes = await fs.readFile(pdfPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const form = pdfDoc.getForm();

        // Helper strictly to set fields without failing if they don't exist
        const setPdfField = (fieldName: string, value: string | boolean) => {
            if (value === undefined || value === null || value === "") return;
            try {
                if (typeof value === "boolean") {
                    const checkField = form.getCheckBox(fieldName);
                    if (checkField && value) checkField.check();
                } else {
                    const field = form.getTextField(fieldName);
                    if (field) field.setText(value.toString());
                }
            } catch (e) {
                // Ignore missing fields inside specific PDF variations
            }
        };

        const tryMultipleFields = (fieldNames: string[], value: string | boolean) => {
            fieldNames.forEach(name => setPdfField(name, value));
        };

        const injectDateDigits = (dateStr: string, isBirthDate: boolean) => {
             // dateStr format: YYYY-MM-DD
             const parts = dateStr.split("-");
             if (parts.length < 3) return;
             
             const year = parts[0];   
             const month = parts[1];  
             const day = parts[2];    
             
             const s = isBirthDate ? "a" : ""; // Add suffix for secondary dates
             
             tryMultipleFields([`Día1${s}`, `Día1c`], day[0] || "");
             tryMultipleFields([`Día2${s}`, `Día2c`], day[1] || "");
             tryMultipleFields([`Mes1${s}`, `Mes1c`], month[0] || "");
             tryMultipleFields([`Mes2${s}`, `Mes2c`], month[1] || "");
             tryMultipleFields([`Año1${s}`, `año1${s}`, `Año1c`], year[0] || "");
             tryMultipleFields([`Año2${s}`, `año2${s}`, `Año2c`], year[1] || "");
             tryMultipleFields([`Año3${s}`, `año3${s}`, `Año3c`], year[2] || "");
             tryMultipleFields([`Año4${s}`, `año4${s}`, `Año4c`], year[3] || "");
        };

        // Static Hardcoded Agent Metadata 
        tryMultipleFields(["Nombre del agente", "Agente"], "AGENTE DEMO GMX");
        tryMultipleFields(["Nombre del ejecutivo", "Ejecutivo de la cuenta", "Ejecutivo"], "EJECUTIVO DEMO GMX");
        
        // Emulate today's precise Agent Date Document Time
        const today = new Date();
        const y = today.getFullYear().toString();
        const m = (today.getMonth() + 1).toString().padStart(2, '0');
        const d = today.getDate().toString().padStart(2, '0');
        injectDateDigits(`${y}-${m}-${d}`, false);

        if (extractedData) {
            // Identidad
            tryMultipleFields(["Nombre", "Razón social", "Razoón social"], extractedData.nombreCompleto);
            if (extractedData.nombreCompleto) {
                const parts = extractedData.nombreCompleto.split(" ");
                tryMultipleFields(["Apellido paterno"], parts[1] || "");
                tryMultipleFields(["Apellido materno"], parts.length > 2 ? parts.slice(2).join(" ") : "");
            }

            tryMultipleFields(["RFC"], extractedData.rfc);
            tryMultipleFields(["CURP"], extractedData.curp);
            tryMultipleFields(["mail", "Correo electrónico"], extractedData.email);
            tryMultipleFields(["Tel 1", "Tel1", "Teléfono", "Tel"], extractedData.telefono);

            // Domicilio Granular
            tryMultipleFields(["Calle", "calle", "Dirección"], extractedData.calle || extractedData.direccion);
            tryMultipleFields(["Núm ext", "Núm Ext"], extractedData.numExt);
            tryMultipleFields(["Col", "Colonia"], extractedData.colonia);
            tryMultipleFields(["CP"], extractedData.cp);
            tryMultipleFields(["Ciudad población", "Ciudad o población", "Ciudad"], extractedData.ciudad);
            tryMultipleFields(["Entidad federativa", "Entidad federativa domi"], extractedData.estado);

            // Nuevos Campos (Nacionalidad, Fechas, País, PEP, Giro, Sellos)
            if (extractedData.firmaElectronica) {
                tryMultipleFields(["Firma electrónica", "Firma", "firma electronica"], extractedData.firmaElectronica);
                // Also label signature lines with the name + digital seal metadata
                tryMultipleFields(["Nombre y Firma del Cliente Contratante", "Nombre y Firma del Representante Legal"], `${extractedData.nombreCompleto} (Firma Digital SAT: ${extractedData.firmaElectronica.substring(0,18)}...)`);
            } else {
                 tryMultipleFields(["Nombre y Firma del Cliente Contratante", "Nombre y Firma del Representante Legal"], extractedData.nombreCompleto);
            }
            
            if (extractedData.fechaNacimiento) {
                injectDateDigits(extractedData.fechaNacimiento, true);
            }
            tryMultipleFields(["Nacionalidad"], extractedData.nacionalidad);
            tryMultipleFields(["Entidad federativa nac", "Entidad"], extractedData.entidadNacimiento);
            tryMultipleFields(["País nac", "País Nacimiento"], extractedData.paisNacimiento);
            tryMultipleFields(["Giro", "Actividad"], extractedData.giro);
            tryMultipleFields(["Monto mensual declarado", "Monto"], extractedData.montoMensual);
            tryMultipleFields(["Último cargo PPE", "Último cargo PEP'S"], extractedData.pepCargo);
        }
        // Flatten form so it becomes uneditable and prints firmly
        form.flatten();

        // Save and send as response
        const modifiedPdfBytes = await pdfDoc.save();

        return new NextResponse(modifiedPdfBytes as unknown as BodyInit, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename="cedula-${personaType}.pdf"`,
            },
        });
    } catch (error) {
        console.error("Error generating PDF:", error);
        return NextResponse.json(
            { error: "Error processing the PDF generation" },
            { status: 500 }
        );
    }
}
