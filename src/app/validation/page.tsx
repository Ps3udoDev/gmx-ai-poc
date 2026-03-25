"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { mockData } from "@/lib/mockData";

export default function Validation() {
  const router = useRouter();
  const {
    folio,
    validationStatus,
    extractionProgress,
    extractedData,
    personaType,
    setValidationProgress,
    setValidationStatus,
    setExtractedData,
  } = useAppStore();

  const [localData, setLocalData] = useState(extractedData);

  useEffect(() => {
    let isSubscribed = true;
    setValidationStatus("extracting");
    setValidationProgress(0);

    const interval = setInterval(() => {
      const prev = useAppStore.getState().extractionProgress;
      setValidationProgress(prev < 90 ? prev + Math.floor(Math.random() * 10) + 2 : 90);
    }, 500);

    const processDocuments = async () => {
      try {
        const { uploadedFiles, personaType } = useAppStore.getState();
        const promises = [];

        // 1. Identidad Oficial (INE / Pasaporte)
        const identityFiles = [...(uploadedFiles["id_oficial"] || []), ...(uploadedFiles["id_representante"] || [])];
        if (identityFiles.length > 0) {
            const file = identityFiles[0];
            const isPdf = file.type === "application/pdf";
            
            if (!isPdf) {
                const formData = new FormData();
                formData.append("image", file);
                promises.push(
                    fetch("/api/external/passport_img", { method: "POST", body: formData })
                      .then((res) => { if (!res.ok) throw new Error("API Passport falló"); return res.json(); })
                      .then((data) => ({ source: "identity", data }))
                      .catch((e) => ({ source: "identity", error: e }))
                );
            } else {
                const tryPdfIdentity = async () => {
                    const fdPass = new FormData();
                    fdPass.append("pdf", file);
                    try {
                        let res = await fetch("/api/external/passport_pdf", { method: "POST", body: fdPass });
                        let data = await res.json();
                        if (res.ok && !data.error) return { source: "identity", data: { response: data } }; // wrapped to match existing identity shape

                        const fdIne = new FormData();
                        fdIne.append("pdf", file); // Key 'pdf' as requested for new endpoints
                        res = await fetch("/api/external/ine_pdf", { method: "POST", body: fdIne });
                        data = await res.json();
                        if (res.ok && !data.error) return { source: "identity", data }; 
                        return { source: "identity", error: "Ambas APIs Identity fallaron" };
                    } catch (e) {
                        return { source: "identity", error: e };
                    }
                };
                promises.push(tryPdfIdentity());
            }
        }

        // 2. Comprobante de Domicilio (Servicios)
        const domFiles = [...(uploadedFiles["domicilio"] || []), ...(uploadedFiles["domicilio_moral"] || []), ...(uploadedFiles["domicilio_ext"] || [])];
        if (domFiles.length > 0) {
            const file = domFiles[0];
            const formData = new FormData();
            formData.append("pdf", file);
            promises.push(
                fetch("/api/external/servicio_pdf", { method: "POST", body: formData })
                  .then((res) => { if (!res.ok) throw new Error("API Servicio falló"); return res.json(); })
                  .then((data) => ({ source: "servicio", data }))
                  .catch((e) => ({ source: "servicio", error: e }))
            );
        }

        // 3. Situación Fiscal (CSF)
        const csfFiles = [...(uploadedFiles["rfc"] || []), ...(uploadedFiles["cif"] || [])];
        if (csfFiles.length > 0) {
            const hasPdf = csfFiles.some((f) => f.type === "application/pdf");
            const endpoint = hasPdf ? "/api/external/csf_pdf" : "/api/external/csf_img";
            let fieldKey = hasPdf ? (csfFiles.length === 1 ? "pdf" : "pdfs") : (csfFiles.length === 1 ? "image" : "images");
            
            const formData = new FormData();
            csfFiles.forEach((f) => formData.append(fieldKey, f));
            
            promises.push(
                fetch(endpoint, { method: "POST", body: formData })
                  .then((res) => { if (!res.ok) throw new Error("API CSF falló"); return res.json(); })
                  .then((data) => ({ source: "csf", data }))
                  .catch((e) => ({ source: "csf", error: e }))
            );
        }

        // 4. Cédulas, Actas y Constancias Corporativas
        const cedulaFiles = [...(uploadedFiles["rfc_moral"] || []), ...(uploadedFiles["tax_id"] || []), ...(uploadedFiles["acta"] || []), ...(uploadedFiles["poderes"] || []), ...(uploadedFiles["nombramiento"] || []), ...(uploadedFiles["existencia"] || [])];
        if (cedulaFiles.length > 0) {
            const file = cedulaFiles[0];
            const formData = new FormData();
            formData.append("pdf", file); // Cedula accepts "pdf"
            promises.push(
                fetch("/api/external/cedula_pdf", { method: "POST", body: formData })
                  .then((res) => { if (!res.ok) throw new Error("API Cedula falló"); return res.json(); })
                  .then((data) => ({ source: "cedula", data }))
                  .catch((e) => ({ source: "cedula", error: e }))
            );
        }

        // 5. CURP Especializada
        const curpFiles = [...(uploadedFiles["curp"] || []), ...(uploadedFiles["curp_ext"] || [])];
        if (curpFiles.length > 0) {
            const file = curpFiles[0];
            const formData = new FormData();
            formData.append("pdf", file); // CURP API expects "pdf"
            promises.push(
                fetch("/api/external/curp_pdf", { method: "POST", body: formData })
                  .then((res) => { if (!res.ok) throw new Error("API CURP falló"); return res.json(); })
                  .then((data) => ({ source: "curp", data }))
                  .catch((e) => ({ source: "curp", error: e }))
            );
        }

        // Fallback to mock behavior if no real files were provided (e.g. Fast Track)
        if (promises.length === 0) {
          setTimeout(() => {
            if (!isSubscribed) return;
            clearInterval(interval);
            setValidationProgress(100);
            const typeKey = personaType as keyof typeof mockData;
            const currentMockData = (personaType && mockData[typeKey]) ? mockData[typeKey] as any : null;
            const fallbackData = currentMockData ? {
              nombreCompleto: currentMockData["Nombre"] && currentMockData["Apellido paterno"]
                ? `${currentMockData["Nombre"]} ${currentMockData["Apellido paterno"]}`
                : currentMockData["Razón social"] || "",
              nombre: currentMockData["Nombre"] || "",
              apellidoPaterno: currentMockData["Apellido paterno"] || "",
              apellidoMaterno: currentMockData["Apellido materno"] || "",
              rfc: currentMockData["RFC"] || "",
              curp: currentMockData["CURP"] || "",
              email: currentMockData["mail"] || "",
              telefono: currentMockData["Tel 1"] || currentMockData["Tel1"] || "",
              direccion: currentMockData["Calle"] || "",
              calle: currentMockData["Calle"] || "",
              numExt: currentMockData["Núm ext"] || currentMockData["Núm Ext"] || "",
              colonia: currentMockData["Col"] || "",
              cp: currentMockData["CP"] || "",
              ciudad: currentMockData["Ciudad población"] || currentMockData["Ciudad o población"] || currentMockData["Ciudad"] || "",
              estado: currentMockData["Entidad federativa"] || "",
              confidence: 99.8,
              fechaNacimiento: "",
              nacionalidad: "",
              paisNacimiento: "",
              entidadNacimiento: "",
              giro: "",
              montoMensual: "",
              firmaElectronica: "",
              isPep: null,
              pepCargo: "",
              folioMercantil: "",
              repLegalNombre: "",
              repLegalRFC: "",
              repLegalCargo: "",
              repLegalDomicilio: "",
              art492Checks: { idVigente: null, domicilioReciente: null, nombresCoinciden: null }
            } : {
              nombreCompleto: "FALTA ASIGNAR", nombre: "", apellidoPaterno: "", apellidoMaterno: "", rfc: "N/A", curp: "N/A", email: "", telefono: "N/A", direccion: "N/A", calle: "", numExt: "", colonia: "", cp: "", ciudad: "", estado: "", confidence: 99.8, fechaNacimiento: "", nacionalidad: "", paisNacimiento: "", entidadNacimiento: "", giro: "", montoMensual: "", firmaElectronica: "", isPep: null, pepCargo: "", folioMercantil: "", repLegalNombre: "", repLegalRFC: "", repLegalCargo: "", repLegalDomicilio: "", art492Checks: { idVigente: null, domicilioReciente: null, nombresCoinciden: null }
            };
            setExtractedData(fallbackData);
            setLocalData(fallbackData);
            setValidationStatus("approved");
            toast.success("Simulación rápida completada");
          }, 3000);
          return;
        }

        // Real API Fetch Execution
        const results = await Promise.all(promises);
        if (!isSubscribed) return;
        clearInterval(interval);
        setValidationProgress(100);

        let nombreCompleto = "";
        let nombre = "";
        let apellidoPaterno = "";
        let apellidoMaterno = "";
        let rfc = "";
        let direccion = "";
        let calle = "";
        let numExt = "";
        let colonia = "";
        let cp = "";
        let ciudad = "";
        let estado = "";
        let curp = "";
        let email = "";
        let telefono = "";
        let confidence = 100.0;
        
        let fechaNacimiento = "";
        let nacionalidad = "";
        let paisNacimiento = "";
        let entidadNacimiento = "";
        let giro = "";
        let montoMensual = "";
        let firmaElectronica = "";
        let isPep: boolean | null = null;
        let pepCargo = "";
        let folioMercantil = "";
        let repLegalNombre = "";
        let repLegalRFC = "";
        let repLegalCargo = "";
        let repLegalDomicilio = "";
        
        // Art 492 Validations State Tracker
        let art_idVigente: boolean | null = null;
        let art_domicilioReciente: boolean | null = null;
        let art_nombresCoinciden: boolean | null = null;
        let art_nombreID = "";
        let art_nombreFiscal = "";

        results.forEach((res: any) => {
           console.log(`--- [API RAW RESPONSE - ${res.source ? res.source.toUpperCase() : 'UNKNOWN'}] ---`, res.data);
           
           if (res.error) {
              console.error(`API Extraction Error (${res.source})`, res.error);
              confidence = Math.min(confidence, 45.0);
           } else {
              const apiBody = res.data.response ? res.data.response : res.data;
              
              if (res.source === "identity") {
                  if (apiBody.holder) {
                      const holder = apiBody.holder;
                      console.log("Passport mapping holder:", holder);
                      const newName = `${holder.firstName || ''} ${holder.lastName || ''}`.trim();
                      if (newName) nombreCompleto = newName;
                      art_nombreID = newName;
                      nombre = holder.firstName || nombre;
                      apellidoPaterno = holder.lastName || apellidoPaterno;
                      fechaNacimiento = holder.dateOfBirth || fechaNacimiento;
                      nacionalidad = holder.nationality || nacionalidad;
                      paisNacimiento = holder.issuingCountry || paisNacimiento;
                      entidadNacimiento = holder.placeOfBirth || entidadNacimiento;
                      
                      // Art 492 - ID Expiration
                      if (apiBody.validity?.expiryDate) {
                          const expDate = new Date(apiBody.validity.expiryDate);
                          art_idVigente = expDate >= new Date();
                      }
                  } 
                  else if (apiBody.processedDocuments && apiBody.processedDocuments.length > 0 && apiBody.processedDocuments[0].datosPersonales) {
                      const dp = apiBody.processedDocuments[0].datosPersonales;
                      console.log("INE mapping datosPersonales:", dp);
                      const newName = `${dp.nombres || ''} ${dp.apellidoPaterno || ''} ${dp.apellidoMaterno || ''}`.trim();
                      if (newName) nombreCompleto = newName;
                      art_nombreID = newName;
                      nombre = dp.nombres || nombre;
                      apellidoPaterno = dp.apellidoPaterno || apellidoPaterno;
                      apellidoMaterno = dp.apellidoMaterno || apellidoMaterno;

                      if (apiBody.processedDocuments[0].credencialesElectorales?.curp) {
                          curp = apiBody.processedDocuments[0].credencialesElectorales.curp;
                      }
                      
                      // Art 492 - ID Expiration (by Year)
                      if (apiBody.processedDocuments[0].credencialesElectorales?.vigencia) {
                         const currentYear = new Date().getFullYear();
                         const vigYear = parseInt(apiBody.processedDocuments[0].credencialesElectorales.vigencia, 10);
                         if (!isNaN(vigYear)) art_idVigente = vigYear >= currentYear;
                      }
                      
                      fechaNacimiento = dp.fechaNacimiento || fechaNacimiento;
                      paisNacimiento = apiBody.processedDocuments[0].pais || paisNacimiento;
                      
                      if (dp.domicilio) {
                          const d = dp.domicilio;
                          calle = d.calleNumero || calle;
                          colonia = d.coloniaPueblo || colonia;
                          const cpMatch = d.ubicacion?.match(/\d{5}/);
                          if (cpMatch) cp = cpMatch[0];
                          ciudad = d.ubicacion || ciudad;
                          
                          const addr = `${d.calleNumero || ''}, ${d.coloniaPueblo || ''}, ${d.ubicacion || ''}`.trim();
                          if (addr && !direccion) direccion = addr;
                      }
                  }
              } 
              else if (res.source === "csf" && apiBody.processedDocuments && apiBody.processedDocuments.length > 0) {
                  const doc = apiBody.processedDocuments[0];
                  const iden = doc.taxpayerIdentity;
                  const addr = doc.registeredAddress;
                  console.log("CSF mapping identity:", iden);
                  
                  if (iden) {
                      rfc = iden.rfc || rfc;
                      curp = iden.curp || curp;
                      const fallbackName = iden.firstName && iden.firstSurname 
                          ? `${iden.firstName} ${iden.firstSurname} ${iden.secondSurname || ''}`.trim()
                          : iden.fullName || iden.businessName || "";
                          
                      art_nombreFiscal = fallbackName;
                      
                      if (!nombreCompleto || nombreCompleto.trim() === "") {
                          nombreCompleto = fallbackName;
                      }
                      nombre = iden.firstName || nombre;
                      apellidoPaterno = iden.firstSurname || apellidoPaterno;
                      apellidoMaterno = iden.secondSurname || apellidoMaterno;
                  }
                  
                  if (addr) {
                      calle = addr.streetName || calle;
                      numExt = addr.outdoorNumber || numExt;
                      colonia = addr.neighborhood || colonia;
                      cp = addr.zipCode || cp;
                      ciudad = addr.municipality || ciudad;
                      estado = addr.state || estado;
                      
                      direccion = `${addr.streetName || ''} ${addr.outdoorNumber || ''}, ${addr.neighborhood || ''}, ${addr.state || ''}`.trim();
                  }
                  
                  if (doc.taxProfile?.economicActivities && doc.taxProfile.economicActivities.length > 0) {
                      giro = doc.taxProfile.economicActivities[0].activity || giro;
                  }
                  if (doc.security?.digitalSeal) {
                      firmaElectronica = doc.security.digitalSeal;
                  }
                  
                  // Art 492 - Antigüedad
                  if (doc.documentInfo?.emissionDate) {
                      const d = new Date(doc.documentInfo.emissionDate);
                      const maxOld = new Date(); maxOld.setMonth(maxOld.getMonth() - 3);
                      art_domicilioReciente = d >= maxOld;
                  }
              }
              else if (res.source === "servicio" && apiBody.processedDocuments && apiBody.processedDocuments.length > 0) {
                  const cliente = apiBody.processedDocuments[0].cliente;
                  console.log("Servicio mapping cliente:", cliente);
                  if (cliente) {
                      if (!rfc) rfc = cliente.rfc || "";
                      if (!nombreCompleto) nombreCompleto = cliente.razon_social || "";
                      if (cliente.domicilio_servicio) {
                          const d = cliente.domicilio_servicio;
                          calle = d.calle || calle;
                          colonia = d.colonia || colonia;
                          ciudad = d.localidad || ciudad;
                          estado = d.estado || estado;
                          cp = d.codigo_postal || cp;
                          
                          direccion = `${d.calle || ''}, ${d.colonia || ''}, ${d.localidad || ''}, ${d.estado || ''}`.trim();
                      }
                  }
              }
              else if (res.source === "cedula" && apiBody.processedDocuments && apiBody.processedDocuments.length > 0) {
                  const doc = apiBody.processedDocuments[0];
                  console.log("Cedula mapping doc:", doc);
                  if (doc.taxpayerIdentity) {
                      const iden = doc.taxpayerIdentity;
                      rfc = iden.rfc || rfc;
                      curp = iden.curp || curp;
                      email = iden.email || email;
                      folioMercantil = iden.mercantileFolio || folioMercantil;
                      nacionalidad = iden.nationality || nacionalidad;
                      if (!nombreCompleto || nombreCompleto === "FALTA ASIGNAR") {
                          nombreCompleto = iden.fullNameOrBusinessName || 
                              `${iden.firstName || ''} ${iden.paternalLastName || ''} ${iden.maternalLastName || ''}`.trim();
                      }
                      art_nombreFiscal = nombreCompleto;
                      nombre = iden.firstName || nombre;
                      apellidoPaterno = iden.paternalLastName || apellidoPaterno;
                      apellidoMaterno = iden.maternalLastName || apellidoMaterno;
                      if (doc.taxProfile?.businessLineOrActivity) {
                      giro = doc.taxProfile.businessLineOrActivity || giro;
                  }
                  if (doc.taxProfile?.monthlyDeclaredIncome) {
                      montoMensual = doc.taxProfile.monthlyDeclaredIncome.toString() || montoMensual;
                  }
                  if (doc.thirdPartyData?.legalRepresentative) {
                      const rep = doc.thirdPartyData.legalRepresentative;
                      repLegalNombre = rep.fullName || repLegalNombre;
                      repLegalRFC = rep.rfc || repLegalRFC;
                      repLegalCargo = rep.position || repLegalCargo;
                      repLegalDomicilio = rep.address || repLegalDomicilio;
                  }
                  
                  // Art 492 - Antigüedad
                  if (doc.documentInfo?.emissionDate?.iso) {
                      const d = new Date(doc.documentInfo.emissionDate.iso);
                      const maxOld = new Date(); maxOld.setMonth(maxOld.getMonth() - 3);
                      art_domicilioReciente = d >= maxOld;
                  }
              }
                  if (doc.addressAndContact?.fiscalAddress) {
                      const a = doc.addressAndContact.fiscalAddress;
                      calle = a.street || calle;
                      numExt = a.outdoorNumber || numExt;
                      colonia = a.neighborhood || colonia;
                      cp = a.zipCode || cp;
                      ciudad = a.city || a.municipality || ciudad;
                      estado = a.state || estado;
                      
                      direccion = `${a.street || ''} ${a.outdoorNumber || ''}, ${a.neighborhood || ''}, ${a.city || ''}, ${a.state || ''}`.trim();
                  }
                  if (doc.addressAndContact?.telephones?.phone1) {
                      telefono = doc.addressAndContact.telephones.phone1;
                  }
              }
              else if (res.source === "curp" && apiBody.processedDocuments && apiBody.processedDocuments.length > 0) {
                  const doc = apiBody.processedDocuments[0];
                  console.log("CURP mapping doc:", doc);
                  if (doc.taxpayerIdentity) {
                      const iden = doc.taxpayerIdentity;
                      curp = iden.curp || curp;
                      const fallbackName = iden.fullName || `${iden.firstName || ''} ${iden.paternalLastName || ''} ${iden.maternalLastName || ''}`.trim();
                      // Asignar crudo forzoso para validacion cruzada (Anti-Fraud)
                      art_nombreFiscal = fallbackName;
                      
                      // Nombre Completo si estamos en blanco
                      if (!nombreCompleto || nombreCompleto.trim() === "FALTA ASIGNAR" || nombreCompleto.trim() === "") {
                          nombreCompleto = fallbackName;
                      }
                      nombre = iden.firstName || nombre;
                      apellidoPaterno = iden.paternalLastName || apellidoPaterno;
                      apellidoMaterno = iden.maternalLastName || apellidoMaterno;
                  }
              }
           }
        });

        // Art 492 - Name Coincidence Analyzer
        if (art_nombreID && art_nombreFiscal) {
            const sanitize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z]/g, '');
            const sID = sanitize(art_nombreID);
            const sFiscal = sanitize(art_nombreFiscal);
            art_nombresCoinciden = (sID === sFiscal) || (sFiscal.includes(sID));
        }

        const art492Checks = { idVigente: art_idVigente, domicilioReciente: art_domicilioReciente, nombresCoinciden: art_nombresCoinciden };
        const finalData = { nombreCompleto, nombre, apellidoPaterno, apellidoMaterno, rfc, curp, email, telefono, direccion, calle, numExt, colonia, cp, ciudad, estado, confidence, fechaNacimiento, nacionalidad, paisNacimiento, entidadNacimiento, giro, montoMensual, firmaElectronica, isPep, pepCargo, folioMercantil, repLegalNombre, repLegalRFC, repLegalCargo, repLegalDomicilio, art492Checks };
        console.log("--- [FINAL EXTRACTED DATA PUSHED TO ZUSTAND] ---", finalData);
        
        setExtractedData(finalData);
        setLocalData(finalData);

        if (confidence > 80) {
            setValidationStatus("approved");
            toast.success("Extracción por API completada con éxito");
        } else {
            setValidationStatus("manual_review");
            toast.error("Confianza baja o error en API. Se requiere revisión manual");
        }
      } catch (error) {
        if (!isSubscribed) return;
        clearInterval(interval);
        setValidationProgress(100);
        setValidationStatus("manual_review");
        toast.error("Fallo crítico validando los documentos");
      }
    };

    processDocuments();

    return () => {
      isSubscribed = false;
      clearInterval(interval);
    };
  }, []);

  const handleManualSave = () => {
    setExtractedData(localData);
    setValidationStatus("approved");
    toast.success("Datos actualizados manualmente");
  };

  const handleContinue = () => {
    if (validationStatus !== "approved") {
      toast.error("Complete la validación antes de continuar");
      return;
    }
    router.push("/tracking");
  };

  const isExtracting = validationStatus === "extracting";
  const needsReview = validationStatus === "manual_review";

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Top Navigation */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 lg:px-10 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-primary">
              <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
                GMX Portal
              </h2>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-4 items-center">
            <div className="text-sm font-bold text-slate-500 mr-4">
              Folio: {folio || "N/A"}
            </div>
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
          <div className="px-6 lg:px-10 py-4 flex flex-col gap-2">
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
                {isExtracting && (
                  <Badge
                    variant="outline"
                    className="bg-emerald-500/10 text-emerald-600 border-none font-bold py-1 px-3"
                  >
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    PROCESANDO EN TIEMPO REAL
                  </Badge>
                )}
                {validationStatus === "approved" && (
                  <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1 px-3">
                    APROBADO
                  </Badge>
                )}
                {needsReview && (
                  <Badge variant="destructive" className="font-bold py-1 px-3">
                    REVISIÓN MANUAL
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col lg:flex-row gap-6 px-6 lg:px-10 pb-10 h-full min-h-0">
            {/* Document Previewer */}
            <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 flex flex-col shadow-inner">
              <div className="bg-white dark:bg-slate-900 px-4 py-2 border-b border-slate-300 dark:border-slate-700 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">
                    description
                  </span>
                  VISTA PREVIA DEL DOCUMENTO
                </span>
              </div>

              <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
                <motion.div
                  initial={{ filter: "blur(10px)", opacity: 0.5 }}
                  animate={{
                    filter: isExtracting ? "blur(5px)" : "blur(0px)",
                    opacity: 1,
                  }}
                  transition={{ duration: 1 }}
                  className="relative w-full max-w-md aspect-[1.586/1] bg-slate-100 dark:bg-slate-900 rounded-lg shadow-2xl border border-white/20 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-12 bg-primary/80 flex items-center px-4 text-white font-bold text-sm tracking-widest">
                    INSTITUTO NACIONAL ELECTORAL
                  </div>
                  <div className="p-6 pt-16 flex gap-4">
                    <div className="w-1/3 aspect-[3/4] bg-slate-300 dark:bg-slate-700 rounded-md bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAysPLmFCFspedMFO9-TkVN3KyyX-aeZ4jCBcyznEm8x9VV_sjzXJmLNuTAB3smFMnqZTHwkh7LqMDWQJl9KpfPBv748kzLthcs0sXZ1Fx3AhBZbJ6OQxjnnLd9_4ptagK3MPgOnSnZZPAhaolfocYCQOyhBwDShKIJ0Y1tfrL_ZR89LLYdIthJKtLA7NCLV9j3PYzamtliocdTa2hNKNxFqY8tv_5YyItiWQSsnFfURKaXedYaSZ__jxaaxz-va61ieloWfZgDwlHg')" }}></div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="h-4 bg-slate-300 dark:bg-slate-700 w-full rounded"></div>
                      <div className="h-4 bg-slate-300 dark:bg-slate-700 w-5/6 rounded"></div>
                      <div className="h-4 bg-slate-300 dark:bg-slate-700 w-4/6 rounded"></div>
                      <div className="mt-4 h-8 bg-slate-300 dark:bg-slate-700 w-full rounded border-2 border-dashed border-slate-400"></div>
                    </div>
                  </div>
                </motion.div>

                {isExtracting && (
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                    <motion.div
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear",
                      }}
                      className="absolute w-full max-w-lg h-[2px] bg-primary shadow-[0_0_15px_rgba(var(--primary),0.8)] z-10"
                    ></motion.div>
                  </div>
                )}
              </div>
            </div>

            {/* AI Extraction Form */}
            <div className="w-full lg:w-[450px] flex flex-col gap-6">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                    Estado de la Extracción
                  </h3>
                  <span className="text-primary font-bold text-lg">
                    {extractionProgress}%
                  </span>
                </div>
                <Progress value={extractionProgress} className="h-2 mb-4" />
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span
                      className={`material-symbols-outlined text-primary text-[18px] ${isExtracting ? "animate-spin" : ""
                        }`}
                    >
                      {isExtracting ? "sync" : "task_alt"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white leading-none">
                      {isExtracting
                        ? "Extrayendo datos..."
                        : "Extracción finalizada"}
                    </p>
                  </div>
                </div>
              </div>

              {(!isExtracting && localData.art492Checks) && (
                <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-amber-500">policy</span>
                    Reglas de Negocio (Art. 492)
                  </h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <span className={`material-symbols-outlined ${localData.art492Checks.idVigente ? "text-emerald-500" : localData.art492Checks.idVigente === false ? "text-rose-500" : "text-slate-400"}`}>
                        {localData.art492Checks.idVigente ? "check_circle" : localData.art492Checks.idVigente === false ? "cancel" : "help"}
                      </span>
                      <div>
                        <p className={`text-sm font-semibold ${localData.art492Checks.idVigente ? "text-emerald-700 dark:text-emerald-400" : localData.art492Checks.idVigente === false ? "text-rose-700 dark:text-rose-400" : "text-slate-500"}`}>Identificación Oficial Vigente</p>
                        <p className="text-xs text-slate-500 line-clamp-1">Validación de caducidad en pasaporte o credencial.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className={`material-symbols-outlined ${localData.art492Checks.domicilioReciente ? "text-emerald-500" : localData.art492Checks.domicilioReciente === false ? "text-rose-500" : "text-slate-400"}`}>
                        {localData.art492Checks.domicilioReciente ? "check_circle" : localData.art492Checks.domicilioReciente === false ? "cancel" : "help"}
                      </span>
                      <div>
                        <p className={`text-sm font-semibold ${localData.art492Checks.domicilioReciente ? "text-emerald-700 dark:text-emerald-400" : localData.art492Checks.domicilioReciente === false ? "text-rose-700 dark:text-rose-400" : "text-slate-500"}`}>Comprobante de Domicilio &lt; 3 meses</p>
                        <p className="text-xs text-slate-500 line-clamp-1">Antigüedad comprobado directo de fecha de emisión fiscal.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className={`material-symbols-outlined ${localData.art492Checks.nombresCoinciden ? "text-emerald-500" : localData.art492Checks.nombresCoinciden === false ? "text-rose-500" : "text-slate-400"}`}>
                        {localData.art492Checks.nombresCoinciden ? "check_circle" : localData.art492Checks.nombresCoinciden === false ? "cancel" : "help"}
                      </span>
                      <div>
                        <p className={`text-sm font-semibold ${localData.art492Checks.nombresCoinciden ? "text-emerald-700 dark:text-emerald-400" : localData.art492Checks.nombresCoinciden === false ? "text-rose-700 dark:text-rose-400" : "text-slate-500"}`}>Coincidencia de Titularidad</p>
                        <p className="text-xs text-slate-500 line-clamp-1">El nombre fiscal cuadra matemáticamente con Identidad Oficial.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-5">
                <div className="relative group">
                  <label className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 block">
                    Nombre Completo
                  </label>
                  <Input
                    readOnly={!needsReview}
                    value={localData.nombreCompleto}
                    onChange={(e) =>
                      setLocalData({ ...localData, nombreCompleto: e.target.value })
                    }
                    className={`${!needsReview && !isExtracting
                      ? "bg-emerald-500/5 border-emerald-500/30"
                      : ""
                      }`}
                  />
                </div>

                <div className="relative">
                  <label className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 block">
                    RFC (Cédula Fiscal)
                  </label>
                  <Input
                    readOnly={!needsReview}
                    value={localData.rfc || ""}
                    onChange={(e) =>
                      setLocalData({ ...localData, rfc: e.target.value })
                    }
                    className={`${!needsReview && !isExtracting
                      ? "bg-emerald-500/5 border-emerald-500/30"
                      : ""
                      }`}
                  />
                </div>

                <div className="relative">
                  <label className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 block">
                    CURP
                  </label>
                  <Input
                    readOnly={!needsReview}
                    value={localData.curp || ""}
                    onChange={(e) =>
                      setLocalData({ ...localData, curp: e.target.value })
                    }
                    className={`${!needsReview && !isExtracting
                      ? "bg-emerald-500/5 border-emerald-500/30"
                      : ""
                      }`}
                  />
                </div>

                <div className="relative">
                  <label className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 block">
                    Dirección
                  </label>
                  <Input
                    readOnly={!needsReview}
                    value={localData.direccion}
                    onChange={(e) =>
                      setLocalData({ ...localData, direccion: e.target.value })
                    }
                    className={`${!needsReview && !isExtracting
                      ? "bg-emerald-500/5 border-emerald-500/30"
                      : ""
                      }`}
                  />
                </div>

                <div className="relative">
                  <label className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 block">
                    Teléfono
                  </label>
                  <Input
                    readOnly={!needsReview}
                    value={localData.telefono || ""}
                    onChange={(e) =>
                      setLocalData({ ...localData, telefono: e.target.value })
                    }
                    className={`${!needsReview && !isExtracting
                      ? "bg-emerald-500/5 border-emerald-500/30"
                      : ""
                      }`}
                  />
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <AnimatePresence mode="wait">
                    {needsReview ? (
                      <motion.div
                        key="manual_save"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                      >
                        <Button
                          onClick={handleManualSave}
                          className="w-full bg-slate-900 text-white font-bold py-6 rounded-lg shadow-lg flex items-center justify-center gap-2"
                        >
                          Guardar Correcciones
                          <span className="material-symbols-outlined text-[18px]">
                            save
                          </span>
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="continue"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                      >
                        <Button
                          onClick={handleContinue}
                          disabled={isExtracting}
                          className={`w-full font-bold py-6 rounded-lg shadow-lg flex items-center justify-center gap-2 ${validationStatus === "approved"
                            ? "bg-primary text-white hover:bg-primary/90"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                            }`}
                        >
                          Validar y Continuar
                          <span className="material-symbols-outlined text-[18px]">
                            arrow_forward
                          </span>
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {!isExtracting && validationStatus === "approved" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-primary/90 text-white p-4 rounded-xl flex gap-3 items-start"
                >
                  <span className="material-symbols-outlined text-[24px]">
                    lightbulb
                  </span>
                  <div>
                    <p className="text-xs font-bold mb-1">
                      Tip de Inteligencia
                    </p>
                    <p className="text-[11px] opacity-90 leading-relaxed">
                      Hemos detectado que el RFC coincide con nuestra base de
                      datos de clientes existentes. Se han precargado datos
                      adicionales.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
