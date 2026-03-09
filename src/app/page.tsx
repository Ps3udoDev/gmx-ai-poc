"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppStore, PersonaType } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "motion/react";

export default function Registration() {
  const router = useRouter();
  const { setPersonaType, personaType, setDocumentsUploaded, generateFolio } =
    useAppStore();

  const [uploadedDocs, setUploadedDocs] = useState<number>(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (uploadedDocs < 3) {
        setUploadedDocs((prev) => prev + 1);
        toast.success("Documento cargado correctamente");
      }
    }
  };

  const handleContinue = () => {
    if (!personaType) {
      toast.error("Por favor seleccione un tipo de persona");
      return;
    }
    if (uploadedDocs < 3) {
      toast.error("Debe subir los 3 documentos requeridos");
      return;
    }

    setDocumentsUploaded(uploadedDocs);
    generateFolio();
    router.push("/validation");
  };

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
                onClick={() => setPersonaType(option.id as PersonaType)}
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

        <section className="space-y-6">
          <div className="flex items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Documentación Requerida
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Formatos aceptados: PDF, JPG, PNG (Max. 10MB)
              </p>
            </div>
            <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {uploadedDocs} de 3 Subidos
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[
              {
                icon: "badge",
                title: "Identificación Oficial",
                desc: "INE, Pasaporte o Cédula Profesional vigente.",
              },
              {
                icon: "home_pin",
                title: "Comprobante de Domicilio",
                desc: "Recibo de luz, agua o teléfono (No mayor a 3 meses).",
              },
              {
                icon: "article",
                title: "Cédula RFC",
                desc: "Constancia de Situación Fiscal actualizada.",
              },
            ].map((doc, idx) => {
              const isUploaded = uploadedDocs > idx;
              return (
                <div
                  key={idx}
                  className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">
                        {doc.icon}
                      </span>
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        {doc.title}
                      </h4>
                      {isUploaded && (
                        <span className="material-symbols-outlined text-green-500 text-sm ml-2">
                          check_circle
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500">{doc.desc}</p>
                  </div>
                  <div className="w-full sm:w-72">
                    <label
                      className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg transition-all ${isUploaded
                          ? "border-green-500 bg-green-50 dark:bg-green-900/10 cursor-default"
                          : "border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-primary/5 hover:border-primary/40"
                        }`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <span className="material-symbols-outlined text-slate-400 mb-1">
                          {isUploaded ? "task" : "cloud_upload"}
                        </span>
                        <p className="text-xs text-slate-500 text-center">
                          {isUploaded ? (
                            <span className="text-green-600 font-bold">
                              Documento subido
                            </span>
                          ) : (
                            <>
                              <span className="font-semibold">
                                Subir archivo
                              </span>{" "}
                              o arrastrar
                            </>
                          )}
                        </p>
                      </div>
                      <input
                        className="hidden"
                        type="file"
                        onChange={handleFileUpload}
                        disabled={isUploaded}
                      />
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-6">
          <Button variant="outline" className="px-8 py-6 rounded-xl font-bold">
            Cancelar
          </Button>
          <Button
            onClick={handleContinue}
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
