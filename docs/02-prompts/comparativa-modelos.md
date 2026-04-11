# Comparativa de Modelos IA: Generación de HTML Semántico

## 1. Contexto de la Prueba
- **Tarea elegida:** Maquetación de una tarjeta de producto (Product Card) para el E-commerce.
- **Modelos evaluados:** Claude 4.6 Sonnet vs. Gemini 3.1 Pro.
- **Prompt base utilizado:** *"Actúa como un desarrollador Frontend Senior. Necesito que escribas el código HTML5 semántico para la tarjeta de un producto (Product Card) de un E-commerce. La tarjeta debe contener: una imagen del producto, título, precio, una breve descripción y un botón de 'Agregar al carrito'. No uses CSS, solo HTML puro con las etiquetas semánticas correctas de HTML5."*

## 2. Análisis de Claude 4.6 Sonnet
- **Estructura generada:** Entregó un documento HTML5 completo (`<!DOCTYPE html>`, `<head>`, `<body>`).
- **Uso Semántico:** Excelente. Anidó el componente dentro de un `<main>` y `<section>`. Utilizó `<article>`, `<figure>`, `<header>` y `<footer>`.
- **Puntos fuertes:** Hizo un uso exhaustivo de atributos de accesibilidad (`aria-label`) y etiquetas para formato de texto como `<del>` (para el precio viejo) y `<mark>` (para resaltar descuentos).
- **Puntos débiles:** El código es un poco extenso si solo se necesitaba el componente aislado.

## 3. Análisis de Gemini 3.1 Pro
- **Estructura generada:** Entregó estrictamente el componente aislado, comenzando directamente desde la etiqueta `<article>`.
- **Uso Semántico:** Muy preciso y limpio. Utilizó la etiqueta `<data>` para el precio, lo cual es una excelente práctica para que los motores de búsqueda interpreten valores numéricos.
- **Puntos fuertes:** Código muy limpio y orientado a componentes. Agregó el atributo `loading="lazy"` a la imagen, demostrando conocimiento en buenas prácticas de performance web.
- **Puntos débiles:** Omitió los atributos de accesibilidad (`aria-label`) que Claude sí incluyó.

## 4. Conclusión Técnica
Ambos modelos demostraron un alto nivel de comprensión de las etiquetas semánticas introducidas en HTML5. 
Para el desarrollo de nuestro E-commerce, **Claude** resulta mejor para establecer la estructura base e inclusiva de la página (Accesibilidad), mientras que **Gemini** es más directo y eficiente para generar componentes modulares y optimizados para el rendimiento. Se recomienda usar una combinación de ambos: la estructura de Claude con las micro-optimizaciones (como `<data>` y `lazy loading`) de Gemini.