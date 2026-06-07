export const fr = {
  common: {
    appName: "Orvian",
    cancel: "Annuler",
    save: "Enregistrer",
    edit: "Modifier",
    delete: "Supprimer",
    close: "Fermer",
    continue: "Continuer",
    back: "Retour",
    next: "Suivant",
    confirm: "Confirmer",
    apply: "Appliquer",
    clear: "Effacer",
    add: "Ajouter",
    create: "Créer",
    update: "Mettre à jour",
    remove: "Retirer",
    search: "Rechercher",
    select: "Sélectionner",
    loading: "Chargement...",
    saving: "Enregistrement...",
    exporting: "Exportation...",
    error: "Erreur",
    success: "Terminé",
    required: "Obligatoire",
    optional: "Facultatif",
    amount: "Montant",
    date: "Date",
    time: "Heure",
    title: "Titre",
    description: "Description",
    note: "Note",
    category: "Catégorie",
    currency: "Devise",
    account: "Compte",
    type: "Type",
    frequency: "Fréquence",
    freePlan: "Forfait gratuit",
    plusPlan: "Forfait Plus",
    month: "Mois",
    monthly: "Mensuel",
    total: "Total",
    balance: "Solde",
    income: "Revenu",
    expense: "Dépense",
    transfer: "Virement",
    commission: "Frais",
    noData: "Aucune donnée",
    notAvailable: "Non disponible",
    no: "Non",
    transfers: "Transferts"
  },
  tabs: {
    home: "Accueil",
    accounts: "Comptes",
    movements: "Opérations",
    statistics: "Statistiques",
    settings: "Paramètres",
    more: "Plus",
    budgets: "Budgets",
    loans: "Prêts"
  },
  home: {
    totalEstimated: "Argent total estimé",
    totalEstimatedBalance: "Solde total estimé",
    monthlyExpenses: "Dépenses du mois",
    monthlyIncome: "Revenus du mois",
    monthlyBalance: "Résultat du mois",
    available: "Disponible",
    accounts: "Comptes",
    upcomingReminders: "Rappels à venir",
    viewAll: "Tout voir",
    noUpcomingReminders: "Vous n’avez aucun rappel à venir.",
    recentActivity: "Activité récente",
    noRegisteredMovements: "Vous n’avez encore enregistré aucune opération.",
    noActivity: "Aucune activité pour le moment.",
    viewAllAccounts: "Tout voir",
    monthlySummary: "Résumé mensuel"
  },
  accounts: {
    title: "Comptes",
    description: "Enregistrez vos banques, espèces, cryptomonnaies, cartes et prêts.",
    newAccount: "Nouveau compte",
    firstAccount: "Créer le premier compte",
    createTitle: "Nouveau compte",
    editTitle: "Modifier le compte",
    emptyTitle: "Vous n’avez pas encore de comptes",
    emptyDescription: "Créez votre premier compte pour commencer à enregistrer vos revenus, dépenses et virements.",
    freePlanRemaining: "Forfait gratuit : {{count}} comptes disponibles.",
    plusPlanUnlimited: "Forfait Plus : comptes illimités.",
    limitTitle: "Vous avez atteint la limite de comptes gratuits",
    limitDescription: "Le forfait gratuit permet jusqu’à 3 comptes. Activez Plus pour créer des comptes illimités.",
    deleteTitle: "Supprimer le compte",
    deleteDescription: "Ce compte sera masqué de la liste active. Ses opérations historiques seront conservées.",
    saveAccount: "Enregistrer le compte",
    saveChanges: "Enregistrer les modifications",
    card: {
      customAccount: "Compte personnalisé",
      currentBalance: "Solde actuel",
      includedInTotal: "Inclus dans le total estimé",
      excludedFromTotal: "Exclu du total estimé",
      options: "Options"
    },
    form: {
      createTitle: "Nouveau compte",
      editTitle: "Modifier le compte",
      editDescription: "Mettez à jour les informations principales de ce compte.",
      createDescription: "Configurez les informations principales de ce compte.",
      name: "Nom du compte",
      namePlaceholder: "Ex. : Banque Pichincha",
      currentBalance: "Solde actuel",
      initialBalance: "Solde initial",
      balancePlaceholder: "0.00",
      balanceEditInfo: "Le solde est mis à jour en enregistrant des opérations, pas en modifiant le compte.",
      type: "Type de compte",
      mainCurrency: "Devise principale",
      currencyCrypto: "Cryptomonnaie",
      currencyFiat: "Devise traditionnelle",
      currencyCustom: "Personnalisée",
      currencyEditInfo: "La devise principale ne peut pas être modifiée lors de l’édition afin d’éviter d’altérer l’historique des opérations.",
      includeInTotal: "Ajouter au total estimé",
      includeInTotalDescription: "Activez cette option si vous voulez que ce compte soit ajouté à votre solde total.",
      initialBalanceRequired: "Le solde initial est obligatoire. Utilisez 0 s’il n’y a pas de solde.",
      initialBalanceError: "Le solde initial ne peut pas être négatif.",
      nameRequired: "Le nom du compte est obligatoire.",
      institutionName: "Banque ou institution",
      institutionNamePlaceholder: "Ex. banque, Binance, Metamask",
      pinAccount: "Épingler comme important",
      pinAccountDescription: "Il apparaîtra en premier sur l’écran des comptes.",
      cardDesign: "Design de carte",
      cardDesignPlusOnly: "Disponible uniquement avec Plus.",
      steps: {
        0: {
          description: "Définissez d’abord l’identité du compte."
        },
        1: {
          description: "Configurez maintenant le solde, la devise et l’importance."
        },
        2: {
          description: "Choisissez l’apparence de la carte de ce compte."
        }
      },
      cardDesignUpgradeMessage: "Passez à Plus pour personnaliser vos designs de cartes.",
      isSavingsTarget: "Compte destiné à l’épargne",
      isSavingsTargetDescription: "Utilisez-le pour séparer l’argent que vous ne voulez pas dépenser."
    },
    types: {
      bank: {
        label: "Banque",
        description: "Compte bancaire traditionnel."
      },
      cash: {
        label: "Espèces",
        description: "Argent physique disponible."
      },
      piggy_bank: {
        label: "Tirelire",
        description: "Épargne physique ou séparée pour un objectif."
      },
      crypto_exchange: {
        label: "Plateforme crypto",
        description: "Compte dans des applications comme Binance ou d’autres plateformes crypto."
      },
      crypto_wallet: {
        label: "Portefeuille crypto",
        description: "Portefeuille comme MetaMask ou autres applications pour stocker des cryptomonnaies."
      },
      credit_card: {
        label: "Carte de crédit",
        description: "Carte avec une dette ou une limite de crédit utilisée."
      },
      loan_receivable: {
        label: "Prêt à recevoir",
        description: "Argent que quelqu’un vous doit."
      },
      loan_payable: {
        label: "Prêt à rembourser",
        description: "Argent que vous devez rembourser."
      },
      custom: {
        label: "Compte personnalisé",
        description: "Type de compte défini par l’utilisateur."
      }
    },
    cardDesigns: {
      default: {
        label: "Standard",
        description: "Design épuré pour tout compte."
      },
      minimal: {
        label: "Minimaliste",
        description: "Plus sobre et discret."
      },
      gradient: {
        label: "Dégradé",
        description: "Un style visuel plus moderne."
      },
      blue: {
        label: "Bleu de marque",
        description: "Utilise le bleu principal d’Orvian."
      },
      dark: {
        label: "Sombre",
        description: "Style élégant avec une apparence sombre."
      },
      premium: {
        label: "Premium",
        description: "Un design plus exclusif pour les comptes importants."
      }
    },
    groups: {
      regular: "Traditionnels",
      crypto: "Crypto"
    },
    summary: {
      regularTotal: "Total traditionnel",
      cryptoTotal: "Total crypto",
      accountCount: "{{count}} compte"
    },
    emptyCryptoAccounts: "Vous n’avez pas encore de comptes crypto.",
    emptyRegularAccounts: "Vous n’avez pas encore de comptes traditionnels.",
    detail: {
      description: "Gérez les informations et les paramètres de ce compte.",
      notFoundTitle: "Compte introuvable",
      notFoundDescription: "Ce compte n’existe plus ou a été archivé.",
      type: "Type",
      institution: "Institution",
      mainCurrency: "Devise principale",
      archiveTitle: "Archiver le compte",
      archiveDescription: "Ce compte n’apparaîtra plus dans votre liste principale, mais ses données seront conservées.",
      archiveAction: "Archiver",
      settings: "Paramètres",
      recentMovements: "Mouvements récents",
      recentMovementsDescription: "Activité confirmée des 2 derniers mois.",
      noRecentMovements: "Il n’y a pas de mouvements récents sur ce compte.",
      actions: "Actions",
      archive: "Archiver le compte",
      edit: "Modifier le compte",
      emptyActivity: "Il n’y a pas de mouvements récents sur ce compte.",
      information: "Informations",
      priority: "Priorité",
      recentActivity: "Activité récente",
      totalEstimated: "Total estimé",
      normal: "Normal",
      pinned: "Épinglé"
    }
  },
  movements: {
    title: "Opérations",
    description: "Enregistrez vos revenus, dépenses et virements entre vos comptes.",
    newMovement: "Nouvelle opération",
    newTransfer: "Nouveau virement",
    registerMovement: "Enregistrer une opération",
    emptyTitle: "Vous n’avez pas encore d’opérations",
    emptyDescription: "Enregistrez votre premier revenu, dépense ou virement pour commencer à construire votre historique financier.",
    incomeExpense: "Revenu / Dépense",
    income: "Revenu",
    expense: "Dépense",
    transfer: "Virement",
    freePlanRemaining: "Forfait gratuit : {{count}} opérations disponibles ce mois-ci.",
    plusPlanUnlimited: "Forfait Plus : opérations illimitées.",
    firstCreateAccountTitle: "Créez d’abord un compte",
    firstCreateAccountDescription: "Vous avez besoin d’au moins un compte actif pour enregistrer des revenus ou des dépenses.",
    limitTitle: "Vous avez atteint la limite d’opérations gratuites",
    limitDescription: "Le forfait gratuit permet jusqu’à 30 opérations par mois. Activez Plus pour enregistrer des opérations illimitées.",
    deleteMovementTitle: "Supprimer l’opération",
    deleteMovementDescription: "Cette action annulera l’impact de cette opération sur le solde.",
    deleteTransferTitle: "Supprimer le virement",
    deleteTransferDescription: "Cette action annulera l’impact de ce virement sur les soldes.",
    editMovement: "Modifier l’opération",
    editTransfer: "Modifier le virement",
    saveMovement: "Enregistrer l’opération",
    saveTransfer: "Enregistrer le virement",
    form: {
      account: "Compte",
      category: "Catégorie",
      amount: "Montant",
      tags: "Étiquettes",
      note: "Note",
      notePlaceholder: "Note facultative",
      selectedAccountNotFound: "Le compte sélectionné n'existe pas.",
      insufficientBalance: "Vous n'avez pas assez d'argent sur ce compte.",
      createDescription: "Enregistrez un revenu ou une dépense confirmé.",
      amountRequired: "Le montant doit être supérieur à 0.",
      accountRequired: "Sélectionnez un compte.",
      categoryRequired: "Sélectionnez une catégorie.",
      allTagsSelected: "Vous avez déjà sélectionné toutes les étiquettes disponibles.",
      accountCurrency: "Devise : {{currency}}"
    },
    card: {
      defaultTitle: "Opération",
      deletedAccount: "Compte supprimé"
    },
    transferCard: {
      fromAccountFallback: "Compte source",
      toAccountFallback: "Compte de destination",
      sent: "Envoyé",
      received: "Reçu",
      fee: "Frais",
      exchangeRate: "Taux utilisé : 1 {{fromCurrency}} = {{exchangeRate}} {{toCurrency}}"
    },
    transferForm: {
      fromAccount: "Compte source",
      toAccount: "Compte de destination",
      fromAmount: "Montant envoyé",
      toAmount: "Montant reçu",
      note: "Note",
      notePlaceholder: "Ex. : virement vers l’épargne",
      differentAccountsRequired: "Sélectionnez des comptes différents.",
      description: "Déplacez de l’argent entre vos comptes et enregistrez les frais ou le change de devise.",
      fromAccountRequired: "Sélectionnez un compte source.",
      toAccountRequired: "Sélectionnez un compte de destination.",
      fromAmountRequired: "Le montant envoyé doit être supérieur à 0.",
      toAmountRequired: "Le montant reçu doit être supérieur à 0.",
      feeInvalid: "Les frais ne peuvent pas être négatifs.",
      insufficientBalance: "Vous n'avez pas assez d'argent sur le compte source pour ce transfert.",
      multiCurrencyBlockedByPlan: "Le forfait gratuit permet uniquement les virements entre comptes avec la même devise.",
      fromAmountWithCurrency: "Montant envoyé {{currency}}",
      toAmountWithCurrency: "Montant reçu {{currency}}",
      feeAmountWithCurrency: "Frais {{currency}}",
      calculatedExchangeRate: "Taux de change calculé",
      multiCurrencyPlusTitle: "Les virements entre devises sont disponibles avec Plus",
      multiCurrencyPlusDescription: "Dans le forfait gratuit, vous pouvez transférer entre comptes avec la même devise. Pour les virements avec change de devise, activez Plus."
    },
    calculatorAmount: "Montant du mouvement",
    transferAmount: "Montant à transférer",
    emptyFilterTitle: "Aucun résultat",
    emptyFilterDescription: "Changez le filtre pour voir d’autres mouvements.",
    newExpense: "Nouvelle dépense",
    newIncome: "Nouveau revenu"
  },
  statistics: {
    title: "Statistiques",
    description: "Consultez vos revenus, dépenses, virements et catégories.",
    filters: "Filtres du rapport",
    applyFilters: "Appliquer les filtres",
    clearFilters: "Effacer les filtres",
    filtersDescription: "Ajustez la période, le compte, la catégorie et la devise.",
    cards: {
      income: "Revenus",
      expenses: "Dépenses",
      transfers: "Virements",
      commissions: "Frais",
      periodBalance: "Résultat de la période"
    },
    charts: {
      incomeVsExpense: "Revenus vs dépenses",
      incomeVsExpenseDescription: "Comparaison mensuelle de l’argent entrant et sortant.",
      balanceEvolution: "Évolution du solde",
      balanceEvolutionDescription: "Solde cumulé des derniers mois.",
      topExpenseCategories: "Principales catégories de dépenses",
      topExpenseCategoriesDescription: "Catégories avec la plus grande sortie d’argent.",
      budgetUsed: "Budget utilisé",
      budgetUsedDescription: "Progression du budget mensuel actuel.",
      expensesByCategory: "Dépenses par catégorie",
      accountSummary: "Résumé des comptes"
    },
    empty: {
      noBudget: "Créez un budget mensuel pour voir ce graphique.",
      noMovements: "Enregistrez des opérations pour voir les statistiques.",
      noExpenses: "Aucune dépense n’a encore été enregistrée sur cette période.",
      noIncome: "Aucun revenu n’a encore été enregistré sur cette période.",
      noIncomeExpenseChart: "Aucune donnée de revenus ou de dépenses à afficher dans un graphique.",
      noBalanceTrend: "Il n’y a pas encore assez de données de solde pour afficher une tendance.",
      noExpenseCategoriesChart: "Aucune dépense par catégorie à afficher dans un graphique.",
      noFilterDataTitle: "Aucune donnée pour ces filtres",
      noFilterDataDescription: "Changez la période ou enregistrez des opérations pour voir les statistiques.",
      noExpensesForFilters: "Aucune dépense pour ces filtres."
    },
    labels: {
      income: "Revenus",
      expenses: "Dépenses",
      others: "Autres",
      top: "Top",
      balance: "Solde",
      used: "Utilisé",
      spentAmount: "{{amount}} dépensés",
      limitAmount: "Limite : {{amount}}",
      noCategory: "Sans catégorie",
      balanceAmount: "Solde : {{amount}}"
    }
  },
  reports: {
    export: {
      title: "Exporter le résumé",
      description: "Téléchargez vos comptes, revenus, dépenses et virements dans un fichier."
    },
    filters: {
      title: "Filtres",
      panelDescription: "Ajustez la période et les données que vous voulez analyser.",
      period: "Période",
      account: "Compte",
      category: "Catégorie",
      currency: "Devise",
      from: "De",
      to: "À",
      movementKind: "Type d’opération"
    },
    periods: {
      current_month: {
        label: "Mois actuel",
        description: "Opérations du mois actuel."
      },
      last_month: {
        label: "Mois dernier",
        description: "Opérations du mois dernier."
      },
      last_3_months: {
        label: "3 derniers mois",
        description: "Opérations des trois derniers mois."
      },
      current_year: {
        label: "Année actuelle",
        description: "Opérations de l’année actuelle."
      },
      custom: {
        label: "Personnalisé",
        description: "Choisissez une plage de dates manuellement."
      }
    },
    movementKinds: {
      all: {
        label: "Tout",
        description: "Revenus et dépenses."
      },
      income: {
        label: "Revenus",
        description: "Uniquement l’argent qui entre."
      },
      expense: {
        label: "Dépenses",
        description: "Uniquement l’argent qui sort."
      }
    },
    accounts: {
      all: {
        label: "Tous les comptes",
        description: "Inclut tous les comptes actifs."
      }
    },
    categories: {
      all: {
        label: "Toutes les catégories",
        description: "Ne pas filtrer par catégorie."
      }
    },
    currencies: {
      main: {
        label: "Devise principale",
        description: "Utiliser la devise principale pour le résumé."
      }
    }
  },
  settings: {
    title: "Paramètres",
    description: "Configurez votre expérience, vos données, votre confidentialité et votre forfait.",
    appearance: "Apparence",
    theme: "Thème",
    currentTheme: "Thème actuel : {{theme}}",
    themeModes: {
      system: "Système",
      dark: "Sombre",
      light: "Clair"
    },
    language: "Langue",
    languageDescription: "Choisissez la langue de l’interface d’Orvian.",
    languagePickerLabel: "Langue",
    currentPlan: "Forfait actuel",
    currentPlanDescription: "Vous utilisez le forfait {{plan}}.",
    freePlanName: "Gratuit",
    viewPlans: "Voir les forfaits",
    shortcuts: "Raccourcis",
    viewBudgets: "Voir les budgets",
    viewReminders: "Voir les rappels",
    privacy: "Confidentialité",
    privacyDescription: "Vérifiez comment vos données sont traitées dans Orvian.",
    privacyPolicy: "Politique de confidentialité",
    openPrivacyPolicy: "Voir la politique de confidentialité",
    exportData: "Exporter les données",
    exportDescription: "Générez des fichiers avec vos comptes, opérations et virements.",
    exporting: "Exportation...",
    exportCsv: "Exporter en CSV",
    exportExcel: "Exporter en Excel",
    importData: "Importer des données",
    importDescription: "Chargez des opérations depuis un fichier CSV.",
    localData: "Données locales",
    localDataDescription: "Vos données sont enregistrées sur cet appareil. La synchronisation du compte pourra être activée plus tard.",
    viewOnboardingAgain: "Voir l’introduction à nouveau",
    resetData: "Supprimer les données locales",
    about: "À propos d’Orvian",
    aboutDescription: "Orvian vous aide à organiser vos comptes, dépenses, budgets et résumés personnels.",
    app: "Application",
    version: "Version",
    developer: "Développeur",
    visitDeveloperWebsite: "Visiter le site du développeur",
    linkErrorTitle: "Impossible d’ouvrir le lien",
    linkErrorDescription: "Votre appareil ne peut pas ouvrir ce site web pour le moment.",
    privacyLinkErrorDescription: "Votre appareil ne peut pas ouvrir la politique de confidentialité pour le moment.",
    resetDataTitle: "Supprimer les données locales",
    resetDataDescription: "Cela supprimera les comptes, opérations, virements, rappels et paramètres enregistrés sur cet appareil.",
    resetDataConfirm: "Supprimer",
    exportErrorTitle: "Impossible d’exporter",
    exportCsvErrorDescription: "Une erreur est survenue lors de la génération du fichier CSV.",
    exportExcelErrorDescription: "Une erreur est survenue lors de la génération du fichier Excel."
  },
  onboarding: {
    welcome: {
      title: "Contrôlez votre argent depuis un seul endroit",
      description: "Enregistrez vos comptes, revenus, dépenses, virements, rappels et plans financiers depuis une application locale et privée.",
      balanceCardTitle: "Votre solde commence ici",
      income: "Revenus",
      expenses: "Dépenses",
      start: "Commencer"
    },
    setup: {
      stepLabel: "Étape {{step}} sur {{total}}",
      title: "Configurez votre expérience",
      description: "Ces réponses personnalisent l’application sans vous obliger à créer un compte."
    },
    stepOne: {
      mainCurrency: "Devise principale",
      calculateTotalNetWorth: "Calculer tout mon argent",
      calculateTotalNetWorthDescription: "Additionnez banques, espèces, crypto et autres comptes dans un solde général.",
      userType: "Type d’utilisateur"
    },
    stepTwo: {
      cryptoUsage: "Utilisation des cryptomonnaies",
      multiCurrencyUsage: "Utilisation de plusieurs devises"
    },
    stepThree: {
      mainGoal: "Objectif principal",
      activateFinancialReminders: "Activer les rappels financiers",
      activateFinancialRemindersDescription: "Cela vous aidera à vous souvenir des paiements, encaissements, achats ou économies.",
      viewPlans: "Voir les forfaits"
    },
    options: {
      userProfile: {
        personal: {
          label: "Personnel",
          description: "Je veux gérer mes finances personnelles."
        },
        freelancer: {
          label: "Professionnel",
          description: "Je gagne de l’argent grâce à des projets ou des clients."
        },
        entrepreneur: {
          label: "Entrepreneur",
          description: "Je gère l’argent d’une entreprise ou d’un projet."
        },
        investor: {
          label: "Investisseur",
          description: "Je veux suivre des actifs, de la crypto ou des investissements."
        },
        student: {
          label: "Étudiant",
          description: "Je veux organiser mes dépenses et mon épargne."
        }
      },
      cryptoUsage: {
        none: {
          label: "Je n’utilise pas de crypto",
          description: "Je n’ai pas besoin de comptes comme Binance ou MetaMask."
        },
        basic: {
          label: "Oui, j’utilise la crypto",
          description: "Je veux enregistrer des plateformes, des portefeuilles ou des actifs numériques."
        },
        advanced: {
          label: "J’utilise la crypto, mais ce n’est pas une priorité",
          description: "Je veux enregistrer de la crypto, mais ce n’est pas le plus important pour moi."
        }
      },
      multiCurrencyUsage: {
        none: {
          label: "J’utilise une seule devise",
          description: "Je gère principalement mon argent dans une seule devise."
        },
        occasional: {
          label: "Parfois",
          description: "J’utilise occasionnellement des comptes dans différentes devises."
        },
        frequent: {
          label: "Fréquemment",
          description: "J’utilise souvent des comptes dans plusieurs devises."
        }
      },
      financialGoal: {
        control_expenses: {
          label: "Contrôler les dépenses",
          description: "Je veux savoir où va mon argent."
        },
        save_more: {
          label: "Épargner davantage",
          description: "Je veux mettre de l’argent de côté pour des objectifs et des réserves."
        },
        pay_debts: {
          label: "Payer mes dettes",
          description: "Je veux organiser mes dettes et paiements en attente."
        },
        track_income: {
          label: "Suivre mes revenus",
          description: "Je veux avoir un contrôle clair sur mes sources de revenus."
        },
        understand_investments: {
          label: "Comprendre mes investissements",
          description: "Je veux mieux suivre mes actifs, ma crypto ou mes investissements."
        },
        avoid_small_expenses: {
          label: "Éviter les petites dépenses quotidiennes",
          description: "Je veux identifier et contrôler les petites dépenses du quotidien."
        }
      }
    },
    plans: {
      title: "Choisissez comment commencer",
      description: "Vous pouvez utiliser l’application gratuitement et activer les fonctionnalités avancées plus tard.",
      continueWithPlus: "Continuer avec Plus"
    },
    v2: {
      control: {
        title: "Contrôlez votre argent sans complication",
        description: "Organisez comptes, soldes et mouvements au même endroit."
      },
      movements: {
        title: "Enregistrez dépenses et revenus en quelques secondes",
        description: "Utilisez un formulaire rapide façon calculatrice pour enregistrer votre argent plus facilement."
      }
    }
  },
  budgets: {
    title: "Budgets",
    description: "Définissez des limites mensuelles pour contrôler vos dépenses.",
    allCategoriesAlreadyBudgeted: "Vous avez déjà ajouté des limites pour toutes les catégories disponibles.",
    budgetedCategories: "Catégories avec limites",
    budgetOf: "Budget pour {{period}}",
    currentSpendingVsBudget: "Dépense actuelle comparée à votre limite mensuelle.",
    spent: "Dépensé",
    limit: "Limite",
    limitedCategories: "Catégories limitées",
    spentOfLimit: "{{spent}} sur {{limit}}",
    currentEmptyTitle: "Vous n’avez pas de budget ce mois-ci",
    currentEmptyDescription: "Créez un budget pour {{period}}.",
    createMonthlyBudget: "Créer un budget mensuel",
    historyTitle: "Historique des budgets",
    generalLimitValue: "Limite générale : {{amount}} {{currency}}",
    modalDescription: "Définissez des limites pour contrôler vos dépenses mensuelles.",
    status: {
      exceeded: "Vous avez dépassé votre budget mensuel.",
      warning: "Vous êtes proche d’atteindre votre budget mensuel.",
      safe: "Vos dépenses sont dans le budget.",
      used: "Utilisé",
      spentAmount: "{{amount}} dépensés",
      limitAmount: "Limite : {{amount}}"
    },
    newBudget: "Nouveau budget",
    editBudget: "Modifier le budget",
    createBudget: "Créer un budget",
    saveBudget: "Enregistrer le budget",
    deleteBudget: "Supprimer le budget",
    monthLabel: "{{month}} {{year}}",
    generalMonthlyBudget: "Budget mensuel général",
    generalBudgetPlaceholder: "Ex. : 500",
    categoryBudgetTitle: "Budget par catégorie",
    categoryBudgetDescription: "Ajoutez des limites uniquement aux catégories de dépenses que vous voulez contrôler.",
    expenseCategory: "Catégorie de dépense",
    monthlyLimit: "Limite mensuelle",
    monthlyLimitPlaceholder: "Ex. : 120",
    addCategory: "Ajouter une catégorie",
    removeCategory: "Retirer la catégorie",
    budgetUsed: "Budget utilisé",
    remainingBudget: "Budget restant",
    exceededBudget: "Budget dépassé",
    emptyTitle: "Vous n’avez pas encore de budgets",
    emptyDescription: "Créez un budget mensuel pour mieux contrôler vos dépenses.",
    deleteTitle: "Supprimer le budget",
    deleteDescription: "Ce budget et ses limites par catégorie seront supprimés.",
    errors: {
      generalRequired: "Le budget général est obligatoire.",
      generalGreaterThanZero: "Le budget général doit être supérieur à 0.",
      categoryRequired: "Sélectionnez une catégorie.",
      categoryLimitRequired: "La limite mensuelle est obligatoire.",
      categoryLimitGreaterThanZero: "La limite mensuelle doit être supérieure à 0.",
      duplicatedCategory: "Cette catégorie a déjà un budget attribué."
    }
  },
  reminders: {
    title: "Rappels",
    description: "Planifiez des paiements, encaissements, achats ou investissements.",
    newReminder: "Nouveau rappel",
    saveReminder: "Enregistrer le rappel",
    createReminder: "Créer un rappel",
    completeTitle: "Terminer le rappel",
    completeDescription: "Voulez-vous marquer ce rappel comme terminé ?",
    cancelTitle: "Annuler le rappel",
    cancelDescription: "Voulez-vous annuler ce rappel ?",
    confirmCancel: "Oui, annuler",
    emptyTitle: "Vous n’avez pas encore de rappels",
    emptyDescription: "Créez des rappels pour les paiements, encaissements, abonnements, achats ou économies.",
    complete: "Terminer",
    form: {
      title: "Titre",
      titlePlaceholder: "Ex. : payer la facture Internet",
      amountOptional: "Montant facultatif",
      amountPlaceholder: "0.00",
      type: "Type",
      frequency: "Fréquence",
      date: "Date",
      time: "Heure",
      relatedAccount: "Compte associé",
      descriptionOptional: "Description facultative",
      descriptionPlaceholder: "Ex. : échéance chaque 5 du mois...",
      titleRequired: "Le titre est obligatoire.",
      amountInvalid: "Le montant doit être supérieur ou égal à 0.",
      futureDateRequired: "La date doit être dans le futur."
    },
    card: {
      defaultType: "Rappel"
    },
    types: {
      payment: {
        label: "Paiement",
        description: "Services, dettes, carte ou engagements à payer."
      },
      collection: {
        label: "Encaissement",
        description: "Argent que quelqu’un doit vous payer."
      },
      subscription: {
        label: "Abonnement",
        description: "Netflix, Spotify, logiciels ou autres paiements récurrents."
      },
      saving: {
        label: "Épargne",
        description: "Rappel pour mettre de l’argent de côté."
      },
      investment: {
        label: "Investissement",
        description: "Achat récurrent d’actifs ou de crypto."
      },
      purchase: {
        label: "Achat",
        description: "Achat important planifié."
      },
      custom: {
        label: "Personnalisé",
        description: "Rappel financier personnalisé."
      }
    },
    frequencies: {
      once: {
        label: "Une fois",
        description: "Vous serez notifié uniquement à la date sélectionnée."
      },
      daily: {
        label: "Quotidien",
        description: "Se répétera tous les jours."
      },
      weekly: {
        label: "Hebdomadaire",
        description: "Se répétera chaque semaine."
      },
      monthly: {
        label: "Mensuel",
        description: "Se répétera chaque mois."
      }
    }
  },
  plans: {
    title: "Forfaits",
    description: "Choisissez le forfait qui correspond le mieux à votre façon d’organiser vos finances.",
    currentPlan: "Forfait actuel",
    free: "Gratuit",
    plus: "Plus",
    demoDescription: "Commencez gratuitement et activez les fonctionnalités avancées lorsque vous en avez besoin.",
    monthlyPeriod: "par mois",
    yearlyAvailable: "Également disponible pour ${{price}} par an.",
    plusActive: "Plus actif",
    activatePlusDemo: "Activer la démo Plus",
    freeActive: "Gratuit actif",
    backToFree: "Revenir au gratuit",
    freePlan: {
      name: "Gratuit",
      description: "Idéal pour commencer à organiser vos finances personnelles.",
      price: "$0",
      period: "Pour toujours",
      cta: "Continuer gratuitement",
      current: "Forfait actuel",
      features: {
        accountsLimit: "Jusqu’à 3 comptes",
        movementsLimit: "Jusqu’à 30 opérations par mois",
        basicStatistics: "Statistiques de base",
        localData: "Données enregistrées localement"
      }
    },
    plusPlan: {
      name: "Plus",
      description: "Pour les utilisateurs qui veulent un contrôle financier complet.",
      price: "{{price}}",
      period: "par mois",
      cta: "Activer Plus",
      features: {
        unlimitedAccounts: "Comptes illimités",
        unlimitedMovements: "Opérations illimitées",
        advancedStatistics: "Statistiques avancées",
        budgets: "Budgets mensuels",
        reminders: "Rappels financiers",
        exportData: "Exportation des données",
        priorityFeatures: "Accès aux fonctionnalités avancées"
      }
    },
    restorePurchase: "Restaurer l’achat",
    continueWithoutPlus: "Continuer sans Plus",
    errors: {
      purchaseUnavailable: "L’achat n’est pas disponible pour le moment.",
      restoreUnavailable: "Impossible de restaurer l’achat pour le moment."
    },
    v2: {
      title: "Choisissez comment évoluer avec Orvian",
      description: "Commencez gratuitement et débloquez les fonctions premium quand vous en avez besoin.",
      oneTimePayment: "Paiement unique",
      unlockPlus: "Débloquer Plus",
      plusActive: "Plus actif",
      buyPack: "Acheter le pack",
      included: "Inclus",
      includedWithPlus: "Inclus avec Plus",
      cardDesigns: {
        title: "Designs de cartes",
        description: "Achetez des packs individuels ou débloquez-les avec Plus."
      },
      legacy: {
        title: "Avantage pour les premiers utilisateurs",
        description: "Merci d’avoir essayé Orvian avant le lancement public.",
        benefit: "Vous aurez un accès Plus temporaire et une réduction spéciale pour conserver Plus Lifetime.",
        temporaryUntil: "Accès temporaire estimé jusqu’au : {{date}}"
      },
      pro: {
        title: "Bientôt : Orvian Pro",
        description: "L’IA financière, la synchronisation cloud, les sauvegardes et l’accès multi-appareil feront partie d’un plan mensuel séparé."
      }
    },
    products: {
      plusLifetime: {
        description: "Débloquez les fonctions premium locales avec un paiement unique."
      },
      cardPacks: {
        dark: {
          description: "Des designs sombres et élégants pour vos comptes."
        },
        luxury: {
          description: "Des designs exclusifs pour une app plus premium."
        },
        crypto: {
          description: "Des designs inspirés des actifs numériques et des wallets."
        },
        minimal: {
          description: "Des designs propres et minimalistes pour les comptes personnels."
        }
      }
    }
  },
  categories: {
    salary: "Salaire",
    freelance: "Projet / Freelance",
    sales: "Ventes",
    business_income: "Entreprise",
    investment_income: "Investissement",
    gift_income: "Cadeau / Extra",
    refund: "Remboursement",
    loan_received: "Prêt reçu",
    rental_income: "Revenu locatif",
    other_income: "Autre revenu",
    food: "Alimentation",
    groceries: "Courses",
    restaurants: "Restaurants",
    transport: "Transport",
    fuel: "Carburant",
    taxi_rideshare: "Taxi / Apps",
    housing: "Logement",
    rent: "Loyer",
    services: "Services",
    electricity: "Électricité",
    water: "Eau",
    internet_phone: "Internet / Téléphone",
    health: "Santé",
    medicine: "Médicaments",
    education: "Éducation",
    entertainment: "Divertissement",
    subscriptions: "Abonnements",
    technology: "Technologie",
    clothing: "Vêtements",
    personal_care: "Soins personnels",
    family: "Famille",
    pets: "Animaux",
    travel: "Voyage",
    gifts: "Cadeaux",
    taxes: "Impôts",
    fees: "Frais",
    debt_payment: "Paiement de dette",
    savings: "Épargne",
    investment_expense: "Investissement",
    cash_withdrawal: "Retrait d’espèces",
    other: "Autre"
  },
  tags: {
    essential: "Essentiel",
    optional: "Facultatif",
    urgent: "Urgent",
    recurring: "Récurrent",
    planned: "Planifié",
    unplanned: "Non planifié",
    cash: "Espèces",
    card: "Carte",
    transfer: "Virement",
    online: "En ligne",
    subscription: "Abonnement",
    work: "Travail",
    personal: "Personnel",
    family: "Famille",
    business: "Entreprise",
    tax: "Impôt",
    invoice: "Facture",
    debt: "Dette",
    savings: "Épargne",
    small_expense: "Petite dépense quotidienne"
  },
  loans: {
    newLoan: "Nouveau prêt",
    form: {
      description: "Suivez l’argent que vous devez payer ou encaisser.",
      title: "Titre",
      titlePlaceholder: "Ex. prêt personnel",
      titleRequired: "Le titre est obligatoire.",
      personOrEntity: "Personne ou entité",
      personOrEntityPlaceholder: "Ex. personne, banque, proche",
      payable: "Je dois payer",
      receivable: "On doit me payer",
      payableDescription: "Argent que vous devez.",
      receivableDescription: "Argent qui vous est dû.",
      amount: "Montant",
      amountPlaceholder: "0.00",
      amountRequired: "Le montant est obligatoire.",
      amountError: "Saisissez un montant supérieur à 0.",
      currency: "Devise",
      notes: "Notes",
      notesPlaceholder: "Détails optionnels du prêt",
      createTitle: "Créer un prêt"
    },
    payment: {
      remainingAmount: "Restant : {{amount}}",
      amount: "Montant",
      amountPlaceholder: "0.00",
      amountRequired: "Le montant est obligatoire.",
      amountError: "Saisissez un montant supérieur à 0 et inférieur ou égal à {{amount}}.",
      note: "Note",
      notePlaceholder: "Détail optionnel du paiement ou de l’encaissement",
      pay: "Payer"
    }
  },
  transfers: {
    form: {
      fromAccountRequired: "Sélectionnez le compte source.",
      toAccountRequired: "Sélectionnez le compte de destination.",
      sameAccountError: "Les comptes source et destination doivent être différents.",
      exchangeRatePending: "Pour l’instant, un taux de 1:1 sera utilisé. Un change avancé sera ajouté plus tard.",
      fromAccount: "Compte source",
      toAccount: "Compte destination",
      feeAmount: "Frais"
    }
  }
} as const;
