export const zh = {
  common: {
    appName: "Orvian",
    cancel: "取消",
    save: "保存",
    edit: "编辑",
    delete: "删除",
    close: "关闭",
    continue: "继续",
    back: "返回",
    next: "下一步",
    confirm: "确认",
    apply: "应用",
    clear: "清除",
    add: "添加",
    create: "创建",
    update: "更新",
    remove: "移除",
    search: "搜索",
    select: "选择",
    loading: "加载中...",
    saving: "保存中...",
    exporting: "导出中...",
    error: "错误",
    success: "完成",
    required: "必填",
    optional: "可选",
    amount: "金额",
    date: "日期",
    time: "时间",
    title: "标题",
    description: "描述",
    note: "备注",
    category: "类别",
    currency: "货币",
    account: "账户",
    type: "类型",
    frequency: "频率",
    freePlan: "免费计划",
    plusPlan: "Plus 计划",
    month: "月份",
    monthly: "每月",
    total: "总计",
    balance: "余额",
    income: "收入",
    expense: "支出",
    transfer: "转账",
    commission: "手续费",
    noData: "暂无数据",
    notAvailable: "不可用",
    no: "否",
    transfers: "转账",
    skip: "跳过",
    understood: "知道了"
  },
  tabs: {
    home: "首页",
    accounts: "账户",
    movements: "记录",
    statistics: "统计",
    settings: "设置",
    more: "更多",
    budgets: "预算",
    loans: "贷款"
  },
  home: {
    totalEstimated: "预估总金额",
    totalEstimatedBalance: "预估总余额",
    monthlyExpenses: "本月支出",
    monthlyIncome: "本月收入",
    monthlyBalance: "本月结果",
    available: "可用",
    accounts: "账户",
    upcomingReminders: "即将到来的提醒",
    viewAll: "查看全部",
    noUpcomingReminders: "你没有即将到来的提醒。",
    recentActivity: "最近活动",
    noRegisteredMovements: "你还没有记录任何交易。",
    noActivity: "暂无活动。",
    viewAllAccounts: "查看全部",
    monthlySummary: "月度摘要"
  },
  accounts: {
    title: "账户",
    description: "记录银行、现金、加密货币、银行卡和贷款。",
    newAccount: "新账户",
    firstAccount: "创建第一个账户",
    createTitle: "新账户",
    editTitle: "编辑账户",
    emptyTitle: "你还没有账户",
    emptyDescription: "创建你的第一个账户，开始记录收入、支出和转账。",
    freePlanRemaining: "免费计划：还可创建 {{count}} 个账户。",
    plusPlanUnlimited: "Plus 计划：账户数量不限。",
    limitTitle: "你已达到免费账户上限",
    limitDescription: "免费计划最多允许创建 3 个账户。激活 Plus 即可创建无限账户。",
    deleteTitle: "删除账户",
    deleteDescription: "此账户将从活跃列表中隐藏，其历史记录会被保留。",
    saveAccount: "保存账户",
    saveChanges: "保存更改",
    card: {
      customAccount: "自定义账户",
      currentBalance: "当前余额",
      includedInTotal: "已计入预估总额",
      excludedFromTotal: "未计入预估总额",
      options: "选项"
    },
    form: {
      createTitle: "新账户",
      editTitle: "编辑账户",
      editDescription: "更新此账户的主要信息。",
      createDescription: "设置此账户的主要信息。",
      name: "账户名称",
      namePlaceholder: "例如：Pichincha 银行",
      currentBalance: "当前余额",
      initialBalance: "初始余额",
      balancePlaceholder: "0.00",
      balanceEditInfo: "余额会通过记录交易来更新，而不是通过编辑账户来更新。",
      type: "账户类型",
      mainCurrency: "主要货币",
      currencyCrypto: "加密货币",
      currencyFiat: "传统货币",
      currencyCustom: "自定义",
      currencyEditInfo: "编辑时不能更改主要货币，以避免影响交易历史。",
      includeInTotal: "加入预估总额",
      includeInTotalDescription: "如果你希望此账户计入总余额，请开启此选项。",
      initialBalanceRequired: "初始余额为必填项。如果没有余额，请输入 0。",
      initialBalanceError: "初始余额不能为负数。",
      nameRequired: "账户名称为必填项。",
      institutionName: "银行或机构",
      institutionNamePlaceholder: "例如：银行、Binance、Metamask",
      pinAccount: "固定为重要",
      pinAccountDescription: "它会优先显示在账户页面。",
      cardDesign: "卡片设计",
      cardDesignPlusOnly: "仅 Plus 可用。",
      steps: {
        0: {
          description: "首先定义账户信息。"
        },
        1: {
          description: "现在设置余额、货币和重要性。"
        },
        2: {
          description: "选择此账户卡片的外观。"
        }
      },
      cardDesignUpgradeMessage: "升级到 Plus 以自定义卡片设计。",
      isSavingsTarget: "用于储蓄的账户",
      isSavingsTargetDescription: "用于分开你不想花掉的钱。"
    },
    types: {
      bank: {
        label: "银行",
        description: "传统银行账户。"
      },
      cash: {
        label: "现金",
        description: "可用的实体现金。"
      },
      piggy_bank: {
        label: "储蓄罐",
        description: "为某个目标单独存放的现金或储蓄。"
      },
      crypto_exchange: {
        label: "加密货币平台",
        description: "Binance 等应用或其他加密货币平台中的账户。"
      },
      crypto_wallet: {
        label: "加密钱包",
        description: "MetaMask 等用于存储加密货币的钱包或应用。"
      },
      credit_card: {
        label: "信用卡",
        description: "有欠款或已使用信用额度的卡。"
      },
      loan_receivable: {
        label: "应收借款",
        description: "别人欠你的钱。"
      },
      loan_payable: {
        label: "应还借款",
        description: "你需要偿还的钱。"
      },
      custom: {
        label: "自定义账户",
        description: "用户自定义的账户类型。"
      }
    },
    cardDesigns: {
      default: {
        label: "标准",
        description: "适用于任何账户的简洁设计。"
      },
      minimal: {
        label: "极简",
        description: "更加低调简洁。"
      },
      gradient: {
        label: "渐变",
        description: "更现代的视觉风格。"
      },
      blue: {
        label: "品牌蓝",
        description: "使用 Orvian 的主蓝色。"
      },
      dark: {
        label: "深色",
        description: "带有深色外观的优雅风格。"
      },
      premium: {
        label: "高级",
        description: "适用于重点账户的更高级设计。"
      }
    },
    groups: {
      regular: "传统",
      crypto: "加密货币"
    },
    summary: {
      regularTotal: "传统账户总额",
      cryptoTotal: "加密货币总额",
      accountCount: "{{count}} 个账户"
    },
    emptyCryptoAccounts: "你还没有加密货币账户。",
    emptyRegularAccounts: "你还没有传统账户。",
    detail: {
      description: "管理此账户的信息和设置。",
      notFoundTitle: "未找到账户",
      notFoundDescription: "此账户已不存在或已归档。",
      type: "类型",
      institution: "机构",
      mainCurrency: "主货币",
      archiveTitle: "归档账户",
      archiveDescription: "此账户将不再显示在主列表中，但其数据会保留。",
      archiveAction: "归档",
      settings: "设置",
      recentMovements: "最近交易",
      recentMovementsDescription: "过去 2 个月的已确认活动。",
      noRecentMovements: "此账户没有最近交易。",
      actions: "操作",
      archive: "归档账户",
      edit: "编辑账户",
      emptyActivity: "此账户没有最近交易。",
      information: "信息",
      priority: "优先级",
      recentActivity: "最近活动",
      totalEstimated: "估算总额",
      normal: "普通",
      pinned: "已固定"
    }
  },
  movements: {
    title: "记录",
    description: "记录账户之间的收入、支出和转账。",
    newMovement: "新记录",
    newTransfer: "新转账",
    registerMovement: "记录交易",
    emptyTitle: "你还没有任何记录",
    emptyDescription: "记录你的第一笔收入、支出或转账，开始建立你的财务历史。",
    incomeExpense: "收入 / 支出",
    income: "收入",
    expense: "支出",
    transfer: "转账",
    freePlanRemaining: "免费计划：本月还可记录 {{count}} 笔交易。",
    plusPlanUnlimited: "Plus 计划：交易记录不限。",
    firstCreateAccountTitle: "请先创建一个账户",
    firstCreateAccountDescription: "你至少需要一个活跃账户才能记录收入或支出。",
    limitTitle: "你已达到免费交易记录上限",
    limitDescription: "免费计划每月最多允许记录 30 笔交易。激活 Plus 即可记录无限交易。",
    deleteMovementTitle: "删除记录",
    deleteMovementDescription: "此操作会撤销该记录对余额造成的影响。",
    deleteTransferTitle: "删除转账",
    deleteTransferDescription: "此操作会撤销该转账对相关余额造成的影响。",
    editMovement: "编辑记录",
    editTransfer: "编辑转账",
    saveMovement: "保存记录",
    saveTransfer: "保存转账",
    form: {
      account: "账户",
      category: "类别",
      amount: "金额",
      tags: "标签",
      note: "备注",
      notePlaceholder: "可选备注",
      selectedAccountNotFound: "所选账户不存在。",
      insufficientBalance: "此账户余额不足。",
      createDescription: "记录一笔已确认的收入或支出。",
      amountRequired: "金额必须大于 0。",
      accountRequired: "请选择一个账户。",
      categoryRequired: "请选择一个类别。",
      allTagsSelected: "你已经选择了所有可用标签。",
      accountCurrency: "货币：{{currency}}"
    },
    card: {
      defaultTitle: "记录",
      deletedAccount: "已删除账户"
    },
    transferCard: {
      fromAccountFallback: "来源账户",
      toAccountFallback: "目标账户",
      sent: "已发送",
      received: "已收到",
      fee: "手续费",
      exchangeRate: "使用汇率：1 {{fromCurrency}} = {{exchangeRate}} {{toCurrency}}"
    },
    transferForm: {
      fromAccount: "来源账户",
      toAccount: "目标账户",
      fromAmount: "发送金额",
      toAmount: "收到金额",
      note: "备注",
      notePlaceholder: "例如：转入储蓄账户",
      differentAccountsRequired: "请选择不同的账户。",
      description: "在账户之间转移资金，并记录手续费或货币兑换。",
      fromAccountRequired: "请选择来源账户。",
      toAccountRequired: "请选择目标账户。",
      fromAmountRequired: "发送金额必须大于 0。",
      toAmountRequired: "收到金额必须大于 0。",
      feeInvalid: "手续费不能为负数。",
      insufficientBalance: "源账户余额不足，无法完成此转账。",
      multiCurrencyBlockedByPlan: "免费计划只允许在相同货币的账户之间转账。",
      fromAmountWithCurrency: "发送金额 {{currency}}",
      toAmountWithCurrency: "收到金额 {{currency}}",
      feeAmountWithCurrency: "手续费 {{currency}}",
      calculatedExchangeRate: "计算后的汇率",
      multiCurrencyPlusTitle: "跨货币转账可在 Plus 中使用",
      multiCurrencyPlusDescription: "在免费计划中，你可以在相同货币的账户之间转账。如需进行带货币兑换的转账，请激活 Plus。"
    },
    calculatorAmount: "交易金额",
    transferAmount: "转账金额",
    emptyFilterTitle: "没有结果",
    emptyFilterDescription: "更改筛选条件以查看其他交易。",
    newExpense: "新增支出",
    newIncome: "新增收入"
  },
  statistics: {
    title: "统计",
    description: "查看你的收入、支出、转账和类别。",
    filters: "报表筛选器",
    applyFilters: "应用筛选器",
    clearFilters: "清除筛选器",
    filtersDescription: "调整期间、账户、类别和货币。",
    cards: {
      income: "收入",
      expenses: "支出",
      transfers: "转账",
      commissions: "手续费",
      periodBalance: "期间结果"
    },
    charts: {
      incomeVsExpense: "收入 vs 支出",
      incomeVsExpenseDescription: "按月比较流入和流出的资金。",
      balanceEvolution: "余额变化",
      balanceEvolutionDescription: "最近几个月的累计余额。",
      topExpenseCategories: "主要支出类别",
      topExpenseCategoriesDescription: "资金流出最多的类别。",
      budgetUsed: "已使用预算",
      budgetUsedDescription: "当前月度预算的使用进度。",
      expensesByCategory: "按类别查看支出",
      accountSummary: "账户摘要"
    },
    empty: {
      noBudget: "创建月度预算后即可查看此图表。",
      noMovements: "记录交易后即可查看统计。",
      noExpenses: "此期间还没有记录支出。",
      noIncome: "此期间还没有记录收入。",
      noIncomeExpenseChart: "没有可用于图表的收入或支出数据。",
      noBalanceTrend: "余额数据还不足以显示趋势。",
      noExpenseCategoriesChart: "没有可用于图表的分类支出数据。",
      noFilterDataTitle: "这些筛选条件下没有数据",
      noFilterDataDescription: "更改期间或记录交易以查看统计。",
      noExpensesForFilters: "这些筛选条件下没有支出。"
    },
    labels: {
      income: "收入",
      expenses: "支出",
      others: "其他",
      top: "最高",
      balance: "余额",
      used: "已使用",
      spentAmount: "已花费 {{amount}}",
      limitAmount: "限额：{{amount}}",
      noCategory: "无类别",
      balanceAmount: "余额：{{amount}}"
    }
  },
  reports: {
    export: {
      title: "导出摘要",
      description: "将你的账户、收入、支出和转账下载为文件。"
    },
    filters: {
      title: "筛选器",
      panelDescription: "调整你想分析的期间和数据。",
      period: "期间",
      account: "账户",
      category: "类别",
      currency: "货币",
      from: "从",
      to: "到",
      movementKind: "记录类型"
    },
    periods: {
      current_month: {
        label: "本月",
        description: "本月的交易记录。"
      },
      last_month: {
        label: "上个月",
        description: "上个月的交易记录。"
      },
      last_3_months: {
        label: "最近 3 个月",
        description: "最近三个月的交易记录。"
      },
      current_year: {
        label: "今年",
        description: "今年的交易记录。"
      },
      custom: {
        label: "自定义",
        description: "手动选择日期范围。"
      }
    },
    movementKinds: {
      all: {
        label: "全部",
        description: "收入和支出。"
      },
      income: {
        label: "收入",
        description: "仅显示流入的钱。"
      },
      expense: {
        label: "支出",
        description: "仅显示流出的钱。"
      }
    },
    accounts: {
      all: {
        label: "所有账户",
        description: "包含所有活跃账户。"
      }
    },
    categories: {
      all: {
        label: "所有类别",
        description: "不按类别筛选。"
      }
    },
    currencies: {
      main: {
        label: "主要货币",
        description: "在摘要中使用主要货币。"
      }
    }
  },
  settings: {
    title: "设置",
    description: "配置你的体验、数据、隐私和计划。",
    appearance: "外观",
    theme: "主题",
    currentTheme: "当前主题：{{theme}}",
    themeModes: {
      system: "跟随系统",
      dark: "深色",
      light: "浅色"
    },
    language: "语言",
    languageDescription: "选择 Orvian 界面语言。",
    languagePickerLabel: "语言",
    currentPlan: "当前计划",
    currentPlanDescription: "你正在使用 {{plan}} 计划。",
    freePlanName: "免费",
    viewPlans: "查看计划",
    shortcuts: "快捷入口",
    viewBudgets: "查看预算",
    viewReminders: "查看提醒",
    privacy: "隐私",
    privacyDescription: "查看你的数据在 Orvian 中如何处理。",
    privacyPolicy: "隐私政策",
    openPrivacyPolicy: "查看隐私政策",
    exportData: "导出数据",
    exportDescription: "生成包含账户、交易和转账的文件。",
    exporting: "导出中...",
    exportCsv: "导出 CSV",
    exportExcel: "导出 Excel",
    importData: "导入数据",
    importDescription: "从 CSV 文件加载交易记录。",
    localData: "本地数据",
    localDataDescription: "你的数据保存在此设备上。账户同步功能可能会在之后启用。",
    viewOnboardingAgain: "再次查看介绍",
    resetData: "删除本地数据",
    about: "关于 Orvian",
    aboutDescription: "Orvian 帮助你整理账户、支出、预算和个人摘要。",
    app: "应用",
    version: "版本",
    developer: "开发者",
    visitDeveloperWebsite: "访问开发者网站",
    linkErrorTitle: "无法打开链接",
    linkErrorDescription: "你的设备目前无法打开此网站。",
    privacyLinkErrorDescription: "你的设备目前无法打开隐私政策。",
    resetDataTitle: "删除本地数据",
    resetDataDescription: "这将删除保存在此设备上的账户、交易、转账、提醒和设置。",
    resetDataConfirm: "删除",
    exportErrorTitle: "无法导出",
    exportCsvErrorDescription: "生成 CSV 文件时发生错误。",
    exportExcelErrorDescription: "生成 Excel 文件时发生错误。",
    mainCurrency: "主要货币"
  },
  onboarding: {
    welcome: {
      title: "在一个地方管理你的钱",
      description: "通过一个本地且私密的应用记录账户、收入、支出、转账、提醒和财务计划。",
      balanceCardTitle: "你的余额从这里开始",
      income: "收入",
      expenses: "支出",
      start: "开始"
    },
    setup: {
      stepLabel: "第 {{step}} 步，共 {{total}} 步",
      title: "设置你的体验",
      description: "这些回答会个性化应用体验，而不会强制你创建账户。"
    },
    stepOne: {
      mainCurrency: "主要货币",
      calculateTotalNetWorth: "计算我的全部资金",
      calculateTotalNetWorthDescription: "将银行、现金、加密货币和其他账户合并为一个总余额。",
      userType: "用户类型"
    },
    stepTwo: {
      cryptoUsage: "加密货币使用情况",
      multiCurrencyUsage: "多货币使用情况"
    },
    stepThree: {
      mainGoal: "主要目标",
      activateFinancialReminders: "开启财务提醒",
      activateFinancialRemindersDescription: "这会帮助你记住付款、收款、购买或储蓄。",
      viewPlans: "查看计划"
    },
    options: {
      userProfile: {
        personal: {
          label: "个人",
          description: "我想管理个人财务。"
        },
        freelancer: {
          label: "专业人士",
          description: "我通过项目或客户获得收入。"
        },
        entrepreneur: {
          label: "创业者",
          description: "我管理一个业务或项目的资金。"
        },
        investor: {
          label: "投资者",
          description: "我想跟踪资产、加密货币或投资。"
        },
        student: {
          label: "学生",
          description: "我想整理支出和储蓄。"
        }
      },
      cryptoUsage: {
        none: {
          label: "我不使用加密货币",
          description: "我不需要 Binance 或 MetaMask 之类的账户。"
        },
        basic: {
          label: "是的，我使用加密货币",
          description: "我想记录交易平台、钱包或数字资产。"
        },
        advanced: {
          label: "我使用加密货币，但它不是重点",
          description: "我想记录加密货币，但这不是我最重要的需求。"
        }
      },
      multiCurrencyUsage: {
        none: {
          label: "我使用一种货币",
          description: "我主要用一种货币管理资金。"
        },
        occasional: {
          label: "偶尔",
          description: "我偶尔使用不同货币的账户。"
        },
        frequent: {
          label: "经常",
          description: "我经常使用多种货币的账户。"
        }
      },
      financialGoal: {
        control_expenses: {
          label: "控制支出",
          description: "我想知道钱花到哪里去了。"
        },
        save_more: {
          label: "存更多钱",
          description: "我想为目标和备用金存钱。"
        },
        pay_debts: {
          label: "偿还债务",
          description: "我想整理债务和待付款项。"
        },
        track_income: {
          label: "跟踪收入",
          description: "我想清楚掌握自己的收入来源。"
        },
        understand_investments: {
          label: "了解我的投资",
          description: "我想更好地跟踪资产、加密货币或投资。"
        },
        avoid_small_expenses: {
          label: "避免日常小额支出",
          description: "我想识别并控制每天的小额支出。"
        }
      }
    },
    plans: {
      title: "选择你想如何开始",
      description: "你可以免费使用应用，并在之后需要时激活高级功能。",
      continueWithPlus: "继续使用 Plus"
    },
    v2: {
      control: {
        title: "轻松管理你的资金",
        description: "在一个地方管理账户、余额和交易。"
      },
      movements: {
        title: "几秒内记录支出和收入",
        description: "使用类似计算器的快速表单，更轻松地记录资金。"
      },
      reminders: {
        title: "不要忘记付款和收款",
        description: "为付款、收款和周期性事项创建提醒。"
      },
      clarity: {
        title: "清晰查看你的财务状况",
        description: "通过一个简单的应用了解余额、交易和即将到来的事项。"
      },
      currency: {
        title: "选择你的主要货币",
        description: "我们将使用此货币显示你的总额、报表和主要余额。"
      },
      start: "立即开始",
      welcome: {
        title: "欢迎使用 Orvian",
        description: "一种更清晰、更简单的方式来管理资金、账户和即将到来的事项。"
      },
      accounts: {
        title: "更好地管理你的账户",
        description: "创建账户、跟踪余额，并自定义卡片以清晰查看资金。"
      },
      analytics: {
        title: "一眼了解你的财务状况",
        description: "通过简单图表查看趋势、支出和收入，做出更好的决策。"
      },
      plans: {
        title: "免费开始，需要时升级",
        description: "免费使用 Orvian，或解锁带本地高级功能的 Plus Lifetime。"
      },
      continueWithPlus: "继续使用 Plus",
      continueFree: "免费继续"
    }
  },
  budgets: {
    title: "预算",
    description: "设置月度限额来控制支出。",
    allCategoriesAlreadyBudgeted: "你已经为所有可用类别添加了限额。",
    budgetedCategories: "有额度限制的类别",
    budgetOf: "{{period}} 的预算",
    currentSpendingVsBudget: "当前支出与月度限额的对比。",
    spent: "已花费",
    limit: "限额",
    limitedCategories: "受限类别",
    spentOfLimit: "{{spent}} / {{limit}}",
    currentEmptyTitle: "你本月还没有预算",
    currentEmptyDescription: "为 {{period}} 创建预算。",
    createMonthlyBudget: "创建月度预算",
    historyTitle: "预算历史",
    generalLimitValue: "总限额：{{amount}} {{currency}}",
    modalDescription: "设置限额以控制每月支出。",
    status: {
      exceeded: "你已超出月度预算。",
      warning: "你快达到月度预算上限了。",
      safe: "你的支出仍在预算范围内。",
      used: "已使用",
      spentAmount: "已花费 {{amount}}",
      limitAmount: "限额：{{amount}}"
    },
    newBudget: "新预算",
    editBudget: "编辑预算",
    createBudget: "创建预算",
    saveBudget: "保存预算",
    deleteBudget: "删除预算",
    monthLabel: "{{month}} {{year}}",
    generalMonthlyBudget: "总月度预算",
    generalBudgetPlaceholder: "例如：500",
    categoryBudgetTitle: "按类别设置预算",
    categoryBudgetDescription: "只为你想控制的支出类别添加限额。",
    expenseCategory: "支出类别",
    monthlyLimit: "月度限额",
    monthlyLimitPlaceholder: "例如：120",
    addCategory: "添加类别",
    removeCategory: "移除类别",
    budgetUsed: "已使用预算",
    remainingBudget: "剩余预算",
    exceededBudget: "超出预算",
    emptyTitle: "你还没有预算",
    emptyDescription: "创建月度预算，以更好地控制支出。",
    deleteTitle: "删除预算",
    deleteDescription: "此预算及其类别限额将被删除。",
    errors: {
      generalRequired: "总预算为必填项。",
      generalGreaterThanZero: "总预算必须大于 0。",
      categoryRequired: "请选择一个类别。",
      categoryLimitRequired: "月度限额为必填项。",
      categoryLimitGreaterThanZero: "月度限额必须大于 0。",
      duplicatedCategory: "此类别已经分配了预算。"
    }
  },
  reminders: {
    title: "提醒",
    description: "安排付款、收款、购买或投资提醒。",
    newReminder: "新提醒",
    saveReminder: "保存提醒",
    createReminder: "创建提醒",
    completeTitle: "完成提醒",
    completeDescription: "你想将此提醒标记为已完成吗？",
    cancelTitle: "取消提醒",
    cancelDescription: "你想取消此提醒吗？",
    confirmCancel: "是的，取消",
    emptyTitle: "你还没有提醒",
    emptyDescription: "为付款、收款、订阅、购买或储蓄创建提醒。",
    complete: "完成",
    form: {
      title: "标题",
      titlePlaceholder: "例如：支付网费",
      amountOptional: "可选金额",
      amountPlaceholder: "0.00",
      type: "类型",
      frequency: "频率",
      date: "日期",
      time: "时间",
      relatedAccount: "相关账户",
      descriptionOptional: "可选描述",
      descriptionPlaceholder: "例如：每月 5 日到期...",
      titleRequired: "标题为必填项。",
      amountInvalid: "金额必须大于或等于 0。",
      futureDateRequired: "日期必须是未来日期。"
    },
    card: {
      defaultType: "提醒"
    },
    types: {
      payment: {
        label: "付款",
        description: "服务、债务、银行卡或需要支付的承诺。"
      },
      collection: {
        label: "收款",
        description: "别人需要支付给你的钱。"
      },
      subscription: {
        label: "订阅",
        description: "Netflix、Spotify、软件或其他周期性付款。"
      },
      saving: {
        label: "储蓄",
        description: "提醒你存钱。"
      },
      investment: {
        label: "投资",
        description: "定期购买资产或加密货币。"
      },
      purchase: {
        label: "购买",
        description: "重要的计划购买。"
      },
      custom: {
        label: "自定义",
        description: "自定义财务提醒。"
      }
    },
    frequencies: {
      once: {
        label: "一次",
        description: "只会在所选日期提醒你。"
      },
      daily: {
        label: "每天",
        description: "每天重复。"
      },
      weekly: {
        label: "每周",
        description: "每周重复。"
      },
      monthly: {
        label: "每月",
        description: "每月重复。"
      }
    }
  },
  plans: {
    title: "计划",
    description: "选择最适合你管理财务方式的计划。",
    currentPlan: "当前计划",
    free: "免费",
    plus: "Plus",
    demoDescription: "免费开始，并在需要时激活高级功能。",
    monthlyPeriod: "每月",
    yearlyAvailable: "也可选择每年 ${{price}}。",
    plusActive: "Plus 已激活",
    activatePlusDemo: "激活 Plus 演示",
    freeActive: "免费计划已激活",
    backToFree: "返回免费计划",
    freePlan: {
      name: "免费",
      description: "适合开始整理个人财务。",
      price: "$0",
      period: "永久",
      cta: "免费继续",
      current: "当前计划",
      features: {
        accountsLimit: "最多 3 个账户",
        movementsLimit: "每月最多 30 笔交易",
        basicStatistics: "基础统计",
        localData: "数据本地保存",
        accounts: "最多 3 个账户",
        movements: "无限交易",
        basicReminders: "基础提醒",
        basicMovements: "基础交易记录",
        baseCategories: "基础类别",
        theme: "浅色和深色模式"
      }
    },
    plusPlan: {
      name: "Plus",
      description: "适合想要完整财务控制的用户。",
      price: "{{price}}",
      period: "每月",
      cta: "激活 Plus",
      features: {
        unlimitedAccounts: "无限账户",
        unlimitedMovements: "无限交易记录",
        advancedStatistics: "高级统计",
        budgets: "月度预算",
        reminders: "财务提醒",
        exportData: "数据导出",
        priorityFeatures: "访问高级功能"
      }
    },
    restorePurchase: "恢复购买",
    continueWithoutPlus: "不使用 Plus 继续",
    errors: {
      purchaseUnavailable: "当前无法购买。",
      restoreUnavailable: "当前无法恢复购买。"
    },
    v2: {
      title: "选择如何与 Orvian 一起成长",
      description: "免费开始，并在需要时解锁高级功能。",
      oneTimePayment: "一次性付款",
      unlockPlus: "解锁 Plus",
      plusActive: "Plus 已激活",
      buyPack: "购买套装",
      included: "已包含",
      includedWithPlus: "包含在 Plus 中",
      cardDesigns: {
        title: "卡片设计",
        description: "单独购买套装，或通过 Plus 解锁。"
      },
      legacy: {
        title: "早期用户福利",
        description: "感谢你在公开发布前试用 Orvian。",
        benefit: "你将获得临时 Plus 权限，并可享受保留 Plus Lifetime 的特别折扣。",
        temporaryUntil: "预计临时访问截止：{{date}}",
        shortBenefit: "因在发布前试用 Orvian 而获得特别折扣。"
      },
      pro: {
        title: "即将推出：Orvian Pro",
        description: "财务 AI、云同步、备份和多设备访问将属于单独的月度计划。"
      },
      freePrice: "$0 · 开始使用",
      plusPrice: "$4.99 · 一次性付款",
      legacyPrice: "$2.99 · 早期用户价格"
    },
    products: {
      plusLifetime: {
        description: "通过一次性付款解锁本地高级功能。",
        name: "Plus Lifetime",
        features: {
          unlimitedAccounts: "无限账户",
          unlimitedReminders: "无限提醒",
          cardDesigns: "高级卡片设计",
          customCategories: "自定义类别",
          advancedCustomization: "高级自定义",
          localExport: "本地数据导出"
        }
      },
      cardPacks: {
        dark: {
          description: "适用于账户的深色优雅设计。"
        },
        luxury: {
          description: "让应用更具高级感的专属设计。"
        },
        crypto: {
          description: "受数字资产和钱包启发的设计。"
        },
        minimal: {
          description: "适用于个人账户的简洁极简设计。"
        }
      }
    },
    purchase: {
      errorTitle: "无法开始购买",
      errorDescription: "请检查网络连接，或从 Google Play 重试。"
    }
  },
  categories: {
    salary: "工资",
    freelance: "项目 / 自由职业",
    sales: "销售",
    business_income: "业务",
    investment_income: "投资",
    gift_income: "礼物 / 额外收入",
    refund: "退款",
    loan_received: "收到的贷款",
    rental_income: "租金收入",
    other_income: "其他收入",
    food: "餐饮",
    groceries: "日用品",
    restaurants: "餐厅",
    transport: "交通",
    fuel: "燃料",
    taxi_rideshare: "出租车 / 打车应用",
    housing: "住房",
    rent: "租金",
    services: "服务",
    electricity: "电费",
    water: "水费",
    internet_phone: "网络 / 电话",
    health: "健康",
    medicine: "药品",
    education: "教育",
    entertainment: "娱乐",
    subscriptions: "订阅",
    technology: "科技",
    clothing: "服装",
    personal_care: "个人护理",
    family: "家庭",
    pets: "宠物",
    travel: "旅行",
    gifts: "礼物",
    taxes: "税费",
    fees: "费用",
    debt_payment: "债务还款",
    savings: "储蓄",
    investment_expense: "投资",
    cash_withdrawal: "现金取款",
    other: "其他"
  },
  tags: {
    essential: "必要",
    optional: "可选",
    urgent: "紧急",
    recurring: "周期性",
    planned: "已计划",
    unplanned: "未计划",
    cash: "现金",
    card: "银行卡",
    transfer: "转账",
    online: "线上",
    subscription: "订阅",
    work: "工作",
    personal: "个人",
    family: "家庭",
    business: "业务",
    tax: "税",
    invoice: "发票",
    debt: "债务",
    savings: "储蓄",
    small_expense: "日常小额支出"
  },
  loans: {
    newLoan: "新贷款",
    form: {
      description: "跟踪你需要支付或收取的钱。",
      title: "标题",
      titlePlaceholder: "例如：个人贷款",
      titleRequired: "标题为必填项。",
      personOrEntity: "个人或机构",
      personOrEntityPlaceholder: "例如：某人、银行、亲属",
      payable: "我需要支付",
      receivable: "别人需要付给我",
      payableDescription: "你欠的钱。",
      receivableDescription: "别人欠你的钱。",
      amount: "金额",
      amountPlaceholder: "0.00",
      amountRequired: "金额为必填项。",
      amountError: "请输入大于 0 的金额。",
      currency: "货币",
      notes: "备注",
      notesPlaceholder: "可选贷款详情",
      createTitle: "创建贷款"
    },
    payment: {
      remainingAmount: "剩余：{{amount}}",
      amount: "金额",
      amountPlaceholder: "0.00",
      amountRequired: "金额为必填项。",
      amountError: "请输入大于 0 且小于或等于 {{amount}} 的金额。",
      note: "备注",
      notePlaceholder: "付款或收款的可选详情",
      pay: "付款"
    }
  },
  transfers: {
    form: {
      fromAccountRequired: "请选择来源账户。",
      toAccountRequired: "请选择目标账户。",
      sameAccountError: "来源账户和目标账户必须不同。",
      exchangeRatePending: "目前将使用 1:1 汇率。高级兑换功能稍后添加。",
      fromAccount: "来源账户",
      toAccount: "目标账户",
      feeAmount: "手续费"
    }
  },
  guides: {
    homeOverview: {
      title: "你的财务概览从这里开始",
      description: "在此页面查看总余额、主要账户和最近交易。"
    },
    movementQuickAdd: {
      title: "使用 + 按钮记录资金",
      description: "使用底部栏中间按钮快速创建支出、收入或转账。"
    },
    homeTour: {
      totalBalance: "在这里你可以查看账户的预计总余额。",
      accounts: "这些是你的主要账户。点击一个查看详情。",
      monthlySummary: "在这里你可以查看本月收入、支出和余额摘要。",
      recentActivity: "这里显示你最近的交易和转账。"
    },
    statisticsTour: {
      filters: "使用此按钮按日期、账户、类别、货币或交易类型筛选统计数据。",
      summary: "这里显示周期摘要：收入、支出、转账、手续费和余额。",
      incomeVsExpense: "此图表按月比较收入和支出，帮助你判断是否支出超过收入。",
      balanceEvolution: "这里显示你的余额随时间的变化，以及财务趋势是在改善还是变差。",
      topCategories: "此图表显示你最大的支出类别，帮助你了解钱花在哪里。",
      budgetUsed: "如果你有启用的预算，这里会显示已使用多少以及是否接近上限。",
      expensesByCategory: "此列表按类别排列支出，并显示百分比和金额，帮助你发现重点。",
      accountSummary: "这里按账户比较收入、支出和余额，帮助你查看哪个账户活动最多。",
      chartsPanel: "这些图表可帮助你比较收入、支出、余额变化、主要类别和预算使用情况。"
    }
  }
} as const;
