export const vi = {
  common: {
    appName: "Orvian",
    cancel: "Hủy",
    save: "Lưu",
    edit: "Chỉnh sửa",
    delete: "Xóa",
    close: "Đóng",
    continue: "Tiếp tục",
    back: "Quay lại",
    next: "Tiếp theo",
    confirm: "Xác nhận",
    apply: "Áp dụng",
    clear: "Xóa sạch",
    add: "Thêm",
    create: "Tạo",
    update: "Cập nhật",
    remove: "Gỡ bỏ",
    search: "Tìm kiếm",
    select: "Chọn",
    loading: "Đang tải...",
    saving: "Đang lưu...",
    exporting: "Đang xuất...",
    error: "Lỗi",
    success: "Hoàn tất",
    required: "Bắt buộc",
    optional: "Không bắt buộc",
    amount: "Số tiền",
    date: "Ngày",
    time: "Giờ",
    title: "Tiêu đề",
    description: "Mô tả",
    note: "Ghi chú",
    category: "Danh mục",
    currency: "Tiền tệ",
    account: "Tài khoản",
    type: "Loại",
    frequency: "Tần suất",
    freePlan: "Gói miễn phí",
    plusPlan: "Gói Plus",
    month: "Tháng",
    monthly: "Hằng tháng",
    total: "Tổng",
    balance: "Số dư",
    income: "Thu nhập",
    expense: "Chi tiêu",
    transfer: "Chuyển khoản",
    commission: "Phí",
    noData: "Không có dữ liệu",
    notAvailable: "Không khả dụng",
    no: "Không",
    transfers: "Chuyển khoản",
    skip: "Bỏ qua",
    understood: "Đã hiểu"
  },
  tabs: {
    home: "Trang chủ",
    accounts: "Tài khoản",
    movements: "Giao dịch",
    statistics: "Thống kê",
    settings: "Cài đặt",
    more: "Thêm",
    budgets: "Ngân sách",
    loans: "Khoản vay"
  },
  home: {
    totalEstimated: "Tổng tiền ước tính",
    totalEstimatedBalance: "Tổng số dư ước tính",
    monthlyExpenses: "Chi tiêu trong tháng",
    monthlyIncome: "Thu nhập trong tháng",
    monthlyBalance: "Kết quả trong tháng",
    available: "Có sẵn",
    accounts: "Tài khoản",
    upcomingReminders: "Nhắc nhở sắp tới",
    viewAll: "Xem tất cả",
    noUpcomingReminders: "Bạn không có nhắc nhở sắp tới.",
    recentActivity: "Hoạt động gần đây",
    noRegisteredMovements: "Bạn chưa đăng ký giao dịch nào.",
    noActivity: "Chưa có hoạt động.",
    viewAllAccounts: "Xem tất cả",
    monthlySummary: "Tóm tắt hằng tháng"
  },
  accounts: {
    title: "Tài khoản",
    description: "Đăng ký ngân hàng, tiền mặt, tiền mã hóa, thẻ và khoản vay.",
    newAccount: "Tài khoản mới",
    firstAccount: "Tạo tài khoản đầu tiên",
    createTitle: "Tài khoản mới",
    editTitle: "Chỉnh sửa tài khoản",
    emptyTitle: "Bạn chưa có tài khoản nào",
    emptyDescription: "Tạo tài khoản đầu tiên để bắt đầu ghi lại thu nhập, chi tiêu và chuyển khoản.",
    freePlanRemaining: "Gói miễn phí: còn {{count}} tài khoản khả dụng.",
    plusPlanUnlimited: "Gói Plus: tài khoản không giới hạn.",
    limitTitle: "Bạn đã đạt giới hạn tài khoản miễn phí",
    limitDescription: "Gói miễn phí cho phép tối đa 3 tài khoản. Kích hoạt Plus để tạo tài khoản không giới hạn.",
    deleteTitle: "Xóa tài khoản",
    deleteDescription: "Tài khoản này sẽ được ẩn khỏi danh sách đang hoạt động. Lịch sử giao dịch sẽ được giữ lại.",
    saveAccount: "Lưu tài khoản",
    saveChanges: "Lưu thay đổi",
    card: {
      customAccount: "Tài khoản tùy chỉnh",
      currentBalance: "Số dư hiện tại",
      includedInTotal: "Được tính vào tổng ước tính",
      excludedFromTotal: "Không tính vào tổng ước tính",
      options: "Tùy chọn"
    },
    form: {
      createTitle: "Tài khoản mới",
      editTitle: "Chỉnh sửa tài khoản",
      editDescription: "Cập nhật thông tin chính của tài khoản này.",
      createDescription: "Thiết lập thông tin chính của tài khoản này.",
      name: "Tên tài khoản",
      namePlaceholder: "VD: Ngân hàng Pichincha",
      currentBalance: "Số dư hiện tại",
      initialBalance: "Số dư ban đầu",
      balancePlaceholder: "0.00",
      balanceEditInfo: "Số dư được cập nhật bằng cách đăng ký giao dịch, không phải bằng cách chỉnh sửa tài khoản.",
      type: "Loại tài khoản",
      mainCurrency: "Tiền tệ chính",
      currencyCrypto: "Tiền mã hóa",
      currencyFiat: "Tiền truyền thống",
      currencyCustom: "Tùy chỉnh",
      currencyEditInfo: "Không thể thay đổi tiền tệ chính khi chỉnh sửa để tránh làm sai lịch sử giao dịch.",
      includeInTotal: "Thêm vào tổng ước tính",
      includeInTotalDescription: "Bật tùy chọn này nếu bạn muốn tài khoản này được cộng vào tổng số dư của bạn.",
      initialBalanceRequired: "Số dư ban đầu là bắt buộc. Nhập 0 nếu tài khoản không có số dư.",
      initialBalanceError: "Số dư ban đầu không được âm.",
      nameRequired: "Tên tài khoản là bắt buộc.",
      institutionName: "Ngân hàng hoặc tổ chức",
      institutionNamePlaceholder: "VD: ngân hàng, Binance, Metamask",
      pinAccount: "Ghim là quan trọng",
      pinAccountDescription: "Tài khoản này sẽ hiển thị đầu tiên trong màn hình tài khoản.",
      cardDesign: "Thiết kế thẻ",
      cardDesignPlusOnly: "Chỉ có trong gói Plus.",
      steps: {
        0: {
          description: "Trước tiên hãy xác định thông tin tài khoản."
        },
        1: {
          description: "Bây giờ thiết lập số dư, tiền tệ và mức quan trọng."
        },
        2: {
          description: "Chọn giao diện thẻ của tài khoản này."
        }
      },
      cardDesignUpgradeMessage: "Nâng cấp lên Plus để tùy chỉnh thiết kế thẻ.",
      isSavingsTarget: "Tài khoản dùng để tiết kiệm",
      isSavingsTargetDescription: "Dùng để tách số tiền bạn không muốn chi tiêu."
    },
    types: {
      bank: {
        label: "Ngân hàng",
        description: "Tài khoản ngân hàng truyền thống."
      },
      cash: {
        label: "Tiền mặt",
        description: "Tiền mặt hiện có."
      },
      piggy_bank: {
        label: "Ống tiết kiệm",
        description: "Tiền tiết kiệm vật lý hoặc được tách riêng cho một mục tiêu."
      },
      crypto_exchange: {
        label: "Nền tảng tiền mã hóa",
        description: "Tài khoản trong các ứng dụng như Binance hoặc nền tảng tiền mã hóa khác."
      },
      crypto_wallet: {
        label: "Ví tiền mã hóa",
        description: "Ví như MetaMask hoặc các ứng dụng khác để lưu trữ tiền mã hóa."
      },
      credit_card: {
        label: "Thẻ tín dụng",
        description: "Thẻ có nợ hoặc hạn mức tín dụng đã sử dụng."
      },
      loan_receivable: {
        label: "Khoản cho vay cần thu",
        description: "Tiền mà người khác đang nợ bạn."
      },
      loan_payable: {
        label: "Khoản vay cần trả",
        description: "Tiền bạn cần trả lại."
      },
      custom: {
        label: "Tài khoản tùy chỉnh",
        description: "Loại tài khoản do người dùng tự định nghĩa."
      }
    },
    cardDesigns: {
      default: {
        label: "Tiêu chuẩn",
        description: "Thiết kế gọn gàng cho mọi tài khoản."
      },
      minimal: {
        label: "Tối giản",
        description: "Tinh tế và kín đáo hơn."
      },
      gradient: {
        label: "Chuyển màu",
        description: "Phong cách hiện đại hơn."
      },
      blue: {
        label: "Xanh thương hiệu",
        description: "Dùng màu xanh chính của Orvian."
      },
      dark: {
        label: "Tối",
        description: "Phong cách thanh lịch với giao diện tối."
      },
      premium: {
        label: "Premium",
        description: "Thiết kế độc quyền hơn cho các tài khoản nổi bật."
      }
    },
    groups: {
      regular: "Truyền thống",
      crypto: "Crypto"
    },
    summary: {
      regularTotal: "Tổng truyền thống",
      cryptoTotal: "Tổng crypto",
      accountCount: "{{count}} tài khoản"
    },
    emptyCryptoAccounts: "Bạn chưa có tài khoản crypto.",
    emptyRegularAccounts: "Bạn chưa có tài khoản truyền thống.",
    detail: {
      description: "Quản lý thông tin và cài đặt của tài khoản này.",
      notFoundTitle: "Không tìm thấy tài khoản",
      notFoundDescription: "Tài khoản này không còn tồn tại hoặc đã được lưu trữ.",
      type: "Loại",
      institution: "Tổ chức",
      mainCurrency: "Tiền tệ chính",
      archiveTitle: "Lưu trữ tài khoản",
      archiveDescription: "Tài khoản này sẽ không còn xuất hiện trong danh sách chính, nhưng dữ liệu sẽ được giữ lại.",
      archiveAction: "Lưu trữ",
      settings: "Cài đặt",
      recentMovements: "Giao dịch gần đây",
      recentMovementsDescription: "Hoạt động đã xác nhận trong 2 tháng gần đây.",
      noRecentMovements: "Không có giao dịch gần đây trong tài khoản này.",
      actions: "Hành động",
      archive: "Lưu trữ tài khoản",
      edit: "Chỉnh sửa tài khoản",
      emptyActivity: "Không có giao dịch gần đây trong tài khoản này.",
      information: "Thông tin",
      priority: "Mức ưu tiên",
      recentActivity: "Hoạt động gần đây",
      totalEstimated: "Tổng ước tính",
      normal: "Bình thường",
      pinned: "Đã ghim"
    }
  },
  movements: {
    title: "Giao dịch",
    description: "Đăng ký thu nhập, chi tiêu và chuyển khoản giữa các tài khoản của bạn.",
    newMovement: "Giao dịch mới",
    newTransfer: "Chuyển khoản mới",
    registerMovement: "Đăng ký giao dịch",
    emptyTitle: "Bạn chưa có giao dịch nào",
    emptyDescription: "Đăng ký thu nhập, chi tiêu hoặc chuyển khoản đầu tiên để bắt đầu tạo lịch sử tài chính của bạn.",
    incomeExpense: "Thu nhập / Chi tiêu",
    income: "Thu nhập",
    expense: "Chi tiêu",
    transfer: "Chuyển khoản",
    freePlanRemaining: "Gói miễn phí: còn {{count}} giao dịch trong tháng này.",
    plusPlanUnlimited: "Gói Plus: giao dịch không giới hạn.",
    firstCreateAccountTitle: "Hãy tạo tài khoản trước",
    firstCreateAccountDescription: "Bạn cần ít nhất một tài khoản đang hoạt động để đăng ký thu nhập hoặc chi tiêu.",
    limitTitle: "Bạn đã đạt giới hạn giao dịch miễn phí",
    limitDescription: "Gói miễn phí cho phép tối đa 30 giao dịch mỗi tháng. Kích hoạt Plus để đăng ký giao dịch không giới hạn.",
    deleteMovementTitle: "Xóa giao dịch",
    deleteMovementDescription: "Hành động này sẽ hoàn lại số dư đã bị ảnh hưởng bởi giao dịch này.",
    deleteTransferTitle: "Xóa chuyển khoản",
    deleteTransferDescription: "Hành động này sẽ hoàn lại các số dư đã bị ảnh hưởng bởi chuyển khoản này.",
    editMovement: "Chỉnh sửa giao dịch",
    editTransfer: "Chỉnh sửa chuyển khoản",
    saveMovement: "Lưu giao dịch",
    saveTransfer: "Lưu chuyển khoản",
    form: {
      account: "Tài khoản",
      category: "Danh mục",
      amount: "Số tiền",
      tags: "Thẻ",
      note: "Ghi chú",
      notePlaceholder: "Ghi chú tùy chọn",
      selectedAccountNotFound: "Tài khoản đã chọn không tồn tại.",
      insufficientBalance: "Bạn không có đủ tiền trong tài khoản này.",
      createDescription: "Đăng ký một khoản thu nhập hoặc chi tiêu đã xác nhận.",
      amountRequired: "Số tiền phải lớn hơn 0.",
      accountRequired: "Chọn một tài khoản.",
      categoryRequired: "Chọn một danh mục.",
      allTagsSelected: "Bạn đã chọn tất cả các thẻ có sẵn.",
      accountCurrency: "Tiền tệ: {{currency}}"
    },
    card: {
      defaultTitle: "Giao dịch",
      deletedAccount: "Tài khoản đã xóa"
    },
    transferCard: {
      fromAccountFallback: "Tài khoản nguồn",
      toAccountFallback: "Tài khoản đích",
      sent: "Đã gửi",
      received: "Đã nhận",
      fee: "Phí",
      exchangeRate: "Tỷ giá đã dùng: 1 {{fromCurrency}} = {{exchangeRate}} {{toCurrency}}"
    },
    transferForm: {
      fromAccount: "Tài khoản nguồn",
      toAccount: "Tài khoản đích",
      fromAmount: "Số tiền gửi",
      toAmount: "Số tiền nhận",
      note: "Ghi chú",
      notePlaceholder: "VD: chuyển sang tiết kiệm",
      differentAccountsRequired: "Chọn các tài khoản khác nhau.",
      description: "Chuyển tiền giữa các tài khoản và đăng ký phí hoặc quy đổi tiền tệ.",
      fromAccountRequired: "Chọn tài khoản nguồn.",
      toAccountRequired: "Chọn tài khoản đích.",
      fromAmountRequired: "Số tiền gửi phải lớn hơn 0.",
      toAmountRequired: "Số tiền nhận phải lớn hơn 0.",
      feeInvalid: "Phí không được âm.",
      insufficientBalance: "Bạn không có đủ tiền trong tài khoản nguồn cho giao dịch chuyển khoản này.",
      multiCurrencyBlockedByPlan: "Gói miễn phí chỉ cho phép chuyển khoản giữa các tài khoản cùng loại tiền tệ.",
      fromAmountWithCurrency: "Số tiền gửi {{currency}}",
      toAmountWithCurrency: "Số tiền nhận {{currency}}",
      feeAmountWithCurrency: "Phí {{currency}}",
      calculatedExchangeRate: "Tỷ giá được tính",
      multiCurrencyPlusTitle: "Chuyển khoản giữa các loại tiền tệ có trong Plus",
      multiCurrencyPlusDescription: "Trong gói miễn phí, bạn có thể chuyển khoản giữa các tài khoản cùng loại tiền tệ. Để chuyển khoản có quy đổi tiền tệ, hãy kích hoạt Plus."
    },
    calculatorAmount: "Số tiền giao dịch",
    transferAmount: "Số tiền chuyển",
    emptyFilterTitle: "Không có kết quả",
    emptyFilterDescription: "Thay đổi bộ lọc để xem các giao dịch khác.",
    newExpense: "Chi phí mới",
    newIncome: "Thu nhập mới"
  },
  statistics: {
    title: "Thống kê",
    description: "Xem lại thu nhập, chi tiêu, chuyển khoản và danh mục của bạn.",
    filters: "Bộ lọc báo cáo",
    applyFilters: "Áp dụng bộ lọc",
    clearFilters: "Xóa bộ lọc",
    filtersDescription: "Điều chỉnh kỳ hạn, tài khoản, danh mục và tiền tệ.",
    cards: {
      income: "Thu nhập",
      expenses: "Chi tiêu",
      transfers: "Chuyển khoản",
      commissions: "Phí",
      periodBalance: "Kết quả kỳ hạn"
    },
    charts: {
      incomeVsExpense: "Thu nhập so với chi tiêu",
      incomeVsExpenseDescription: "So sánh hằng tháng giữa tiền vào và tiền ra.",
      balanceEvolution: "Diễn biến số dư",
      balanceEvolutionDescription: "Số dư tích lũy trong các tháng gần đây.",
      topExpenseCategories: "Danh mục chi tiêu cao nhất",
      topExpenseCategoriesDescription: "Các danh mục có lượng tiền chi ra nhiều nhất.",
      budgetUsed: "Ngân sách đã dùng",
      budgetUsedDescription: "Tiến độ của ngân sách tháng hiện tại.",
      expensesByCategory: "Chi tiêu theo danh mục",
      accountSummary: "Tóm tắt tài khoản"
    },
    empty: {
      noBudget: "Tạo ngân sách hằng tháng để xem biểu đồ này.",
      noMovements: "Đăng ký giao dịch để xem thống kê.",
      noExpenses: "Chưa có chi tiêu nào được đăng ký trong kỳ hạn này.",
      noIncome: "Chưa có thu nhập nào được đăng ký trong kỳ hạn này.",
      noIncomeExpenseChart: "Không có dữ liệu thu nhập hoặc chi tiêu để vẽ biểu đồ.",
      noBalanceTrend: "Chưa có đủ dữ liệu số dư để hiển thị xu hướng.",
      noExpenseCategoriesChart: "Không có chi tiêu theo danh mục để vẽ biểu đồ.",
      noFilterDataTitle: "Không có dữ liệu cho các bộ lọc này",
      noFilterDataDescription: "Thay đổi kỳ hạn hoặc đăng ký giao dịch để xem thống kê.",
      noExpensesForFilters: "Không có chi tiêu cho các bộ lọc này."
    },
    labels: {
      income: "Thu nhập",
      expenses: "Chi tiêu",
      others: "Khác",
      top: "Top",
      balance: "Số dư",
      used: "Đã dùng",
      spentAmount: "Đã chi {{amount}}",
      limitAmount: "Giới hạn: {{amount}}",
      noCategory: "Không có danh mục",
      balanceAmount: "Số dư: {{amount}}"
    }
  },
  reports: {
    export: {
      title: "Xuất tóm tắt",
      description: "Tải xuống tài khoản, thu nhập, chi tiêu và chuyển khoản của bạn trong một tệp."
    },
    filters: {
      title: "Bộ lọc",
      panelDescription: "Điều chỉnh kỳ hạn và dữ liệu bạn muốn phân tích.",
      period: "Kỳ hạn",
      account: "Tài khoản",
      category: "Danh mục",
      currency: "Tiền tệ",
      from: "Từ",
      to: "Đến",
      movementKind: "Loại giao dịch"
    },
    periods: {
      current_month: {
        label: "Tháng hiện tại",
        description: "Giao dịch trong tháng hiện tại."
      },
      last_month: {
        label: "Tháng trước",
        description: "Giao dịch trong tháng trước."
      },
      last_3_months: {
        label: "3 tháng gần nhất",
        description: "Giao dịch trong ba tháng gần nhất."
      },
      current_year: {
        label: "Năm hiện tại",
        description: "Giao dịch trong năm hiện tại."
      },
      custom: {
        label: "Tùy chỉnh",
        description: "Chọn khoảng ngày thủ công."
      }
    },
    movementKinds: {
      all: {
        label: "Tất cả",
        description: "Thu nhập và chi tiêu."
      },
      income: {
        label: "Thu nhập",
        description: "Chỉ tiền đi vào."
      },
      expense: {
        label: "Chi tiêu",
        description: "Chỉ tiền đi ra."
      }
    },
    accounts: {
      all: {
        label: "Tất cả tài khoản",
        description: "Bao gồm tất cả tài khoản đang hoạt động."
      }
    },
    categories: {
      all: {
        label: "Tất cả danh mục",
        description: "Không lọc theo danh mục."
      }
    },
    currencies: {
      main: {
        label: "Tiền tệ chính",
        description: "Sử dụng tiền tệ chính cho bản tóm tắt."
      }
    }
  },
  settings: {
    title: "Cài đặt",
    description: "Cấu hình trải nghiệm, dữ liệu, quyền riêng tư và gói của bạn.",
    appearance: "Giao diện",
    theme: "Chủ đề",
    currentTheme: "Chủ đề hiện tại: {{theme}}",
    themeModes: {
      system: "Hệ thống",
      dark: "Tối",
      light: "Sáng"
    },
    language: "Ngôn ngữ",
    languageDescription: "Chọn ngôn ngữ giao diện của Orvian.",
    languagePickerLabel: "Ngôn ngữ",
    currentPlan: "Gói hiện tại",
    currentPlanDescription: "Bạn đang sử dụng gói {{plan}}.",
    freePlanName: "Miễn phí",
    viewPlans: "Xem gói",
    shortcuts: "Lối tắt",
    viewBudgets: "Xem ngân sách",
    viewReminders: "Xem nhắc nhở",
    privacy: "Quyền riêng tư",
    privacyDescription: "Kiểm tra cách dữ liệu của bạn được xử lý trong Orvian.",
    privacyPolicy: "Chính sách quyền riêng tư",
    openPrivacyPolicy: "Xem chính sách quyền riêng tư",
    exportData: "Xuất dữ liệu",
    exportDescription: "Tạo tệp với tài khoản, giao dịch và chuyển khoản của bạn.",
    exporting: "Đang xuất...",
    exportCsv: "Xuất CSV",
    exportExcel: "Xuất Excel",
    importData: "Nhập dữ liệu",
    importDescription: "Tải giao dịch từ tệp CSV.",
    localData: "Dữ liệu cục bộ",
    localDataDescription: "Dữ liệu của bạn được lưu trên thiết bị này. Đồng bộ tài khoản có thể được bật sau.",
    viewOnboardingAgain: "Xem phần giới thiệu lại",
    resetData: "Xóa dữ liệu cục bộ",
    about: "Giới thiệu về Orvian",
    aboutDescription: "Orvian giúp bạn sắp xếp tài khoản, chi tiêu, ngân sách và báo cáo cá nhân.",
    app: "Ứng dụng",
    version: "Phiên bản",
    developer: "Nhà phát triển",
    visitDeveloperWebsite: "Truy cập trang web của nhà phát triển",
    linkErrorTitle: "Không thể mở liên kết",
    linkErrorDescription: "Thiết bị của bạn hiện không thể mở trang web này.",
    privacyLinkErrorDescription: "Thiết bị của bạn hiện không thể mở chính sách quyền riêng tư.",
    resetDataTitle: "Xóa dữ liệu cục bộ",
    resetDataDescription: "Thao tác này sẽ xóa tài khoản, giao dịch, chuyển khoản, nhắc nhở và cài đặt đã lưu trên thiết bị này.",
    resetDataConfirm: "Xóa",
    exportErrorTitle: "Không thể xuất",
    exportCsvErrorDescription: "Đã xảy ra lỗi khi tạo tệp CSV.",
    exportExcelErrorDescription: "Đã xảy ra lỗi khi tạo tệp Excel.",
    mainCurrency: "Tiền tệ chính"
  },
  onboarding: {
    welcome: {
      title: "Quản lý tiền của bạn ở một nơi",
      description: "Đăng ký tài khoản, thu nhập, chi tiêu, chuyển khoản, nhắc nhở và kế hoạch tài chính từ một ứng dụng cục bộ và riêng tư.",
      balanceCardTitle: "Số dư của bạn bắt đầu từ đây",
      income: "Thu nhập",
      expenses: "Chi tiêu",
      start: "Bắt đầu"
    },
    setup: {
      stepLabel: "Bước {{step}} trên {{total}}",
      title: "Thiết lập trải nghiệm của bạn",
      description: "Những câu trả lời này giúp cá nhân hóa ứng dụng mà không bắt buộc bạn tạo tài khoản."
    },
    stepOne: {
      mainCurrency: "Tiền tệ chính",
      calculateTotalNetWorth: "Tính toàn bộ tiền của tôi",
      calculateTotalNetWorthDescription: "Cộng ngân hàng, tiền mặt, tiền mã hóa và các tài khoản khác vào một số dư tổng thể.",
      userType: "Loại người dùng"
    },
    stepTwo: {
      cryptoUsage: "Sử dụng tiền mã hóa",
      multiCurrencyUsage: "Sử dụng nhiều loại tiền tệ"
    },
    stepThree: {
      mainGoal: "Mục tiêu chính",
      activateFinancialReminders: "Bật nhắc nhở tài chính",
      activateFinancialRemindersDescription: "Điều này sẽ giúp bạn nhớ các khoản thanh toán, khoản cần thu, mua sắm hoặc tiết kiệm.",
      viewPlans: "Xem gói"
    },
    options: {
      userProfile: {
        personal: {
          label: "Cá nhân",
          description: "Tôi muốn quản lý tài chính cá nhân."
        },
        freelancer: {
          label: "Chuyên nghiệp",
          description: "Tôi có thu nhập từ dự án hoặc khách hàng."
        },
        entrepreneur: {
          label: "Doanh nhân",
          description: "Tôi quản lý tiền cho một doanh nghiệp hoặc dự án kinh doanh."
        },
        investor: {
          label: "Nhà đầu tư",
          description: "Tôi muốn theo dõi tài sản, tiền mã hóa hoặc khoản đầu tư."
        },
        student: {
          label: "Sinh viên",
          description: "Tôi muốn sắp xếp chi tiêu và tiết kiệm."
        }
      },
      cryptoUsage: {
        none: {
          label: "Tôi không dùng tiền mã hóa",
          description: "Tôi không cần tài khoản như Binance hoặc MetaMask."
        },
        basic: {
          label: "Có, tôi dùng tiền mã hóa",
          description: "Tôi muốn đăng ký sàn giao dịch, ví hoặc tài sản kỹ thuật số."
        },
        advanced: {
          label: "Tôi dùng tiền mã hóa, nhưng không phải ưu tiên",
          description: "Tôi muốn đăng ký tiền mã hóa, nhưng đó không phải điều quan trọng nhất với tôi."
        }
      },
      multiCurrencyUsage: {
        none: {
          label: "Tôi dùng một loại tiền tệ",
          description: "Tôi chủ yếu quản lý tiền bằng một loại tiền tệ."
        },
        occasional: {
          label: "Thỉnh thoảng",
          description: "Tôi thỉnh thoảng dùng tài khoản bằng các loại tiền tệ khác nhau."
        },
        frequent: {
          label: "Thường xuyên",
          description: "Tôi thường xuyên dùng tài khoản bằng nhiều loại tiền tệ."
        }
      },
      financialGoal: {
        control_expenses: {
          label: "Kiểm soát chi tiêu",
          description: "Tôi muốn biết tiền của mình đi đâu."
        },
        save_more: {
          label: "Tiết kiệm nhiều hơn",
          description: "Tôi muốn để riêng tiền cho mục tiêu và quỹ dự phòng."
        },
        pay_debts: {
          label: "Trả nợ",
          description: "Tôi muốn sắp xếp các khoản nợ và khoản thanh toán còn pending."
        },
        track_income: {
          label: "Theo dõi thu nhập",
          description: "Tôi muốn kiểm soát rõ các nguồn thu nhập của mình."
        },
        understand_investments: {
          label: "Hiểu các khoản đầu tư",
          description: "Tôi muốn theo dõi tốt hơn tài sản, tiền mã hóa hoặc khoản đầu tư của mình."
        },
        avoid_small_expenses: {
          label: "Tránh chi tiêu nhỏ hằng ngày",
          description: "Tôi muốn nhận diện và kiểm soát các khoản chi nhỏ mỗi ngày."
        }
      }
    },
    plans: {
      title: "Chọn cách bạn muốn bắt đầu",
      description: "Bạn có thể dùng ứng dụng miễn phí và kích hoạt các tính năng nâng cao sau.",
      continueWithPlus: "Tiếp tục với Plus"
    },
    v2: {
      control: {
        title: "Quản lý tiền bạc dễ dàng hơn",
        description: "Sắp xếp tài khoản, số dư và giao dịch ở một nơi."
      },
      movements: {
        title: "Ghi lại chi tiêu và thu nhập trong vài giây",
        description: "Dùng biểu mẫu kiểu máy tính để ghi lại tiền nhanh hơn."
      },
      reminders: {
        title: "Đừng quên khoản phải trả hoặc phải thu",
        description: "Tạo nhắc nhở cho thanh toán, khoản thu và cam kết định kỳ."
      },
      clarity: {
        title: "Xem tài chính của bạn rõ ràng hơn",
        description: "Hiểu số dư, giao dịch và cam kết sắp tới trong một ứng dụng đơn giản."
      },
      currency: {
        title: "Chọn tiền tệ chính",
        description: "Chúng tôi sẽ dùng tiền tệ này để hiển thị tổng, báo cáo và số dư chính."
      },
      start: "Bắt đầu ngay",
      welcome: {
        title: "Chào mừng đến với Orvian",
        description: "Một cách rõ ràng và đơn giản hơn để quản lý tiền, tài khoản và cam kết sắp tới."
      },
      accounts: {
        title: "Tài khoản của bạn được sắp xếp tốt hơn",
        description: "Tạo tài khoản, theo dõi số dư và tùy chỉnh thẻ để xem tiền rõ ràng hơn."
      },
      analytics: {
        title: "Hiểu tài chính của bạn chỉ trong nháy mắt",
        description: "Xem xu hướng, chi tiêu và thu nhập bằng biểu đồ đơn giản để quyết định tốt hơn."
      },
      plans: {
        title: "Bắt đầu miễn phí, nâng cấp khi cần",
        description: "Dùng Orvian miễn phí hoặc mở khóa Plus Lifetime với tính năng cao cấp cục bộ."
      },
      continueWithPlus: "Tiếp tục với Plus",
      continueFree: "Tiếp tục miễn phí",
      security: {
        title: "Dữ liệu của bạn được bảo vệ",
        description: "Orvian lưu thông tin tài chính của bạn trong bộ nhớ an toàn và được mã hóa trên thiết bị, để bạn luôn kiểm soát dữ liệu của mình."
      }
    }
  },
  budgets: {
    title: "Ngân sách",
    description: "Đặt giới hạn hằng tháng để kiểm soát chi tiêu.",
    allCategoriesAlreadyBudgeted: "Bạn đã thêm giới hạn cho tất cả các danh mục có sẵn.",
    budgetedCategories: "Danh mục có giới hạn",
    budgetOf: "Ngân sách cho {{period}}",
    currentSpendingVsBudget: "Chi tiêu hiện tại so với giới hạn hằng tháng của bạn.",
    spent: "Đã chi",
    limit: "Giới hạn",
    limitedCategories: "Danh mục có giới hạn",
    spentOfLimit: "{{spent}} trên {{limit}}",
    currentEmptyTitle: "Bạn chưa có ngân sách trong tháng này",
    currentEmptyDescription: "Tạo ngân sách cho {{period}}.",
    createMonthlyBudget: "Tạo ngân sách hằng tháng",
    historyTitle: "Lịch sử ngân sách",
    generalLimitValue: "Giới hạn chung: {{amount}} {{currency}}",
    modalDescription: "Đặt giới hạn để kiểm soát chi tiêu hằng tháng của bạn.",
    status: {
      exceeded: "Bạn đã vượt quá ngân sách hằng tháng.",
      warning: "Bạn sắp đạt giới hạn ngân sách hằng tháng.",
      safe: "Chi tiêu của bạn vẫn nằm trong ngân sách.",
      used: "Đã dùng",
      spentAmount: "Đã chi {{amount}}",
      limitAmount: "Giới hạn: {{amount}}"
    },
    newBudget: "Ngân sách mới",
    editBudget: "Chỉnh sửa ngân sách",
    createBudget: "Tạo ngân sách",
    saveBudget: "Lưu ngân sách",
    deleteBudget: "Xóa ngân sách",
    monthLabel: "{{month}} {{year}}",
    generalMonthlyBudget: "Ngân sách hằng tháng chung",
    generalBudgetPlaceholder: "VD: 500",
    categoryBudgetTitle: "Ngân sách theo danh mục",
    categoryBudgetDescription: "Chỉ thêm giới hạn cho các danh mục chi tiêu bạn muốn kiểm soát.",
    expenseCategory: "Danh mục chi tiêu",
    monthlyLimit: "Giới hạn hằng tháng",
    monthlyLimitPlaceholder: "VD: 120",
    addCategory: "Thêm danh mục",
    removeCategory: "Xóa danh mục",
    budgetUsed: "Ngân sách đã dùng",
    remainingBudget: "Ngân sách còn lại",
    exceededBudget: "Ngân sách đã vượt",
    emptyTitle: "Bạn chưa có ngân sách nào",
    emptyDescription: "Tạo ngân sách hằng tháng để kiểm soát chi tiêu tốt hơn.",
    deleteTitle: "Xóa ngân sách",
    deleteDescription: "Ngân sách này và các giới hạn danh mục của nó sẽ bị xóa.",
    errors: {
      generalRequired: "Ngân sách chung là bắt buộc.",
      generalGreaterThanZero: "Ngân sách chung phải lớn hơn 0.",
      categoryRequired: "Chọn một danh mục.",
      categoryLimitRequired: "Giới hạn hằng tháng là bắt buộc.",
      categoryLimitGreaterThanZero: "Giới hạn hằng tháng phải lớn hơn 0.",
      duplicatedCategory: "Danh mục này đã có ngân sách được gán."
    }
  },
  reminders: {
    title: "Nhắc nhở",
    description: "Lên lịch thanh toán, khoản cần thu, mua sắm hoặc đầu tư.",
    newReminder: "Nhắc nhở mới",
    saveReminder: "Lưu nhắc nhở",
    createReminder: "Tạo nhắc nhở",
    completeTitle: "Hoàn tất nhắc nhở",
    completeDescription: "Bạn có muốn đánh dấu nhắc nhở này là đã hoàn tất không?",
    cancelTitle: "Hủy nhắc nhở",
    cancelDescription: "Bạn có muốn hủy nhắc nhở này không?",
    confirmCancel: "Có, hủy",
    emptyTitle: "Bạn chưa có nhắc nhở nào",
    emptyDescription: "Tạo nhắc nhở cho thanh toán, khoản cần thu, đăng ký, mua sắm hoặc tiết kiệm.",
    complete: "Hoàn tất",
    form: {
      title: "Tiêu đề",
      titlePlaceholder: "VD: Thanh toán internet",
      amountOptional: "Số tiền không bắt buộc",
      amountPlaceholder: "0.00",
      type: "Loại",
      frequency: "Tần suất",
      date: "Ngày",
      time: "Giờ",
      relatedAccount: "Tài khoản liên quan",
      descriptionOptional: "Mô tả không bắt buộc",
      descriptionPlaceholder: "VD: đến hạn vào ngày 5 hằng tháng...",
      titleRequired: "Tiêu đề là bắt buộc.",
      amountInvalid: "Số tiền phải lớn hơn hoặc bằng 0.",
      futureDateRequired: "Ngày phải là ngày trong tương lai."
    },
    card: {
      defaultType: "Nhắc nhở"
    },
    types: {
      payment: {
        label: "Thanh toán",
        description: "Dịch vụ, nợ, thẻ hoặc cam kết cần thanh toán."
      },
      collection: {
        label: "Khoản cần thu",
        description: "Tiền mà người khác cần trả cho bạn."
      },
      subscription: {
        label: "Đăng ký",
        description: "Netflix, Spotify, phần mềm hoặc các khoản thanh toán định kỳ khác."
      },
      saving: {
        label: "Tiết kiệm",
        description: "Nhắc nhở để dành tiền riêng."
      },
      investment: {
        label: "Đầu tư",
        description: "Mua định kỳ tài sản hoặc tiền mã hóa."
      },
      purchase: {
        label: "Mua sắm",
        description: "Khoản mua quan trọng đã lên kế hoạch."
      },
      custom: {
        label: "Tùy chỉnh",
        description: "Nhắc nhở tài chính tùy chỉnh."
      }
    },
    frequencies: {
      once: {
        label: "Một lần",
        description: "Bạn sẽ chỉ được thông báo vào ngày đã chọn."
      },
      daily: {
        label: "Hằng ngày",
        description: "Sẽ lặp lại mỗi ngày."
      },
      weekly: {
        label: "Hằng tuần",
        description: "Sẽ lặp lại mỗi tuần."
      },
      monthly: {
        label: "Hằng tháng",
        description: "Sẽ lặp lại mỗi tháng."
      }
    }
  },
  plans: {
    title: "Gói",
    description: "Chọn gói phù hợp nhất với cách bạn quản lý tài chính.",
    currentPlan: "Gói hiện tại",
    free: "Miễn phí",
    plus: "Plus",
    demoDescription: "Bắt đầu miễn phí và kích hoạt các tính năng nâng cao khi bạn cần.",
    monthlyPeriod: "mỗi tháng",
    yearlyAvailable: "Cũng có gói ${{price}} mỗi năm.",
    plusActive: "Plus đang hoạt động",
    activatePlusDemo: "Kích hoạt bản demo Plus",
    freeActive: "Gói miễn phí đang hoạt động",
    backToFree: "Quay lại gói miễn phí",
    freePlan: {
      name: "Miễn phí",
      description: "Lý tưởng để bắt đầu sắp xếp tài chính cá nhân.",
      price: "$0",
      period: "Mãi mãi",
      cta: "Tiếp tục miễn phí",
      current: "Gói hiện tại",
      features: {
        accountsLimit: "Tối đa 3 tài khoản",
        movementsLimit: "Tối đa 30 giao dịch mỗi tháng",
        basicStatistics: "Thống kê cơ bản",
        localData: "Dữ liệu được lưu cục bộ",
        accounts: "Tối đa 3 tài khoản",
        movements: "Giao dịch không giới hạn",
        basicReminders: "Nhắc nhở cơ bản",
        basicMovements: "Theo dõi giao dịch cơ bản",
        baseCategories: "Danh mục cơ bản",
        theme: "Chế độ sáng và tối"
      }
    },
    plusPlan: {
      name: "Plus",
      description: "Dành cho người dùng muốn kiểm soát tài chính đầy đủ.",
      price: "{{price}}",
      period: "mỗi tháng",
      cta: "Kích hoạt Plus",
      features: {
        unlimitedAccounts: "Tài khoản không giới hạn",
        unlimitedMovements: "Giao dịch không giới hạn",
        advancedStatistics: "Thống kê nâng cao",
        budgets: "Ngân sách hằng tháng",
        reminders: "Nhắc nhở tài chính",
        exportData: "Xuất dữ liệu",
        priorityFeatures: "Truy cập các tính năng nâng cao"
      }
    },
    restorePurchase: "Khôi phục giao dịch mua",
    continueWithoutPlus: "Tiếp tục không dùng Plus",
    errors: {
      purchaseUnavailable: "Hiện tại không thể mua.",
      restoreUnavailable: "Hiện tại không thể khôi phục giao dịch mua."
    },
    v2: {
      title: "Chọn cách phát triển với Orvian",
      description: "Bắt đầu miễn phí và mở khóa tính năng cao cấp khi cần.",
      oneTimePayment: "Thanh toán một lần",
      unlockPlus: "Mở khóa Plus",
      plusActive: "Plus đang hoạt động",
      buyPack: "Mua gói",
      included: "Đã bao gồm",
      includedWithPlus: "Bao gồm trong Plus",
      cardDesigns: {
        title: "Thiết kế thẻ",
        description: "Mua từng gói riêng lẻ hoặc mở khóa bằng Plus."
      },
      legacy: {
        title: "Quyền lợi cho người dùng sớm",
        description: "Cảm ơn bạn đã dùng thử Orvian trước khi ra mắt công khai.",
        benefit: "Bạn sẽ có quyền truy cập Plus tạm thời và giảm giá đặc biệt để giữ Plus Lifetime.",
        temporaryUntil: "Quyền truy cập tạm thời dự kiến đến: {{date}}",
        shortBenefit: "Giảm giá đặc biệt vì đã dùng thử Orvian trước khi ra mắt."
      },
      pro: {
        title: "Sắp ra mắt: Orvian Pro",
        description: "AI tài chính, đồng bộ đám mây, sao lưu và truy cập nhiều thiết bị sẽ thuộc một gói tháng riêng."
      },
      freePrice: "$0 · Để bắt đầu",
      plusPrice: "$4.99 · Thanh toán một lần",
      legacyPrice: "$2.99 · Giá cho người dùng sớm"
    },
    products: {
      plusLifetime: {
        description: "Mở khóa các tính năng cao cấp cục bộ bằng một lần thanh toán.",
        name: "Plus Lifetime",
        features: {
          unlimitedAccounts: "Tài khoản không giới hạn",
          unlimitedReminders: "Nhắc nhở không giới hạn",
          cardDesigns: "Thiết kế thẻ cao cấp",
          customCategories: "Danh mục tùy chỉnh",
          advancedCustomization: "Tùy chỉnh nâng cao",
          localExport: "Xuất dữ liệu cục bộ"
        }
      },
      cardPacks: {
        dark: {
          description: "Thiết kế tối màu và thanh lịch cho tài khoản của bạn."
        },
        luxury: {
          description: "Thiết kế độc quyền giúp ứng dụng nổi bật hơn."
        },
        crypto: {
          description: "Thiết kế lấy cảm hứng từ tài sản số và ví điện tử."
        },
        minimal: {
          description: "Thiết kế sạch và tối giản cho tài khoản cá nhân."
        }
      }
    },
    purchase: {
      errorTitle: "Không thể bắt đầu mua hàng",
      errorDescription: "Hãy kiểm tra kết nối hoặc thử lại từ Google Play."
    }
  },
  categories: {
    salary: "Lương",
    freelance: "Dự án / Freelancer",
    sales: "Bán hàng",
    business_income: "Kinh doanh",
    investment_income: "Đầu tư",
    gift_income: "Quà tặng / Thu nhập thêm",
    refund: "Hoàn tiền",
    loan_received: "Khoản vay đã nhận",
    rental_income: "Thu nhập cho thuê",
    other_income: "Thu nhập khác",
    food: "Ăn uống",
    groceries: "Mua thực phẩm",
    restaurants: "Nhà hàng",
    transport: "Di chuyển",
    fuel: "Nhiên liệu",
    taxi_rideshare: "Taxi / Ứng dụng",
    housing: "Nhà ở",
    rent: "Tiền thuê",
    services: "Dịch vụ",
    electricity: "Điện",
    water: "Nước",
    internet_phone: "Internet / Điện thoại",
    health: "Sức khỏe",
    medicine: "Thuốc",
    education: "Giáo dục",
    entertainment: "Giải trí",
    subscriptions: "Đăng ký",
    technology: "Công nghệ",
    clothing: "Quần áo",
    personal_care: "Chăm sóc cá nhân",
    family: "Gia đình",
    pets: "Thú cưng",
    travel: "Du lịch",
    gifts: "Quà tặng",
    taxes: "Thuế",
    fees: "Phí",
    debt_payment: "Thanh toán nợ",
    savings: "Tiết kiệm",
    investment_expense: "Đầu tư",
    cash_withdrawal: "Rút tiền mặt",
    other: "Khác"
  },
  tags: {
    essential: "Thiết yếu",
    optional: "Không bắt buộc",
    urgent: "Khẩn cấp",
    recurring: "Định kỳ",
    planned: "Đã lên kế hoạch",
    unplanned: "Không lên kế hoạch",
    cash: "Tiền mặt",
    card: "Thẻ",
    transfer: "Chuyển khoản",
    online: "Trực tuyến",
    subscription: "Đăng ký",
    work: "Công việc",
    personal: "Cá nhân",
    family: "Gia đình",
    business: "Kinh doanh",
    tax: "Thuế",
    invoice: "Hóa đơn",
    debt: "Nợ",
    savings: "Tiết kiệm",
    small_expense: "Chi tiêu nhỏ hằng ngày"
  },
  loans: {
    newLoan: "Khoản vay mới",
    form: {
      description: "Theo dõi số tiền bạn cần trả hoặc thu.",
      title: "Tiêu đề",
      titlePlaceholder: "VD: Khoản vay cá nhân",
      titleRequired: "Tiêu đề là bắt buộc.",
      personOrEntity: "Người hoặc tổ chức",
      personOrEntityPlaceholder: "VD: người thân, ngân hàng",
      payable: "Tôi cần trả",
      receivable: "Người khác cần trả tôi",
      payableDescription: "Số tiền bạn nợ.",
      receivableDescription: "Số tiền người khác nợ bạn.",
      amount: "Số tiền",
      amountPlaceholder: "0.00",
      amountRequired: "Số tiền là bắt buộc.",
      amountError: "Nhập số tiền lớn hơn 0.",
      currency: "Tiền tệ",
      notes: "Ghi chú",
      notesPlaceholder: "Chi tiết khoản vay tùy chọn",
      createTitle: "Tạo khoản vay"
    },
    payment: {
      remainingAmount: "Còn lại: {{amount}}",
      amount: "Số tiền",
      amountPlaceholder: "0.00",
      amountRequired: "Số tiền là bắt buộc.",
      amountError: "Nhập số tiền lớn hơn 0 và nhỏ hơn hoặc bằng {{amount}}.",
      note: "Ghi chú",
      notePlaceholder: "Chi tiết thanh toán hoặc thu tiền tùy chọn",
      pay: "Thanh toán"
    }
  },
  transfers: {
    form: {
      fromAccountRequired: "Chọn tài khoản nguồn.",
      toAccountRequired: "Chọn tài khoản đích.",
      sameAccountError: "Tài khoản nguồn và đích phải khác nhau.",
      exchangeRatePending: "Hiện tại sẽ dùng tỷ giá 1:1. Chuyển đổi nâng cao sẽ được thêm sau.",
      fromAccount: "Tài khoản nguồn",
      toAccount: "Tài khoản đích",
      feeAmount: "Phí"
    }
  },
  guides: {
    homeOverview: {
      title: "Tổng quan tài chính bắt đầu tại đây",
      description: "Xem tổng số dư, tài khoản chính và giao dịch gần đây từ màn hình này."
    },
    movementQuickAdd: {
      title: "Ghi lại tiền bằng nút +",
      description: "Dùng nút giữa ở thanh dưới để tạo chi phí, thu nhập hoặc chuyển khoản nhanh chóng."
    },
    homeTour: {
      totalBalance: "Tại đây bạn có thể xem tổng số dư ước tính của các tài khoản.",
      accounts: "Đây là các tài khoản chính của bạn. Chạm vào một tài khoản để xem chi tiết.",
      monthlySummary: "Tại đây bạn có thể xem tóm tắt thu nhập, chi phí và số dư trong tháng.",
      recentActivity: "Các giao dịch và chuyển khoản gần đây nhất sẽ xuất hiện tại đây."
    },
    statisticsTour: {
      filters: "Dùng nút này để lọc thống kê theo ngày, tài khoản, danh mục, tiền tệ hoặc loại giao dịch.",
      summary: "Tại đây bạn xem tóm tắt kỳ: thu nhập, chi phí, chuyển khoản, phí và số dư.",
      incomeVsExpense: "Biểu đồ này so sánh thu nhập và chi phí theo tháng để xem bạn có đang chi nhiều hơn số tiền nhận được không.",
      balanceEvolution: "Tại đây bạn thấy số dư thay đổi theo thời gian và xu hướng tài chính đang tốt lên hay xấu đi.",
      topCategories: "Biểu đồ này cho thấy các danh mục chi tiêu lớn nhất để bạn hiểu tiền đang đi đâu.",
      budgetUsed: "Nếu bạn có ngân sách đang hoạt động, tại đây bạn xem đã dùng bao nhiêu và có gần giới hạn không.",
      expensesByCategory: "Danh sách này xếp chi phí theo danh mục kèm tỷ lệ và số tiền để nhận ra ưu tiên.",
      accountSummary: "Tại đây bạn so sánh thu nhập, chi phí và số dư theo tài khoản để biết tài khoản nào hoạt động nhiều nhất.",
      chartsPanel: "Các biểu đồ này giúp bạn so sánh thu nhập, chi phí, biến động số dư, danh mục chính và mức dùng ngân sách."
    }
  }
} as const;
