# PersonalWeb - Portfolio Profesional

Un sitio web personal moderno tipo portfolio/CV diseñado para impresionar a empresas y reclutadores.

## 🚀 Características

- **Diseño Moderno y Minimalista**: Layout limpio con paleta de colores oscuros y acentos en azul eléctrico y verde menta
- **Totalmente Responsive**: Optimizado para móvil, tablet y desktop
- **Modo Claro/Oscuro**: Toggle para cambiar entre temas con preferencia guardada
- **Animaciones Suaves**: Efectos hover, scroll reveal y transiciones elegantes
- **Navegación Intuitiva**: Navbar fija con scroll suave entre secciones
- **Formulario de Contacto**: Integración con EmailJS para recibir mensajes

## 📋 Secciones

1. **Hero** - Introducción con foto de perfil, título y enlaces sociales
2. **Sobre mí** - Descripción profesional y personal
3. **Habilidades** - Grid de tecnologías con tooltips informativos
4. **Proyectos** - Showcase de proyectos con tarjetas interactivas
5. **Educación** - Timeline de formación académica
6. **Contacto** - Formulario funcional para contacto directo

## 🛠️ Tecnologías

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox, Animations)
- JavaScript Vanilla (ES6+)
- Font Awesome (Iconos)
- Google Fonts (Inter)
- EmailJS (Formulario de contacto)

## 📦 Estructura del Proyecto

```
PersonalWeb/
├── index.html          # Estructura principal
├── styles.css          # Estilos y animaciones
├── script.js           # Funcionalidad JavaScript
├── assets/             # Recursos multimedia
│   ├── profile.jpg     # Foto de perfil
│   ├── project1.jpg    # Imagen proyecto 1
│   ├── project2.jpg    # Imagen proyecto 2
│   ├── project3.jpg    # Imagen proyecto 3
│   └── cv.pdf          # Curriculum en PDF
└── README.md           # Este archivo
```

## 🚀 Cómo Usar

### 1. Personalización Básica

Abre `index.html` y actualiza:
- Tu nombre completo
- Título profesional
- Enlaces a redes sociales (LinkedIn, GitHub, Email)
- Sección "Sobre mí" con tu información
- Proyectos y experiencias
- Educación y certificaciones

### 2. Configuración de EmailJS

Para que el formulario de contacto funcione:

1. Regístrate en [EmailJS](https://www.emailjs.com/)
2. Crea un servicio de email
3. Crea una plantilla de email
4. En `script.js`, reemplaza:
   - `YOUR_PUBLIC_KEY` con tu Public Key
   - `YOUR_SERVICE_ID` con tu Service ID
   - `YOUR_TEMPLATE_ID` con tu Template ID

```javascript
// Línea 120 en script.js
emailjs.init('TU_PUBLIC_KEY');

// Líneas 145-150 en script.js
const response = await emailjs.send(
    'TU_SERVICE_ID',
    'TU_TEMPLATE_ID',
    { ... }
);
```

### 3. Reemplazar Imágenes

- Coloca tu foto de perfil como `assets/profile.jpg` (200x200px recomendado)
- Añade imágenes de proyectos como `assets/project1.jpg`, etc. (400x300px recomendado)
- Reemplaza `assets/cv.pdf` con tu CV real en formato PDF

### 4. Despliegue

Puedes desplegar este sitio en:
- **GitHub Pages**: Gratuito y fácil
- **Netlify**: Deploy automático desde Git
- **Vercel**: Ideal para proyectos web
- **Cualquier hosting web**: Solo necesitas subir los archivos

#### Despliegue en GitHub Pages:
```bash
# En la configuración del repositorio
Settings > Pages > Source: main branch
```

## 🎨 Personalización de Estilos

Los colores principales se definen en `:root` en `styles.css`:

```css
:root {
    --bg-primary: #0a0e27;          /* Fondo principal */
    --accent-primary: #00d4ff;       /* Azul eléctrico */
    --accent-secondary: #7dd3c0;     /* Verde menta */
    /* ... más variables ... */
}
```

Modifica estas variables para cambiar la paleta de colores del sitio completo.

## ✨ Características Adicionales

- **Tooltips en Habilidades**: Hover sobre cada skill para ver descripción
- **Animaciones de Scroll**: Las secciones se animan al entrar en viewport
- **Navegación Activa**: El link de navegación se resalta según la sección visible
- **Mensajes en Consola**: Mensaje de bienvenida personalizado para developers curiosos
- **Parallax Sutil**: Efecto parallax en la sección hero
- **Imágenes con Fallback**: SVG placeholders si las imágenes no cargan

## 📱 Responsive Design

- **Desktop**: Vista completa con todas las características
- **Tablet**: Layout adaptado manteniendo funcionalidad
- **Mobile**: Menú hamburguesa, cards en columna única

## 🔧 Desarrollo Local

1. Clona el repositorio
2. Abre `index.html` en tu navegador
3. No requiere servidor de desarrollo (es HTML estático)

Para live reload durante desarrollo, puedes usar:
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve

# Con VS Code
# Instala "Live Server" extension
```

## 📝 Licencia

Este proyecto es de código abierto. Siéntete libre de usarlo como base para tu propio portfolio.

## 🤝 Contacto

- **LinkedIn**: [Tu perfil](https://linkedin.com/in/tu-perfil)
- **GitHub**: [@robmg9655](https://github.com/robmg9655)
- **Email**: contacto@ejemplo.com

---

**Nota**: Recuerda reemplazar todos los placeholders con tu información real antes de publicar el sitio.