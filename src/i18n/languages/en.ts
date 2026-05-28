export const en = {
  common: {
    appName: "Orvian",

    no: "No",

    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    close: "Close",
    continue: "Continue",
    back: "Back",
    next: "Next",
    confirm: "Confirm",
    apply: "Apply",
    clear: "Clear",
    add: "Add",
    create: "Create",
    update: "Update",
    remove: "Remove",
    search: "Search",
    select: "Select",

    loading: "Loading...",
    saving: "Saving...",
    exporting: "Exporting...",
    error: "Error",
    success: "Done",

    required: "Required",
    optional: "Optional",

    amount: "Amount",
    date: "Date",
    time: "Time",
    title: "Title",
    description: "Description",
    note: "Note",
    category: "Category",
    currency: "Currency",
    account: "Account",
    type: "Type",
    frequency: "Frequency",

    freePlan: "Free plan",
    plusPlan: "Plus plan",

    month: "Month",
    monthly: "Monthly",
    total: "Total",
    balance: "Balance",
    income: "Income",
    expense: "Expense",
    transfer: "Transfer",
    commission: "Commission",

    noData: "No data",
    notAvailable: "Not available",
  },

  tabs: {
    home: "Home",
    accounts: "Accounts",
    movements: "Movements",
    statistics: "Statistics",
    settings: "Settings",
    more: "More",
  },

  home: {
    greeting: "Hello",
    totalEstimated: "Estimated total",
    totalEstimatedBalance: "Estimated total balance",
    monthlyExpenses: "Monthly expenses",
    monthlyIncome: "Monthly income",
    monthlyBalance: "Monthly balance",
    available: "Available",

    accounts: "Accounts",
    upcomingReminders: "Upcoming reminders",
    viewAll: "View all",
    noUpcomingReminders: "You have no upcoming reminders.",

    recentActivity: "Recent activity",
    noRegisteredMovements: "You haven’t registered any movements yet.",
    noActivity: "There is no activity yet.",
  },

  accounts: {
    title: "Accounts",
    description: "Register banks, cash, cryptocurrencies, cards, and loans.",

    newAccount: "New account",
    firstAccount: "Create first account",
    createTitle: "New account",
    editTitle: "Edit account",

    emptyTitle: "You don’t have any accounts yet",
    emptyDescription:
      "Create your first account to start registering income, expenses, and transfers.",

    freePlanRemaining: "Free plan: {{count}} accounts available.",
    plusPlanUnlimited: "Plus plan: unlimited accounts.",

    limitTitle: "You’ve reached the free account limit",
    limitDescription:
      "The free plan allows up to 3 accounts. Activate Plus to create unlimited accounts.",

    deleteTitle: "Delete account",
    deleteDescription:
      "The account will be hidden from the active list. Its historical movements will be preserved.",

    saveAccount: "Save account",
    saveChanges: "Save changes",

    card: {
      customAccount: "Custom account",
      currentBalance: "Current balance",
      includedInTotal: "Included in estimated total",
      excludedFromTotal: "Separated from estimated total",
    },

    form: {
      createTitle: "New account",
      editTitle: "Edit account",
      createDescription: "Register where you have or owe money.",
      editDescription: "Update this account’s main details.",

      name: "Account name",
      namePlaceholder: "E.g. Pichincha Bank",

      currentBalance: "Current balance",
      initialBalance: "Initial balance",
      balancePlaceholder: "0.00",
      balanceEditInfo:
        "The balance is modified by registering movements, not by editing the account.",

      type: "Account type",
      mainCurrency: "Main currency",

      currencyCrypto: "Cryptocurrency",
      currencyFiat: "Fiat currency",
      currencyCustom: "Custom",

      currencyEditInfo:
        "The main currency cannot be changed when editing, to avoid breaking the movement history.",

      includeInTotal: "Add to estimated total",
      includeInTotalDescription:
        "Enable this if you want this account to affect your overall balance.",

      initialBalanceRequired:
        "The initial balance is required. Use 0 if there is no balance.",
      initialBalanceError: "The initial balance cannot be negative.",
      nameRequired: "The account name is required.",
    },

    types: {
      bank: {
        label: "Bank",
        description: "Traditional bank account.",
      },
      cash: {
        label: "Cash",
        description: "Physical money available.",
      },
      piggy_bank: {
        label: "Piggy bank",
        description: "Physical or separated savings for a goal.",
      },
      crypto_exchange: {
        label: "Crypto exchange",
        description: "Account on platforms like Binance or other exchanges.",
      },
      crypto_wallet: {
        label: "Crypto wallet",
        description: "Crypto wallet like MetaMask or other wallets.",
      },
      credit_card: {
        label: "Credit card",
        description: "Card with debt or used credit limit.",
      },
      loan_receivable: {
        label: "Loan receivable",
        description: "Money someone else owes you.",
      },
      loan_payable: {
        label: "Loan payable",
        description: "Money you need to pay.",
      },
      custom: {
        label: "Custom account",
        description: "Account type defined by the user.",
      },
    },
  },

  movements: {
    title: "Movements",
    description:
      "Register income, expenses, and transfers between your accounts.",

    newMovement: "New movement",
    newTransfer: "New transfer",
    registerMovement: "Register movement",

    emptyTitle: "You don’t have any movements yet",
    emptyDescription:
      "Register your first income, expense, or transfer to start building your financial history.",

    incomeExpense: "Income / Expense",
    income: "Income",
    expense: "Expense",
    transfer: "Transfer",

    freePlanRemaining: "Free plan: {{count}} movements available this month.",
    plusPlanUnlimited: "Plus plan: unlimited movements.",

    firstCreateAccountTitle: "Create an account first",
    firstCreateAccountDescription:
      "You need at least one active account to register income or expenses.",

    limitTitle: "You’ve reached the free movement limit",
    limitDescription:
      "The free plan allows up to 30 movements per month. Activate Plus to register unlimited movements.",

    deleteMovementTitle: "Delete movement",
    deleteMovementDescription:
      "This action will revert the balance affected by this movement.",

    deleteTransferTitle: "Delete transfer",
    deleteTransferDescription:
      "This action will revert the balances affected by this transfer.",

    editMovement: "Edit movement",
    editTransfer: "Edit transfer",
    saveMovement: "Save movement",
    saveTransfer: "Save transfer",

    createDescription: "Register a confirmed income or expense.",
    selectedAccountNotFound: "The selected account does not exist.",
    negativeBalanceWarning:
      "This expense will leave the account with a negative balance.",
    accountCurrency: "Currency: {{currency}}",

    form: {
      type: "Type",
      account: "Account",
      category: "Category",
      amount: "Amount",
      currency: "Currency",
      tags: "Tags",
      note: "Note",
      notePlaceholder: "E.g. grocery shopping",
      date: "Date",

      income: "Income",
      expense: "Expense",

      amountRequired: "The amount must be greater than 0.",
      accountRequired: "Select an account.",
      categoryRequired: "Select a category.",
    },

    card: {
      defaultTitle: "Movement",
      deletedAccount: "Deleted account",
    },

    transferCard: {
      fromAccountFallback: "Source account",
      toAccountFallback: "Destination account",
      sent: "Sent",
      received: "Received",
      fee: "Fee",
      exchangeRate:
        "Rate: 1 {{fromCurrency}} = {{exchangeRate}} {{toCurrency}}",
    },

    transferForm: {
      fromAccount: "Source account",
      toAccount: "Destination account",
      fromAmount: "Amount sent",
      toAmount: "Amount received",
      fromCurrency: "Sent currency",
      toCurrency: "Received currency",
      feeAmount: "Fee",
      feeCurrency: "Fee currency",
      exchangeRate: "Exchange rate",
      note: "Note",
      notePlaceholder: "E.g. transfer to savings",

      saveTransfer: "Save transfer",

      amountRequired: "The amount must be greater than 0.",
      differentAccountsRequired: "Select different accounts.",

      description:
        "Move money between accounts and record fees or currency exchange.",

      fromAccountRequired: "Select a source account.",
      toAccountRequired: "Select a destination account.",

      fromAmountRequired: "The sent amount must be greater than 0.",
      toAmountRequired: "The received amount must be greater than 0.",
      feeInvalid: "The fee cannot be negative.",

      multiCurrencyBlockedByPlan:
        "The free plan only allows transfers between accounts with the same currency.",

      negativeBalanceWarning:
        "This transfer will leave the source account with a negative balance.",

      fromAmountWithCurrency: "Sent amount {{currency}}",
      toAmountWithCurrency: "Received amount {{currency}}",
      feeAmountWithCurrency: "Fee {{currency}}",

      calculatedExchangeRate: "Calculated exchange rate",

      multiCurrencyPlusTitle: "Multi-currency transfers are available in Plus",
      multiCurrencyPlusDescription:
        "On the free plan, you can transfer between accounts with the same currency. To transfer with currency exchange, activate Plus.",
    },
  },

  statistics: {
    title: "Statistics",
    description: "Analyze your income, expenses, transfers, and categories.",

    filters: "Report filters",
    applyFilters: "Apply filters",
    clearFilters: "Clear filters",

    cards: {
      income: "Income",
      expenses: "Expenses",
      transfers: "Transfers",
      commissions: "Commissions",
      periodBalance: "Period balance",
    },

    charts: {
      incomeVsExpense: "Income vs expenses",
      incomeVsExpenseDescription:
        "Monthly comparison of money coming in and going out.",

      balanceEvolution: "Balance evolution",
      balanceEvolutionDescription: "Accumulated balance over the last months.",

      topExpenseCategories: "Top expense categories",
      topExpenseCategoriesDescription:
        "Categories with the highest money outflow.",

      budgetUsed: "Budget used",
      budgetUsedDescription: "Progress of the current monthly budget.",

      expensesByCategory: "Expenses by category",
      accountSummary: "Account summary",
    },

    empty: {
      noBudget: "Create a monthly budget to view this chart.",
      noMovements: "Register movements to view statistics.",
      noExpenses: "There are no expenses registered in this period yet.",
      noIncome: "There is no income registered in this period yet.",
      noIncomeExpenseChart: "There is no income or expense data to chart.",
      noBalanceTrend: "There is not enough balance data to show a trend.",
      noExpenseCategoriesChart: "There are no expenses by category to chart.",
    },

    labels: {
      income: "Income",
      expenses: "Expenses",
      others: "Others",
      top: "Top",
      balance: "Balance",
      used: "Used",
      spentAmount: "{{amount}} spent",
      limitAmount: "Limit: {{amount}}",
    },
  },

  reports: {
    export: {
      title: "Export report",
      description:
        "Download your accounts, movements, and transfers in CSV format.",
    },

    filters: {
      title: "Filters",
      description: "Adjust period, account, category, and currency.",
      panelDescription: "Adjust the period and data you want to analyze.",

      period: "Period",
      from: "From",
      to: "To",

      movementKind: "Movement type",

      allAccounts: "All accounts",
      allAccountsDescription: "Includes all active accounts.",

      allCategories: "All categories",
      allCategoriesDescription: "Do not filter by category.",

      mainCurrency: "Main currency",
      mainCurrencyDescription: "Use the main currency for the summary.",
    },

    periods: {
      current_month: {
        label: "Current month",
        description: "Movements from the current month.",
      },
      last_month: {
        label: "Last month",
        description: "Movements from last month.",
      },
      last_3_months: {
        label: "Last 3 months",
        description: "Movements from the last three months.",
      },
      last_6_months: {
        label: "Last 6 months",
        description: "Movements from the last six months.",
      },
      custom: {
        label: "Custom",
        description: "Choose a custom date range.",
      },
    },

    movementKinds: {
      all: {
        label: "All",
        description: "Income and expenses.",
      },
      income: {
        label: "Income",
        description: "Only money coming in.",
      },
      expense: {
        label: "Expenses",
        description: "Only money going out.",
      },
    },
  },

  settings: {
    title: "Settings",
    description: "Configure your experience, data, privacy, and plan.",

    appearance: "Appearance",
    theme: "Theme",
    currentTheme: "Current theme: {{theme}}",
    themeModes: {
      system: "System",
      dark: "Dark",
      light: "Light",
    },

    language: "Language",
    languageDescription: "Choose Orvian’s interface language.",
    languagePickerLabel: "Language",

    currentPlan: "Current plan",
    currentPlanDescription: "You are using the {{plan}} plan.",
    freePlanName: "Free",
    viewPlans: "View plans",

    shortcuts: "Shortcuts",
    viewBudgets: "View budgets",
    viewReminders: "View reminders",

    privacy: "Privacy",
    privacyDescription: "See how your data is handled inside Orvian.",
    privacyPolicy: "Privacy policy",
    openPrivacyPolicy: "View privacy policy",

    exportData: "Export data",
    exportDescription:
      "Generate files with your accounts, movements, and transfers.",
    exporting: "Exporting...",
    exportCsv: "Export CSV",
    exportExcel: "Export Excel",

    importData: "Import data",
    importDescription: "Load movements from a CSV file.",

    localData: "Local data",
    localDataDescription:
      "Your data is stored on this device. Later, you’ll be able to enable account sync.",
    viewOnboardingAgain: "View onboarding again",
    resetData: "Delete local data",

    about: "About Orvian",
    aboutDescription:
      "Orvian helps you organize your accounts, expenses, budgets, and personal reports.",
    app: "Application",
    version: "Version",
    developer: "Developer",
    visitDeveloperWebsite: "Visit developer website",

    linkErrorTitle: "Could not open the link",
    linkErrorDescription: "Your device cannot open this website right now.",
    privacyLinkErrorDescription:
      "Your device cannot open the privacy policy right now.",

    resetDataTitle: "Delete local data",
    resetDataDescription:
      "This will delete accounts, movements, transfers, reminders, and settings saved on this device.",
    resetDataConfirm: "Delete",

    exportErrorTitle: "Could not export",
    exportCsvErrorDescription:
      "An error occurred while generating the CSV file.",
    exportExcelErrorDescription:
      "An error occurred while generating the Excel file.",
  },

  onboarding: {
    welcome: {
      title: "Control your money from one place",
      description:
        "Register accounts, income, expenses, transfers, reminders, and financial plans from a local and private app.",
      balanceCardTitle: "Your balance starts here",
      income: "Income",
      expenses: "Expenses",
      start: "Start",
    },

    setup: {
      stepLabel: "Step {{step}} of {{total}}",
      title: "Set up your experience",
      description:
        "These answers personalize the app without forcing you to create an account.",
    },

    stepOne: {
      mainCurrency: "Main currency",
      calculateTotalNetWorth: "Calculate total net worth",
      calculateTotalNetWorthDescription:
        "Add banks, cash, crypto, and other accounts into one overall balance.",
      userType: "User type",

      personal: "Personal",
      personalDescription: "I want to manage my personal finances.",

      business: "Business",
      businessDescription:
        "I want to control income and expenses for a business.",
    },

    stepTwo: {
      cryptoUsage: "Cryptocurrency usage",
      noCrypto: "I don’t use crypto",
      noCryptoDescription: "I don’t need accounts like Binance or MetaMask.",
      useCrypto: "I use crypto",
      useCryptoDescription:
        "I want to register exchanges, wallets, or digital assets.",

      multiCurrencyUsage: "Multiple currency usage",
      singleCurrency: "Only one currency",
      singleCurrencyDescription: "I mainly manage one currency.",
      multipleCurrencies: "Multiple currencies",
      multipleCurrenciesDescription:
        "I manage accounts in different currencies.",
    },

    stepThree: {
      mainGoal: "Main goal",

      controlExpenses: "Control expenses",
      controlExpensesDescription: "I want to know where my money is going.",

      saveMoney: "Save more",
      saveMoneyDescription: "I want to separate money for goals and reserves.",

      organizeAccounts: "Organize accounts",
      organizeAccountsDescription:
        "I want to see banks, cash, cards, and debts in order.",

      activateFinancialReminders: "Enable financial reminders",
      activateFinancialRemindersDescription:
        "It will help you remember payments, collections, purchases, or savings.",

      viewPlans: "View plans",
    },
  },

  budgets: {
    title: "Budgets",
    description: "Set monthly limits to control your expenses.",

    allCategoriesAlreadyBudgeted:
      "You already added limits for all available categories.",
    budgetedCategories: "Budgeted categories",
    budgetOf: "Budget for {{period}}",
    currentSpendingVsBudget: "Current spending vs monthly budget.",
    spent: "Spent",
    limit: "Limit",
    limitedCategories: "Limited categories",
    spentOfLimit: "{{spent}} of {{limit}}",
    status: {
      exceeded: "You exceeded your monthly budget.",
      warning: "You are close to reaching your monthly budget.",
      safe: "Your spending is within budget.",
      exceededShort: "Budget exceeded",
      warningShort: "Close to the limit",
      safeShort: "Within budget",
    },

    currentEmptyTitle: "You do not have a budget this month",
    currentEmptyDescription: "Create a budget for {{period}}.",
    createMonthlyBudget: "Create monthly budget",
    historyTitle: "Budget history",
    generalLimitValue: "General limit: {{amount}} {{currency}}",
    modalDescription: "Set limits to control your monthly spending.",
    deleteBudget: "Delete budget",

    newBudget: "New budget",
    editBudget: "Edit budget",
    createBudget: "Create budget",
    saveBudget: "Save budget",

    monthLabel: "{{month}} {{year}}",

    generalMonthlyBudget: "General monthly budget",
    generalBudgetPlaceholder: "E.g. 500",

    categoryBudgetTitle: "Budget by category",
    categoryBudgetDescription:
      "Add limits only to the expense categories you want to control.",

    expenseCategory: "Expense category",
    monthlyLimit: "Monthly limit",
    monthlyLimitPlaceholder: "E.g. 120",

    addCategory: "Add category",
    removeCategory: "Remove category",

    budgetUsed: "Budget used",
    remainingBudget: "Remaining budget",
    exceededBudget: "Exceeded budget",

    emptyTitle: "You don’t have any budgets yet",
    emptyDescription:
      "Create a monthly budget to better control your expenses.",

    deleteTitle: "Delete budget",
    deleteDescription: "This budget and its category limits will be deleted.",

    errors: {
      generalRequired: "The general budget is required.",
      generalGreaterThanZero: "The general budget must be greater than 0.",
      categoryRequired: "Select a category.",
      categoryLimitRequired: "The monthly limit is required.",
      categoryLimitGreaterThanZero: "The monthly limit must be greater than 0.",
      duplicatedCategory: "This category already has an assigned budget.",
    },
  },

  reminders: {
    title: "Reminders",
    description: "Schedule payments, collections, purchases, or investments.",

    newReminder: "New reminder",
    editReminder: "Edit reminder",
    saveReminder: "Save reminder",
    deleteReminder: "Delete reminder",

    emptyTitle: "You don’t have any reminders yet",
    emptyDescription:
      "Create reminders for payments, collections, subscriptions, purchases, or savings.",

    complete: "Complete",

    createReminder: "Create reminder",
    completeTitle: "Complete reminder",
    completeDescription: "Do you want to mark this reminder as completed?",
    cancelTitle: "Cancel reminder",
    cancelDescription: "Do you want to cancel this reminder?",
    confirmCancel: "Yes, cancel",

    card: {
      defaultType: "Reminder",
    },

    form: {
      title: "Title",
      titlePlaceholder: "E.g. Pay internet bill",

      amountOptional: "Optional amount",
      amountPlaceholder: "0.00",

      type: "Type",
      frequency: "Frequency",

      date: "Date",
      time: "Time",

      relatedAccount: "Related account",

      descriptionOptional: "Optional description",
      descriptionPlaceholder: "E.g. due every 5th of the month...",

      futureDateRequired: "The date must be in the future.",

      titleRequired: "The title is required.",
      dateRequired: "The date is required.",
      timeRequired: "The time is required.",
      accountRequired: "Select an account.",
      amountInvalid: "The amount must be greater than or equal to 0.",
    },

    types: {
      payment: {
        label: "Payment",
        description: "Services, debts, card payments, or pending commitments.",
      },
      collection: {
        label: "Collection",
        description: "Money that someone needs to pay you.",
      },
      subscription: {
        label: "Subscription",
        description: "Netflix, Spotify, software, or other recurring payments.",
      },
      saving: {
        label: "Saving",
        description: "Reminder to set money aside.",
      },
      investment: {
        label: "Investment",
        description: "Recurring purchase of assets or crypto.",
      },
      purchase: {
        label: "Purchase",
        description: "Important planned purchase.",
      },
      custom: {
        label: "Custom",
        description: "Free financial reminder.",
      },
    },

    frequencies: {
      once: {
        label: "Once",
        description: "You will be notified only on the selected date.",
      },
      daily: {
        label: "Daily",
        description: "It will repeat every day.",
      },
      weekly: {
        label: "Weekly",
        description: "It will repeat every week.",
      },
      monthly: {
        label: "Monthly",
        description: "It will repeat every month.",
      },
    },

    deleteTitle: "Delete reminder",
    deleteDescription:
      "This reminder will no longer appear in your upcoming alerts.",
  },

  plans: {
    title: "Plans",
    description:
      "Choose the plan that best fits the way you organize your finances.",

    currentPlan: "Current plan",
    free: "Free",
    plus: "Plus",

    demoDescription:
      "Start for free and unlock advanced features when you need them.",
    monthlyPeriod: "per month",
    yearlyAvailable: "Also available for ${{price}} per year.",
    plusActive: "Plus active",
    activatePlusDemo: "Activate Plus demo",
    freeActive: "Free active",
    backToFree: "Back to free",

    freePlan: {
      name: "Free",
      description: "Ideal to start organizing your personal finances.",
      price: "$0",
      period: "Forever",
      cta: "Continue for free",
      current: "Current plan",
      features: {
        accountsLimit: "Up to 3 accounts",
        movementsLimit: "Up to 30 movements per month",
        basicStatistics: "Basic statistics",
        localData: "Data stored locally",
      },
    },

    plusPlan: {
      name: "Plus",
      description: "For users who want complete financial control.",
      price: "{{price}}",
      period: "per month",
      cta: "Activate Plus",
      features: {
        unlimitedAccounts: "Unlimited accounts",
        unlimitedMovements: "Unlimited movements",
        advancedStatistics: "Advanced statistics",
        budgets: "Monthly budgets",
        reminders: "Financial reminders",
        exportData: "Data export",
        priorityFeatures: "Access to advanced features",
      },
    },

    restorePurchase: "Restore purchase",
    continueWithoutPlus: "Continue without Plus",

    errors: {
      purchaseUnavailable: "The purchase is not available right now.",
      restoreUnavailable: "The purchase could not be restored right now.",
    },
  },
} as const;
