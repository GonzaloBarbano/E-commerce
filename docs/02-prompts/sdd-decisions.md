# Decisiones sobre Spec-Driven Development (SDD)

## 1. ¿Qué es SDD y por qué lo usamos?
Spec-Driven Development (SDD) es una metodología donde especificamos detalladamente los requerimientos técnicos y funcionales antes de comenzar la implementación. 
En este proyecto, usamos SDD para darle un contexto perfecto a nuestros Agentes de IA (ej. GitHub Copilot). Un buen spec se traduce en un buen prompt, lo que minimiza las alucinaciones de la IA y reduce el retrabajo.

## 2. Flujo de Trabajo del Equipo
1. **Planificación:** El Coordinador define las tareas globales en el `plan.md`.
2. **Especificación:** Cada rol crea su archivo `spec-[rol].md` basado en el `plan.md` ANTES de empezar a desarrollar.
3. **Validación:** El Especialista en IA revisa que los specs tengan instrucciones claras y criterios de aceptación medibles para que los Agentes de IA puedan procesarlos correctamente.
4. **Ejecución:** El integrante ejecuta su tarea utilizando su spec como contexto base para sus prompts.

## 3. Orden de Ejecución de los Specs
Para este proyecto de E-commerce, el orden lógico de creación y ejecución de los specs será:
1. `spec-coordinador.md`: (Infraestructura, repositorio, issues base).
2. `spec-ux.md`: (Diseño, wireframes, paleta de colores).
3. `spec-frontend.md`: (Maquetación HTML basada en el diseño de UX).
4. `spec-ia.md`: (Documentación de prompts, revisión de uso de IA y code reviews).

## 4. Validación contra el plan.md
Cada spec debe incluir un enlace directo o referencia a la tarea asignada en el archivo `plan.md` general. Si una tarea en un spec no contribuye a un requerimiento del `plan.md`, se considera "fuera de alcance" (scope creep) y no debe implementarse.

## 5. Configuración de Herramientas (Tooling)
Para ejecutar correctamente esta metodología, utilizar la IA como agente y automatizar los Code Reviews, todo el equipo debe tener instaladas las siguientes extensiones en Visual Studio Code:

### 5.1 GitHub Copilot & Copilot Chat
1. Ir a la pestaña de Extensiones en VS Code (`Ctrl+Shift+X` o `Cmd+Shift+X`).
2. Buscar e instalar la extensión oficial **GitHub Copilot**.
3. Buscar e instalar **GitHub Copilot Chat**.
4. Hacer clic en el ícono de perfil en la parte inferior izquierda de VS Code e iniciar sesión con la cuenta de GitHub (idealmente la cuenta de GitHub Education para acceso gratuito).

### 5.2 GitHub Pull Requests and Issues
Esta extensión es vital para el rol del Coordinador / DevOps al momento de revisar código con IA.
1. En la pestaña de extensiones, buscar e instalar **GitHub Pull Requests and Issues** (oficial de GitHub).
2. Iniciar sesión y autorizar a VS Code para acceder al repositorio del equipo.
3. Esta herramienta permite ver los "diffs" (diferencias de código), interactuar con los PRs y dejar los comentarios de Code Review generados por el agente IA directamente desde el editor sin salir de VS Code.