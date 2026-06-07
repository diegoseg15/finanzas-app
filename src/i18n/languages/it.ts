export const it = {
  common: {
    appName: "Orvian",
    cancel: "Annulla",
    save: "Salva",
    edit: "Modifica",
    delete: "Elimina",
    close: "Chiudi",
    continue: "Continua",
    back: "Indietro",
    next: "Avanti",
    confirm: "Conferma",
    apply: "Applica",
    clear: "Cancella",
    add: "Aggiungi",
    create: "Crea",
    update: "Aggiorna",
    remove: "Rimuovi",
    search: "Cerca",
    select: "Seleziona",
    loading: "Caricamento...",
    saving: "Salvataggio...",
    exporting: "Esportazione...",
    error: "Errore",
    success: "Fatto",
    required: "Obbligatorio",
    optional: "Facoltativo",
    amount: "Importo",
    date: "Data",
    time: "Ora",
    title: "Titolo",
    description: "Descrizione",
    note: "Nota",
    category: "Categoria",
    currency: "Valuta",
    account: "Conto",
    type: "Tipo",
    frequency: "Frequenza",
    freePlan: "Piano gratuito",
    plusPlan: "Piano Plus",
    month: "Mese",
    monthly: "Mensile",
    total: "Totale",
    balance: "Saldo",
    income: "Entrata",
    expense: "Spesa",
    transfer: "Trasferimento",
    commission: "Commissione",
    noData: "Nessun dato",
    notAvailable: "Non disponibile",
    no: "No",
    transfers: "Trasferimenti",
    skip: "Salta"
  },
  tabs: {
    home: "Home",
    accounts: "Conti",
    movements: "Movimenti",
    statistics: "Statistiche",
    settings: "Impostazioni",
    more: "Altro",
    budgets: "Budget",
    loans: "Prestiti"
  },
  home: {
    totalEstimated: "Denaro totale stimato",
    totalEstimatedBalance: "Saldo totale stimato",
    monthlyExpenses: "Spese del mese",
    monthlyIncome: "Entrate del mese",
    monthlyBalance: "Risultato del mese",
    available: "Disponibile",
    accounts: "Conti",
    upcomingReminders: "Promemoria in arrivo",
    viewAll: "Vedi tutto",
    noUpcomingReminders: "Non hai promemoria in arrivo.",
    recentActivity: "Attività recente",
    noRegisteredMovements: "Non hai ancora registrato movimenti.",
    noActivity: "Nessuna attività per ora.",
    viewAllAccounts: "Vedi tutte",
    monthlySummary: "Riepilogo mensile"
  },
  accounts: {
    title: "Conti",
    description: "Registra banche, contanti, criptovalute, carte e prestiti.",
    newAccount: "Nuovo conto",
    firstAccount: "Crea il primo conto",
    createTitle: "Nuovo conto",
    editTitle: "Modifica conto",
    emptyTitle: "Non hai ancora conti",
    emptyDescription: "Crea il tuo primo conto per iniziare a registrare entrate, spese e trasferimenti.",
    freePlanRemaining: "Piano gratuito: {{count}} conti disponibili.",
    plusPlanUnlimited: "Piano Plus: conti illimitati.",
    limitTitle: "Hai raggiunto il limite di conti gratuiti",
    limitDescription: "Il piano gratuito consente fino a 3 conti. Attiva Plus per creare conti illimitati.",
    deleteTitle: "Elimina conto",
    deleteDescription: "Questo conto verrà nascosto dalla lista attiva. I suoi movimenti storici saranno conservati.",
    saveAccount: "Salva conto",
    saveChanges: "Salva modifiche",
    card: {
      customAccount: "Conto personalizzato",
      currentBalance: "Saldo attuale",
      includedInTotal: "Incluso nel totale stimato",
      excludedFromTotal: "Escluso dal totale stimato",
      options: "Opzioni"
    },
    form: {
      createTitle: "Nuovo conto",
      editTitle: "Modifica conto",
      editDescription: "Aggiorna i dettagli principali di questo conto.",
      createDescription: "Configura i dettagli principali di questo conto.",
      name: "Nome del conto",
      namePlaceholder: "Es. Banca Pichincha",
      currentBalance: "Saldo attuale",
      initialBalance: "Saldo iniziale",
      balancePlaceholder: "0.00",
      balanceEditInfo: "Il saldo viene aggiornato registrando movimenti, non modificando il conto.",
      type: "Tipo di conto",
      mainCurrency: "Valuta principale",
      currencyCrypto: "Criptovaluta",
      currencyFiat: "Valuta tradizionale",
      currencyCustom: "Personalizzata",
      currencyEditInfo: "La valuta principale non può essere modificata durante l’editing, per evitare problemi nello storico dei movimenti.",
      includeInTotal: "Aggiungi al totale stimato",
      includeInTotalDescription: "Attiva questa opzione se vuoi che questo conto venga sommato al tuo saldo totale.",
      initialBalanceRequired: "Il saldo iniziale è obbligatorio. Usa 0 se non ha saldo.",
      initialBalanceError: "Il saldo iniziale non può essere negativo.",
      nameRequired: "Il nome del conto è obbligatorio.",
      institutionName: "Banca o istituzione",
      institutionNamePlaceholder: "Es. banca, Binance, Metamask",
      pinAccount: "Fissa come importante",
      pinAccountDescription: "Apparirà per primo nella schermata dei conti.",
      cardDesign: "Design della carta",
      cardDesignPlusOnly: "Disponibile solo con Plus.",
      steps: {
        0: {
          description: "Definisci prima l’identità del conto."
        },
        1: {
          description: "Ora configura saldo, valuta e importanza."
        },
        2: {
          description: "Scegli l’aspetto della carta di questo conto."
        }
      },
      cardDesignUpgradeMessage: "Passa a Plus per personalizzare il design delle tue carte.",
      isSavingsTarget: "Conto destinato al risparmio",
      isSavingsTargetDescription: "Usalo per separare denaro che non vuoi spendere."
    },
    types: {
      bank: {
        label: "Banca",
        description: "Conto bancario tradizionale."
      },
      cash: {
        label: "Contanti",
        description: "Denaro fisico disponibile."
      },
      piggy_bank: {
        label: "Salvadanaio",
        description: "Risparmi fisici o separati per un obiettivo."
      },
      crypto_exchange: {
        label: "Piattaforma crypto",
        description: "Conto in app come Binance o altre piattaforme crypto."
      },
      crypto_wallet: {
        label: "Portafoglio crypto",
        description: "Wallet come MetaMask o altre app per conservare criptovalute."
      },
      credit_card: {
        label: "Carta di credito",
        description: "Carta con debito o limite di credito utilizzato."
      },
      loan_receivable: {
        label: "Prestito da riscuotere",
        description: "Denaro che qualcun altro ti deve."
      },
      loan_payable: {
        label: "Prestito da pagare",
        description: "Denaro che devi restituire."
      },
      custom: {
        label: "Conto personalizzato",
        description: "Tipo di conto definito dall’utente."
      }
    },
    cardDesigns: {
      default: {
        label: "Standard",
        description: "Design pulito per qualsiasi conto."
      },
      minimal: {
        label: "Minimalista",
        description: "Più sobrio e discreto."
      },
      gradient: {
        label: "Gradiente",
        description: "Uno stile visivo più moderno."
      },
      blue: {
        label: "Blu del brand",
        description: "Usa il blu principale di Orvian."
      },
      dark: {
        label: "Scuro",
        description: "Stile elegante con aspetto scuro."
      },
      premium: {
        label: "Premium",
        description: "Design più esclusivo per i conti in evidenza."
      }
    },
    groups: {
      regular: "Tradizionali",
      crypto: "Cripto"
    },
    summary: {
      regularTotal: "Totale tradizionale",
      cryptoTotal: "Totale cripto",
      accountCount: "{{count}} conto"
    },
    emptyCryptoAccounts: "Non hai ancora conti cripto.",
    emptyRegularAccounts: "Non hai ancora conti tradizionali.",
    detail: {
      description: "Gestisci le informazioni e le impostazioni di questo conto.",
      notFoundTitle: "Conto non trovato",
      notFoundDescription: "Questo conto non esiste più o è stato archiviato.",
      type: "Tipo",
      institution: "Istituzione",
      mainCurrency: "Valuta principale",
      archiveTitle: "Archivia conto",
      archiveDescription: "Questo conto non apparirà più nella lista principale, ma i suoi dati saranno conservati.",
      archiveAction: "Archivia",
      settings: "Impostazioni",
      recentMovements: "Movimenti recenti",
      recentMovementsDescription: "Attività confermata degli ultimi 2 mesi.",
      noRecentMovements: "Non ci sono movimenti recenti in questo conto.",
      actions: "Azioni",
      archive: "Archivia conto",
      edit: "Modifica conto",
      emptyActivity: "Non ci sono movimenti recenti in questo conto.",
      information: "Informazioni",
      priority: "Priorità",
      recentActivity: "Attività recente",
      totalEstimated: "Totale stimato",
      normal: "Normale",
      pinned: "Fissata"
    }
  },
  movements: {
    title: "Movimenti",
    description: "Registra entrate, spese e trasferimenti tra i tuoi conti.",
    newMovement: "Nuovo movimento",
    newTransfer: "Nuovo trasferimento",
    registerMovement: "Registra movimento",
    emptyTitle: "Non hai ancora movimenti",
    emptyDescription: "Registra la tua prima entrata, spesa o trasferimento per iniziare a costruire il tuo storico finanziario.",
    incomeExpense: "Entrata / Spesa",
    income: "Entrata",
    expense: "Spesa",
    transfer: "Trasferimento",
    freePlanRemaining: "Piano gratuito: {{count}} movimenti disponibili questo mese.",
    plusPlanUnlimited: "Piano Plus: movimenti illimitati.",
    firstCreateAccountTitle: "Crea prima un conto",
    firstCreateAccountDescription: "Hai bisogno di almeno un conto attivo per registrare entrate o spese.",
    limitTitle: "Hai raggiunto il limite di movimenti gratuiti",
    limitDescription: "Il piano gratuito consente fino a 30 movimenti al mese. Attiva Plus per registrare movimenti illimitati.",
    deleteMovementTitle: "Elimina movimento",
    deleteMovementDescription: "Questa azione annullerà l’effetto di questo movimento sul saldo.",
    deleteTransferTitle: "Elimina trasferimento",
    deleteTransferDescription: "Questa azione annullerà l’effetto di questo trasferimento sui saldi.",
    editMovement: "Modifica movimento",
    editTransfer: "Modifica trasferimento",
    saveMovement: "Salva movimento",
    saveTransfer: "Salva trasferimento",
    form: {
      account: "Conto",
      category: "Categoria",
      amount: "Importo",
      tags: "Tag",
      note: "Nota",
      notePlaceholder: "Nota opzionale",
      selectedAccountNotFound: "Il conto selezionato non esiste.",
      insufficientBalance: "Non hai abbastanza denaro in questo conto.",
      createDescription: "Registra un’entrata o una spesa confermata.",
      amountRequired: "L’importo deve essere maggiore di 0.",
      accountRequired: "Seleziona un conto.",
      categoryRequired: "Seleziona una categoria.",
      allTagsSelected: "Hai già selezionato tutti i tag disponibili.",
      accountCurrency: "Valuta: {{currency}}"
    },
    card: {
      defaultTitle: "Movimento",
      deletedAccount: "Conto eliminato"
    },
    transferCard: {
      fromAccountFallback: "Conto di origine",
      toAccountFallback: "Conto di destinazione",
      sent: "Inviato",
      received: "Ricevuto",
      fee: "Commissione",
      exchangeRate: "Cambio usato: 1 {{fromCurrency}} = {{exchangeRate}} {{toCurrency}}"
    },
    transferForm: {
      fromAccount: "Conto di origine",
      toAccount: "Conto di destinazione",
      fromAmount: "Importo inviato",
      toAmount: "Importo ricevuto",
      note: "Nota",
      notePlaceholder: "Es. trasferimento ai risparmi",
      differentAccountsRequired: "Seleziona conti diversi.",
      description: "Sposta denaro tra conti e registra commissioni o cambio valuta.",
      fromAccountRequired: "Seleziona un conto di origine.",
      toAccountRequired: "Seleziona un conto di destinazione.",
      fromAmountRequired: "L’importo inviato deve essere maggiore di 0.",
      toAmountRequired: "L’importo ricevuto deve essere maggiore di 0.",
      feeInvalid: "La commissione non può essere negativa.",
      insufficientBalance: "Non hai abbastanza denaro nel conto di origine per questo trasferimento.",
      multiCurrencyBlockedByPlan: "Il piano gratuito consente solo trasferimenti tra conti con la stessa valuta.",
      fromAmountWithCurrency: "Importo inviato {{currency}}",
      toAmountWithCurrency: "Importo ricevuto {{currency}}",
      feeAmountWithCurrency: "Commissione {{currency}}",
      calculatedExchangeRate: "Tasso di cambio calcolato",
      multiCurrencyPlusTitle: "I trasferimenti tra valute sono disponibili in Plus",
      multiCurrencyPlusDescription: "Nel piano gratuito puoi trasferire tra conti con la stessa valuta. Per trasferimenti con cambio valuta, attiva Plus."
    },
    calculatorAmount: "Importo del movimento",
    transferAmount: "Importo da trasferire",
    emptyFilterTitle: "Nessun risultato",
    emptyFilterDescription: "Cambia il filtro per vedere altri movimenti.",
    newExpense: "Nuova spesa",
    newIncome: "Nuova entrata"
  },
  statistics: {
    title: "Statistiche",
    description: "Rivedi entrate, spese, trasferimenti e categorie.",
    filters: "Filtri del report",
    applyFilters: "Applica filtri",
    clearFilters: "Cancella filtri",
    filtersDescription: "Regola periodo, conto, categoria e valuta.",
    cards: {
      income: "Entrate",
      expenses: "Spese",
      transfers: "Trasferimenti",
      commissions: "Commissioni",
      periodBalance: "Risultato del periodo"
    },
    charts: {
      incomeVsExpense: "Entrate vs spese",
      incomeVsExpenseDescription: "Confronto mensile tra denaro in entrata e in uscita.",
      balanceEvolution: "Evoluzione del saldo",
      balanceEvolutionDescription: "Saldo accumulato degli ultimi mesi.",
      topExpenseCategories: "Principali categorie di spesa",
      topExpenseCategoriesDescription: "Categorie con la maggiore uscita di denaro.",
      budgetUsed: "Budget utilizzato",
      budgetUsedDescription: "Avanzamento del budget mensile attuale.",
      expensesByCategory: "Spese per categoria",
      accountSummary: "Riepilogo dei conti"
    },
    empty: {
      noBudget: "Crea un budget mensile per vedere questo grafico.",
      noMovements: "Registra movimenti per visualizzare le statistiche.",
      noExpenses: "Non ci sono ancora spese registrate in questo periodo.",
      noIncome: "Non ci sono ancora entrate registrate in questo periodo.",
      noIncomeExpenseChart: "Non ci sono dati di entrate o spese da visualizzare nel grafico.",
      noBalanceTrend: "Non ci sono ancora dati sufficienti sul saldo per mostrare una tendenza.",
      noExpenseCategoriesChart: "Non ci sono spese per categoria da visualizzare nel grafico.",
      noFilterDataTitle: "Nessun dato per questi filtri",
      noFilterDataDescription: "Cambia il periodo o registra movimenti per vedere le statistiche.",
      noExpensesForFilters: "Non ci sono spese per questi filtri."
    },
    labels: {
      income: "Entrate",
      expenses: "Spese",
      others: "Altri",
      top: "Top",
      balance: "Saldo",
      used: "Utilizzato",
      spentAmount: "{{amount}} spesi",
      limitAmount: "Limite: {{amount}}",
      noCategory: "Senza categoria",
      balanceAmount: "Saldo: {{amount}}"
    }
  },
  reports: {
    export: {
      title: "Esporta riepilogo",
      description: "Scarica i tuoi conti, entrate, spese e trasferimenti in un file."
    },
    filters: {
      title: "Filtri",
      panelDescription: "Regola il periodo e i dati che vuoi analizzare.",
      period: "Periodo",
      account: "Conto",
      category: "Categoria",
      currency: "Valuta",
      from: "Da",
      to: "A",
      movementKind: "Tipo di movimento"
    },
    periods: {
      current_month: {
        label: "Mese corrente",
        description: "Movimenti del mese corrente."
      },
      last_month: {
        label: "Mese scorso",
        description: "Movimenti del mese scorso."
      },
      last_3_months: {
        label: "Ultimi 3 mesi",
        description: "Movimenti degli ultimi tre mesi."
      },
      current_year: {
        label: "Anno corrente",
        description: "Movimenti dell’anno corrente."
      },
      custom: {
        label: "Personalizzato",
        description: "Scegli manualmente un intervallo di date."
      }
    },
    movementKinds: {
      all: {
        label: "Tutti",
        description: "Entrate e spese."
      },
      income: {
        label: "Entrate",
        description: "Solo denaro in entrata."
      },
      expense: {
        label: "Spese",
        description: "Solo denaro in uscita."
      }
    },
    accounts: {
      all: {
        label: "Tutti i conti",
        description: "Include tutti i conti attivi."
      }
    },
    categories: {
      all: {
        label: "Tutte le categorie",
        description: "Non filtrare per categoria."
      }
    },
    currencies: {
      main: {
        label: "Valuta principale",
        description: "Usa la valuta principale per il riepilogo."
      }
    }
  },
  settings: {
    title: "Impostazioni",
    description: "Configura esperienza, dati, privacy e piano.",
    appearance: "Aspetto",
    theme: "Tema",
    currentTheme: "Tema attuale: {{theme}}",
    themeModes: {
      system: "Sistema",
      dark: "Scuro",
      light: "Chiaro"
    },
    language: "Lingua",
    languageDescription: "Scegli la lingua dell’interfaccia di Orvian.",
    languagePickerLabel: "Lingua",
    currentPlan: "Piano attuale",
    currentPlanDescription: "Stai usando il piano {{plan}}.",
    freePlanName: "Gratuito",
    viewPlans: "Vedi piani",
    shortcuts: "Scorciatoie",
    viewBudgets: "Vedi budget",
    viewReminders: "Vedi promemoria",
    privacy: "Privacy",
    privacyDescription: "Controlla come vengono gestiti i tuoi dati in Orvian.",
    privacyPolicy: "Informativa sulla privacy",
    openPrivacyPolicy: "Vedi informativa sulla privacy",
    exportData: "Esporta dati",
    exportDescription: "Genera file con i tuoi conti, movimenti e trasferimenti.",
    exporting: "Esportazione...",
    exportCsv: "Esporta CSV",
    exportExcel: "Esporta Excel",
    importData: "Importa dati",
    importDescription: "Carica movimenti da un file CSV.",
    localData: "Dati locali",
    localDataDescription: "I tuoi dati vengono salvati su questo dispositivo. La sincronizzazione dell’account potrà essere attivata in seguito.",
    viewOnboardingAgain: "Vedi di nuovo l’introduzione",
    resetData: "Elimina dati locali",
    about: "Informazioni su Orvian",
    aboutDescription: "Orvian ti aiuta a organizzare conti, spese, budget e riepiloghi personali.",
    app: "Applicazione",
    version: "Versione",
    developer: "Sviluppatore",
    visitDeveloperWebsite: "Visita il sito dello sviluppatore",
    linkErrorTitle: "Impossibile aprire il link",
    linkErrorDescription: "Il tuo dispositivo non può aprire questo sito in questo momento.",
    privacyLinkErrorDescription: "Il tuo dispositivo non può aprire l’informativa sulla privacy in questo momento.",
    resetDataTitle: "Elimina dati locali",
    resetDataDescription: "Questo eliminerà conti, movimenti, trasferimenti, promemoria e impostazioni salvati su questo dispositivo.",
    resetDataConfirm: "Elimina",
    exportErrorTitle: "Impossibile esportare",
    exportCsvErrorDescription: "Si è verificato un errore durante la generazione del file CSV.",
    exportExcelErrorDescription: "Si è verificato un errore durante la generazione del file Excel.",
    mainCurrency: "Valuta principale"
  },
  onboarding: {
    welcome: {
      title: "Controlla il tuo denaro da un solo posto",
      description: "Registra conti, entrate, spese, trasferimenti, promemoria e piani finanziari da un’app locale e privata.",
      balanceCardTitle: "Il tuo saldo inizia qui",
      income: "Entrate",
      expenses: "Spese",
      start: "Inizia"
    },
    setup: {
      stepLabel: "Passo {{step}} di {{total}}",
      title: "Configura la tua esperienza",
      description: "Queste risposte personalizzano l’app senza obbligarti a creare un account."
    },
    stepOne: {
      mainCurrency: "Valuta principale",
      calculateTotalNetWorth: "Calcolare tutto il mio denaro",
      calculateTotalNetWorthDescription: "Somma banche, contanti, crypto e altri conti in un saldo generale.",
      userType: "Tipo di utente"
    },
    stepTwo: {
      cryptoUsage: "Uso di criptovalute",
      multiCurrencyUsage: "Uso di più valute"
    },
    stepThree: {
      mainGoal: "Obiettivo principale",
      activateFinancialReminders: "Attivare promemoria finanziari",
      activateFinancialRemindersDescription: "Questo ti aiuterà a ricordare pagamenti, incassi, acquisti o risparmi.",
      viewPlans: "Vedi piani"
    },
    options: {
      userProfile: {
        personal: {
          label: "Personale",
          description: "Voglio gestire le mie finanze personali."
        },
        freelancer: {
          label: "Professionale",
          description: "Guadagno da progetti o clienti."
        },
        entrepreneur: {
          label: "Imprenditore",
          description: "Gestisco denaro per un’attività o un progetto."
        },
        investor: {
          label: "Investitore",
          description: "Voglio monitorare asset, crypto o investimenti."
        },
        student: {
          label: "Studente",
          description: "Voglio organizzare spese e risparmi."
        }
      },
      cryptoUsage: {
        none: {
          label: "Non uso crypto",
          description: "Non ho bisogno di conti come Binance o MetaMask."
        },
        basic: {
          label: "Sì, uso crypto",
          description: "Voglio registrare exchange, wallet o asset digitali."
        },
        advanced: {
          label: "Uso crypto, ma non è una priorità",
          description: "Voglio registrare crypto, ma non è la cosa più importante per me."
        }
      },
      multiCurrencyUsage: {
        none: {
          label: "Uso una sola valuta",
          description: "Gestisco il mio denaro principalmente in una valuta."
        },
        occasional: {
          label: "A volte",
          description: "Uso occasionalmente conti in valute diverse."
        },
        frequent: {
          label: "Spesso",
          description: "Uso spesso conti in più valute."
        }
      },
      financialGoal: {
        control_expenses: {
          label: "Controllare le spese",
          description: "Voglio sapere dove va il mio denaro."
        },
        save_more: {
          label: "Risparmiare di più",
          description: "Voglio mettere da parte denaro per obiettivi e riserve."
        },
        pay_debts: {
          label: "Pagare debiti",
          description: "Voglio organizzare i miei debiti e pagamenti in sospeso."
        },
        track_income: {
          label: "Monitorare le mie entrate",
          description: "Voglio avere un controllo chiaro delle mie fonti di reddito."
        },
        understand_investments: {
          label: "Capire i miei investimenti",
          description: "Voglio monitorare meglio asset, crypto o investimenti."
        },
        avoid_small_expenses: {
          label: "Evitare piccole spese quotidiane",
          description: "Voglio identificare e controllare le piccole spese giornaliere."
        }
      }
    },
    plans: {
      title: "Scegli come vuoi iniziare",
      description: "Puoi usare l’app gratuitamente e attivare le funzioni avanzate in seguito.",
      continueWithPlus: "Continua con Plus"
    },
    v2: {
      control: {
        title: "Controlla il tuo denaro senza complicarti",
        description: "Organizza conti, saldi e movimenti in un unico posto."
      },
      movements: {
        title: "Registra spese ed entrate in pochi secondi",
        description: "Usa un modulo rapido stile calcolatrice per registrare il denaro con meno sforzo."
      },
      reminders: {
        title: "Non dimenticare pagamenti o incassi",
        description: "Crea promemoria per pagamenti, incassi e impegni ricorrenti."
      },
      clarity: {
        title: "Visualizza le tue finanze con chiarezza",
        description: "Comprendi saldi, movimenti e prossimi impegni da un'app semplice."
      },
      currency: {
        title: "Scegli la tua valuta principale",
        description: "Useremo questa valuta per mostrare totali, report e saldi principali."
      },
      start: "Inizia ora",
      welcome: {
        title: "Benvenuto su Orvian",
        description: "Un modo più chiaro e semplice per gestire denaro, conti e prossimi impegni."
      },
      accounts: {
        title: "I tuoi conti, più organizzati",
        description: "Crea conti, controlla i saldi e personalizza le carte per vedere il denaro con chiarezza."
      },
      analytics: {
        title: "Comprendi le tue finanze a colpo d’occhio",
        description: "Vedi tendenze, spese ed entrate con grafici semplici per decidere meglio."
      },
      plans: {
        title: "Inizia gratis, migliora quando ti serve",
        description: "Usa Orvian gratis o sblocca Plus Lifetime con funzioni premium locali."
      }
    }
  },
  budgets: {
    title: "Budget",
    description: "Imposta limiti mensili per controllare le tue spese.",
    allCategoriesAlreadyBudgeted: "Hai già aggiunto limiti per tutte le categorie disponibili.",
    budgetedCategories: "Categorie con limiti",
    budgetOf: "Budget per {{period}}",
    currentSpendingVsBudget: "Spesa attuale rispetto al tuo limite mensile.",
    spent: "Speso",
    limit: "Limite",
    limitedCategories: "Categorie limitate",
    spentOfLimit: "{{spent}} di {{limit}}",
    currentEmptyTitle: "Non hai un budget questo mese",
    currentEmptyDescription: "Crea un budget per {{period}}.",
    createMonthlyBudget: "Crea budget mensile",
    historyTitle: "Storico budget",
    generalLimitValue: "Limite generale: {{amount}} {{currency}}",
    modalDescription: "Imposta limiti per controllare le tue spese mensili.",
    status: {
      exceeded: "Hai superato il tuo budget mensile.",
      warning: "Sei vicino a raggiungere il tuo budget mensile.",
      safe: "Le tue spese sono entro il budget.",
      used: "Utilizzato",
      spentAmount: "{{amount}} spesi",
      limitAmount: "Limite: {{amount}}"
    },
    newBudget: "Nuovo budget",
    editBudget: "Modifica budget",
    createBudget: "Crea budget",
    saveBudget: "Salva budget",
    deleteBudget: "Elimina budget",
    monthLabel: "{{month}} {{year}}",
    generalMonthlyBudget: "Budget mensile generale",
    generalBudgetPlaceholder: "Es. 500",
    categoryBudgetTitle: "Budget per categoria",
    categoryBudgetDescription: "Aggiungi limiti solo alle categorie di spesa che vuoi controllare.",
    expenseCategory: "Categoria di spesa",
    monthlyLimit: "Limite mensile",
    monthlyLimitPlaceholder: "Es. 120",
    addCategory: "Aggiungi categoria",
    removeCategory: "Rimuovi categoria",
    budgetUsed: "Budget utilizzato",
    remainingBudget: "Budget rimanente",
    exceededBudget: "Budget superato",
    emptyTitle: "Non hai ancora budget",
    emptyDescription: "Crea un budget mensile per controllare meglio le tue spese.",
    deleteTitle: "Elimina budget",
    deleteDescription: "Questo budget e i suoi limiti per categoria saranno eliminati.",
    errors: {
      generalRequired: "Il budget generale è obbligatorio.",
      generalGreaterThanZero: "Il budget generale deve essere maggiore di 0.",
      categoryRequired: "Seleziona una categoria.",
      categoryLimitRequired: "Il limite mensile è obbligatorio.",
      categoryLimitGreaterThanZero: "Il limite mensile deve essere maggiore di 0.",
      duplicatedCategory: "Questa categoria ha già un budget assegnato."
    }
  },
  reminders: {
    title: "Promemoria",
    description: "Programma pagamenti, incassi, acquisti o investimenti.",
    newReminder: "Nuovo promemoria",
    saveReminder: "Salva promemoria",
    createReminder: "Crea promemoria",
    completeTitle: "Completa promemoria",
    completeDescription: "Vuoi segnare questo promemoria come completato?",
    cancelTitle: "Annulla promemoria",
    cancelDescription: "Vuoi annullare questo promemoria?",
    confirmCancel: "Sì, annulla",
    emptyTitle: "Non hai ancora promemoria",
    emptyDescription: "Crea promemoria per pagamenti, incassi, abbonamenti, acquisti o risparmi.",
    complete: "Completa",
    form: {
      title: "Titolo",
      titlePlaceholder: "Es. pagare internet",
      amountOptional: "Importo facoltativo",
      amountPlaceholder: "0.00",
      type: "Tipo",
      frequency: "Frequenza",
      date: "Data",
      time: "Ora",
      relatedAccount: "Conto collegato",
      descriptionOptional: "Descrizione facoltativa",
      descriptionPlaceholder: "Es. scade ogni 5 del mese...",
      titleRequired: "Il titolo è obbligatorio.",
      amountInvalid: "L’importo deve essere maggiore o uguale a 0.",
      futureDateRequired: "La data deve essere nel futuro."
    },
    card: {
      defaultType: "Promemoria"
    },
    types: {
      payment: {
        label: "Pagamento",
        description: "Servizi, debiti, carta o impegni da pagare."
      },
      collection: {
        label: "Incasso",
        description: "Denaro che qualcuno deve pagarti."
      },
      subscription: {
        label: "Abbonamento",
        description: "Netflix, Spotify, software o altri pagamenti ricorrenti."
      },
      saving: {
        label: "Risparmio",
        description: "Promemoria per mettere da parte denaro."
      },
      investment: {
        label: "Investimento",
        description: "Acquisto ricorrente di asset o crypto."
      },
      purchase: {
        label: "Acquisto",
        description: "Acquisto importante pianificato."
      },
      custom: {
        label: "Personalizzato",
        description: "Promemoria finanziario personalizzato."
      }
    },
    frequencies: {
      once: {
        label: "Una volta",
        description: "Riceverai una notifica solo nella data selezionata."
      },
      daily: {
        label: "Giornaliero",
        description: "Si ripeterà ogni giorno."
      },
      weekly: {
        label: "Settimanale",
        description: "Si ripeterà ogni settimana."
      },
      monthly: {
        label: "Mensile",
        description: "Si ripeterà ogni mese."
      }
    }
  },
  plans: {
    title: "Piani",
    description: "Scegli il piano più adatto al modo in cui organizzi le tue finanze.",
    currentPlan: "Piano attuale",
    free: "Gratuito",
    plus: "Plus",
    demoDescription: "Inizia gratuitamente e attiva le funzioni avanzate quando ne hai bisogno.",
    monthlyPeriod: "al mese",
    yearlyAvailable: "Disponibile anche a ${{price}} all’anno.",
    plusActive: "Plus attivo",
    activatePlusDemo: "Attiva demo Plus",
    freeActive: "Gratuito attivo",
    backToFree: "Torna al gratuito",
    freePlan: {
      name: "Gratuito",
      description: "Ideale per iniziare a organizzare le finanze personali.",
      price: "$0",
      period: "Per sempre",
      cta: "Continua gratis",
      current: "Piano attuale",
      features: {
        accountsLimit: "Fino a 3 conti",
        movementsLimit: "Fino a 30 movimenti al mese",
        basicStatistics: "Statistiche di base",
        localData: "Dati salvati localmente"
      }
    },
    plusPlan: {
      name: "Plus",
      description: "Per utenti che vogliono un controllo finanziario completo.",
      price: "{{price}}",
      period: "al mese",
      cta: "Attiva Plus",
      features: {
        unlimitedAccounts: "Conti illimitati",
        unlimitedMovements: "Movimenti illimitati",
        advancedStatistics: "Statistiche avanzate",
        budgets: "Budget mensili",
        reminders: "Promemoria finanziari",
        exportData: "Esportazione dati",
        priorityFeatures: "Accesso a funzioni avanzate"
      }
    },
    restorePurchase: "Ripristina acquisto",
    continueWithoutPlus: "Continua senza Plus",
    errors: {
      purchaseUnavailable: "L’acquisto non è disponibile al momento.",
      restoreUnavailable: "Impossibile ripristinare l’acquisto al momento."
    },
    v2: {
      title: "Scegli come crescere con Orvian",
      description: "Inizia gratis e sblocca le funzioni premium quando ti servono.",
      oneTimePayment: "Pagamento unico",
      unlockPlus: "Sblocca Plus",
      plusActive: "Plus attivo",
      buyPack: "Acquista pack",
      included: "Incluso",
      includedWithPlus: "Incluso con Plus",
      cardDesigns: {
        title: "Design delle carte",
        description: "Acquista pack singoli o sbloccali con Plus."
      },
      legacy: {
        title: "Vantaggio per i primi utenti",
        description: "Grazie per aver provato Orvian prima del lancio pubblico.",
        benefit: "Avrai accesso Plus temporaneo e uno sconto speciale per mantenere Plus Lifetime.",
        temporaryUntil: "Accesso temporaneo stimato fino al: {{date}}"
      },
      pro: {
        title: "In arrivo: Orvian Pro",
        description: "IA finanziaria, sincronizzazione cloud, backup e accesso multi-dispositivo faranno parte di un piano mensile separato."
      }
    },
    products: {
      plusLifetime: {
        description: "Sblocca le funzioni premium locali con un pagamento unico."
      },
      cardPacks: {
        dark: {
          description: "Design scuri ed eleganti per i tuoi conti."
        },
        luxury: {
          description: "Design esclusivi per un'app con più presenza."
        },
        crypto: {
          description: "Design ispirati ad asset digitali e wallet."
        },
        minimal: {
          description: "Design puliti e minimalisti per conti personali."
        }
      }
    }
  },
  categories: {
    salary: "Stipendio",
    freelance: "Progetto / Freelance",
    sales: "Vendite",
    business_income: "Attività",
    investment_income: "Investimento",
    gift_income: "Regalo / Extra",
    refund: "Rimborso",
    loan_received: "Prestito ricevuto",
    rental_income: "Reddito da affitto",
    other_income: "Altra entrata",
    food: "Cibo",
    groceries: "Spesa",
    restaurants: "Ristoranti",
    transport: "Trasporto",
    fuel: "Carburante",
    taxi_rideshare: "Taxi / App",
    housing: "Casa",
    rent: "Affitto",
    services: "Servizi",
    electricity: "Elettricità",
    water: "Acqua",
    internet_phone: "Internet / Telefono",
    health: "Salute",
    medicine: "Medicine",
    education: "Istruzione",
    entertainment: "Intrattenimento",
    subscriptions: "Abbonamenti",
    technology: "Tecnologia",
    clothing: "Abbigliamento",
    personal_care: "Cura personale",
    family: "Famiglia",
    pets: "Animali domestici",
    travel: "Viaggi",
    gifts: "Regali",
    taxes: "Tasse",
    fees: "Commissioni",
    debt_payment: "Pagamento debito",
    savings: "Risparmi",
    investment_expense: "Investimento",
    cash_withdrawal: "Prelievo contanti",
    other: "Altro"
  },
  tags: {
    essential: "Essenziale",
    optional: "Facoltativo",
    urgent: "Urgente",
    recurring: "Ricorrente",
    planned: "Pianificato",
    unplanned: "Non pianificato",
    cash: "Contanti",
    card: "Carta",
    transfer: "Trasferimento",
    online: "Online",
    subscription: "Abbonamento",
    work: "Lavoro",
    personal: "Personale",
    family: "Famiglia",
    business: "Attività",
    tax: "Tassa",
    invoice: "Fattura",
    debt: "Debito",
    savings: "Risparmi",
    small_expense: "Piccola spesa quotidiana"
  },
  loans: {
    newLoan: "Nuovo prestito",
    form: {
      description: "Tieni traccia del denaro da pagare o incassare.",
      title: "Titolo",
      titlePlaceholder: "Es. prestito personale",
      titleRequired: "Il titolo è obbligatorio.",
      personOrEntity: "Persona o ente",
      personOrEntityPlaceholder: "Es. persona, banca, familiare",
      payable: "Devo pagare",
      receivable: "Devono pagarmi",
      payableDescription: "Denaro che devi.",
      receivableDescription: "Denaro che ti devono.",
      amount: "Importo",
      amountPlaceholder: "0.00",
      amountRequired: "L’importo è obbligatorio.",
      amountError: "Inserisci un importo maggiore di 0.",
      currency: "Valuta",
      notes: "Note",
      notesPlaceholder: "Dettagli opzionali del prestito",
      createTitle: "Crea prestito"
    },
    payment: {
      remainingAmount: "Rimanente: {{amount}}",
      amount: "Importo",
      amountPlaceholder: "0.00",
      amountRequired: "L’importo è obbligatorio.",
      amountError: "Inserisci un importo maggiore di 0 e minore o uguale a {{amount}}.",
      note: "Nota",
      notePlaceholder: "Dettaglio opzionale del pagamento o incasso",
      pay: "Paga"
    }
  },
  transfers: {
    form: {
      fromAccountRequired: "Seleziona il conto di origine.",
      toAccountRequired: "Seleziona il conto di destinazione.",
      sameAccountError: "Il conto di origine e quello di destinazione devono essere diversi.",
      exchangeRatePending: "Per ora verrà usato un tasso 1:1. Il cambio avanzato sarà aggiunto più avanti.",
      fromAccount: "Conto di origine",
      toAccount: "Conto di destinazione",
      feeAmount: "Commissione"
    }
  }
} as const;
