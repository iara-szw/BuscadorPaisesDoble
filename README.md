# Buscador de Países

## Nombre del proyecto
Buscador de Países

## Integrantes
- [Completar con los nombres de los integrantes del grupo]

## API utilizada
La aplicación consume la API de Rest Countries:
- https://restcountries.com/

Se utiliza la versión v5 del servicio para obtener información de países, como nombre, capital, población, región y banderas. En la versión web la clave se configura mediante una variable de entorno (`VITE_RESTCOUNTRIES_API_KEY`).

## Descripción breve de la aplicación
Esta aplicación permite buscar países por nombre y visualizar información relevante como bandera, capital, región y población. Además, incluye una sección de favoritos para guardar los países que el usuario quiera consultar más adelante.

El proyecto está desarrollado en dos versiones:
- Web, con React + Vite
- Mobile, con React Native + Expo

## Organización de componentes
La estructura del proyecto se separó por responsabilidades para mantener el código ordenado y reutilizable.

### Web
- `src/App.jsx`: contiene la lógica principal de navegación y estado global de favoritos.
- `src/pages/Home.jsx`: pantalla de inicio con la búsqueda y carga de países.
- `src/pages/Favoritos.jsx`: pantalla que muestra los países marcados como favoritos.
- `src/components/Buscador.jsx`: input de búsqueda.
- `src/components/ItemList.jsx`: renderiza la lista de países.
- `src/components/ItemCard.jsx`: tarjeta individual de cada país.
- `src/services/APIcontries.js`: centraliza la comunicación con la API.
- `src/styles/`: archivos CSS para el estilo visual.

### Mobile
- `App.js`: configura la navegación por tabs y mantiene el estado global de favoritos.
- `screens/HomeScreen.js`: pantalla principal con buscador y listado.
- `screens/FavoritesScreen.js`: pantalla que muestra los favoritos guardados.
- `components/CountryCard.js`: tarjeta de cada país con botón para agregar o quitar favoritos.
- `services/APIcontries.js`: servicio encargado de consultar la API.

La idea principal fue separar lógica, vistas y estilos para que cada parte tuviera una responsabilidad clara y fuera más fácil de mantener.

## Funcionalidades implementadas
- Búsqueda de países por nombre.
- Carga inicial de información desde la API.
- Visualización de detalle básico de cada país.
- Agregar y quitar países de favoritos.
- Navegación entre Inicio y Favoritos.
- Persistencia de favoritos en la versión web mediante `localStorage`.
- Manejo de estados de carga y ausencia de resultados.
- Diseño responsive y adaptado a cada plataforma.

## Diferencias entre desarrollar la versión React y React Native
Durante el desarrollo encontramos varias diferencias importantes entre ambas plataformas:

### 1. Arquitectura y navegación
- React (web): la navegación se resuelve con `react-router-dom` y rutas.
- React Native: la navegación se hace con `@react-navigation/native` y pestañas o stacks, con un enfoque más nativo.

### 2. Estilos
- React: se utilizan CSS y archivos `.css`.
- React Native: se emplean `StyleSheet` y estilos en objetos JavaScript, con propiedades adaptadas a mobile.

### 3. Componentes y elementos nativos
- En web, los elementos HTML son los que se usan por defecto (`div`, `button`, `input`, etc.).
- En React Native, se usan componentes nativos como `View`, `Text`, `TextInput`, `FlatList`, `Pressable`.

### 4. Compatibilidad y APIs del entorno
- React web tiene acceso directo a APIs del navegador como `localStorage`.
- React Native no usa el DOM y requiere adaptaciones para cosas como almacenamiento, navegación y renderizado de listas.

### 5. Experiencia de desarrollo
- React web suele ser más directo para prototipar rápidamente y depurar con el navegador.
- React Native exige más atención a los componentes nativos, tamaños, espaciado y compatibilidad entre plataformas.

### 6. Rendimiento y UX
- En web se pueden aprovechar mejor ciertas interacciones visuales con CSS.
- En mobile debe pensarse más en la ergonomía táctil, layout vertical y componentes optimizados para pantallas pequeñas.

## Conclusión
El proyecto combina dos versiones del mismo buscador de países con una lógica similar, pero adaptada a las necesidades de cada plataforma. Esto permitió comparar cómo cambia la organización, la UI y la experiencia de usuario entre React y React Native.

## Características

- Búsqueda de países por nombre
- Visualización de bandera, región, capital y población
- Guardado de favoritos
- Navegación entre Inicio y Favoritos
- Dos interfaces:
  - Web con React + Vite
  - Mobile con React Native + Expo

## Tecnologías

- React
- Vite
- React Native
- Expo
- React Navigation
- Axios
- Rest Countries API

## Estructura del proyecto

```bash
BuscadorPaises/
├── README.md
├── BuscadorMobile/
│   ├── App.js
│   ├── package.json
│   ├── screens/
│   ├── components/
│   ├── services/
│   └── assets/
└── web/
    ├── package.json
    ├── src/
    ├── public/
    └── env template
```

## Requisitos

- Node.js 18 o superior
- npm
- Expo Go para Android/iPhone (opcional para mobile)

## Instalar dependencias

### Web

```bash
cd web
npm install
```

### Mobile

```bash
cd BuscadorMobile
npm install
```

## Configuración de variables de entorno

La web usa la API de Rest Countries y requiere una clave en el archivo `.env`.

1. En la carpeta `web`, crea un archivo `.env` basado en `env template`.
2. Asegúrate de que contenga:

```env
VITE_RESTCOUNTRIES_API_KEY=tu_clave_aqui
```

## Ejecutar la app web

```bash
cd web
npm run dev
```

Abre la URL que indique Vite en tu navegador.

## Ejecutar la app mobile

```bash
cd BuscadorMobile
npm start
```

Luego:

- presiona `a` para Android
- presiona `i` para iOS
- o usa Expo Go en tu dispositivo

## Scripts disponibles

### Web

```bash
npm run dev
npm run build
npm run preview
```

### Mobile

```bash
npm start
npm run android
npm run ios
npm run web
```

## Notas

- Los favoritos se manejan localmente en la app.
- La versión web guarda los favoritos en `localStorage`.
- La versión mobile mantiene la lista en estado de la aplicación.

## Autor

Proyecto de búsqueda y favoritos de países desarrollado con React y React Native.
