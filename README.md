# act6_rick-morty_frontend

> **Capa de Presentación** — Arquitectura SOA | Proyecto Rick & Morty

Interfaz de usuario desarrollada con **Next.js 15** que consume el API Gateway (BFF) para listar y guardar personajes favoritos de Rick & Morty. Implementa manejo explícito de estados de UI: `loading`, `success`, `error` y `conflict` (duplicados).

## 🏛 Rol en la Arquitectura SOA

```
Usuario → [Frontend] → API Gateway / BFF → Persistence Microservice → PostgreSQL
```

Este servicio **no se comunica directamente** con la base de datos ni con el microservicio de persistencia. Toda petición pasa por el BFF.

## 🛠 Tecnologías

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS

## 🚀 Levantar en local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tu URL del BFF local

# 3. Iniciar en modo desarrollo
npm run dev
```

El servidor arranca en `http://localhost:3000` (o el puerto que configure Nginx).

## ☁️ Producción

Desplegado en **Vercel** con la variable `NEXT_PUBLIC_BFF_URL` apuntando al BFF en Render.
