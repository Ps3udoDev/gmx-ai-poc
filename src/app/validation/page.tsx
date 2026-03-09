import Image from "next/image";

export default function Validation() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 lg:px-10 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-primary">
              <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                GMX Portal
              </h2>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a
                className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
                href="/"
              >
                Escritorio
              </a>
              <a
                className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
                href="/"
              >
                Documentos
              </a>
              <a
                className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors"
                href="/"
              >
                Configuración
              </a>
            </nav>
          </div>
          <div className="flex flex-1 justify-end gap-4 items-center">
            <label className="hidden sm:flex flex-col min-w-40 h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                <div className="text-slate-400 flex border-none bg-slate-100 dark:bg-slate-800 items-center justify-center pl-4 rounded-l-xl">
                  <span className="material-symbols-outlined text-[20px]">
                    search
                  </span>
                </div>
                <input
                  id="nombre_completo"
                  className="form-input flex w-full min-w-0 flex-1 border-none bg-slate-100 dark:bg-slate-800 focus:ring-0 h-full placeholder:text-slate-500 px-4 rounded-r-xl text-sm font-normal"
                  placeholder="Buscar expediente..."
                  value=""
                  readOnly
                />
              </div>
            </label>
            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/10 overflow-hidden relative">
              <Image
                className="object-cover"
                alt="User profile avatar of an agent"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7HU0XZwJCpCgXB3lm8AtsLiCw8Ik8CmqXGMGDdrrnPVpiT9WEYIaL3Pk7A-54gsNZWN3rYOJeXohAnDT66GIw6a8P9E3xzO_LsK06mmNfsuKSMH4Kk-DTxF2fqqe8D4D3v0qiHrn-Nnizj0t_hpGeV2NrY3_5UhcOjuLzpeN_m_wZAlVjEWGwoOcHtLofEBdck8YGrfyhjMksNNLuWTdcdHwqircEH-sj_RRrceOVpfuIs2xQjDquraFPQ7FvajAiYEfc4rUy8zIy"
                fill
                unoptimized
              />
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col">
          {/* Breadcrumbs & Header */}
          <div className="px-6 lg:px-10 py-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
              <a className="hover:text-primary" href="/">
                Inicio
              </a>
              <span className="material-symbols-outlined text-[14px]">
                chevron_right
              </span>
              <span className="text-primary">Extracción de IA</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                  Validación de Identidad
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Motor de IA procesando identificación oficial (INE/Pasaporte)
                </p>
              </div>
              <div className="hidden sm:block">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-success/10 text-emerald-success text-xs font-bold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-success"></span>
                  </span>
                  PROCESANDO EN TIEMPO REAL
                </span>
              </div>
            </div>
          </div>

          {/* Main Content Split Screen */}
          <div className="flex flex-1 flex-col lg:flex-row gap-6 px-6 lg:px-10 pb-10 h-full min-h-0">
            {/* Left: Document Previewer */}
            <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 flex flex-col shadow-inner">
              <div className="bg-white dark:bg-slate-900 px-4 py-2 border-b border-slate-300 dark:border-slate-700 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">
                    description
                  </span>
                  VISTA PREVIA DEL DOCUMENTO
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      zoom_in
                    </span>
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      rotate_right
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
                {/* Simulated Blurred ID Card */}
                <div className="relative w-full max-w-md aspect-[1.586/1] bg-slate-100 dark:bg-slate-900 rounded-lg shadow-2xl border border-white/20 overflow-hidden blur-document">
                  <div className="absolute top-0 left-0 w-full h-12 bg-primary/80 flex items-center px-4 text-white font-bold text-sm tracking-widest">
                    INSTITUTO NACIONAL ELECTORAL
                  </div>
                  <div className="p-6 pt-16 flex gap-4">
                    <div className="w-1/3 aspect-[3/4] bg-slate-300 dark:bg-slate-700 rounded-md"></div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="h-4 bg-slate-300 dark:bg-slate-700 w-full rounded"></div>
                      <div className="h-4 bg-slate-300 dark:bg-slate-700 w-5/6 rounded"></div>
                      <div className="h-4 bg-slate-300 dark:bg-slate-700 w-4/6 rounded"></div>
                      <div className="mt-4 h-8 bg-slate-300 dark:bg-slate-700 w-full rounded border-2 border-dashed border-slate-400"></div>
                    </div>
                  </div>
                </div>

                {/* AI Scanning Overlay */}
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                  <div className="w-full max-w-lg h-[2px] bg-primary/40 shadow-[0_0_15px_rgba(0,0,128,0.5)] animate-scan"></div>
                </div>
              </div>
            </div>

            {/* Right: AI Extraction Form */}
            <div className="w-full lg:w-[450px] flex flex-col gap-6">
              {/* Extraction Status Card */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                    Estado de la Extracción
                  </h3>
                  <span className="text-primary font-bold text-lg">82%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-1000"
                    style={{ width: "82%" }}
                  ></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      sync
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white leading-none">
                      Extrayendo datos...
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">
                      Analizando campos de seguridad y firma
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-5">
                {/* Field: Nombre Completo */}
                <div className="relative group">
                  <label
                    htmlFor="nombre_completo"
                    className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 block"
                  >
                    Nombre Completo
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="nombre_completo"
                      className="w-full bg-emerald-success/5 border-emerald-success/30 dark:border-emerald-success/20 rounded-lg py-2.5 px-3 text-slate-900 dark:text-white font-medium focus:ring-0"
                      readOnly
                      type="text"
                      value="ALEJANDRO RODRÍGUEZ GARCÍA"
                    />
                    <div className="absolute right-3 text-emerald-success">
                      <span className="material-symbols-outlined text-[20px]">
                        check_circle
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-emerald-success mt-1 flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[12px]">
                      verified
                    </span>
                    Confianza: 99.8%
                  </p>
                </div>

                {/* Field: RFC */}
                <div className="relative">
                  <label
                    htmlFor="nombre_completo"
                    className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 block"
                  >
                    RFC (Cédula Fiscal)
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="nombre_completo"
                      className="w-full bg-emerald-success/5 border-emerald-success/30 dark:border-emerald-success/20 rounded-lg py-2.5 px-3 text-slate-900 dark:text-white font-medium focus:ring-0"
                      readOnly
                      type="text"
                      value="ROGA880512HDF"
                    />
                    <div className="absolute right-3 text-emerald-success">
                      <span className="material-symbols-outlined text-[20px]">
                        check_circle
                      </span>
                    </div>
                  </div>
                </div>

                {/* Field: Dirección */}
                <div className="relative">
                  <label
                    htmlFor="nombre_completo"
                    className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 block"
                  >
                    Dirección
                  </label>
                  <div className="relative flex items-center">
                    <textarea
                      className="w-full bg-primary/5 border-primary/20 rounded-lg py-2.5 px-3 text-slate-900 dark:text-white font-medium focus:ring-0 resize-none"
                      readOnly
                      rows={3}
                      value="CALLE INSURGENTES SUR 1602, COLONIA CRÉDITO CONSTRUCTOR, CDMX, 03940"
                    ></textarea>
                    <div className="absolute right-3 top-3 text-primary animate-pulse">
                      <span className="material-symbols-outlined text-[20px]">
                        hourglass_top
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-primary mt-1 font-medium italic">
                    Refinando extracción geográfica...
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-col gap-3">
                  <button
                    type="button"
                    className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                  >
                    Validar y Continuar
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                  </button>
                  <button
                    type="button"
                    className="w-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm"
                  >
                    Corregir manualmente
                  </button>
                </div>
              </div>

              {/* AI Assistance Tooltip */}
              <div className="bg-primary/90 text-white p-4 rounded-xl flex gap-3 items-start">
                <span className="material-symbols-outlined text-[24px]">
                  lightbulb
                </span>
                <div>
                  <p className="text-xs font-bold mb-1">Tip de Inteligencia</p>
                  <p className="text-[11px] opacity-90 leading-relaxed">
                    Hemos detectado que el RFC coincide con nuestra base de
                    datos de clientes existentes. Se han precargado datos
                    adicionales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Floating Status Bar (Mobile Only) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 z-50">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-500 uppercase">
                Extracción
              </span>
              <span className="text-sm font-bold text-primary italic">
                82% Completado
              </span>
            </div>
            <button
              type="button"
              className="bg-primary px-6 py-2 rounded-lg text-white font-bold text-sm"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
