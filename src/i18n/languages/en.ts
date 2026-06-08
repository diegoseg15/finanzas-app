export const en = {
  common: {
    appName: "Orvian",
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
    commission: "Fee",
    noData: "No data",
    notAvailable: "Not available",
    no: "No",
    transfers: "Transfers",
    skip: "Skip",
    understood: "Got it"
  },
  tabs: {
    home: "Home",
    accounts: "Accounts",
    movements: "Movements",
    statistics: "Statistics",
    settings: "Settings",
    more: "More",
    budgets: "Budgets",
    loans: "Loans"
  },
  home: {
    totalEstimated: "Estimated total money",
    totalEstimatedBalance: "Estimated total balance",
    monthlyExpenses: "Monthly expenses",
    monthlyIncome: "Monthly income",
    monthlyBalance: "Monthly result",
    available: "Available",
    accounts: "Accounts",
    upcomingReminders: "Upcoming reminders",
    viewAll: "View all",
    noUpcomingReminders: "You have no upcoming reminders.",
    recentActivity: "Recent activity",
    noRegisteredMovements: "You have not registered any movements yet.",
    noActivity: "No activity yet.",
    viewAllAccounts: "View all",
    monthlySummary: "Monthly summary"
  },
  accounts: {
    title: "Accounts",
    description: "Register banks, cash, cryptocurrencies, cards, and loans.",
    newAccount: "New account",
    firstAccount: "Create first account",
    createTitle: "New account",
    editTitle: "Edit account",
    emptyTitle: "You do not have any accounts yet",
    emptyDescription: "Create your first account to start registering income, expenses, and transfers.",
    freePlanRemaining: "Free plan: {{count}} accounts available.",
    plusPlanUnlimited: "Plus plan: unlimited accounts.",
    limitTitle: "You reached the free account limit",
    limitDescription: "The free plan allows up to 3 accounts. Activate Plus to create unlimited accounts.",
    deleteTitle: "Delete account",
    deleteDescription: "This account will be hidden from the active list. Its historical movements will be kept.",
    saveAccount: "Save account",
    saveChanges: "Save changes",
    card: {
      customAccount: "Custom account",
      currentBalance: "Current balance",
      includedInTotal: "Included in estimated total",
      excludedFromTotal: "Excluded from estimated total",
      options: "Options"
    },
    form: {
      createTitle: "New account",
      editTitle: "Edit account",
      editDescription: "Update the main details of this account.",
      createDescription: "Set up the main details of this account.",
      name: "Account name",
      namePlaceholder: "E.g. Pichincha Bank",
      currentBalance: "Current balance",
      initialBalance: "Initial balance",
      balancePlaceholder: "0.00",
      balanceEditInfo: "The balance is updated by registering movements, not by editing the account.",
      type: "Account type",
      mainCurrency: "Main currency",
      currencyCrypto: "Cryptocurrency",
      currencyFiat: "Traditional currency",
      currencyCustom: "Custom",
      currencyEditInfo: "The main currency cannot be changed when editing, to avoid breaking the movement history.",
      includeInTotal: "Add to estimated total",
      includeInTotalDescription: "Turn this on if you want this account to be added to your total balance.",
      initialBalanceRequired: "The initial balance is required. Use 0 if it has no balance.",
      initialBalanceError: "The initial balance cannot be negative.",
      nameRequired: "The account name is required.",
      institutionName: "Bank or institution",
      institutionNamePlaceholder: "E.g. Chase, Binance, Metamask",
      pinAccount: "Pin as important",
      pinAccountDescription: "It will appear first on the accounts screen.",
      cardDesign: "Card design",
      cardDesignPlusOnly: "Available only with Plus.",
      steps: {
        0: {
          description: "First define the account identity."
        },
        1: {
          description: "Now set balance, currency, and importance."
        },
        2: {
          description: "Choose how this account card will look."
        }
      },
      cardDesignUpgradeMessage: "Upgrade to Plus to customize your card designs.",
      isSavingsTarget: "Account intended for saving",
      isSavingsTargetDescription: "Use it to separate money you do not want to spend."
    },
    types: {
      bank: {
        label: "Bank",
        description: "Traditional bank account."
      },
      cash: {
        label: "Cash",
        description: "Physical money available."
      },
      piggy_bank: {
        label: "Piggy bank",
        description: "Physical or separated savings for a goal."
      },
      crypto_exchange: {
        label: "Crypto platform",
        description: "Account in apps like Binance or other crypto platforms."
      },
      crypto_wallet: {
        label: "Crypto wallet",
        description: "Wallet like MetaMask or other apps for storing crypto."
      },
      credit_card: {
        label: "Credit card",
        description: "Card with debt or used credit limit."
      },
      loan_receivable: {
        label: "Loan to collect",
        description: "Money someone else owes you."
      },
      loan_payable: {
        label: "Loan to pay",
        description: "Money you need to pay back."
      },
      custom: {
        label: "Custom account",
        description: "Account type defined by the user."
      }
    },
    cardDesigns: {
      default: {
        label: "Standard",
        description: "Clean design for any account."
      },
      minimal: {
        label: "Minimal",
        description: "More subtle and discreet."
      },
      gradient: {
        label: "Gradient",
        description: "A more modern visual style."
      },
      blue: {
        label: "Brand blue",
        description: "Uses Orvian’s main blue accent."
      },
      dark: {
        label: "Dark",
        description: "Elegant style with a dark appearance."
      },
      premium: {
        label: "Premium",
        description: "A more exclusive design for featured accounts."
      }
    },
    groups: {
      regular: "Traditional",
      crypto: "Crypto"
    },
    summary: {
      regularTotal: "Traditional total",
      cryptoTotal: "Crypto total",
      accountCount: "{{count}} account"
    },
    emptyCryptoAccounts: "You do not have crypto accounts yet.",
    emptyRegularAccounts: "You do not have traditional accounts yet.",
    detail: {
      description: "Manage this account’s information and settings.",
      notFoundTitle: "Account not found",
      notFoundDescription: "This account no longer exists or was archived.",
      type: "Type",
      institution: "Institution",
      mainCurrency: "Main currency",
      archiveTitle: "Archive account",
      archiveDescription: "This account will no longer appear in your main list, but its data will be kept.",
      archiveAction: "Archive",
      settings: "Settings",
      recentMovements: "Recent movements",
      recentMovementsDescription: "Confirmed activity from the last 2 months.",
      noRecentMovements: "There are no recent movements in this account.",
      actions: "Actions",
      archive: "Archive account",
      edit: "Edit account",
      emptyActivity: "There are no recent movements in this account.",
      information: "Information",
      priority: "Priority",
      recentActivity: "Recent activity",
      totalEstimated: "Estimated total",
      normal: "Normal",
      pinned: "Pinned"
    }
  },
  movements: {
    title: "Movements",
    description: "Register income, expenses, and transfers between your accounts.",
    newMovement: "New movement",
    newTransfer: "New transfer",
    registerMovement: "Register movement",
    emptyTitle: "You do not have any movements yet",
    emptyDescription: "Register your first income, expense, or transfer to start building your financial history.",
    incomeExpense: "Income / Expense",
    income: "Income",
    expense: "Expense",
    transfer: "Transfer",
    freePlanRemaining: "Free plan: {{count}} movements available this month.",
    plusPlanUnlimited: "Plus plan: unlimited movements.",
    firstCreateAccountTitle: "Create an account first",
    firstCreateAccountDescription: "You need at least one active account to register income or expenses.",
    limitTitle: "You reached the free movement limit",
    limitDescription: "The free plan allows up to 30 movements per month. Activate Plus to register unlimited movements.",
    deleteMovementTitle: "Delete movement",
    deleteMovementDescription: "This action will reverse the balance affected by this movement.",
    deleteTransferTitle: "Delete transfer",
    deleteTransferDescription: "This action will reverse the balances affected by this transfer.",
    editMovement: "Edit movement",
    editTransfer: "Edit transfer",
    saveMovement: "Save movement",
    saveTransfer: "Save transfer",
    form: {
      account: "Account",
      category: "Category",
      amount: "Amount",
      tags: "Tags",
      note: "Note",
      notePlaceholder: "Optional note",
      selectedAccountNotFound: "The selected account does not exist.",
      insufficientBalance: "You don't have enough money in this account.",
      createDescription: "Register a confirmed income or expense.",
      amountRequired: "The amount must be greater than 0.",
      accountRequired: "Select an account.",
      categoryRequired: "Select a category.",
      allTagsSelected: "You have already selected all available tags.",
      accountCurrency: "Currency: {{currency}}"
    },
    card: {
      defaultTitle: "Movement",
      deletedAccount: "Deleted account"
    },
    transferCard: {
      fromAccountFallback: "Source account",
      toAccountFallback: "Destination account",
      sent: "Sent",
      received: "Received",
      fee: "Fee",
      exchangeRate: "Exchange used: 1 {{fromCurrency}} = {{exchangeRate}} {{toCurrency}}"
    },
    transferForm: {
      fromAccount: "Source account",
      toAccount: "Destination account",
      fromAmount: "Amount sent",
      toAmount: "Amount received",
      note: "Note",
      notePlaceholder: "E.g. transfer to savings",
      differentAccountsRequired: "Select different accounts.",
      description: "Move money between accounts and register fees or currency exchange.",
      fromAccountRequired: "Select a source account.",
      toAccountRequired: "Select a destination account.",
      fromAmountRequired: "The amount sent must be greater than 0.",
      toAmountRequired: "The amount received must be greater than 0.",
      feeInvalid: "The fee cannot be negative.",
      insufficientBalance: "You don't have enough money in the source account for this transfer.",
      multiCurrencyBlockedByPlan: "The free plan only allows transfers between accounts with the same currency.",
      fromAmountWithCurrency: "Amount sent {{currency}}",
      toAmountWithCurrency: "Amount received {{currency}}",
      feeAmountWithCurrency: "Fee {{currency}}",
      calculatedExchangeRate: "Calculated exchange rate",
      multiCurrencyPlusTitle: "Transfers between currencies are available in Plus",
      multiCurrencyPlusDescription: "In the free plan, you can transfer between accounts with the same currency. For transfers with currency exchange, activate Plus."
    },
    calculatorAmount: "Movement amount",
    transferAmount: "Amount to transfer",
    emptyFilterTitle: "No results",
    emptyFilterDescription: "Change the filter to see other movements.",
    newExpense: "New expense",
    newIncome: "New income"
  },
  statistics: {
    title: "Statistics",
    description: "Review your income, expenses, transfers, and categories.",
    filters: "Report filters",
    applyFilters: "Apply filters",
    clearFilters: "Clear filters",
    filtersDescription: "Adjust the period, account, category, and currency.",
    cards: {
      income: "Income",
      expenses: "Expenses",
      transfers: "Transfers",
      commissions: "Fees",
      periodBalance: "Period result"
    },
    charts: {
      incomeVsExpense: "Income vs expenses",
      incomeVsExpenseDescription: "Monthly comparison of money in and money out.",
      balanceEvolution: "Balance evolution",
      balanceEvolutionDescription: "Accumulated balance from recent months.",
      topExpenseCategories: "Top expense categories",
      topExpenseCategoriesDescription: "Categories with the highest money outflow.",
      budgetUsed: "Budget used",
      budgetUsedDescription: "Progress of the current monthly budget.",
      expensesByCategory: "Expenses by category",
      accountSummary: "Account summary"
    },
    empty: {
      noBudget: "Create a monthly budget to see this chart.",
      noMovements: "Register movements to view statistics.",
      noExpenses: "There are no expenses registered in this period yet.",
      noIncome: "There is no income registered in this period yet.",
      noIncomeExpenseChart: "There is no income or expense data to chart.",
      noBalanceTrend: "There is not enough balance data yet to show a trend.",
      noExpenseCategoriesChart: "There are no expenses by category to chart.",
      noFilterDataTitle: "No data for these filters",
      noFilterDataDescription: "Change the period or register movements to see statistics.",
      noExpensesForFilters: "There are no expenses for these filters."
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
      noCategory: "No category",
      balanceAmount: "Balance: {{amount}}"
    }
  },
  reports: {
    export: {
      title: "Export summary",
      description: "Download your accounts, income, expenses, and transfers in a file."
    },
    filters: {
      title: "Filters",
      panelDescription: "Adjust the period and the data you want to analyze.",
      period: "Period",
      account: "Account",
      category: "Category",
      currency: "Currency",
      from: "From",
      to: "To",
      movementKind: "Movement type"
    },
    periods: {
      current_month: {
        label: "Current month",
        description: "Movements from the current month."
      },
      last_month: {
        label: "Last month",
        description: "Movements from last month."
      },
      last_3_months: {
        label: "Last 3 months",
        description: "Movements from the last three months."
      },
      current_year: {
        label: "Current year",
        description: "Movements from the current year."
      },
      custom: {
        label: "Custom",
        description: "Choose a date range manually."
      }
    },
    movementKinds: {
      all: {
        label: "All",
        description: "Income and expenses."
      },
      income: {
        label: "Income",
        description: "Only money coming in."
      },
      expense: {
        label: "Expenses",
        description: "Only money going out."
      }
    },
    accounts: {
      all: {
        label: "All accounts",
        description: "Includes all active accounts."
      }
    },
    categories: {
      all: {
        label: "All categories",
        description: "Do not filter by category."
      }
    },
    currencies: {
      main: {
        label: "Main currency",
        description: "Use the main currency for the summary."
      }
    }
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
      light: "Light"
    },
    language: "Language",
    languageDescription: "Choose the language of the Orvian interface.",
    languagePickerLabel: "Language",
    currentPlan: "Current plan",
    currentPlanDescription: "You are using the {{plan}} plan.",
    freePlanName: "Free",
    viewPlans: "View plans",
    shortcuts: "Shortcuts",
    viewBudgets: "View budgets",
    viewReminders: "View reminders",
    privacy: "Privacy",
    privacyDescription: "Check how your data is handled inside Orvian.",
    privacyPolicy: "Privacy policy",
    openPrivacyPolicy: "View privacy policy",
    exportData: "Export data",
    exportDescription: "Generate files with your accounts, movements, and transfers.",
    exporting: "Exporting...",
    exportCsv: "Export CSV",
    exportExcel: "Export Excel",
    importData: "Import data",
    importDescription: "Load movements from a CSV file.",
    localData: "Local data",
    localDataDescription: "Your data is saved on this device. Account sync may be enabled later.",
    viewOnboardingAgain: "View introduction again",
    resetData: "Delete local data",
    about: "About Orvian",
    aboutDescription: "Orvian helps you organize your accounts, expenses, budgets, and personal reports.",
    app: "Application",
    version: "Version",
    developer: "Developer",
    visitDeveloperWebsite: "Visit developer website",
    linkErrorTitle: "Could not open the link",
    linkErrorDescription: "Your device cannot open this website right now.",
    privacyLinkErrorDescription: "Your device cannot open the privacy policy right now.",
    resetDataTitle: "Delete local data",
    resetDataDescription: "This will delete accounts, movements, transfers, reminders, and settings saved on this device.",
    resetDataConfirm: "Delete",
    exportErrorTitle: "Could not export",
    exportCsvErrorDescription: "An error occurred while generating the CSV file.",
    exportExcelErrorDescription: "An error occurred while generating the Excel file.",
    mainCurrency: "Main currency"
  },
  onboarding: {
    welcome: {
      title: "Control your money from one place",
      description: "Register accounts, income, expenses, transfers, reminders, and financial plans from a local and private app.",
      balanceCardTitle: "Your balance starts here",
      income: "Income",
      expenses: "Expenses",
      start: "Start"
    },
    setup: {
      stepLabel: "Step {{step}} of {{total}}",
      title: "Set up your experience",
      description: "These answers personalize the app without forcing you to create an account."
    },
    stepOne: {
      mainCurrency: "Main currency",
      calculateTotalNetWorth: "Calculate all my money",
      calculateTotalNetWorthDescription: "Add banks, cash, crypto, and other accounts into one overall balance.",
      userType: "User type"
    },
    stepTwo: {
      cryptoUsage: "Cryptocurrency use",
      multiCurrencyUsage: "Multiple currency use"
    },
    stepThree: {
      mainGoal: "Main goal",
      activateFinancialReminders: "Activate financial reminders",
      activateFinancialRemindersDescription: "This will help you remember payments, collections, purchases, or savings.",
      viewPlans: "View plans"
    },
    options: {
      userProfile: {
        personal: {
          label: "Personal",
          description: "I want to manage my personal finances."
        },
        freelancer: {
          label: "Professional",
          description: "I earn income from projects or clients."
        },
        entrepreneur: {
          label: "Entrepreneur",
          description: "I manage money for a business or venture."
        },
        investor: {
          label: "Investor",
          description: "I want to track assets, crypto, or investments."
        },
        student: {
          label: "Student",
          description: "I want to organize expenses and savings."
        }
      },
      cryptoUsage: {
        none: {
          label: "I do not use crypto",
          description: "I do not need accounts like Binance or MetaMask."
        },
        basic: {
          label: "Yes, I use crypto",
          description: "I want to register exchanges, wallets, or digital assets."
        },
        advanced: {
          label: "I use crypto, but it is not a priority",
          description: "I want to register crypto, but it is not the most important thing for me."
        }
      },
      multiCurrencyUsage: {
        none: {
          label: "I use one currency",
          description: "I mainly manage my money in one currency."
        },
        occasional: {
          label: "Sometimes",
          description: "I occasionally use accounts in different currencies."
        },
        frequent: {
          label: "Frequently",
          description: "I frequently use accounts in multiple currencies."
        }
      },
      financialGoal: {
        control_expenses: {
          label: "Control expenses",
          description: "I want to know where my money goes."
        },
        save_more: {
          label: "Save more",
          description: "I want to set money aside for goals and reserves."
        },
        pay_debts: {
          label: "Pay debts",
          description: "I want to organize my debts and pending payments."
        },
        track_income: {
          label: "Track my income",
          description: "I want to have clear control of my income sources."
        },
        understand_investments: {
          label: "Understand my investments",
          description: "I want to better track my assets, crypto, or investments."
        },
        avoid_small_expenses: {
          label: "Avoid small daily expenses",
          description: "I want to identify and control small daily expenses."
        }
      }
    },
    plans: {
      title: "Choose how you want to start",
      description: "You can use the app for free and activate advanced features later.",
      continueWithPlus: "Continue with Plus"
    },
    v2: {
      control: {
        title: "Control your money without overcomplicating it",
        description: "Organize accounts, balances, and movements from one place."
      },
      movements: {
        title: "Track expenses and income in seconds",
        description: "Use a fast calculator-style form to register your money with less effort."
      },
      reminders: {
        title: "Do not forget payments or collections",
        description: "Create reminders for payments, collections, and recurring commitments."
      },
      clarity: {
        title: "See your finances clearly",
        description: "Understand your balances, movements, and upcoming commitments from one simple app."
      },
      currency: {
        title: "Choose your main currency",
        description: "We will use this currency to show your totals, reports, and main balances."
      },
      start: "Start now",
      welcome: {
        title: "Welcome to Orvian",
        description: "A clearer and simpler way to manage your money, accounts, and upcoming commitments."
      },
      accounts: {
        title: "Your accounts, better organized",
        description: "Create accounts, track balances, and customize cards to see your money clearly."
      },
      analytics: {
        title: "Understand your finances at a glance",
        description: "See trends, expenses, and income with simple charts to make better decisions."
      },
      plans: {
        title: "Start free, upgrade when you need it",
        description: "Use Orvian for free or unlock Plus Lifetime with local premium features."
      },
      continueWithPlus: "Continue with Plus",
      continueFree: "Continue for free"
    }
  },
  budgets: {
    title: "Budgets",
    description: "Set monthly limits to control your expenses.",
    allCategoriesAlreadyBudgeted: "You have already added limits for all available categories.",
    budgetedCategories: "Categories with limits",
    budgetOf: "Budget for {{period}}",
    currentSpendingVsBudget: "Current spending compared to your monthly limit.",
    spent: "Spent",
    limit: "Limit",
    limitedCategories: "Limited categories",
    spentOfLimit: "{{spent}} of {{limit}}",
    currentEmptyTitle: "You do not have a budget this month",
    currentEmptyDescription: "Create a budget for {{period}}.",
    createMonthlyBudget: "Create monthly budget",
    historyTitle: "Budget history",
    generalLimitValue: "General limit: {{amount}} {{currency}}",
    modalDescription: "Set limits to control your monthly expenses.",
    status: {
      exceeded: "You exceeded your monthly budget.",
      warning: "You are close to reaching your monthly budget.",
      safe: "Your spending is within budget.",
      used: "Used",
      spentAmount: "{{amount}} spent",
      limitAmount: "Limit: {{amount}}"
    },
    newBudget: "New budget",
    editBudget: "Edit budget",
    createBudget: "Create budget",
    saveBudget: "Save budget",
    deleteBudget: "Delete budget",
    monthLabel: "{{month}} {{year}}",
    generalMonthlyBudget: "General monthly budget",
    generalBudgetPlaceholder: "E.g. 500",
    categoryBudgetTitle: "Budget by category",
    categoryBudgetDescription: "Add limits only to the expense categories you want to control.",
    expenseCategory: "Expense category",
    monthlyLimit: "Monthly limit",
    monthlyLimitPlaceholder: "E.g. 120",
    addCategory: "Add category",
    removeCategory: "Remove category",
    budgetUsed: "Budget used",
    remainingBudget: "Remaining budget",
    exceededBudget: "Exceeded budget",
    emptyTitle: "You do not have any budgets yet",
    emptyDescription: "Create a monthly budget to better control your expenses.",
    deleteTitle: "Delete budget",
    deleteDescription: "This budget and its category limits will be deleted.",
    errors: {
      generalRequired: "The general budget is required.",
      generalGreaterThanZero: "The general budget must be greater than 0.",
      categoryRequired: "Select a category.",
      categoryLimitRequired: "The monthly limit is required.",
      categoryLimitGreaterThanZero: "The monthly limit must be greater than 0.",
      duplicatedCategory: "This category already has an assigned budget."
    }
  },
  reminders: {
    title: "Reminders",
    description: "Schedule payments, collections, purchases, or investments.",
    newReminder: "New reminder",
    saveReminder: "Save reminder",
    createReminder: "Create reminder",
    completeTitle: "Complete reminder",
    completeDescription: "Do you want to mark this reminder as completed?",
    cancelTitle: "Cancel reminder",
    cancelDescription: "Do you want to cancel this reminder?",
    confirmCancel: "Yes, cancel",
    emptyTitle: "You do not have any reminders yet",
    emptyDescription: "Create reminders for payments, collections, subscriptions, purchases, or savings.",
    complete: "Complete",
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
      titleRequired: "The title is required.",
      amountInvalid: "The amount must be greater than or equal to 0.",
      futureDateRequired: "The date must be in the future."
    },
    card: {
      defaultType: "Reminder"
    },
    types: {
      payment: {
        label: "Payment",
        description: "Services, debts, card, or commitments to pay."
      },
      collection: {
        label: "Collection",
        description: "Money that someone needs to pay you."
      },
      subscription: {
        label: "Subscription",
        description: "Netflix, Spotify, software, or other recurring payments."
      },
      saving: {
        label: "Saving",
        description: "Reminder to set money aside."
      },
      investment: {
        label: "Investment",
        description: "Recurring purchase of assets or crypto."
      },
      purchase: {
        label: "Purchase",
        description: "Important planned purchase."
      },
      custom: {
        label: "Custom",
        description: "Custom financial reminder."
      }
    },
    frequencies: {
      once: {
        label: "Once",
        description: "You will be notified only on the selected date."
      },
      daily: {
        label: "Daily",
        description: "It will repeat every day."
      },
      weekly: {
        label: "Weekly",
        description: "It will repeat every week."
      },
      monthly: {
        label: "Monthly",
        description: "It will repeat every month."
      }
    }
  },
  plans: {
    title: "Plans",
    description: "Choose the plan that best fits the way you organize your finances.",
    currentPlan: "Current plan",
    free: "Free",
    plus: "Plus",
    demoDescription: "Start for free and activate advanced features when you need them.",
    monthlyPeriod: "per month",
    yearlyAvailable: "Also available for ${{price}} per year.",
    plusActive: "Plus active",
    activatePlusDemo: "Activate Plus demo",
    freeActive: "Free active",
    backToFree: "Back to free",
    freePlan: {
      name: "Free",
      description: "Ideal for starting to organize your personal finances.",
      price: "$0",
      period: "Forever",
      cta: "Continue for free",
      current: "Current plan",
      features: {
        accountsLimit: "Up to 3 accounts",
        movementsLimit: "Up to 30 movements per month",
        basicStatistics: "Basic statistics",
        localData: "Data saved locally",
        accounts: "Up to 3 accounts",
        movements: "Unlimited movements",
        basicReminders: "Basic reminders",
        basicMovements: "Basic movement tracking"
      }
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
        priorityFeatures: "Access to advanced features"
      }
    },
    restorePurchase: "Restore purchase",
    continueWithoutPlus: "Continue without Plus",
    errors: {
      purchaseUnavailable: "Purchase is not available right now.",
      restoreUnavailable: "Could not restore the purchase right now."
    },
    v2: {
      title: "Choose how to grow with Orvian",
      description: "Start for free and unlock premium features when you need them.",
      oneTimePayment: "One-time payment",
      unlockPlus: "Unlock Plus",
      plusActive: "Plus active",
      buyPack: "Buy pack",
      included: "Included",
      includedWithPlus: "Included with Plus",
      cardDesigns: {
        title: "Card designs",
        description: "Buy individual packs or unlock them with Plus."
      },
      legacy: {
        title: "Early user benefit",
        description: "Thanks for trying Orvian before the public launch.",
        benefit: "You will get temporary Plus access and a special discount to keep Plus Lifetime.",
        temporaryUntil: "Estimated temporary access until: {{date}}",
        shortBenefit: "Special discount for trying Orvian before launch."
      },
      pro: {
        title: "Coming soon: Orvian Pro",
        description: "Financial AI, cloud sync, backups, and multi-device access will be part of a separate monthly plan."
      },
      freePrice: "$0 · To get started",
      plusPrice: "$4.99 · One-time payment",
      legacyPrice: "$2.99 · Early user price"
    },
    products: {
      plusLifetime: {
        description: "Unlock local premium features with a one-time payment.",
        name: "Plus Lifetime",
        features: {
          unlimitedAccounts: "Unlimited accounts",
          unlimitedReminders: "Unlimited reminders",
          cardDesigns: "Premium card designs"
        }
      },
      cardPacks: {
        dark: {
          description: "Dark and elegant designs for your accounts."
        },
        luxury: {
          description: "Exclusive designs for a more premium-looking app."
        },
        crypto: {
          description: "Designs inspired by digital assets and wallets."
        },
        minimal: {
          description: "Clean and minimal designs for personal accounts."
        }
      }
    }
  },
  categories: {
    salary: "Salary",
    freelance: "Project / Freelance",
    sales: "Sales",
    business_income: "Business",
    investment_income: "Investment",
    gift_income: "Gift / Extra",
    refund: "Refund",
    loan_received: "Loan received",
    rental_income: "Rental income",
    other_income: "Other income",
    food: "Food",
    groceries: "Groceries",
    restaurants: "Restaurants",
    transport: "Transport",
    fuel: "Fuel",
    taxi_rideshare: "Taxi / Apps",
    housing: "Housing",
    rent: "Rent",
    services: "Services",
    electricity: "Electricity",
    water: "Water",
    internet_phone: "Internet / Phone",
    health: "Health",
    medicine: "Medicine",
    education: "Education",
    entertainment: "Entertainment",
    subscriptions: "Subscriptions",
    technology: "Technology",
    clothing: "Clothing",
    personal_care: "Personal care",
    family: "Family",
    pets: "Pets",
    travel: "Travel",
    gifts: "Gifts",
    taxes: "Taxes",
    fees: "Fees",
    debt_payment: "Debt payment",
    savings: "Savings",
    investment_expense: "Investment",
    cash_withdrawal: "Cash withdrawal",
    other: "Other"
  },
  tags: {
    essential: "Essential",
    optional: "Optional",
    urgent: "Urgent",
    recurring: "Recurring",
    planned: "Planned",
    unplanned: "Unplanned",
    cash: "Cash",
    card: "Card",
    transfer: "Transfer",
    online: "Online",
    subscription: "Subscription",
    work: "Work",
    personal: "Personal",
    family: "Family",
    business: "Business",
    tax: "Tax",
    invoice: "Invoice",
    debt: "Debt",
    savings: "Savings",
    small_expense: "Small daily expense"
  },
  loans: {
    newLoan: "New loan",
    form: {
      description: "Track money you need to pay or collect.",
      title: "Title",
      titlePlaceholder: "E.g. Personal loan",
      titleRequired: "The title is required.",
      personOrEntity: "Person or entity",
      personOrEntityPlaceholder: "E.g. John, bank, relative",
      payable: "I need to pay",
      receivable: "They need to pay me",
      payableDescription: "Money you owe.",
      receivableDescription: "Money owed to you.",
      amount: "Amount",
      amountPlaceholder: "0.00",
      amountRequired: "The amount is required.",
      amountError: "Enter an amount greater than 0.",
      currency: "Currency",
      notes: "Notes",
      notesPlaceholder: "Optional loan details",
      createTitle: "Create loan"
    },
    payment: {
      remainingAmount: "Remaining: {{amount}}",
      amount: "Amount",
      amountPlaceholder: "0.00",
      amountRequired: "The amount is required.",
      amountError: "Enter an amount greater than 0 and less than or equal to {{amount}}.",
      note: "Note",
      notePlaceholder: "Optional payment or collection detail",
      pay: "Pay"
    }
  },
  transfers: {
    form: {
      fromAccountRequired: "Select the source account.",
      toAccountRequired: "Select the destination account.",
      sameAccountError: "Source and destination accounts must be different.",
      exchangeRatePending: "For now, a 1:1 rate will be used. Advanced exchange will be added later.",
      fromAccount: "Source account",
      toAccount: "Destination account",
      feeAmount: "Fee"
    }
  },
  guides: {
    homeOverview: {
      title: "Your financial overview starts here",
      description: "Check your total balance, main accounts, and recent movements from this screen."
    },
    movementQuickAdd: {
      title: "Register money with the + button",
      description: "Use the center button in the bottom bar to quickly create expenses, income, or transfers."
    },
    homeTour: {
      totalBalance: "Here you can see the estimated total balance of your accounts.",
      accounts: "These are your main accounts. Tap one to see its details.",
      monthlySummary: "Here you can see this month’s income, expenses, and balance summary.",
      recentActivity: "Your most recent movements and transfers appear here."
    },
    statisticsTour: {
      filters: "Use this button to filter your statistics by date, account, category, currency, or movement type.",
      summary: "Here you see a period summary: income, expenses, transfers, fees, and balance.",
      incomeVsExpense: "This chart compares monthly income and expenses so you can see if you are spending more than you earn.",
      balanceEvolution: "Here you can see how your balance changes over time and whether your financial trend is improving or worsening.",
      topCategories: "This chart shows your biggest expense categories so you can understand where your money goes.",
      budgetUsed: "If you have an active budget, here you can see how much you have used and whether you are close to the limit.",
      expensesByCategory: "This list ranks your expenses by category with percentage and amount so you can spot priorities.",
      accountSummary: "Here you compare income, expenses, and balance by account to see which account has the most activity.",
      chartsPanel: "These charts help you compare income, expenses, balance evolution, top categories, and budget usage."
    }
  }
} as const;
