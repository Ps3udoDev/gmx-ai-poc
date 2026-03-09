import { create } from "zustand";

export type PersonaType =
    | "fisica_nacional"
    | "fisica_extranjera"
    | "moral_nacional"
    | "moral_extranjera"
    | null;

export type ValidationStatus =
    | "idle"
    | "extracting"
    | "manual_review"
    | "approved"
    | "rejected";

export interface ExtractedData {
    nombreCompleto: string;
    rfc: string;
    direccion: string;
    confidence: number;
}

interface AppState {
    // Flow State
    personaType: PersonaType;
    documentsUploaded: number;
    folio: string | null;

    // Validation State
    validationStatus: ValidationStatus;
    extractionProgress: number;
    extractedData: ExtractedData;

    // Actions
    setPersonaType: (type: PersonaType) => void;
    setDocumentsUploaded: (count: number) => void;
    generateFolio: () => void;

    startValidation: () => void;
    setValidationProgress: (progress: number) => void;
    setValidationStatus: (status: ValidationStatus) => void;
    setExtractedData: (data: Partial<ExtractedData>) => void;
    resetFlow: () => void;
}

const generateRandomFolio = () => {
    const num = Math.floor(10000 + Math.random() * 90000);
    return `GMX-${num}-${new Date().getFullYear()}`;
};

export const useAppStore = create<AppState>((set) => ({
    personaType: null,
    documentsUploaded: 0,
    folio: null,

    validationStatus: "idle",
    extractionProgress: 0,
    extractedData: {
        nombreCompleto: "",
        rfc: "",
        direccion: "",
        confidence: 0,
    },

    setPersonaType: (type) => set({ personaType: type }),
    setDocumentsUploaded: (count) => set({ documentsUploaded: count }),
    generateFolio: () => set({ folio: generateRandomFolio() }),

    startValidation: () =>
        set({ validationStatus: "extracting", extractionProgress: 0 }),
    setValidationProgress: (progress) => set({ extractionProgress: progress }),
    setValidationStatus: (status) => set({ validationStatus: status }),
    setExtractedData: (data) =>
        set((state) => ({
            extractedData: { ...state.extractedData, ...data },
        })),
    resetFlow: () =>
        set({
            personaType: null,
            documentsUploaded: 0,
            folio: null,
            validationStatus: "idle",
            extractionProgress: 0,
            extractedData: {
                nombreCompleto: "",
                rfc: "",
                direccion: "",
                confidence: 0,
            },
        }),
}));
