# TutoMatch Backend

Este repositorio contiene el backend para la aplicación TutoMatch, desarrollado con NestJS.

## Descripción

TutoMatch es una aplicación diseñada para mejorar los procesos de tutorías en la Universidad Antonio José Camacho. Este repositorio contiene el código del servidor backend que gestiona la lógica de negocio, la conexión con la base de datos y expone una API REST para ser consumida por el frontend.

## Tecnologías utilizadas

- **NestJS**: Framework de Node.js para construir aplicaciones de servidor eficientes y escalables
- **TypeORM**: ORM (Object-Relational Mapping) para TypeScript y JavaScript
- **PostgreSQL**: Sistema de gestión de bases de datos relacional
- **Swagger**: Documentación de API interactiva
- **Docker**: Contenedorización de la aplicación y sus dependencias
- **Jest**: Framework de testing

## Requisitos previos

Para ejecutar este proyecto, necesitarás tener instalado:

- [Node.js](https://nodejs.org/) (v20 o superior)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)

## Instalación y configuración

### Instalación local

1. Clona este repositorio:
   ```bash
   git clone https://github.com/DanielPenalozaB/tutomatch-be
   cd tutomatch-be
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno (crea un archivo `.env` basado en el ejemplo proporcionado).

4. Inicia la aplicación en modo desarrollo:
   ```bash
   npm run start:dev
   ```

### Usando Docker

Para un entorno de desarrollo completo con Docker:

1. Inicia los contenedores:
   ```bash
   npm run docker:dev
   ```

   O para reconstruir los contenedores:
   ```bash
   npm run docker:build
   ```

2. Para detener los contenedores:
   ```bash
   npm run docker:down
   ```

   O para detener y eliminar los volúmenes:
   ```bash
   npm run docker:down:volumes
   ```

## Scripts disponibles

- `npm run build`: Compila la aplicación
- `npm run format`: Formatea el código con Prettier
- `npm run start`: Inicia la aplicación
- `npm run start:dev`: Inicia la aplicación en modo desarrollo con recarga automática
- `npm run start:debug`: Inicia la aplicación en modo debug
- `npm run start:prod`: Inicia la aplicación en modo producción
- `npm run lint`: Ejecuta ESLint para verificar y corregir problemas de estilo
- `npm run test`: Ejecuta las pruebas unitarias
- `npm run test:watch`: Ejecuta las pruebas en modo observador
- `npm run test:cov`: Ejecuta las pruebas y genera informe de cobertura
- `npm run test:debug`: Ejecuta las pruebas en modo debug
- `npm run test:e2e`: Ejecuta pruebas end-to-end
- `npm run docker:dev`: Inicia los contenedores Docker en modo desarrollo
- `npm run docker:build`: Construye e inicia los contenedores Docker
- `npm run docker:down`: Detiene los contenedores Docker
- `npm run docker:down:volumes`: Detiene los contenedores Docker y elimina los volúmenes

## Configuración de Docker

El proyecto utiliza Docker para facilitar el desarrollo y despliegue. La configuración incluye:

- **PostgreSQL**: Base de datos en contenedor con persistencia de datos mediante volúmenes
- **Node.js**: Aplicación principal en contenedor con hot-reload para desarrollo

### Variables de entorno para Docker

Las siguientes variables de entorno se configuran en el archivo `docker-compose.yml`:

- `DB_HOST`: Host de la base de datos (por defecto: postgres)
- `DB_PORT`: Puerto de la base de datos (por defecto: 5432)
- `DB_USERNAME`: Usuario de la base de datos (por defecto: tutomatch_user)
- `DB_PASSWORD`: Contraseña de la base de datos (por defecto: tutomatch_password)
- `DB_DATABASE`: Nombre de la base de datos (por defecto: tutomatch_db)
- `APP_PORT`: Puerto donde se ejecuta la aplicación (por defecto: 4000)
- `NODE_ENV`: Entorno de ejecución (por defecto: development)

## Documentación de la API

La documentación de la API está disponible mediante Swagger UI. Una vez que la aplicación esté en ejecución, puedes acceder a la documentación en:

```
http://localhost:4000/api/
```

## Testing

El proyecto utiliza Jest para pruebas unitarias y end-to-end. Para ejecutar las pruebas:

```bash
# Pruebas unitarias
npm run test

# Pruebas end-to-end
npm run test:e2e

# Cobertura de pruebas
npm run test:cov
```
