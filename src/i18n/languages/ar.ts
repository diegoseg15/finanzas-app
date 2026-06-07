export const ar = {
  common: {
    appName: "Orvian",
    cancel: "إلغاء",
    save: "حفظ",
    edit: "تعديل",
    delete: "حذف",
    close: "إغلاق",
    continue: "متابعة",
    back: "رجوع",
    next: "التالي",
    confirm: "تأكيد",
    apply: "تطبيق",
    clear: "مسح",
    add: "إضافة",
    create: "إنشاء",
    update: "تحديث",
    remove: "إزالة",
    search: "بحث",
    select: "اختيار",
    loading: "جارٍ التحميل...",
    saving: "جارٍ الحفظ...",
    exporting: "جارٍ التصدير...",
    error: "خطأ",
    success: "تم",
    required: "مطلوب",
    optional: "اختياري",
    amount: "المبلغ",
    date: "التاريخ",
    time: "الوقت",
    title: "العنوان",
    description: "الوصف",
    note: "ملاحظة",
    category: "الفئة",
    currency: "العملة",
    account: "الحساب",
    type: "النوع",
    frequency: "التكرار",
    freePlan: "الخطة المجانية",
    plusPlan: "خطة Plus",
    month: "الشهر",
    monthly: "شهري",
    total: "الإجمالي",
    balance: "الرصيد",
    income: "الدخل",
    expense: "المصروف",
    transfer: "تحويل",
    commission: "رسوم",
    noData: "لا توجد بيانات",
    notAvailable: "غير متاح",
    no: "لا",
    transfers: "التحويلات"
  },
  tabs: {
    home: "الرئيسية",
    accounts: "الحسابات",
    movements: "المعاملات",
    statistics: "الإحصائيات",
    settings: "الإعدادات",
    more: "المزيد",
    budgets: "الميزانيات",
    loans: "القروض"
  },
  home: {
    totalEstimated: "إجمالي المال التقديري",
    totalEstimatedBalance: "إجمالي الرصيد التقديري",
    monthlyExpenses: "مصروفات الشهر",
    monthlyIncome: "دخل الشهر",
    monthlyBalance: "نتيجة الشهر",
    available: "متاح",
    accounts: "الحسابات",
    upcomingReminders: "التذكيرات القادمة",
    viewAll: "عرض الكل",
    noUpcomingReminders: "لا توجد تذكيرات قادمة.",
    recentActivity: "النشاط الأخير",
    noRegisteredMovements: "لم تقم بتسجيل أي معاملات بعد.",
    noActivity: "لا يوجد نشاط بعد.",
    viewAllAccounts: "عرض الكل",
    monthlySummary: "ملخص شهري"
  },
  accounts: {
    title: "الحسابات",
    description: "سجّل البنوك، النقد، العملات الرقمية، البطاقات والقروض.",
    newAccount: "حساب جديد",
    firstAccount: "إنشاء أول حساب",
    createTitle: "حساب جديد",
    editTitle: "تعديل الحساب",
    emptyTitle: "لا توجد لديك حسابات بعد",
    emptyDescription: "أنشئ أول حساب للبدء في تسجيل الدخل، المصروفات والتحويلات.",
    freePlanRemaining: "الخطة المجانية: {{count}} حسابات متاحة.",
    plusPlanUnlimited: "خطة Plus: حسابات غير محدودة.",
    limitTitle: "لقد وصلت إلى حد الحسابات المجانية",
    limitDescription: "تسمح الخطة المجانية بإنشاء ما يصل إلى 3 حسابات. فعّل Plus لإنشاء حسابات غير محدودة.",
    deleteTitle: "حذف الحساب",
    deleteDescription: "سيتم إخفاء هذا الحساب من القائمة النشطة. سيتم الاحتفاظ بالمعاملات السابقة.",
    saveAccount: "حفظ الحساب",
    saveChanges: "حفظ التغييرات",
    card: {
      customAccount: "حساب مخصص",
      currentBalance: "الرصيد الحالي",
      includedInTotal: "مُدرج في الإجمالي التقديري",
      excludedFromTotal: "غير مُدرج في الإجمالي التقديري",
      options: "الخيارات"
    },
    form: {
      createTitle: "حساب جديد",
      editTitle: "تعديل الحساب",
      editDescription: "حدّث البيانات الرئيسية لهذا الحساب.",
      createDescription: "قم بإعداد البيانات الرئيسية لهذا الحساب.",
      name: "اسم الحساب",
      namePlaceholder: "مثال: بنك Pichincha",
      currentBalance: "الرصيد الحالي",
      initialBalance: "الرصيد الابتدائي",
      balancePlaceholder: "0.00",
      balanceEditInfo: "يتم تحديث الرصيد من خلال تسجيل المعاملات، وليس من خلال تعديل الحساب.",
      type: "نوع الحساب",
      mainCurrency: "العملة الرئيسية",
      currencyCrypto: "عملة رقمية",
      currencyFiat: "عملة تقليدية",
      currencyCustom: "مخصصة",
      currencyEditInfo: "لا يمكن تغيير العملة الرئيسية عند التعديل لتجنب التأثير على سجل المعاملات.",
      includeInTotal: "إضافة إلى الإجمالي التقديري",
      includeInTotalDescription: "فعّل هذا الخيار إذا كنت تريد إضافة هذا الحساب إلى رصيدك الإجمالي.",
      initialBalanceRequired: "الرصيد الابتدائي مطلوب. استخدم 0 إذا لم يكن هناك رصيد.",
      initialBalanceError: "لا يمكن أن يكون الرصيد الابتدائي سالبًا.",
      nameRequired: "اسم الحساب مطلوب.",
      institutionName: "البنك أو المؤسسة",
      institutionNamePlaceholder: "مثال: بنك، Binance، Metamask",
      pinAccount: "تثبيت كحساب مهم",
      pinAccountDescription: "سيظهر أولاً في شاشة الحسابات.",
      cardDesign: "تصميم البطاقة",
      cardDesignPlusOnly: "متاح فقط مع Plus.",
      steps: {
        0: {
          description: "حدد أولاً هوية الحساب."
        },
        1: {
          description: "قم الآن بضبط الرصيد والعملة والأهمية."
        },
        2: {
          description: "اختر شكل بطاقة هذا الحساب."
        }
      },
      cardDesignUpgradeMessage: "قم بالترقية إلى Plus لتخصيص تصميم بطاقاتك.",
      isSavingsTarget: "حساب مخصص للادخار",
      isSavingsTargetDescription: "استخدمه لفصل المال الذي لا تريد إنفاقه."
    },
    types: {
      bank: {
        label: "بنك",
        description: "حساب بنكي تقليدي."
      },
      cash: {
        label: "نقد",
        description: "مال نقدي متاح."
      },
      piggy_bank: {
        label: "حصالة",
        description: "مدخرات نقدية أو منفصلة لهدف معين."
      },
      crypto_exchange: {
        label: "منصة عملات رقمية",
        description: "حساب في تطبيقات مثل Binance أو منصات عملات رقمية أخرى."
      },
      crypto_wallet: {
        label: "محفظة عملات رقمية",
        description: "محفظة مثل MetaMask أو تطبيقات أخرى لحفظ العملات الرقمية."
      },
      credit_card: {
        label: "بطاقة ائتمان",
        description: "بطاقة عليها دين أو حد ائتماني مستخدم."
      },
      loan_receivable: {
        label: "قرض مستحق التحصيل",
        description: "مال يدين لك به شخص آخر."
      },
      loan_payable: {
        label: "قرض مستحق الدفع",
        description: "مال تحتاج إلى سداده."
      },
      custom: {
        label: "حساب مخصص",
        description: "نوع حساب يحدده المستخدم."
      }
    },
    cardDesigns: {
      default: {
        label: "قياسي",
        description: "تصميم نظيف لأي حساب."
      },
      minimal: {
        label: "بسيط",
        description: "أكثر هدوءًا وبساطة."
      },
      gradient: {
        label: "تدرج لوني",
        description: "أسلوب بصري أكثر حداثة."
      },
      blue: {
        label: "أزرق العلامة",
        description: "يستخدم اللون الأزرق الرئيسي في Orvian."
      },
      dark: {
        label: "داكن",
        description: "أسلوب أنيق بمظهر داكن."
      },
      premium: {
        label: "بريميوم",
        description: "تصميم أكثر تميزًا للحسابات البارزة."
      }
    },
    groups: {
      regular: "تقليدية",
      crypto: "العملات الرقمية"
    },
    summary: {
      regularTotal: "إجمالي الحسابات التقليدية",
      cryptoTotal: "إجمالي العملات الرقمية",
      accountCount: "{{count}} حساب"
    },
    emptyCryptoAccounts: "ليس لديك حسابات عملات رقمية بعد.",
    emptyRegularAccounts: "ليس لديك حسابات تقليدية بعد.",
    detail: {
      description: "قم بإدارة معلومات وإعدادات هذا الحساب.",
      notFoundTitle: "لم يتم العثور على الحساب",
      notFoundDescription: "لم يعد هذا الحساب موجودًا أو تمت أرشفته.",
      type: "النوع",
      institution: "المؤسسة",
      mainCurrency: "العملة الرئيسية",
      archiveTitle: "أرشفة الحساب",
      archiveDescription: "لن يظهر هذا الحساب في قائمتك الرئيسية، لكن سيتم الاحتفاظ ببياناته.",
      archiveAction: "أرشفة",
      settings: "الإعدادات",
      recentMovements: "الحركات الأخيرة",
      recentMovementsDescription: "النشاط المؤكد خلال آخر شهرين.",
      noRecentMovements: "لا توجد حركات حديثة في هذا الحساب.",
      actions: "الإجراءات",
      archive: "أرشفة الحساب",
      edit: "تعديل الحساب",
      emptyActivity: "لا توجد حركات حديثة في هذا الحساب.",
      information: "المعلومات",
      priority: "الأولوية",
      recentActivity: "النشاط الأخير",
      totalEstimated: "الإجمالي التقديري",
      normal: "عادي",
      pinned: "مثبت"
    }
  },
  movements: {
    title: "المعاملات",
    description: "سجّل الدخل، المصروفات والتحويلات بين حساباتك.",
    newMovement: "معاملة جديدة",
    newTransfer: "تحويل جديد",
    registerMovement: "تسجيل معاملة",
    emptyTitle: "لا توجد لديك معاملات بعد",
    emptyDescription: "سجّل أول دخل أو مصروف أو تحويل للبدء في بناء سجلك المالي.",
    incomeExpense: "دخل / مصروف",
    income: "دخل",
    expense: "مصروف",
    transfer: "تحويل",
    freePlanRemaining: "الخطة المجانية: {{count}} معاملات متاحة هذا الشهر.",
    plusPlanUnlimited: "خطة Plus: معاملات غير محدودة.",
    firstCreateAccountTitle: "أنشئ حسابًا أولًا",
    firstCreateAccountDescription: "تحتاج إلى حساب نشط واحد على الأقل لتسجيل الدخل أو المصروفات.",
    limitTitle: "لقد وصلت إلى حد المعاملات المجانية",
    limitDescription: "تسمح الخطة المجانية بما يصل إلى 30 معاملة شهريًا. فعّل Plus لتسجيل معاملات غير محدودة.",
    deleteMovementTitle: "حذف المعاملة",
    deleteMovementDescription: "سيؤدي هذا الإجراء إلى عكس تأثير هذه المعاملة على الرصيد.",
    deleteTransferTitle: "حذف التحويل",
    deleteTransferDescription: "سيؤدي هذا الإجراء إلى عكس تأثير هذا التحويل على الأرصدة.",
    editMovement: "تعديل المعاملة",
    editTransfer: "تعديل التحويل",
    saveMovement: "حفظ المعاملة",
    saveTransfer: "حفظ التحويل",
    form: {
      account: "الحساب",
      category: "الفئة",
      amount: "المبلغ",
      tags: "الوسوم",
      note: "ملاحظة",
      notePlaceholder: "ملاحظة اختيارية",
      selectedAccountNotFound: "الحساب المحدد غير موجود.",
      insufficientBalance: "ليس لديك رصيد كافٍ في هذا الحساب.",
      createDescription: "سجّل دخلًا أو مصروفًا مؤكدًا.",
      amountRequired: "يجب أن يكون المبلغ أكبر من 0.",
      accountRequired: "اختر حسابًا.",
      categoryRequired: "اختر فئة.",
      allTagsSelected: "لقد اخترت جميع الوسوم المتاحة بالفعل.",
      accountCurrency: "العملة: {{currency}}"
    },
    card: {
      defaultTitle: "معاملة",
      deletedAccount: "حساب محذوف"
    },
    transferCard: {
      fromAccountFallback: "الحساب المصدر",
      toAccountFallback: "الحساب الوجهة",
      sent: "تم الإرسال",
      received: "تم الاستلام",
      fee: "رسوم",
      exchangeRate: "سعر الصرف المستخدم: 1 {{fromCurrency}} = {{exchangeRate}} {{toCurrency}}"
    },
    transferForm: {
      fromAccount: "الحساب المصدر",
      toAccount: "الحساب الوجهة",
      fromAmount: "المبلغ المرسل",
      toAmount: "المبلغ المستلم",
      note: "ملاحظة",
      notePlaceholder: "مثال: تحويل إلى الادخار",
      differentAccountsRequired: "اختر حسابين مختلفين.",
      description: "انقل المال بين الحسابات وسجّل الرسوم أو تحويل العملة.",
      fromAccountRequired: "اختر الحساب المصدر.",
      toAccountRequired: "اختر الحساب الوجهة.",
      fromAmountRequired: "يجب أن يكون المبلغ المرسل أكبر من 0.",
      toAmountRequired: "يجب أن يكون المبلغ المستلم أكبر من 0.",
      feeInvalid: "لا يمكن أن تكون الرسوم سالبة.",
      insufficientBalance: "ليس لديك رصيد كافٍ في الحساب المصدر لهذه التحويلة.",
      multiCurrencyBlockedByPlan: "تسمح الخطة المجانية فقط بالتحويلات بين حسابات بنفس العملة.",
      fromAmountWithCurrency: "المبلغ المرسل {{currency}}",
      toAmountWithCurrency: "المبلغ المستلم {{currency}}",
      feeAmountWithCurrency: "الرسوم {{currency}}",
      calculatedExchangeRate: "سعر الصرف المحسوب",
      multiCurrencyPlusTitle: "التحويلات بين العملات متاحة في Plus",
      multiCurrencyPlusDescription: "في الخطة المجانية، يمكنك التحويل بين حسابات بنفس العملة. للتحويلات مع تغيير العملة، فعّل Plus."
    },
    calculatorAmount: "مبلغ الحركة",
    transferAmount: "المبلغ المراد تحويله",
    emptyFilterTitle: "لا توجد نتائج",
    emptyFilterDescription: "غيّر الفلتر لرؤية حركات أخرى.",
    newExpense: "مصروف جديد",
    newIncome: "دخل جديد"
  },
  statistics: {
    title: "الإحصائيات",
    description: "راجع دخلك، مصروفاتك، تحويلاتك وفئاتك.",
    filters: "فلاتر التقرير",
    applyFilters: "تطبيق الفلاتر",
    clearFilters: "مسح الفلاتر",
    filtersDescription: "اضبط الفترة، الحساب، الفئة والعملة.",
    cards: {
      income: "الدخل",
      expenses: "المصروفات",
      transfers: "التحويلات",
      commissions: "الرسوم",
      periodBalance: "نتيجة الفترة"
    },
    charts: {
      incomeVsExpense: "الدخل مقابل المصروفات",
      incomeVsExpenseDescription: "مقارنة شهرية بين المال الداخل والخارج.",
      balanceEvolution: "تطور الرصيد",
      balanceEvolutionDescription: "الرصيد المتراكم خلال الأشهر الأخيرة.",
      topExpenseCategories: "أعلى فئات المصروفات",
      topExpenseCategoriesDescription: "الفئات التي خرج منها أكبر مبلغ من المال.",
      budgetUsed: "الميزانية المستخدمة",
      budgetUsedDescription: "تقدم الميزانية الشهرية الحالية.",
      expensesByCategory: "المصروفات حسب الفئة",
      accountSummary: "ملخص الحسابات"
    },
    empty: {
      noBudget: "أنشئ ميزانية شهرية لرؤية هذا الرسم البياني.",
      noMovements: "سجّل معاملات لعرض الإحصائيات.",
      noExpenses: "لا توجد مصروفات مسجلة في هذه الفترة بعد.",
      noIncome: "لا يوجد دخل مسجل في هذه الفترة بعد.",
      noIncomeExpenseChart: "لا توجد بيانات دخل أو مصروفات لرسمها.",
      noBalanceTrend: "لا توجد بيانات كافية عن الرصيد لعرض الاتجاه بعد.",
      noExpenseCategoriesChart: "لا توجد مصروفات حسب الفئة لرسمها.",
      noFilterDataTitle: "لا توجد بيانات لهذه الفلاتر",
      noFilterDataDescription: "غيّر الفترة أو سجّل معاملات لعرض الإحصائيات.",
      noExpensesForFilters: "لا توجد مصروفات لهذه الفلاتر."
    },
    labels: {
      income: "الدخل",
      expenses: "المصروفات",
      others: "أخرى",
      top: "الأعلى",
      balance: "الرصيد",
      used: "مستخدم",
      spentAmount: "تم صرف {{amount}}",
      limitAmount: "الحد: {{amount}}",
      noCategory: "بدون فئة",
      balanceAmount: "الرصيد: {{amount}}"
    }
  },
  reports: {
    export: {
      title: "تصدير الملخص",
      description: "حمّل حساباتك، دخلك، مصروفاتك وتحويلاتك في ملف."
    },
    filters: {
      title: "الفلاتر",
      panelDescription: "اضبط الفترة والبيانات التي تريد تحليلها.",
      period: "الفترة",
      account: "الحساب",
      category: "الفئة",
      currency: "العملة",
      from: "من",
      to: "إلى",
      movementKind: "نوع المعاملة"
    },
    periods: {
      current_month: {
        label: "الشهر الحالي",
        description: "معاملات الشهر الحالي."
      },
      last_month: {
        label: "الشهر الماضي",
        description: "معاملات الشهر الماضي."
      },
      last_3_months: {
        label: "آخر 3 أشهر",
        description: "معاملات آخر ثلاثة أشهر."
      },
      current_year: {
        label: "السنة الحالية",
        description: "معاملات السنة الحالية."
      },
      custom: {
        label: "مخصص",
        description: "اختر نطاق تواريخ يدويًا."
      }
    },
    movementKinds: {
      all: {
        label: "الكل",
        description: "الدخل والمصروفات."
      },
      income: {
        label: "الدخل",
        description: "فقط المال الداخل."
      },
      expense: {
        label: "المصروفات",
        description: "فقط المال الخارج."
      }
    },
    accounts: {
      all: {
        label: "كل الحسابات",
        description: "يشمل جميع الحسابات النشطة."
      }
    },
    categories: {
      all: {
        label: "كل الفئات",
        description: "عدم التصفية حسب الفئة."
      }
    },
    currencies: {
      main: {
        label: "العملة الرئيسية",
        description: "استخدم العملة الرئيسية في الملخص."
      }
    }
  },
  settings: {
    title: "الإعدادات",
    description: "اضبط تجربتك، بياناتك، خصوصيتك وخطتك.",
    appearance: "المظهر",
    theme: "السمة",
    currentTheme: "السمة الحالية: {{theme}}",
    themeModes: {
      system: "النظام",
      dark: "داكن",
      light: "فاتح"
    },
    language: "اللغة",
    languageDescription: "اختر لغة واجهة Orvian.",
    languagePickerLabel: "اللغة",
    currentPlan: "الخطة الحالية",
    currentPlanDescription: "أنت تستخدم خطة {{plan}}.",
    freePlanName: "مجانية",
    viewPlans: "عرض الخطط",
    shortcuts: "اختصارات",
    viewBudgets: "عرض الميزانيات",
    viewReminders: "عرض التذكيرات",
    privacy: "الخصوصية",
    privacyDescription: "تحقق من كيفية التعامل مع بياناتك داخل Orvian.",
    privacyPolicy: "سياسة الخصوصية",
    openPrivacyPolicy: "عرض سياسة الخصوصية",
    exportData: "تصدير البيانات",
    exportDescription: "أنشئ ملفات تحتوي على حساباتك، معاملاتك وتحويلاتك.",
    exporting: "جارٍ التصدير...",
    exportCsv: "تصدير CSV",
    exportExcel: "تصدير Excel",
    importData: "استيراد البيانات",
    importDescription: "حمّل المعاملات من ملف CSV.",
    localData: "البيانات المحلية",
    localDataDescription: "يتم حفظ بياناتك على هذا الجهاز. قد يتم تفعيل مزامنة الحساب لاحقًا.",
    viewOnboardingAgain: "عرض المقدمة مرة أخرى",
    resetData: "حذف البيانات المحلية",
    about: "حول Orvian",
    aboutDescription: "يساعدك Orvian على تنظيم حساباتك، مصروفاتك، ميزانياتك وملخصاتك الشخصية.",
    app: "التطبيق",
    version: "الإصدار",
    developer: "المطور",
    visitDeveloperWebsite: "زيارة موقع المطور",
    linkErrorTitle: "تعذر فتح الرابط",
    linkErrorDescription: "لا يمكن لجهازك فتح هذا الموقع حاليًا.",
    privacyLinkErrorDescription: "لا يمكن لجهازك فتح سياسة الخصوصية حاليًا.",
    resetDataTitle: "حذف البيانات المحلية",
    resetDataDescription: "سيؤدي هذا إلى حذف الحسابات، المعاملات، التحويلات، التذكيرات والإعدادات المحفوظة على هذا الجهاز.",
    resetDataConfirm: "حذف",
    exportErrorTitle: "تعذر التصدير",
    exportCsvErrorDescription: "حدث خطأ أثناء إنشاء ملف CSV.",
    exportExcelErrorDescription: "حدث خطأ أثناء إنشاء ملف Excel."
  },
  onboarding: {
    welcome: {
      title: "تحكم في أموالك من مكان واحد",
      description: "سجّل الحسابات، الدخل، المصروفات، التحويلات، التذكيرات والخطط المالية من تطبيق محلي وخاص.",
      balanceCardTitle: "رصيدك يبدأ هنا",
      income: "الدخل",
      expenses: "المصروفات",
      start: "ابدأ"
    },
    setup: {
      stepLabel: "الخطوة {{step}} من {{total}}",
      title: "قم بإعداد تجربتك",
      description: "هذه الإجابات تخصص التطبيق لك دون إجبارك على إنشاء حساب."
    },
    stepOne: {
      mainCurrency: "العملة الرئيسية",
      calculateTotalNetWorth: "احسب كل أموالي",
      calculateTotalNetWorthDescription: "اجمع البنوك، النقد، العملات الرقمية والحسابات الأخرى في رصيد عام واحد.",
      userType: "نوع المستخدم"
    },
    stepTwo: {
      cryptoUsage: "استخدام العملات الرقمية",
      multiCurrencyUsage: "استخدام عدة عملات"
    },
    stepThree: {
      mainGoal: "الهدف الرئيسي",
      activateFinancialReminders: "تفعيل التذكيرات المالية",
      activateFinancialRemindersDescription: "سيساعدك هذا على تذكر المدفوعات، التحصيلات، المشتريات أو الادخار.",
      viewPlans: "عرض الخطط"
    },
    options: {
      userProfile: {
        personal: {
          label: "شخصي",
          description: "أريد إدارة أموالي الشخصية."
        },
        freelancer: {
          label: "مهني",
          description: "أحصل على دخل من المشاريع أو العملاء."
        },
        entrepreneur: {
          label: "رائد أعمال",
          description: "أدير أموال عمل تجاري أو مشروع."
        },
        investor: {
          label: "مستثمر",
          description: "أريد تتبع الأصول، العملات الرقمية أو الاستثمارات."
        },
        student: {
          label: "طالب",
          description: "أريد تنظيم المصروفات والادخار."
        }
      },
      cryptoUsage: {
        none: {
          label: "لا أستخدم العملات الرقمية",
          description: "لا أحتاج إلى حسابات مثل Binance أو MetaMask."
        },
        basic: {
          label: "نعم، أستخدم العملات الرقمية",
          description: "أريد تسجيل المنصات، المحافظ أو الأصول الرقمية."
        },
        advanced: {
          label: "أستخدم العملات الرقمية، لكنها ليست أولوية",
          description: "أريد تسجيل العملات الرقمية، لكنها ليست أهم شيء بالنسبة لي."
        }
      },
      multiCurrencyUsage: {
        none: {
          label: "أستخدم عملة واحدة",
          description: "أدير أموالي غالبًا بعملة واحدة."
        },
        occasional: {
          label: "أحيانًا",
          description: "أستخدم أحيانًا حسابات بعملات مختلفة."
        },
        frequent: {
          label: "بشكل متكرر",
          description: "أستخدم كثيرًا حسابات بعدة عملات."
        }
      },
      financialGoal: {
        control_expenses: {
          label: "التحكم في المصروفات",
          description: "أريد معرفة أين يذهب مالي."
        },
        save_more: {
          label: "ادخار المزيد",
          description: "أريد تخصيص المال للأهداف والاحتياطيات."
        },
        pay_debts: {
          label: "سداد الديون",
          description: "أريد تنظيم ديوني والمدفوعات المعلقة."
        },
        track_income: {
          label: "تتبع دخلي",
          description: "أريد التحكم بوضوح في مصادر دخلي."
        },
        understand_investments: {
          label: "فهم استثماراتي",
          description: "أريد تتبع أصولي، العملات الرقمية أو الاستثمارات بشكل أفضل."
        },
        avoid_small_expenses: {
          label: "تجنب المصروفات اليومية الصغيرة",
          description: "أريد تحديد المصروفات اليومية الصغيرة والتحكم بها."
        }
      }
    },
    plans: {
      title: "اختر كيف تريد البدء",
      description: "يمكنك استخدام التطبيق مجانًا وتفعيل الميزات المتقدمة لاحقًا.",
      continueWithPlus: "المتابعة مع Plus"
    }
  },
  budgets: {
    title: "الميزانيات",
    description: "حدد حدودًا شهرية للتحكم في مصروفاتك.",
    allCategoriesAlreadyBudgeted: "لقد أضفت حدودًا لجميع الفئات المتاحة بالفعل.",
    budgetedCategories: "فئات لها حدود",
    budgetOf: "ميزانية {{period}}",
    currentSpendingVsBudget: "المصروف الحالي مقارنة بحدك الشهري.",
    spent: "تم صرفه",
    limit: "الحد",
    limitedCategories: "فئات محددة",
    spentOfLimit: "{{spent}} من {{limit}}",
    currentEmptyTitle: "لا توجد لديك ميزانية لهذا الشهر",
    currentEmptyDescription: "أنشئ ميزانية لـ {{period}}.",
    createMonthlyBudget: "إنشاء ميزانية شهرية",
    historyTitle: "سجل الميزانيات",
    generalLimitValue: "الحد العام: {{amount}} {{currency}}",
    modalDescription: "حدد حدودًا للتحكم في مصروفاتك الشهرية.",
    status: {
      exceeded: "لقد تجاوزت ميزانيتك الشهرية.",
      warning: "أنت قريب من الوصول إلى ميزانيتك الشهرية.",
      safe: "مصروفاتك ضمن الميزانية.",
      used: "مستخدم",
      spentAmount: "تم صرف {{amount}}",
      limitAmount: "الحد: {{amount}}"
    },
    newBudget: "ميزانية جديدة",
    editBudget: "تعديل الميزانية",
    createBudget: "إنشاء ميزانية",
    saveBudget: "حفظ الميزانية",
    deleteBudget: "حذف الميزانية",
    monthLabel: "{{month}} {{year}}",
    generalMonthlyBudget: "الميزانية الشهرية العامة",
    generalBudgetPlaceholder: "مثال: 500",
    categoryBudgetTitle: "ميزانية حسب الفئة",
    categoryBudgetDescription: "أضف حدودًا فقط لفئات المصروفات التي تريد التحكم بها.",
    expenseCategory: "فئة المصروف",
    monthlyLimit: "الحد الشهري",
    monthlyLimitPlaceholder: "مثال: 120",
    addCategory: "إضافة فئة",
    removeCategory: "إزالة الفئة",
    budgetUsed: "الميزانية المستخدمة",
    remainingBudget: "الميزانية المتبقية",
    exceededBudget: "الميزانية المتجاوزة",
    emptyTitle: "لا توجد لديك ميزانيات بعد",
    emptyDescription: "أنشئ ميزانية شهرية للتحكم في مصروفاتك بشكل أفضل.",
    deleteTitle: "حذف الميزانية",
    deleteDescription: "سيتم حذف هذه الميزانية وحدود الفئات الخاصة بها.",
    errors: {
      generalRequired: "الميزانية العامة مطلوبة.",
      generalGreaterThanZero: "يجب أن تكون الميزانية العامة أكبر من 0.",
      categoryRequired: "اختر فئة.",
      categoryLimitRequired: "الحد الشهري مطلوب.",
      categoryLimitGreaterThanZero: "يجب أن يكون الحد الشهري أكبر من 0.",
      duplicatedCategory: "هذه الفئة لديها ميزانية مخصصة بالفعل."
    }
  },
  reminders: {
    title: "التذكيرات",
    description: "جدول المدفوعات، التحصيلات، المشتريات أو الاستثمارات.",
    newReminder: "تذكير جديد",
    saveReminder: "حفظ التذكير",
    createReminder: "إنشاء تذكير",
    completeTitle: "إكمال التذكير",
    completeDescription: "هل تريد وضع علامة على هذا التذكير كمكتمل؟",
    cancelTitle: "إلغاء التذكير",
    cancelDescription: "هل تريد إلغاء هذا التذكير؟",
    confirmCancel: "نعم، إلغاء",
    emptyTitle: "لا توجد لديك تذكيرات بعد",
    emptyDescription: "أنشئ تذكيرات للمدفوعات، التحصيلات، الاشتراكات، المشتريات أو الادخار.",
    complete: "إكمال",
    form: {
      title: "العنوان",
      titlePlaceholder: "مثال: دفع فاتورة الإنترنت",
      amountOptional: "مبلغ اختياري",
      amountPlaceholder: "0.00",
      type: "النوع",
      frequency: "التكرار",
      date: "التاريخ",
      time: "الوقت",
      relatedAccount: "الحساب المرتبط",
      descriptionOptional: "وصف اختياري",
      descriptionPlaceholder: "مثال: يستحق كل يوم 5 من الشهر...",
      titleRequired: "العنوان مطلوب.",
      amountInvalid: "يجب أن يكون المبلغ أكبر من أو يساوي 0.",
      futureDateRequired: "يجب أن يكون التاريخ في المستقبل."
    },
    card: {
      defaultType: "تذكير"
    },
    types: {
      payment: {
        label: "دفع",
        description: "خدمات، ديون، بطاقة أو التزامات للدفع."
      },
      collection: {
        label: "تحصيل",
        description: "مال يجب أن يدفعه لك شخص ما."
      },
      subscription: {
        label: "اشتراك",
        description: "Netflix أو Spotify أو البرامج أو المدفوعات المتكررة الأخرى."
      },
      saving: {
        label: "ادخار",
        description: "تذكير لتخصيص المال."
      },
      investment: {
        label: "استثمار",
        description: "شراء متكرر للأصول أو العملات الرقمية."
      },
      purchase: {
        label: "شراء",
        description: "عملية شراء مهمة مخطط لها."
      },
      custom: {
        label: "مخصص",
        description: "تذكير مالي مخصص."
      }
    },
    frequencies: {
      once: {
        label: "مرة واحدة",
        description: "سيتم إشعارك فقط في التاريخ المحدد."
      },
      daily: {
        label: "يوميًا",
        description: "سيتكرر كل يوم."
      },
      weekly: {
        label: "أسبوعيًا",
        description: "سيتكرر كل أسبوع."
      },
      monthly: {
        label: "شهريًا",
        description: "سيتكرر كل شهر."
      }
    }
  },
  plans: {
    title: "الخطط",
    description: "اختر الخطة التي تناسب طريقتك في تنظيم أموالك.",
    currentPlan: "الخطة الحالية",
    free: "مجانية",
    plus: "Plus",
    demoDescription: "ابدأ مجانًا وفعّل الميزات المتقدمة عندما تحتاج إليها.",
    monthlyPeriod: "شهريًا",
    yearlyAvailable: "متاح أيضًا مقابل ${{price}} سنويًا.",
    plusActive: "Plus مفعّل",
    activatePlusDemo: "تفعيل تجربة Plus",
    freeActive: "الخطة المجانية مفعّلة",
    backToFree: "العودة إلى المجانية",
    freePlan: {
      name: "مجانية",
      description: "مثالية للبدء في تنظيم أموالك الشخصية.",
      price: "$0",
      period: "للأبد",
      cta: "المتابعة مجانًا",
      current: "الخطة الحالية",
      features: {
        accountsLimit: "حتى 3 حسابات",
        movementsLimit: "حتى 30 معاملة شهريًا",
        basicStatistics: "إحصائيات أساسية",
        localData: "البيانات محفوظة محليًا"
      }
    },
    plusPlan: {
      name: "Plus",
      description: "للمستخدمين الذين يريدون تحكمًا ماليًا كاملًا.",
      price: "{{price}}",
      period: "شهريًا",
      cta: "تفعيل Plus",
      features: {
        unlimitedAccounts: "حسابات غير محدودة",
        unlimitedMovements: "معاملات غير محدودة",
        advancedStatistics: "إحصائيات متقدمة",
        budgets: "ميزانيات شهرية",
        reminders: "تذكيرات مالية",
        exportData: "تصدير البيانات",
        priorityFeatures: "الوصول إلى الميزات المتقدمة"
      }
    },
    restorePurchase: "استعادة الشراء",
    continueWithoutPlus: "المتابعة بدون Plus",
    errors: {
      purchaseUnavailable: "الشراء غير متاح حاليًا.",
      restoreUnavailable: "تعذرت استعادة الشراء حاليًا."
    },
    v2: {
      title: "اختر كيف تنمو مع Orvian",
      description: "ابدأ مجانًا وافتح الميزات المميزة عندما تحتاجها.",
      oneTimePayment: "دفعة واحدة",
      unlockPlus: "فتح Plus",
      plusActive: "Plus نشط",
      buyPack: "شراء الحزمة",
      included: "مضمّن",
      includedWithPlus: "مضمّن مع Plus",
      cardDesigns: {
        title: "تصاميم البطاقات",
        description: "اشترِ الحزم بشكل منفصل أو افتحها مع Plus."
      }
    },
    products: {
      plusLifetime: {
        description: "افتح الميزات المميزة المحلية بدفعة واحدة."
      },
      cardPacks: {
        dark: {
          description: "تصاميم داكنة وأنيقة لحساباتك."
        },
        luxury: {
          description: "تصاميم حصرية لتطبيق أكثر حضورًا."
        },
        crypto: {
          description: "تصاميم مستوحاة من الأصول الرقمية والمحافظ."
        },
        minimal: {
          description: "تصاميم بسيطة ونظيفة للحسابات الشخصية."
        }
      }
    }
  },
  categories: {
    salary: "راتب",
    freelance: "مشروع / عمل حر",
    sales: "مبيعات",
    business_income: "عمل تجاري",
    investment_income: "استثمار",
    gift_income: "هدية / دخل إضافي",
    refund: "استرداد",
    loan_received: "قرض مستلم",
    rental_income: "دخل إيجار",
    other_income: "دخل آخر",
    food: "طعام",
    groceries: "بقالة",
    restaurants: "مطاعم",
    transport: "نقل",
    fuel: "وقود",
    taxi_rideshare: "تاكسي / تطبيقات",
    housing: "سكن",
    rent: "إيجار",
    services: "خدمات",
    electricity: "كهرباء",
    water: "ماء",
    internet_phone: "إنترنت / هاتف",
    health: "صحة",
    medicine: "أدوية",
    education: "تعليم",
    entertainment: "ترفيه",
    subscriptions: "اشتراكات",
    technology: "تكنولوجيا",
    clothing: "ملابس",
    personal_care: "عناية شخصية",
    family: "عائلة",
    pets: "حيوانات أليفة",
    travel: "سفر",
    gifts: "هدايا",
    taxes: "ضرائب",
    fees: "رسوم",
    debt_payment: "سداد دين",
    savings: "ادخار",
    investment_expense: "استثمار",
    cash_withdrawal: "سحب نقدي",
    other: "أخرى"
  },
  tags: {
    essential: "أساسي",
    optional: "اختياري",
    urgent: "عاجل",
    recurring: "متكرر",
    planned: "مخطط",
    unplanned: "غير مخطط",
    cash: "نقد",
    card: "بطاقة",
    transfer: "تحويل",
    online: "عبر الإنترنت",
    subscription: "اشتراك",
    work: "عمل",
    personal: "شخصي",
    family: "عائلة",
    business: "عمل تجاري",
    tax: "ضريبة",
    invoice: "فاتورة",
    debt: "دين",
    savings: "ادخار",
    small_expense: "مصروف يومي صغير"
  },
  loans: {
    newLoan: "قرض جديد",
    form: {
      description: "تتبع الأموال التي تحتاج إلى دفعها أو تحصيلها.",
      title: "العنوان",
      titlePlaceholder: "مثال: قرض شخصي",
      titleRequired: "العنوان مطلوب.",
      personOrEntity: "الشخص أو الجهة",
      personOrEntityPlaceholder: "مثال: شخص، بنك، قريب",
      payable: "أحتاج إلى الدفع",
      receivable: "يجب أن يدفعوا لي",
      payableDescription: "مال تدين به.",
      receivableDescription: "مال مستحق لك.",
      amount: "المبلغ",
      amountPlaceholder: "0.00",
      amountRequired: "المبلغ مطلوب.",
      amountError: "أدخل مبلغًا أكبر من 0.",
      currency: "العملة",
      notes: "ملاحظات",
      notesPlaceholder: "تفاصيل اختيارية للقرض",
      createTitle: "إنشاء قرض"
    },
    payment: {
      remainingAmount: "المتبقي: {{amount}}",
      amount: "المبلغ",
      amountPlaceholder: "0.00",
      amountRequired: "المبلغ مطلوب.",
      amountError: "أدخل مبلغًا أكبر من 0 وأقل من أو يساوي {{amount}}.",
      note: "ملاحظة",
      notePlaceholder: "تفاصيل اختيارية للدفع أو التحصيل",
      pay: "دفع"
    }
  },
  transfers: {
    form: {
      fromAccountRequired: "اختر الحساب المصدر.",
      toAccountRequired: "اختر الحساب الوجهة.",
      sameAccountError: "يجب أن يكون الحساب المصدر والوجهة مختلفين.",
      exchangeRatePending: "حاليًا سيتم استخدام معدل 1:1. ستتم إضافة تحويل متقدم لاحقًا.",
      fromAccount: "الحساب المصدر",
      toAccount: "الحساب الوجهة",
      feeAmount: "الرسوم"
    }
  }
} as const;
