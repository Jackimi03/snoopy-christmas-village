# Plan de implementación

1. Aldea ilustrada adaptable con puntos de entrada accesibles y navegación por edificios.
2. Cuenta regresiva y calendario progresivo cuya fuente de verdad sea una API de Pages Functions.
3. Actividades completas con instrucciones, controles táctiles y finalización.
4. Contenido de 24 días entregado por el servidor; acceso privado por enlace secreto y progreso separado en D1.
5. Validación de compilación, funciones, fecha, navegación y vistas móviles; documentación para crear recursos de Cloudflare sin desplegar.

El contenido privado usa tokens aleatorios almacenados como hash; las peticiones no enumeran destinatarias. Un enlace secreto es una credencial y debe entregarse de forma segura. Ningún dato de otra destinataria se devuelve al cliente.
