# Union-Frontend

## Descripción

Union-Frontend es la interfaz de usuario para "Union", una plataforma de gestión de finanzas personales y de negocios. Este frontend está diseñado para proporcionar una experiencia de usuario fluida y atractiva, permitiendo a los usuarios interactuar eficazmente con el backend a través de una serie de características intuitivas y responsivas.

## Tecnologías Utilizadas

El proyecto frontend está construido utilizando las siguientes tecnologías y librerías:

- **React**: Una biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Una herramienta de construcción moderna que ofrece un entorno de desarrollo rápido.
- **Tailwind CSS**: Un framework CSS que permite diseñar rápidamente sin abandonar su hoja de estilo.
- **Axios**: Promesa basada en el cliente HTTP para el navegador y node.js.
- **React Router Dom**: Gestiona el enrutamiento en aplicaciones React.
- **React Icons**: Proporciona los iconos de React de popularidad.
- **React Toastify**: Permite añadir notificaciones a tu aplicación con facilidad.
- **JWT-decode**: Una pequeña biblioteca para decodificar tokens JWT.
- **tsParticles**: Una biblioteca ligera para crear partículas.

## Características

La aplicación de React para Union ofrece las siguientes características:

- Filtrar transacciones.
- Crear un balance gastos y ingresos.
- Gestionar un plan de futuro realizado con machine learning.
- Iniciar sesión con tu cuenta de usuario o registrarte en la plataforma.

## Configuración y Ejecución

Para configurar y ejecutar la aplicación TripTip-App, sigue los siguientes pasos:

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/Hackathon-HBA/frontend/
```

2. Navega hasta el directorio raíz del proyecto:

```bash
cd src
```

3. Crea un archivo `.env` en el directorio raíz basado en el archivo `.env.example` proporcionado:

```bash
cp .env.example .env
```

4. Abre el archivo `.env` y reemplaza `VITE_APP_BACKEND` y `VITE_APP_FRONTEND`con la URL de la API de Union y la url de la aplicación de Frontend.

5. Instala las dependencias del proyecto:

```bash
npm install
```

6. Inicia la aplicación:

```bash
npm run start
```

Esto iniciará la aplicación y podrás acceder a ella a través de la URL proporcionada en la línea de comandos.

### Idea de negocio

1. Segun las predicciones, ofrecerle al cliente la manera de como crear un plan de ahorro.

2. Ofrecerle al cliente determinados productos segun sus gastos.

3. Ofrecer un acuerdo a empresas colaboradoras y obtener un porcentaje de benificios de dichas empresas.

4. Obtener bonificaciones por atracción de clientes al banco.

5. Ofrecer la App con suscripción.

## Documentación de la API
