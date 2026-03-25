# Prompt 3: Generación de código HTML desde Mockup

- **Rol:** Desarrollador Frontend
- **Modelo de IA utilizado:** Claude 4.5 Haiku 
- **Método / Técnica:** *Prompt Multimodal* (Análisis de enlace/imagen) + *Inyección de Contexto* (Archivos base).
- **Contexto Proveído:** Se le dio acceso al archivo `plan.md`, al `spec-frontend.md` y un enlace directo al diseño en Figma.

## Prompt Exacto
> Teniendo en cuenta el plan.md y el spec-frontend.md. Genera un simple HTML desde este diseño de figma: https://www.figma.com/design/r07vXwitxehsc5eUGyAmNK/%22E-commerce---Mockup-Inicial?node-id=1-3&m=dev&t=sy8c1Q1DOpboUMc4-1

## Resultados
- **Resultado Esperado:** Un archivo `index.html` estructurado semánticamente que refleje el diseño visual propuesto en Figma, sin utilizar CSS.
- **Resultado Obtenido:** La IA interpretó correctamente las secciones del diseño visual y las tradujo a etiquetas HTML.
- **Correcciones Manuales:** Se validó que las etiquetas semánticas (`<header>`, `<main>`, `<section>`) estuvieran correctamente aplicadas según lo requerido en la Unidad 1.

**Aplicacion en el proyecto:**
Archivo index.html 