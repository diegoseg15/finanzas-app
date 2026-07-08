export type CurrencyCode =
  | "USD"
  | "EUR"
  | "CRC"
  | "SVC"
  | "MXN"
  | "COP"
  | "ARS"
  | "CLP"
  | "PEN"
  | "BRL"
  | "GBP"
  | "CAD"
  | "AUD"
  | "JPY"
  | "CNY"
  | "CHF"
  | "VND"
  | "RUB"
  | "TRY"
  | "INR"
  | "UAH"
  | "SAR"
  | "AED"
  | "USDT"
  | "USDC"
  | "BTC"
  | "ETH"
  | "SOL"
  | "BNB";

export type AccountType =
  | "bank"
  | "cash"
  | "piggy_bank"
  | "crypto_exchange"
  | "crypto_wallet"
  | "credit_card"
  | "loan_receivable"
  | "loan_payable"
  | "custom";

export type AccountStatus = "active" | "archived";

export type AccountBalance = {
  currency: CurrencyCode;
  amount: number;
};

export type AccountCardDesign =
  | "default"
  | "minimal"
  | "gradient"
  | "blue"
  | "dark"
  | "premium";

export type Account = {
  id: string;
  name: string;
  type: AccountType;
  mainCurrency: CurrencyCode;
  balances: AccountBalance[];
  includeInTotalBalance: boolean;
  status: AccountStatus;
  color: string;
  icon: string;

  institutionName?: string;
  isPinned?: boolean;
  displayOrder?: number;
  cardDesign?: AccountCardDesign;
  isSavingsTarget?: boolean;

  migratedToLoanId?: string;
  hiddenFromAccounts?: boolean;
  legacyType?: "loan";

  createdAt: string;
  updatedAt: string;
};

export type CreateAccountInput = {
  name: string;
  type: AccountType;
  mainCurrency: CurrencyCode;
  initialBalance: number;
  includeInTotalBalance: boolean;
  institutionName?: string;
  isPinned?: boolean;
  cardDesign?: AccountCardDesign;
  isSavingsTarget?: boolean;
};

export type UpdateAccountInput = Partial<
  Pick<
    Account,
    | "name"
    | "type"
    | "mainCurrency"
    | "balances"
    | "includeInTotalBalance"
    | "status"
    | "color"
    | "icon"
    | "institutionName"
    | "isPinned"
    | "displayOrder"
    | "cardDesign"
    | "isSavingsTarget"
    | "migratedToLoanId"
    | "hiddenFromAccounts"
    | "legacyType"
  >
>;

export type Currency = {
  code: CurrencyCode;
  name: string;
  symbol: string;
  symbolPosition?: "prefix" | "suffix";
  type: "fiat" | "crypto" | "custom";
};

export type AccountTypeOption = {
  value: AccountType;
  label: string;
  description: string;
  icon: string;
  supportsMultipleCurrencies: boolean;
};

export type MovementKind = "income" | "expense";

export type MovementStatus = "confirmed" | "pending";

export type CategoryType = "income" | "expense" | "both";

export type Category = {
  id: string;
  name: string;
  labelI18nKey: string;
  type: "income" | "expense" | "both";
  icon: string;
  color: string;
};

export type Tag = {
  id: string;
  name: string;
  labelI18nKey: string;
  color?: string;
};

export type MovementAttachment = {
  id: string;
  name: string;
  mimeType: string;
  size?: number;
  uri: string;
  createdAt: string;
};

export type Movement = {
  id: string;
  kind: MovementKind;
  amount: number;
  currency: CurrencyCode;
  accountId: string;
  categoryId: string;
  tagIds: string[];
  note?: string;
  status: MovementStatus;
  date: string;

  balanceAfterMovement?: number;
  attachment?: MovementAttachment | null;

  createdAt: string;
  updatedAt: string;
};

export type CreateMovementInput = {
  kind: MovementKind;
  amount: number;
  currency: CurrencyCode;
  accountId: string;
  categoryId: string;
  tagIds: string[];
  note?: string;
  status: MovementStatus;
  date: string;
  attachment?: MovementAttachment | null;
};

export type TransferStatus = "confirmed" | "pending";

export type Transfer = {
  id: string;
  fromAccountId: string;
  toAccountId: string;

  fromAmount: number;
  fromCurrency: CurrencyCode;

  toAmount: number;
  toCurrency: CurrencyCode;

  feeAmount: number;
  feeCurrency: CurrencyCode;

  exchangeRate: number;

  note?: string;
  status: TransferStatus;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTransferInput = {
  fromAccountId: string;
  toAccountId: string;

  fromAmount: number;
  fromCurrency: CurrencyCode;

  toAmount: number;
  toCurrency: CurrencyCode;

  feeAmount: number;
  feeCurrency: CurrencyCode;

  exchangeRate: number;

  note?: string;
  status: TransferStatus;
  date: string;
};

export type ReminderType =
  | "payment"
  | "collection"
  | "subscription"
  | "saving"
  | "investment"
  | "purchase"
  | "custom";

export type ReminderFrequency = "once" | "daily" | "weekly" | "monthly";

export type ReminderStatus = "active" | "completed" | "cancelled";

export type Reminder = {
  id: string;
  title: string;
  description?: string;
  amount?: number;
  currency: CurrencyCode;
  type: ReminderType;
  frequency: ReminderFrequency;
  accountId?: string;
  scheduledAt: string;
  notificationId?: string;
  status: ReminderStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateReminderInput = {
  title: string;
  description?: string;
  amount?: number;
  currency: CurrencyCode;
  type: ReminderType;
  frequency: ReminderFrequency;
  accountId?: string;
  scheduledAt: string;
};

export type UpdateReminderInput = Partial<
  Pick<
    Reminder,
    | "title"
    | "description"
    | "amount"
    | "currency"
    | "type"
    | "frequency"
    | "accountId"
    | "scheduledAt"
    | "notificationId"
    | "status"
  >
>;

export type UpdateMovementInput = Partial<
  Pick<
    Movement,
    | "kind"
    | "amount"
    | "currency"
    | "accountId"
    | "categoryId"
    | "tagIds"
    | "note"
    | "status"
    | "attachment"
  >
>;

export type UpdateTransferInput = Partial<
  Pick<
    Transfer,
    | "fromAccountId"
    | "toAccountId"
    | "fromAmount"
    | "fromCurrency"
    | "toAmount"
    | "toCurrency"
    | "feeAmount"
    | "feeCurrency"
    | "exchangeRate"
    | "note"
    | "status"
    | "date"
  >
>;
