import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import { promises as fs } from "fs";
import path from "path";
import { mockData, pdfMap } from "@/lib/mockData";

export async function POST(request: Request) {
    try {
        const { personaType } = await request.json();

        if (!personaType || !pdfMap[personaType as keyof typeof pdfMap]) {
            return NextResponse.json(
                { error: "Invalid or missing personaType" },
                { status: 400 }
            );
        }

        const typeKey = personaType as keyof typeof pdfMap;
        const fileName = pdfMap[typeKey];
        const dataToInject = mockData[typeKey];

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
