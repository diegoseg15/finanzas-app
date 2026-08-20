# Orvian

Aplicación móvil de finanzas personales construida con Expo y React Native.

## Objetivo

Ayudar al usuario a registrar, organizar y entender su dinero desde un solo lugar.

La app no guarda dinero ni funciona como entidad financiera. Solo registra movimientos y ayuda a visualizar cuentas, ingresos, egresos, transferencias, recordatorios y estadísticas básicas.

## Funcionalidades v1.0.0

- Onboarding inicial conectado a configuración real.
- Modo local sin login obligatorio.
- Modo oscuro y claro.
- Registro de cuentas.
- Registro de ingresos.
- Registro de egresos.
- Transferencias entre cuentas.
- Soporte para múltiples monedas a nivel de cuenta.
- Categorías base.
- Etiquetas base.
- Estadísticas básicas.
- Recordatorios financieros.
- Plan gratuito.
- Plan Plus preparado.
- Persistencia local.
- Borrado de datos locales.
- Aviso de privacidad local.

## Stack

- Expo
- React Native
- TypeScript
- Expo Router
- Zustand
- AsyncStorage
- SecureStore
- Expo Notifications
- Lucide React Native

## Instalación

```bash
pnpm install
```

## Ejecutar en desarrollo

```bash
pnpm expo start -c
```

## Revisar TypeScript

```bash
pnpm typecheck
```

## Estructura principal

```txt
src/
├── app/
├── components/
├── constants/
├── features/
├── services/
├── store/
└── types/
```

## Estado del proyecto

Versión actual:

```txt
v1.0.0 MVP
```

## Próximas versiones

```txt
v1.1 - Mejora visual, filtros y reportes simples
v1.5 - Exportaciones, SQLite y backups
v2.0 - Login real y sincronización
v3.0 - Asistente IA financiero e integraciones
```
