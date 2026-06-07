export const ja = {
  common: {
    appName: "Orvian",
    cancel: "キャンセル",
    save: "保存",
    edit: "編集",
    delete: "削除",
    close: "閉じる",
    continue: "続ける",
    back: "戻る",
    next: "次へ",
    confirm: "確認",
    apply: "適用",
    clear: "クリア",
    add: "追加",
    create: "作成",
    update: "更新",
    remove: "削除",
    search: "検索",
    select: "選択",
    loading: "読み込み中...",
    saving: "保存中...",
    exporting: "エクスポート中...",
    error: "エラー",
    success: "完了",
    required: "必須",
    optional: "任意",
    amount: "金額",
    date: "日付",
    time: "時間",
    title: "タイトル",
    description: "説明",
    note: "メモ",
    category: "カテゴリ",
    currency: "通貨",
    account: "口座",
    type: "種類",
    frequency: "頻度",
    freePlan: "無料プラン",
    plusPlan: "Plusプラン",
    month: "月",
    monthly: "毎月",
    total: "合計",
    balance: "残高",
    income: "収入",
    expense: "支出",
    transfer: "振替",
    commission: "手数料",
    noData: "データがありません",
    notAvailable: "利用できません",
    no: "いいえ",
    transfers: "送金"
  },
  tabs: {
    home: "ホーム",
    accounts: "口座",
    movements: "記録",
    statistics: "統計",
    settings: "設定",
    more: "その他",
    budgets: "予算",
    loans: "ローン"
  },
  home: {
    totalEstimated: "推定の合計金額",
    totalEstimatedBalance: "推定合計残高",
    monthlyExpenses: "今月の支出",
    monthlyIncome: "今月の収入",
    monthlyBalance: "今月の結果",
    available: "利用可能",
    accounts: "口座",
    upcomingReminders: "今後のリマインダー",
    viewAll: "すべて見る",
    noUpcomingReminders: "今後のリマインダーはありません。",
    recentActivity: "最近のアクティビティ",
    noRegisteredMovements: "まだ記録がありません。",
    noActivity: "まだアクティビティはありません。",
    viewAllAccounts: "すべて表示",
    monthlySummary: "月次サマリー"
  },
  accounts: {
    title: "口座",
    description: "銀行、現金、暗号資産、カード、ローンを登録できます。",
    newAccount: "新しい口座",
    firstAccount: "最初の口座を作成",
    createTitle: "新しい口座",
    editTitle: "口座を編集",
    emptyTitle: "まだ口座がありません",
    emptyDescription: "最初の口座を作成して、収入、支出、振替を記録しましょう。",
    freePlanRemaining: "無料プラン: 残り{{count}}口座を利用できます。",
    plusPlanUnlimited: "Plusプラン: 口座数は無制限です。",
    limitTitle: "無料口座の上限に達しました",
    limitDescription: "無料プランでは最大3つの口座を作成できます。Plusを有効にすると無制限に作成できます。",
    deleteTitle: "口座を削除",
    deleteDescription: "この口座は有効な一覧から非表示になります。過去の記録は保持されます。",
    saveAccount: "口座を保存",
    saveChanges: "変更を保存",
    card: {
      customAccount: "カスタム口座",
      currentBalance: "現在の残高",
      includedInTotal: "推定合計に含める",
      excludedFromTotal: "推定合計に含めない",
      options: "オプション"
    },
    form: {
      createTitle: "新しい口座",
      editTitle: "口座を編集",
      editDescription: "この口座の主な情報を更新します。",
      createDescription: "この口座の主な情報を設定します。",
      name: "口座名",
      namePlaceholder: "例: Pichincha銀行",
      currentBalance: "現在の残高",
      initialBalance: "初期残高",
      balancePlaceholder: "0.00",
      balanceEditInfo: "残高は口座編集ではなく、記録の追加によって更新されます。",
      type: "口座の種類",
      mainCurrency: "主な通貨",
      currencyCrypto: "暗号資産",
      currencyFiat: "通常の通貨",
      currencyCustom: "カスタム",
      currencyEditInfo: "記録履歴に問題が起きないよう、編集時に主な通貨は変更できません。",
      includeInTotal: "推定合計に追加",
      includeInTotalDescription: "この口座を合計残高に含めたい場合は有効にしてください。",
      initialBalanceRequired: "初期残高は必須です。残高がない場合は0を入力してください。",
      initialBalanceError: "初期残高はマイナスにできません。",
      nameRequired: "口座名は必須です。",
      institutionName: "銀行または機関",
      institutionNamePlaceholder: "例：銀行、Binance、Metamask",
      pinAccount: "重要として固定",
      pinAccountDescription: "口座画面で最初に表示されます。",
      cardDesign: "カードデザイン",
      cardDesignPlusOnly: "Plusでのみ利用できます。",
      steps: {
        0: {
          description: "まず口座の基本情報を設定します。"
        },
        1: {
          description: "次に残高、通貨、重要度を設定します。"
        },
        2: {
          description: "この口座カードの見た目を選択します。"
        }
      },
      cardDesignUpgradeMessage: "カードデザインをカスタマイズするにはPlusにアップグレードしてください。",
      isSavingsTarget: "貯蓄用の口座",
      isSavingsTargetDescription: "使いたくないお金を分けるために使用します。"
    },
    types: {
      bank: {
        label: "銀行",
        description: "通常の銀行口座です。"
      },
      cash: {
        label: "現金",
        description: "手元にある現金です。"
      },
      piggy_bank: {
        label: "貯金箱",
        description: "目標のために分けている現金や貯金です。"
      },
      crypto_exchange: {
        label: "暗号資産プラットフォーム",
        description: "Binanceなどの暗号資産プラットフォームの口座です。"
      },
      crypto_wallet: {
        label: "暗号資産ウォレット",
        description: "MetaMaskなど、暗号資産を保管するためのウォレットです。"
      },
      credit_card: {
        label: "クレジットカード",
        description: "利用中の残高や支払い予定があるカードです。"
      },
      loan_receivable: {
        label: "受け取る予定のお金",
        description: "他の人があなたに返す必要があるお金です。"
      },
      loan_payable: {
        label: "返す予定のお金",
        description: "あなたが返す必要があるお金です。"
      },
      custom: {
        label: "カスタム口座",
        description: "ユーザーが自由に定義した口座タイプです。"
      }
    },
    cardDesigns: {
      default: {
        label: "標準",
        description: "どの口座にも使えるシンプルなデザイン。"
      },
      minimal: {
        label: "ミニマル",
        description: "より控えめで落ち着いた表示。"
      },
      gradient: {
        label: "グラデーション",
        description: "よりモダンなビジュアルスタイル。"
      },
      blue: {
        label: "ブランドブルー",
        description: "Orvianのメインブルーを使用します。"
      },
      dark: {
        label: "ダーク",
        description: "ダークな外観の上品なスタイル。"
      },
      premium: {
        label: "プレミアム",
        description: "注目口座向けのより特別なデザイン。"
      }
    },
    groups: {
      regular: "通常",
      crypto: "暗号資産"
    },
    summary: {
      regularTotal: "通常口座の合計",
      cryptoTotal: "暗号資産の合計",
      accountCount: "{{count}} 件"
    },
    emptyCryptoAccounts: "暗号資産口座はまだありません。",
    emptyRegularAccounts: "通常口座はまだありません。",
    detail: {
      description: "この口座の情報と設定を管理します。",
      notFoundTitle: "口座が見つかりません",
      notFoundDescription: "この口座は存在しないか、アーカイブされています。",
      type: "種類",
      institution: "機関",
      mainCurrency: "主通貨",
      archiveTitle: "口座をアーカイブ",
      archiveDescription: "この口座はメインリストに表示されなくなりますが、データは保持されます。",
      archiveAction: "アーカイブ",
      settings: "設定",
      recentMovements: "最近の取引",
      recentMovementsDescription: "過去2か月の確定済みアクティビティ。",
      noRecentMovements: "この口座に最近の取引はありません。",
      actions: "操作",
      archive: "口座をアーカイブ",
      edit: "口座を編集",
      emptyActivity: "この口座に最近の取引はありません。",
      information: "情報",
      priority: "優先度",
      recentActivity: "最近のアクティビティ",
      totalEstimated: "推定合計",
      normal: "通常",
      pinned: "固定済み"
    }
  },
  movements: {
    title: "記録",
    description: "口座間の収入、支出、振替を記録します。",
    newMovement: "新しい記録",
    newTransfer: "新しい振替",
    registerMovement: "記録を追加",
    emptyTitle: "まだ記録がありません",
    emptyDescription: "最初の収入、支出、または振替を記録して、お金の履歴を作りましょう。",
    incomeExpense: "収入 / 支出",
    income: "収入",
    expense: "支出",
    transfer: "振替",
    freePlanRemaining: "無料プラン: 今月は残り{{count}}件の記録を追加できます。",
    plusPlanUnlimited: "Plusプラン: 記録数は無制限です。",
    firstCreateAccountTitle: "先に口座を作成してください",
    firstCreateAccountDescription: "収入や支出を記録するには、少なくとも1つの有効な口座が必要です。",
    limitTitle: "無料記録の上限に達しました",
    limitDescription: "無料プランでは月に最大30件の記録を追加できます。Plusを有効にすると無制限に記録できます。",
    deleteMovementTitle: "記録を削除",
    deleteMovementDescription: "この操作により、この記録で変動した残高が元に戻ります。",
    deleteTransferTitle: "振替を削除",
    deleteTransferDescription: "この操作により、この振替で変動した残高が元に戻ります。",
    editMovement: "記録を編集",
    editTransfer: "振替を編集",
    saveMovement: "記録を保存",
    saveTransfer: "振替を保存",
    form: {
      account: "口座",
      category: "カテゴリ",
      amount: "金額",
      tags: "タグ",
      note: "メモ",
      notePlaceholder: "任意のメモ",
      selectedAccountNotFound: "選択した口座は存在しません。",
      insufficientBalance: "この口座には十分なお金がありません。",
      createDescription: "確定した収入または支出を記録します。",
      amountRequired: "金額は0より大きい必要があります。",
      accountRequired: "口座を選択してください。",
      categoryRequired: "カテゴリを選択してください。",
      allTagsSelected: "利用可能なタグはすべて選択済みです。",
      accountCurrency: "通貨: {{currency}}"
    },
    card: {
      defaultTitle: "記録",
      deletedAccount: "削除された口座"
    },
    transferCard: {
      fromAccountFallback: "出金元口座",
      toAccountFallback: "入金先口座",
      sent: "送金済み",
      received: "受取済み",
      fee: "手数料",
      exchangeRate: "使用した為替: 1 {{fromCurrency}} = {{exchangeRate}} {{toCurrency}}"
    },
    transferForm: {
      fromAccount: "出金元口座",
      toAccount: "入金先口座",
      fromAmount: "送金額",
      toAmount: "受取額",
      note: "メモ",
      notePlaceholder: "例: 貯金口座への振替",
      differentAccountsRequired: "異なる口座を選択してください。",
      description: "口座間でお金を移動し、手数料や通貨換算を記録します。",
      fromAccountRequired: "出金元口座を選択してください。",
      toAccountRequired: "入金先口座を選択してください。",
      fromAmountRequired: "送金額は0より大きい必要があります。",
      toAmountRequired: "受取額は0より大きい必要があります。",
      feeInvalid: "手数料はマイナスにできません。",
      insufficientBalance: "この送金を行うには、送金元口座の残高が不足しています。",
      multiCurrencyBlockedByPlan: "無料プランでは、同じ通貨の口座間でのみ振替できます。",
      fromAmountWithCurrency: "送金額 {{currency}}",
      toAmountWithCurrency: "受取額 {{currency}}",
      feeAmountWithCurrency: "手数料 {{currency}}",
      calculatedExchangeRate: "計算された為替レート",
      multiCurrencyPlusTitle: "異なる通貨間の振替はPlusで利用できます",
      multiCurrencyPlusDescription: "無料プランでは、同じ通貨の口座間で振替できます。通貨換算を含む振替を行うにはPlusを有効にしてください。"
    },
    calculatorAmount: "取引金額",
    transferAmount: "送金額",
    emptyFilterTitle: "結果がありません",
    emptyFilterDescription: "他の取引を見るにはフィルターを変更してください。",
    newExpense: "新しい支出",
    newIncome: "新しい収入"
  },
  statistics: {
    title: "統計",
    description: "収入、支出、振替、カテゴリを確認します。",
    filters: "レポートフィルター",
    applyFilters: "フィルターを適用",
    clearFilters: "フィルターをクリア",
    filtersDescription: "期間、口座、カテゴリ、通貨を調整します。",
    cards: {
      income: "収入",
      expenses: "支出",
      transfers: "振替",
      commissions: "手数料",
      periodBalance: "期間の結果"
    },
    charts: {
      incomeVsExpense: "収入 vs 支出",
      incomeVsExpenseDescription: "入ったお金と出たお金の月別比較です。",
      balanceEvolution: "残高の推移",
      balanceEvolutionDescription: "最近の月の累積残高です。",
      topExpenseCategories: "支出が多いカテゴリ",
      topExpenseCategoriesDescription: "お金の出入りが多い支出カテゴリです。",
      budgetUsed: "使用した予算",
      budgetUsedDescription: "現在の月間予算の進み具合です。",
      expensesByCategory: "カテゴリ別支出",
      accountSummary: "口座サマリー"
    },
    empty: {
      noBudget: "このグラフを見るには月間予算を作成してください。",
      noMovements: "統計を見るには記録を追加してください。",
      noExpenses: "この期間にはまだ支出が記録されていません。",
      noIncome: "この期間にはまだ収入が記録されていません。",
      noIncomeExpenseChart: "グラフ化できる収入または支出データがありません。",
      noBalanceTrend: "残高の傾向を表示するには、まだ十分なデータがありません。",
      noExpenseCategoriesChart: "グラフ化できるカテゴリ別支出がありません。",
      noFilterDataTitle: "このフィルターではデータがありません",
      noFilterDataDescription: "期間を変更するか、記録を追加して統計を確認してください。",
      noExpensesForFilters: "このフィルターに該当する支出はありません。"
    },
    labels: {
      income: "収入",
      expenses: "支出",
      others: "その他",
      top: "上位",
      balance: "残高",
      used: "使用済み",
      spentAmount: "{{amount}} 使用済み",
      limitAmount: "上限: {{amount}}",
      noCategory: "カテゴリなし",
      balanceAmount: "残高: {{amount}}"
    }
  },
  reports: {
    export: {
      title: "サマリーをエクスポート",
      description: "口座、収入、支出、振替をファイルとしてダウンロードします。"
    },
    filters: {
      title: "フィルター",
      panelDescription: "分析したい期間とデータを調整します。",
      period: "期間",
      account: "口座",
      category: "カテゴリ",
      currency: "通貨",
      from: "開始",
      to: "終了",
      movementKind: "記録の種類"
    },
    periods: {
      current_month: {
        label: "今月",
        description: "今月の記録です。"
      },
      last_month: {
        label: "先月",
        description: "先月の記録です。"
      },
      last_3_months: {
        label: "過去3か月",
        description: "過去3か月の記録です。"
      },
      current_year: {
        label: "今年",
        description: "今年の記録です。"
      },
      custom: {
        label: "カスタム",
        description: "日付範囲を手動で選択します。"
      }
    },
    movementKinds: {
      all: {
        label: "すべて",
        description: "収入と支出。"
      },
      income: {
        label: "収入",
        description: "入ってきたお金のみ。"
      },
      expense: {
        label: "支出",
        description: "出ていったお金のみ。"
      }
    },
    accounts: {
      all: {
        label: "すべての口座",
        description: "すべての有効な口座を含めます。"
      }
    },
    categories: {
      all: {
        label: "すべてのカテゴリ",
        description: "カテゴリで絞り込みません。"
      }
    },
    currencies: {
      main: {
        label: "主な通貨",
        description: "サマリーに主な通貨を使用します。"
      }
    }
  },
  settings: {
    title: "設定",
    description: "体験、データ、プライバシー、プランを設定します。",
    appearance: "表示",
    theme: "テーマ",
    currentTheme: "現在のテーマ: {{theme}}",
    themeModes: {
      system: "システム",
      dark: "ダーク",
      light: "ライト"
    },
    language: "言語",
    languageDescription: "Orvianの表示言語を選択します。",
    languagePickerLabel: "言語",
    currentPlan: "現在のプラン",
    currentPlanDescription: "現在、{{plan}}プランを使用しています。",
    freePlanName: "無料",
    viewPlans: "プランを見る",
    shortcuts: "ショートカット",
    viewBudgets: "予算を見る",
    viewReminders: "リマインダーを見る",
    privacy: "プライバシー",
    privacyDescription: "Orvian内でデータがどのように扱われるか確認します。",
    privacyPolicy: "プライバシーポリシー",
    openPrivacyPolicy: "プライバシーポリシーを見る",
    exportData: "データをエクスポート",
    exportDescription: "口座、記録、振替のファイルを生成します。",
    exporting: "エクスポート中...",
    exportCsv: "CSVをエクスポート",
    exportExcel: "Excelをエクスポート",
    importData: "データをインポート",
    importDescription: "CSVファイルから記録を読み込みます。",
    localData: "ローカルデータ",
    localDataDescription: "データはこのデバイスに保存されます。今後、アカウント同期を有効にできるようになる予定です。",
    viewOnboardingAgain: "はじめの説明をもう一度見る",
    resetData: "ローカルデータを削除",
    about: "Orvianについて",
    aboutDescription: "Orvianは、口座、支出、予算、個人サマリーを整理するのに役立ちます。",
    app: "アプリ",
    version: "バージョン",
    developer: "開発者",
    visitDeveloperWebsite: "開発者のサイトを見る",
    linkErrorTitle: "リンクを開けませんでした",
    linkErrorDescription: "現在、このデバイスではこのウェブサイトを開けません。",
    privacyLinkErrorDescription: "現在、このデバイスではプライバシーポリシーを開けません。",
    resetDataTitle: "ローカルデータを削除",
    resetDataDescription: "このデバイスに保存されている口座、記録、振替、リマインダー、設定が削除されます。",
    resetDataConfirm: "削除",
    exportErrorTitle: "エクスポートできませんでした",
    exportCsvErrorDescription: "CSVファイルの生成中にエラーが発生しました。",
    exportExcelErrorDescription: "Excelファイルの生成中にエラーが発生しました。"
  },
  onboarding: {
    welcome: {
      title: "お金を一か所で管理",
      description: "ローカルでプライベートなアプリから、口座、収入、支出、振替、リマインダー、資金計画を登録できます。",
      balanceCardTitle: "あなたの残高はここから始まります",
      income: "収入",
      expenses: "支出",
      start: "開始"
    },
    setup: {
      stepLabel: "ステップ {{step}} / {{total}}",
      title: "体験を設定",
      description: "これらの回答により、アカウント作成を強制せずにアプリをあなた向けに調整します。"
    },
    stepOne: {
      mainCurrency: "主な通貨",
      calculateTotalNetWorth: "すべてのお金を計算",
      calculateTotalNetWorthDescription: "銀行、現金、暗号資産、その他の口座をまとめて全体の残高として表示します。",
      userType: "ユーザータイプ"
    },
    stepTwo: {
      cryptoUsage: "暗号資産の利用",
      multiCurrencyUsage: "複数通貨の利用"
    },
    stepThree: {
      mainGoal: "主な目的",
      activateFinancialReminders: "お金のリマインダーを有効にする",
      activateFinancialRemindersDescription: "支払い、受け取り、購入、貯金を忘れないようにします。",
      viewPlans: "プランを見る"
    },
    options: {
      userProfile: {
        personal: {
          label: "個人",
          description: "個人のお金を管理したい。"
        },
        freelancer: {
          label: "プロフェッショナル",
          description: "プロジェクトや顧客から収入を得ています。"
        },
        entrepreneur: {
          label: "起業家",
          description: "ビジネスや事業のお金を管理しています。"
        },
        investor: {
          label: "投資家",
          description: "資産、暗号資産、投資を追跡したい。"
        },
        student: {
          label: "学生",
          description: "支出と貯金を整理したい。"
        }
      },
      cryptoUsage: {
        none: {
          label: "暗号資産は使わない",
          description: "BinanceやMetaMaskのような口座は必要ありません。"
        },
        basic: {
          label: "はい、暗号資産を使います",
          description: "プラットフォーム、ウォレット、デジタル資産を登録したい。"
        },
        advanced: {
          label: "暗号資産は使うが優先ではない",
          description: "暗号資産を登録したいが、最も重要な目的ではありません。"
        }
      },
      multiCurrencyUsage: {
        none: {
          label: "1つの通貨を使う",
          description: "主に1つの通貨でお金を管理します。"
        },
        occasional: {
          label: "ときどき",
          description: "たまに異なる通貨の口座を使います。"
        },
        frequent: {
          label: "よく使う",
          description: "複数通貨の口座を頻繁に使います。"
        }
      },
      financialGoal: {
        control_expenses: {
          label: "支出を管理する",
          description: "お金がどこに使われているか知りたい。"
        },
        save_more: {
          label: "もっと貯金する",
          description: "目標や予備資金のためにお金を分けたい。"
        },
        pay_debts: {
          label: "借金を返す",
          description: "借金や未払いの支払いを整理したい。"
        },
        track_income: {
          label: "収入を把握する",
          description: "収入源をわかりやすく管理したい。"
        },
        understand_investments: {
          label: "投資を理解する",
          description: "資産、暗号資産、投資をよりよく追跡したい。"
        },
        avoid_small_expenses: {
          label: "小さな日々の支出を減らす",
          description: "日々の小さな支出を見つけて管理したい。"
        }
      }
    },
    plans: {
      title: "開始方法を選択",
      description: "アプリは無料で使い始められ、必要になったら高度な機能を有効にできます。",
      continueWithPlus: "Plusで続行"
    },
    v2: {
      control: {
        title: "お金をシンプルに管理",
        description: "口座、残高、取引をひとつの場所で整理できます。"
      },
      movements: {
        title: "支出と収入をすばやく記録",
        description: "電卓のような高速フォームで、少ない手間でお金を記録できます。"
      }
    }
  },
  budgets: {
    title: "予算",
    description: "支出を管理するために月間上限を設定します。",
    allCategoriesAlreadyBudgeted: "利用可能なすべてのカテゴリに上限を追加済みです。",
    budgetedCategories: "予算が設定されたカテゴリ",
    budgetOf: "{{period}}の予算",
    currentSpendingVsBudget: "現在の支出と月間予算の比較。",
    spent: "使用済み",
    limit: "上限",
    limitedCategories: "上限付きカテゴリ",
    spentOfLimit: "{{limit}}中{{spent}}",
    currentEmptyTitle: "今月の予算がありません",
    currentEmptyDescription: "{{period}}の予算を作成してください。",
    createMonthlyBudget: "月間予算を作成",
    historyTitle: "予算履歴",
    generalLimitValue: "全体上限: {{amount}} {{currency}}",
    modalDescription: "月々の支出を管理するために上限を設定します。",
    status: {
      exceeded: "月間予算を超えました。",
      warning: "月間予算の上限に近づいています。",
      safe: "支出は予算内に収まっています。",
      used: "使用済み",
      spentAmount: "{{amount}} 使用済み",
      limitAmount: "上限: {{amount}}"
    },
    newBudget: "新しい予算",
    editBudget: "予算を編集",
    createBudget: "予算を作成",
    saveBudget: "予算を保存",
    deleteBudget: "予算を削除",
    monthLabel: "{{month}} {{year}}",
    generalMonthlyBudget: "全体の月間予算",
    generalBudgetPlaceholder: "例: 500",
    categoryBudgetTitle: "カテゴリ別予算",
    categoryBudgetDescription: "管理したい支出カテゴリにだけ上限を追加します。",
    expenseCategory: "支出カテゴリ",
    monthlyLimit: "月間上限",
    monthlyLimitPlaceholder: "例: 120",
    addCategory: "カテゴリを追加",
    removeCategory: "カテゴリを削除",
    budgetUsed: "使用した予算",
    remainingBudget: "残り予算",
    exceededBudget: "超過した予算",
    emptyTitle: "まだ予算がありません",
    emptyDescription: "支出をよりよく管理するために月間予算を作成しましょう。",
    deleteTitle: "予算を削除",
    deleteDescription: "この予算とカテゴリ別の上限が削除されます。",
    errors: {
      generalRequired: "全体予算は必須です。",
      generalGreaterThanZero: "全体予算は0より大きい必要があります。",
      categoryRequired: "カテゴリを選択してください。",
      categoryLimitRequired: "月間上限は必須です。",
      categoryLimitGreaterThanZero: "月間上限は0より大きい必要があります。",
      duplicatedCategory: "このカテゴリにはすでに予算が設定されています。"
    }
  },
  reminders: {
    title: "リマインダー",
    description: "支払い、受け取り、購入、投資を予定します。",
    newReminder: "新しいリマインダー",
    saveReminder: "リマインダーを保存",
    createReminder: "リマインダーを作成",
    completeTitle: "リマインダーを完了",
    completeDescription: "このリマインダーを完了としてマークしますか？",
    cancelTitle: "リマインダーをキャンセル",
    cancelDescription: "このリマインダーをキャンセルしますか？",
    confirmCancel: "はい、キャンセル",
    emptyTitle: "まだリマインダーがありません",
    emptyDescription: "支払い、受け取り、サブスクリプション、購入、貯金のリマインダーを作成しましょう。",
    complete: "完了",
    form: {
      title: "タイトル",
      titlePlaceholder: "例: インターネット料金を支払う",
      amountOptional: "任意の金額",
      amountPlaceholder: "0.00",
      type: "種類",
      frequency: "頻度",
      date: "日付",
      time: "時間",
      relatedAccount: "関連口座",
      descriptionOptional: "任意の説明",
      descriptionPlaceholder: "例: 毎月5日が支払期限...",
      titleRequired: "タイトルは必須です。",
      amountInvalid: "金額は0以上である必要があります。",
      futureDateRequired: "日付は未来の日付である必要があります。"
    },
    card: {
      defaultType: "リマインダー"
    },
    types: {
      payment: {
        label: "支払い",
        description: "サービス、借金、カード、支払い予定の管理。"
      },
      collection: {
        label: "受け取り",
        description: "誰かがあなたに支払う必要があるお金。"
      },
      subscription: {
        label: "サブスクリプション",
        description: "Netflix、Spotify、ソフトウェアなどの定期支払い。"
      },
      saving: {
        label: "貯金",
        description: "お金を分けるためのリマインダー。"
      },
      investment: {
        label: "投資",
        description: "資産や暗号資産の定期購入。"
      },
      purchase: {
        label: "購入",
        description: "予定している重要な購入。"
      },
      custom: {
        label: "カスタム",
        description: "カスタムのお金のリマインダー。"
      }
    },
    frequencies: {
      once: {
        label: "1回のみ",
        description: "選択した日付にのみ通知されます。"
      },
      daily: {
        label: "毎日",
        description: "毎日繰り返されます。"
      },
      weekly: {
        label: "毎週",
        description: "毎週繰り返されます。"
      },
      monthly: {
        label: "毎月",
        description: "毎月繰り返されます。"
      }
    }
  },
  plans: {
    title: "プラン",
    description: "あなたのお金の管理方法に合ったプランを選択してください。",
    currentPlan: "現在のプラン",
    free: "無料",
    plus: "Plus",
    demoDescription: "無料で始めて、必要になったら高度な機能を有効にできます。",
    monthlyPeriod: "月額",
    yearlyAvailable: "年額 ${{price}} でも利用できます。",
    plusActive: "Plus有効",
    activatePlusDemo: "Plusデモを有効化",
    freeActive: "無料プラン有効",
    backToFree: "無料プランに戻す",
    freePlan: {
      name: "無料",
      description: "個人のお金を整理し始めるのに最適です。",
      price: "$0",
      period: "ずっと無料",
      cta: "無料で続ける",
      current: "現在のプラン",
      features: {
        accountsLimit: "最大3口座",
        movementsLimit: "月に最大30件の記録",
        basicStatistics: "基本統計",
        localData: "ローカル保存データ"
      }
    },
    plusPlan: {
      name: "Plus",
      description: "お金をしっかり管理したいユーザー向けです。",
      price: "{{price}}",
      period: "月額",
      cta: "Plusを有効化",
      features: {
        unlimitedAccounts: "口座数無制限",
        unlimitedMovements: "記録数無制限",
        advancedStatistics: "高度な統計",
        budgets: "月間予算",
        reminders: "お金のリマインダー",
        exportData: "データのエクスポート",
        priorityFeatures: "高度な機能へのアクセス"
      }
    },
    restorePurchase: "購入を復元",
    continueWithoutPlus: "Plusなしで続ける",
    errors: {
      purchaseUnavailable: "現在、購入は利用できません。",
      restoreUnavailable: "現在、購入を復元できませんでした。"
    },
    v2: {
      title: "Orvianで成長する方法を選択",
      description: "無料で始めて、必要なときにプレミアム機能を解除できます。",
      oneTimePayment: "一回払い",
      unlockPlus: "Plusを解除",
      plusActive: "Plus有効",
      buyPack: "パックを購入",
      included: "含まれています",
      includedWithPlus: "Plusに含まれています",
      cardDesigns: {
        title: "カードデザイン",
        description: "個別パックを購入するか、Plusで解除できます。"
      },
      legacy: {
        title: "初期ユーザー特典",
        description: "一般公開前にOrvianを試していただきありがとうございます。",
        benefit: "一時的なPlusアクセスとPlus Lifetimeを維持するための特別割引があります。",
        temporaryUntil: "一時アクセス予定日: {{date}} まで"
      },
      pro: {
        title: "近日公開：Orvian Pro",
        description: "金融AI、クラウド同期、バックアップ、複数デバイス対応は別の月額プランに含まれます。"
      }
    },
    products: {
      plusLifetime: {
        description: "一回限りの支払いでローカルのプレミアム機能を解除できます。"
      },
      cardPacks: {
        dark: {
          description: "アカウント用のダークで上品なデザイン。"
        },
        luxury: {
          description: "より存在感のあるアプリのための特別なデザイン。"
        },
        crypto: {
          description: "デジタル資産とウォレットに着想を得たデザイン。"
        },
        minimal: {
          description: "個人アカウント向けのシンプルで洗練されたデザイン。"
        }
      }
    }
  },
  categories: {
    salary: "給与",
    freelance: "プロジェクト / フリーランス",
    sales: "売上",
    business_income: "ビジネス",
    investment_income: "投資",
    gift_income: "ギフト / 臨時収入",
    refund: "返金",
    loan_received: "受け取ったローン",
    rental_income: "家賃収入",
    other_income: "その他の収入",
    food: "食費",
    groceries: "食料品",
    restaurants: "レストラン",
    transport: "交通",
    fuel: "燃料",
    taxi_rideshare: "タクシー / 配車アプリ",
    housing: "住居",
    rent: "家賃",
    services: "サービス",
    electricity: "電気",
    water: "水道",
    internet_phone: "インターネット / 電話",
    health: "健康",
    medicine: "薬",
    education: "教育",
    entertainment: "娯楽",
    subscriptions: "サブスクリプション",
    technology: "テクノロジー",
    clothing: "衣服",
    personal_care: "身だしなみ",
    family: "家族",
    pets: "ペット",
    travel: "旅行",
    gifts: "ギフト",
    taxes: "税金",
    fees: "手数料",
    debt_payment: "借金の支払い",
    savings: "貯金",
    investment_expense: "投資",
    cash_withdrawal: "現金引き出し",
    other: "その他"
  },
  tags: {
    essential: "必須",
    optional: "任意",
    urgent: "緊急",
    recurring: "定期",
    planned: "予定済み",
    unplanned: "予定外",
    cash: "現金",
    card: "カード",
    transfer: "振替",
    online: "オンライン",
    subscription: "サブスクリプション",
    work: "仕事",
    personal: "個人",
    family: "家族",
    business: "ビジネス",
    tax: "税金",
    invoice: "請求書",
    debt: "借金",
    savings: "貯金",
    small_expense: "小さな日々の支出"
  },
  loans: {
    newLoan: "新しいローン",
    form: {
      description: "支払う必要があるお金や受け取るお金を記録します。",
      title: "タイトル",
      titlePlaceholder: "例：個人ローン",
      titleRequired: "タイトルは必須です。",
      personOrEntity: "個人または団体",
      personOrEntityPlaceholder: "例：友人、銀行、家族",
      payable: "支払う必要がある",
      receivable: "受け取る予定",
      payableDescription: "あなたが支払うべきお金。",
      receivableDescription: "あなたに支払われるべきお金。",
      amount: "金額",
      amountPlaceholder: "0.00",
      amountRequired: "金額は必須です。",
      amountError: "0より大きい金額を入力してください。",
      currency: "通貨",
      notes: "メモ",
      notesPlaceholder: "ローンの任意の詳細",
      createTitle: "ローンを作成"
    },
    payment: {
      remainingAmount: "残り: {{amount}}",
      amount: "金額",
      amountPlaceholder: "0.00",
      amountRequired: "金額は必須です。",
      amountError: "0より大きく{{amount}}以下の金額を入力してください。",
      note: "メモ",
      notePlaceholder: "支払いまたは回収の任意の詳細",
      pay: "支払う"
    }
  },
  transfers: {
    form: {
      fromAccountRequired: "送金元口座を選択してください。",
      toAccountRequired: "送金先口座を選択してください。",
      sameAccountError: "送金元と送金先の口座は異なる必要があります。",
      exchangeRatePending: "現在は1:1のレートが使用されます。高度な為替機能は後で追加されます。",
      fromAccount: "送金元口座",
      toAccount: "送金先口座",
      feeAmount: "手数料"
    }
  }
} as const;
