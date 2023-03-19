# Proyecto backend

## Descripción
Este proyecto es un clon de de airbnb, el cual permite a los usuarios publicar sus propiedades y a los usuarios buscar propiedades para alquilar.

## Tecnologías
- NodeJS
- Express
- Bcryptjs
- Jsonwebtoken

## Endpoints
- Autenticación de usuarios - URL_BASE: http://localhost:3000/

  - POST /api/register - Crea un usuario
     - Body
        - name: string
        - email: string
        - password: string

  - POST /api/auth/login
    - Body
      - email: string
      - password: string