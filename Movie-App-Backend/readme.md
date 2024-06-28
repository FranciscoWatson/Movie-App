# Documentación de la API

## Introducción
Esta documentación describe los endpoints de la API para la aplicación de gestión de películas. La API permite a los usuarios registrarse, iniciar sesión, gestionar sus listas de películas y favoritos, entre otras funciones.

## Endpoints

### Autenticación de Usuarios

#### Registro de Usuario
- **URL:** `/register`
- **Método:** `POST`
- **Descripción:** Registra un nuevo usuario.
- **Parámetros en el cuerpo de la solicitud:**
  - `username` (String): Nombre de usuario.
  - `email` (String): Correo electrónico.
  - `password` (String): Contraseña.
  - `firstName` (String): Nombre.
  - `lastName` (String): Apellido.
  - `location` (String): Ubicación.
  - `bio` (String): Biografía (opcional).
- **Ejemplo de respuesta:**
  - **Código:** 201
  - **Cuerpo:**
    ```json
    {
      "username": "john_doe",
      "email": "john@example.com",
      "password": "hashedpassword",
      "firstName": "John",
      "lastName": "Doe",
      "location": "New York",
      "bio": "Movie enthusiast",
      "favoriteList": [],
      "lists": []
    }
    ```

#### Inicio de Sesión
- **URL:** `/login`
- **Método:** `POST`
- **Descripción:** Inicia sesión un usuario.
- **Parámetros en el cuerpo de la solicitud:**
  - `username` (String): Nombre de usuario.
  - `password` (String): Contraseña.
- **Ejemplo de respuesta:**
  - **Código:** 200
  - **Cuerpo:**
    ```json
    {
      "message": "Login successful",
      "user": { ... }
    }
    ```

#### Eliminar Usuario
- **URL:** `/:username`
- **Método:** `DELETE`
- **Descripción:** Elimina un usuario.
- **Parámetros en la URL:**
  - `username` (String): Nombre de usuario.
- **Ejemplo de respuesta:**
  - **Código:** 200
  - **Cuerpo:**
    ```json
    {
      "message": "User deleted successfully"
    }
    ```

#### Actualizar Usuario
- **URL:** `/:username`
- **Método:** `PUT`
- **Descripción:** Actualiza los detalles de un usuario.
- **Parámetros en la URL:**
  - `username` (String): Nombre de usuario.
- **Parámetros en el cuerpo de la solicitud:**
  - `email` (String): Correo electrónico.
  - `password` (String): Contraseña.
  - `firstName` (String): Nombre.
  - `lastName` (String): Apellido.
  - `location` (String): Ubicación.
  - `bio` (String): Biografía (opcional).
- **Ejemplo de respuesta:**
  - **Código:** 200
  - **Cuerpo:**
    ```json
    {
      "username": "john_doe",
      "email": "john@example.com",
      "password": "newhashedpassword",
      "firstName": "John",
      "lastName": "Doe",
      "location": "New York",
      "bio": "Updated bio"
    }
    ```

### Gestión de Listas

#### Crear Lista
- **URL:** `/:username/lists`
- **Método:** `POST`
- **Descripción:** Crea una nueva lista de películas para un usuario.
- **Parámetros en la URL:**
  - `username` (String): Nombre de usuario.
- **Parámetros en el cuerpo de la solicitud:**
  - `listName` (String): Nombre de la lista.
- **Ejemplo de respuesta:**
  - **Código:** 201
  - **Cuerpo:**
    ```json
    {
      "name": "My Favorite Movies",
      "movies": []
    }
    ```

#### Obtener Listas
- **URL:** `/:username/lists`
- **Método:** `GET`
- **Descripción:** Obtiene todas las listas de películas de un usuario.
- **Parámetros en la URL:**
  - `username` (String): Nombre de usuario.
- **Ejemplo de respuesta:**
  - **Código:** 200
  - **Cuerpo:**
    ```json
    [
      {
        "name": "My Favorite Movies",
        "movies": ["movie1", "movie2"]
      },
      ...
    ]
    ```

#### Eliminar Lista
- **URL:** `/:username/lists/:listId`
- **Método:** `DELETE`
- **Descripción:** Elimina una lista de películas de un usuario.
- **Parámetros en la URL:**
  - `username` (String): Nombre de usuario.
  - `listId` (String): ID de la lista.
- **Ejemplo de respuesta:**
  - **Código:** 200
  - **Cuerpo:**
    ```json
    {
      "message": "List deleted successfully"
    }
    ```

#### Agregar Película a Lista
- **URL:** `/:username/lists/:listName/addMovie`
- **Método:** `POST`
- **Descripción:** Agrega una película a una lista específica de un usuario.
- **Parámetros en la URL:**
  - `username` (String): Nombre de usuario.
  - `listName` (String): Nombre de la lista.
- **Parámetros en el cuerpo de la solicitud:**
  - `movieId` (String): ID de la película.
- **Ejemplo de respuesta:**
  - **Código:** 201
  - **Cuerpo:**
    ```json
    [
      {
        "name": "My Favorite Movies",
        "movies": ["movie1", "movie2", "movie3"]
      },
      ...
    ]
    ```

#### Eliminar Película de Lista
- **URL:** `/:username/lists/:listId/movies/:movieId`
- **Método:** `DELETE`
- **Descripción:** Elimina una película de una lista específica de un usuario.
- **Parámetros en la URL:**
  - `username` (String): Nombre de usuario.
  - `listId` (String): ID de la lista.
  - `movieId` (String): ID de la película.
- **Ejemplo de respuesta:**
  - **Código:** 200
  - **Cuerpo:**
    ```json
    [
      {
        "name": "My Favorite Movies",
        "movies": ["movie1", "movie3"]
      },
      ...
    ]
    ```

### Gestión de Favoritos

#### Obtener Favoritos
- **URL:** `/:username/favorites`
- **Método:** `GET`
- **Descripción:** Obtiene la lista de películas favoritas de un usuario.
- **Parámetros en la URL:**
  - `username` (String): Nombre de usuario.
- **Ejemplo de respuesta:**
  - **Código:** 200
  - **Cuerpo:**
    ```json
    ["movie1", "movie2", "movie3"]
    ```

#### Agregar a Favoritos
- **URL:** `/:username/addFavorites`
- **Método:** `POST`
- **Descripción:** Agrega una película a la lista de favoritos de un usuario.
- **Parámetros en la URL:**
  - `username` (String): Nombre de usuario.
- **Parámetros en el cuerpo de la solicitud:**
  - `movieId` (String): ID de la película.
- **Ejemplo de respuesta:**
  - **Código:** 201
  - **Cuerpo:**
    ```json
    ["movie1", "movie2", "movie3", "movie4"]
    ```

#### Eliminar de Favoritos
- **URL:** `/:username/favorites/:movieId`
- **Método:** `DELETE`
- **Descripción:** Elimina una película de la lista de favoritos de un usuario.
- **Parámetros en la URL:**
  - `username` (String): Nombre de usuario.
  - `movieId` (String): ID de la película.
- **Ejemplo de respuesta:**
  - **Código:** 200
  - **Cuerpo:**
    ```json
    ["movie1", "movie3", "movie4"]
    ```

## Modelos

### Usuario
- **Esquema:**
  ```json
  {
    "username": "String, unique, required",
    "email": "String, unique, required",
    "password": "String, required",
    "firstName": "String, required",
    "lastName": "String, required",
    "location": "String, required",
    "bio": "String",
    "favoriteList": ["String"],
    "lists": [
      {
        "name": "String",
        "movies": ["String"]
      }
    ]
  }