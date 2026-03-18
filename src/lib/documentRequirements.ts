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
        { id: "id_oficial", title: "Identificación Oficial", description: "INE, Pasaporte, Cédula Profesional, etc.", accept: "application/pdf" },
        { id: "curp", title: "Constancia de CURP", accept: "image/*,application/pdf", optional: true },
        { id: "rfc", title: "Cédula de Situación Fiscal (CSF)", multiple: true, accept: "image/*,application/pdf" },
        { id: "fiel", title: "Comprobante de FIEL", description: "Opcional si cuenta con ella", accept: "image/*,application/pdf", optional: true },
        { id: "domicilio", title: "Comprobante de Domicilio", description: "Luz, Agua, Teléfono, no mayor a 3 meses", accept: "application/pdf", optional: true },
        { id: "cif", title: "Cédula de Identificación Fiscal", multiple: true, accept: "application/pdf", optional: true }
    ],
    fisica_extranjera: [
        { id: "id_oficial", title: "Identificación Personal Institucional", accept: "application/pdf" },
        { id: "curp_ext", title: "Constancia de CURP / CIF", accept: "application/pdf" },
        { id: "fiel", title: "Comprobante de FIEL", description: "Si aplica o está disponible", accept: "image/*,application/pdf" },
        { id: "domicilio", title: "Comprobante de Domicilio", description: "Recibo de servicios en territorio nacional", accept: "application/pdf" },
        { id: "migratorio", title: "Documento de Calidad Migratoria", accept: "image/*,application/pdf" },
        { id: "estancia", title: "Acreditación de Estancia Legal", description: "Si vive en país de origen", accept: "image/*,application/pdf" }
    ],
    moral_nacional: [
        { id: "acta", title: "Acta Constitutiva", accept: "application/pdf" },
        { id: "rfc_moral", title: "Cédula del RFC (Moral)", accept: "application/pdf" },
        { id: "domicilio_moral", title: "Comprobante de Domicilio Fiscal", accept: "application/pdf" },
        { id: "poderes", title: "Poderes del Representante Legal", accept: "application/pdf" },
        { id: "id_representante", title: "Identificación del Representante", accept: "application/pdf" },
        { id: "estructura", title: "Estructura Corporativa Interna", description: "Organigrama", accept: "image/*,application/pdf" },
        { id: "control", title: "Identificación de Control", description: "Para accionistas con más del 25%", accept: "image/*,application/pdf" }
    ],
    moral_extranjera: [
        { id: "existencia", title: "Acreditación de Existencia Legal", description: "Apostillada o legalizada", accept: "application/pdf" },
        { id: "tax_id", title: "Identificación Fiscal o Equivalente", accept: "application/pdf" },
        { id: "nombramiento", title: "Acreditación del Representante", description: "Apostillada o legalizada", accept: "application/pdf" },
        { id: "id_representante", title: "Identificación del Representante", accept: "application/pdf" },
        { id: "domicilio_ext", title: "Comprobante de Domicilio", accept: "application/pdf" },
        { id: "poderes_ext", title: "Poderes del Representante", description: "Apostillada o legalizada", accept: "application/pdf" }
    ]
};
