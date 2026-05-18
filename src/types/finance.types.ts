export type CurrencyCode =
  | "USD"
  | "EUR"
  | "BTC"
  | "ETH"
  | "USDT"
  | "SOL"
  | "BNB"
  | "CUSTOM";

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
  createdAt: string;
  updatedAt: string;
};

export type CreateAccountInput = {
  name: string;
  type: AccountType;
  mainCurrency: CurrencyCode;
  initialBalance: number;
  includeInTotalBalance: boolean;
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
  >
>;

export type Currency = {
  code: CurrencyCode;
  name: string;
  symbol: string;
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
  type: CategoryType;
  icon: string;
  color: string;
};

export type Tag = {
  id: string;
  name: string;
  color: string;
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
    | "date"
  >
>;
