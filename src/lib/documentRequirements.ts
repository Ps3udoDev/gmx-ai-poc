export interface DocumentRequirement {
    id: string;
    title: string;
    description?: string;
    multiple?: boolean;
    accept?: string;
    optional?: boolean;
}

export const requiredDocuments: Record<string, DocumentRequirement[]> = {
    fisica_nacional: [
        { id: "id_oficial", title: "Identificación Oficial", description: "INE, Pasaporte, Cédula Profesional, etc.", accept: "image/*,application/pdf" },
        { id: "curp", title: "Constancia de CURP", accept: "image/*,application/pdf", optional: true },
        { id: "rfc", title: "Cédula de Situación Fiscal (CSF)", multiple: true, accept: "image/*,application/pdf" },
        { id: "fiel", title: "Comprobante de FIEL", description: "Opcional si cuenta con ella", accept: "image/*,application/pdf", optional: true },
        { id: "domicilio", title: "Comprobante de Domicilio", description: "Luz, Agua, Teléfono, no mayor a 3 meses", accept: "image/*,application/pdf", optional: true },
        { id: "cif", title: "Cédula de Identificación Fiscal", multiple: true, accept: "image/*,application/pdf", optional: true }
    ],
    fisica_extranjera: [
        { id: "id_oficial", title: "Identificación Personal Institucional" },
        { id: "curp_ext", title: "Constancia de CURP / CIF" },
        { id: "fiel", title: "Comprobante de FIEL", description: "Si aplica o está disponible" },
        { id: "domicilio", title: "Comprobante de Domicilio", description: "Recibo de servicios en territorio nacional" },
        { id: "migratorio", title: "Documento de Calidad Migratoria" },
        { id: "estancia", title: "Acreditación de Estancia Legal", description: "Si vive en país de origen" }
    ],
    moral_nacional: [
        { id: "acta", title: "Acta Constitutiva" },
        { id: "rfc_moral", title: "Cédula del RFC (Moral)" },
        { id: "domicilio_moral", title: "Comprobante de Domicilio Fiscal" },
        { id: "poderes", title: "Poderes del Representante Legal" },
        { id: "id_representante", title: "Identificación del Representante" },
        { id: "estructura", title: "Estructura Corporativa Interna", description: "Organigrama" },
        { id: "control", title: "Identificación de Control", description: "Para accionistas con más del 25%" }
    ],
    moral_extranjera: [
        { id: "existencia", title: "Acreditación de Existencia Legal", description: "Apostillada o legalizada" },
        { id: "tax_id", title: "Identificación Fiscal o Equivalente" },
        { id: "nombramiento", title: "Acreditación del Representante", description: "Apostillada o legalizada" },
        { id: "id_representante", title: "Identificación del Representante" },
        { id: "domicilio_ext", title: "Comprobante de Domicilio" },
        { id: "poderes_ext", title: "Poderes del Representante", description: "Apostillada o legalizada" }
    ]
};
