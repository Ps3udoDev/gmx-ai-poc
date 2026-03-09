export default function Tracking() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header / Navigation */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 bg-white dark:bg-slate-900 px-6 md:px-10 py-3">
          <div className="flex items-center gap-4 text-primary dark:text-slate-100">
            <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg">
              <span className="material-symbols-outlined text-primary">
                shield
              </span>
            </div>
            <h2 className="text-primary dark:text-white text-lg font-bold leading-tight tracking-tight">
              Portal del Agente
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="flex items-center justify-center rounded-xl h-10 w-10 bg-primary/5 hover:bg-primary/10 text-primary dark:text-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center rounded-xl h-10 w-10 bg-primary/5 hover:bg-primary/10 text-primary dark:text-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </header>

        <div className="flex flex-1 justify-center py-8 px-4 md:px-10">
          <main className="layout-content-container flex flex-col max-w-[960px] flex-1 gap-6">
            {/* Breadcrumbs & Title */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary/60 dark:text-slate-400 text-sm">
                <span>Mis Trámites</span>
                <span className="material-symbols-outlined text-xs">
                  chevron_right
                </span>
                <span className="font-medium text-primary dark:text-primary/80">
                  GMX-992834-2023
                </span>
              </div>
              <div className="flex flex-wrap justify-between items-end gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight">
                    Seguimiento de Trámite
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    Referencia: GMX-992834-2023 • Cliente: Juan Pérez García
                  </p>
                </div>
                <span className="px-3 py-1 bg-success/10 text-success text-xs font-bold uppercase tracking-wider rounded-full border border-success/20">
                  Aprobado
                </span>
              </div>
            </div>

            {/* Case Status Overview Card */}
            <div className="@container">
              <div className="flex flex-col items-stretch justify-start rounded-xl overflow-hidden shadow-sm bg-white dark:bg-slate-900 border border-primary/5">
                <div
                  className="w-full h-48 bg-center bg-no-repeat bg-cover relative"
                  title="Close up of legal documents and pen on a desk"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_rYAkNMGhzNxYGUvEcWuvVe8AeDCqV2dZvXb-31Mk8Z2Zi2PcOvPXubqZTzCVv_Y5g5PkJQjl9nif9qRk5jgRvcScuasr1Umgkh59xWzr_XoK5OPUiuydTxWV8xD21I2Ss5vmukQAAzN15tS_tKuO4ee_7kgc8Km4bmPDE-CXAem8fqo5GOi8LH-gyN-nGZYkSmXF3b9HqrS_H8sE9e9SJLvmxiSMZoJ3r5_2cz6JivQOGHJApMW3woCMarsIse3GnmCUeaLZNiaO")',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white text-lg font-bold">
                      Estado del Expediente
                    </p>
                    <p className="text-white/80 text-sm">
                      Validación final completada exitosamente
                    </p>
                  </div>
                </div>

                <div className="flex flex-col p-6 gap-6">
                  {/* Timeline Section */}
                  <div className="relative flex flex-col gap-0">
                    {/* Line */}
                    <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-slate-200 dark:bg-slate-700"></div>

                    {/* Step 1 */}
                    <div className="relative flex items-start gap-4 pb-8">
                      <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full bg-success text-white shadow-sm shadow-success/30">
                        <span className="material-symbols-outlined text-sm font-bold">
                          check
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-slate-900 dark:text-slate-100 font-semibold">
                          Documento Cargado
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                          12 Oct, 2023 - 09:00 AM
                        </p>
                        <div className="mt-2 p-3 bg-background-light dark:bg-slate-800 rounded-lg flex items-center gap-3 border border-primary/5">
                          <span className="material-symbols-outlined text-primary">
                            description
                          </span>
                          <span className="text-sm font-medium">
                            solicitud_firmada_v2.pdf
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex items-start gap-4 pb-8">
                      <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full bg-success text-white shadow-sm shadow-success/30">
                        <span className="material-symbols-outlined text-sm font-bold">
                          check
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-slate-900 dark:text-slate-100 font-semibold">
                          En Proceso de Validación
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                          13 Oct, 2023 - 02:30 PM
                        </p>
                        <p className="text-xs text-slate-400 mt-1 italic">
                          Revisado por: Mesa de Control Central
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex items-start gap-4">
                      <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full bg-success text-white shadow-sm shadow-success/30">
                        <span className="material-symbols-outlined text-sm font-bold">
                          verified
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-slate-900 dark:text-slate-100 font-semibold">
                          Validación Exitosa
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                          14 Oct, 2023 - 11:15 AM
                        </p>
                        <p className="text-success text-sm font-medium mt-1">
                          El expediente cumple con todos los requisitos
                          técnicos.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Area */}
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <span className="material-symbols-outlined">info</span>
                      <p className="text-sm">
                        Siguiente paso: Emisión de la póliza digital.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="w-full md:w-auto px-8 py-3 bg-success hover:bg-success/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-success/20 flex items-center justify-center gap-2"
                    >
                      <span>Transicionar a Póliza</span>
                      <span className="material-symbols-outlined">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-primary/5 shadow-sm">
                <p className="text-primary text-xs font-bold uppercase mb-1">
                  Producto
                </p>
                <p className="text-slate-900 dark:text-slate-100 font-medium">
                  GMX Daños Empresarial
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-primary/5 shadow-sm">
                <p className="text-primary text-xs font-bold uppercase mb-1">
                  Suma Asegurada
                </p>
                <p className="text-slate-900 dark:text-slate-100 font-medium">
                  $2,500,000.00 MXN
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-primary/5 shadow-sm">
                <p className="text-primary text-xs font-bold uppercase mb-1">
                  Ejecutivo Asignado
                </p>
                <p className="text-slate-900 dark:text-slate-100 font-medium">
                  Ricardo Alarcón
                </p>
              </div>
            </div>
          </main>
        </div>

        {/* Footer / Sidebar Preview Mini */}
        <footer className="mt-auto px-6 md:px-10 py-6 border-t border-primary/5 bg-white dark:bg-slate-900 flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
            <span className="material-symbols-outlined text-base">
              support_agent
            </span>
            <span>¿Necesitas ayuda? Contacta a soporte</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
            <span className="material-symbols-outlined text-base">history</span>
            <span>Último acceso: Hoy, 10:45 AM</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
