export const ru = {
  common: {
    appName: "Orvian",
    cancel: "Отмена",
    save: "Сохранить",
    edit: "Редактировать",
    delete: "Удалить",
    close: "Закрыть",
    continue: "Продолжить",
    back: "Назад",
    next: "Далее",
    confirm: "Подтвердить",
    apply: "Применить",
    clear: "Очистить",
    add: "Добавить",
    create: "Создать",
    update: "Обновить",
    remove: "Удалить",
    search: "Поиск",
    select: "Выбрать",
    loading: "Загрузка...",
    saving: "Сохранение...",
    exporting: "Экспорт...",
    error: "Ошибка",
    success: "Готово",
    required: "Обязательно",
    optional: "Необязательно",
    amount: "Сумма",
    date: "Дата",
    time: "Время",
    title: "Название",
    description: "Описание",
    note: "Заметка",
    category: "Категория",
    currency: "Валюта",
    account: "Счёт",
    type: "Тип",
    frequency: "Частота",
    freePlan: "Бесплатный план",
    plusPlan: "План Plus",
    month: "Месяц",
    monthly: "Ежемесячно",
    total: "Итого",
    balance: "Баланс",
    income: "Доход",
    expense: "Расход",
    transfer: "Перевод",
    commission: "Комиссия",
    noData: "Нет данных",
    notAvailable: "Недоступно",
    no: "Нет",
    transfers: "Переводы"
  },
  tabs: {
    home: "Главная",
    accounts: "Счета",
    movements: "Операции",
    statistics: "Статистика",
    settings: "Настройки",
    more: "Ещё",
    budgets: "Бюджеты",
    loans: "Займы"
  },
  home: {
    totalEstimated: "Примерная общая сумма",
    totalEstimatedBalance: "Примерный общий баланс",
    monthlyExpenses: "Расходы за месяц",
    monthlyIncome: "Доходы за месяц",
    monthlyBalance: "Итог месяца",
    available: "Доступно",
    accounts: "Счета",
    upcomingReminders: "Ближайшие напоминания",
    viewAll: "Посмотреть всё",
    noUpcomingReminders: "У вас нет ближайших напоминаний.",
    recentActivity: "Недавняя активность",
    noRegisteredMovements: "Вы ещё не добавили ни одной операции.",
    noActivity: "Пока нет активности.",
    viewAllAccounts: "Смотреть все",
    monthlySummary: "Сводка за месяц"
  },
  accounts: {
    title: "Счета",
    description: "Добавляйте банки, наличные, криптовалюты, карты и займы.",
    newAccount: "Новый счёт",
    firstAccount: "Создать первый счёт",
    createTitle: "Новый счёт",
    editTitle: "Редактировать счёт",
    emptyTitle: "У вас пока нет счетов",
    emptyDescription: "Создайте первый счёт, чтобы начать записывать доходы, расходы и переводы.",
    freePlanRemaining: "Бесплатный план: доступно {{count}} счетов.",
    plusPlanUnlimited: "План Plus: счета без ограничений.",
    limitTitle: "Вы достигли лимита бесплатных счетов",
    limitDescription: "В бесплатном плане можно создать до 3 счетов. Активируйте Plus, чтобы создавать неограниченное количество счетов.",
    deleteTitle: "Удалить счёт",
    deleteDescription: "Этот счёт будет скрыт из активного списка. История операций сохранится.",
    saveAccount: "Сохранить счёт",
    saveChanges: "Сохранить изменения",
    card: {
      customAccount: "Пользовательский счёт",
      currentBalance: "Текущий баланс",
      includedInTotal: "Включён в примерный итог",
      excludedFromTotal: "Не включён в примерный итог",
      options: "Параметры"
    },
    form: {
      createTitle: "Новый счёт",
      editTitle: "Редактировать счёт",
      editDescription: "Обновите основные данные этого счёта.",
      createDescription: "Настройте основные данные этого счёта.",
      name: "Название счёта",
      namePlaceholder: "Напр. Pichincha Bank",
      currentBalance: "Текущий баланс",
      initialBalance: "Начальный баланс",
      balancePlaceholder: "0.00",
      balanceEditInfo: "Баланс обновляется через добавление операций, а не через редактирование счёта.",
      type: "Тип счёта",
      mainCurrency: "Основная валюта",
      currencyCrypto: "Криптовалюта",
      currencyFiat: "Обычная валюта",
      currencyCustom: "Другая",
      currencyEditInfo: "Основную валюту нельзя изменить при редактировании, чтобы не нарушить историю операций.",
      includeInTotal: "Добавить к примерному итогу",
      includeInTotalDescription: "Включите это, если хотите, чтобы этот счёт учитывался в общем балансе.",
      initialBalanceRequired: "Начальный баланс обязателен. Используйте 0, если баланса нет.",
      initialBalanceError: "Начальный баланс не может быть отрицательным.",
      nameRequired: "Название счёта обязательно.",
      institutionName: "Банк или учреждение",
      institutionNamePlaceholder: "Напр. банк, Binance, Metamask",
      pinAccount: "Закрепить как важный",
      pinAccountDescription: "Он будет отображаться первым на экране счетов.",
      cardDesign: "Дизайн карты",
      cardDesignPlusOnly: "Доступно только с Plus.",
      steps: {
        0: {
          description: "Сначала укажите основные данные счета."
        },
        1: {
          description: "Теперь настройте баланс, валюту и важность."
        },
        2: {
          description: "Выберите внешний вид карты этого счета."
        }
      },
      cardDesignUpgradeMessage: "Перейдите на Plus, чтобы настраивать дизайн карт.",
      isSavingsTarget: "Счёт для накоплений",
      isSavingsTargetDescription: "Используйте его, чтобы отделить деньги, которые не хотите тратить."
    },
    types: {
      bank: {
        label: "Банк",
        description: "Обычный банковский счёт."
      },
      cash: {
        label: "Наличные",
        description: "Доступные наличные деньги."
      },
      piggy_bank: {
        label: "Копилка",
        description: "Физические или отдельные сбережения для цели."
      },
      crypto_exchange: {
        label: "Криптоплатформа",
        description: "Счёт в приложениях вроде Binance или других криптоплатформах."
      },
      crypto_wallet: {
        label: "Криптокошелёк",
        description: "Кошелёк вроде MetaMask или другие приложения для хранения криптовалюты."
      },
      credit_card: {
        label: "Кредитная карта",
        description: "Карта с долгом или использованным кредитным лимитом."
      },
      loan_receivable: {
        label: "Долг к получению",
        description: "Деньги, которые кто-то должен вам."
      },
      loan_payable: {
        label: "Долг к оплате",
        description: "Деньги, которые вам нужно вернуть."
      },
      custom: {
        label: "Пользовательский счёт",
        description: "Тип счёта, заданный пользователем."
      }
    },
    cardDesigns: {
      default: {
        label: "Стандартный",
        description: "Чистый дизайн для любого счета."
      },
      minimal: {
        label: "Минималистичный",
        description: "Более сдержанный и лаконичный."
      },
      gradient: {
        label: "Градиент",
        description: "Более современный визуальный стиль."
      },
      blue: {
        label: "Фирменный синий",
        description: "Использует основной синий акцент Orvian."
      },
      dark: {
        label: "Тёмный",
        description: "Элегантный стиль с тёмным оформлением."
      },
      premium: {
        label: "Премиум",
        description: "Более эксклюзивный дизайн для важных счетов."
      }
    },
    groups: {
      regular: "Обычные",
      crypto: "Крипто"
    },
    summary: {
      regularTotal: "Итого по обычным счетам",
      cryptoTotal: "Итого по крипто",
      accountCount: "{{count}} счёт"
    },
    emptyCryptoAccounts: "У вас пока нет крипто-счетов.",
    emptyRegularAccounts: "У вас пока нет обычных счетов.",
    detail: {
      description: "Управляйте информацией и настройками этого счета.",
      notFoundTitle: "Счет не найден",
      notFoundDescription: "Этот счет больше не существует или был архивирован.",
      type: "Тип",
      institution: "Учреждение",
      mainCurrency: "Основная валюта",
      archiveTitle: "Архивировать счет",
      archiveDescription: "Этот счет больше не будет отображаться в основном списке, но его данные сохранятся.",
      archiveAction: "Архивировать",
      settings: "Настройки",
      recentMovements: "Последние операции",
      recentMovementsDescription: "Подтвержденная активность за последние 2 месяца.",
      noRecentMovements: "В этом счете нет недавних операций.",
      actions: "Действия",
      archive: "Архивировать счёт",
      edit: "Редактировать счёт",
      emptyActivity: "В этом счёте нет недавних операций.",
      information: "Информация",
      priority: "Приоритет",
      recentActivity: "Недавняя активность",
      totalEstimated: "Расчётный итог",
      normal: "Обычный",
      pinned: "Закреплена"
    }
  },
  movements: {
    title: "Операции",
    description: "Добавляйте доходы, расходы и переводы между своими счетами.",
    newMovement: "Новая операция",
    newTransfer: "Новый перевод",
    registerMovement: "Добавить операцию",
    emptyTitle: "У вас пока нет операций",
    emptyDescription: "Добавьте первый доход, расход или перевод, чтобы начать вести историю своих денег.",
    incomeExpense: "Доход / Расход",
    income: "Доход",
    expense: "Расход",
    transfer: "Перевод",
    freePlanRemaining: "Бесплатный план: доступно {{count}} операций в этом месяце.",
    plusPlanUnlimited: "План Plus: операции без ограничений.",
    firstCreateAccountTitle: "Сначала создайте счёт",
    firstCreateAccountDescription: "Для добавления доходов или расходов нужен хотя бы один активный счёт.",
    limitTitle: "Вы достигли лимита бесплатных операций",
    limitDescription: "В бесплатном плане можно добавить до 30 операций в месяц. Активируйте Plus, чтобы добавлять операции без ограничений.",
    deleteMovementTitle: "Удалить операцию",
    deleteMovementDescription: "Это действие вернёт баланс, изменённый этой операцией.",
    deleteTransferTitle: "Удалить перевод",
    deleteTransferDescription: "Это действие вернёт балансы, изменённые этим переводом.",
    editMovement: "Редактировать операцию",
    editTransfer: "Редактировать перевод",
    saveMovement: "Сохранить операцию",
    saveTransfer: "Сохранить перевод",
    form: {
      account: "Счёт",
      category: "Категория",
      amount: "Сумма",
      tags: "Теги",
      note: "Заметка",
      notePlaceholder: "Необязательная заметка",
      selectedAccountNotFound: "Выбранный счёт не существует.",
      insufficientBalance: "На этом счёте недостаточно средств.",
      createDescription: "Добавьте подтверждённый доход или расход.",
      amountRequired: "Сумма должна быть больше 0.",
      accountRequired: "Выберите счёт.",
      categoryRequired: "Выберите категорию.",
      allTagsSelected: "Вы уже выбрали все доступные теги.",
      accountCurrency: "Валюта: {{currency}}"
    },
    card: {
      defaultTitle: "Операция",
      deletedAccount: "Удалённый счёт"
    },
    transferCard: {
      fromAccountFallback: "Исходный счёт",
      toAccountFallback: "Счёт назначения",
      sent: "Отправлено",
      received: "Получено",
      fee: "Комиссия",
      exchangeRate: "Использованный курс: 1 {{fromCurrency}} = {{exchangeRate}} {{toCurrency}}"
    },
    transferForm: {
      fromAccount: "Исходный счёт",
      toAccount: "Счёт назначения",
      fromAmount: "Отправленная сумма",
      toAmount: "Полученная сумма",
      note: "Заметка",
      notePlaceholder: "Напр. перевод в сбережения",
      differentAccountsRequired: "Выберите разные счета.",
      description: "Перемещайте деньги между счетами и добавляйте комиссии или обмен валюты.",
      fromAccountRequired: "Выберите исходный счёт.",
      toAccountRequired: "Выберите счёт назначения.",
      fromAmountRequired: "Отправленная сумма должна быть больше 0.",
      toAmountRequired: "Полученная сумма должна быть больше 0.",
      feeInvalid: "Комиссия не может быть отрицательной.",
      insufficientBalance: "На исходном счёте недостаточно средств для этого перевода.",
      multiCurrencyBlockedByPlan: "Бесплатный план разрешает переводы только между счетами с одинаковой валютой.",
      fromAmountWithCurrency: "Отправленная сумма {{currency}}",
      toAmountWithCurrency: "Полученная сумма {{currency}}",
      feeAmountWithCurrency: "Комиссия {{currency}}",
      calculatedExchangeRate: "Рассчитанный курс обмена",
      multiCurrencyPlusTitle: "Переводы между валютами доступны в Plus",
      multiCurrencyPlusDescription: "В бесплатном плане можно переводить деньги между счетами с одинаковой валютой. Для переводов с обменом валюты активируйте Plus."
    },
    calculatorAmount: "Сумма операции",
    transferAmount: "Сумма перевода",
    emptyFilterTitle: "Нет результатов",
    emptyFilterDescription: "Измените фильтр, чтобы увидеть другие операции.",
    newExpense: "Новый расход",
    newIncome: "Новый доход"
  },
  statistics: {
    title: "Статистика",
    description: "Просматривайте доходы, расходы, переводы и категории.",
    filters: "Фильтры отчёта",
    applyFilters: "Применить фильтры",
    clearFilters: "Очистить фильтры",
    filtersDescription: "Настройте период, счёт, категорию и валюту.",
    cards: {
      income: "Доходы",
      expenses: "Расходы",
      transfers: "Переводы",
      commissions: "Комиссии",
      periodBalance: "Итог периода"
    },
    charts: {
      incomeVsExpense: "Доходы и расходы",
      incomeVsExpenseDescription: "Сравнение денег, которые пришли и ушли, по месяцам.",
      balanceEvolution: "Изменение баланса",
      balanceEvolutionDescription: "Накопленный баланс за последние месяцы.",
      topExpenseCategories: "Основные категории расходов",
      topExpenseCategoriesDescription: "Категории, на которые ушло больше всего денег.",
      budgetUsed: "Использованный бюджет",
      budgetUsedDescription: "Прогресс текущего месячного бюджета.",
      expensesByCategory: "Расходы по категориям",
      accountSummary: "Сводка по счетам"
    },
    empty: {
      noBudget: "Создайте месячный бюджет, чтобы увидеть этот график.",
      noMovements: "Добавьте операции, чтобы увидеть статистику.",
      noExpenses: "В этом периоде пока нет расходов.",
      noIncome: "В этом периоде пока нет доходов.",
      noIncomeExpenseChart: "Нет данных о доходах или расходах для графика.",
      noBalanceTrend: "Пока недостаточно данных о балансе, чтобы показать тенденцию.",
      noExpenseCategoriesChart: "Нет расходов по категориям для графика.",
      noFilterDataTitle: "Нет данных для этих фильтров",
      noFilterDataDescription: "Измените период или добавьте операции, чтобы увидеть статистику.",
      noExpensesForFilters: "Для этих фильтров нет расходов."
    },
    labels: {
      income: "Доходы",
      expenses: "Расходы",
      others: "Другое",
      top: "Топ",
      balance: "Баланс",
      used: "Использовано",
      spentAmount: "Потрачено {{amount}}",
      limitAmount: "Лимит: {{amount}}",
      noCategory: "Без категории",
      balanceAmount: "Баланс: {{amount}}"
    }
  },
  reports: {
    export: {
      title: "Экспорт сводки",
      description: "Скачайте свои счета, доходы, расходы и переводы в файле."
    },
    filters: {
      title: "Фильтры",
      panelDescription: "Настройте период и данные, которые хотите проанализировать.",
      period: "Период",
      account: "Счёт",
      category: "Категория",
      currency: "Валюта",
      from: "С",
      to: "По",
      movementKind: "Тип операции"
    },
    periods: {
      current_month: {
        label: "Текущий месяц",
        description: "Операции за текущий месяц."
      },
      last_month: {
        label: "Прошлый месяц",
        description: "Операции за прошлый месяц."
      },
      last_3_months: {
        label: "Последние 3 месяца",
        description: "Операции за последние три месяца."
      },
      current_year: {
        label: "Текущий год",
        description: "Операции за текущий год."
      },
      custom: {
        label: "Другой период",
        description: "Выберите диапазон дат вручную."
      }
    },
    movementKinds: {
      all: {
        label: "Все",
        description: "Доходы и расходы."
      },
      income: {
        label: "Доходы",
        description: "Только деньги, которые поступили."
      },
      expense: {
        label: "Расходы",
        description: "Только деньги, которые ушли."
      }
    },
    accounts: {
      all: {
        label: "Все счета",
        description: "Включает все активные счета."
      }
    },
    categories: {
      all: {
        label: "Все категории",
        description: "Не фильтровать по категории."
      }
    },
    currencies: {
      main: {
        label: "Основная валюта",
        description: "Использовать основную валюту для сводки."
      }
    }
  },
  settings: {
    title: "Настройки",
    description: "Настройте опыт использования, данные, приватность и план.",
    appearance: "Внешний вид",
    theme: "Тема",
    currentTheme: "Текущая тема: {{theme}}",
    themeModes: {
      system: "Системная",
      dark: "Тёмная",
      light: "Светлая"
    },
    language: "Язык",
    languageDescription: "Выберите язык интерфейса Orvian.",
    languagePickerLabel: "Язык",
    currentPlan: "Текущий план",
    currentPlanDescription: "Вы используете план {{plan}}.",
    freePlanName: "Бесплатный",
    viewPlans: "Посмотреть планы",
    shortcuts: "Быстрый доступ",
    viewBudgets: "Посмотреть бюджеты",
    viewReminders: "Посмотреть напоминания",
    privacy: "Приватность",
    privacyDescription: "Проверьте, как ваши данные обрабатываются внутри Orvian.",
    privacyPolicy: "Политика конфиденциальности",
    openPrivacyPolicy: "Посмотреть политику конфиденциальности",
    exportData: "Экспорт данных",
    exportDescription: "Создайте файлы со своими счетами, операциями и переводами.",
    exporting: "Экспорт...",
    exportCsv: "Экспорт CSV",
    exportExcel: "Экспорт Excel",
    importData: "Импорт данных",
    importDescription: "Загрузите операции из CSV-файла.",
    localData: "Локальные данные",
    localDataDescription: "Ваши данные сохраняются на этом устройстве. Синхронизацию аккаунта можно будет включить позже.",
    viewOnboardingAgain: "Посмотреть введение ещё раз",
    resetData: "Удалить локальные данные",
    about: "Об Orvian",
    aboutDescription: "Orvian помогает организовать счета, расходы, бюджеты и личные сводки.",
    app: "Приложение",
    version: "Версия",
    developer: "Разработчик",
    visitDeveloperWebsite: "Посетить сайт разработчика",
    linkErrorTitle: "Не удалось открыть ссылку",
    linkErrorDescription: "Ваше устройство сейчас не может открыть этот сайт.",
    privacyLinkErrorDescription: "Ваше устройство сейчас не может открыть политику конфиденциальности.",
    resetDataTitle: "Удалить локальные данные",
    resetDataDescription: "Это удалит счета, операции, переводы, напоминания и настройки, сохранённые на этом устройстве.",
    resetDataConfirm: "Удалить",
    exportErrorTitle: "Не удалось экспортировать",
    exportCsvErrorDescription: "Произошла ошибка при создании CSV-файла.",
    exportExcelErrorDescription: "Произошла ошибка при создании Excel-файла."
  },
  onboarding: {
    welcome: {
      title: "Управляйте деньгами в одном месте",
      description: "Добавляйте счета, доходы, расходы, переводы, напоминания и финансовые планы в локальном и приватном приложении.",
      balanceCardTitle: "Ваш баланс начинается здесь",
      income: "Доходы",
      expenses: "Расходы",
      start: "Начать"
    },
    setup: {
      stepLabel: "Шаг {{step}} из {{total}}",
      title: "Настройте приложение под себя",
      description: "Эти ответы персонализируют приложение без необходимости создавать аккаунт."
    },
    stepOne: {
      mainCurrency: "Основная валюта",
      calculateTotalNetWorth: "Посчитать все мои деньги",
      calculateTotalNetWorthDescription: "Объедините банки, наличные, криптовалюту и другие счета в один общий баланс.",
      userType: "Тип пользователя"
    },
    stepTwo: {
      cryptoUsage: "Использование криптовалюты",
      multiCurrencyUsage: "Использование нескольких валют"
    },
    stepThree: {
      mainGoal: "Главная цель",
      activateFinancialReminders: "Включить финансовые напоминания",
      activateFinancialRemindersDescription: "Это поможет помнить о платежах, поступлениях, покупках или сбережениях.",
      viewPlans: "Посмотреть планы"
    },
    options: {
      userProfile: {
        personal: {
          label: "Личный",
          description: "Я хочу управлять личными финансами."
        },
        freelancer: {
          label: "Профессиональный",
          description: "Я получаю доход от проектов или клиентов."
        },
        entrepreneur: {
          label: "Предприниматель",
          description: "Я управляю деньгами бизнеса или проекта."
        },
        investor: {
          label: "Инвестор",
          description: "Я хочу отслеживать активы, криптовалюту или инвестиции."
        },
        student: {
          label: "Студент",
          description: "Я хочу организовать расходы и сбережения."
        }
      },
      cryptoUsage: {
        none: {
          label: "Я не использую криптовалюту",
          description: "Мне не нужны счета вроде Binance или MetaMask."
        },
        basic: {
          label: "Да, я использую криптовалюту",
          description: "Я хочу добавлять платформы, кошельки или цифровые активы."
        },
        advanced: {
          label: "Я использую криптовалюту, но это не главное",
          description: "Я хочу добавлять криптовалюту, но это не самое важное для меня."
        }
      },
      multiCurrencyUsage: {
        none: {
          label: "Я использую одну валюту",
          description: "Я в основном управляю деньгами в одной валюте."
        },
        occasional: {
          label: "Иногда",
          description: "Иногда я использую счета в разных валютах."
        },
        frequent: {
          label: "Часто",
          description: "Я часто использую счета в нескольких валютах."
        }
      },
      financialGoal: {
        control_expenses: {
          label: "Контролировать расходы",
          description: "Я хочу знать, куда уходят мои деньги."
        },
        save_more: {
          label: "Копить больше",
          description: "Я хочу откладывать деньги на цели и резервы."
        },
        pay_debts: {
          label: "Погасить долги",
          description: "Я хочу организовать свои долги и ожидающие платежи."
        },
        track_income: {
          label: "Отслеживать доходы",
          description: "Я хочу ясно контролировать источники своих доходов."
        },
        understand_investments: {
          label: "Понимать инвестиции",
          description: "Я хочу лучше отслеживать активы, криптовалюту или инвестиции."
        },
        avoid_small_expenses: {
          label: "Избегать мелких ежедневных расходов",
          description: "Я хочу находить и контролировать мелкие ежедневные траты."
        }
      }
    },
    plans: {
      title: "Выберите, как хотите начать",
      description: "Вы можете использовать приложение бесплатно и включить расширенные функции позже.",
      continueWithPlus: "Продолжить с Plus"
    }
  },
  budgets: {
    title: "Бюджеты",
    description: "Установите месячные лимиты, чтобы контролировать расходы.",
    allCategoriesAlreadyBudgeted: "Вы уже добавили лимиты для всех доступных категорий.",
    budgetedCategories: "Категории с лимитами",
    budgetOf: "Бюджет на {{period}}",
    currentSpendingVsBudget: "Текущие расходы по сравнению с месячным лимитом.",
    spent: "Потрачено",
    limit: "Лимит",
    limitedCategories: "Категории с лимитами",
    spentOfLimit: "{{spent}} из {{limit}}",
    currentEmptyTitle: "У вас нет бюджета на этот месяц",
    currentEmptyDescription: "Создайте бюджет на {{period}}.",
    createMonthlyBudget: "Создать месячный бюджет",
    historyTitle: "История бюджетов",
    generalLimitValue: "Общий лимит: {{amount}} {{currency}}",
    modalDescription: "Установите лимиты, чтобы контролировать месячные расходы.",
    status: {
      exceeded: "Вы превысили месячный бюджет.",
      warning: "Вы близки к достижению месячного бюджета.",
      safe: "Ваши расходы в пределах бюджета.",
      used: "Использовано",
      spentAmount: "Потрачено {{amount}}",
      limitAmount: "Лимит: {{amount}}"
    },
    newBudget: "Новый бюджет",
    editBudget: "Редактировать бюджет",
    createBudget: "Создать бюджет",
    saveBudget: "Сохранить бюджет",
    deleteBudget: "Удалить бюджет",
    monthLabel: "{{month}} {{year}}",
    generalMonthlyBudget: "Общий месячный бюджет",
    generalBudgetPlaceholder: "Напр. 500",
    categoryBudgetTitle: "Бюджет по категориям",
    categoryBudgetDescription: "Добавьте лимиты только для тех категорий расходов, которые хотите контролировать.",
    expenseCategory: "Категория расхода",
    monthlyLimit: "Месячный лимит",
    monthlyLimitPlaceholder: "Напр. 120",
    addCategory: "Добавить категорию",
    removeCategory: "Удалить категорию",
    budgetUsed: "Использованный бюджет",
    remainingBudget: "Оставшийся бюджет",
    exceededBudget: "Превышенный бюджет",
    emptyTitle: "У вас пока нет бюджетов",
    emptyDescription: "Создайте месячный бюджет, чтобы лучше контролировать расходы.",
    deleteTitle: "Удалить бюджет",
    deleteDescription: "Этот бюджет и его лимиты по категориям будут удалены.",
    errors: {
      generalRequired: "Общий бюджет обязателен.",
      generalGreaterThanZero: "Общий бюджет должен быть больше 0.",
      categoryRequired: "Выберите категорию.",
      categoryLimitRequired: "Месячный лимит обязателен.",
      categoryLimitGreaterThanZero: "Месячный лимит должен быть больше 0.",
      duplicatedCategory: "Для этой категории уже назначен бюджет."
    }
  },
  reminders: {
    title: "Напоминания",
    description: "Планируйте платежи, поступления, покупки или инвестиции.",
    newReminder: "Новое напоминание",
    saveReminder: "Сохранить напоминание",
    createReminder: "Создать напоминание",
    completeTitle: "Завершить напоминание",
    completeDescription: "Хотите отметить это напоминание как выполненное?",
    cancelTitle: "Отменить напоминание",
    cancelDescription: "Хотите отменить это напоминание?",
    confirmCancel: "Да, отменить",
    emptyTitle: "У вас пока нет напоминаний",
    emptyDescription: "Создавайте напоминания для платежей, поступлений, подписок, покупок или сбережений.",
    complete: "Завершить",
    form: {
      title: "Название",
      titlePlaceholder: "Напр. оплатить интернет",
      amountOptional: "Сумма необязательна",
      amountPlaceholder: "0.00",
      type: "Тип",
      frequency: "Частота",
      date: "Дата",
      time: "Время",
      relatedAccount: "Связанный счёт",
      descriptionOptional: "Описание необязательно",
      descriptionPlaceholder: "Напр. срок оплаты каждый 5-й день месяца...",
      titleRequired: "Название обязательно.",
      amountInvalid: "Сумма должна быть больше или равна 0.",
      futureDateRequired: "Дата должна быть в будущем."
    },
    card: {
      defaultType: "Напоминание"
    },
    types: {
      payment: {
        label: "Платёж",
        description: "Услуги, долги, карта или обязательства к оплате."
      },
      collection: {
        label: "Поступление",
        description: "Деньги, которые кто-то должен вам заплатить."
      },
      subscription: {
        label: "Подписка",
        description: "Netflix, Spotify, ПО или другие регулярные платежи."
      },
      saving: {
        label: "Сбережение",
        description: "Напоминание, чтобы отложить деньги."
      },
      investment: {
        label: "Инвестиция",
        description: "Регулярная покупка активов или криптовалюты."
      },
      purchase: {
        label: "Покупка",
        description: "Важная запланированная покупка."
      },
      custom: {
        label: "Другое",
        description: "Пользовательское финансовое напоминание."
      }
    },
    frequencies: {
      once: {
        label: "Один раз",
        description: "Уведомление придёт только в выбранную дату."
      },
      daily: {
        label: "Ежедневно",
        description: "Будет повторяться каждый день."
      },
      weekly: {
        label: "Еженедельно",
        description: "Будет повторяться каждую неделю."
      },
      monthly: {
        label: "Ежемесячно",
        description: "Будет повторяться каждый месяц."
      }
    }
  },
  plans: {
    title: "Планы",
    description: "Выберите план, который лучше всего подходит вашему способу управления финансами.",
    currentPlan: "Текущий план",
    free: "Бесплатный",
    plus: "Plus",
    demoDescription: "Начните бесплатно и активируйте расширенные функции, когда они понадобятся.",
    monthlyPeriod: "в месяц",
    yearlyAvailable: "Также доступно за ${{price}} в год.",
    plusActive: "Plus активен",
    activatePlusDemo: "Активировать демо Plus",
    freeActive: "Бесплатный план активен",
    backToFree: "Вернуться к бесплатному плану",
    freePlan: {
      name: "Бесплатный",
      description: "Идеально, чтобы начать организовывать личные финансы.",
      price: "$0",
      period: "Навсегда",
      cta: "Продолжить бесплатно",
      current: "Текущий план",
      features: {
        accountsLimit: "До 3 счетов",
        movementsLimit: "До 30 операций в месяц",
        basicStatistics: "Базовая статистика",
        localData: "Данные сохраняются локально"
      }
    },
    plusPlan: {
      name: "Plus",
      description: "Для пользователей, которым нужен полный контроль финансов.",
      price: "{{price}}",
      period: "в месяц",
      cta: "Активировать Plus",
      features: {
        unlimitedAccounts: "Счета без ограничений",
        unlimitedMovements: "Операции без ограничений",
        advancedStatistics: "Расширенная статистика",
        budgets: "Месячные бюджеты",
        reminders: "Финансовые напоминания",
        exportData: "Экспорт данных",
        priorityFeatures: "Доступ к расширенным функциям"
      }
    },
    restorePurchase: "Восстановить покупку",
    continueWithoutPlus: "Продолжить без Plus",
    errors: {
      purchaseUnavailable: "Покупка сейчас недоступна.",
      restoreUnavailable: "Не удалось восстановить покупку сейчас."
    },
    v2: {
      title: "Выберите, как развиваться с Orvian",
      description: "Начните бесплатно и открывайте премиум-функции, когда они понадобятся.",
      oneTimePayment: "Разовый платеж",
      unlockPlus: "Открыть Plus",
      plusActive: "Plus активен",
      buyPack: "Купить пакет",
      included: "Включено",
      includedWithPlus: "Включено в Plus",
      cardDesigns: {
        title: "Дизайны карт",
        description: "Покупайте отдельные пакеты или открывайте их с Plus."
      },
      legacy: {
        title: "Преимущество для ранних пользователей",
        description: "Спасибо, что попробовали Orvian до публичного запуска.",
        benefit: "Вы получите временный доступ Plus и специальную скидку на Plus Lifetime.",
        temporaryUntil: "Временный доступ примерно до: {{date}}"
      },
      pro: {
        title: "Скоро: Orvian Pro",
        description: "Финансовый ИИ, облачная синхронизация, резервные копии и доступ с нескольких устройств войдут в отдельный ежемесячный план."
      }
    },
    products: {
      plusLifetime: {
        description: "Откройте локальные премиум-функции одним платежом."
      },
      cardPacks: {
        dark: {
          description: "Темные и элегантные дизайны для ваших счетов."
        },
        luxury: {
          description: "Эксклюзивные дизайны для более выразительного приложения."
        },
        crypto: {
          description: "Дизайны, вдохновленные цифровыми активами и кошельками."
        },
        minimal: {
          description: "Чистые и минималистичные дизайны для личных счетов."
        }
      }
    }
  },
  categories: {
    salary: "Зарплата",
    freelance: "Проект / Фриланс",
    sales: "Продажи",
    business_income: "Бизнес",
    investment_income: "Инвестиции",
    gift_income: "Подарок / Дополнительно",
    refund: "Возврат",
    loan_received: "Полученный займ",
    rental_income: "Доход от аренды",
    other_income: "Другой доход",
    food: "Еда",
    groceries: "Продукты",
    restaurants: "Рестораны",
    transport: "Транспорт",
    fuel: "Топливо",
    taxi_rideshare: "Такси / Приложения",
    housing: "Жильё",
    rent: "Аренда",
    services: "Услуги",
    electricity: "Электричество",
    water: "Вода",
    internet_phone: "Интернет / Телефон",
    health: "Здоровье",
    medicine: "Лекарства",
    education: "Образование",
    entertainment: "Развлечения",
    subscriptions: "Подписки",
    technology: "Технологии",
    clothing: "Одежда",
    personal_care: "Уход за собой",
    family: "Семья",
    pets: "Питомцы",
    travel: "Путешествия",
    gifts: "Подарки",
    taxes: "Налоги",
    fees: "Комиссии",
    debt_payment: "Оплата долга",
    savings: "Сбережения",
    investment_expense: "Инвестиции",
    cash_withdrawal: "Снятие наличных",
    other: "Другое"
  },
  tags: {
    essential: "Необходимое",
    optional: "Необязательное",
    urgent: "Срочно",
    recurring: "Повторяющееся",
    planned: "Запланировано",
    unplanned: "Не запланировано",
    cash: "Наличные",
    card: "Карта",
    transfer: "Перевод",
    online: "Онлайн",
    subscription: "Подписка",
    work: "Работа",
    personal: "Личное",
    family: "Семья",
    business: "Бизнес",
    tax: "Налог",
    invoice: "Счёт",
    debt: "Долг",
    savings: "Сбережения",
    small_expense: "Мелкий ежедневный расход"
  },
  loans: {
    newLoan: "Новый займ",
    form: {
      description: "Отслеживайте деньги, которые нужно выплатить или получить.",
      title: "Название",
      titlePlaceholder: "Напр. личный займ",
      titleRequired: "Название обязательно.",
      personOrEntity: "Человек или организация",
      personOrEntityPlaceholder: "Напр. Иван, банк, родственник",
      payable: "Мне нужно заплатить",
      receivable: "Мне должны заплатить",
      payableDescription: "Деньги, которые вы должны.",
      receivableDescription: "Деньги, которые должны вам.",
      amount: "Сумма",
      amountPlaceholder: "0.00",
      amountRequired: "Сумма обязательна.",
      amountError: "Введите сумму больше 0.",
      currency: "Валюта",
      notes: "Заметки",
      notesPlaceholder: "Дополнительные сведения о займе",
      createTitle: "Создать займ"
    },
    payment: {
      remainingAmount: "Осталось: {{amount}}",
      amount: "Сумма",
      amountPlaceholder: "0.00",
      amountRequired: "Сумма обязательна.",
      amountError: "Введите сумму больше 0 и не больше {{amount}}.",
      note: "Заметка",
      notePlaceholder: "Дополнительная информация о платеже или получении",
      pay: "Оплатить"
    }
  },
  transfers: {
    form: {
      fromAccountRequired: "Выберите исходный счёт.",
      toAccountRequired: "Выберите счёт назначения.",
      sameAccountError: "Исходный и целевой счета должны отличаться.",
      exchangeRatePending: "Пока будет использоваться курс 1:1. Расширенный обмен будет добавлен позже.",
      fromAccount: "Исходный счёт",
      toAccount: "Счёт назначения",
      feeAmount: "Комиссия"
    }
  }
} as const;
