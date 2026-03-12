### Estructura BASE de Notion



> “Usando ASDD, genera toda la estructura completa de Notion para el proyecto ‘TraceFlow AI’ (o el nombre que elijas). Usa exactamente esta plantilla como base y crea todas las páginas, bases de datos y relaciones automáticamente.”

#### Estructura exacta que debe generar el agente:

**Página raíz (Home)**  
Título: TraceFlow AI – Agentic Spec-Driven Development  
Icono: 📊  
Contenido inicial:
- Dashboard con 4 blozos sincronizados:
  - Últimas actualizaciones de MEMORY (linked view)
  - Tareas en progreso (linked view)
  - Specs pendientes
  - Quick links a CLAUDE.md y Roadmap

**1. Base de datos principal: TASKS** (tipo Database – Table o Board)  
Propiedades obligatorias:
- Name
- Status (Select: To Do / In Progress / Review / Done)
- Type (Select: Feature / Bug / Refactor / ADR / Test)
- Spec (Relation → Specs DB)
- Priority (Select)
- Assignee (Person or AI)
- Due Date
- Linked Files (Multi-select or text)
- Git Branch (text)

Vistas que debe crear automáticamente:
- Board por Status
- Table “In Progress + Review”
- Calendar
- Gallery “Done this week”

**2. Página: /memory**  
Título: MEMORY.md (Live Brain)  
Tipo: Página normal + Database inline de “Log Entries”  
Cada entrada tiene:
- Date (auto)
- Author (Human / AI)
- Change Summary
- Impact on Specs
- Files Affected

**3. Base de datos: SPECS** (la fuente de verdad)  
Propiedades:
- Title
- Type (Feature / ADR / Architecture / API)
- Status (Draft / Approved / Implemented / Deprecated)
- Version (text)
- Linked Tasks (Relation bidireccional con TASKS)
- Decision Date
- Rationale (text area larga)

Vistas:
- Table completa
- Linked view “Current Architecture”
- Gallery de ADRs

**4. Página: CLAUDE.md** (reglas de comportamiento)  
Título: CLAUDE.md – Agent Instructions (NO TOCAR)  
Contenido (el agente debe pegar aquí todas las reglas que le des):
- Reglas de calidad
- Estándar de código
- Formato de respuestas
- Cómo debe actualizar MEMORY y SPECS
- Reglas específicas de tu app (soporte VB6, .NET, detección de Sub/Function, extracción SQL, generación de diagramas Mermaid/PlantUML, exportación IA, etc.)

**5. Página: ARCHITECTURE** (dentro de Specs)
- Tech stack (Tauri + TS + React + IA backend)
- Diagrama de alto nivel (el agente lo genera)
- Decisiones técnicas (ADRs)

**6. Página: ROADMAP & BACKLOG**  
Database inline filtrada de TASKS + Specs.

**7. Página: DOCUMENTACIÓN DEL PRODUCTO**  
Subpáginas:
- Visión y alcance
- User stories
- Especificación técnica completa (lo que me contaste: análisis de llamadas, detección pública/privada, SQL extraction, migración IA, soporte VB6/.NET/TS/JS, diagrama de flujo, etc.)

**Instrucciones extras que le das al agente** (añádelas al prompt):
- Todas las bases de datos deben tener relaciones bidireccionales.
- Crear templates para nuevas Features y ADRs.
- Usar emojis consistentes.
- Habilitar “Sync block” para que el agente pueda actualizar en vivo.
- Generar al menos 5 tareas de ejemplo ya creadas (la primera debe ser “Implementar parser VB6”).
