"use client";

import { useAppStore } from "@/store/useAppStore";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CedulaModal from "@/components/features/CedulaModal";

export default function Dashboard() {
  const { folio, personaType, validationStatus, extractedData } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockCases = [
    {
      folio: "GMX-99185-2023",
      name: "Logística Global S.A.",
      type: "Moral",
      date: "23 Oct 2023, 14:20 PM",
      status: "approved",
    },
    {
      folio: "GMX-99150-2023",
      name: "María Fernanda Castro",
      type: "Física",
      date: "22 Oct 2023, 09:15 AM",
      status: "rejected",
    },
  ];

  const currentCase =
    folio && personaType
      ? {
        folio,
        name: extractedData.nombreCompleto || "Pendiente Inteligencia",
        type: personaType.split("_")[0] === "fisica" ? "Física" : "Moral",
        date: new Date().toLocaleDateString("es-MX", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: validationStatus,
        isCurrent: true,
      }
      : null;

  const allCases = currentCase ? [currentCase, ...mockCases] : mockCases;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">Aprobado</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rechazado</Badge>;
      case "extracting":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">En IA</Badge>;
      case "manual_review":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Revision Manual</Badge>;
      case "idle":
        return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200">Pausado</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <span className="material-symbols-outlined text-white">security</span>
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
            href="/dashboard"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Tablero</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            href="/tracking"
          >
            <span className="material-symbols-outlined">history</span>
            <span>Mi Trámite Actual</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            href="/"
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span>Nuevo Registro</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-slate-50/50 dark:bg-background-dark overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <Input
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none focus-visible:ring-1"
                placeholder="Buscar por cliente o folio..."
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content Area */}
        <div className="flex-1 p-8 overflow-y-auto w-full max-w-6xl mx-auto">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Tablero de Validación
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Gestión interna para el Equipo de Operaciones
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                <TableRow>
                  <TableHead className="font-bold">Nombre del Cliente</TableHead>
                  <TableHead className="font-bold">Tipo de Persona</TableHead>
                  <TableHead className="font-bold">Fecha de Envío</TableHead>
                  <TableHead className="font-bold">Estatus</TableHead>
                  <TableHead className="text-right font-bold">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allCases.map((c, i) => (
                  <TableRow
                    key={i}
                    className={`cursor-pointer ${(c as any).isCurrent ? "bg-primary/5 hover:bg-primary/10" : ""
                      }`}
                  >
                    <TableCell>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {c.name}
                      </div>
                      <div className="text-xs text-slate-500">Folio: {c.folio}</div>
                    </TableCell>
                    <TableCell>{c.type}</TableCell>
                    <TableCell className="text-slate-500">{c.date}</TableCell>
                    <TableCell>{getStatusBadge(c.status)}</TableCell>
                    <TableCell className="text-right">
                      {c.status === "approved" ? (
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="text-primary font-bold text-sm hover:underline"
                        >
                          Ver Cédula
                        </button>
                      ) : (
                        <button
                          className="text-slate-400 font-bold text-sm hover:text-slate-600"
                        >
                          Revisar
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <CedulaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
