export const es = {
  common: {
    appName: "Orvian",
    cancel: "Cancelar",
    save: "Guardar",
    edit: "Editar",
    delete: "Eliminar",
    close: "Cerrar",
    continue: "Continuar",
    back: "Atrás",
    next: "Siguiente",
    confirm: "Confirmar",
    apply: "Aplicar",
    clear: "Limpiar",
    add: "Agregar",
    create: "Crear",
    update: "Actualizar",
    remove: "Eliminar",
    search: "Buscar",
    select: "Seleccionar",
    loading: "Cargando...",
    saving: "Guardando...",
    exporting: "Exportando...",
    error: "Error",
    success: "Listo",
    required: "Obligatorio",
    optional: "Opcional",
    amount: "Monto",
    date: "Fecha",
    time: "Hora",
    title: "Título",
    description: "Descripción",
    note: "Nota",
    category: "Categoría",
    currency: "Moneda",
    account: "Cuenta",
    type: "Tipo",
    frequency: "Frecuencia",
    freePlan: "Plan gratuito",
    plusPlan: "Plan Plus",
    month: "Mes",
    monthly: "Mensual",
    total: "Total",
    balance: "Saldo",
    income: "Ingreso",
    expense: "Gasto",
    transfer: "Transferencia",
    commission: "Comisión",
    noData: "Sin datos",
    notAvailable: "No disponible",
    no: "No",
    transfers: "Transferencias"
  },
  tabs: {
    home: "Inicio",
    accounts: "Cuentas",
    movements: "Movimientos",
    statistics: "Estadísticas",
    settings: "Ajustes",
    more: "Más",
    budgets: "Presupuestos",
    loans: "Préstamos"
  },
  home: {
    totalEstimated: "Dinero total estimado",
    totalEstimatedBalance: "Saldo total",
    monthlyExpenses: "Gastos",
    monthlyIncome: "Ingresos",
    monthlyBalance: "Resultados",
    available: "Disponible",
    accounts: "Cuentas",
    upcomingReminders: "Próximos recordatorios",
    viewAll: "Ver todos",
    noUpcomingReminders: "No tienes recordatorios próximos.",
    recentActivity: "Actividad reciente",
    noRegisteredMovements: "Todavía no has registrado movimientos.",
    noActivity: "Aún no hay actividad.",
    viewAllAccounts: "Ver todas",
    monthlySummary: "Resumen del mes"
  },
  accounts: {
    title: "Cuentas",
    description: "Registra bancos, efectivo, criptomonedas, tarjetas y préstamos.",
    newAccount: "Nueva cuenta",
    firstAccount: "Crear primera cuenta",
    createTitle: "Nueva cuenta",
    editTitle: "Editar cuenta",
    emptyTitle: "Aún no tienes cuentas",
    emptyDescription: "Crea tu primera cuenta para empezar a registrar ingresos, gastos y transferencias.",
    freePlanRemaining: "Plan gratis: {{count}} cuentas disponibles.",
    plusPlanUnlimited: "Plan Plus: cuentas ilimitadas.",
    limitTitle: "Llegaste al límite de cuentas gratis",
    limitDescription: "El plan gratuito permite hasta 3 cuentas. Activa Plus para crear cuentas ilimitadas.",
    deleteTitle: "Eliminar cuenta",
    deleteDescription: "La cuenta se ocultará de la lista activa. Sus movimientos históricos se conservarán.",
    saveAccount: "Guardar cuenta",
    saveChanges: "Guardar cambios",
    card: {
      customAccount: "Cuenta personalizada",
      currentBalance: "Saldo actual",
      includedInTotal: "Incluida en total estimado",
      excludedFromTotal: "Separada del total estimado",
      options: "Opciones"
    },
    form: {
      createTitle: "Nueva cuenta",
      editTitle: "Editar cuenta",
      editDescription: "Actualiza los datos principales de esta cuenta.",
      createDescription: "Configura los datos principales de esta cuenta.",
      name: "Nombre de la cuenta",
      namePlaceholder: "Ej: Banco Pichincha",
      currentBalance: "Saldo actual",
      initialBalance: "Saldo inicial",
      balancePlaceholder: "0.00",
      balanceEditInfo: "El saldo se modifica registrando movimientos, no editando la cuenta.",
      type: "Tipo de cuenta",
      mainCurrency: "Moneda principal",
      currencyCrypto: "Criptomoneda",
      currencyFiat: "Moneda tradicional",
      currencyCustom: "Personalizada",
      currencyEditInfo: "La moneda principal no se puede cambiar al editar, para no romper el historial de movimientos.",
      includeInTotal: "Sumar al total estimado",
      includeInTotalDescription: "Activa esto si quieres que esta cuenta se sume a tu saldo total.",
      initialBalanceRequired: "El saldo inicial es obligatorio. Usa 0 si no tiene saldo.",
      initialBalanceError: "El saldo inicial no puede ser negativo.",
      nameRequired: "El nombre de la cuenta es obligatorio.",
      institutionName: "Banco o institución",
      institutionNamePlaceholder: "Ej. Banco Pichincha, Binance, Metamask",
      pinAccount: "Fijar como importante",
      pinAccountDescription: "Aparecerá primero en la pantalla de cuentas.",
      cardDesign: "Diseño de tarjeta",
      cardDesignPlusOnly: "Disponible solo con Plus.",
      steps: {
        0: {
          description: "Primero define la identidad de la cuenta."
        },
        1: {
          description: "Ahora configura saldo, moneda e importancia."
        },
        2: {
          description: "Elige cómo se verá la tarjeta de esta cuenta."
        }
      },
      cardDesignUpgradeMessage: "Actualiza a Plus para personalizar el diseño de tus tarjetas.",
      isSavingsTarget: "Cuenta destinada para ahorrar",
      isSavingsTargetDescription: "Úsala para separar dinero que no quieres gastar."
    },
    types: {
      bank: {
        label: "Banco",
        description: "Cuenta bancaria tradicional."
      },
      cash: {
        label: "Efectivo",
        description: "Dinero físico disponible."
      },
      piggy_bank: {
        label: "Alcancía",
        description: "Ahorro físico o separado para una meta."
      },
      crypto_exchange: {
        label: "Exchange cripto",
        description: "Cuenta en apps como Binance u otras plataformas cripto."
      },
      crypto_wallet: {
        label: "Billetera cripto",
        description: "Billetera como MetaMask u otras apps para guardar cripto."
      },
      credit_card: {
        label: "Tarjeta de crédito",
        description: "Tarjeta con deuda o cupo usado."
      },
      loan_receivable: {
        label: "Préstamo por cobrar",
        description: "Dinero que otra persona te debe."
      },
      loan_payable: {
        label: "Préstamo por pagar",
        description: "Dinero que debes pagar."
      },
      custom: {
        label: "Cuenta personalizada",
        description: "Tipo de cuenta definido por el usuario."
      }
    },
    cardDesigns: {
      default: {
        label: "Estándar",
        description: "Diseño limpio para cualquier cuenta."
      },
      minimal: {
        label: "Minimalista",
        description: "Más sobrio y discreto."
      },
      gradient: {
        label: "Gradiente",
        description: "Estilo visual más moderno."
      },
      blue: {
        label: "Azul marca",
        description: "Usa el color azul principal de Orvian."
      },
      dark: {
        label: "Oscuro",
        description: "Estilo elegante con apariencia oscura."
      },
      premium: {
        label: "Premium",
        description: "Diseño más exclusivo para cuentas destacadas."
      }
    },
    groups: {
      regular: "Tradicionales",
      crypto: "Cripto"
    },
    summary: {
      regularTotal: "Total tradicional",
      cryptoTotal: "Total cripto",
      accountCount: "{{count}} cuenta"
    },
    emptyCryptoAccounts: "Aún no tienes cuentas cripto.",
    emptyRegularAccounts: "Aún no tienes cuentas tradicionales.",
    detail: {
      description: "Administra la información y configuración de esta cuenta.",
      notFoundTitle: "Cuenta no encontrada",
      notFoundDescription: "Esta cuenta ya no existe o fue archivada.",
      type: "Tipo",
      institution: "Institución",
      mainCurrency: "Moneda principal",
      archiveTitle: "Archivar cuenta",
      archiveDescription: "Esta cuenta dejará de aparecer en tu lista principal, pero sus datos se conservarán.",
      archiveAction: "Archivar",
      settings: "Configuración",
      recentMovements: "Movimientos recientes",
      recentMovementsDescription: "Actividad confirmada de los últimos 2 meses.",
      noRecentMovements: "No hay movimientos recientes en esta cuenta.",
      actions: "Acciones",
      archive: "Archivar cuenta",
      edit: "Editar cuenta",
      emptyActivity: "No hay movimientos recientes en esta cuenta.",
      information: "Información",
      priority: "Prioridad",
      recentActivity: "Actividad reciente",
      totalEstimated: "Total estimado",
      normal: "Normal",
      pinned: "Fijada"
    }
  },
  movements: {
    title: "Movimientos",
    description: "Registra ingresos, gastos y transferencias entre tus cuentas.",
    newMovement: "Nuevo movimiento",
    newTransfer: "Nueva transferencia",
    registerMovement: "Registrar movimiento",
    emptyTitle: "Aún no tienes movimientos",
    emptyDescription: "Registra tu primer ingreso, gasto o transferencia para empezar a construir tu historial financiero.",
    incomeExpense: "Ingreso / Gasto",
    income: "Ingreso",
    expense: "Gasto",
    transfer: "Transferencia",
    freePlanRemaining: "Plan gratis: {{count}} movimientos disponibles este mes.",
    plusPlanUnlimited: "Plan Plus: movimientos ilimitados.",
    firstCreateAccountTitle: "Primero crea una cuenta",
    firstCreateAccountDescription: "Necesitas al menos una cuenta activa para registrar ingresos o gastos.",
    limitTitle: "Llegaste al límite de movimientos gratis",
    limitDescription: "El plan gratuito permite hasta 30 movimientos por mes. Activa Plus para registrar movimientos ilimitados.",
    deleteMovementTitle: "Eliminar movimiento",
    deleteMovementDescription: "Esta acción revertirá el saldo afectado por este movimiento.",
    deleteTransferTitle: "Eliminar transferencia",
    deleteTransferDescription: "Esta acción revertirá los saldos afectados por esta transferencia.",
    editMovement: "Editar movimiento",
    editTransfer: "Editar transferencia",
    saveMovement: "Guardar movimiento",
    saveTransfer: "Guardar transferencia",
    form: {
      account: "Cuenta",
      category: "Categoría",
      amount: "Monto",
      tags: "Etiquetas",
      note: "Nota",
      notePlaceholder: "Nota opcional",
      selectedAccountNotFound: "La cuenta seleccionada no existe.",
      insufficientBalance: "No tienes dinero suficiente en esta cuenta.",
      createDescription: "Registra un ingreso o gasto confirmado.",
      amountRequired: "El monto debe ser mayor a 0.",
      accountRequired: "Selecciona una cuenta.",
      categoryRequired: "Selecciona una categoría.",
      allTagsSelected: "Ya seleccionaste todas las etiquetas disponibles.",
      accountCurrency: "Moneda: {{currency}}"
    },
    card: {
      defaultTitle: "Movimiento",
      deletedAccount: "Cuenta eliminada"
    },
    transferCard: {
      fromAccountFallback: "Cuenta origen",
      toAccountFallback: "Cuenta destino",
      sent: "Enviado",
      received: "Recibido",
      fee: "Comisión",
      exchangeRate: "Cambio usado: 1 {{fromCurrency}} = {{exchangeRate}} {{toCurrency}}"
    },
    transferForm: {
      fromAccount: "Cuenta origen",
      toAccount: "Cuenta destino",
      fromAmount: "Monto enviado",
      toAmount: "Monto recibido",
      note: "Nota",
      notePlaceholder: "Ej: transferencia a ahorros",
      differentAccountsRequired: "Selecciona cuentas diferentes.",
      description: "Mueve dinero entre cuentas y registra comisión o cambio de moneda.",
      fromAccountRequired: "Selecciona una cuenta origen.",
      toAccountRequired: "Selecciona una cuenta destino.",
      fromAmountRequired: "El monto enviado debe ser mayor a 0.",
      toAmountRequired: "El monto recibido debe ser mayor a 0.",
      feeInvalid: "La comisión no puede ser negativa.",
      insufficientBalance: "No tienes dinero suficiente en la cuenta origen para esta transferencia.",
      multiCurrencyBlockedByPlan: "El plan gratuito solo permite transferencias entre cuentas con la misma moneda.",
      fromAmountWithCurrency: "Monto enviado {{currency}}",
      toAmountWithCurrency: "Monto recibido {{currency}}",
      feeAmountWithCurrency: "Comisión {{currency}}",
      calculatedExchangeRate: "Tipo de cambio calculado",
      multiCurrencyPlusTitle: "Transferencia entre monedas disponible en Plus",
      multiCurrencyPlusDescription: "En el plan gratuito puedes transferir entre cuentas con la misma moneda. Para transferencias con cambio de moneda, activa Plus."
    },
    calculatorAmount: "Monto del movimiento",
    transferAmount: "Monto a transferir",
    emptyFilterTitle: "No hay resultados",
    emptyFilterDescription: "Cambia el filtro para ver otros movimientos."
  },
  statistics: {
    title: "Estadísticas",
    description: "Revisa tus ingresos, gastos, transferencias y categorías.",
    filters: "Filtros de reporte",
    applyFilters: "Aplicar filtros",
    clearFilters: "Limpiar filtros",
    filtersDescription: "Ajusta el período, cuenta, categoría y moneda.",
    cards: {
      income: "Ingresos",
      expenses: "Egresos",
      transfers: "Transferencias",
      commissions: "Comisiones",
      periodBalance: "Resultado del período"
    },
    charts: {
      incomeVsExpense: "Ingresos vs gastos",
      incomeVsExpenseDescription: "Comparación mensual de entradas y salidas.",
      balanceEvolution: "Evolución del Saldo",
      balanceEvolutionDescription: "Saldo acumulado de los últimos meses.",
      topExpenseCategories: "Top categorías de gasto",
      topExpenseCategoriesDescription: "Categorías con mayor salida de dinero.",
      budgetUsed: "Presupuesto usado",
      budgetUsedDescription: "Avance del presupuesto mensual actual.",
      expensesByCategory: "Gastos por categoría",
      accountSummary: "Resumen por cuenta"
    },
    empty: {
      noBudget: "Crea un presupuesto mensual para ver este gráfico.",
      noMovements: "Registra movimientos para visualizar estadísticas.",
      noExpenses: "Aún no hay gastos registrados en este periodo.",
      noIncome: "Aún no hay ingresos registrados en este periodo.",
      noIncomeExpenseChart: "No hay ingresos o gastos para graficar.",
      noBalanceTrend: "Aún no hay balance suficiente para mostrar tendencia.",
      noExpenseCategoriesChart: "No hay gastos por categoría para graficar.",
      noFilterDataTitle: "Sin datos para estos filtros",
      noFilterDataDescription: "Cambia el período o registra movimientos para ver estadísticas.",
      noExpensesForFilters: "No hay gastos para estos filtros."
    },
    labels: {
      income: "Ingresos",
      expenses: "Egresos",
      others: "Otros",
      top: "Top",
      balance: "Balance",
      used: "Usado",
      spentAmount: "{{amount}} gastados",
      limitAmount: "Límite: {{amount}}",
      noCategory: "Sin categoría",
      balanceAmount: "Balance: {{amount}}"
    }
  },
  reports: {
    export: {
      title: "Exportar resumen",
      description: "Descarga tus cuentas, ingresos, gastos y transferencias en un archivo."
    },
    filters: {
      title: "Filtros",
      panelDescription: "Ajusta el período y los datos que quieres analizar.",
      period: "Período",
      account: "Cuenta",
      category: "Categoría",
      currency: "Moneda",
      from: "Desde",
      to: "Hasta",
      movementKind: "Tipo de movimiento"
    },
    periods: {
      current_month: {
        label: "Mes actual",
        description: "Movimientos del mes en curso."
      },
      last_month: {
        label: "Mes anterior",
        description: "Movimientos del mes pasado."
      },
      last_3_months: {
        label: "Últimos 3 meses",
        description: "Movimientos de los últimos tres meses."
      },
      current_year: {
        label: "Año actual",
        description: "Movimientos del año en curso."
      },
      custom: {
        label: "Personalizado",
        description: "Elige un rango de fechas manualmente."
      }
    },
    movementKinds: {
      all: {
        label: "Todos",
        description: "Ingresos y gastos."
      },
      income: {
        label: "Ingresos",
        description: "Solo entradas de dinero."
      },
      expense: {
        label: "Gastos",
        description: "Solo salidas de dinero."
      }
    },
    accounts: {
      all: {
        label: "Todas las cuentas",
        description: "Incluye todas las cuentas activas."
      }
    },
    categories: {
      all: {
        label: "Todas las categorías",
        description: "No filtrar por categoría."
      }
    },
    currencies: {
      main: {
        label: "Moneda principal",
        description: "Usa la moneda principal para el resumen."
      }
    }
  },
  settings: {
    title: "Ajustes",
    description: "Configura tu experiencia, datos, privacidad y plan.",
    appearance: "Apariencia",
    theme: "Tema",
    currentTheme: "Tema actual: {{theme}}",
    themeModes: {
      system: "Sistema",
      dark: "Oscuro",
      light: "Claro"
    },
    language: "Idioma",
    languageDescription: "Elige el idioma de la interfaz de Orvian.",
    languagePickerLabel: "Idioma",
    currentPlan: "Plan actual",
    currentPlanDescription: "Estás usando el plan {{plan}}.",
    freePlanName: "Gratis",
    viewPlans: "Ver planes",
    shortcuts: "Accesos",
    viewBudgets: "Ver presupuestos",
    viewReminders: "Ver recordatorios",
    privacy: "Privacidad",
    privacyDescription: "Consulta cómo se manejan tus datos dentro de Orvian.",
    privacyPolicy: "Política de privacidad",
    openPrivacyPolicy: "Ver política de privacidad",
    exportData: "Exportar datos",
    exportDescription: "Genera archivos con tus cuentas, movimientos y transferencias.",
    exporting: "Exportando...",
    exportCsv: "Exportar CSV",
    exportExcel: "Exportar Excel",
    importData: "Importar datos",
    importDescription: "Carga movimientos desde un archivo CSV.",
    localData: "Datos locales",
    localDataDescription: "Tus datos se guardan en este dispositivo. Más adelante se podrá activar sincronización con cuenta.",
    viewOnboardingAgain: "Ver introducción otra vez",
    resetData: "Borrar datos locales",
    about: "Acerca de Orvian",
    aboutDescription: "Orvian te ayuda a organizar tus cuentas, gastos, presupuestos y reportes personales.",
    app: "Aplicación",
    version: "Versión",
    developer: "Desarrollador",
    visitDeveloperWebsite: "Visitar web del desarrollador",
    linkErrorTitle: "No se pudo abrir el enlace",
    linkErrorDescription: "Tu dispositivo no puede abrir este sitio web en este momento.",
    privacyLinkErrorDescription: "Tu dispositivo no puede abrir la política de privacidad en este momento.",
    resetDataTitle: "Borrar datos locales",
    resetDataDescription: "Esto eliminará cuentas, movimientos, transferencias, recordatorios y configuración guardada en este dispositivo.",
    resetDataConfirm: "Borrar",
    exportErrorTitle: "No se pudo exportar",
    exportCsvErrorDescription: "Ocurrió un error al generar el archivo CSV.",
    exportExcelErrorDescription: "Ocurrió un error al generar el archivo Excel."
  },
  onboarding: {
    welcome: {
      title: "Controla tu dinero desde un solo lugar",
      description: "Registra cuentas, ingresos, gastos, transferencias, recordatorios y planes financieros desde una app local y privada.",
      balanceCardTitle: "Tu balance empieza aquí",
      income: "Ingresos",
      expenses: "Egresos",
      start: "Comenzar"
    },
    setup: {
      stepLabel: "Paso {{step}} de {{total}}",
      title: "Configura tu experiencia",
      description: "Estas respuestas personalizan la app sin obligarte a crear una cuenta."
    },
    stepOne: {
      mainCurrency: "Moneda principal",
      calculateTotalNetWorth: "Calcular todo mi dinero",
      calculateTotalNetWorthDescription: "Suma bancos, efectivo, cripto y otras cuentas en un saldo general.",
      userType: "Tipo de usuario"
    },
    stepTwo: {
      cryptoUsage: "Uso de criptomonedas",
      multiCurrencyUsage: "Uso de múltiples monedas"
    },
    stepThree: {
      mainGoal: "Objetivo principal",
      activateFinancialReminders: "Activar recordatorios financieros",
      activateFinancialRemindersDescription: "Te ayudará a recordar pagos, cobros, compras o ahorros.",
      viewPlans: "Ver planes"
    },
    options: {
      userProfile: {
        personal: {
          label: "Personal",
          description: "Quiero manejar mis finanzas personales."
        },
        freelancer: {
          label: "Profesional",
          description: "Tengo ingresos por proyectos o clientes."
        },
        entrepreneur: {
          label: "Emprendedor",
          description: "Manejo dinero de negocio o emprendimiento."
        },
        investor: {
          label: "Inversionista",
          description: "Quiero controlar activos, cripto o inversiones."
        },
        student: {
          label: "Estudiante",
          description: "Quiero organizar gastos y ahorros."
        }
      },
      cryptoUsage: {
        none: {
          label: "No uso cripto",
          description: "No necesito cuentas como Binance o Metamask."
        },
        basic: {
          label: "Sí uso cripto",
          description: "Quiero registrar exchanges, wallets o activos digitales."
        },
        advanced: {
          label: "Uso cripto pero no es prioridad",
          description: "Quiero registrar cripto pero no es lo más importante para mí."
        }
      },
      multiCurrencyUsage: {
        none: {
          label: "Uso una sola moneda",
          description: "Manejo mi dinero principalmente en una sola moneda."
        },
        occasional: {
          label: "A veces",
          description: "Uso cuentas en diferentes monedas ocasionalmente."
        },
        frequent: {
          label: "Frecuentemente",
          description: "Uso cuentas en múltiples monedas con frecuencia."
        }
      },
      financialGoal: {
        control_expenses: {
          label: "Controlar gastos",
          description: "Quiero saber en qué se va mi dinero."
        },
        save_more: {
          label: "Ahorrar más",
          description: "Quiero separar dinero para metas y reservas."
        },
        pay_debts: {
          label: "Pagar deudas",
          description: "Quiero organizar mis deudas y pagos pendientes."
        },
        track_income: {
          label: "Seguir mis ingresos",
          description: "Quiero tener un control claro de mis fuentes de ingreso."
        },
        understand_investments: {
          label: "Entender mis inversiones",
          description: "Quiero controlar mejor mis activos, cripto o inversiones."
        },
        avoid_small_expenses: {
          label: "Evitar gastos hormiga",
          description: "Quiero identificar y controlar pequeños gastos diarios."
        }
      }
    },
    plans: {
      title: "Elige cómo quieres empezar",
      description: "Puedes usar la app gratis y activar funciones avanzadas más adelante.",
      continueWithPlus: "Continuar con Plus"
    }
  },
  budgets: {
    title: "Presupuestos",
    description: "Configura límites mensuales para controlar tus gastos.",
    allCategoriesAlreadyBudgeted: "Ya agregaste límites para todas las categorías disponibles.",
    budgetedCategories: "Categorías con límite",
    budgetOf: "Presupuesto de {{period}}",
    currentSpendingVsBudget: "Gasto actual frente a tu límite mensual.",
    spent: "Gastado",
    limit: "Límite",
    limitedCategories: "Categorías limitadas",
    spentOfLimit: "{{spent}} de {{limit}}",
    currentEmptyTitle: "No tienes presupuesto este mes",
    currentEmptyDescription: "Crea un presupuesto para {{period}}.",
    createMonthlyBudget: "Crear presupuesto mensual",
    historyTitle: "Historial de presupuestos",
    generalLimitValue: "Límite general: {{amount}} {{currency}}",
    modalDescription: "Configura límites para controlar tus gastos mensuales.",
    status: {
      exceeded: "Superaste tu presupuesto mensual.",
      warning: "Estás cerca de alcanzar tu presupuesto mensual.",
      safe: "Tu gasto está dentro del presupuesto.",
      used: "Usado",
      spentAmount: "{{amount}} gastados",
      limitAmount: "Límite: {{amount}}"
    },
    newBudget: "Nuevo presupuesto",
    editBudget: "Editar presupuesto",
    createBudget: "Crear presupuesto",
    saveBudget: "Guardar presupuesto",
    deleteBudget: "Eliminar presupuesto",
    monthLabel: "{{month}} de {{year}}",
    generalMonthlyBudget: "Presupuesto general mensual",
    generalBudgetPlaceholder: "Ej: 500",
    categoryBudgetTitle: "Presupuesto por categoría",
    categoryBudgetDescription: "Agrega límites solo a las categorías de gasto que quieras controlar.",
    expenseCategory: "Categoría de gasto",
    monthlyLimit: "Límite mensual",
    monthlyLimitPlaceholder: "Ej: 120",
    addCategory: "Agregar categoría",
    removeCategory: "Eliminar categoría",
    budgetUsed: "Presupuesto usado",
    remainingBudget: "Presupuesto restante",
    exceededBudget: "Presupuesto excedido",
    emptyTitle: "Aún no tienes presupuestos",
    emptyDescription: "Crea un presupuesto mensual para controlar mejor tus gastos.",
    deleteTitle: "Eliminar presupuesto",
    deleteDescription: "Se eliminará este presupuesto y sus límites por categoría.",
    errors: {
      generalRequired: "El presupuesto general es obligatorio.",
      generalGreaterThanZero: "El presupuesto general debe ser mayor a 0.",
      categoryRequired: "Selecciona una categoría.",
      categoryLimitRequired: "El límite mensual es obligatorio.",
      categoryLimitGreaterThanZero: "El límite mensual debe ser mayor a 0.",
      duplicatedCategory: "Esta categoría ya tiene un presupuesto asignado."
    }
  },
  reminders: {
    title: "Recordatorios",
    description: "Programa pagos, cobros, compras o inversiones.",
    newReminder: "Nuevo recordatorio",
    saveReminder: "Guardar recordatorio",
    createReminder: "Crear recordatorio",
    completeTitle: "Completar recordatorio",
    completeDescription: "¿Quieres marcar este recordatorio como completado?",
    cancelTitle: "Cancelar recordatorio",
    cancelDescription: "¿Quieres cancelar este recordatorio?",
    confirmCancel: "Sí, cancelar",
    emptyTitle: "Aún no tienes recordatorios",
    emptyDescription: "Crea recordatorios para pagos, cobros, suscripciones, compras o ahorros.",
    complete: "Completar",
    form: {
      title: "Título",
      titlePlaceholder: "Ej: Pagar internet",
      amountOptional: "Monto opcional",
      amountPlaceholder: "0.00",
      type: "Tipo",
      frequency: "Frecuencia",
      date: "Fecha",
      time: "Hora",
      relatedAccount: "Cuenta relacionada",
      descriptionOptional: "Descripción opcional",
      descriptionPlaceholder: "Ej: vence cada 5 del mes...",
      titleRequired: "El título es obligatorio.",
      amountInvalid: "El monto debe ser mayor o igual a 0.",
      futureDateRequired: "La fecha debe ser futura."
    },
    card: {
      defaultType: "Recordatorio"
    },
    types: {
      payment: {
        label: "Pago",
        description: "Servicios, deudas, tarjeta o compromisos por pagar."
      },
      collection: {
        label: "Cobro",
        description: "Dinero que deben pagarte."
      },
      subscription: {
        label: "Suscripción",
        description: "Netflix, Spotify, software u otros pagos recurrentes."
      },
      saving: {
        label: "Ahorro",
        description: "Recordatorio para separar dinero."
      },
      investment: {
        label: "Inversión",
        description: "Compra recurrente de activos o cripto."
      },
      purchase: {
        label: "Compra",
        description: "Compra importante planificada."
      },
      custom: {
        label: "Personalizado",
        description: "Recordatorio financiero libre."
      }
    },
    frequencies: {
      once: {
        label: "Una vez",
        description: "Se notificará solo en la fecha elegida."
      },
      daily: {
        label: "Diario",
        description: "Se repetirá todos los días."
      },
      weekly: {
        label: "Semanal",
        description: "Se repetirá cada semana."
      },
      monthly: {
        label: "Mensual",
        description: "Se repetirá cada mes."
      }
    }
  },
  plans: {
    title: "Planes",
    description: "Elige el plan que mejor se adapte a tu forma de organizar tus finanzas.",
    currentPlan: "Plan actual",
    free: "Gratis",
    plus: "Plus",
    demoDescription: "Empieza gratis y activa funciones avanzadas cuando las necesites.",
    monthlyPeriod: "por mes",
    yearlyAvailable: "También disponible por ${{price}} al año.",
    plusActive: "Plus activo",
    activatePlusDemo: "Activar Plus demo",
    freeActive: "Gratis activo",
    backToFree: "Volver a gratis",
    freePlan: {
      name: "Gratis",
      description: "Ideal para empezar a organizar tus finanzas personales.",
      price: "$0",
      period: "Siempre",
      cta: "Continuar gratis",
      current: "Plan actual",
      features: {
        accountsLimit: "Hasta 3 cuentas",
        movementsLimit: "Hasta 30 movimientos al mes",
        basicStatistics: "Estadísticas básicas",
        localData: "Datos guardados localmente"
      }
    },
    plusPlan: {
      name: "Plus",
      description: "Para usuarios que quieren control financiero completo.",
      price: "{{price}}",
      period: "al mes",
      cta: "Activar Plus",
      features: {
        unlimitedAccounts: "Cuentas ilimitadas",
        unlimitedMovements: "Movimientos ilimitados",
        advancedStatistics: "Estadísticas avanzadas",
        budgets: "Presupuestos mensuales",
        reminders: "Recordatorios financieros",
        exportData: "Exportación de datos",
        priorityFeatures: "Acceso a funciones avanzadas"
      }
    },
    restorePurchase: "Restaurar compra",
    continueWithoutPlus: "Continuar sin Plus",
    errors: {
      purchaseUnavailable: "La compra no está disponible en este momento.",
      restoreUnavailable: "No se pudo restaurar la compra en este momento."
    }
  },
  categories: {
    salary: "Sueldo",
    freelance: "Proyecto / Freelance",
    sales: "Ventas",
    business_income: "Negocio",
    investment_income: "Inversión",
    gift_income: "Regalo / Extra",
    refund: "Reembolso",
    loan_received: "Préstamo recibido",
    rental_income: "Alquiler recibido",
    other_income: "Otros ingresos",
    food: "Alimentación",
    groceries: "Supermercado",
    restaurants: "Restaurantes",
    transport: "Transporte",
    fuel: "Combustible",
    taxi_rideshare: "Taxi / Apps",
    housing: "Vivienda",
    rent: "Arriendo",
    services: "Servicios",
    electricity: "Electricidad",
    water: "Agua",
    internet_phone: "Internet / Teléfono",
    health: "Salud",
    medicine: "Medicina",
    education: "Educación",
    entertainment: "Entretenimiento",
    subscriptions: "Suscripciones",
    technology: "Tecnología",
    clothing: "Ropa",
    personal_care: "Cuidado personal",
    family: "Familia",
    pets: "Mascotas",
    travel: "Viajes",
    gifts: "Regalos",
    taxes: "Impuestos",
    fees: "Comisiones",
    debt_payment: "Pago de deuda",
    savings: "Ahorro",
    investment_expense: "Inversión",
    cash_withdrawal: "Retiro de efectivo",
    other: "Otros"
  },
  tags: {
    essential: "Esencial",
    optional: "Opcional",
    urgent: "Urgente",
    recurring: "Recurrente",
    planned: "Planificado",
    unplanned: "No planificado",
    cash: "Efectivo",
    card: "Tarjeta",
    transfer: "Transferencia",
    online: "Online",
    subscription: "Suscripción",
    work: "Trabajo",
    personal: "Personal",
    family: "Familia",
    business: "Negocio",
    tax: "Impuesto",
    invoice: "Factura",
    debt: "Deuda",
    savings: "Ahorro",
    small_expense: "Gasto hormiga"
  },
  loans: {
    newLoan: "Nuevo préstamo",
    form: {
      description: "Registra dinero que debes pagar o cobrar.",
      title: "Título",
      titlePlaceholder: "Ej. Préstamo personal",
      titleRequired: "El título es obligatorio.",
      personOrEntity: "Persona o entidad",
      personOrEntityPlaceholder: "Ej. Juan, Banco, familiar",
      payable: "Debo pagar",
      receivable: "Me deben pagar",
      payableDescription: "Dinero que tú debes.",
      receivableDescription: "Dinero que deben pagarte.",
      amount: "Monto",
      amountPlaceholder: "0.00",
      amountRequired: "El monto es obligatorio.",
      amountError: "Ingresa un monto mayor a 0.",
      currency: "Moneda",
      notes: "Notas",
      notesPlaceholder: "Detalles opcionales del préstamo",
      createTitle: "Crear préstamo"
    },
    payment: {
      remainingAmount: "Pendiente: {{amount}}",
      amount: "Monto",
      amountPlaceholder: "0.00",
      amountRequired: "El monto es obligatorio.",
      amountError: "Ingresa un monto mayor a 0 y menor o igual a {{amount}}.",
      note: "Nota",
      notePlaceholder: "Detalle opcional del pago o cobro",
      pay: "Pagar"
    }
  },
  transfers: {
    form: {
      fromAccountRequired: "Selecciona la cuenta origen.",
      toAccountRequired: "Selecciona la cuenta destino.",
      sameAccountError: "La cuenta origen y destino deben ser diferentes.",
      exchangeRatePending: "Por ahora se usará tasa 1:1. Más adelante agregaremos cambio avanzado.",
      fromAccount: "Cuenta origen",
      toAccount: "Cuenta destino",
      feeAmount: "Comisión"
    }
  }
} as const;
