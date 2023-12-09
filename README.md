# Estructura y Arquitectura de la Aplicación API

La aplicación API se ha diseñado utilizando un enfoque modular para distribuir las responsabilidades en varias capas bien definidas. Cada capa desempeña un papel vital en el funcionamiento general de la aplicación y se organiza de la siguiente manera:

## Capa de Controladores (Controllers):

**Propósito:**
La capa de controladores sirve como punto de entrada para las solicitudes HTTP, gestionando la lógica del negocio y la manipulación de datos.

**Funciones Principales:**
- Procesa la entrada del cliente (solicitudes HTTP).
- Coordina las operaciones con la capa de servicios.
- Maneja la respuesta y el formato de salida.

## Capa de Servicios (Services):

**Propósito:**
La capa de servicios contiene la lógica de negocio y se encarga de ejecutar operaciones específicas.

**Funciones Principales:**
- Implementa la lógica empresarial de manera independiente.
- Realiza operaciones en la base de datos o con otras fuentes de datos.
- Interactúa con la capa de modelos.

## Capa de Modelos (Models):

**Propósito:**
La capa de modelos define la estructura y el formato de los datos almacenados y manipulados por la aplicación.

**Funciones Principales:**
- Representa entidades de la aplicación (usuarios, publicaciones, alimentos, etc.).
- Define las relaciones entre diferentes entidades.
- Proporciona métodos para interactuar con la base de datos.

## Capa de Esquemas (Schemas):

**Propósito:**
La capa de esquemas establece reglas de validación y estructura para los datos que entran o salen de la aplicación.

**Funciones Principales:**
- Valida la integridad y el formato de los datos recibidos.
- Facilita la creación de respuestas estructuradas y validadas.

Además de estas capas, la aplicación utiliza routers para gestionar las rutas de la API. Cada router apunta a un controlador específico y está regulado por un archivo `index.js`, donde se configura y utiliza el framework Express.

Esta organización en capas permite una clara separación de las responsabilidades, facilita la escalabilidad, promueve la reutilización del código y simplifica el mantenimiento de la aplicación. Cada capa desempeña un papel único en la ejecución de la lógica empresarial y contribuye a la eficiencia y robustez general de la aplicación.

---

**Uso del Proyecto:**

Este proyecto proporciona la API que se integra con la aplicación FITRACK. No está diseñado para contribuciones externas, sino para ser utilizado como componente backend de FITRACK (una aplicación).

**Configuración del Entorno de Desarrollo:**

- Asegúrate de tener Node.js y npm instalados.
- Ejecuta `npm install` para instalar las dependencias.
- Configura las variables de entorno según sea necesario.

**Ejecución de la Aplicación:**

- Utiliza los scripts `npm start` para iniciar el servidor en entorno de producción.
- Usa `npm run dev` para iniciar el servidor con nodemon para desarrollo (recarga automática).

**Gestión de Dependencias:**

Asegúrate de actualizar y documentar nuevas dependencias en el archivo `package.json`.

**Gestión de Logs:**

Hemos separado los logs de errores y los logs completos para facilitar la depuración y el monitoreo de la aplicación. La carpeta `logs` contiene esta información.

---

### Librerías Utilizadas:

- **@iamtraction/google-translate:**
  - Uso: Traducción de texto utilizando Google Translate API.
  - Justificación: Para permitir la traducción de contenido en la aplicación.

- **axios:**
  - Uso: Cliente HTTP basado en promesas para realizar solicitudes a servicios externos.
  - Justificación: Facilita las solicitudes HTTP a otros servicios o APIs.

- **bcrypt:**
  - Uso: Para el cifrado seguro de contraseñas.
  - Justificación: Proporciona un método robusto para almacenar contraseñas de manera segura.

- **cors:**
  - Uso: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
  - Justificación: Necesario para permitir solicitudes desde dominios diferentes al de la API.

- **date-fns:**
  - Uso: Biblioteca para manipulación de fechas.
  - Justificación: Simplifica y mejora la manipulación de fechas en la aplicación.

- **dotenv:**
  - Uso: Carga variables de entorno desde un archivo `.env`.
  - Justificación: Mejora la gestión de configuraciones sensibles.

- **express:**
  - Uso: Marco de aplicación web para Node.js.
  - Justificación: Facilita la creación de la API y el manejo de solicitudes HTTP.

- **joi:**
  - Uso: Biblioteca de validación de datos.
  - Justificación: Ayuda a validar y asegurar la integridad de los datos recibidos.

- **jsonwebtoken:**
  - Uso: Implementación de JSON Web Tokens (JWT) para autenticación.
  - Justificación: Proporciona un método seguro y estándar para la autenticación de usuarios.

- **multer:**
  - Uso: Middleware para gestionar la carga de archivos.
  - Justificación: Necesario para manejar archivos en las solicitudes HTTP.

- **pg y pg-promise:**
  - Uso: Conexión y consulta a bases de datos PostgreSQL.
  - Justificación: Establece la conexión con la base de datos y simplifica las operaciones SQL.

- **winston:**
  - Uso: Biblioteca para el registro de logs.
  - Justificación: Facilita la gestión y el monitoreo de eventos en la aplicación.

### Scripts y Variables de Entorno:

- **Scripts:**
  - `start`: Inicia el servidor en entorno de producción.
  - `dev`: Inicia el servidor con nodemon para desarrollo (recarga automática).

- **Variables de Entorno:**
  - Utilizamos variables de entorno para almacenar configuraciones sensibles, como claves de API, detalles de conexión a la base de datos, etc.

### Gestión de Logs:

Hemos separado los logs de errores y los logs completos para facilitar la depuración y el monitoreo de la aplicación. La carpeta `logs` contiene esta información.

---

Este proyecto es el componente backend de FITRACK, diseñado para su uso exclusivo en conjunto con la aplicación FITRACK. No está destinado a contribuciones externas.
