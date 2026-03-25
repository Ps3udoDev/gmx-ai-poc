"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { useAppStore, PersonaType } from "@/store/useAppStore";
import { requiredDocuments, DocumentRequirement } from "@/lib/documentRequirements";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

export default function Registration() {
  const router = useRouter();
  const { setPersonaType, personaType, setDocumentsUploaded, generateFolio, addUploadedFiles, removeUploadedDoc, resetFlow } =
    useAppStore();

  const [uploadedDocsIds, setUploadedDocsIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [fastTrackCedulaLoaded, setFastTrackCedulaLoaded] = useState(false);

  useEffect(() => {
    // Limpieza agresiva de stores requerida al volver al inicio
    resetFlow();
  }, [resetFlow]);

  const currentDocs: DocumentRequirement[] = useMemo(() => {
    return personaType ? requiredDocuments[personaType] || [] : [];
  }, [personaType]);

  const handlePersonaChange = (type: PersonaType) => {
    setPersonaType(type);
    setUploadedDocsIds([]); // Reset on type change
    setFastTrackCedulaLoaded(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, activeDocId: string) => {
    if (e.target.files && e.target.files.length > 0) {
      if (!uploadedDocsIds.includes(activeDocId)) {
        setUploadedDocsIds((prev) => [...prev, activeDocId]);
        addUploadedFiles(activeDocId, Array.from(e.target.files));
        toast.success(`Documento${e.target.files.length > 1 ? 's' : ''} cargado${e.target.files.length > 1 ? 's' : ''} correctamente`);
      }
    }
    // Liberar input para permitir resubir el mismo archivo si se elimina
    e.target.value = '';
  };

  const handleFileRemove = (activeDocId: string) => {
      setUploadedDocsIds((prev) => prev.filter(id => id !== activeDocId));
      removeUploadedDoc(activeDocId);
      toast.info("Documento removido");
  };

  const handleFastTrackCedula = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
          setFastTrackCedulaLoaded(true);
          // Fast-tracking automatically marks the first 3 fundamental docs as loaded for convenience
          if (currentDocs.length > 0) {
              const idsToFill = currentDocs.slice(0, 3).map(d => d.id);
              setUploadedDocsIds(prev => Array.from(new Set([...prev, ...idsToFill])));
          }
          toast.success("Cédula precargada. Autocompletados requisitos fundamentales.");
      }
  }

  const handleContinue = () => {
    if (!personaType) {
      toast.error("Por favor seleccione un tipo de persona");
      return;
    }
    
    // Check if total uploaded matches REQUIRED files (or forced fast track validation bypass)
    const requiredDocs = currentDocs.filter(d => !d.optional);
    const requiredCount = requiredDocs.length;
    const uploadedRequiredCount = requiredDocs.filter(d => uploadedDocsIds.includes(d.id)).length;
    
    if (uploadedRequiredCount < requiredCount && !fastTrackCedulaLoaded) {
      toast.error(`Faltan documentos obligatorios (${uploadedRequiredCount}/${requiredCount})`);
      return;
    }

    setDocumentsUploaded(uploadedDocsIds.length);
    generateFolio();
    router.push("/validation");
  };

  const requiredOnlyDocs = currentDocs.filter(d => !d.optional);
  const uploadedRequired = requiredOnlyDocs.filter(d => uploadedDocsIds.includes(d.id)).length;

  const progressPercent = requiredOnlyDocs.length > 0 
    ? Math.round((uploadedRequired / requiredOnlyDocs.length) * 100) 
    : 0;

  return (
    <div className="relative flex flex-col w-full">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">shield</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-primary">
              GMX{" "}
              <span className="font-medium text-slate-600 dark:text-slate-400">
                Portal del Agente
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Carlos Mendoza
                </p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                  Agente Senior
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden relative">
                <Image
                  className="object-cover"
                  alt="User profile avatar professional photo"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8Q3T9a0VN2XtHmt3mK6Ew9MVhb4Nr-gQT2VSIx01opyl8tE9Pjt9FCIRn9Zn4uJ1oQxIyci1QGoIcbfQzOS6lcV-9cpAp7xmZyEWPxkQUrVTpGosp460-BhhCtlMICsqx-YDseaYvstEPJNbhD25vmUC66VR3P8-2Yjfw0dTIgJdACbXosrnGUpYWsTHrqwe96e95i7Gwq_g4jCxF1c7RvaiG5_VaW5sVdhWbZl5leKp13QGr4imuQRUBfBpoyCZt3qZ6oXjd9gko"
                  fill
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto w-full px-6 py-10 space-y-12">
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Registro de Cliente
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Seleccione el tipo de persona para iniciar el proceso de carga de
              documentos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                id: "fisica_nacional",
                icon: "person",
                title: "Persona Física Nacional",
                desc: "Ciudadanos mexicanos con residencia en el país.",
              },
              {
                id: "fisica_extranjera",
                icon: "public",
                title: "Persona Física Extranjera",
                desc: "Individuos extranjeros con residencia fuera de México.",
              },
              {
                id: "moral_nacional",
                icon: "corporate_fare",
                title: "Persona Moral Nacional",
                desc: "Empresas constituidas bajo leyes mexicanas.",
              },
              {
                id: "moral_extranjera",
                icon: "business_center",
                title: "Persona Moral Extranjera",
                desc: "Empresas e instituciones constituidas en el extranjero.",
              },
            ].map((option) => (
              <label
                key={option.id}
                className={`group relative flex flex-col p-6 bg-white dark:bg-slate-900 border-2 rounded-xl shadow-sm transition-all cursor-pointer ${personaType === option.id
                    ? "border-primary bg-primary/5"
                    : "border-transparent hover:border-primary/40 hover:shadow-md"
                  }`}
                onClick={() => handlePersonaChange(option.id as PersonaType)}
              >
                <input
                  className="absolute top-4 right-4 w-5 h-5 text-primary focus:ring-primary border-slate-300 rounded-full"
                  name="persona_type"
                  type="radio"
                  checked={personaType === option.id}
                  readOnly
                />
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">
                    {option.icon}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {option.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1">{option.desc}</p>
              </label>
            ))}
          </div>
        </section>

        <AnimatePresence mode="wait">
        {personaType && (
            <motion.section 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
            {/* Fast-Track Cedula Upload MenuBar */}
            <div className="bg-slate-900 dark:bg-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg text-white mb-8 border border-slate-700/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-white">magic_button</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">¿Ya cuentas con tu Cédula GMX?</h3>
                        <p className="text-xs text-slate-400">Sube tu archivo previo y autocompleta los requisitos básicos al instante.</p>
                    </div>
                </div>
                <div className="flex-shrink-0 w-full sm:w-auto">
                    <label className={`w-full sm:w-auto font-bold py-2.5 px-6 rounded-lg shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-colors ${fastTrackCedulaLoaded ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-primary/90'}`}>
                        {fastTrackCedulaLoaded ? (
                             <>
                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                Cédula Precargada
                             </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-[18px]">upload_file</span>
                                Cargar Cédula Rapida
                            </>
                        )}
                        <input className="hidden" type="file" accept=".pdf" onChange={handleFastTrackCedula} />
                    </label>
                </div>
            </div>

            <div className="flex flex-col gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Documentación Requerida
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                      Revise la lista requerida para su persona. Formatos: PDF, JPG, PNG (Max. 10MB)
                    </p>
                  </div>
                  
                  {/* View Toggles & Status Badge */}
                  <div className="flex items-center gap-3 self-end sm:self-auto">
                      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                          <button 
                            onClick={() => setViewMode("list")}
                            className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                          >
                             <span className="material-symbols-outlined text-[20px] block">view_list</span>
                          </button>
                          <button 
                            onClick={() => setViewMode("grid")}
                            className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                          >
                             <span className="material-symbols-outlined text-[20px] block">grid_view</span>
                          </button>
                      </div>
                    <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                      {uploadedRequired} de {requiredOnlyDocs.length} Obligatorios
                    </span>
                  </div>
                </div>
                <Progress value={progressPercent} className="h-2 w-full" />
            </div>

            <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {currentDocs.map((doc) => {
                const isUploaded = uploadedDocsIds.includes(doc.id);
                return (
                    <motion.div
                      layout
                      key={doc.id}
                      className={`group flex relative ${viewMode === "grid" ? "flex-col items-center text-center justify-between p-6" : "flex-col sm:flex-row items-start sm:items-center p-4"} gap-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all shadow-sm`}
                    >
                    {isUploaded && (
                        <button
                           onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleFileRemove(doc.id);
                           }}
                           className="absolute top-2 left-2 z-10 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg p-1.5 transition-colors shadow-sm"
                           title="Eliminar documento"
                        >
                            <span className="material-symbols-outlined text-[16px] block">delete</span>
                        </button>
                    )}
                    <div className={`flex-1 space-y-1 w-full ${viewMode === "grid" ? "flex flex-col items-center" : "text-left pl-8"}`}>
                        <div className={`flex items-center gap-2 ${viewMode === "grid" ? "justify-center mb-2" : ""}`}>
                          {viewMode === "grid" && (
                              <div className={`p-2 rounded-lg ${isUploaded ? "bg-green-100 text-green-600" : "bg-primary/10 text-primary"}`}>
                                  <span className="material-symbols-outlined">
                                    {isUploaded ? "task" : "description"}
                                  </span>
                              </div>
                          )}
                          <h4 className="font-bold text-slate-900 dark:text-white leading-tight">
                            {doc.title} {doc.optional && <span className="text-[10px] text-slate-400 font-normal uppercase ml-1">(Opcional)</span>}
                          </h4>
                          {isUploaded && viewMode === "list" && (
                            <span className="material-symbols-outlined text-green-500 text-[18px] ml-1">
                              check_circle
                            </span>
                          )}
                        </div>
                        <p className={`text-xs text-slate-500 leading-relaxed ${viewMode === "grid" ? "px-2" : ""}`}>
                            {doc.description || "Subir documento oficial vigente."}
                        </p>
                    </div>
                    
                    <div className={`w-full ${viewMode === "list" ? "sm:w-60" : "mt-2"}`}>
                        <label
                        className={`flex flex-col items-center justify-center w-full min-h-[5rem] border-2 border-dashed rounded-lg transition-all ${isUploaded
                            ? "border-green-500 bg-green-50 dark:bg-green-900/10 cursor-default"
                            : "border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-primary/5 hover:border-primary/40"
                            }`}
                        >
                        <div className="flex flex-col items-center justify-center p-3">
                            {viewMode === "list" && (
                                <span className="material-symbols-outlined text-slate-400 mb-1 text-[20px]">
                                {isUploaded ? "task" : "cloud_upload"}
                                </span>
                            )}
                            <p className="text-[11px] text-slate-500 text-center">
                            {isUploaded ? (
                                <span className="text-green-600 font-bold">Documento subido</span>
                            ) : (
                                <>
                                <span className="font-semibold text-primary">Subir</span> o arrastrar
                                </>
                            )}
                            </p>
                        </div>
                        <input
                            className="hidden"
                            type="file"
                            multiple={doc.multiple}
                            accept={doc.accept}
                            onChange={(e) => handleFileUpload(e, doc.id)}
                            disabled={isUploaded}
                        />
                        </label>
                    </div>
                    </motion.div>
                );
                })}
            </div>
            </motion.section>
        )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-6">
          <Button variant="outline" className="px-8 py-6 rounded-xl font-bold">
            Cancelar
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!personaType || (uploadedRequired < requiredOnlyDocs.length && !fastTrackCedulaLoaded)}
            className="px-10 py-6 rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            Continuar
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        </div>
      </main>

      <footer className="w-full py-8 px-6 lg:px-20 border-t border-slate-200 dark:border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2024 GMX Seguros. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a
              className="text-sm text-slate-500 hover:text-primary transition-colors"
              href="/"
            >
              Aviso de Privacidad
            </a>
            <a
              className="text-sm text-slate-500 hover:text-primary transition-colors"
              href="/"
            >
              Términos y Condiciones
            </a>
            <a
              className="text-sm text-slate-500 hover:text-primary transition-colors"
              href="/"
            >
              Soporte
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
