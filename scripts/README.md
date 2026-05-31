# Scripts del proyecto

Este archivo explica para qué sirve cada comando del proyecto.

## Comandos generales

### `pnpm start`

Abre Expo para probar la app en desarrollo.

### `pnpm android`

Abre Expo directamente para probar la app en Android.

### `pnpm ios`

Abre Expo directamente para probar la app en iOS.

### `pnpm web`

Abre Expo para probar la app en navegador.

### `pnpm lint`

Revisa errores de estilo y buenas prácticas del código.

### `pnpm typecheck`

Revisa errores de TypeScript sin compilar la app.

Este comando es importante antes de hacer commits, releases o builds.

---

## Comandos de traducciones

### `pnpm i18n:check`

Verifica que todos los idiomas tengan las mismas keys.

También revisa que el código no esté usando traducciones que no existen en `es.ts`.

Este comando debe pasar siempre antes de publicar una versión.

```bash
pnpm i18n:check
```

---

### `pnpm i18n:unused`

Muestra traducciones que podrían no estar usándose.

No borra nada.

Sirve para revisar si hay textos viejos, duplicados o abandonados.

```bash
pnpm i18n:unused
```

Importante: no borres una key solo porque aparece aquí. Algunas traducciones pueden usarse de forma dinámica.

---

### `pnpm i18n:audit`

Revisa problemas básicos de calidad en las traducciones.

Detecta:

- Textos vacíos.
- Valores que parecen keys sin traducir.
- Placeholders inconsistentes, por ejemplo `{{amount}}`.
- Textos iguales al español en otros idiomas.

```bash
pnpm i18n:audit
```

Los textos iguales al español no siempre son error. Algunos pueden ser marcas, números, precios o palabras iguales en varios idiomas.

---

### `pnpm i18n:upsert`

Agrega o actualiza traducciones en todos los idiomas usando el archivo:

```bash
scripts/i18n-upsert.json
```

Primero se ejecuta en modo revisión:

```bash
pnpm i18n:upsert
```

Si todo está bien, se aplica:

```bash
pnpm i18n:upsert -- --apply
```

Después de aplicar cambios, correr:

```bash
pnpm i18n:check
pnpm i18n:audit
pnpm typecheck
```

---

### `pnpm i18n:prune`

Muestra traducciones que podrían eliminarse por no estar en uso.

No borra nada en modo normal.

```bash
pnpm i18n:prune
```

Para borrar realmente:

```bash
pnpm i18n:prune -- --apply
```

Usar con cuidado.

Antes de aplicar, revisar bien la lista. Algunas keys pueden usarse dinámicamente o estar preparadas para funciones futuras.

---

## Flujo recomendado antes de un commit

```bash
pnpm typecheck
pnpm i18n:check
pnpm i18n:audit
```

## Flujo recomendado para agregar traducciones

1. Editar `scripts/i18n-upsert.json`.
2. Revisar cambios:

```bash
pnpm i18n:upsert
```

3. Aplicar cambios:

```bash
pnpm i18n:upsert -- --apply
```

4. Validar:

```bash
pnpm i18n:check
pnpm i18n:audit
pnpm typecheck
```

## Flujo recomendado para limpiar traducciones

1. Revisar posibles keys no usadas:

```bash
pnpm i18n:unused
```

2. Revisar qué borraría el prune:

```bash
pnpm i18n:prune
```

3. Aplicar solo si estás seguro:

```bash
pnpm i18n:prune -- --apply
```

4. Validar:

```bash
pnpm i18n:check
pnpm typecheck
```
