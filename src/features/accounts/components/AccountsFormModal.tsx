import { AppFormModal } from "@/components/ui/AppFormModal";
import { Account, CreateAccountInput } from "@/types/finance.types";

import { CreateAccountForm } from "./CreateAccountForm";

type AccountsFormModalProps = {
  visible: boolean;
  editingAccount: Account | null;
  onClose: () => void;
  onSubmit: (input: CreateAccountInput) => void;
};

export function AccountsFormModal({
  visible,
  editingAccount,
  onClose,
  onSubmit,
}: AccountsFormModalProps) {
  return (
    <AppFormModal visible={visible} showHeader={false} onClose={onClose}>
      <CreateAccountForm
        initialAccount={editingAccount ?? undefined}
        submitLabelI18nKey={
          editingAccount ? "accounts.saveChanges" : "accounts.saveAccount"
        }
        onCancel={onClose}
        onSubmit={onSubmit}
      />
    </AppFormModal>
  );
}
