export default function Cedulas() {
  return (
    <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark antialiased overflow-hidden">
      {/* Main Portal Interface (Background) */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-10 py-3 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-primary dark:text-slate-100">
            <span className="material-symbols-outlined text-3xl">
              shield_person
            </span>
            <h2 className="text-lg font-bold leading-tight tracking-tight">
              GMX Portal del Agente
            </h2>
          </div>
          <label className="flex flex-col min-w-40 h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full bg-slate-100 dark:bg-slate-800">
              <div className="flex items-center justify-center pl-4 text-slate-500">
                <span className="material-symbols-outlined text-xl">
                  search
                </span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 placeholder:text-slate-500 text-sm"
                placeholder="Buscar póliza o cliente"
                defaultValue=""
              />
            </div>
          </label>
        </div>
        <div className="flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-9">
            <a
              className="text-slate-900 dark:text-slate-100 text-sm font-medium"
              href="/"
            >
              Inicio
            </a>
            <a
              className="text-slate-900 dark:text-slate-100 text-sm font-medium"
              href="/"
            >
              Pólizas
            </a>
            <a
              className="text-slate-900 dark:text-slate-100 text-sm font-medium"
              href="/"
            >
              Siniestros
            </a>
            <a
              className="text-slate-900 dark:text-slate-100 text-sm font-medium"
              href="/"
            >
              Reportes
            </a>
          </nav>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex items-center justify-center rounded-xl h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              <span className="material-symbols-outlined text-xl">
                notifications
              </span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center rounded-xl h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              <span className="material-symbols-outlined text-xl">
                account_circle
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col p-4 gap-6">
          <div className="flex gap-3 items-center">
            <div className="bg-primary/10 rounded-full p-2">
              <span className="material-symbols-outlined text-primary dark:text-slate-100">
                real_estate_agent
              </span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold">Portal del Agente</h1>
              <p className="text-slate-500 text-xs">Agente #8812</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            <a
              className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 rounded-lg"
              href="/"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm font-medium">Escritorio</span>
            </a>
            <a
              className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 rounded-lg"
              href="/"
            >
              <span className="material-symbols-outlined">group</span>
              <span className="text-sm font-medium">Mis Clientes</span>
            </a>
            <a
              className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary dark:text-slate-100 rounded-lg"
              href="/"
            >
              <span className="material-symbols-outlined">description</span>
              <span className="text-sm font-medium">Cédulas</span>
            </a>
          </nav>
        </aside>

        {/* Page Content (Blurred) */}
        <section className="flex-1 p-8 blur-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Listado de Cédulas Generadas</h2>
            <p className="text-slate-500">
              Administre los documentos de sus asegurados.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 h-96"></div>
        </section>
      </main>

      {/* Modal Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
        <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">
                picture_as_pdf
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Vista Previa: Cédula del Asegurado
              </h3>
            </div>
            <button
              type="button"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Modal Body (PDF Preview) */}
          <div className="flex-1 overflow-y-auto bg-slate-100 dark:bg-slate-800/50 p-8 flex justify-center">
            {/* Document Page */}
            <div className="bg-white shadow-lg w-[700px] min-h-[900px] p-12 relative flex flex-col">
              {/* Branding Header */}
              <div className="flex justify-between items-start mb-12">
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-4xl">
                    shield
                  </span>
                  <div className="font-black text-2xl tracking-tighter">
                    GMX SEGUROS
                  </div>
                </div>
                <div className="text-right text-xs text-slate-400">
                  <p>FECHA: 24/10/2023</p>
                  <p>FOLIO: CED-99281-B</p>
                </div>
              </div>

              {/* Document Title */}
              <div className="text-center mb-10">
                <h1 className="text-2xl font-bold text-slate-900 underline underline-offset-8 decoration-primary/30">
                  CÉDULA DE INFORMACIÓN DEL ASEGURADO
                </h1>
              </div>

              {/* Document Content Placeholder */}
              <div className="space-y-6 text-sm text-slate-800 leading-relaxed">
                <section>
                  <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-1 mb-3">
                    1. DATOS GENERALES DEL TITULAR
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 uppercase">
                        Nombre Completo
                      </p>
                      <p className="font-medium">
                        Javier Alejandro Rodríguez Martínez
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">RFC</p>
                      <p className="font-medium">ROMJ850412H30</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">
                        Domicilio Fiscal
                      </p>
                      <p className="font-medium">
                        Av. Insurgentes Sur 1602, CDMX
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">
                        Teléfono de Contacto
                      </p>
                      <p className="font-medium">+52 55 1234 5678</p>
                    </div>
                  </div>
                </section>
                <section>
                  <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-1 mb-3">
                    2. DETALLES DE LA PÓLIZA
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 uppercase">
                        Tipo de Seguro
                      </p>
                      <p className="font-medium">
                        Responsabilidad Civil Profesional
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase">
                        Vigencia
                      </p>
                      <p className="font-medium">Anual (2023 - 2024)</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-slate-500 uppercase">
                        Cobertura Principal
                      </p>
                      <p className="font-medium">
                        Daños a terceros y asistencia legal especializada en
                        materia civil y administrativa.
                      </p>
                    </div>
                  </div>
                </section>
                <section className="bg-slate-50 p-4 rounded-lg border border-slate-100 mt-8">
                  <p className="italic text-slate-600 text-xs">
                    Por medio de la presente, el asegurado manifiesta que la
                    información proporcionada es verídica y autoriza a GMX
                    Seguros para el tratamiento de sus datos personales conforme
                    al aviso de privacidad vigente. Este documento requiere
                    firma electrónica para su validez legal.
                  </p>
                </section>

                <div className="mt-20 flex justify-around">
                  <div className="text-center border-t border-slate-300 pt-2 w-48">
                    <p className="text-xs text-slate-400">Firma del Agente</p>
                    <p className="text-xs font-bold">#8812 - GMX Portal</p>
                  </div>
                  <div className="text-center border-t border-slate-300 border-dashed pt-2 w-48">
                    <p className="text-xs text-slate-400 italic">
                      Espacio para Firma Digital
                    </p>
                    <p className="text-xs font-bold text-slate-300">
                      ASEGURADO
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-center opacity-50">
                <div className="text-[10px] text-slate-500">
                  Página 1 de 1 | Documento generado automáticamente por el
                  Portal del Agente GMX.
                </div>
                <div className="bg-slate-200 w-12 h-12 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-400">
                    qr_code_2
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer (Actions) */}
          <div className="px-8 py-5 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 shrink-0">
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">
                download
              </span>
              Descargar PDF
            </button>
            <div className="flex gap-4">
              <button
                type="button"
                className="px-6 py-2.5 rounded-xl font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-primary dark:bg-slate-100 text-white dark:text-primary font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
              >
                <span className="material-symbols-outlined text-xl">
                  digital_out_of_home
                </span>
                Enviar a Firma Digital
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
