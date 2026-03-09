export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <span className="material-symbols-outlined text-white">
              security
            </span>
          </div>
          <h2 className="font-bold text-lg tracking-tight text-primary dark:text-white">
            GMX Portal
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Operaciones
          </div>
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold"
            href="/"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Tablero</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            href="/"
          >
            <span className="material-symbols-outlined">history</span>
            <span>Historial</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            href="/"
          >
            <span className="material-symbols-outlined">bar_chart</span>
            <span>Reportes</span>
          </a>

          <div className="pt-6">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Sistema
            </div>
            <a
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              href="/"
            >
              <span className="material-symbols-outlined">settings</span>
              <span>Configuración</span>
            </a>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 px-2">
            <div
              className="size-10 rounded-full bg-slate-200 bg-cover bg-center"
              title="User avatar placeholder"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAysPLmFCFspedMFO9-TkVN3KyyX-aeZ4jCBcyznEm8x9VV_sjzXJmLNuTAB3smFMnqZTHwkh7LqMDWQJl9KpfPBv748kzLthcs0sXZ1Fx3AhBZbJ6OQxjnnLd9_4ptagK3MPgOnSnZZPAhaolfocYCQOyhBwDShKIJ0Y1tfrL_ZR89LLYdIthJKtLA7NCLV9j3PYzamtliocdTa2hNKNxFqY8tv_5YyItiWQSsnFfURKaXedYaSZ__jxaaxz-va61ieloWfZgDwlHg')",
              }}
            ></div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">Equipo Ops</p>
              <p className="text-xs text-slate-500 truncate">
                admin@gmx.com.mx
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary/50 text-sm"
                placeholder="Buscar por cliente o folio..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 relative"
            >
              <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                notifications
              </span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              ID Sesión: #4829
            </span>
          </div>
        </header>

        {/* Dashboard Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Table Section */}
          <section className="flex-1 p-8 overflow-y-auto">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Tablero de Validación
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                  Gestión interna para el Equipo de Operaciones
                </p>
              </div>
              <div className="flex bg-white dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  className="px-4 py-1.5 text-sm font-semibold rounded-md bg-primary text-white"
                >
                  Pendientes
                </button>
                <button
                  type="button"
                  className="px-4 py-1.5 text-sm font-semibold rounded-md text-slate-500 hover:text-slate-700"
                >
                  Aprobados
                </button>
                <button
                  type="button"
                  className="px-4 py-1.5 text-sm font-semibold rounded-md text-slate-500 hover:text-slate-700"
                >
                  Rechazados
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Nombre del Cliente
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Tipo de Persona
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Fecha de Envío
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Estatus
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer bg-primary/5">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        Juan Pérez Rodríguez
                      </div>
                      <div className="text-xs text-slate-500">
                        Folio: GMX-99210
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">Física</td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      24 Oct 2023, 10:45 AM
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                        Pendiente
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        className="text-primary font-bold text-sm hover:underline"
                      >
                        Revisar
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        Logística Global S.A.
                      </div>
                      <div className="text-xs text-slate-500">
                        Folio: GMX-99185
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">Moral</td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      23 Oct 2023, 14:20 PM
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                        Aprobado
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        className="text-slate-400 font-bold text-sm hover:text-slate-600"
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        María Fernanda Castro
                      </div>
                      <div className="text-xs text-slate-500">
                        Folio: GMX-99150
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">Física</td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      22 Oct 2023, 09:15 AM
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        Rechazado
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        className="text-slate-400 font-bold text-sm hover:text-slate-600"
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Sidebar Details Section */}
          <aside className="w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Detalles de Validación
              </h3>
              <button
                type="button"
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-6">
              {/* Source Info */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Procedencia del Documento
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Canal:</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      Portal Web Agente
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">IP Origen:</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      189.203.45.12
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Timestamp:</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      2023-10-24 10:45:12
                    </span>
                  </div>
                </div>
              </div>

              {/* Client Profile */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Información de Cliente
                </p>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                  <h4 className="font-bold text-primary dark:text-white text-base">
                    Juan Pérez Rodríguez
                  </h4>
                  <p className="text-sm text-slate-500 mb-4">
                    RFC: PERJ850101XYZ
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">
                          description
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">
                          Identificación_Oficial.pdf
                        </p>
                        <p className="text-xs text-slate-400">2.4 MB • PDF</p>
                      </div>
                      <button
                        type="button"
                        className="text-primary material-symbols-outlined"
                      >
                        visibility
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">
                          location_on
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">
                          Comprobante_Domicilio.jpg
                        </p>
                        <p className="text-xs text-slate-400">1.1 MB • JPG</p>
                      </div>
                      <button
                        type="button"
                        className="text-primary material-symbols-outlined"
                      >
                        visibility
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Area */}
              <div className="pt-4 space-y-4">
                <label className="block">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Motivo de Rechazo (Opcional)
                  </span>
                  <textarea
                    className="mt-2 block w-full rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-800 text-sm focus:ring-primary focus:border-primary"
                    placeholder="Describa la razón del rechazo..."
                    rows={4}
                  ></textarea>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-3 rounded-lg border border-red-200 text-red-600 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">
                      cancel
                    </span>
                    Rechazar
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">
                      check_circle
                    </span>
                    Aprobar
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
