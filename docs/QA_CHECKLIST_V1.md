# QA Checklist v1.0.0

## Inicio y onboarding

- [ ] Si el onboarding no está completado, la app abre en Welcome.
- [ ] Welcome navega a configuración.
- [ ] Setup guarda moneda principal.
- [ ] Setup guarda tipo de usuario.
- [ ] Setup guarda uso de criptomonedas.
- [ ] Setup guarda uso de múltiples monedas.
- [ ] Setup guarda objetivo financiero.
- [ ] Setup guarda preferencia de recordatorios.
- [ ] Plans completa onboarding.
- [ ] Al cerrar y abrir la app, entra directo a Inicio.

## Tema

- [ ] Modo sistema funciona.
- [ ] Modo oscuro funciona.
- [ ] Modo claro funciona.
- [ ] La configuración de tema persiste.

## Cuentas

- [ ] Se puede crear una cuenta.
- [ ] No permite cuenta sin nombre válido.
- [ ] Muestra saldo inicial.
- [ ] Muestra tipo de cuenta.
- [ ] Suma al balance total si corresponde.
- [ ] El plan gratis limita a 3 cuentas.
- [ ] El plan Plus permite más cuentas.

## Movimientos

- [ ] Se puede crear ingreso.
- [ ] Se puede crear egreso.
- [ ] No permite monto vacío.
- [ ] No permite monto 0.
- [ ] Actualiza saldo correctamente.
- [ ] Muestra advertencia si deja saldo negativo.
- [ ] El plan gratis limita movimientos mensuales.
- [ ] El plan Plus permite movimientos ilimitados.

## Transferencias

- [ ] Requiere al menos 2 cuentas.
- [ ] No permite cuenta origen igual a destino.
- [ ] Registra monto enviado.
- [ ] Registra monto recibido.
- [ ] Registra comisión.
- [ ] Calcula tipo de cambio.
- [ ] Actualiza saldo origen.
- [ ] Actualiza saldo destino.
- [ ] Muestra transferencia en historial.
- [ ] Transferencias avanzadas redirigen a Plus cuando aplica.

## Estadísticas

- [ ] Muestra ingresos del mes.
- [ ] Muestra egresos del mes.
- [ ] Muestra balance mensual.
- [ ] Muestra gastos por categoría.
- [ ] Muestra transferencias del mes.
- [ ] Muestra comisiones.
- [ ] Muestra estado vacío si no hay datos.

## Recordatorios

- [ ] Se puede crear recordatorio.
- [ ] No permite título vacío.
- [ ] No permite fecha pasada.
- [ ] Se puede completar recordatorio.
- [ ] Se puede cancelar recordatorio.
- [ ] Aparece en Home como próximo recordatorio.
- [ ] Persiste al cerrar y abrir app.
- [ ] En Expo Go no debe romper la app aunque no programe notificación real.

## Planes

- [ ] Pantalla de planes abre desde Ajustes.
- [ ] Plan actual se muestra correctamente.
- [ ] Se puede activar Plus demo.
- [ ] Se puede volver a Gratis.
- [ ] Bloqueos premium redirigen a planes.

## Ajustes

- [ ] Muestra plan actual.
- [ ] Muestra aviso de privacidad local.
- [ ] Permite ver recordatorios.
- [ ] Permite ver planes.
- [ ] Permite reiniciar onboarding.
- [ ] Permite borrar datos locales.

## Persistencia

- [ ] Cuentas persisten.
- [ ] Movimientos persisten.
- [ ] Transferencias persisten.
- [ ] Recordatorios persisten.
- [ ] Configuración persiste.
- [ ] Suscripción persiste.
- [ ] Borrar datos locales limpia todo.

## Navegación

- [ ] Tab bar solo muestra Inicio, Cuentas, Movimientos, Estadísticas y Ajustes.
- [ ] Planes no aparece en tab bar.
- [ ] Recordatorios no aparece en tab bar.
- [ ] Planes abre desde Ajustes y bloqueos.
- [ ] Recordatorios abre desde Home y Ajustes.
