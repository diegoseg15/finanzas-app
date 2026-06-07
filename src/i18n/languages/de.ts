export const de = {
  common: {
    appName: "Orvian",
    cancel: "Abbrechen",
    save: "Speichern",
    edit: "Bearbeiten",
    delete: "Löschen",
    close: "Schließen",
    continue: "Weiter",
    back: "Zurück",
    next: "Weiter",
    confirm: "Bestätigen",
    apply: "Anwenden",
    clear: "Leeren",
    add: "Hinzufügen",
    create: "Erstellen",
    update: "Aktualisieren",
    remove: "Entfernen",
    search: "Suchen",
    select: "Auswählen",
    loading: "Wird geladen...",
    saving: "Wird gespeichert...",
    exporting: "Wird exportiert...",
    error: "Fehler",
    success: "Fertig",
    required: "Erforderlich",
    optional: "Optional",
    amount: "Betrag",
    date: "Datum",
    time: "Uhrzeit",
    title: "Titel",
    description: "Beschreibung",
    note: "Notiz",
    category: "Kategorie",
    currency: "Währung",
    account: "Konto",
    type: "Typ",
    frequency: "Häufigkeit",
    freePlan: "Kostenloser Plan",
    plusPlan: "Plus-Plan",
    month: "Monat",
    monthly: "Monatlich",
    total: "Gesamt",
    balance: "Saldo",
    income: "Einnahme",
    expense: "Ausgabe",
    transfer: "Überweisung",
    commission: "Gebühr",
    noData: "Keine Daten",
    notAvailable: "Nicht verfügbar",
    no: "Nein",
    transfers: "Überweisungen",
    skip: "Überspringen"
  },
  tabs: {
    home: "Start",
    accounts: "Konten",
    movements: "Transaktionen",
    statistics: "Statistiken",
    settings: "Einstellungen",
    more: "Mehr",
    budgets: "Budgets",
    loans: "Darlehen"
  },
  home: {
    totalEstimated: "Geschätztes Gesamtvermögen",
    totalEstimatedBalance: "Geschätzter Gesamtsaldo",
    monthlyExpenses: "Ausgaben des Monats",
    monthlyIncome: "Einnahmen des Monats",
    monthlyBalance: "Monatsergebnis",
    available: "Verfügbar",
    accounts: "Konten",
    upcomingReminders: "Anstehende Erinnerungen",
    viewAll: "Alle anzeigen",
    noUpcomingReminders: "Sie haben keine anstehenden Erinnerungen.",
    recentActivity: "Letzte Aktivität",
    noRegisteredMovements: "Sie haben noch keine Transaktionen erfasst.",
    noActivity: "Noch keine Aktivität.",
    viewAllAccounts: "Alle anzeigen",
    monthlySummary: "Monatsübersicht"
  },
  accounts: {
    title: "Konten",
    description: "Erfassen Sie Banken, Bargeld, Kryptowährungen, Karten und Kredite.",
    newAccount: "Neues Konto",
    firstAccount: "Erstes Konto erstellen",
    createTitle: "Neues Konto",
    editTitle: "Konto bearbeiten",
    emptyTitle: "Sie haben noch keine Konten",
    emptyDescription: "Erstellen Sie Ihr erstes Konto, um Einnahmen, Ausgaben und Überweisungen zu erfassen.",
    freePlanRemaining: "Kostenloser Plan: {{count}} Konten verfügbar.",
    plusPlanUnlimited: "Plus-Plan: unbegrenzte Konten.",
    limitTitle: "Sie haben das Limit für kostenlose Konten erreicht",
    limitDescription: "Der kostenlose Plan erlaubt bis zu 3 Konten. Aktivieren Sie Plus, um unbegrenzt Konten zu erstellen.",
    deleteTitle: "Konto löschen",
    deleteDescription: "Dieses Konto wird aus der aktiven Liste ausgeblendet. Die bisherigen Transaktionen bleiben erhalten.",
    saveAccount: "Konto speichern",
    saveChanges: "Änderungen speichern",
    card: {
      customAccount: "Benutzerdefiniertes Konto",
      currentBalance: "Aktueller Saldo",
      includedInTotal: "Im geschätzten Gesamtbetrag enthalten",
      excludedFromTotal: "Nicht im geschätzten Gesamtbetrag enthalten",
      options: "Optionen"
    },
    form: {
      createTitle: "Neues Konto",
      editTitle: "Konto bearbeiten",
      editDescription: "Aktualisieren Sie die wichtigsten Daten dieses Kontos.",
      createDescription: "Richten Sie die wichtigsten Daten dieses Kontos ein.",
      name: "Kontoname",
      namePlaceholder: "Z. B. Pichincha Bank",
      currentBalance: "Aktueller Saldo",
      initialBalance: "Anfangssaldo",
      balancePlaceholder: "0.00",
      balanceEditInfo: "Der Saldo wird durch das Erfassen von Transaktionen aktualisiert, nicht durch das Bearbeiten des Kontos.",
      type: "Kontotyp",
      mainCurrency: "Hauptwährung",
      currencyCrypto: "Kryptowährung",
      currencyFiat: "Traditionelle Währung",
      currencyCustom: "Benutzerdefiniert",
      currencyEditInfo: "Die Hauptwährung kann beim Bearbeiten nicht geändert werden, damit der Transaktionsverlauf nicht beschädigt wird.",
      includeInTotal: "Zum geschätzten Gesamtbetrag hinzufügen",
      includeInTotalDescription: "Aktivieren Sie dies, wenn dieses Konto zu Ihrem Gesamtsaldo hinzugefügt werden soll.",
      initialBalanceRequired: "Der Anfangssaldo ist erforderlich. Verwenden Sie 0, wenn kein Saldo vorhanden ist.",
      initialBalanceError: "Der Anfangssaldo darf nicht negativ sein.",
      nameRequired: "Der Kontoname ist erforderlich.",
      institutionName: "Bank oder Institution",
      institutionNamePlaceholder: "Z. B. Bank, Binance, Metamask",
      pinAccount: "Als wichtig anheften",
      pinAccountDescription: "Es wird zuerst auf dem Kontenbildschirm angezeigt.",
      cardDesign: "Kartendesign",
      cardDesignPlusOnly: "Nur mit Plus verfügbar.",
      steps: {
        0: {
          description: "Definiere zuerst die Kontoinformationen."
        },
        1: {
          description: "Lege nun Saldo, Währung und Wichtigkeit fest."
        },
        2: {
          description: "Wähle das Aussehen dieser Kontokarte."
        }
      },
      cardDesignUpgradeMessage: "Wechsle zu Plus, um deine Kartendesigns anzupassen.",
      isSavingsTarget: "Konto zum Sparen",
      isSavingsTargetDescription: "Nutze es, um Geld zu trennen, das du nicht ausgeben möchtest."
    },
    types: {
      bank: {
        label: "Bank",
        description: "Traditionelles Bankkonto."
      },
      cash: {
        label: "Bargeld",
        description: "Verfügbares physisches Geld."
      },
      piggy_bank: {
        label: "Sparschwein",
        description: "Physische oder getrennte Ersparnisse für ein Ziel."
      },
      crypto_exchange: {
        label: "Krypto-Plattform",
        description: "Konto in Apps wie Binance oder anderen Krypto-Plattformen."
      },
      crypto_wallet: {
        label: "Krypto-Wallet",
        description: "Wallet wie MetaMask oder andere Apps zum Speichern von Krypto."
      },
      credit_card: {
        label: "Kreditkarte",
        description: "Karte mit Schulden oder genutztem Kreditlimit."
      },
      loan_receivable: {
        label: "Zu erhaltendes Darlehen",
        description: "Geld, das Ihnen jemand schuldet."
      },
      loan_payable: {
        label: "Zu zahlendes Darlehen",
        description: "Geld, das Sie zurückzahlen müssen."
      },
      custom: {
        label: "Benutzerdefiniertes Konto",
        description: "Vom Benutzer definierter Kontotyp."
      }
    },
    cardDesigns: {
      default: {
        label: "Standard",
        description: "Klares Design für jedes Konto."
      },
      minimal: {
        label: "Minimal",
        description: "Dezenter und zurückhaltender."
      },
      gradient: {
        label: "Verlauf",
        description: "Ein modernerer visueller Stil."
      },
      blue: {
        label: "Markenblau",
        description: "Verwendet Orvians blauen Hauptakzent."
      },
      dark: {
        label: "Dunkel",
        description: "Eleganter Stil mit dunkler Optik."
      },
      premium: {
        label: "Premium",
        description: "Exklusiveres Design für hervorgehobene Konten."
      }
    },
    groups: {
      regular: "Traditionell",
      crypto: "Krypto"
    },
    summary: {
      regularTotal: "Traditionelle Summe",
      cryptoTotal: "Krypto-Summe",
      accountCount: "{{count}} Konto"
    },
    emptyCryptoAccounts: "Du hast noch keine Krypto-Konten.",
    emptyRegularAccounts: "Du hast noch keine traditionellen Konten.",
    detail: {
      description: "Verwalte die Informationen und Einstellungen dieses Kontos.",
      notFoundTitle: "Konto nicht gefunden",
      notFoundDescription: "Dieses Konto existiert nicht mehr oder wurde archiviert.",
      type: "Typ",
      institution: "Institution",
      mainCurrency: "Hauptwährung",
      archiveTitle: "Konto archivieren",
      archiveDescription: "Dieses Konto erscheint nicht mehr in deiner Hauptliste, aber die Daten bleiben erhalten.",
      archiveAction: "Archivieren",
      settings: "Einstellungen",
      recentMovements: "Letzte Bewegungen",
      recentMovementsDescription: "Bestätigte Aktivität der letzten 2 Monate.",
      noRecentMovements: "Es gibt keine aktuellen Bewegungen in diesem Konto.",
      actions: "Aktionen",
      archive: "Konto archivieren",
      edit: "Konto bearbeiten",
      emptyActivity: "Es gibt keine aktuellen Bewegungen in diesem Konto.",
      information: "Informationen",
      priority: "Priorität",
      recentActivity: "Letzte Aktivität",
      totalEstimated: "Geschätzte Summe",
      normal: "Normal",
      pinned: "Angeheftet"
    }
  },
  movements: {
    title: "Transaktionen",
    description: "Erfassen Sie Einnahmen, Ausgaben und Überweisungen zwischen Ihren Konten.",
    newMovement: "Neue Transaktion",
    newTransfer: "Neue Überweisung",
    registerMovement: "Transaktion erfassen",
    emptyTitle: "Sie haben noch keine Transaktionen",
    emptyDescription: "Erfassen Sie Ihre erste Einnahme, Ausgabe oder Überweisung, um Ihren Finanzverlauf aufzubauen.",
    incomeExpense: "Einnahme / Ausgabe",
    income: "Einnahme",
    expense: "Ausgabe",
    transfer: "Überweisung",
    freePlanRemaining: "Kostenloser Plan: {{count}} Transaktionen in diesem Monat verfügbar.",
    plusPlanUnlimited: "Plus-Plan: unbegrenzte Transaktionen.",
    firstCreateAccountTitle: "Erstellen Sie zuerst ein Konto",
    firstCreateAccountDescription: "Sie benötigen mindestens ein aktives Konto, um Einnahmen oder Ausgaben zu erfassen.",
    limitTitle: "Sie haben das Limit für kostenlose Transaktionen erreicht",
    limitDescription: "Der kostenlose Plan erlaubt bis zu 30 Transaktionen pro Monat. Aktivieren Sie Plus, um unbegrenzt Transaktionen zu erfassen.",
    deleteMovementTitle: "Transaktion löschen",
    deleteMovementDescription: "Diese Aktion setzt den durch diese Transaktion beeinflussten Saldo zurück.",
    deleteTransferTitle: "Überweisung löschen",
    deleteTransferDescription: "Diese Aktion setzt die durch diese Überweisung beeinflussten Salden zurück.",
    editMovement: "Transaktion bearbeiten",
    editTransfer: "Überweisung bearbeiten",
    saveMovement: "Transaktion speichern",
    saveTransfer: "Überweisung speichern",
    form: {
      account: "Konto",
      category: "Kategorie",
      amount: "Betrag",
      tags: "Tags",
      note: "Notiz",
      notePlaceholder: "Optionale Notiz",
      selectedAccountNotFound: "Das ausgewählte Konto existiert nicht.",
      insufficientBalance: "Du hast nicht genug Geld auf diesem Konto.",
      createDescription: "Erfassen Sie eine bestätigte Einnahme oder Ausgabe.",
      amountRequired: "Der Betrag muss größer als 0 sein.",
      accountRequired: "Wähle ein Konto aus.",
      categoryRequired: "Wähle eine Kategorie aus.",
      allTagsSelected: "Sie haben bereits alle verfügbaren Tags ausgewählt.",
      accountCurrency: "Währung: {{currency}}"
    },
    card: {
      defaultTitle: "Transaktion",
      deletedAccount: "Gelöschtes Konto"
    },
    transferCard: {
      fromAccountFallback: "Quellkonto",
      toAccountFallback: "Zielkonto",
      sent: "Gesendet",
      received: "Erhalten",
      fee: "Gebühr",
      exchangeRate: "Verwendeter Wechselkurs: 1 {{fromCurrency}} = {{exchangeRate}} {{toCurrency}}"
    },
    transferForm: {
      fromAccount: "Quellkonto",
      toAccount: "Zielkonto",
      fromAmount: "Gesendeter Betrag",
      toAmount: "Erhaltener Betrag",
      note: "Notiz",
      notePlaceholder: "Z. B. Überweisung auf Sparkonto",
      differentAccountsRequired: "Wählen Sie unterschiedliche Konten aus.",
      description: "Verschieben Sie Geld zwischen Konten und erfassen Sie Gebühren oder Währungswechsel.",
      fromAccountRequired: "Wählen Sie ein Quellkonto aus.",
      toAccountRequired: "Wählen Sie ein Zielkonto aus.",
      fromAmountRequired: "Der gesendete Betrag muss größer als 0 sein.",
      toAmountRequired: "Der erhaltene Betrag muss größer als 0 sein.",
      feeInvalid: "Die Gebühr darf nicht negativ sein.",
      insufficientBalance: "Du hast nicht genug Geld auf dem Quellkonto für diese Überweisung.",
      multiCurrencyBlockedByPlan: "Der kostenlose Plan erlaubt nur Überweisungen zwischen Konten mit derselben Währung.",
      fromAmountWithCurrency: "Gesendeter Betrag {{currency}}",
      toAmountWithCurrency: "Erhaltener Betrag {{currency}}",
      feeAmountWithCurrency: "Gebühr {{currency}}",
      calculatedExchangeRate: "Berechneter Wechselkurs",
      multiCurrencyPlusTitle: "Überweisungen zwischen Währungen sind in Plus verfügbar",
      multiCurrencyPlusDescription: "Im kostenlosen Plan können Sie zwischen Konten mit derselben Währung überweisen. Für Überweisungen mit Währungswechsel aktivieren Sie Plus."
    },
    calculatorAmount: "Betrag der Bewegung",
    transferAmount: "Zu überweisender Betrag",
    emptyFilterTitle: "Keine Ergebnisse",
    emptyFilterDescription: "Ändere den Filter, um andere Bewegungen zu sehen.",
    newExpense: "Neue Ausgabe",
    newIncome: "Neue Einnahme"
  },
  statistics: {
    title: "Statistiken",
    description: "Überprüfen Sie Ihre Einnahmen, Ausgaben, Überweisungen und Kategorien.",
    filters: "Berichtsfilter",
    applyFilters: "Filter anwenden",
    clearFilters: "Filter löschen",
    filtersDescription: "Passen Sie Zeitraum, Konto, Kategorie und Währung an.",
    cards: {
      income: "Einnahmen",
      expenses: "Ausgaben",
      transfers: "Überweisungen",
      commissions: "Gebühren",
      periodBalance: "Ergebnis des Zeitraums"
    },
    charts: {
      incomeVsExpense: "Einnahmen vs. Ausgaben",
      incomeVsExpenseDescription: "Monatlicher Vergleich von eingehendem und ausgehendem Geld.",
      balanceEvolution: "Saldoentwicklung",
      balanceEvolutionDescription: "Kumulierte Salden der letzten Monate.",
      topExpenseCategories: "Wichtigste Ausgabenkategorien",
      topExpenseCategoriesDescription: "Kategorien mit dem höchsten Geldabfluss.",
      budgetUsed: "Verwendetes Budget",
      budgetUsedDescription: "Fortschritt des aktuellen Monatsbudgets.",
      expensesByCategory: "Ausgaben nach Kategorie",
      accountSummary: "Kontoübersicht"
    },
    empty: {
      noBudget: "Erstellen Sie ein Monatsbudget, um dieses Diagramm zu sehen.",
      noMovements: "Erfassen Sie Transaktionen, um Statistiken zu sehen.",
      noExpenses: "In diesem Zeitraum wurden noch keine Ausgaben erfasst.",
      noIncome: "In diesem Zeitraum wurden noch keine Einnahmen erfasst.",
      noIncomeExpenseChart: "Es gibt keine Einnahmen- oder Ausgabendaten für das Diagramm.",
      noBalanceTrend: "Es gibt noch nicht genügend Saldodaten, um einen Trend anzuzeigen.",
      noExpenseCategoriesChart: "Es gibt keine Ausgaben nach Kategorie für das Diagramm.",
      noFilterDataTitle: "Keine Daten für diese Filter",
      noFilterDataDescription: "Ändern Sie den Zeitraum oder erfassen Sie Transaktionen, um Statistiken zu sehen.",
      noExpensesForFilters: "Für diese Filter gibt es keine Ausgaben."
    },
    labels: {
      income: "Einnahmen",
      expenses: "Ausgaben",
      others: "Andere",
      top: "Top",
      balance: "Saldo",
      used: "Verwendet",
      spentAmount: "{{amount}} ausgegeben",
      limitAmount: "Limit: {{amount}}",
      noCategory: "Keine Kategorie",
      balanceAmount: "Saldo: {{amount}}"
    }
  },
  reports: {
    export: {
      title: "Übersicht exportieren",
      description: "Laden Sie Ihre Konten, Einnahmen, Ausgaben und Überweisungen in einer Datei herunter."
    },
    filters: {
      title: "Filter",
      panelDescription: "Passen Sie den Zeitraum und die Daten an, die Sie analysieren möchten.",
      period: "Zeitraum",
      account: "Konto",
      category: "Kategorie",
      currency: "Währung",
      from: "Von",
      to: "Bis",
      movementKind: "Transaktionstyp"
    },
    periods: {
      current_month: {
        label: "Aktueller Monat",
        description: "Transaktionen des aktuellen Monats."
      },
      last_month: {
        label: "Letzter Monat",
        description: "Transaktionen des letzten Monats."
      },
      last_3_months: {
        label: "Letzte 3 Monate",
        description: "Transaktionen der letzten drei Monate."
      },
      current_year: {
        label: "Aktuelles Jahr",
        description: "Transaktionen des aktuellen Jahres."
      },
      custom: {
        label: "Benutzerdefiniert",
        description: "Wählen Sie einen Datumsbereich manuell aus."
      }
    },
    movementKinds: {
      all: {
        label: "Alle",
        description: "Einnahmen und Ausgaben."
      },
      income: {
        label: "Einnahmen",
        description: "Nur eingehendes Geld."
      },
      expense: {
        label: "Ausgaben",
        description: "Nur ausgehendes Geld."
      }
    },
    accounts: {
      all: {
        label: "Alle Konten",
        description: "Enthält alle aktiven Konten."
      }
    },
    categories: {
      all: {
        label: "Alle Kategorien",
        description: "Nicht nach Kategorie filtern."
      }
    },
    currencies: {
      main: {
        label: "Hauptwährung",
        description: "Die Hauptwährung für die Übersicht verwenden."
      }
    }
  },
  settings: {
    title: "Einstellungen",
    description: "Konfigurieren Sie Ihre Erfahrung, Daten, Privatsphäre und Ihren Plan.",
    appearance: "Darstellung",
    theme: "Design",
    currentTheme: "Aktuelles Design: {{theme}}",
    themeModes: {
      system: "System",
      dark: "Dunkel",
      light: "Hell"
    },
    language: "Sprache",
    languageDescription: "Wählen Sie die Sprache der Orvian-Oberfläche.",
    languagePickerLabel: "Sprache",
    currentPlan: "Aktueller Plan",
    currentPlanDescription: "Sie verwenden den {{plan}}-Plan.",
    freePlanName: "Kostenlos",
    viewPlans: "Pläne anzeigen",
    shortcuts: "Schnellzugriff",
    viewBudgets: "Budgets anzeigen",
    viewReminders: "Erinnerungen anzeigen",
    privacy: "Privatsphäre",
    privacyDescription: "Überprüfen Sie, wie Ihre Daten in Orvian verarbeitet werden.",
    privacyPolicy: "Datenschutzerklärung",
    openPrivacyPolicy: "Datenschutzerklärung anzeigen",
    exportData: "Daten exportieren",
    exportDescription: "Erstellen Sie Dateien mit Ihren Konten, Transaktionen und Überweisungen.",
    exporting: "Wird exportiert...",
    exportCsv: "CSV exportieren",
    exportExcel: "Excel exportieren",
    importData: "Daten importieren",
    importDescription: "Laden Sie Transaktionen aus einer CSV-Datei.",
    localData: "Lokale Daten",
    localDataDescription: "Ihre Daten werden auf diesem Gerät gespeichert. Kontosynchronisierung kann später aktiviert werden.",
    viewOnboardingAgain: "Einführung erneut anzeigen",
    resetData: "Lokale Daten löschen",
    about: "Über Orvian",
    aboutDescription: "Orvian hilft Ihnen, Konten, Ausgaben, Budgets und persönliche Übersichten zu organisieren.",
    app: "Anwendung",
    version: "Version",
    developer: "Entwickler",
    visitDeveloperWebsite: "Website des Entwicklers besuchen",
    linkErrorTitle: "Link konnte nicht geöffnet werden",
    linkErrorDescription: "Ihr Gerät kann diese Website derzeit nicht öffnen.",
    privacyLinkErrorDescription: "Ihr Gerät kann die Datenschutzerklärung derzeit nicht öffnen.",
    resetDataTitle: "Lokale Daten löschen",
    resetDataDescription: "Dadurch werden Konten, Transaktionen, Überweisungen, Erinnerungen und Einstellungen gelöscht, die auf diesem Gerät gespeichert sind.",
    resetDataConfirm: "Löschen",
    exportErrorTitle: "Export nicht möglich",
    exportCsvErrorDescription: "Beim Erstellen der CSV-Datei ist ein Fehler aufgetreten.",
    exportExcelErrorDescription: "Beim Erstellen der Excel-Datei ist ein Fehler aufgetreten.",
    mainCurrency: "Hauptwährung"
  },
  onboarding: {
    welcome: {
      title: "Verwalten Sie Ihr Geld an einem Ort",
      description: "Erfassen Sie Konten, Einnahmen, Ausgaben, Überweisungen, Erinnerungen und Finanzpläne in einer lokalen und privaten App.",
      balanceCardTitle: "Ihr Saldo beginnt hier",
      income: "Einnahmen",
      expenses: "Ausgaben",
      start: "Starten"
    },
    setup: {
      stepLabel: "Schritt {{step}} von {{total}}",
      title: "Richten Sie Ihre Erfahrung ein",
      description: "Diese Antworten personalisieren die App, ohne dass Sie ein Konto erstellen müssen."
    },
    stepOne: {
      mainCurrency: "Hauptwährung",
      calculateTotalNetWorth: "Mein gesamtes Geld berechnen",
      calculateTotalNetWorthDescription: "Fassen Sie Banken, Bargeld, Krypto und andere Konten in einem Gesamtsaldo zusammen.",
      userType: "Benutzertyp"
    },
    stepTwo: {
      cryptoUsage: "Nutzung von Kryptowährungen",
      multiCurrencyUsage: "Nutzung mehrerer Währungen"
    },
    stepThree: {
      mainGoal: "Hauptziel",
      activateFinancialReminders: "Finanzielle Erinnerungen aktivieren",
      activateFinancialRemindersDescription: "Dies hilft Ihnen, Zahlungen, Zahlungseingänge, Käufe oder Ersparnisse nicht zu vergessen.",
      viewPlans: "Pläne anzeigen"
    },
    options: {
      userProfile: {
        personal: {
          label: "Privat",
          description: "Ich möchte meine persönlichen Finanzen verwalten."
        },
        freelancer: {
          label: "Beruflich",
          description: "Ich erziele Einnahmen aus Projekten oder von Kunden."
        },
        entrepreneur: {
          label: "Unternehmer",
          description: "Ich verwalte Geld für ein Geschäft oder ein Vorhaben."
        },
        investor: {
          label: "Investor",
          description: "Ich möchte Vermögenswerte, Krypto oder Investitionen verfolgen."
        },
        student: {
          label: "Student",
          description: "Ich möchte Ausgaben und Ersparnisse organisieren."
        }
      },
      cryptoUsage: {
        none: {
          label: "Ich nutze keine Krypto",
          description: "Ich brauche keine Konten wie Binance oder MetaMask."
        },
        basic: {
          label: "Ja, ich nutze Krypto",
          description: "Ich möchte Börsen, Wallets oder digitale Vermögenswerte erfassen."
        },
        advanced: {
          label: "Ich nutze Krypto, aber es ist keine Priorität",
          description: "Ich möchte Krypto erfassen, aber es ist nicht das Wichtigste für mich."
        }
      },
      multiCurrencyUsage: {
        none: {
          label: "Ich nutze eine Währung",
          description: "Ich verwalte mein Geld hauptsächlich in einer Währung."
        },
        occasional: {
          label: "Manchmal",
          description: "Ich nutze gelegentlich Konten in verschiedenen Währungen."
        },
        frequent: {
          label: "Häufig",
          description: "Ich nutze häufig Konten in mehreren Währungen."
        }
      },
      financialGoal: {
        control_expenses: {
          label: "Ausgaben kontrollieren",
          description: "Ich möchte wissen, wohin mein Geld geht."
        },
        save_more: {
          label: "Mehr sparen",
          description: "Ich möchte Geld für Ziele und Rücklagen beiseitelegen."
        },
        pay_debts: {
          label: "Schulden bezahlen",
          description: "Ich möchte meine Schulden und ausstehenden Zahlungen organisieren."
        },
        track_income: {
          label: "Meine Einnahmen verfolgen",
          description: "Ich möchte meine Einnahmequellen klar kontrollieren."
        },
        understand_investments: {
          label: "Meine Investitionen verstehen",
          description: "Ich möchte meine Vermögenswerte, Krypto oder Investitionen besser verfolgen."
        },
        avoid_small_expenses: {
          label: "Kleine tägliche Ausgaben vermeiden",
          description: "Ich möchte kleine tägliche Ausgaben erkennen und kontrollieren."
        }
      }
    },
    plans: {
      title: "Wählen Sie, wie Sie starten möchten",
      description: "Sie können die App kostenlos nutzen und erweiterte Funktionen später aktivieren.",
      continueWithPlus: "Mit Plus fortfahren"
    },
    v2: {
      control: {
        title: "Behalte dein Geld ohne Aufwand im Griff",
        description: "Organisiere Konten, Salden und Bewegungen an einem Ort."
      },
      movements: {
        title: "Erfasse Ausgaben und Einnahmen in Sekunden",
        description: "Nutze ein schnelles Formular im Rechnerstil, um dein Geld einfacher zu erfassen."
      },
      reminders: {
        title: "Vergiss keine Zahlungen oder Einnahmen",
        description: "Erstelle Erinnerungen für Zahlungen, Einnahmen und wiederkehrende Verpflichtungen."
      },
      clarity: {
        title: "Sieh deine Finanzen klar",
        description: "Verstehe Salden, Bewegungen und kommende Verpflichtungen in einer einfachen App."
      },
      currency: {
        title: "Wähle deine Hauptwährung",
        description: "Wir verwenden diese Währung für deine Summen, Berichte und Hauptsalden."
      },
      start: "Jetzt starten",
      welcome: {
        title: "Willkommen bei Orvian",
        description: "Eine klarere und einfachere Art, Geld, Konten und kommende Verpflichtungen zu verwalten."
      },
      accounts: {
        title: "Deine Konten, besser organisiert",
        description: "Erstelle Konten, verfolge Salden und personalisiere Karten für mehr Klarheit."
      },
      analytics: {
        title: "Verstehe deine Finanzen auf einen Blick",
        description: "Sieh Trends, Ausgaben und Einnahmen in einfachen Diagrammen für bessere Entscheidungen."
      },
      plans: {
        title: "Starte kostenlos, upgrade wenn du es brauchst",
        description: "Nutze Orvian kostenlos oder schalte Plus Lifetime mit lokalen Premium-Funktionen frei."
      },
      continueWithPlus: "Mit Plus fortfahren",
      continueFree: "Kostenlos fortfahren"
    }
  },
  budgets: {
    title: "Budgets",
    description: "Legen Sie monatliche Limits fest, um Ihre Ausgaben zu kontrollieren.",
    allCategoriesAlreadyBudgeted: "Sie haben bereits Limits für alle verfügbaren Kategorien hinzugefügt.",
    budgetedCategories: "Kategorien mit Limits",
    budgetOf: "Budget für {{period}}",
    currentSpendingVsBudget: "Aktuelle Ausgaben im Vergleich zu Ihrem Monatslimit.",
    spent: "Ausgegeben",
    limit: "Limit",
    limitedCategories: "Limitierte Kategorien",
    spentOfLimit: "{{spent}} von {{limit}}",
    currentEmptyTitle: "Sie haben diesen Monat kein Budget",
    currentEmptyDescription: "Erstellen Sie ein Budget für {{period}}.",
    createMonthlyBudget: "Monatsbudget erstellen",
    historyTitle: "Budgetverlauf",
    generalLimitValue: "Allgemeines Limit: {{amount}} {{currency}}",
    modalDescription: "Legen Sie Limits fest, um Ihre monatlichen Ausgaben zu kontrollieren.",
    status: {
      exceeded: "Sie haben Ihr Monatsbudget überschritten.",
      warning: "Sie sind nah daran, Ihr Monatsbudget zu erreichen.",
      safe: "Ihre Ausgaben liegen im Budget.",
      used: "Verwendet",
      spentAmount: "{{amount}} ausgegeben",
      limitAmount: "Limit: {{amount}}"
    },
    newBudget: "Neues Budget",
    editBudget: "Budget bearbeiten",
    createBudget: "Budget erstellen",
    saveBudget: "Budget speichern",
    deleteBudget: "Budget löschen",
    monthLabel: "{{month}} {{year}}",
    generalMonthlyBudget: "Allgemeines Monatsbudget",
    generalBudgetPlaceholder: "Z. B. 500",
    categoryBudgetTitle: "Budget nach Kategorie",
    categoryBudgetDescription: "Fügen Sie Limits nur zu den Ausgabenkategorien hinzu, die Sie kontrollieren möchten.",
    expenseCategory: "Ausgabenkategorie",
    monthlyLimit: "Monatslimit",
    monthlyLimitPlaceholder: "Z. B. 120",
    addCategory: "Kategorie hinzufügen",
    removeCategory: "Kategorie entfernen",
    budgetUsed: "Verwendetes Budget",
    remainingBudget: "Verbleibendes Budget",
    exceededBudget: "Überschrittenes Budget",
    emptyTitle: "Sie haben noch keine Budgets",
    emptyDescription: "Erstellen Sie ein Monatsbudget, um Ihre Ausgaben besser zu kontrollieren.",
    deleteTitle: "Budget löschen",
    deleteDescription: "Dieses Budget und seine Kategorielimits werden gelöscht.",
    errors: {
      generalRequired: "Das allgemeine Budget ist erforderlich.",
      generalGreaterThanZero: "Das allgemeine Budget muss größer als 0 sein.",
      categoryRequired: "Wählen Sie eine Kategorie aus.",
      categoryLimitRequired: "Das Monatslimit ist erforderlich.",
      categoryLimitGreaterThanZero: "Das Monatslimit muss größer als 0 sein.",
      duplicatedCategory: "Diese Kategorie hat bereits ein zugewiesenes Budget."
    }
  },
  reminders: {
    title: "Erinnerungen",
    description: "Planen Sie Zahlungen, Zahlungseingänge, Käufe oder Investitionen.",
    newReminder: "Neue Erinnerung",
    saveReminder: "Erinnerung speichern",
    createReminder: "Erinnerung erstellen",
    completeTitle: "Erinnerung abschließen",
    completeDescription: "Möchten Sie diese Erinnerung als abgeschlossen markieren?",
    cancelTitle: "Erinnerung abbrechen",
    cancelDescription: "Möchten Sie diese Erinnerung abbrechen?",
    confirmCancel: "Ja, abbrechen",
    emptyTitle: "Sie haben noch keine Erinnerungen",
    emptyDescription: "Erstellen Sie Erinnerungen für Zahlungen, Zahlungseingänge, Abonnements, Käufe oder Ersparnisse.",
    complete: "Abschließen",
    form: {
      title: "Titel",
      titlePlaceholder: "Z. B. Internetrechnung bezahlen",
      amountOptional: "Optionaler Betrag",
      amountPlaceholder: "0.00",
      type: "Typ",
      frequency: "Häufigkeit",
      date: "Datum",
      time: "Uhrzeit",
      relatedAccount: "Verknüpftes Konto",
      descriptionOptional: "Optionale Beschreibung",
      descriptionPlaceholder: "Z. B. fällig jeden 5. des Monats...",
      titleRequired: "Der Titel ist erforderlich.",
      amountInvalid: "Der Betrag muss größer oder gleich 0 sein.",
      futureDateRequired: "Das Datum muss in der Zukunft liegen."
    },
    card: {
      defaultType: "Erinnerung"
    },
    types: {
      payment: {
        label: "Zahlung",
        description: "Dienstleistungen, Schulden, Karte oder Zahlungsverpflichtungen."
      },
      collection: {
        label: "Zahlungseingang",
        description: "Geld, das Ihnen jemand zahlen muss."
      },
      subscription: {
        label: "Abonnement",
        description: "Netflix, Spotify, Software oder andere wiederkehrende Zahlungen."
      },
      saving: {
        label: "Sparen",
        description: "Erinnerung, Geld beiseitezulegen."
      },
      investment: {
        label: "Investition",
        description: "Wiederkehrender Kauf von Vermögenswerten oder Krypto."
      },
      purchase: {
        label: "Kauf",
        description: "Wichtiger geplanter Kauf."
      },
      custom: {
        label: "Benutzerdefiniert",
        description: "Benutzerdefinierte finanzielle Erinnerung."
      }
    },
    frequencies: {
      once: {
        label: "Einmal",
        description: "Sie werden nur am ausgewählten Datum benachrichtigt."
      },
      daily: {
        label: "Täglich",
        description: "Wird jeden Tag wiederholt."
      },
      weekly: {
        label: "Wöchentlich",
        description: "Wird jede Woche wiederholt."
      },
      monthly: {
        label: "Monatlich",
        description: "Wird jeden Monat wiederholt."
      }
    }
  },
  plans: {
    title: "Pläne",
    description: "Wählen Sie den Plan, der am besten dazu passt, wie Sie Ihre Finanzen organisieren.",
    currentPlan: "Aktueller Plan",
    free: "Kostenlos",
    plus: "Plus",
    demoDescription: "Starten Sie kostenlos und aktivieren Sie erweiterte Funktionen, wenn Sie sie benötigen.",
    monthlyPeriod: "pro Monat",
    yearlyAvailable: "Auch für ${{price}} pro Jahr verfügbar.",
    plusActive: "Plus aktiv",
    activatePlusDemo: "Plus-Demo aktivieren",
    freeActive: "Kostenlos aktiv",
    backToFree: "Zurück zu kostenlos",
    freePlan: {
      name: "Kostenlos",
      description: "Ideal, um mit der Organisation Ihrer persönlichen Finanzen zu beginnen.",
      price: "$0",
      period: "Für immer",
      cta: "Kostenlos fortfahren",
      current: "Aktueller Plan",
      features: {
        accountsLimit: "Bis zu 3 Konten",
        movementsLimit: "Bis zu 30 Transaktionen pro Monat",
        basicStatistics: "Grundlegende Statistiken",
        localData: "Daten lokal gespeichert",
        accounts: "Bis zu 3 Konten",
        movements: "Unbegrenzte Bewegungen",
        basicReminders: "Basis-Erinnerungen",
        basicMovements: "Basis-Erfassung von Bewegungen"
      }
    },
    plusPlan: {
      name: "Plus",
      description: "Für Nutzer, die vollständige Finanzkontrolle möchten.",
      price: "{{price}}",
      period: "pro Monat",
      cta: "Plus aktivieren",
      features: {
        unlimitedAccounts: "Unbegrenzte Konten",
        unlimitedMovements: "Unbegrenzte Transaktionen",
        advancedStatistics: "Erweiterte Statistiken",
        budgets: "Monatsbudgets",
        reminders: "Finanzielle Erinnerungen",
        exportData: "Datenexport",
        priorityFeatures: "Zugriff auf erweiterte Funktionen"
      }
    },
    restorePurchase: "Kauf wiederherstellen",
    continueWithoutPlus: "Ohne Plus fortfahren",
    errors: {
      purchaseUnavailable: "Der Kauf ist derzeit nicht verfügbar.",
      restoreUnavailable: "Der Kauf konnte derzeit nicht wiederhergestellt werden."
    },
    v2: {
      title: "Wähle, wie du mit Orvian wächst",
      description: "Starte kostenlos und schalte Premium-Funktionen frei, wenn du sie brauchst.",
      oneTimePayment: "Einmalzahlung",
      unlockPlus: "Plus freischalten",
      plusActive: "Plus aktiv",
      buyPack: "Pack kaufen",
      included: "Enthalten",
      includedWithPlus: "In Plus enthalten",
      cardDesigns: {
        title: "Kartendesigns",
        description: "Kaufe einzelne Packs oder schalte sie mit Plus frei."
      },
      legacy: {
        title: "Vorteil für frühe Nutzer",
        description: "Danke, dass du Orvian vor dem öffentlichen Start getestet hast.",
        benefit: "Du erhältst temporären Plus-Zugang und einen Sonderrabatt für Plus Lifetime.",
        temporaryUntil: "Voraussichtlicher temporärer Zugang bis: {{date}}",
        shortBenefit: "Sonderrabatt, weil du Orvian vor dem Start getestet hast."
      },
      pro: {
        title: "Demnächst: Orvian Pro",
        description: "Finanz-KI, Cloud-Synchronisierung, Backups und Zugriff auf mehreren Geräten werden Teil eines separaten Monatsplans sein."
      },
      freePrice: "$0 · Zum Starten",
      plusPrice: "$4.99 · Einmalzahlung",
      legacyPrice: "$2.99 · Early-User-Preis"
    },
    products: {
      plusLifetime: {
        description: "Schalte lokale Premium-Funktionen mit einer Einmalzahlung frei.",
        name: "Plus Lifetime",
        features: {
          unlimitedAccounts: "Unbegrenzte Konten",
          unlimitedReminders: "Unbegrenzte Erinnerungen",
          cardDesigns: "Premium-Kartendesigns"
        }
      },
      cardPacks: {
        dark: {
          description: "Dunkle und elegante Designs für deine Konten."
        },
        luxury: {
          description: "Exklusive Designs für eine App mit stärkerer Präsenz."
        },
        crypto: {
          description: "Designs inspiriert von digitalen Assets und Wallets."
        },
        minimal: {
          description: "Klare und minimalistische Designs für persönliche Konten."
        }
      }
    }
  },
  categories: {
    salary: "Gehalt",
    freelance: "Projekt / Freelance",
    sales: "Verkäufe",
    business_income: "Geschäft",
    investment_income: "Investition",
    gift_income: "Geschenk / Extra",
    refund: "Rückerstattung",
    loan_received: "Erhaltenes Darlehen",
    rental_income: "Mieteinnahmen",
    other_income: "Sonstige Einnahmen",
    food: "Essen",
    groceries: "Lebensmittel",
    restaurants: "Restaurants",
    transport: "Transport",
    fuel: "Kraftstoff",
    taxi_rideshare: "Taxi / Apps",
    housing: "Wohnen",
    rent: "Miete",
    services: "Dienstleistungen",
    electricity: "Strom",
    water: "Wasser",
    internet_phone: "Internet / Telefon",
    health: "Gesundheit",
    medicine: "Medikamente",
    education: "Bildung",
    entertainment: "Unterhaltung",
    subscriptions: "Abonnements",
    technology: "Technologie",
    clothing: "Kleidung",
    personal_care: "Körperpflege",
    family: "Familie",
    pets: "Haustiere",
    travel: "Reisen",
    gifts: "Geschenke",
    taxes: "Steuern",
    fees: "Gebühren",
    debt_payment: "Schuldenzahlung",
    savings: "Ersparnisse",
    investment_expense: "Investition",
    cash_withdrawal: "Bargeldabhebung",
    other: "Sonstiges"
  },
  tags: {
    essential: "Notwendig",
    optional: "Optional",
    urgent: "Dringend",
    recurring: "Wiederkehrend",
    planned: "Geplant",
    unplanned: "Ungeplant",
    cash: "Bargeld",
    card: "Karte",
    transfer: "Überweisung",
    online: "Online",
    subscription: "Abonnement",
    work: "Arbeit",
    personal: "Persönlich",
    family: "Familie",
    business: "Geschäft",
    tax: "Steuer",
    invoice: "Rechnung",
    debt: "Schuld",
    savings: "Ersparnisse",
    small_expense: "Kleine tägliche Ausgabe"
  },
  loans: {
    newLoan: "Neues Darlehen",
    form: {
      description: "Verfolge Geld, das du zahlen oder einziehen musst.",
      title: "Titel",
      titlePlaceholder: "Z. B. Privatdarlehen",
      titleRequired: "Der Titel ist erforderlich.",
      personOrEntity: "Person oder Einrichtung",
      personOrEntityPlaceholder: "Z. B. Person, Bank, Familie",
      payable: "Ich muss zahlen",
      receivable: "Mir muss gezahlt werden",
      payableDescription: "Geld, das du schuldest.",
      receivableDescription: "Geld, das dir geschuldet wird.",
      amount: "Betrag",
      amountPlaceholder: "0.00",
      amountRequired: "Der Betrag ist erforderlich.",
      amountError: "Gib einen Betrag größer als 0 ein.",
      currency: "Währung",
      notes: "Notizen",
      notesPlaceholder: "Optionale Darlehensdetails",
      createTitle: "Darlehen erstellen"
    },
    payment: {
      remainingAmount: "Offen: {{amount}}",
      amount: "Betrag",
      amountPlaceholder: "0.00",
      amountRequired: "Der Betrag ist erforderlich.",
      amountError: "Gib einen Betrag größer als 0 und höchstens {{amount}} ein.",
      note: "Notiz",
      notePlaceholder: "Optionales Detail zur Zahlung oder zum Eingang",
      pay: "Zahlen"
    }
  },
  transfers: {
    form: {
      fromAccountRequired: "Wähle das Ausgangskonto aus.",
      toAccountRequired: "Wähle das Zielkonto aus.",
      sameAccountError: "Ausgangs- und Zielkonto müssen unterschiedlich sein.",
      exchangeRatePending: "Vorerst wird ein Kurs von 1:1 verwendet. Erweiterter Wechsel wird später hinzugefügt.",
      fromAccount: "Ausgangskonto",
      toAccount: "Zielkonto",
      feeAmount: "Gebühr"
    }
  }
} as const;
