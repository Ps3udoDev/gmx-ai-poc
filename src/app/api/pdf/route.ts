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
                const fParts = extractedData.fechaNacimiento.split("-");
                if (fParts.length >= 3) {
                    tryMultipleFields(["Día1", "Día1a"], fParts[2]);
                    tryMultipleFields(["Mes1", "Mes1a"], fParts[1]);
                    tryMultipleFields(["Año1", "año1", "Año1a"], fParts[0]);
                }
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
