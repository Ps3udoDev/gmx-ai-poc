import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

interface CedulaModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CedulaModal({ isOpen, onClose }: CedulaModalProps) {
    const { folio, extractedData, personaType } = useAppStore();
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isOpen || !personaType) return;

        let active = true;
        setIsLoading(true);

        fetch("/api/pdf", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ personaType }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load PDF");
                return res.blob();
            })
            .then((blob) => {
                if (!active) return;
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching PDF:", err);
                setIsLoading(false);
            });

        return () => {
            active = false;
        };
    }, [isOpen, personaType]);

    // Cleanup object URL when modal closes
    useEffect(() => {
        if (!isOpen && pdfUrl) {
            URL.revokeObjectURL(pdfUrl);
            setPdfUrl(null);
        }
    }, [isOpen, pdfUrl]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-6xl w-11/12 bg-slate-100 h-[90vh] flex flex-col overflow-hidden p-0 gap-0 border-0">
                {/* Header */}
                <DialogHeader className="px-6 py-4 bg-white border-b border-slate-200 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-2xl">
                            picture_as_pdf
                        </span>
                        <DialogTitle className="text-xl font-bold">
                            Vista Previa: Cédula del Asegurado
                        </DialogTitle>
                    </div>
                </DialogHeader>

                {/* PDF Document Area */}
                <div className="flex-1 overflow-hidden w-full flex justify-center bg-slate-200/50 p-4">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
                            <span className="material-symbols-outlined text-4xl animate-spin text-primary">
                                refresh
                            </span>
                            <p className="font-medium animate-pulse">Generando Cédula Oficial y Rellenando Formato...</p>
                        </div>
                    ) : pdfUrl ? (
                        <iframe
                            src={pdfUrl}
                            className="w-full h-full rounded-xl shadow-lg border border-slate-300 bg-white"
                            title="Vista Previa PDF Cédula GMX"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-rose-500">
                            <span className="material-symbols-outlined text-4xl">
                                error
                            </span>
                            <p className="font-medium">Hubo un error al generar la cédula oficial.</p>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <DialogFooter className="px-6 py-4 bg-white border-t border-slate-200 sm:justify-between items-center w-full shadow-lg z-10">
                    <Button variant="outline" className="gap-2" asChild disabled={!pdfUrl}>
                        <a href={pdfUrl || "#"} download={`cedula-${folio}.pdf`}>
                            <span className="material-symbols-outlined text-xl">download</span>
                            Descargar PDF Generado
                        </a>
                    </Button>
                    <div className="flex gap-4">
                        <DialogClose asChild>
                            <Button variant="ghost">Cerrar</Button>
                        </DialogClose>
                        <Button className="gap-2 shadow-lg shadow-primary/20 bg-primary">
                            <span className="material-symbols-outlined text-xl">
                                digital_out_of_home
                            </span>
                            Enviar a Firma Digital
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
