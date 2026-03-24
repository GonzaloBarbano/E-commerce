# Prompt 5: Base para Comparativa de Modelos (Product Card)

- **Rol:** Especialista en IA y Prompt Engineering
- **Modelo de IA utilizado:** ChatGPT (GPT-4o) y Gemini 1.5 Pro
- **Método / Técnica:** *Role Prompting* + *Zero-shot Prompting* con restricciones claras.
- **Contexto Proveído:** Ninguno (prueba en entorno aislado para evaluar la calidad base de generación de código HTML5 semántico).

## Prompt Exacto
> Actúa como un desarrollador Frontend Senior. Necesito que escribas el código HTML5 semántico para la tarjeta de un producto (Product Card) de un E-commerce. La tarjeta debe contener: una imagen del producto, título, precio, una breve descripción y un botón de 'Agregar al carrito'. No uses CSS, solo HTML puro con las etiquetas semánticas correctas de HTML5.

## Resultados
- **Resultado Esperado:** Un fragmento de código HTML5 utilizando etiquetas como `<article>`, `<figure>`, `<figcaption>` y botones estructurados.
- **Resultado Obtenido:** Ambos modelos generaron el código, pero se notaron diferencias en la elección semántica de las etiquetas, lo cual servirá de base para el archivo de comparativa.
- **Correcciones Manuales:** Ninguna, el código generado se utilizó tal cual para el análisis comparativo.