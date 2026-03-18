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
        const baseData = mockData[typeKey];
        
        // Merge base mock data with actual extracted AI data
        const dataToInject: Record<string, any> = { ...baseData };

        if (extractedData) {
            if (extractedData.nombreCompleto) {
                if ("Nombre" in dataToInject && "Apellido paterno" in dataToInject) {
                    const parts = extractedData.nombreCompleto.split(" ");
                    dataToInject["Nombre"] = parts[0] || "";
                    dataToInject["Apellido paterno"] = parts[1] || "";
                    if (parts.length > 2) {
                        dataToInject["Apellido materno"] = parts.slice(2).join(" ");
                    } else {
                        dataToInject["Apellido materno"] = "";
                    }
                } else if ("Razón social" in dataToInject) {
                    dataToInject["Razón social"] = extractedData.nombreCompleto;
                } else if ("Razoón social" in dataToInject) {
                    dataToInject["Razoón social"] = extractedData.nombreCompleto;
                }
                
                // Override signature name
                if ("Nombre y Firma del Cliente Contratante" in dataToInject) {
                    dataToInject["Nombre y Firma del Cliente Contratante"] = `${extractedData.nombreCompleto} (Firma Digital Electrónica)`;
                } else if ("Nombre y Firma del Representante Legal" in dataToInject) {
                    dataToInject["Nombre y Firma del Representante Legal"] = `${extractedData.nombreCompleto} (Firma Digital Electrónica)`;
                }
            }
            
            if (extractedData.rfc) {
                // Keep the exact key name it had
                if ("RFC" in dataToInject) dataToInject["RFC"] = extractedData.rfc;
            }
            
            if (extractedData.direccion) {
                if ("Calle" in dataToInject) {
                    dataToInject["Calle"] = extractedData.direccion;
                } else if ("calle" in dataToInject) {
                    dataToInject["calle"] = extractedData.direccion;
                } else if ("Dirección" in dataToInject) {
                    dataToInject["Dirección"] = extractedData.direccion;
                }
            }

            if (extractedData.curp) {
                if ("CURP" in dataToInject) {
                    dataToInject["CURP"] = extractedData.curp;
                }
            }

            if (extractedData.email) {
                if ("mail" in dataToInject) {
                    dataToInject["mail"] = extractedData.email;
                }
            }
        }

        // Read the PDF template
        const pdfPath = path.join(process.cwd(), "src", "lib", "templates", "pdf", fileName);
        const pdfBytes = await fs.readFile(pdfPath);

        // Load PDF Document
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const form = pdfDoc.getForm();

        // Fill form fields
        for (const [key, value] of Object.entries(dataToInject) as [string, any][]) {
            try {
                const field = form.getTextField(key);
                if (field) {
                    field.setText(value as string);
                }
            } catch (e) {
                // Field might not exist or might not be a text field; ignore and continue
                try {
                    const checkField = form.getCheckBox(key);
                    if (checkField && value === true) {
                        checkField.check();
                    }
                } catch (innerError) {
                    // Ignore
                }
            }
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
