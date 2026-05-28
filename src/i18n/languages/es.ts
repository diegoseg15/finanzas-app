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
    balance: "Balance",
    income: "Ingreso",
    expense: "Gasto",
    transfer: "Transferencia",
    commission: "Comisión",

    noData: "Sin datos",
    notAvailable: "No disponible",
  },

  tabs: {
    home: "Inicio",
    accounts: "Cuentas",
    movements: "Movimientos",
    statistics: "Estadísticas",
    settings: "Ajustes",
    more: "Más",
  },

  home: {
    greeting: "Hola",
    totalEstimated: "Total estimado",
    totalEstimatedBalance: "Balance total estimado",
    monthlyExpenses: "Gastos del mes",
    monthlyIncome: "Ingresos del mes",
    monthlyBalance: "Balance mensual",
    available: "Disponible",

    accounts: "Cuentas",
    upcomingReminders: "Próximos recordatorios",
    viewAll: "Ver todos",
    noUpcomingReminders: "No tienes recordatorios próximos.",

    recentActivity: "Actividad reciente",
    noRegisteredMovements: "Todavía no has registrado movimientos.",
    noActivity: "Aún no hay actividad.",
  },

  accounts: {
    title: "Cuentas",
    description:
      "Registra bancos, efectivo, criptomonedas, tarjetas y préstamos.",

    newAccount: "Nueva cuenta",
    firstAccount: "Crear primera cuenta",
    createTitle: "Nueva cuenta",
    editTitle: "Editar cuenta",

    emptyTitle: "Aún no tienes cuentas",
    emptyDescription:
      "Crea tu primera cuenta para empezar a registrar ingresos, gastos y transferencias.",

    freePlanRemaining: "Plan gratis: {{count}} cuentas disponibles.",
    plusPlanUnlimited: "Plan Plus: cuentas ilimitadas.",

    limitTitle: "Llegaste al límite de cuentas gratis",
    limitDescription:
      "El plan gratuito permite hasta 3 cuentas. Activa Plus para crear cuentas ilimitadas.",

    deleteTitle: "Eliminar cuenta",
    deleteDescription:
      "La cuenta se ocultará de la lista activa. Sus movimientos históricos se conservarán.",

    saveAccount: "Guardar cuenta",
    saveChanges: "Guardar cambios",

    card: {
      customAccount: "Cuenta personalizada",
      currentBalance: "Saldo actual",
      includedInTotal: "Incluida en total estimado",
      excludedFromTotal: "Separada del total estimado",
    },

    form: {
      createTitle: "Nueva cuenta",
      editTitle: "Editar cuenta",
      createDescription: "Registra dónde tienes o debes dinero.",
      editDescription: "Actualiza los datos principales de esta cuenta.",

      name: "Nombre de la cuenta",
      namePlaceholder: "Ej: Banco Pichincha",

      currentBalance: "Saldo actual",
      initialBalance: "Saldo inicial",
      balancePlaceholder: "0.00",
      balanceEditInfo:
        "El saldo se modifica registrando movimientos, no editando la cuenta.",

      type: "Tipo de cuenta",
      mainCurrency: "Moneda principal",

      currencyCrypto: "Criptomoneda",
      currencyFiat: "Moneda fiduciaria",
      currencyCustom: "Personalizada",

      currencyEditInfo:
        "La moneda principal no se puede cambiar al editar, para no romper el historial de movimientos.",

      includeInTotal: "Sumar al total estimado",
      includeInTotalDescription:
        "Activa esto si quieres que esta cuenta afecte tu balance general.",

      initialBalanceRequired:
        "El saldo inicial es obligatorio. Usa 0 si no tiene saldo.",
      initialBalanceError: "El saldo inicial no puede ser negativo.",
      nameRequired: "El nombre de la cuenta es obligatorio.",
    },

    types: {
      bank: {
        label: "Banco",
        description: "Cuenta bancaria tradicional.",
      },
      cash: {
        label: "Efectivo",
        description: "Dinero físico disponible.",
      },
      piggy_bank: {
        label: "Alcancía",
        description: "Ahorro físico o separado para una meta.",
      },
      crypto_exchange: {
        label: "Exchange cripto",
        description: "Cuenta en plataformas como Binance u otros exchanges.",
      },
      crypto_wallet: {
        label: "Wallet cripto",
        description: "Billetera cripto como MetaMask u otras wallets.",
      },
      credit_card: {
        label: "Tarjeta de crédito",
        description: "Tarjeta con deuda o cupo usado.",
      },
      loan_receivable: {
        label: "Préstamo por cobrar",
        description: "Dinero que otra persona te debe.",
      },
      loan_payable: {
        label: "Préstamo por pagar",
        description: "Dinero que debes pagar.",
      },
      custom: {
        label: "Cuenta personalizada",
        description: "Tipo de cuenta definido por el usuario.",
      },
    },
  },

  movements: {
    title: "Movimientos",
    description:
      "Registra ingresos, gastos y transferencias entre tus cuentas.",

    newMovement: "Nuevo movimiento",
    newTransfer: "Nueva transferencia",
    registerMovement: "Registrar movimiento",

    emptyTitle: "Aún no tienes movimientos",
    emptyDescription:
      "Registra tu primer ingreso, gasto o transferencia para empezar a construir tu historial financiero.",

    incomeExpense: "Ingreso / Gasto",
    income: "Ingreso",
    expense: "Gasto",
    transfer: "Transferencia",

    freePlanRemaining:
      "Plan gratis: {{count}} movimientos disponibles este mes.",
    plusPlanUnlimited: "Plan Plus: movimientos ilimitados.",

    firstCreateAccountTitle: "Primero crea una cuenta",
    firstCreateAccountDescription:
      "Necesitas al menos una cuenta activa para registrar ingresos o gastos.",

    limitTitle: "Llegaste al límite de movimientos gratis",
    limitDescription:
      "El plan gratuito permite hasta 30 movimientos por mes. Activa Plus para registrar movimientos ilimitados.",

    deleteMovementTitle: "Eliminar movimiento",
    deleteMovementDescription:
      "Esta acción revertirá el saldo afectado por este movimiento.",

    deleteTransferTitle: "Eliminar transferencia",
    deleteTransferDescription:
      "Esta acción revertirá los saldos afectados por esta transferencia.",

    editMovement: "Editar movimiento",
    editTransfer: "Editar transferencia",
    saveMovement: "Guardar movimiento",
    saveTransfer: "Guardar transferencia",

    createDescription: "Registra un ingreso o gasto confirmado.",
    selectedAccountNotFound: "La cuenta seleccionada no existe.",
    negativeBalanceWarning: "Este gasto dejará la cuenta con saldo negativo.",
    accountCurrency: "Moneda: {{currency}}",

    form: {
      type: "Tipo",
      account: "Cuenta",
      category: "Categoría",
      amount: "Monto",
      currency: "Moneda",
      tags: "Etiquetas",
      note: "Nota",
      notePlaceholder: "Ej: compra de supermercado",
      date: "Fecha",

      income: "Ingreso",
      expense: "Gasto",

      amountRequired: "El monto debe ser mayor a 0.",
      accountRequired: "Selecciona una cuenta.",
      categoryRequired: "Selecciona una categoría.",
    },

    card: {
      defaultTitle: "Movimiento",
      deletedAccount: "Cuenta eliminada",
    },

    transferForm: {
      fromAccount: "Cuenta origen",
      toAccount: "Cuenta destino",
      fromAmount: "Monto enviado",
      toAmount: "Monto recibido",
      fromCurrency: "Moneda enviada",
      toCurrency: "Moneda recibida",
      feeAmount: "Comisión",
      feeCurrency: "Moneda de comisión",
      exchangeRate: "Tipo de cambio",
      note: "Nota",
      notePlaceholder: "Ej: transferencia a ahorros",

      saveTransfer: "Guardar transferencia",

      amountRequired: "El monto debe ser mayor a 0.",
      differentAccountsRequired: "Selecciona cuentas diferentes.",
    },
  },

  statistics: {
    title: "Estadísticas",
    description: "Analiza tus ingresos, egresos, transferencias y categorías.",

    filters: "Filtros de reporte",
    applyFilters: "Aplicar filtros",
    clearFilters: "Limpiar filtros",

    cards: {
      income: "Ingresos",
      expenses: "Egresos",
      transfers: "Transferencias",
      commissions: "Comisiones",
      periodBalance: "Balance del periodo",
    },

    charts: {
      incomeVsExpense: "Ingresos vs egresos",
      incomeVsExpenseDescription: "Comparación mensual de entradas y salidas.",

      balanceEvolution: "Evolución del balance",
      balanceEvolutionDescription: "Balance acumulado de los últimos meses.",

      topExpenseCategories: "Top categorías de gasto",
      topExpenseCategoriesDescription: "Categorías con mayor salida de dinero.",

      budgetUsed: "Presupuesto usado",
      budgetUsedDescription: "Avance del presupuesto mensual actual.",

      expensesByCategory: "Gastos por categoría",
      accountSummary: "Resumen por cuenta",
    },

    empty: {
      noBudget: "Crea un presupuesto mensual para ver este gráfico.",
      noMovements: "Registra movimientos para visualizar estadísticas.",
      noExpenses: "Aún no hay gastos registrados en este periodo.",
      noIncome: "Aún no hay ingresos registrados en este periodo.",
    },

    labels: {
      income: "Ingresos",
      expenses: "Egresos",
      others: "Otros",
      top: "Top",
      balance: "Balance",
    },
  },

  settings: {
    title: "Ajustes",
    description: "Configura tu experiencia, datos, privacidad y plan.",

    appearance: "Apariencia",
    theme: "Tema",
    currentTheme: "Tema actual: {{theme}}",
    themeSystem: "Sistema",
    themeDark: "Oscuro",
    themeLight: "Claro",

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
    exportDescription:
      "Genera archivos con tus cuentas, movimientos y transferencias.",
    exporting: "Exportando...",
    exportCsv: "Exportar CSV",
    exportExcel: "Exportar Excel",

    importData: "Importar datos",
    importDescription: "Carga movimientos desde un archivo CSV.",

    localData: "Datos locales",
    localDataDescription:
      "Tus datos se guardan en este dispositivo. Más adelante se podrá activar sincronización con cuenta.",
    viewOnboardingAgain: "Ver onboarding otra vez",
    resetData: "Borrar datos locales",

    about: "Acerca de Orvian",
    aboutDescription:
      "Orvian te ayuda a organizar tus cuentas, gastos, presupuestos y reportes personales.",
    app: "Aplicación",
    version: "Versión",
    developer: "Desarrollador",
    visitDeveloperWebsite: "Visitar web del desarrollador",

    linkErrorTitle: "No se pudo abrir el enlace",
    linkErrorDescription:
      "Tu dispositivo no puede abrir este sitio web en este momento.",
    privacyLinkErrorDescription:
      "Tu dispositivo no puede abrir la política de privacidad en este momento.",

    resetDataTitle: "Borrar datos locales",
    resetDataDescription:
      "Esto eliminará cuentas, movimientos, transferencias, recordatorios y configuración guardada en este dispositivo.",
    resetDataConfirm: "Borrar",

    exportErrorTitle: "No se pudo exportar",
    exportCsvErrorDescription: "Ocurrió un error al generar el archivo CSV.",
    exportExcelErrorDescription:
      "Ocurrió un error al generar el archivo Excel.",
  },

  onboarding: {
    welcome: {
      title: "Controla tu dinero desde un solo lugar",
      description:
        "Registra cuentas, ingresos, gastos, transferencias, recordatorios y planes financieros desde una app local y privada.",
      balanceCardTitle: "Tu balance empieza aquí",
      income: "Ingresos",
      expenses: "Egresos",
      start: "Comenzar",
    },

    setup: {
      stepLabel: "Paso {{step}} de {{total}}",
      title: "Configura tu experiencia",
      description:
        "Estas respuestas personalizan la app sin obligarte a crear una cuenta.",
    },

    stepOne: {
      mainCurrency: "Moneda principal",
      calculateTotalNetWorth: "Calcular patrimonio total",
      calculateTotalNetWorthDescription:
        "Suma bancos, efectivo, cripto y otras cuentas en un balance general.",
      userType: "Tipo de usuario",

      personal: "Personal",
      personalDescription: "Quiero manejar mis finanzas personales.",

      business: "Negocio",
      businessDescription: "Quiero controlar ingresos y gastos de un negocio.",
    },

    stepTwo: {
      cryptoUsage: "Uso de criptomonedas",
      noCrypto: "No uso cripto",
      noCryptoDescription: "No necesito cuentas como Binance o Metamask.",
      useCrypto: "Sí uso cripto",
      useCryptoDescription:
        "Quiero registrar exchanges, wallets o activos digitales.",

      multiCurrencyUsage: "Uso de múltiples monedas",
      singleCurrency: "Solo una moneda",
      singleCurrencyDescription: "Manejo principalmente una moneda.",
      multipleCurrencies: "Múltiples monedas",
      multipleCurrenciesDescription: "Manejo cuentas en diferentes monedas.",
    },

    stepThree: {
      mainGoal: "Objetivo principal",

      controlExpenses: "Controlar gastos",
      controlExpensesDescription: "Quiero saber en qué se va mi dinero.",

      saveMoney: "Ahorrar más",
      saveMoneyDescription: "Quiero separar dinero para metas y reservas.",

      organizeAccounts: "Organizar cuentas",
      organizeAccountsDescription:
        "Quiero ver bancos, efectivo, tarjetas y deudas en orden.",

      activateFinancialReminders: "Activar recordatorios financieros",
      activateFinancialRemindersDescription:
        "Te ayudará a recordar pagos, cobros, compras o ahorros.",

      viewPlans: "Ver planes",
    },
  },

  budgets: {
    title: "Presupuestos",
    description: "Configura límites mensuales para controlar tus gastos.",

    allCategoriesAlreadyBudgeted:
      "Ya agregaste límites para todas las categorías disponibles.",
    budgetedCategories: "Categorías presupuestadas",
    budgetOf: "Presupuesto de {{period}}",
    currentSpendingVsBudget: "Gasto actual vs presupuesto mensual.",
    spent: "Gastado",
    limit: "Límite",
    limitedCategories: "Categorías limitadas",
    spentOfLimit: "{{spent}} de {{limit}}",
    status: {
      exceeded: "Superaste tu presupuesto mensual.",
      warning: "Estás cerca de alcanzar tu presupuesto mensual.",
      safe: "Tu gasto está dentro del presupuesto.",
    },

    newBudget: "Nuevo presupuesto",
    editBudget: "Editar presupuesto",
    createBudget: "Crear presupuesto",
    saveBudget: "Guardar presupuesto",

    monthLabel: "{{month}} de {{year}}",

    generalMonthlyBudget: "Presupuesto general mensual",
    generalBudgetPlaceholder: "Ej: 500",

    categoryBudgetTitle: "Presupuesto por categoría",
    categoryBudgetDescription:
      "Agrega límites solo a las categorías de gasto que quieras controlar.",

    expenseCategory: "Categoría de gasto",
    monthlyLimit: "Límite mensual",
    monthlyLimitPlaceholder: "Ej: 120",

    addCategory: "Agregar categoría",
    removeCategory: "Eliminar categoría",

    budgetUsed: "Presupuesto usado",
    remainingBudget: "Presupuesto restante",
    exceededBudget: "Presupuesto excedido",

    emptyTitle: "Aún no tienes presupuestos",
    emptyDescription:
      "Crea un presupuesto mensual para controlar mejor tus gastos.",

    deleteTitle: "Eliminar presupuesto",
    deleteDescription:
      "Se eliminará este presupuesto y sus límites por categoría.",

    errors: {
      generalRequired: "El presupuesto general es obligatorio.",
      generalGreaterThanZero: "El presupuesto general debe ser mayor a 0.",
      categoryRequired: "Selecciona una categoría.",
      categoryLimitRequired: "El límite mensual es obligatorio.",
      categoryLimitGreaterThanZero: "El límite mensual debe ser mayor a 0.",
      duplicatedCategory: "Esta categoría ya tiene un presupuesto asignado.",
    },
  },

  reminders: {
    title: "Recordatorios",
    description: "Programa pagos, cobros, compras o inversiones.",

    newReminder: "Nuevo recordatorio",
    editReminder: "Editar recordatorio",
    saveReminder: "Guardar recordatorio",
    deleteReminder: "Eliminar recordatorio",

    emptyTitle: "Aún no tienes recordatorios",
    emptyDescription:
      "Crea recordatorios para pagos, cobros, suscripciones, compras o ahorros.",

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
      dateRequired: "La fecha es obligatoria.",
      timeRequired: "La hora es obligatoria.",
      accountRequired: "Selecciona una cuenta.",
      amountInvalid: "El monto debe ser mayor o igual a 0.",
    },

    types: {
      payment: {
        label: "Pago",
        description: "Servicios, deudas, tarjeta o compromisos por pagar.",
      },
      collection: {
        label: "Cobro",
        description: "Dinero que deben pagarte.",
      },
      subscription: {
        label: "Suscripción",
        description: "Netflix, Spotify, software u otros pagos recurrentes.",
      },
      saving: {
        label: "Ahorro",
        description: "Recordatorio para separar dinero.",
      },
      investment: {
        label: "Inversión",
        description: "Compra recurrente de activos o cripto.",
      },
      purchase: {
        label: "Compra",
        description: "Compra importante planificada.",
      },
      custom: {
        label: "Personalizado",
        description: "Recordatorio financiero libre.",
      },
    },

    frequencies: {
      once: {
        label: "Una vez",
        description: "Se notificará solo en la fecha elegida.",
      },
      daily: {
        label: "Diario",
        description: "Se repetirá todos los días.",
      },
      weekly: {
        label: "Semanal",
        description: "Se repetirá cada semana.",
      },
      monthly: {
        label: "Mensual",
        description: "Se repetirá cada mes.",
      },
    },

    deleteTitle: "Eliminar recordatorio",
    deleteDescription:
      "Este recordatorio dejará de aparecer en tus próximos avisos.",
  },

  plans: {
    title: "Planes",
    description:
      "Elige el plan que mejor se adapte a tu forma de organizar tus finanzas.",

    currentPlan: "Plan actual",
    free: "Gratis",
    plus: "Plus",

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
        localData: "Datos guardados localmente",
      },
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
        priorityFeatures: "Acceso a funciones avanzadas",
      },
    },

    restorePurchase: "Restaurar compra",
    continueWithoutPlus: "Continuar sin Plus",

    errors: {
      purchaseUnavailable: "La compra no está disponible en este momento.",
      restoreUnavailable: "No se pudo restaurar la compra en este momento.",
    },
  },
} as const;
