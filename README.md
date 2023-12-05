# SistemaDonacionesUABC
# Plataforma de Donaciones para Egresados y Personas Externas

Bienvenido a la Plataforma de Donaciones para la Universidad Autonoma de Baja California. Esta plataforma permite a egresados y personas externas realizar donaciones a la universidad, especificando a qué carrera o programa desean dirigir su contribución.

## Funcionalidades

- **Donaciones:** Los egresados y personas externas pueden realizar donaciones en línea, especificando la cantidad de dinero y la carrera o programa al que desean contribuir.

- **Administración:** Los administradores del sistema tienen acceso a una interfaz de administración para gestionar donaciones, generar informes y realizar tareas administrativas.

## Tecnologías Utilizadas

- **Node.js:** Utilizamos Node.js como entorno de tiempo de ejecución para el backend de la aplicación.

- **Express.js:** Hemos implementado el servidor y la API utilizando el framework Express.js para la creación de servicios web.

- **Base de Datos:** Usamos una base de datos (puedes especificar la base de datos que elijas, como MongoDB, PostgreSQL, etc.) para almacenar y gestionar la información de donaciones y otros datos relevantes.
  
- **Twig:** Utilizamos el motor de plantillas Twig para generar vistas dinámicas en el lado del servidor.

## Configuración y Ejecución

1. Clona o descarga el proyecto en su maquina del branch develop
2. Una vez en tu IDE en la terminal ejecuta npm install para que se instalen las dependencia del json
3. En la terminal pon npm install -g nodemon
4. En el archivo knexfile.js dentro de la carpeta config, ahi pon el nombre de la base de datos "uabc', tu usuario de mysql y tu contraseña
5. Una vez configurado knexfile.js debes de correr todas las migraciones con el comando knex migrate:latest
6. Para correr el programa tienes que poner npm run dev
   

