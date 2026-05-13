# Telecom Web - Claro Ecuador

Este proyecto es una landing page estática para la promoción de condonación y financiación de Claro Ecuador.

## Cómo verla en tu celular (local)

1. Asegúrate de que tu celular y tu PC estén conectados a la misma red Wi-Fi.
2. Abre una terminal en `c:\Users\USER\Desktop\telecom-web`.
3. Ejecuta uno de estos comandos:
   - Con Python 3:
     ```powershell
     python -m http.server 8000
     ```
4. En tu celular abre el navegador y visita:
   ```
   http://<tu-ip-local>:8000
   ```
   Por ejemplo: `http://192.168.1.10:8000`

## Cómo compartirla públicamente

### Opción 1: GitHub Pages

1. Crea una cuenta en GitHub si no tienes.
2. Crea un nuevo repositorio.
3. Sube los archivos del proyecto: `index.html`, `logo-claro.jpg`, `hogar.jpg`, `18+imp.jpg`, `14+imp.jpg`, `README.md`.
4. En la configuración del repositorio activa GitHub Pages desde la rama `main` y la carpeta `/root`.
5. GitHub te dará una URL pública, por ejemplo:
   `https://tuusuario.github.io/tu-repo`

### Opción 2: Netlify o Vercel

- Conecta tu repositorio de GitHub o sube la carpeta directamente.
- Estas plataformas crean una URL pública automáticamente.

## Publicación automática desde Windows

1. Instala Git en Windows: https://git-scm.com/download/win
2. Abre la carpeta `c:\Users\USER\Desktop\telecom-web`.
3. Haz doble clic en el archivo `publish.ps1`.
4. Pega la URL de tu repositorio GitHub cuando el script lo solicite.

> Antes de ejecutar el script, crea el repositorio en GitHub y copia su URL.

## Nota importante

- En este entorno no está instalado Git, por lo que no puedo hacer el `push` directamente a GitHub.
- Si instalas Git o usas GitHub Desktop, puedo darte los comandos exactos para subir el proyecto.

## Qué puedo hacer por ti ahora

- Preparar los archivos para subir a GitHub.
- Crear el repositorio paso a paso.
- Generar comandos para `git` y `GitHub Pages`.
- Ayudarte a publicar en Netlify o Vercel.
