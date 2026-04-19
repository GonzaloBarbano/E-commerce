# 🔧 Configuración de MCPs para Testing

**Última actualización:** 13 de abril de 2026

## 📋 Resumen

Se han instalado y configurado dos MCPs (Model Context Protocol servers) necesarios para el testing del proyecto E-commerce:

1. **Playwright MCP** (`@playwright/mcp`) - Para ejecutar tests automatizados
2. **GitHub MCP** (`@modelcontextprotocol/server-github`) - Para crear issues de bugs

---

## ✅ Instalación Completada

```bash
$ npm install -D @playwright/mcp @modelcontextprotocol/server-github
added 49 packages in 9s
```

### Archivos Creados/Modificados

- ✅ `.vscode/mcp.json` - Configuración de MCPs actualizada
- ✅ `.env.example` - Template para variables de entorno
- ✅ `.gitignore` - Creado con reglas de exclusión

---

## 🎯 Configuración Necesaria

### Paso 1: Crear Archivo `.env`

Desde la carpeta raíz del proyecto:

```bash
cp .env.example .env
```

### Paso 2: Obtener GitHub Personal Access Token

1. **Ir a GitHub Settings:**
   - Abre https://github.com/settings/tokens
   - O: GitHub Profile → Settings → Developer settings → Personal access tokens

2. **Generar Nuevo Token (Classic):**
   - Click en **"Generate new token"**
   - Seleccionar **"Generate new token (classic)"**

3. **Configurar Token:**
   - **Note:** `E-commerce MCP Testing` (nombre identificador)
   - **Expiration:** 90 days (o preferencia personal)
   - **Scopes (Permisos):** Seleccionar:
     - ✅ `repo` (full control of private repositories)
     - ✅ `issues` (read and write access)
     - ✅ `workflow` (para acceso a GitHub Actions, opcional)

4. **Copiar Token:**
   - Copiar el token generado (aparece solo una vez)
   - ⚠️ **IMPORTANTE:** Guardar en lugar seguro

### Paso 3: Configurar `.env`

Abre `.env` (en la raíz del proyecto) y actualiza:

```env
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Reemplaza `ghp_xxx...` con tu token real.

**Ejemplo completo de `.env`:**
```env
# GitHub MCP Configuration
GITHUB_TOKEN=ghp_1234567890abcdefghijklmnopqrstuv

# No agregar espacios alrededor del =
# No usar comillas: GITHUB_TOKEN="ghp_xxx" ❌
# Formato correcto: GITHUB_TOKEN=ghp_xxx ✅
```

---

## 🧪 Verificación de Configuración

### Verificar Playwright MCP

En VS Code:

1. Abre **Copilot Chat** (Cmd+Shift+I)
2. Activa **Agent Mode** (esquina superior derecha)
3. Prueba este prompt:

```
Usa Playwright MCP para verificar que http://localhost:3000 está disponible.
Captura un screenshot de la página.
```

**Resultado esperado:**
- Copilot ativa Playwright MCP
- Abre el navegador contra localhost:3000
- Captura screenshot

### Verificar GitHub MCP

En VS Code Copilot Agent Mode:

```
Usa GitHub MCP para listar los últimos 5 issues del repositorio.
```

**Resultado esperado:**
- Copilot conecta a GitHub API
- Muestra lista de issues recientes

### Troubleshooting

**❌ "Playwright MCP not found"**
```bash
# Verificar instalación
npm list @playwright/mcp

# Reinstalar si es necesario
npm install -D @playwright/mcp
```

**❌ "GitHub MCP Error: Invalid credentials"**
- Verificar que GITHUB_TOKEN está correctamente asignado en `.env`
- Verificar que el token no expiró
- Regenerar token si es necesario

**❌ "Cannot read .env file"**
- Verificar que `.env` existe en raíz del proyecto
- Verificar formato: `GITHUB_TOKEN=ghp_xxx` (sin espacios)
- Reiniciar VS Code

---

## 📁 Estructura de Configuración

```
E-commerce/
├── .vscode/
│   ├── mcp.json          ← Configuración de MCPs (modificado)
│   └── ...
├── .env                  ← Variables de entorno (CREAR con token)
├── .env.example          ← Template de .env (no modificar)
├── .gitignore            ← Reglas de git (creado)
├── node_modules/
│   ├── @playwright/mcp/  ← Playwright MCP instalado
│   └── @modelcontextprotocol/server-github/  ← GitHub MCP
└── ...
```

---

## 🔌 Configuración del `.vscode/mcp.json`

El archivo está configurado como sigue:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@figma/code-connect"]
    },
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp"]
    },
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

**Explicación:**
- **figma:** Ya estaba configurado
- **playwright:** Ejecuta Playwright MCP vía npx (no requiere variables de entorno)
- **github:** Ejecuta GitHub MCP vía npx, con GITHUB_TOKEN como variable de entorno

---

## 🚀 Uso en Testing

### Workflow de Testing Moment 1 (Pre-Merge)

```bash
# 1. Activar Playwright MCP en Copilot Agent Mode
# 2. Lanzar Live Preview contra http://localhost:3000
# 3. Ejecutar test cases via prompts
# 4. Usar GitHub MCP para crear issues

# Prompt ejemplo:
"Ejecutar test de compatibilidad con Playwright MCP en Chrome, 
Firefox, Safari, Edge contra http://localhost:3000.
Usar GitHub MCP para crear issue por cada bug encontrado."
```

### Variables de Entorno Disponibles

En Copilot Agent Mode, estos MCPs acceden automáticamente a:

```env
GITHUB_TOKEN=ghp_xxx  # Token de GitHub (desde .env)
# Playwright MCP no requiere variables adicionales
```

---

## 🔐 Seguridad

**⚠️ IMPORTANTE:**

- **`.env` está en `.gitignore`** - Nunca se hace commit
- **El GITHUB_TOKEN NO debe compartirse** - Solo para tu máquina
- **Permisos mínimos** - El token tiene acceso limitado a `repo` e `issues`
- **Regenerar si hay breach** - Si accidentalmente se commitea, regenera el token en GitHub

---

## 📚 Referencias

- **Playwright MCP Docs:** https://github.com/microsoft/playwright-mcp
- **GitHub MCP Docs:** https://github.com/modelcontextprotocol/servers
- **GitHub Personal Access Tokens:** https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

---

## ✅ Checklist de Configuración

- [ ] npm install -D @playwright/mcp completado
- [ ] npm install -D @modelcontextprotocol/server-github completado
- [ ] `.vscode/mcp.json` actualizado
- [ ] `.env` creado desde `.env.example`
- [ ] GITHUB_TOKEN obtenido desde https://github.com/settings/tokens
- [ ] GITHUB_TOKEN pegado en `.env`
- [ ] Playwright MCP verificado en Copilot Agent Mode
- [ ] GitHub MCP verificado en Copilot Agent Mode
- [ ] `.env` está en `.gitignore` (verificar)

---

**Estado:** Configuración Completada ✅  
**Próximo paso:** Usar prompts de testing en Copilot Agent Mode con spec-qa.md
