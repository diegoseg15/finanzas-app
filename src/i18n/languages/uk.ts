export const uk = {
  common: {
    appName: "Orvian",
    cancel: "Скасувати",
    save: "Зберегти",
    edit: "Редагувати",
    delete: "Видалити",
    close: "Закрити",
    continue: "Продовжити",
    back: "Назад",
    next: "Далі",
    confirm: "Підтвердити",
    apply: "Застосувати",
    clear: "Очистити",
    add: "Додати",
    create: "Створити",
    update: "Оновити",
    remove: "Прибрати",
    search: "Пошук",
    select: "Вибрати",
    loading: "Завантаження...",
    saving: "Збереження...",
    exporting: "Експорт...",
    error: "Помилка",
    success: "Готово",
    required: "Обов’язково",
    optional: "Необов’язково",
    amount: "Сума",
    date: "Дата",
    time: "Час",
    title: "Назва",
    description: "Опис",
    note: "Нотатка",
    category: "Категорія",
    currency: "Валюта",
    account: "Рахунок",
    type: "Тип",
    frequency: "Частота",
    freePlan: "Безкоштовний план",
    plusPlan: "План Plus",
    month: "Місяць",
    monthly: "Щомісяця",
    total: "Усього",
    balance: "Баланс",
    income: "Дохід",
    expense: "Витрата",
    transfer: "Переказ",
    commission: "Комісія",
    noData: "Немає даних",
    notAvailable: "Недоступно",
    no: "Ні",
    transfers: "Перекази",
    skip: "Пропустити",
    understood: "Зрозуміло"
  },
  tabs: {
    home: "Головна",
    accounts: "Рахунки",
    movements: "Операції",
    statistics: "Статистика",
    settings: "Налаштування",
    more: "Більше",
    budgets: "Бюджети",
    loans: "Позики"
  },
  home: {
    totalEstimated: "Орієнтовна загальна сума",
    totalEstimatedBalance: "Орієнтовний загальний баланс",
    monthlyExpenses: "Витрати за місяць",
    monthlyIncome: "Доходи за місяць",
    monthlyBalance: "Результат місяця",
    available: "Доступно",
    accounts: "Рахунки",
    upcomingReminders: "Майбутні нагадування",
    viewAll: "Переглянути все",
    noUpcomingReminders: "У вас немає майбутніх нагадувань.",
    recentActivity: "Остання активність",
    noRegisteredMovements: "Ви ще не зареєстрували жодної операції.",
    noActivity: "Поки що немає активності.",
    viewAllAccounts: "Переглянути всі",
    monthlySummary: "Місячний підсумок"
  },
  accounts: {
    title: "Рахунки",
    description: "Додавайте банки, готівку, криптовалюти, картки та позики.",
    newAccount: "Новий рахунок",
    firstAccount: "Створити перший рахунок",
    createTitle: "Новий рахунок",
    editTitle: "Редагувати рахунок",
    emptyTitle: "У вас ще немає рахунків",
    emptyDescription: "Створіть перший рахунок, щоб почати реєструвати доходи, витрати та перекази.",
    freePlanRemaining: "Безкоштовний план: доступно {{count}} рахунків.",
    plusPlanUnlimited: "План Plus: необмежена кількість рахунків.",
    limitTitle: "Ви досягли ліміту безкоштовних рахунків",
    limitDescription: "Безкоштовний план дозволяє створити до 3 рахунків. Активуйте Plus, щоб створювати необмежену кількість рахунків.",
    deleteTitle: "Видалити рахунок",
    deleteDescription: "Цей рахунок буде приховано з активного списку. Його історичні операції буде збережено.",
    saveAccount: "Зберегти рахунок",
    saveChanges: "Зберегти зміни",
    card: {
      customAccount: "Користувацький рахунок",
      currentBalance: "Поточний баланс",
      includedInTotal: "Включено до орієнтовної загальної суми",
      excludedFromTotal: "Не включено до орієнтовної загальної суми",
      options: "Параметри"
    },
    form: {
      createTitle: "Новий рахунок",
      editTitle: "Редагувати рахунок",
      editDescription: "Оновіть основні дані цього рахунку.",
      createDescription: "Налаштуйте основні дані цього рахунку.",
      name: "Назва рахунку",
      namePlaceholder: "Напр. Pichincha Bank",
      currentBalance: "Поточний баланс",
      initialBalance: "Початковий баланс",
      balancePlaceholder: "0.00",
      balanceEditInfo: "Баланс оновлюється через реєстрацію операцій, а не через редагування рахунку.",
      type: "Тип рахунку",
      mainCurrency: "Основна валюта",
      currencyCrypto: "Криптовалюта",
      currencyFiat: "Традиційна валюта",
      currencyCustom: "Користувацька",
      currencyEditInfo: "Основну валюту не можна змінити під час редагування, щоб не порушити історію операцій.",
      includeInTotal: "Додати до орієнтовної загальної суми",
      includeInTotalDescription: "Увімкніть це, якщо хочете, щоб цей рахунок додавався до вашого загального балансу.",
      initialBalanceRequired: "Початковий баланс обов’язковий. Використовуйте 0, якщо балансу немає.",
      initialBalanceError: "Початковий баланс не може бути від’ємним.",
      nameRequired: "Назва рахунку обов’язкова.",
      institutionName: "Банк або установа",
      institutionNamePlaceholder: "Напр. банк, Binance, Metamask",
      pinAccount: "Закріпити як важливий",
      pinAccountDescription: "Він відображатиметься першим на екрані рахунків.",
      cardDesign: "Дизайн картки",
      cardDesignPlusOnly: "Доступно лише з Plus.",
      steps: {
        0: {
          description: "Спочатку визначте дані рахунку."
        },
        1: {
          description: "Тепер налаштуйте баланс, валюту та важливість."
        },
        2: {
          description: "Оберіть вигляд картки цього рахунку."
        }
      },
      cardDesignUpgradeMessage: "Оновіться до Plus, щоб налаштовувати дизайн карток.",
      isSavingsTarget: "Рахунок для заощаджень",
      isSavingsTargetDescription: "Використовуйте його, щоб відокремити гроші, які не хочете витрачати."
    },
    types: {
      bank: {
        label: "Банк",
        description: "Традиційний банківський рахунок."
      },
      cash: {
        label: "Готівка",
        description: "Доступні фізичні гроші."
      },
      piggy_bank: {
        label: "Скарбничка",
        description: "Фізичні або окремо відкладені заощадження для цілі."
      },
      crypto_exchange: {
        label: "Криптоплатформа",
        description: "Рахунок у застосунках на кшталт Binance або інших криптоплатформах."
      },
      crypto_wallet: {
        label: "Криптогаманець",
        description: "Гаманець на кшталт MetaMask або інші застосунки для зберігання криптовалюти."
      },
      credit_card: {
        label: "Кредитна картка",
        description: "Картка з боргом або використаним кредитним лімітом."
      },
      loan_receivable: {
        label: "Позика до отримання",
        description: "Гроші, які хтось винен вам."
      },
      loan_payable: {
        label: "Позика до сплати",
        description: "Гроші, які вам потрібно повернути."
      },
      custom: {
        label: "Користувацький рахунок",
        description: "Тип рахунку, визначений користувачем."
      }
    },
    cardDesigns: {
      default: {
        label: "Стандартний",
        description: "Чистий дизайн для будь-якого рахунку."
      },
      minimal: {
        label: "Мінімалістичний",
        description: "Більш стриманий і лаконічний."
      },
      gradient: {
        label: "Градієнт",
        description: "Більш сучасний візуальний стиль."
      },
      blue: {
        label: "Фірмовий синій",
        description: "Використовує основний синій акцент Orvian."
      },
      dark: {
        label: "Темний",
        description: "Елегантний стиль із темним виглядом."
      },
      premium: {
        label: "Преміум",
        description: "Більш ексклюзивний дизайн для важливих рахунків."
      }
    },
    groups: {
      regular: "Традиційні",
      crypto: "Крипто"
    },
    summary: {
      regularTotal: "Загалом традиційні",
      cryptoTotal: "Загалом крипто",
      accountCount: "{{count}} рахунок"
    },
    emptyCryptoAccounts: "У вас ще немає крипто-рахунків.",
    emptyRegularAccounts: "У вас ще немає традиційних рахунків.",
    detail: {
      description: "Керуйте інформацією та налаштуваннями цього рахунку.",
      notFoundTitle: "Рахунок не знайдено",
      notFoundDescription: "Цей рахунок більше не існує або був архівований.",
      type: "Тип",
      institution: "Установа",
      mainCurrency: "Основна валюта",
      archiveTitle: "Архівувати рахунок",
      archiveDescription: "Цей рахунок більше не відображатиметься в основному списку, але його дані буде збережено.",
      archiveAction: "Архівувати",
      settings: "Налаштування",
      recentMovements: "Останні операції",
      recentMovementsDescription: "Підтверджена активність за останні 2 місяці.",
      noRecentMovements: "У цьому рахунку немає останніх операцій.",
      actions: "Дії",
      archive: "Архівувати рахунок",
      edit: "Редагувати рахунок",
      emptyActivity: "У цьому рахунку немає останніх операцій.",
      information: "Інформація",
      priority: "Пріоритет",
      recentActivity: "Нещодавня активність",
      totalEstimated: "Орієнтовний підсумок",
      normal: "Звичайний",
      pinned: "Закріплена"
    }
  },
  movements: {
    title: "Операції",
    description: "Реєструйте доходи, витрати та перекази між вашими рахунками.",
    newMovement: "Нова операція",
    newTransfer: "Новий переказ",
    registerMovement: "Зареєструвати операцію",
    emptyTitle: "У вас ще немає операцій",
    emptyDescription: "Зареєструйте перший дохід, витрату або переказ, щоб почати створювати свою фінансову історію.",
    incomeExpense: "Дохід / Витрата",
    income: "Дохід",
    expense: "Витрата",
    transfer: "Переказ",
    freePlanRemaining: "Безкоштовний план: цього місяця доступно {{count}} операцій.",
    plusPlanUnlimited: "План Plus: необмежена кількість операцій.",
    firstCreateAccountTitle: "Спочатку створіть рахунок",
    firstCreateAccountDescription: "Для реєстрації доходів або витрат потрібен хоча б один активний рахунок.",
    limitTitle: "Ви досягли ліміту безкоштовних операцій",
    limitDescription: "Безкоштовний план дозволяє до 30 операцій на місяць. Активуйте Plus, щоб реєструвати необмежену кількість операцій.",
    deleteMovementTitle: "Видалити операцію",
    deleteMovementDescription: "Ця дія скасує вплив цієї операції на баланс.",
    deleteTransferTitle: "Видалити переказ",
    deleteTransferDescription: "Ця дія скасує вплив цього переказу на баланси.",
    editMovement: "Редагувати операцію",
    editTransfer: "Редагувати переказ",
    saveMovement: "Зберегти операцію",
    saveTransfer: "Зберегти переказ",
    form: {
      account: "Рахунок",
      category: "Категорія",
      amount: "Сума",
      tags: "Теги",
      note: "Нотатка",
      notePlaceholder: "Необов’язкова нотатка",
      selectedAccountNotFound: "Вибраний рахунок не існує.",
      insufficientBalance: "На цьому рахунку недостатньо коштів.",
      createDescription: "Зареєструйте підтверджений дохід або витрату.",
      amountRequired: "Сума має бути більшою за 0.",
      accountRequired: "Виберіть рахунок.",
      categoryRequired: "Виберіть категорію.",
      allTagsSelected: "Ви вже вибрали всі доступні теги.",
      accountCurrency: "Валюта: {{currency}}"
    },
    card: {
      defaultTitle: "Операція",
      deletedAccount: "Видалений рахунок"
    },
    transferCard: {
      fromAccountFallback: "Рахунок-джерело",
      toAccountFallback: "Рахунок призначення",
      sent: "Надіслано",
      received: "Отримано",
      fee: "Комісія",
      exchangeRate: "Використаний курс: 1 {{fromCurrency}} = {{exchangeRate}} {{toCurrency}}"
    },
    transferForm: {
      fromAccount: "Рахунок-джерело",
      toAccount: "Рахунок призначення",
      fromAmount: "Надіслана сума",
      toAmount: "Отримана сума",
      note: "Нотатка",
      notePlaceholder: "Напр. переказ на заощадження",
      differentAccountsRequired: "Виберіть різні рахунки.",
      description: "Переміщуйте гроші між рахунками та реєструйте комісії або обмін валюти.",
      fromAccountRequired: "Виберіть рахунок-джерело.",
      toAccountRequired: "Виберіть рахунок призначення.",
      fromAmountRequired: "Надіслана сума має бути більшою за 0.",
      toAmountRequired: "Отримана сума має бути більшою за 0.",
      feeInvalid: "Комісія не може бути від’ємною.",
      insufficientBalance: "На рахунку-джерелі недостатньо коштів для цього переказу.",
      multiCurrencyBlockedByPlan: "Безкоштовний план дозволяє перекази лише між рахунками з однаковою валютою.",
      fromAmountWithCurrency: "Надіслана сума {{currency}}",
      toAmountWithCurrency: "Отримана сума {{currency}}",
      feeAmountWithCurrency: "Комісія {{currency}}",
      calculatedExchangeRate: "Розрахований обмінний курс",
      multiCurrencyPlusTitle: "Перекази між валютами доступні в Plus",
      multiCurrencyPlusDescription: "У безкоштовному плані ви можете переказувати між рахунками з однаковою валютою. Для переказів з обміном валюти активуйте Plus."
    },
    calculatorAmount: "Сума операції",
    transferAmount: "Сума переказу",
    emptyFilterTitle: "Немає результатів",
    emptyFilterDescription: "Змініть фільтр, щоб побачити інші операції.",
    newExpense: "Нова витрата",
    newIncome: "Новий дохід"
  },
  statistics: {
    title: "Статистика",
    description: "Переглядайте свої доходи, витрати, перекази та категорії.",
    filters: "Фільтри звіту",
    applyFilters: "Застосувати фільтри",
    clearFilters: "Очистити фільтри",
    filtersDescription: "Налаштуйте період, рахунок, категорію та валюту.",
    cards: {
      income: "Доходи",
      expenses: "Витрати",
      transfers: "Перекази",
      commissions: "Комісії",
      periodBalance: "Результат періоду"
    },
    charts: {
      incomeVsExpense: "Доходи vs витрати",
      incomeVsExpenseDescription: "Щомісячне порівняння грошей, що надходять і витрачаються.",
      balanceEvolution: "Динаміка балансу",
      balanceEvolutionDescription: "Накопичений баланс за останні місяці.",
      topExpenseCategories: "Основні категорії витрат",
      topExpenseCategoriesDescription: "Категорії з найбільшим відтоком грошей.",
      budgetUsed: "Використаний бюджет",
      budgetUsedDescription: "Прогрес поточного місячного бюджету.",
      expensesByCategory: "Витрати за категоріями",
      accountSummary: "Підсумок рахунків"
    },
    empty: {
      noBudget: "Створіть місячний бюджет, щоб побачити цей графік.",
      noMovements: "Зареєструйте операції, щоб переглядати статистику.",
      noExpenses: "У цьому періоді ще немає зареєстрованих витрат.",
      noIncome: "У цьому періоді ще немає зареєстрованих доходів.",
      noIncomeExpenseChart: "Немає даних про доходи або витрати для побудови графіка.",
      noBalanceTrend: "Поки що недостатньо даних про баланс, щоб показати тенденцію.",
      noExpenseCategoriesChart: "Немає витрат за категоріями для побудови графіка.",
      noFilterDataTitle: "Немає даних для цих фільтрів",
      noFilterDataDescription: "Змініть період або зареєструйте операції, щоб побачити статистику.",
      noExpensesForFilters: "Для цих фільтрів немає витрат."
    },
    labels: {
      income: "Доходи",
      expenses: "Витрати",
      others: "Інше",
      top: "Топ",
      balance: "Баланс",
      used: "Використано",
      spentAmount: "Витрачено {{amount}}",
      limitAmount: "Ліміт: {{amount}}",
      noCategory: "Без категорії",
      balanceAmount: "Баланс: {{amount}}"
    }
  },
  reports: {
    export: {
      title: "Експортувати підсумок",
      description: "Завантажте свої рахунки, доходи, витрати та перекази у файл."
    },
    filters: {
      title: "Фільтри",
      panelDescription: "Налаштуйте період і дані, які хочете проаналізувати.",
      period: "Період",
      account: "Рахунок",
      category: "Категорія",
      currency: "Валюта",
      from: "З",
      to: "До",
      movementKind: "Тип операції"
    },
    periods: {
      current_month: {
        label: "Поточний місяць",
        description: "Операції поточного місяця."
      },
      last_month: {
        label: "Минулий місяць",
        description: "Операції минулого місяця."
      },
      last_3_months: {
        label: "Останні 3 місяці",
        description: "Операції за останні три місяці."
      },
      current_year: {
        label: "Поточний рік",
        description: "Операції поточного року."
      },
      custom: {
        label: "Користувацький",
        description: "Виберіть діапазон дат вручну."
      }
    },
    movementKinds: {
      all: {
        label: "Усі",
        description: "Доходи та витрати."
      },
      income: {
        label: "Доходи",
        description: "Лише гроші, що надходять."
      },
      expense: {
        label: "Витрати",
        description: "Лише гроші, що витрачаються."
      }
    },
    accounts: {
      all: {
        label: "Усі рахунки",
        description: "Включає всі активні рахунки."
      }
    },
    categories: {
      all: {
        label: "Усі категорії",
        description: "Не фільтрувати за категорією."
      }
    },
    currencies: {
      main: {
        label: "Основна валюта",
        description: "Використовувати основну валюту для підсумку."
      }
    }
  },
  settings: {
    title: "Налаштування",
    description: "Налаштуйте свій досвід, дані, приватність і план.",
    appearance: "Вигляд",
    theme: "Тема",
    currentTheme: "Поточна тема: {{theme}}",
    themeModes: {
      system: "Системна",
      dark: "Темна",
      light: "Світла"
    },
    language: "Мова",
    languageDescription: "Виберіть мову інтерфейсу Orvian.",
    languagePickerLabel: "Мова",
    currentPlan: "Поточний план",
    currentPlanDescription: "Ви використовуєте план {{plan}}.",
    freePlanName: "Безкоштовний",
    viewPlans: "Переглянути плани",
    shortcuts: "Швидкий доступ",
    viewBudgets: "Переглянути бюджети",
    viewReminders: "Переглянути нагадування",
    privacy: "Приватність",
    privacyDescription: "Перевірте, як ваші дані обробляються в Orvian.",
    privacyPolicy: "Політика конфіденційності",
    openPrivacyPolicy: "Переглянути політику конфіденційності",
    exportData: "Експорт даних",
    exportDescription: "Створіть файли з вашими рахунками, операціями та переказами.",
    exporting: "Експорт...",
    exportCsv: "Експортувати CSV",
    exportExcel: "Експортувати Excel",
    importData: "Імпорт даних",
    importDescription: "Завантажте операції з CSV-файлу.",
    localData: "Локальні дані",
    localDataDescription: "Ваші дані зберігаються на цьому пристрої. Синхронізацію рахунку можна буде ввімкнути пізніше.",
    viewOnboardingAgain: "Переглянути вступ ще раз",
    resetData: "Видалити локальні дані",
    about: "Про Orvian",
    aboutDescription: "Orvian допомагає організувати ваші рахунки, витрати, бюджети та особисті підсумки.",
    app: "Застосунок",
    version: "Версія",
    developer: "Розробник",
    visitDeveloperWebsite: "Відвідати сайт розробника",
    linkErrorTitle: "Не вдалося відкрити посилання",
    linkErrorDescription: "Ваш пристрій зараз не може відкрити цей сайт.",
    privacyLinkErrorDescription: "Ваш пристрій зараз не може відкрити політику конфіденційності.",
    resetDataTitle: "Видалити локальні дані",
    resetDataDescription: "Це видалить рахунки, операції, перекази, нагадування та налаштування, збережені на цьому пристрої.",
    resetDataConfirm: "Видалити",
    exportErrorTitle: "Не вдалося експортувати",
    exportCsvErrorDescription: "Сталася помилка під час створення CSV-файлу.",
    exportExcelErrorDescription: "Сталася помилка під час створення Excel-файлу.",
    mainCurrency: "Основна валюта"
  },
  onboarding: {
    welcome: {
      title: "Керуйте своїми грошима в одному місці",
      description: "Реєструйте рахунки, доходи, витрати, перекази, нагадування та фінансові плани в локальному й приватному застосунку.",
      balanceCardTitle: "Ваш баланс починається тут",
      income: "Доходи",
      expenses: "Витрати",
      start: "Почати"
    },
    setup: {
      stepLabel: "Крок {{step}} з {{total}}",
      title: "Налаштуйте свій досвід",
      description: "Ці відповіді персоналізують застосунок без необхідності створювати обліковий запис."
    },
    stepOne: {
      mainCurrency: "Основна валюта",
      calculateTotalNetWorth: "Порахувати всі мої гроші",
      calculateTotalNetWorthDescription: "Об’єднайте банки, готівку, криптовалюту та інші рахунки в один загальний баланс.",
      userType: "Тип користувача"
    },
    stepTwo: {
      cryptoUsage: "Використання криптовалюти",
      multiCurrencyUsage: "Використання кількох валют"
    },
    stepThree: {
      mainGoal: "Основна ціль",
      activateFinancialReminders: "Увімкнути фінансові нагадування",
      activateFinancialRemindersDescription: "Це допоможе вам пам’ятати про платежі, надходження, покупки або заощадження.",
      viewPlans: "Переглянути плани"
    },
    options: {
      userProfile: {
        personal: {
          label: "Особистий",
          description: "Я хочу керувати особистими фінансами."
        },
        freelancer: {
          label: "Професійний",
          description: "Я отримую дохід від проєктів або клієнтів."
        },
        entrepreneur: {
          label: "Підприємець",
          description: "Я керую грошима бізнесу або проєкту."
        },
        investor: {
          label: "Інвестор",
          description: "Я хочу відстежувати активи, криптовалюту або інвестиції."
        },
        student: {
          label: "Студент",
          description: "Я хочу організувати витрати та заощадження."
        }
      },
      cryptoUsage: {
        none: {
          label: "Я не використовую криптовалюту",
          description: "Мені не потрібні рахунки на кшталт Binance або MetaMask."
        },
        basic: {
          label: "Так, я використовую криптовалюту",
          description: "Я хочу додавати платформи, гаманці або цифрові активи."
        },
        advanced: {
          label: "Я використовую криптовалюту, але це не пріоритет",
          description: "Я хочу додавати криптовалюту, але це не найважливіше для мене."
        }
      },
      multiCurrencyUsage: {
        none: {
          label: "Я використовую одну валюту",
          description: "Я переважно керую грошима в одній валюті."
        },
        occasional: {
          label: "Іноді",
          description: "Іноді я використовую рахунки в різних валютах."
        },
        frequent: {
          label: "Часто",
          description: "Я часто використовую рахунки в кількох валютах."
        }
      },
      financialGoal: {
        control_expenses: {
          label: "Контролювати витрати",
          description: "Я хочу знати, куди йдуть мої гроші."
        },
        save_more: {
          label: "Заощаджувати більше",
          description: "Я хочу відкладати гроші на цілі та резерви."
        },
        pay_debts: {
          label: "Погасити борги",
          description: "Я хочу організувати свої борги та майбутні платежі."
        },
        track_income: {
          label: "Відстежувати мій дохід",
          description: "Я хочу чітко контролювати джерела своїх доходів."
        },
        understand_investments: {
          label: "Розуміти мої інвестиції",
          description: "Я хочу краще відстежувати активи, криптовалюту або інвестиції."
        },
        avoid_small_expenses: {
          label: "Уникати дрібних щоденних витрат",
          description: "Я хочу виявляти та контролювати дрібні щоденні витрати."
        }
      }
    },
    plans: {
      title: "Виберіть, як хочете почати",
      description: "Ви можете користуватися застосунком безкоштовно та активувати розширені функції пізніше.",
      continueWithPlus: "Продовжити з Plus"
    },
    v2: {
      control: {
        title: "Контролюйте гроші без зайвої складності",
        description: "Організуйте рахунки, баланси й операції в одному місці."
      },
      movements: {
        title: "Записуйте витрати й доходи за секунди",
        description: "Використовуйте швидку форму у стилі калькулятора, щоб легше записувати гроші."
      },
      reminders: {
        title: "Не забувайте платежі та надходження",
        description: "Створюйте нагадування для платежів, надходжень і регулярних зобов’язань."
      },
      clarity: {
        title: "Бачте свої фінанси чітко",
        description: "Розумійте баланси, операції та майбутні зобов’язання в простому застосунку."
      },
      currency: {
        title: "Оберіть основну валюту",
        description: "Ми використовуватимемо цю валюту для показу підсумків, звітів і основних балансів."
      },
      start: "Почати зараз",
      welcome: {
        title: "Ласкаво просимо до Orvian",
        description: "Зрозуміліший і простіший спосіб керувати грошима, рахунками та майбутніми зобов’язаннями."
      },
      accounts: {
        title: "Ваші рахунки краще організовані",
        description: "Створюйте рахунки, відстежуйте баланси й налаштовуйте картки для кращої наочності."
      },
      analytics: {
        title: "Розумійте фінанси з першого погляду",
        description: "Дивіться тренди, витрати й доходи в простих графіках для кращих рішень."
      },
      plans: {
        title: "Почніть безкоштовно, покращуйте за потреби",
        description: "Користуйтеся Orvian безкоштовно або відкрийте Plus Lifetime з локальними преміум-функціями."
      },
      continueWithPlus: "Продовжити з Plus",
      continueFree: "Продовжити безкоштовно"
    }
  },
  budgets: {
    title: "Бюджети",
    description: "Встановлюйте місячні ліміти, щоб контролювати свої витрати.",
    allCategoriesAlreadyBudgeted: "Ви вже додали ліміти для всіх доступних категорій.",
    budgetedCategories: "Категорії з лімітами",
    budgetOf: "Бюджет на {{period}}",
    currentSpendingVsBudget: "Поточні витрати порівняно з вашим місячним лімітом.",
    spent: "Витрачено",
    limit: "Ліміт",
    limitedCategories: "Категорії з лімітами",
    spentOfLimit: "{{spent}} з {{limit}}",
    currentEmptyTitle: "У вас немає бюджету на цей місяць",
    currentEmptyDescription: "Створіть бюджет на {{period}}.",
    createMonthlyBudget: "Створити місячний бюджет",
    historyTitle: "Історія бюджетів",
    generalLimitValue: "Загальний ліміт: {{amount}} {{currency}}",
    modalDescription: "Встановіть ліміти, щоб контролювати свої місячні витрати.",
    status: {
      exceeded: "Ви перевищили свій місячний бюджет.",
      warning: "Ви наближаєтеся до межі місячного бюджету.",
      safe: "Ваші витрати в межах бюджету.",
      used: "Використано",
      spentAmount: "Витрачено {{amount}}",
      limitAmount: "Ліміт: {{amount}}"
    },
    newBudget: "Новий бюджет",
    editBudget: "Редагувати бюджет",
    createBudget: "Створити бюджет",
    saveBudget: "Зберегти бюджет",
    deleteBudget: "Видалити бюджет",
    monthLabel: "{{month}} {{year}}",
    generalMonthlyBudget: "Загальний місячний бюджет",
    generalBudgetPlaceholder: "Напр. 500",
    categoryBudgetTitle: "Бюджет за категорією",
    categoryBudgetDescription: "Додавайте ліміти лише до тих категорій витрат, які хочете контролювати.",
    expenseCategory: "Категорія витрат",
    monthlyLimit: "Місячний ліміт",
    monthlyLimitPlaceholder: "Напр. 120",
    addCategory: "Додати категорію",
    removeCategory: "Прибрати категорію",
    budgetUsed: "Використаний бюджет",
    remainingBudget: "Залишок бюджету",
    exceededBudget: "Перевищений бюджет",
    emptyTitle: "У вас ще немає бюджетів",
    emptyDescription: "Створіть місячний бюджет, щоб краще контролювати свої витрати.",
    deleteTitle: "Видалити бюджет",
    deleteDescription: "Цей бюджет і його ліміти за категоріями буде видалено.",
    errors: {
      generalRequired: "Загальний бюджет обов’язковий.",
      generalGreaterThanZero: "Загальний бюджет має бути більшим за 0.",
      categoryRequired: "Виберіть категорію.",
      categoryLimitRequired: "Місячний ліміт обов’язковий.",
      categoryLimitGreaterThanZero: "Місячний ліміт має бути більшим за 0.",
      duplicatedCategory: "Ця категорія вже має призначений бюджет."
    }
  },
  reminders: {
    title: "Нагадування",
    description: "Плануйте платежі, надходження, покупки або інвестиції.",
    newReminder: "Нове нагадування",
    saveReminder: "Зберегти нагадування",
    createReminder: "Створити нагадування",
    completeTitle: "Завершити нагадування",
    completeDescription: "Хочете позначити це нагадування як завершене?",
    cancelTitle: "Скасувати нагадування",
    cancelDescription: "Хочете скасувати це нагадування?",
    confirmCancel: "Так, скасувати",
    emptyTitle: "У вас ще немає нагадувань",
    emptyDescription: "Створюйте нагадування для платежів, надходжень, підписок, покупок або заощаджень.",
    complete: "Завершити",
    form: {
      title: "Назва",
      titlePlaceholder: "Напр. оплатити інтернет",
      amountOptional: "Необов’язкова сума",
      amountPlaceholder: "0.00",
      type: "Тип",
      frequency: "Частота",
      date: "Дата",
      time: "Час",
      relatedAccount: "Пов’язаний рахунок",
      descriptionOptional: "Необов’язковий опис",
      descriptionPlaceholder: "Напр. термін оплати кожного 5 числа місяця...",
      titleRequired: "Назва обов’язкова.",
      amountInvalid: "Сума має бути більшою або дорівнювати 0.",
      futureDateRequired: "Дата має бути в майбутньому."
    },
    card: {
      defaultType: "Нагадування"
    },
    types: {
      payment: {
        label: "Платіж",
        description: "Послуги, борги, картка або зобов’язання до сплати."
      },
      collection: {
        label: "Надходження",
        description: "Гроші, які хтось має вам заплатити."
      },
      subscription: {
        label: "Підписка",
        description: "Netflix, Spotify, програмне забезпечення або інші регулярні платежі."
      },
      saving: {
        label: "Заощадження",
        description: "Нагадування відкласти гроші."
      },
      investment: {
        label: "Інвестиція",
        description: "Регулярна купівля активів або криптовалюти."
      },
      purchase: {
        label: "Покупка",
        description: "Важлива запланована покупка."
      },
      custom: {
        label: "Користувацьке",
        description: "Користувацьке фінансове нагадування."
      }
    },
    frequencies: {
      once: {
        label: "Один раз",
        description: "Ви отримаєте сповіщення лише у вибрану дату."
      },
      daily: {
        label: "Щодня",
        description: "Повторюватиметься щодня."
      },
      weekly: {
        label: "Щотижня",
        description: "Повторюватиметься щотижня."
      },
      monthly: {
        label: "Щомісяця",
        description: "Повторюватиметься щомісяця."
      }
    }
  },
  plans: {
    title: "Плани",
    description: "Виберіть план, який найкраще відповідає тому, як ви організовуєте свої фінанси.",
    currentPlan: "Поточний план",
    free: "Безкоштовний",
    plus: "Plus",
    demoDescription: "Почніть безкоштовно та активуйте розширені функції, коли вони вам знадобляться.",
    monthlyPeriod: "на місяць",
    yearlyAvailable: "Також доступно за ${{price}} на рік.",
    plusActive: "Plus активний",
    activatePlusDemo: "Активувати демо Plus",
    freeActive: "Безкоштовний активний",
    backToFree: "Повернутися до безкоштовного",
    freePlan: {
      name: "Безкоштовний",
      description: "Ідеально, щоб почати організовувати особисті фінанси.",
      price: "$0",
      period: "Назавжди",
      cta: "Продовжити безкоштовно",
      current: "Поточний план",
      features: {
        accountsLimit: "До 3 рахунків",
        movementsLimit: "До 30 операцій на місяць",
        basicStatistics: "Базова статистика",
        localData: "Дані зберігаються локально",
        accounts: "До 3 рахунків",
        movements: "Необмежені операції",
        basicReminders: "Базові нагадування",
        basicMovements: "Базовий облік операцій"
      }
    },
    plusPlan: {
      name: "Plus",
      description: "Для користувачів, які хочуть повний фінансовий контроль.",
      price: "{{price}}",
      period: "на місяць",
      cta: "Активувати Plus",
      features: {
        unlimitedAccounts: "Необмежена кількість рахунків",
        unlimitedMovements: "Необмежена кількість операцій",
        advancedStatistics: "Розширена статистика",
        budgets: "Місячні бюджети",
        reminders: "Фінансові нагадування",
        exportData: "Експорт даних",
        priorityFeatures: "Доступ до розширених функцій"
      }
    },
    restorePurchase: "Відновити покупку",
    continueWithoutPlus: "Продовжити без Plus",
    errors: {
      purchaseUnavailable: "Покупка зараз недоступна.",
      restoreUnavailable: "Не вдалося відновити покупку зараз."
    },
    v2: {
      title: "Оберіть, як розвиватися з Orvian",
      description: "Почніть безкоштовно й відкривайте преміум-функції, коли вони потрібні.",
      oneTimePayment: "Одноразовий платіж",
      unlockPlus: "Розблокувати Plus",
      plusActive: "Plus активний",
      buyPack: "Купити пакет",
      included: "Включено",
      includedWithPlus: "Включено з Plus",
      cardDesigns: {
        title: "Дизайни карток",
        description: "Купуйте окремі пакети або відкривайте їх з Plus."
      },
      legacy: {
        title: "Перевага для ранніх користувачів",
        description: "Дякуємо, що спробували Orvian до публічного запуску.",
        benefit: "Ви отримаєте тимчасовий доступ Plus і спеціальну знижку на Plus Lifetime.",
        temporaryUntil: "Орієнтовний тимчасовий доступ до: {{date}}",
        shortBenefit: "Спеціальна знижка за тестування Orvian до запуску."
      },
      pro: {
        title: "Незабаром: Orvian Pro",
        description: "Фінансовий ШІ, хмарна синхронізація, резервні копії та доступ з кількох пристроїв будуть частиною окремого місячного плану."
      },
      freePrice: "$0 · Для початку",
      plusPrice: "$4.99 · Одноразовий платіж",
      legacyPrice: "$2.99 · Ціна для ранніх користувачів"
    },
    products: {
      plusLifetime: {
        description: "Розблокуйте локальні преміум-функції одним платежем.",
        name: "Plus Lifetime",
        features: {
          unlimitedAccounts: "Необмежені рахунки",
          unlimitedReminders: "Необмежені нагадування",
          cardDesigns: "Преміум-дизайни карток"
        }
      },
      cardPacks: {
        dark: {
          description: "Темні та елегантні дизайни для ваших рахунків."
        },
        luxury: {
          description: "Ексклюзивні дизайни для застосунку з більшою виразністю."
        },
        crypto: {
          description: "Дизайни, натхненні цифровими активами та гаманцями."
        },
        minimal: {
          description: "Чисті та мінімалістичні дизайни для особистих рахунків."
        }
      }
    },
    purchase: {
      errorTitle: "Не вдалося почати покупку",
      errorDescription: "Перевірте підключення або спробуйте ще раз через Google Play."
    }
  },
  categories: {
    salary: "Зарплата",
    freelance: "Проєкт / Фриланс",
    sales: "Продажі",
    business_income: "Бізнес",
    investment_income: "Інвестиція",
    gift_income: "Подарунок / Додатковий дохід",
    refund: "Повернення коштів",
    loan_received: "Отримана позика",
    rental_income: "Дохід від оренди",
    other_income: "Інший дохід",
    food: "Їжа",
    groceries: "Продукти",
    restaurants: "Ресторани",
    transport: "Транспорт",
    fuel: "Пальне",
    taxi_rideshare: "Таксі / Застосунки",
    housing: "Житло",
    rent: "Оренда",
    services: "Послуги",
    electricity: "Електроенергія",
    water: "Вода",
    internet_phone: "Інтернет / Телефон",
    health: "Здоров’я",
    medicine: "Ліки",
    education: "Освіта",
    entertainment: "Розваги",
    subscriptions: "Підписки",
    technology: "Технології",
    clothing: "Одяг",
    personal_care: "Особистий догляд",
    family: "Сім’я",
    pets: "Домашні тварини",
    travel: "Подорожі",
    gifts: "Подарунки",
    taxes: "Податки",
    fees: "Комісії",
    debt_payment: "Оплата боргу",
    savings: "Заощадження",
    investment_expense: "Інвестиція",
    cash_withdrawal: "Зняття готівки",
    other: "Інше"
  },
  tags: {
    essential: "Необхідне",
    optional: "Необов’язкове",
    urgent: "Терміново",
    recurring: "Повторюване",
    planned: "Заплановане",
    unplanned: "Незаплановане",
    cash: "Готівка",
    card: "Картка",
    transfer: "Переказ",
    online: "Онлайн",
    subscription: "Підписка",
    work: "Робота",
    personal: "Особисте",
    family: "Сім’я",
    business: "Бізнес",
    tax: "Податок",
    invoice: "Рахунок-фактура",
    debt: "Борг",
    savings: "Заощадження",
    small_expense: "Дрібна щоденна витрата"
  },
  loans: {
    newLoan: "Нова позика",
    form: {
      description: "Відстежуйте гроші, які потрібно сплатити або отримати.",
      title: "Назва",
      titlePlaceholder: "Напр. особиста позика",
      titleRequired: "Назва обов’язкова.",
      personOrEntity: "Особа або установа",
      personOrEntityPlaceholder: "Напр. особа, банк, родич",
      payable: "Мені потрібно сплатити",
      receivable: "Мені мають заплатити",
      payableDescription: "Гроші, які ви винні.",
      receivableDescription: "Гроші, які вам винні.",
      amount: "Сума",
      amountPlaceholder: "0.00",
      amountRequired: "Сума обов’язкова.",
      amountError: "Введіть суму більше 0.",
      currency: "Валюта",
      notes: "Нотатки",
      notesPlaceholder: "Додаткові відомості про позику",
      createTitle: "Створити позику"
    },
    payment: {
      remainingAmount: "Залишилось: {{amount}}",
      amount: "Сума",
      amountPlaceholder: "0.00",
      amountRequired: "Сума обов’язкова.",
      amountError: "Введіть суму більше 0 і не більше {{amount}}.",
      note: "Нотатка",
      notePlaceholder: "Додаткова інформація про платіж або отримання",
      pay: "Сплатити"
    }
  },
  transfers: {
    form: {
      fromAccountRequired: "Виберіть рахунок-джерело.",
      toAccountRequired: "Виберіть рахунок призначення.",
      sameAccountError: "Рахунки джерела та призначення мають бути різними.",
      exchangeRatePending: "Поки що використовуватиметься курс 1:1. Розширений обмін буде додано пізніше.",
      fromAccount: "Рахунок-джерело",
      toAccount: "Рахунок призначення",
      feeAmount: "Комісія"
    }
  },
  guides: {
    homeOverview: {
      title: "Ваш фінансовий огляд починається тут",
      description: "Переглядайте загальний баланс, основні рахунки та останні операції на цьому екрані."
    },
    movementQuickAdd: {
      title: "Записуйте гроші кнопкою +",
      description: "Використовуйте центральну кнопку нижньої панелі, щоб швидко створювати витрати, доходи або перекази."
    },
    homeTour: {
      totalBalance: "Тут ви бачите приблизний загальний баланс ваших рахунків.",
      accounts: "Це ваші основні рахунки. Натисніть на один, щоб переглянути деталі.",
      monthlySummary: "Тут ви бачите підсумок доходів, витрат і балансу за місяць.",
      recentActivity: "Тут з’являються ваші останні операції та перекази."
    },
    statisticsTour: {
      filters: "Використовуйте цю кнопку, щоб фільтрувати статистику за датою, рахунком, категорією, валютою або типом операції.",
      summary: "Тут показано підсумок періоду: доходи, витрати, перекази, комісії та баланс.",
      incomeVsExpense: "Цей графік порівнює доходи й витрати за місяцями, щоб зрозуміти, чи не витрачаєте ви більше, ніж отримуєте.",
      balanceEvolution: "Тут видно, як змінюється ваш баланс із часом і чи покращується фінансова тенденція.",
      topCategories: "Цей графік показує найбільші категорії витрат, щоб зрозуміти, куди йдуть гроші.",
      budgetUsed: "Якщо у вас активний бюджет, тут видно, скільки використано і чи близько ви до ліміту.",
      expensesByCategory: "Цей список упорядковує витрати за категоріями з відсотком і сумою, щоб бачити пріоритети.",
      accountSummary: "Тут ви порівнюєте доходи, витрати й баланс за рахунками, щоб побачити найактивніший рахунок.",
      chartsPanel: "Ці графіки допомагають порівнювати доходи, витрати, зміну балансу, основні категорії та використання бюджету."
    }
  }
} as const;
