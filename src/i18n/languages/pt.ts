export const pt = {
  common: {
    appName: "Orvian",
    cancel: "Cancelar",
    save: "Salvar",
    edit: "Editar",
    delete: "Excluir",
    close: "Fechar",
    continue: "Continuar",
    back: "Voltar",
    next: "Próximo",
    confirm: "Confirmar",
    apply: "Aplicar",
    clear: "Limpar",
    add: "Adicionar",
    create: "Criar",
    update: "Atualizar",
    remove: "Remover",
    search: "Pesquisar",
    select: "Selecionar",
    loading: "Carregando...",
    saving: "Salvando...",
    exporting: "Exportando...",
    error: "Erro",
    success: "Concluído",
    required: "Obrigatório",
    optional: "Opcional",
    amount: "Valor",
    date: "Data",
    time: "Hora",
    title: "Título",
    description: "Descrição",
    note: "Nota",
    category: "Categoria",
    currency: "Moeda",
    account: "Conta",
    type: "Tipo",
    frequency: "Frequência",
    freePlan: "Plano gratuito",
    plusPlan: "Plano Plus",
    month: "Mês",
    monthly: "Mensal",
    total: "Total",
    balance: "Saldo",
    income: "Entrada",
    expense: "Gasto",
    transfer: "Transferência",
    commission: "Taxa",
    noData: "Sem dados",
    notAvailable: "Não disponível",
    no: "Não",
    transfers: "Transferências"
  },
  tabs: {
    home: "Início",
    accounts: "Contas",
    movements: "Movimentações",
    statistics: "Estatísticas",
    settings: "Configurações",
    more: "Mais",
    budgets: "Orçamentos",
    loans: "Empréstimos"
  },
  home: {
    totalEstimated: "Dinheiro total estimado",
    totalEstimatedBalance: "Saldo total estimado",
    monthlyExpenses: "Gastos do mês",
    monthlyIncome: "Entradas do mês",
    monthlyBalance: "Resultado do mês",
    available: "Disponível",
    accounts: "Contas",
    upcomingReminders: "Próximos lembretes",
    viewAll: "Ver tudo",
    noUpcomingReminders: "Você não tem lembretes próximos.",
    recentActivity: "Atividade recente",
    noRegisteredMovements: "Você ainda não registrou nenhuma movimentação.",
    noActivity: "Ainda não há atividade.",
    viewAllAccounts: "Ver todas",
    monthlySummary: "Resumo mensal"
  },
  accounts: {
    title: "Contas",
    description: "Registre bancos, dinheiro em espécie, criptomoedas, cartões e empréstimos.",
    newAccount: "Nova conta",
    firstAccount: "Criar primeira conta",
    createTitle: "Nova conta",
    editTitle: "Editar conta",
    emptyTitle: "Você ainda não tem contas",
    emptyDescription: "Crie sua primeira conta para começar a registrar entradas, gastos e transferências.",
    freePlanRemaining: "Plano gratuito: {{count}} contas disponíveis.",
    plusPlanUnlimited: "Plano Plus: contas ilimitadas.",
    limitTitle: "Você atingiu o limite de contas gratuitas",
    limitDescription: "O plano gratuito permite até 3 contas. Ative o Plus para criar contas ilimitadas.",
    deleteTitle: "Excluir conta",
    deleteDescription: "Esta conta será ocultada da lista ativa. Suas movimentações históricas serão mantidas.",
    saveAccount: "Salvar conta",
    saveChanges: "Salvar alterações",
    card: {
      customAccount: "Conta personalizada",
      currentBalance: "Saldo atual",
      includedInTotal: "Incluída no total estimado",
      excludedFromTotal: "Excluída do total estimado",
      options: "Opções"
    },
    form: {
      createTitle: "Nova conta",
      editTitle: "Editar conta",
      editDescription: "Atualize os principais dados desta conta.",
      createDescription: "Configure os principais dados desta conta.",
      name: "Nome da conta",
      namePlaceholder: "Ex.: Banco Pichincha",
      currentBalance: "Saldo atual",
      initialBalance: "Saldo inicial",
      balancePlaceholder: "0.00",
      balanceEditInfo: "O saldo é atualizado ao registrar movimentações, não ao editar a conta.",
      type: "Tipo de conta",
      mainCurrency: "Moeda principal",
      currencyCrypto: "Criptomoeda",
      currencyFiat: "Moeda tradicional",
      currencyCustom: "Personalizada",
      currencyEditInfo: "A moeda principal não pode ser alterada ao editar, para evitar problemas no histórico de movimentações.",
      includeInTotal: "Adicionar ao total estimado",
      includeInTotalDescription: "Ative isso se quiser que esta conta seja somada ao seu saldo total.",
      initialBalanceRequired: "O saldo inicial é obrigatório. Use 0 se não houver saldo.",
      initialBalanceError: "O saldo inicial não pode ser negativo.",
      nameRequired: "O nome da conta é obrigatório.",
      institutionName: "Banco ou instituição",
      institutionNamePlaceholder: "Ex. Banco do Brasil, Binance, Metamask",
      pinAccount: "Fixar como importante",
      pinAccountDescription: "Aparecerá primeiro na tela de contas.",
      cardDesign: "Design do cartão",
      cardDesignPlusOnly: "Disponível apenas com Plus.",
      steps: {
        0: {
          description: "Primeiro defina a identidade da conta."
        },
        1: {
          description: "Agora configure saldo, moeda e importância."
        },
        2: {
          description: "Escolha como o cartão desta conta será exibido."
        }
      },
      cardDesignUpgradeMessage: "Atualize para Plus para personalizar o design dos seus cartões.",
      isSavingsTarget: "Conta destinada a poupar",
      isSavingsTargetDescription: "Use-a para separar dinheiro que você não quer gastar."
    },
    types: {
      bank: {
        label: "Banco",
        description: "Conta bancária tradicional."
      },
      cash: {
        label: "Dinheiro",
        description: "Dinheiro físico disponível."
      },
      piggy_bank: {
        label: "Cofrinho",
        description: "Economia física ou separada para uma meta."
      },
      crypto_exchange: {
        label: "Plataforma cripto",
        description: "Conta em apps como Binance ou outras plataformas cripto."
      },
      crypto_wallet: {
        label: "Carteira cripto",
        description: "Carteira como MetaMask ou outros apps para guardar cripto."
      },
      credit_card: {
        label: "Cartão de crédito",
        description: "Cartão com dívida ou limite de crédito usado."
      },
      loan_receivable: {
        label: "Empréstimo a receber",
        description: "Dinheiro que outra pessoa deve a você."
      },
      loan_payable: {
        label: "Empréstimo a pagar",
        description: "Dinheiro que você precisa devolver."
      },
      custom: {
        label: "Conta personalizada",
        description: "Tipo de conta definido pelo usuário."
      }
    },
    cardDesigns: {
      default: {
        label: "Padrão",
        description: "Design limpo para qualquer conta."
      },
      minimal: {
        label: "Minimalista",
        description: "Mais sóbrio e discreto."
      },
      gradient: {
        label: "Gradiente",
        description: "Estilo visual mais moderno."
      },
      blue: {
        label: "Azul da marca",
        description: "Usa o azul principal da Orvian."
      },
      dark: {
        label: "Escuro",
        description: "Estilo elegante com aparência escura."
      },
      premium: {
        label: "Premium",
        description: "Design mais exclusivo para contas em destaque."
      }
    },
    groups: {
      regular: "Tradicionais",
      crypto: "Cripto"
    },
    summary: {
      regularTotal: "Total tradicional",
      cryptoTotal: "Total cripto",
      accountCount: "{{count}} conta"
    },
    emptyCryptoAccounts: "Você ainda não tem contas cripto.",
    emptyRegularAccounts: "Você ainda não tem contas tradicionais.",
    detail: {
      description: "Gerencie as informações e configurações desta conta.",
      notFoundTitle: "Conta não encontrada",
      notFoundDescription: "Esta conta não existe mais ou foi arquivada.",
      type: "Tipo",
      institution: "Instituição",
      mainCurrency: "Moeda principal",
      archiveTitle: "Arquivar conta",
      archiveDescription: "Esta conta não aparecerá mais na lista principal, mas seus dados serão mantidos.",
      archiveAction: "Arquivar",
      settings: "Configuração",
      recentMovements: "Movimentos recentes",
      recentMovementsDescription: "Atividade confirmada dos últimos 2 meses.",
      noRecentMovements: "Não há movimentos recentes nesta conta.",
      actions: "Ações",
      archive: "Arquivar conta",
      edit: "Editar conta",
      emptyActivity: "Não há movimentos recentes nesta conta.",
      information: "Informações",
      priority: "Prioridade",
      recentActivity: "Atividade recente",
      totalEstimated: "Total estimado",
      normal: "Normal"
    }
  },
  movements: {
    title: "Movimentações",
    description: "Registre entradas, gastos e transferências entre suas contas.",
    newMovement: "Nova movimentação",
    newTransfer: "Nova transferência",
    registerMovement: "Registrar movimentação",
    emptyTitle: "Você ainda não tem movimentações",
    emptyDescription: "Registre sua primeira entrada, gasto ou transferência para começar a criar seu histórico financeiro.",
    incomeExpense: "Entrada / Gasto",
    income: "Entrada",
    expense: "Gasto",
    transfer: "Transferência",
    freePlanRemaining: "Plano gratuito: {{count}} movimentações disponíveis este mês.",
    plusPlanUnlimited: "Plano Plus: movimentações ilimitadas.",
    firstCreateAccountTitle: "Crie uma conta primeiro",
    firstCreateAccountDescription: "Você precisa ter pelo menos uma conta ativa para registrar entradas ou gastos.",
    limitTitle: "Você atingiu o limite de movimentações gratuitas",
    limitDescription: "O plano gratuito permite até 30 movimentações por mês. Ative o Plus para registrar movimentações ilimitadas.",
    deleteMovementTitle: "Excluir movimentação",
    deleteMovementDescription: "Esta ação irá reverter o saldo afetado por esta movimentação.",
    deleteTransferTitle: "Excluir transferência",
    deleteTransferDescription: "Esta ação irá reverter os saldos afetados por esta transferência.",
    editMovement: "Editar movimentação",
    editTransfer: "Editar transferência",
    saveMovement: "Salvar movimentação",
    saveTransfer: "Salvar transferência",
    form: {
      account: "Conta",
      category: "Categoria",
      amount: "Valor",
      tags: "Etiquetas",
      note: "Nota",
      notePlaceholder: "Ex.: compras do mercado",
      selectedAccountNotFound: "A conta selecionada não existe.",
      insufficientBalance: "Você não tem dinheiro suficiente nesta conta.",
      createDescription: "Registre uma entrada ou gasto confirmado.",
      amountRequired: "O valor deve ser maior que 0.",
      accountRequired: "Selecione uma conta.",
      categoryRequired: "Selecione uma categoria.",
      allTagsSelected: "Você já selecionou todas as etiquetas disponíveis.",
      accountCurrency: "Moeda: {{currency}}"
    },
    card: {
      defaultTitle: "Movimentação",
      deletedAccount: "Conta excluída"
    },
    transferCard: {
      fromAccountFallback: "Conta de origem",
      toAccountFallback: "Conta de destino",
      sent: "Enviado",
      received: "Recebido",
      fee: "Taxa",
      exchangeRate: "Câmbio usado: 1 {{fromCurrency}} = {{exchangeRate}} {{toCurrency}}"
    },
    transferForm: {
      fromAccount: "Conta de origem",
      toAccount: "Conta de destino",
      fromAmount: "Valor enviado",
      toAmount: "Valor recebido",
      note: "Nota",
      notePlaceholder: "Ex.: transferência para poupança",
      differentAccountsRequired: "Selecione contas diferentes.",
      description: "Movimente dinheiro entre contas e registre taxas ou câmbio de moeda.",
      fromAccountRequired: "Selecione uma conta de origem.",
      toAccountRequired: "Selecione uma conta de destino.",
      fromAmountRequired: "O valor enviado deve ser maior que 0.",
      toAmountRequired: "O valor recebido deve ser maior que 0.",
      feeInvalid: "A taxa não pode ser negativa.",
      insufficientBalance: "Você não tem dinheiro suficiente na conta de origem para esta transferência.",
      multiCurrencyBlockedByPlan: "O plano gratuito permite apenas transferências entre contas com a mesma moeda.",
      fromAmountWithCurrency: "Valor enviado {{currency}}",
      toAmountWithCurrency: "Valor recebido {{currency}}",
      feeAmountWithCurrency: "Taxa {{currency}}",
      calculatedExchangeRate: "Taxa de câmbio calculada",
      multiCurrencyPlusTitle: "Transferências entre moedas estão disponíveis no Plus",
      multiCurrencyPlusDescription: "No plano gratuito, você pode transferir entre contas com a mesma moeda. Para transferências com câmbio de moeda, ative o Plus."
    }
  },
  statistics: {
    title: "Estatísticas",
    description: "Revise suas entradas, gastos, transferências e categorias.",
    filters: "Filtros do resumo",
    applyFilters: "Aplicar filtros",
    clearFilters: "Limpar filtros",
    filtersDescription: "Ajuste o período, a conta, a categoria e a moeda.",
    cards: {
      income: "Entradas",
      expenses: "Gastos",
      transfers: "Transferências",
      commissions: "Taxas",
      periodBalance: "Resultado do período"
    },
    charts: {
      incomeVsExpense: "Entradas vs gastos",
      incomeVsExpenseDescription: "Comparação mensal do dinheiro que entra e sai.",
      balanceEvolution: "Evolução do saldo",
      balanceEvolutionDescription: "Saldo acumulado dos meses recentes.",
      topExpenseCategories: "Principais categorias de gastos",
      topExpenseCategoriesDescription: "Categorias com maior saída de dinheiro.",
      budgetUsed: "Orçamento usado",
      budgetUsedDescription: "Progresso do orçamento mensal atual.",
      expensesByCategory: "Gastos por categoria",
      accountSummary: "Resumo das contas"
    },
    empty: {
      noBudget: "Crie um orçamento mensal para ver este gráfico.",
      noMovements: "Registre movimentações para ver estatísticas.",
      noExpenses: "Ainda não há gastos registrados neste período.",
      noIncome: "Ainda não há entradas registradas neste período.",
      noIncomeExpenseChart: "Não há dados de entradas ou gastos para gerar o gráfico.",
      noBalanceTrend: "Ainda não há dados suficientes de saldo para mostrar uma tendência.",
      noExpenseCategoriesChart: "Não há gastos por categoria para gerar o gráfico.",
      noFilterDataTitle: "Sem dados para estes filtros",
      noFilterDataDescription: "Altere o período ou registre movimentações para ver estatísticas.",
      noExpensesForFilters: "Não há gastos para estes filtros."
    },
    labels: {
      income: "Entradas",
      expenses: "Gastos",
      others: "Outros",
      top: "Top",
      balance: "Saldo",
      used: "Usado",
      spentAmount: "{{amount}} gastos",
      limitAmount: "Limite: {{amount}}",
      noCategory: "Sem categoria",
      balanceAmount: "Saldo: {{amount}}"
    }
  },
  reports: {
    export: {
      title: "Exportar resumo",
      description: "Baixe suas contas, entradas, gastos e transferências em um arquivo."
    },
    filters: {
      title: "Filtros",
      panelDescription: "Ajuste o período e os dados que você quer analisar.",
      period: "Período",
      account: "Conta",
      category: "Categoria",
      currency: "Moeda",
      from: "De",
      to: "Até",
      movementKind: "Tipo de movimentação"
    },
    periods: {
      current_month: {
        label: "Mês atual",
        description: "Movimentações do mês atual."
      },
      last_month: {
        label: "Mês passado",
        description: "Movimentações do mês passado."
      },
      last_3_months: {
        label: "Últimos 3 meses",
        description: "Movimentações dos últimos três meses."
      },
      current_year: {
        label: "Ano atual",
        description: "Movimentações do ano atual."
      },
      custom: {
        label: "Personalizado",
        description: "Escolha um intervalo de datas manualmente."
      }
    },
    movementKinds: {
      all: {
        label: "Todos",
        description: "Entradas e gastos."
      },
      income: {
        label: "Entradas",
        description: "Somente dinheiro que entra."
      },
      expense: {
        label: "Gastos",
        description: "Somente dinheiro que sai."
      }
    },
    accounts: {
      all: {
        label: "Todas as contas",
        description: "Inclui todas as contas ativas."
      }
    },
    categories: {
      all: {
        label: "Todas as categorias",
        description: "Não filtrar por categoria."
      }
    },
    currencies: {
      main: {
        label: "Moeda principal",
        description: "Usar a moeda principal para o resumo."
      }
    }
  },
  settings: {
    title: "Configurações",
    description: "Configure sua experiência, dados, privacidade e plano.",
    appearance: "Aparência",
    theme: "Tema",
    currentTheme: "Tema atual: {{theme}}",
    themeModes: {
      system: "Sistema",
      dark: "Escuro",
      light: "Claro"
    },
    language: "Idioma",
    languageDescription: "Escolha o idioma da interface do Orvian.",
    languagePickerLabel: "Idioma",
    currentPlan: "Plano atual",
    currentPlanDescription: "Você está usando o plano {{plan}}.",
    freePlanName: "Gratuito",
    viewPlans: "Ver planos",
    shortcuts: "Atalhos",
    viewBudgets: "Ver orçamentos",
    viewReminders: "Ver lembretes",
    privacy: "Privacidade",
    privacyDescription: "Veja como seus dados são tratados dentro do Orvian.",
    privacyPolicy: "Política de privacidade",
    openPrivacyPolicy: "Ver política de privacidade",
    exportData: "Exportar dados",
    exportDescription: "Gere arquivos com suas contas, movimentações e transferências.",
    exporting: "Exportando...",
    exportCsv: "Exportar CSV",
    exportExcel: "Exportar Excel",
    importData: "Importar dados",
    importDescription: "Carregue movimentações a partir de um arquivo CSV.",
    localData: "Dados locais",
    localDataDescription: "Seus dados são salvos neste dispositivo. A sincronização de conta poderá ser ativada depois.",
    viewOnboardingAgain: "Ver introdução novamente",
    resetData: "Excluir dados locais",
    about: "Sobre o Orvian",
    aboutDescription: "Orvian ajuda você a organizar suas contas, gastos, orçamentos e resumos pessoais.",
    app: "Aplicativo",
    version: "Versão",
    developer: "Desenvolvedor",
    visitDeveloperWebsite: "Visitar site do desenvolvedor",
    linkErrorTitle: "Não foi possível abrir o link",
    linkErrorDescription: "Seu dispositivo não consegue abrir este site agora.",
    privacyLinkErrorDescription: "Seu dispositivo não consegue abrir a política de privacidade agora.",
    resetDataTitle: "Excluir dados locais",
    resetDataDescription: "Isso excluirá contas, movimentações, transferências, lembretes e configurações salvas neste dispositivo.",
    resetDataConfirm: "Excluir",
    exportErrorTitle: "Não foi possível exportar",
    exportCsvErrorDescription: "Ocorreu um erro ao gerar o arquivo CSV.",
    exportExcelErrorDescription: "Ocorreu um erro ao gerar o arquivo Excel."
  },
  onboarding: {
    welcome: {
      title: "Controle seu dinheiro em um só lugar",
      description: "Registre contas, entradas, gastos, transferências, lembretes e planos financeiros em um app local e privado.",
      balanceCardTitle: "Seu saldo começa aqui",
      income: "Entradas",
      expenses: "Gastos",
      start: "Começar"
    },
    setup: {
      stepLabel: "Etapa {{step}} de {{total}}",
      title: "Configure sua experiência",
      description: "Essas respostas personalizam o app sem obrigar você a criar uma conta."
    },
    stepOne: {
      mainCurrency: "Moeda principal",
      calculateTotalNetWorth: "Calcular todo o meu dinheiro",
      calculateTotalNetWorthDescription: "Some bancos, dinheiro, cripto e outras contas em um saldo geral.",
      userType: "Tipo de usuário"
    },
    stepTwo: {
      cryptoUsage: "Uso de criptomoedas",
      multiCurrencyUsage: "Uso de várias moedas"
    },
    stepThree: {
      mainGoal: "Objetivo principal",
      activateFinancialReminders: "Ativar lembretes financeiros",
      activateFinancialRemindersDescription: "Isso ajudará você a lembrar pagamentos, cobranças, compras ou economias.",
      viewPlans: "Ver planos"
    },
    options: {
      userProfile: {
        personal: {
          label: "Pessoal",
          description: "Quero gerenciar minhas finanças pessoais."
        },
        freelancer: {
          label: "Profissional",
          description: "Recebo dinheiro de projetos ou clientes."
        },
        entrepreneur: {
          label: "Empreendedor",
          description: "Gerencio dinheiro de um negócio ou empreendimento."
        },
        investor: {
          label: "Investidor",
          description: "Quero acompanhar ativos, cripto ou investimentos."
        },
        student: {
          label: "Estudante",
          description: "Quero organizar gastos e economias."
        }
      },
      cryptoUsage: {
        none: {
          label: "Não uso cripto",
          description: "Não preciso de contas como Binance ou MetaMask."
        },
        basic: {
          label: "Sim, uso cripto",
          description: "Quero registrar plataformas, carteiras ou ativos digitais."
        },
        advanced: {
          label: "Uso cripto, mas não é prioridade",
          description: "Quero registrar cripto, mas isso não é o mais importante para mim."
        }
      },
      multiCurrencyUsage: {
        none: {
          label: "Uso uma moeda",
          description: "Gerencio meu dinheiro principalmente em uma moeda."
        },
        occasional: {
          label: "Às vezes",
          description: "Uso ocasionalmente contas em diferentes moedas."
        },
        frequent: {
          label: "Com frequência",
          description: "Uso frequentemente contas em várias moedas."
        }
      },
      financialGoal: {
        control_expenses: {
          label: "Controlar gastos",
          description: "Quero saber para onde meu dinheiro vai."
        },
        save_more: {
          label: "Economizar mais",
          description: "Quero separar dinheiro para metas e reservas."
        },
        pay_debts: {
          label: "Pagar dívidas",
          description: "Quero organizar minhas dívidas e pagamentos pendentes."
        },
        track_income: {
          label: "Acompanhar minhas entradas",
          description: "Quero ter controle claro das minhas fontes de entrada de dinheiro."
        },
        understand_investments: {
          label: "Entender meus investimentos",
          description: "Quero acompanhar melhor meus ativos, cripto ou investimentos."
        },
        avoid_small_expenses: {
          label: "Evitar pequenos gastos diários",
          description: "Quero identificar e controlar pequenos gastos do dia a dia."
        }
      }
    },
    plans: {
      title: "Escolha como quer começar",
      description: "Você pode usar o app gratuitamente e ativar recursos avançados depois.",
      continueWithPlus: "Continuar com Plus"
    }
  },
  budgets: {
    title: "Orçamentos",
    description: "Defina limites mensais para controlar seus gastos.",
    allCategoriesAlreadyBudgeted: "Você já adicionou limites para todas as categorias disponíveis.",
    budgetedCategories: "Categorias com limites",
    budgetOf: "Orçamento para {{period}}",
    currentSpendingVsBudget: "Gasto atual comparado ao seu limite mensal.",
    spent: "Gasto",
    limit: "Limite",
    limitedCategories: "Categorias limitadas",
    spentOfLimit: "{{spent}} de {{limit}}",
    currentEmptyTitle: "Você não tem um orçamento este mês",
    currentEmptyDescription: "Crie um orçamento para {{period}}.",
    createMonthlyBudget: "Criar orçamento mensal",
    historyTitle: "Histórico de orçamentos",
    generalLimitValue: "Limite geral: {{amount}} {{currency}}",
    modalDescription: "Defina limites para controlar seus gastos mensais.",
    status: {
      exceeded: "Você ultrapassou seu orçamento mensal.",
      warning: "Você está perto de atingir seu orçamento mensal.",
      safe: "Seus gastos estão dentro do orçamento.",
      used: "Usado",
      spentAmount: "{{amount}} gastos",
      limitAmount: "Limite: {{amount}}"
    },
    newBudget: "Novo orçamento",
    editBudget: "Editar orçamento",
    createBudget: "Criar orçamento",
    saveBudget: "Salvar orçamento",
    deleteBudget: "Excluir orçamento",
    monthLabel: "{{month}} {{year}}",
    generalMonthlyBudget: "Orçamento mensal geral",
    generalBudgetPlaceholder: "Ex.: 500",
    categoryBudgetTitle: "Orçamento por categoria",
    categoryBudgetDescription: "Adicione limites apenas às categorias de gastos que você quer controlar.",
    expenseCategory: "Categoria de gasto",
    monthlyLimit: "Limite mensal",
    monthlyLimitPlaceholder: "Ex.: 120",
    addCategory: "Adicionar categoria",
    removeCategory: "Remover categoria",
    budgetUsed: "Orçamento usado",
    remainingBudget: "Orçamento restante",
    exceededBudget: "Orçamento ultrapassado",
    emptyTitle: "Você ainda não tem orçamentos",
    emptyDescription: "Crie um orçamento mensal para controlar melhor seus gastos.",
    deleteTitle: "Excluir orçamento",
    deleteDescription: "Este orçamento e seus limites por categoria serão excluídos.",
    errors: {
      generalRequired: "O orçamento geral é obrigatório.",
      generalGreaterThanZero: "O orçamento geral deve ser maior que 0.",
      categoryRequired: "Selecione uma categoria.",
      categoryLimitRequired: "O limite mensal é obrigatório.",
      categoryLimitGreaterThanZero: "O limite mensal deve ser maior que 0.",
      duplicatedCategory: "Esta categoria já tem um orçamento atribuído."
    }
  },
  reminders: {
    title: "Lembretes",
    description: "Agende pagamentos, cobranças, compras ou investimentos.",
    newReminder: "Novo lembrete",
    saveReminder: "Salvar lembrete",
    createReminder: "Criar lembrete",
    completeTitle: "Concluir lembrete",
    completeDescription: "Deseja marcar este lembrete como concluído?",
    cancelTitle: "Cancelar lembrete",
    cancelDescription: "Deseja cancelar este lembrete?",
    confirmCancel: "Sim, cancelar",
    emptyTitle: "Você ainda não tem lembretes",
    emptyDescription: "Crie lembretes para pagamentos, cobranças, assinaturas, compras ou economias.",
    complete: "Concluir",
    form: {
      title: "Título",
      titlePlaceholder: "Ex.: Pagar internet",
      amountOptional: "Valor opcional",
      amountPlaceholder: "0.00",
      type: "Tipo",
      frequency: "Frequência",
      date: "Data",
      time: "Hora",
      relatedAccount: "Conta relacionada",
      descriptionOptional: "Descrição opcional",
      descriptionPlaceholder: "Ex.: vence todo dia 5 do mês...",
      titleRequired: "O título é obrigatório.",
      amountInvalid: "O valor deve ser maior ou igual a 0.",
      futureDateRequired: "A data deve estar no futuro."
    },
    card: {
      defaultType: "Lembrete"
    },
    types: {
      payment: {
        label: "Pagamento",
        description: "Serviços, dívidas, cartão ou compromissos a pagar."
      },
      collection: {
        label: "Cobrança",
        description: "Dinheiro que alguém precisa pagar a você."
      },
      subscription: {
        label: "Assinatura",
        description: "Netflix, Spotify, software ou outros pagamentos recorrentes."
      },
      saving: {
        label: "Economia",
        description: "Lembrete para separar dinheiro."
      },
      investment: {
        label: "Investimento",
        description: "Compra recorrente de ativos ou cripto."
      },
      purchase: {
        label: "Compra",
        description: "Compra importante planejada."
      },
      custom: {
        label: "Personalizado",
        description: "Lembrete financeiro personalizado."
      }
    },
    frequencies: {
      once: {
        label: "Uma vez",
        description: "Você será notificado apenas na data selecionada."
      },
      daily: {
        label: "Diário",
        description: "Será repetido todos os dias."
      },
      weekly: {
        label: "Semanal",
        description: "Será repetido toda semana."
      },
      monthly: {
        label: "Mensal",
        description: "Será repetido todo mês."
      }
    }
  },
  plans: {
    title: "Planos",
    description: "Escolha o plano que melhor combina com a forma como você organiza suas finanças.",
    currentPlan: "Plano atual",
    free: "Gratuito",
    plus: "Plus",
    demoDescription: "Comece gratuitamente e ative recursos avançados quando precisar.",
    monthlyPeriod: "por mês",
    yearlyAvailable: "Também disponível por ${{price}} por ano.",
    plusActive: "Plus ativo",
    activatePlusDemo: "Ativar demonstração do Plus",
    freeActive: "Gratuito ativo",
    backToFree: "Voltar para o gratuito",
    freePlan: {
      name: "Gratuito",
      description: "Ideal para começar a organizar suas finanças pessoais.",
      price: "$0",
      period: "Para sempre",
      cta: "Continuar gratuitamente",
      current: "Plano atual",
      features: {
        accountsLimit: "Até 3 contas",
        movementsLimit: "Até 30 movimentações por mês",
        basicStatistics: "Estatísticas básicas",
        localData: "Dados salvos localmente"
      }
    },
    plusPlan: {
      name: "Plus",
      description: "Para usuários que querem controle financeiro completo.",
      price: "{{price}}",
      period: "por mês",
      cta: "Ativar Plus",
      features: {
        unlimitedAccounts: "Contas ilimitadas",
        unlimitedMovements: "Movimentações ilimitadas",
        advancedStatistics: "Estatísticas avançadas",
        budgets: "Orçamentos mensais",
        reminders: "Lembretes financeiros",
        exportData: "Exportação de dados",
        priorityFeatures: "Acesso a recursos avançados"
      }
    },
    restorePurchase: "Restaurar compra",
    continueWithoutPlus: "Continuar sem Plus",
    errors: {
      purchaseUnavailable: "A compra não está disponível agora.",
      restoreUnavailable: "Não foi possível restaurar a compra agora."
    }
  },
  categories: {
    salary: "Salário",
    freelance: "Projeto / Freelancer",
    sales: "Vendas",
    business_income: "Negócio",
    investment_income: "Investimento",
    gift_income: "Presente / Extra",
    refund: "Reembolso",
    loan_received: "Empréstimo recebido",
    rental_income: "Renda de aluguel",
    other_income: "Outra entrada",
    food: "Alimentação",
    groceries: "Mercado",
    restaurants: "Restaurantes",
    transport: "Transporte",
    fuel: "Combustível",
    taxi_rideshare: "Táxi / Apps",
    housing: "Moradia",
    rent: "Aluguel",
    services: "Serviços",
    electricity: "Eletricidade",
    water: "Água",
    internet_phone: "Internet / Telefone",
    health: "Saúde",
    medicine: "Medicamentos",
    education: "Educação",
    entertainment: "Entretenimento",
    subscriptions: "Assinaturas",
    technology: "Tecnologia",
    clothing: "Roupas",
    personal_care: "Cuidados pessoais",
    family: "Família",
    pets: "Pets",
    travel: "Viagem",
    gifts: "Presentes",
    taxes: "Impostos",
    fees: "Taxas",
    debt_payment: "Pagamento de dívida",
    savings: "Economias",
    investment_expense: "Investimento",
    cash_withdrawal: "Saque de dinheiro",
    other: "Outros"
  },
  tags: {
    essential: "Essencial",
    optional: "Opcional",
    urgent: "Urgente",
    recurring: "Recorrente",
    planned: "Planejado",
    unplanned: "Não planejado",
    cash: "Dinheiro",
    card: "Cartão",
    transfer: "Transferência",
    online: "Online",
    subscription: "Assinatura",
    work: "Trabalho",
    personal: "Pessoal",
    family: "Família",
    business: "Negócio",
    tax: "Imposto",
    invoice: "Fatura",
    debt: "Dívida",
    savings: "Economia",
    small_expense: "Pequeno gasto diário"
  },
  loans: {
    newLoan: "Novo empréstimo",
    form: {
      description: "Registre dinheiro que você precisa pagar ou receber.",
      title: "Título",
      titlePlaceholder: "Ex. Empréstimo pessoal",
      titleRequired: "O título é obrigatório.",
      personOrEntity: "Pessoa ou entidade",
      personOrEntityPlaceholder: "Ex. João, banco, familiar",
      payable: "Preciso pagar",
      receivable: "Precisam me pagar",
      payableDescription: "Dinheiro que você deve.",
      receivableDescription: "Dinheiro que devem a você.",
      amount: "Valor",
      amountPlaceholder: "0.00",
      amountRequired: "O valor é obrigatório.",
      amountError: "Insira um valor maior que 0.",
      currency: "Moeda",
      notes: "Notas",
      notesPlaceholder: "Detalhes opcionais do empréstimo"
    },
    payment: {
      remainingAmount: "Pendente: {{amount}}",
      amount: "Valor",
      amountPlaceholder: "0.00",
      amountRequired: "O valor é obrigatório.",
      amountError: "Insira um valor maior que 0 e menor ou igual a {{amount}}.",
      note: "Nota",
      notePlaceholder: "Detalhe opcional do pagamento ou recebimento",
      pay: "Pagar"
    }
  }
} as const;
