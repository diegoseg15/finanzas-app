export const tr = {
  common: {
    appName: "Orvian",
    cancel: "İptal",
    save: "Kaydet",
    edit: "Düzenle",
    delete: "Sil",
    close: "Kapat",
    continue: "Devam et",
    back: "Geri",
    next: "İleri",
    confirm: "Onayla",
    apply: "Uygula",
    clear: "Temizle",
    add: "Ekle",
    create: "Oluştur",
    update: "Güncelle",
    remove: "Kaldır",
    search: "Ara",
    select: "Seç",
    loading: "Yükleniyor...",
    saving: "Kaydediliyor...",
    exporting: "Dışa aktarılıyor...",
    error: "Hata",
    success: "Tamamlandı",
    required: "Zorunlu",
    optional: "İsteğe bağlı",
    amount: "Tutar",
    date: "Tarih",
    time: "Saat",
    title: "Başlık",
    description: "Açıklama",
    note: "Not",
    category: "Kategori",
    currency: "Para birimi",
    account: "Hesap",
    type: "Tür",
    frequency: "Sıklık",
    freePlan: "Ücretsiz plan",
    plusPlan: "Plus planı",
    month: "Ay",
    monthly: "Aylık",
    total: "Toplam",
    balance: "Bakiye",
    income: "Gelir",
    expense: "Gider",
    transfer: "Transfer",
    commission: "Ücret",
    noData: "Veri yok",
    notAvailable: "Kullanılamaz",
    no: "Hayır",
    transfers: "Transferler"
  },
  tabs: {
    home: "Ana sayfa",
    accounts: "Hesaplar",
    movements: "Hareketler",
    statistics: "İstatistikler",
    settings: "Ayarlar",
    more: "Daha fazla",
    budgets: "Bütçeler",
    loans: "Krediler"
  },
  home: {
    totalEstimated: "Tahmini toplam para",
    totalEstimatedBalance: "Tahmini toplam bakiye",
    monthlyExpenses: "Aylık giderler",
    monthlyIncome: "Aylık gelir",
    monthlyBalance: "Aylık sonuç",
    available: "Mevcut",
    accounts: "Hesaplar",
    upcomingReminders: "Yaklaşan hatırlatmalar",
    viewAll: "Tümünü gör",
    noUpcomingReminders: "Yaklaşan hatırlatmanız yok.",
    recentActivity: "Son hareketler",
    noRegisteredMovements: "Henüz herhangi bir hareket kaydetmediniz.",
    noActivity: "Henüz hareket yok.",
    viewAllAccounts: "Tümünü gör",
    monthlySummary: "Aylık özet"
  },
  accounts: {
    title: "Hesaplar",
    description: "Banka, nakit, kripto para, kart ve borç hesaplarını kaydedin.",
    newAccount: "Yeni hesap",
    firstAccount: "İlk hesabı oluştur",
    createTitle: "Yeni hesap",
    editTitle: "Hesabı düzenle",
    emptyTitle: "Henüz hesabınız yok",
    emptyDescription: "Gelir, gider ve transferleri kaydetmeye başlamak için ilk hesabınızı oluşturun.",
    freePlanRemaining: "Ücretsiz plan: {{count}} hesap kullanılabilir.",
    plusPlanUnlimited: "Plus planı: sınırsız hesap.",
    limitTitle: "Ücretsiz hesap limitine ulaştınız",
    limitDescription: "Ücretsiz plan en fazla 3 hesaba izin verir. Sınırsız hesap oluşturmak için Plus'ı etkinleştirin.",
    deleteTitle: "Hesabı sil",
    deleteDescription: "Bu hesap aktif listeden gizlenecek. Geçmiş hareketleri korunacaktır.",
    saveAccount: "Hesabı kaydet",
    saveChanges: "Değişiklikleri kaydet",
    card: {
      customAccount: "Özel hesap",
      currentBalance: "Mevcut bakiye",
      includedInTotal: "Tahmini toplama dahil",
      excludedFromTotal: "Tahmini toplama dahil değil",
      options: "Seçenekler"
    },
    form: {
      createTitle: "Yeni hesap",
      editTitle: "Hesabı düzenle",
      editDescription: "Bu hesabın temel bilgilerini güncelleyin.",
      createDescription: "Bu hesabın temel bilgilerini ayarlayın.",
      name: "Hesap adı",
      namePlaceholder: "Örn. Pichincha Bankası",
      currentBalance: "Mevcut bakiye",
      initialBalance: "Başlangıç bakiyesi",
      balancePlaceholder: "0.00",
      balanceEditInfo: "Bakiye, hesabı düzenleyerek değil hareket kaydederek güncellenir.",
      type: "Hesap türü",
      mainCurrency: "Ana para birimi",
      currencyCrypto: "Kripto para",
      currencyFiat: "Geleneksel para birimi",
      currencyCustom: "Özel",
      currencyEditInfo: "Hareket geçmişini bozmamak için düzenleme sırasında ana para birimi değiştirilemez.",
      includeInTotal: "Tahmini toplama ekle",
      includeInTotalDescription: "Bu hesabın toplam bakiyenize eklenmesini istiyorsanız bunu etkinleştirin.",
      initialBalanceRequired: "Başlangıç bakiyesi zorunludur. Bakiyesi yoksa 0 kullanın.",
      initialBalanceError: "Başlangıç bakiyesi negatif olamaz.",
      nameRequired: "Hesap adı zorunludur.",
      institutionName: "Banka veya kurum",
      institutionNamePlaceholder: "Örn. banka, Binance, Metamask",
      pinAccount: "Önemli olarak sabitle",
      pinAccountDescription: "Hesaplar ekranında ilk sırada görünür.",
      cardDesign: "Kart tasarımı",
      cardDesignPlusOnly: "Yalnızca Plus ile kullanılabilir."
    },
    types: {
      bank: {
        label: "Banka",
        description: "Geleneksel banka hesabı."
      },
      cash: {
        label: "Nakit",
        description: "Mevcut fiziksel para."
      },
      piggy_bank: {
        label: "Kumbara",
        description: "Bir hedef için ayrılmış fiziksel veya ayrı birikim."
      },
      crypto_exchange: {
        label: "Kripto platformu",
        description: "Binance gibi uygulamalardaki veya diğer kripto platformlarındaki hesap."
      },
      crypto_wallet: {
        label: "Kripto cüzdanı",
        description: "MetaMask gibi kripto saklamak için kullanılan cüzdan veya uygulama."
      },
      credit_card: {
        label: "Kredi kartı",
        description: "Borcu veya kullanılmış kredi limiti olan kart."
      },
      loan_receivable: {
        label: "Alınacak borç",
        description: "Başka birinin size borçlu olduğu para."
      },
      loan_payable: {
        label: "Ödenecek borç",
        description: "Geri ödemeniz gereken para."
      },
      custom: {
        label: "Özel hesap",
        description: "Kullanıcı tarafından tanımlanan hesap türü."
      }
    },
    cardDesigns: {
      default: {
        label: "Standart",
        description: "Her hesap için sade tasarım."
      },
      minimal: {
        label: "Minimal",
        description: "Daha sade ve zarif."
      },
      gradient: {
        label: "Gradyan",
        description: "Daha modern bir görsel stil."
      },
      blue: {
        label: "Marka mavisi",
        description: "Orvian’ın ana mavi rengini kullanır."
      },
      dark: {
        label: "Koyu",
        description: "Koyu görünümlü şık stil."
      },
      premium: {
        label: "Premium",
        description: "Öne çıkan hesaplar için daha özel tasarım."
      }
    },
    groups: {
      regular: "Geleneksel",
      crypto: "Kripto"
    },
    summary: {
      regularTotal: "Geleneksel toplam",
      cryptoTotal: "Kripto toplamı",
      accountCount: "{{count}} hesap"
    },
    emptyCryptoAccounts: "Henüz kripto hesabınız yok.",
    emptyRegularAccounts: "Henüz geleneksel hesabınız yok.",
    detail: {
      description: "Bu hesabın bilgilerini ve ayarlarını yönetin.",
      notFoundTitle: "Hesap bulunamadı",
      notFoundDescription: "Bu hesap artık mevcut değil veya arşivlendi.",
      type: "Tür",
      institution: "Kurum",
      mainCurrency: "Ana para birimi",
      archiveTitle: "Hesabı arşivle",
      archiveDescription: "Bu hesap ana listenizde artık görünmez, ancak verileri korunur.",
      archiveAction: "Arşivle",
      settings: "Ayarlar",
      recentMovements: "Son hareketler",
      recentMovementsDescription: "Son 2 aydaki onaylanmış işlemler.",
      noRecentMovements: "Bu hesapta son hareket yok."
    }
  },
  movements: {
    title: "Hareketler",
    description: "Hesaplarınız arasında gelir, gider ve transferleri kaydedin.",
    newMovement: "Yeni hareket",
    newTransfer: "Yeni transfer",
    registerMovement: "Hareket kaydet",
    emptyTitle: "Henüz hareketiniz yok",
    emptyDescription: "Finans geçmişinizi oluşturmaya başlamak için ilk gelirinizi, giderinizi veya transferinizi kaydedin.",
    incomeExpense: "Gelir / Gider",
    income: "Gelir",
    expense: "Gider",
    transfer: "Transfer",
    freePlanRemaining: "Ücretsiz plan: bu ay {{count}} hareket kullanılabilir.",
    plusPlanUnlimited: "Plus planı: sınırsız hareket.",
    firstCreateAccountTitle: "Önce bir hesap oluşturun",
    firstCreateAccountDescription: "Gelir veya gider kaydetmek için en az bir aktif hesaba ihtiyacınız var.",
    limitTitle: "Ücretsiz hareket limitine ulaştınız",
    limitDescription: "Ücretsiz plan ayda en fazla 30 harekete izin verir. Sınırsız hareket kaydetmek için Plus'ı etkinleştirin.",
    deleteMovementTitle: "Hareketi sil",
    deleteMovementDescription: "Bu işlem, bu hareketin etkilediği bakiyeyi geri alacaktır.",
    deleteTransferTitle: "Transferi sil",
    deleteTransferDescription: "Bu işlem, bu transferin etkilediği bakiyeleri geri alacaktır.",
    editMovement: "Hareketi düzenle",
    editTransfer: "Transferi düzenle",
    saveMovement: "Hareketi kaydet",
    saveTransfer: "Transferi kaydet",
    form: {
      account: "Hesap",
      category: "Kategori",
      amount: "Tutar",
      tags: "Etiketler",
      note: "Not",
      notePlaceholder: "Örn. market alışverişi",
      selectedAccountNotFound: "Seçilen hesap mevcut değil.",
      insufficientBalance: "Bu hesapta yeterli paranız yok.",
      createDescription: "Onaylanmış bir gelir veya gider kaydedin.",
      amountRequired: "Tutar 0'dan büyük olmalıdır.",
      accountRequired: "Bir hesap seçin.",
      categoryRequired: "Bir kategori seçin.",
      allTagsSelected: "Kullanılabilir tüm etiketleri zaten seçtiniz.",
      accountCurrency: "Para birimi: {{currency}}"
    },
    card: {
      defaultTitle: "Hareket",
      deletedAccount: "Silinen hesap"
    },
    transferCard: {
      fromAccountFallback: "Kaynak hesap",
      toAccountFallback: "Hedef hesap",
      sent: "Gönderildi",
      received: "Alındı",
      fee: "Ücret",
      exchangeRate: "Kullanılan kur: 1 {{fromCurrency}} = {{exchangeRate}} {{toCurrency}}"
    },
    transferForm: {
      fromAccount: "Kaynak hesap",
      toAccount: "Hedef hesap",
      fromAmount: "Gönderilen tutar",
      toAmount: "Alınan tutar",
      note: "Not",
      notePlaceholder: "Örn. birikim hesabına transfer",
      differentAccountsRequired: "Farklı hesaplar seçin.",
      description: "Hesaplar arasında para taşıyın ve ücretleri veya döviz dönüşümünü kaydedin.",
      fromAccountRequired: "Bir kaynak hesap seçin.",
      toAccountRequired: "Bir hedef hesap seçin.",
      fromAmountRequired: "Gönderilen tutar 0'dan büyük olmalıdır.",
      toAmountRequired: "Alınan tutar 0'dan büyük olmalıdır.",
      feeInvalid: "Ücret negatif olamaz.",
      insufficientBalance: "Bu transfer için kaynak hesapta yeterli paranız yok.",
      multiCurrencyBlockedByPlan: "Ücretsiz plan yalnızca aynı para birimindeki hesaplar arasında transfere izin verir.",
      fromAmountWithCurrency: "Gönderilen tutar {{currency}}",
      toAmountWithCurrency: "Alınan tutar {{currency}}",
      feeAmountWithCurrency: "Ücret {{currency}}",
      calculatedExchangeRate: "Hesaplanan döviz kuru",
      multiCurrencyPlusTitle: "Para birimleri arası transferler Plus'ta kullanılabilir",
      multiCurrencyPlusDescription: "Ücretsiz planda aynı para birimindeki hesaplar arasında transfer yapabilirsiniz. Döviz dönüşümlü transferler için Plus'ı etkinleştirin."
    }
  },
  statistics: {
    title: "İstatistikler",
    description: "Gelirlerinizi, giderlerinizi, transferlerinizi ve kategorilerinizi inceleyin.",
    filters: "Rapor filtreleri",
    applyFilters: "Filtreleri uygula",
    clearFilters: "Filtreleri temizle",
    filtersDescription: "Dönemi, hesabı, kategoriyi ve para birimini ayarlayın.",
    cards: {
      income: "Gelir",
      expenses: "Giderler",
      transfers: "Transferler",
      commissions: "Ücretler",
      periodBalance: "Dönem sonucu"
    },
    charts: {
      incomeVsExpense: "Gelir ve gider karşılaştırması",
      incomeVsExpenseDescription: "Giren ve çıkan paranın aylık karşılaştırması.",
      balanceEvolution: "Bakiye gelişimi",
      balanceEvolutionDescription: "Son aylardaki birikimli bakiye.",
      topExpenseCategories: "En yüksek gider kategorileri",
      topExpenseCategoriesDescription: "En fazla para çıkışı olan kategoriler.",
      budgetUsed: "Kullanılan bütçe",
      budgetUsedDescription: "Mevcut aylık bütçenin ilerlemesi.",
      expensesByCategory: "Kategoriye göre giderler",
      accountSummary: "Hesap özeti"
    },
    empty: {
      noBudget: "Bu grafiği görmek için aylık bütçe oluşturun.",
      noMovements: "İstatistikleri görmek için hareket kaydedin.",
      noExpenses: "Bu dönemde henüz gider kaydedilmedi.",
      noIncome: "Bu dönemde henüz gelir kaydedilmedi.",
      noIncomeExpenseChart: "Grafik oluşturmak için gelir veya gider verisi yok.",
      noBalanceTrend: "Eğilim göstermek için henüz yeterli bakiye verisi yok.",
      noExpenseCategoriesChart: "Grafik oluşturmak için kategoriye göre gider yok.",
      noFilterDataTitle: "Bu filtreler için veri yok",
      noFilterDataDescription: "İstatistikleri görmek için dönemi değiştirin veya hareket kaydedin.",
      noExpensesForFilters: "Bu filtreler için gider yok."
    },
    labels: {
      income: "Gelir",
      expenses: "Giderler",
      others: "Diğerleri",
      top: "En yüksek",
      balance: "Bakiye",
      used: "Kullanıldı",
      spentAmount: "{{amount}} harcandı",
      limitAmount: "Limit: {{amount}}",
      noCategory: "Kategori yok",
      balanceAmount: "Bakiye: {{amount}}"
    }
  },
  reports: {
    export: {
      title: "Özeti dışa aktar",
      description: "Hesaplarınızı, gelirlerinizi, giderlerinizi ve transferlerinizi bir dosya olarak indirin."
    },
    filters: {
      title: "Filtreler",
      panelDescription: "Analiz etmek istediğiniz dönemi ve verileri ayarlayın.",
      period: "Dönem",
      account: "Hesap",
      category: "Kategori",
      currency: "Para birimi",
      from: "Başlangıç",
      to: "Bitiş",
      movementKind: "Hareket türü"
    },
    periods: {
      current_month: {
        label: "Mevcut ay",
        description: "Mevcut ayın hareketleri."
      },
      last_month: {
        label: "Geçen ay",
        description: "Geçen ayın hareketleri."
      },
      last_3_months: {
        label: "Son 3 ay",
        description: "Son üç ayın hareketleri."
      },
      current_year: {
        label: "Mevcut yıl",
        description: "Mevcut yılın hareketleri."
      },
      custom: {
        label: "Özel",
        description: "Tarih aralığını manuel olarak seçin."
      }
    },
    movementKinds: {
      all: {
        label: "Tümü",
        description: "Gelirler ve giderler."
      },
      income: {
        label: "Gelir",
        description: "Yalnızca gelen para."
      },
      expense: {
        label: "Giderler",
        description: "Yalnızca çıkan para."
      }
    },
    accounts: {
      all: {
        label: "Tüm hesaplar",
        description: "Tüm aktif hesapları içerir."
      }
    },
    categories: {
      all: {
        label: "Tüm kategoriler",
        description: "Kategoriye göre filtreleme yapma."
      }
    },
    currencies: {
      main: {
        label: "Ana para birimi",
        description: "Özet için ana para birimini kullan."
      }
    }
  },
  settings: {
    title: "Ayarlar",
    description: "Deneyiminizi, verilerinizi, gizliliğinizi ve planınızı yapılandırın.",
    appearance: "Görünüm",
    theme: "Tema",
    currentTheme: "Mevcut tema: {{theme}}",
    themeModes: {
      system: "Sistem",
      dark: "Koyu",
      light: "Açık"
    },
    language: "Dil",
    languageDescription: "Orvian arayüz dilini seçin.",
    languagePickerLabel: "Dil",
    currentPlan: "Mevcut plan",
    currentPlanDescription: "{{plan}} planını kullanıyorsunuz.",
    freePlanName: "Ücretsiz",
    viewPlans: "Planları gör",
    shortcuts: "Kısayollar",
    viewBudgets: "Bütçeleri gör",
    viewReminders: "Hatırlatmaları gör",
    privacy: "Gizlilik",
    privacyDescription: "Verilerinizin Orvian içinde nasıl işlendiğini kontrol edin.",
    privacyPolicy: "Gizlilik politikası",
    openPrivacyPolicy: "Gizlilik politikasını gör",
    exportData: "Verileri dışa aktar",
    exportDescription: "Hesaplarınız, hareketleriniz ve transferlerinizle dosyalar oluşturun.",
    exporting: "Dışa aktarılıyor...",
    exportCsv: "CSV dışa aktar",
    exportExcel: "Excel dışa aktar",
    importData: "Veri içe aktar",
    importDescription: "CSV dosyasından hareketleri yükleyin.",
    localData: "Yerel veriler",
    localDataDescription: "Verileriniz bu cihazda kaydedilir. Hesap senkronizasyonu daha sonra etkinleştirilebilir.",
    viewOnboardingAgain: "Tanıtımı tekrar gör",
    resetData: "Yerel verileri sil",
    about: "Orvian hakkında",
    aboutDescription: "Orvian; hesaplarınızı, giderlerinizi, bütçelerinizi ve kişisel özetlerinizi düzenlemenize yardımcı olur.",
    app: "Uygulama",
    version: "Sürüm",
    developer: "Geliştirici",
    visitDeveloperWebsite: "Geliştirici web sitesini ziyaret et",
    linkErrorTitle: "Bağlantı açılamadı",
    linkErrorDescription: "Cihazınız şu anda bu web sitesini açamıyor.",
    privacyLinkErrorDescription: "Cihazınız şu anda gizlilik politikasını açamıyor.",
    resetDataTitle: "Yerel verileri sil",
    resetDataDescription: "Bu işlem, bu cihazda kayıtlı hesapları, hareketleri, transferleri, hatırlatmaları ve ayarları silecektir.",
    resetDataConfirm: "Sil",
    exportErrorTitle: "Dışa aktarılamadı",
    exportCsvErrorDescription: "CSV dosyası oluşturulurken bir hata oluştu.",
    exportExcelErrorDescription: "Excel dosyası oluşturulurken bir hata oluştu."
  },
  onboarding: {
    welcome: {
      title: "Paranızı tek bir yerden yönetin",
      description: "Hesapları, gelirleri, giderleri, transferleri, hatırlatmaları ve finansal planları yerel ve gizli bir uygulamadan kaydedin.",
      balanceCardTitle: "Bakiyeniz burada başlar",
      income: "Gelir",
      expenses: "Giderler",
      start: "Başla"
    },
    setup: {
      stepLabel: "Adım {{step}} / {{total}}",
      title: "Deneyiminizi ayarlayın",
      description: "Bu yanıtlar, hesap oluşturmanızı zorunlu kılmadan uygulamayı kişiselleştirir."
    },
    stepOne: {
      mainCurrency: "Ana para birimi",
      calculateTotalNetWorth: "Tüm paramı hesapla",
      calculateTotalNetWorthDescription: "Bankaları, nakdi, kriptoyu ve diğer hesapları tek bir genel bakiyede toplayın.",
      userType: "Kullanıcı türü"
    },
    stepTwo: {
      cryptoUsage: "Kripto para kullanımı",
      multiCurrencyUsage: "Birden fazla para birimi kullanımı"
    },
    stepThree: {
      mainGoal: "Ana hedef",
      activateFinancialReminders: "Finansal hatırlatmaları etkinleştir",
      activateFinancialRemindersDescription: "Bu, ödemeleri, tahsilatları, alışverişleri veya birikimleri hatırlamanıza yardımcı olur.",
      viewPlans: "Planları gör"
    },
    options: {
      userProfile: {
        personal: {
          label: "Kişisel",
          description: "Kişisel finansımı yönetmek istiyorum."
        },
        freelancer: {
          label: "Profesyonel",
          description: "Projelerden veya müşterilerden gelir elde ediyorum."
        },
        entrepreneur: {
          label: "Girişimci",
          description: "Bir işletmenin veya girişimin parasını yönetiyorum."
        },
        investor: {
          label: "Yatırımcı",
          description: "Varlıkları, kriptoyu veya yatırımları takip etmek istiyorum."
        },
        student: {
          label: "Öğrenci",
          description: "Giderleri ve birikimleri düzenlemek istiyorum."
        }
      },
      cryptoUsage: {
        none: {
          label: "Kripto kullanmıyorum",
          description: "Binance veya MetaMask gibi hesaplara ihtiyacım yok."
        },
        basic: {
          label: "Evet, kripto kullanıyorum",
          description: "Borsaları, cüzdanları veya dijital varlıkları kaydetmek istiyorum."
        },
        advanced: {
          label: "Kripto kullanıyorum ama önceliğim değil",
          description: "Kriptoyu kaydetmek istiyorum ama benim için en önemli şey bu değil."
        }
      },
      multiCurrencyUsage: {
        none: {
          label: "Tek para birimi kullanıyorum",
          description: "Paramı genellikle tek bir para biriminde yönetiyorum."
        },
        occasional: {
          label: "Bazen",
          description: "Bazen farklı para birimlerinde hesaplar kullanıyorum."
        },
        frequent: {
          label: "Sık sık",
          description: "Birden fazla para biriminde hesapları sık kullanıyorum."
        }
      },
      financialGoal: {
        control_expenses: {
          label: "Giderleri kontrol etmek",
          description: "Paramın nereye gittiğini bilmek istiyorum."
        },
        save_more: {
          label: "Daha fazla biriktirmek",
          description: "Hedefler ve yedek para için para ayırmak istiyorum."
        },
        pay_debts: {
          label: "Borçları ödemek",
          description: "Borçlarımı ve bekleyen ödemelerimi düzenlemek istiyorum."
        },
        track_income: {
          label: "Gelirimi takip etmek",
          description: "Gelir kaynaklarımı net bir şekilde kontrol etmek istiyorum."
        },
        understand_investments: {
          label: "Yatırımlarımı anlamak",
          description: "Varlıklarımı, kriptoyu veya yatırımlarımı daha iyi takip etmek istiyorum."
        },
        avoid_small_expenses: {
          label: "Küçük günlük giderlerden kaçınmak",
          description: "Küçük günlük harcamaları belirlemek ve kontrol etmek istiyorum."
        }
      }
    },
    plans: {
      title: "Nasıl başlamak istediğinizi seçin",
      description: "Uygulamayı ücretsiz kullanabilir ve gelişmiş özellikleri daha sonra etkinleştirebilirsiniz."
    }
  },
  budgets: {
    title: "Bütçeler",
    description: "Giderlerinizi kontrol etmek için aylık limitler belirleyin.",
    allCategoriesAlreadyBudgeted: "Mevcut tüm kategoriler için zaten limit eklediniz.",
    budgetedCategories: "Limitli kategoriler",
    budgetOf: "{{period}} bütçesi",
    currentSpendingVsBudget: "Mevcut harcama, aylık limitinizle karşılaştırıldı.",
    spent: "Harcanan",
    limit: "Limit",
    limitedCategories: "Limitli kategoriler",
    spentOfLimit: "{{limit}} içinden {{spent}}",
    currentEmptyTitle: "Bu ay bütçeniz yok",
    currentEmptyDescription: "{{period}} için bir bütçe oluşturun.",
    createMonthlyBudget: "Aylık bütçe oluştur",
    historyTitle: "Bütçe geçmişi",
    generalLimitValue: "Genel limit: {{amount}} {{currency}}",
    modalDescription: "Aylık giderlerinizi kontrol etmek için limitler belirleyin.",
    status: {
      exceeded: "Aylık bütçenizi aştınız.",
      warning: "Aylık bütçenize yaklaşmış durumdasınız.",
      safe: "Harcamalarınız bütçe içinde.",
      used: "Kullanıldı",
      spentAmount: "{{amount}} harcandı",
      limitAmount: "Limit: {{amount}}"
    },
    newBudget: "Yeni bütçe",
    editBudget: "Bütçeyi düzenle",
    createBudget: "Bütçe oluştur",
    saveBudget: "Bütçeyi kaydet",
    deleteBudget: "Bütçeyi sil",
    monthLabel: "{{month}} {{year}}",
    generalMonthlyBudget: "Genel aylık bütçe",
    generalBudgetPlaceholder: "Örn. 500",
    categoryBudgetTitle: "Kategoriye göre bütçe",
    categoryBudgetDescription: "Yalnızca kontrol etmek istediğiniz gider kategorilerine limit ekleyin.",
    expenseCategory: "Gider kategorisi",
    monthlyLimit: "Aylık limit",
    monthlyLimitPlaceholder: "Örn. 120",
    addCategory: "Kategori ekle",
    removeCategory: "Kategoriyi kaldır",
    budgetUsed: "Kullanılan bütçe",
    remainingBudget: "Kalan bütçe",
    exceededBudget: "Aşılan bütçe",
    emptyTitle: "Henüz bütçeniz yok",
    emptyDescription: "Giderlerinizi daha iyi kontrol etmek için aylık bütçe oluşturun.",
    deleteTitle: "Bütçeyi sil",
    deleteDescription: "Bu bütçe ve kategori limitleri silinecek.",
    errors: {
      generalRequired: "Genel bütçe zorunludur.",
      generalGreaterThanZero: "Genel bütçe 0'dan büyük olmalıdır.",
      categoryRequired: "Bir kategori seçin.",
      categoryLimitRequired: "Aylık limit zorunludur.",
      categoryLimitGreaterThanZero: "Aylık limit 0'dan büyük olmalıdır.",
      duplicatedCategory: "Bu kategoriye zaten bir bütçe atanmış."
    }
  },
  reminders: {
    title: "Hatırlatmalar",
    description: "Ödemeleri, tahsilatları, alışverişleri veya yatırımları planlayın.",
    newReminder: "Yeni hatırlatma",
    saveReminder: "Hatırlatmayı kaydet",
    createReminder: "Hatırlatma oluştur",
    completeTitle: "Hatırlatmayı tamamla",
    completeDescription: "Bu hatırlatmayı tamamlandı olarak işaretlemek istiyor musunuz?",
    cancelTitle: "Hatırlatmayı iptal et",
    cancelDescription: "Bu hatırlatmayı iptal etmek istiyor musunuz?",
    confirmCancel: "Evet, iptal et",
    emptyTitle: "Henüz hatırlatmanız yok",
    emptyDescription: "Ödemeler, tahsilatlar, abonelikler, alışverişler veya birikimler için hatırlatmalar oluşturun.",
    complete: "Tamamla",
    form: {
      title: "Başlık",
      titlePlaceholder: "Örn. internet faturasını öde",
      amountOptional: "İsteğe bağlı tutar",
      amountPlaceholder: "0.00",
      type: "Tür",
      frequency: "Sıklık",
      date: "Tarih",
      time: "Saat",
      relatedAccount: "İlgili hesap",
      descriptionOptional: "İsteğe bağlı açıklama",
      descriptionPlaceholder: "Örn. her ayın 5'inde son ödeme tarihi...",
      titleRequired: "Başlık zorunludur.",
      amountInvalid: "Tutar 0'a eşit veya 0'dan büyük olmalıdır.",
      futureDateRequired: "Tarih gelecekte olmalıdır."
    },
    card: {
      defaultType: "Hatırlatma"
    },
    types: {
      payment: {
        label: "Ödeme",
        description: "Hizmetler, borçlar, kart veya ödenecek taahhütler."
      },
      collection: {
        label: "Tahsilat",
        description: "Birinin size ödemesi gereken para."
      },
      subscription: {
        label: "Abonelik",
        description: "Netflix, Spotify, yazılım veya diğer tekrarlayan ödemeler."
      },
      saving: {
        label: "Birikim",
        description: "Para ayırmak için hatırlatma."
      },
      investment: {
        label: "Yatırım",
        description: "Varlık veya kripto düzenli alımı."
      },
      purchase: {
        label: "Alışveriş",
        description: "Planlanmış önemli alışveriş."
      },
      custom: {
        label: "Özel",
        description: "Özel finansal hatırlatma."
      }
    },
    frequencies: {
      once: {
        label: "Bir kez",
        description: "Yalnızca seçilen tarihte bildirim alırsınız."
      },
      daily: {
        label: "Günlük",
        description: "Her gün tekrar eder."
      },
      weekly: {
        label: "Haftalık",
        description: "Her hafta tekrar eder."
      },
      monthly: {
        label: "Aylık",
        description: "Her ay tekrar eder."
      }
    }
  },
  plans: {
    title: "Planlar",
    description: "Finansınızı düzenleme şeklinize en uygun planı seçin.",
    currentPlan: "Mevcut plan",
    free: "Ücretsiz",
    plus: "Plus",
    demoDescription: "Ücretsiz başlayın ve ihtiyaç duyduğunuzda gelişmiş özellikleri etkinleştirin.",
    monthlyPeriod: "aylık",
    yearlyAvailable: "Yıllık ${{price}} olarak da kullanılabilir.",
    plusActive: "Plus aktif",
    activatePlusDemo: "Plus demosunu etkinleştir",
    freeActive: "Ücretsiz aktif",
    backToFree: "Ücretsiz plana dön",
    freePlan: {
      name: "Ücretsiz",
      description: "Kişisel finansınızı düzenlemeye başlamak için ideal.",
      price: "$0",
      period: "Sonsuza kadar",
      cta: "Ücretsiz devam et",
      current: "Mevcut plan",
      features: {
        accountsLimit: "En fazla 3 hesap",
        movementsLimit: "Ayda en fazla 30 hareket",
        basicStatistics: "Temel istatistikler",
        localData: "Veriler yerel olarak kaydedilir"
      }
    },
    plusPlan: {
      name: "Plus",
      description: "Tam finansal kontrol isteyen kullanıcılar için.",
      price: "{{price}}",
      period: "aylık",
      cta: "Plus'ı etkinleştir",
      features: {
        unlimitedAccounts: "Sınırsız hesap",
        unlimitedMovements: "Sınırsız hareket",
        advancedStatistics: "Gelişmiş istatistikler",
        budgets: "Aylık bütçeler",
        reminders: "Finansal hatırlatmalar",
        exportData: "Veri dışa aktarımı",
        priorityFeatures: "Gelişmiş özelliklere erişim"
      }
    },
    restorePurchase: "Satın almayı geri yükle",
    continueWithoutPlus: "Plus olmadan devam et",
    errors: {
      purchaseUnavailable: "Satın alma şu anda kullanılamıyor.",
      restoreUnavailable: "Satın alma şu anda geri yüklenemedi."
    }
  },
  categories: {
    salary: "Maaş",
    freelance: "Proje / Freelance",
    sales: "Satışlar",
    business_income: "İşletme",
    investment_income: "Yatırım",
    gift_income: "Hediye / Ek gelir",
    refund: "İade",
    loan_received: "Alınan borç",
    rental_income: "Kira geliri",
    other_income: "Diğer gelir",
    food: "Yemek",
    groceries: "Market",
    restaurants: "Restoranlar",
    transport: "Ulaşım",
    fuel: "Yakıt",
    taxi_rideshare: "Taksi / Uygulamalar",
    housing: "Konut",
    rent: "Kira",
    services: "Hizmetler",
    electricity: "Elektrik",
    water: "Su",
    internet_phone: "İnternet / Telefon",
    health: "Sağlık",
    medicine: "İlaç",
    education: "Eğitim",
    entertainment: "Eğlence",
    subscriptions: "Abonelikler",
    technology: "Teknoloji",
    clothing: "Giyim",
    personal_care: "Kişisel bakım",
    family: "Aile",
    pets: "Evcil hayvanlar",
    travel: "Seyahat",
    gifts: "Hediyeler",
    taxes: "Vergiler",
    fees: "Ücretler",
    debt_payment: "Borç ödemesi",
    savings: "Birikim",
    investment_expense: "Yatırım",
    cash_withdrawal: "Nakit çekme",
    other: "Diğer"
  },
  tags: {
    essential: "Temel",
    optional: "İsteğe bağlı",
    urgent: "Acil",
    recurring: "Tekrarlayan",
    planned: "Planlı",
    unplanned: "Plansız",
    cash: "Nakit",
    card: "Kart",
    transfer: "Transfer",
    online: "Çevrim içi",
    subscription: "Abonelik",
    work: "İş",
    personal: "Kişisel",
    family: "Aile",
    business: "İşletme",
    tax: "Vergi",
    invoice: "Fatura",
    debt: "Borç",
    savings: "Birikim",
    small_expense: "Küçük günlük gider"
  }
} as const;
