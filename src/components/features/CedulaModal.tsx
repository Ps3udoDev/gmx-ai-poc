import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";

interface CedulaModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CedulaModal({ isOpen, onClose }: CedulaModalProps) {
    const { folio, extractedData, personaType } = useAppStore();

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
                <div className="flex-1 overflow-y-auto w-full flex justify-center py-8">
                    <div className="bg-white shadow-xl ring-1 ring-slate-900/5  p-12 relative flex flex-col">
                        {/* Branding Header */}
                        <div className="flex justify-between items-start mb-12">
                            <div className="flex items-center gap-2 text-primary">
                                <span className="material-symbols-outlined text-4xl">shield</span>
                                <div className="font-black text-2xl tracking-tighter">
                                    GMX SEGUROS
                                </div>
                            </div>
                            <div className="text-right text-xs text-slate-400">
                                <p>FECHA: {new Date().toLocaleDateString("es-MX")}</p>
                                <p>FOLIO: {folio}</p>
                            </div>
                        </div>

                        {/* Document Title */}
                        <div className="text-center mb-10">
                            <h1 className="text-2xl font-bold text-slate-900 underline underline-offset-8 decoration-primary/30">
                                CÉDULA DE INFORMACIÓN DEL ASEGURADO
                            </h1>
                        </div>

                        {/* Dynamic Content */}
                        <div className="space-y-6 text-sm text-slate-800 leading-relaxed">
                            <section>
                                <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1 mb-3">
                                    1. DATOS GENERALES DEL TITULAR
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase">
                                            Nombre Completo / Razón Social
                                        </p>
                                        <p className="font-bold text-slate-900">
                                            {extractedData.nombreCompleto || "Dato Pendiente"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase">RFC</p>
                                        <p className="font-bold text-slate-900">
                                            {extractedData.rfc || "Dato Pendiente"}
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-slate-500 uppercase">
                                            Domicilio Extraído / Fiscal
                                        </p>
                                        <p className="font-bold text-slate-900">
                                            {extractedData.direccion || "Dato Pendiente"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase">
                                            Tipo de Persona
                                        </p>
                                        <p className="font-bold text-slate-900 capitalize">
                                            {personaType?.replace("_", " ") || "No Especificado"}
                                        </p>
                                    </div>
                                </div>
                            </section>
                            <section>
                                <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1 mb-3">
                                    2. DETALLES DE LA PÓLIZA ASIGNADA
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase">
                                            Tipo de Seguro
                                        </p>
                                        <p className="font-medium text-slate-900">
                                            Responsabilidad Civil Profesional
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase">Vigencia</p>
                                        <p className="font-medium text-slate-900">
                                            Anual ({new Date().getFullYear()} - {new Date().getFullYear() + 1})
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-8">
                                <p className="italic text-slate-600 text-[11px] text-justify">
                                    Por medio de la presente, el asegurado manifiesta que la
                                    información extraída por el motor de IA de GMX Seguros y contenida
                                    en esta cédula es verídica y coincide con los documentos
                                    proporcionados. Autoriza a GMX Seguros para el tratamiento de
                                    sus datos. Este documento requiere firma electrónica.
                                </p>
                            </section>

                            <div className="mt-20 flex justify-around">
                                <div className="text-center border-t border-slate-400 pt-2 w-48">
                                    <p className="text-xs text-slate-500">Firma del Agente</p>
                                    <p className="text-xs font-bold text-slate-900">Aprobado en Portal</p>
                                </div>
                                <div className="text-center border-t border-slate-300 border-dashed pt-2 w-48">
                                    <p className="text-xs text-slate-400 italic">
                                        Espacio para Firma Digital
                                    </p>
                                    <p className="text-xs font-bold text-slate-300 uppercase">
                                        Asegurado
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <DialogFooter className="px-6 py-4 pb-8 bg-white border-t border-slate-200 sm:justify-between items-center w-full shadow-lg z-10">
                    <Button variant="outline" className="gap-2">
                        <span className="material-symbols-outlined text-xl">download</span>
                        Descargar PDF
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
