# La aldea de Navidad

Proyecto React + TypeScript + Vite con Pages Functions y D1. No está desplegado.

## Preparación

`npm install` y `npm run build`. Para probar la API, configure una base D1 local y ejecute el sitio con Wrangler Pages (Vite por sí solo no implementa `/api`). La cuenta y las sorpresas dependen de la hora del servidor, no del reloj del visitante.

## Configuración privada

1. Cree una base D1 en Cloudflare y aplique `db/schema.sql`; configure el binding `DB` en `wrangler.toml`.
2. Genere **dos tokens aleatorios independientes** de al menos 32 bytes (base64url). Inserte en `recipients` un identificador aleatorio y el SHA-256 hexadecimal de cada token. Nunca almacene el token en texto claro en D1.
3. Entregue individualmente los enlaces `https://SU-DOMINIO/#privado=TOKEN`. El token se conserva solo en la sesión del navegador y se retira de la barra tras abrir el enlace. Cada enlace es una credencial: no lo comparta públicamente.
4. Configure Pages con `npm run build`, carpeta `dist` y binding D1. Revise dominio, credenciales, registros de acceso y protección antes de publicar. No se ha creado repositorio ni modificado DNS.

El arte de personajes está aislado en `src/characters.tsx`; sustitúyalo por recursos autorizados antes de publicar. Compruebe los derechos de Peanuts. Sin D1, el calendario público funciona en Pages y el privado responde con error; Vite solo muestra un aviso de API indisponible. El token en el fragmento no se envía en la URL HTTP, aunque permanece sensible a extensiones del navegador y capturas.

## Validación realizada

`npm test` cubre el cambio de fecha de Panamá, puertas futuras, parámetros inválidos y los 24 contenidos. La compilación de producción pasa con `npm run build`. Las capturas de la referencia y de la implementación están en `docs/`. Las actividades se prueban en navegador móvil; D1 real, los enlaces de destinatarias y el entorno de Pages aún necesitan pruebas integradas tras su configuración.

El escenario fue generado con la herramienta integrada de imágenes a partir de la indicación: «Aldea navideña panorámica original, ilustración 2D, casita roja central, taller, correo, observatorio, árbol iluminado, nieve, sin personajes ni texto». Los personajes son un SVG sustituible en `src/characters.tsx`.

## GitHub Pages

La publicación en GitHub Pages sirve únicamente la parte estática. La aldea y los juegos funcionan allí; **el calendario y el acceso privado permanecen desactivados** hasta conectar una API externa segura. GitHub Pages no ejecuta Pages Functions ni D1. No sustituya las comprobaciones del servidor por el reloj del navegador. Para tener todas las funciones configure y publique por separado el backend de Cloudflare, restrinja CORS al dominio autorizado y configure la URL de la API en la aplicación.

La imagen de Snoopy y Woodstock es el icono oficial del calendario de Adviento de Peanuts, enlazado desde https://www.peanuts.com/activities/peanuts-colorin. Permanece separado en `src/characters.tsx`; su uso público requiere revisar y obtener los derechos correspondientes.
