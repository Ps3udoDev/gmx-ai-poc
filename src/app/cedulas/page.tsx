"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CedulasRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard since Cedulas is now a Modal invoked inside Tracking or Dashboard
    router.replace("/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col items-center gap-4">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">
          refresh
        </span>
        <p className="text-slate-500 font-medium">Redirigiendo al Tablero...</p>
      </div>
    </div>
  );
}
