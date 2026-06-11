# CALETRACKER - ESTADO COMPLETO DEL PROYECTO

## Visión del Producto

CaleTracker no busca ser otro calendario.

La idea es reemplazar la fricción de Google Calendar por una experiencia de carga extremadamente rápida e inteligente.

El usuario debería poder escribir:

"Mañana 10:00 ecografía"

y que el sistema:

- detecte fecha
- detecte hora
- detecte categoría
- detecte prioridad
- cree el evento

sin formularios largos.

---

# Arquitectura Elegida

## Backend

Estructura:

routes
↓
controllers
↓
services
↓
database

Reglas:

- Routes solo enrutan.
- Controllers reciben request y devuelven response.
- Toda la lógica de negocio vive en services.
- No meter lógica compleja en controllers.

---

## Frontend

Estructura:

pages/
components/
services/
utils/

Responsabilidades:

pages:
pantallas completas.

components:
UI reutilizable.

services:
llamadas al backend.

utils:
lógica pura (parsers, detectores, helpers).

---

# Estado Actual del Backend

## Autenticación

Implementado.

Archivos:

- authController
- authService
- authRoutes
- authMiddleware

Estado:

✔ Funcional

---

## Eventos

Tabla events actual:

id
user_id
title
description
start_time
end_time
status
created_at
reflection
priority
category_id
all_day

IMPORTANTE:

priority, category_id y all_day fueron agregados hoy mediante ALTER TABLE.

Estado:

✔ Tabla preparada para la nueva versión de CaleTracker.

---

## Categorías (Mis Mundos)

Tabla categories:

id
user_id
name
color
keywords

Ejemplo:

Deportes

color:
bg-purple-200 text-purple-800

keywords:
gym,pole,bici,entrenar

---

Relación establecida:

events.category_id
→ categories.id

Foreign Key:

ON DELETE SET NULL

Estado:

✔ Correctamente modelado.

---

# Estado Actual del Frontend

## Dashboard

Archivo:

frontend/src/pages/Dashboard.jsx

Funcionalidades:

✔ Lista eventos
✔ Completar evento
✔ Posponer evento
✔ Eliminar evento
✔ Logout

Pendiente:

refactor para mostrar:

- prioridad
- categoría
- all_day

---

## EventForm

Archivo:

frontend/src/components/EventForm.jsx

Estado actual:

Formulario clásico:

- título
- descripción
- inicio
- fin

Este formulario NO es la versión final.

Será reemplazado progresivamente.

---

## Habits

Archivo:

frontend/src/pages/Habits.jsx

Estado:

✔ Crear hábito
✔ Listar hábitos
✔ Eliminar hábito

Funcional.

---

## Categories

Archivo:

frontend/src/pages/Categories.jsx

Estado:

✔ Crear mundos
✔ Guardar color
✔ Guardar keywords
✔ Mostrar mundos

Pendiente:

verificar endpoint GET.

Debe apuntar a:

http://localhost:3000/api/categories

---

# Decisiones de Arquitectura Tomadas

## No usar nested routes por ahora

NO vamos a usar:

<Route path="/dashboard">
  <Route ... />
</Route>

Porque:

Dashboard
Habits
Categories

son páginas completas.

Vamos a trabajar con:

/dashboard
/dashboard/habits
/dashboard/categories

más simple y mantenible.

---

# Funcionalidades Diseñadas

## Pilar 1 - Carga Inteligente

Entrada:

"Mañana 10:00 ecografía"

Salida:

{
title: "ecografía",
start_time: "...",
all_day: false
}

---

Entrada:

"!alta mañana 18:00 pole dance"

Salida:

{
title: "pole dance",
priority: "alta",
category: "Deportes"
}

---

## Pilar 2 - Modificación Premium

Todavía no implementado.

Objetivo:

editar evento mediante panel lateral deslizante.

NO usar modal clásico.

---

## Pilar 3 - Dashboard por Prioridades

Todavía no implementado.

Objetivo:

Secciones:

NO NEGOCIABLES (alta)

MEDIA

BAJA

Con acordeones para media y baja.

---

## Pilar 4 - Mis Mundos

Diseñado.

Parcialmente implementado.

Objetivo:

Crear mundos:

Trabajo
Personal
Deportes

Cada mundo tiene:

- color
- keywords

Ejemplo:

Deportes

keywords:

gym
pole
entrenar
bici

---

# Arquitectura Planeada para la Inteligencia

Nueva carpeta:

src/utils/

---

Archivos planeados:

parseQuickInput.js

detectCategory.js

detectPriority.js

parseDate.js

parseTime.js

---

Ejemplo:

Input:

"!alta mañana 19:00 pole dance"

detectPriority()
↓
alta

detectCategory()
↓
Deportes

parseDate()
↓
fecha

parseTime()
↓
hora

Resultado:

objeto listo para guardar.

---

# Próximo Paso Inmediato

Archivo pendiente de revisar:

backend/src/controllers/categoryController.js

Objetivo:

ver cómo devuelve categorías.

Luego actualizar:

eventController

eventService

para soportar:

priority
category_id
all_day

---

# Roadmap Ordenado

FASE 1

Finalizar Mis Mundos.

- verificar GET
- verificar POST
- persistencia
- navegación

---

FASE 2

Actualizar backend de eventos.

Agregar soporte completo para:

priority
category_id
all_day

---

FASE 3

Actualizar EventForm.

Permitir guardar:

priority
category_id
all_day

aunque todavía sea manual.

---

FASE 4

Implementar detección automática de categorías.

keywords
↓
categoría

---

FASE 5

Implementar prioridad automática.

!alta
!media
!baja

---

FASE 6

Crear QuickCapture.

Reemplazar formulario tradicional.

---

FASE 7

Dashboard por prioridad.

---

FASE 8

Panel lateral de edición.

---

# Convenciones de Trabajo Definidas

- Clean Code siempre.
- Nada de sobrearquitectura.
- No asumir estructuras ni datos.
- Pedir archivos antes de modificar.
- Backend: funciones completas para reemplazar.
- Frontend corto: archivo completo.
- Frontend largo: indicar exactamente qué reemplazar.
- Explicaciones cortas, directas y prácticas.
