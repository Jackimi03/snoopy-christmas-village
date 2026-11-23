# La aldea de Snoopy

Aplicación React, TypeScript y Vite con Pages Functions y D1. La versión completa está publicada en https://snoopy-christmas-village.pages.dev/. El repositorio también conserva una versión estática en GitHub Pages, que no incluye la API ni el progreso privado.

## Desarrollo

Instalar dependencias con `npm ci`, ejecutar `npm test` y compilar con `npm run build`. Vite por sí solo no ejecuta las funciones `/api`; para probarlas, utilice Wrangler Pages y una base D1 local aislada. La zona horaria de los desbloqueos es America/Panama y la fecha se comprueba en el servidor.

## Despliegue

El proyecto `snoopy-christmas-village` usa `wrangler.toml` para vincular la base D1 existente bajo el nombre `DB`. Una vez autenticado en la cuenta correcta, compile con `npm run build` y use `npx wrangler pages deploy dist --project-name snoopy-christmas-village --branch main`. Los despliegues son directos, no automáticos desde GitHub. No se ha configurado ningún dominio personalizado ni DNS.

## Accesos privados

Los enlaces privados contienen credenciales individuales. Se crearon dos tokens aleatorios y solo se almacenan sus hashes SHA-256 en D1. No incluya los enlaces en Git, registros ni mensajes públicos. El token se retira de la barra al abrir el enlace y se mantiene en la sesión de esa pestaña. Cada destinataria introduce su nombre; sus progresos se consultan con su propia credencial.

La configuración y pruebas en producción confirmaron ambos accesos, el rechazo de un token inválido y el bloqueo de futuras sorpresas. Las pruebas locales cubren el cambio de fecha de Panamá, la separación de progreso y los 24 contenidos. La apertura real del primer día aún debe verificarse a partir del 1 de diciembre de 2026.

## Recursos gráficos

La imagen de Snoopy y Woodstock fue proporcionada por el usuario y se encuentra en `public/snoopy-woodstock.png`, aislada mediante `src/characters.tsx` para facilitar su sustitución. Revise los derechos de uso de Peanuts para su publicación. El escenario fue generado para este proyecto.

## Aldea 3D y música

La aldea utiliza Three.js. Se puede caminar con las flechas del teclado o mantener pulsados los controles táctiles; al tocar una casa, Snoopy camina hacia ella y abre su actividad. Si WebGL no está disponible, los enlaces bajo la escena permiten acceder a las actividades.

La música opcional es «Jingle Bells» de Kevin MacLeod (incompetech.com), publicada bajo Creative Commons Attribution 3.0: https://creativecommons.org/licenses/by/3.0/. Fuente y grabación: https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100187. El botón de música requiere una interacción de la visitante y funciona durante la navegación por las actividades.
