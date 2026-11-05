# YPF Bombal — página de enlaces

Mini página oficial de YPF Bombal para la biografía de Instagram.
Reemplaza a Linktree. Es una página estática: no necesita servidor, base de datos ni pagos.

## Qué hay en cada carpeta

```
index.html               ← la página
assets/
  css/styles.css         ← colores, tipografía y diseño
  js/resenas.js          ← LAS RESEÑAS (el único archivo a tocar para actualizarlas)
  js/main.js             ← arma el carrusel (no hace falta tocarlo)
  logos/                 ← logos originales de YPF Bombal + versiones livianas para web
  img/og-image.png       ← imagen que aparece al compartir el enlace
.nojekyll                ← necesario para GitHub Pages (no borrar)
```

## Cómo verla en tu computadora

Hacé doble clic en `index.html`. Se abre en el navegador.

## Cómo actualizar las reseñas

1. Abrí `assets/js/resenas.js` con cualquier editor de texto (TextEdit en modo texto, o VS Code).
2. Seguí las instrucciones que están arriba de todo en ese archivo.
3. Copiá las reseñas **textuales** desde Google Maps. No inventes ni edites el contenido.
4. Borrá los bloques `{ ejemplo: true }` a medida que cargues reseñas reales.

## Cambiar enlaces

Los enlaces de Google Maps y TikTok están en `index.html` (buscá `maps.app.goo.gl` y `tiktok.com`).

## Dirección publicada

https://luciatanoni25-eng.github.io/ypf-bombal-links/

## Cómo actualizar la página publicada (sin instalar nada)

1. Entrá a https://github.com/luciatanoni25-eng/ypf-bombal-links con tu cuenta.
2. Abrí el archivo que quieras cambiar (por ejemplo `assets/js/resenas.js`).
3. Tocá el ícono del lápiz (✏️ "Edit this file").
4. Hacé el cambio y tocá el botón verde **Commit changes…** y otra vez **Commit changes**.
5. En 1 o 2 minutos la página se actualiza sola.

Para cambiar una imagen: abrí la carpeta, tocá **Add file → Upload files** y subí
la nueva imagen con el **mismo nombre** que la anterior.
