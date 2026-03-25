# Prompt 1: Generación de plan.md

- **Rol:** Coordinador / DevOps
- **Modelo de IA utilizado:** GPT-5-mini
- **Método / Técnica:** *Zero-Shot Prompting* con inyección de contexto.
- **Contexto Proveído:** Se le dio el texto exacto de los requerimientos de la cátedra para que los adapte al formato del proyecto.

## Prompt Exacto
> Actualiza el plan.md con esta informacion:
Desarrollo de una Página Interactiva: [Sobre un E-commerce]
En esta primera entrega, crearás la estructura básica de una página web que servirá
como base para un proyecto interactivo que desarrollarás a lo largo del curso. La
página web estará enfocada en [E-commerce], ofreciendo información inicial sobre
el mismo y estableciendo las bases para futuras funcionalidades.
2.1 REQUERIMIENTOS PARA ESTA ENTREGA
1. Estructura HTML:
Utiliza HTML5 para estructurar la página.
Incluye elementos básicos como título, párrafos, imágenes, enlaces, listas,
formularios y tablas relacionados con tu tema.
Introduce etiquetas semánticas pertinentes para mejorar la accesibilidad y el
SEO.
2. Maquetación CSS:
No es requerida en esta entrega, pero deja marcadores o comentarios en tu
código para indicar dónde se aplicarán estilos en futuras entregas.
3. Interactividad JavaScript:
No es requerida en esta entrega, pero planifica y deja marcadores o
comentarios en tu código para indicar dónde se integrarán funcionalidades
interactivas en futuras entregas.
4. Documentación:
Incluye comentarios claros y concisos en tu código HTML para explicar la
estructura y los elementos utilizados.
Identifica áreas futuras de desarrollo en tu código para guiar las próximas
etapas del proyecto.
Antes de iniciar con el desarrollo del proyecto, es fundamental proporcionar
una descripción detallada del mismo en el archivo README.md de tu
repositorio en GitHub.
5. Especificación técnica (Spec-Driven Development):
●Antes de iniciar cualquier tarea de desarrollo, el integrante responsable
debe redactar una especificación técnica en formato Markdown
describiendo qué se va a hacer, por qué y con qué criterios se
considerará terminado. Esta especificación se escribe antes de realizar
código y se incluye en el PR correspondiente.

●Cada rol tiene un archivo asignado en docs/specs/:
○docs/specs/spec-devops.md
○docs/specs/spec-frontend.md
○docs/specs/spec-ux.md
○docs/specs/spec-ia.md
Un PR sin su spec no será aprobado. El detalle de responsabilidades
por rol se encuentra en la sección 3.
6. IA y Prompt Engineering:
En el repositorio, crear una carpeta llamada docs y la subcarpeta
/02-prompts/, dentro contendra diferentes archivos markdown
prompts-x.md donde se documenten al menos 5 prompts utilizados con
modelos de IA diferentes (ChatGPT, Gemini, Claude, Copilot, Cursor, etc.)
que hayan aportado valor al proyecto actual (no algo ficticio).


## Resultados
- **Resultado Esperado:** Un archivo `plan.md` formateado en Markdown con las tareas divididas por roles.
- **Resultado Obtenido:** La IA generó correctamente la estructura, reconociendo los puntos clave de la entrega.
- **Correcciones Manuales:** Se ajustaron detalles menores de formato para que encajara con el repositorio base del equipo.

**Aplicacion en el proyecto:**
Archivo plan.md 