# Desarrollando Web Apps con IA

## _Todo List_ con _Firebase_

Aquí la demo de la app
[https://jonmircha.github.io/amerike-5dev/my-todos-firebase](https://jonmircha.github.io/amerike-5dev/my-todos-firebase)

Puedes ver el código fuente de la app en la siguiente [carpeta](../docs/my-todos-firebase/)

Para trabajar con _Firebase_ logueate con una cuenta de _Google_:
[https://firebase.google.com/](https://firebase.google.com/)

Una vez que estes logueado ve a la consola y crea un proyecto:
[https://console.firebase.google.com/](https://console.firebase.google.com/)

Lee atentamente la siguiente conversación de _Chat GPT_:
[https://chatgpt.com/share/6805e8c7-088c-8007-a75a-bcc1dbcacbe5](https://chatgpt.com/share/6805e8c7-088c-8007-a75a-bcc1dbcacbe5)

_Prompt_ utilizado para construir la App:

### Gestor de Tareas (My ToDos)

Necesito crear una aplicación web con HTML, CSS y JavaScript Vanilla, sin frameworks, ni librerías, ni dependencias npm y como backend use Firebase.

La aplicación debe permitir al usuario logueado: crear, editar, listar, marcar/desmarcar y eliminar tareas por el usuario.

#### Reglas de Negocio:

- Proponme un modelo documental de la base de datos y el código JSON para importar el equema de la base de datos en el Servicio de Realtime Database de Firebase.
- Registro e inicio de sesión para los siguientes métodos de autenticación de Firebase:
  - Correo y contraseña.
  - Cuenta de Google.
- Al momento de crear un usuario en el servicio de autenticación de Firebase, debe crearse un documento en la colección de usuarios de la base de datos.
- CRUD de tareas personales, siempre y cuando el usuario este logueado en el servicio de autenticación de Firebase.
- La interfaz visual deberá permitir filtrar las tareas por hacer de las hechas, enviando las tareas hechas al final de la lista y dejando las que siguen por hacer al principio.
- Cerrar Sesión de la aplicación.
- El diseño de la UI que sea estético y minimalista.
- Proporcioname las reglas de seguridad de la base de datos para ejecutar la aplicación en producción.
- La aplicación debe ser multipage, es decir en diferentes archivos HTML dependiendo de las funcionalidades, por ejemplo home, iniciar sesión, registro, etc.
- El código JS y CSS debe estar modularizado.

A parte de proporcionarme el código necesario para construir la aplicación, proporcioname todas las instrucciones necesarias y los pasos a seguir para ir ejecutando el código y dar de alta los servicios en Firebase.

## _Todo List_ con _Supabase_

Aquí la demo de la app
[https://jonmircha.github.io/amerike-5dev/my-todos-supabase](https://jonmircha.github.io/amerike-5dev/my-todos-supabase)

Puedes ver el código fuente de la app en la siguiente [carpeta](../docs/my-todos-supabase/)

Para trabajar con _Supabase_ crea una cuenta:
[https://supabase.com/](https://supabase.com/)

Una vez que estes logueado ve al _dashboard_ y crea un proyecto:
[https://supabase.com/dashboard/](https://supabase.com/dashboard/)

Lee atentamente la siguiente conversación de _Chat GPT_:
[https://chatgpt.com/share/6801ee8e-ab94-8007-8b26-5c99f8776561](https://chatgpt.com/share/6801ee8e-ab94-8007-8b26-5c99f8776561)

_Prompt_ utilizado para construir la App:

### Gestor de Tareas (My ToDos)

Necesito crear una aplicación web con HTML, CSS y JavaScript Vanilla, sin frameworks ni librerías, ni dependencias npm y como backend use Supabase.

La aplicación debe permitir al usuario logueado crear, editar, listar, marcar/desmarcar y eliminar tareas por el usuario.

## Reglas de Negocio:

- Proponme un modelo relacional de la base de datos y el código SQL para crear la base de datos de la aplicación en el editor SQL de Supabase.
- Registro e inicio de sesión para los siguientes métodos de autenticación de Supabase:
  - Correo y contraseña.
  - Cuenta de Google.
- Al momento de crear un usuario en el servicio de autenticación de Supabase, debe crearse un registro en la tabla de usuarios de la base de datos.
- CRUD de tareas personales, siempre y cuando el usuario este logueado en el servicio de autenticación de Supabase.
- La interfaz visual deberá permitir filtrar las tareas por hacer de las hechas, enviando las tareas hechas al final de la lista y dejando las que siguen por hacer al principio.
- Cerrar Sesión de la aplicación.
- El diseño de la UI que sea estético y minimalista.
- Proporcioname las reglas de seguridad para ejecutar la aplicación en producción.
- La aplicación debe ser multipage, es decir en diferentes archivos HTML dependiendo de las funcionalidades, por ejemplo home, iniciar sesión, registro, etc.
- El código JS y CSS debe estar modularizado.

A parte de proporcionarme el código necesario para construir la aplicación, proporcioname todas las instrucciones necesarias y los pasos a seguir para ir ejecutando el código y dar de alta los servicios en Supabase.
