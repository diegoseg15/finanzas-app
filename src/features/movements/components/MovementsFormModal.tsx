import { AppFormModal } from "@/components/ui/AppFormModal";
import { CreateMovementForm } from "@/features/movements/components/CreateMovementForm";
import { MovementCalculatorForm } from "@/features/movements/components/MovementCalculatorForm";
import { MovementFormMode } from "@/features/movements/components/MovementTypeSelector";
import { CreateTransferForm } from "@/features/transfers/components/CreateTransferForm";
import {
  Account,
  CreateMovementInput,
  CreateTransferInput,
  Movement,
  Transfer,
} from "@/types/finance.types";

import { CreationMode } from "../hooks/useMovementsScreen";

type MovementsFormModalProps = {
  visible: boolean;
  hasActiveAccounts: boolean;
  canCreateMoreMovements: boolean;
  canCreateTransfer: boolean;
  creationMode: CreationMode;
  activeAccounts: Account[];
  mainCurrency: Account["mainCurrency"];
  editingMovement: Movement | null;
  editingTransfer: Transfer | null;
  onClose: () => void;
  onSubmitMovement: (input: CreateMovementInput) => void;
  onEditMovement: (movementId: string, input: CreateMovementInput) => void;
  onSubmitTransfer: (input: CreateTransferInput) => void;
  onEditTransfer: (transferId: string, input: CreateTransferInput) => void;
};

export function MovementsFormModal({
  visible,
  hasActiveAccounts,
  canCreateMoreMovements,
  creationMode,
  activeAccounts,
  mainCurrency,
  editingMovement,
  editingTransfer,
  onClose,
  onSubmitMovement,
  onEditMovement,
  onSubmitTransfer,
  onEditTransfer,
  canCreateTransfer,
}: MovementsFormModalProps) {
  return (
    <AppFormModal
      visible={visible && hasActiveAccounts && canCreateMoreMovements}
      showHeader={false}
      onClose={onClose}
    >
      {editingMovement ? (
        <CreateMovementForm
          accounts={activeAccounts}
          initialMovement={{
            kind: editingMovement.kind,
            amount: editingMovement.amount,
            accountId: editingMovement.accountId,
            categoryId: editingMovement.categoryId,
            tagIds: editingMovement.tagIds,
            note: editingMovement.note,
          }}
          submitLabelI18nKey="accounts.saveChanges"
          onCancel={onClose}
          onSubmit={(input) => onEditMovement(editingMovement.id, input)}
        />
      ) : editingTransfer ? (
        <CreateTransferForm
          accounts={activeAccounts}
          initialTransfer={editingTransfer}
          submitLabelI18nKey="accounts.saveChanges"
          onCancel={onClose}
          onSubmit={(input) => onEditTransfer(editingTransfer.id, input)}
        />
      ) : (
        <MovementCalculatorForm
          currency={mainCurrency}
          accounts={activeAccounts}
          canCreateTransfer={canCreateTransfer}
          initialMode={
            creationMode === "transfer"
              ? "transfer"
              : ("expense" as MovementFormMode)
          }
          onCancel={onClose}
          onSubmitMovement={onSubmitMovement}
          onSubmitTransfer={onSubmitTransfer}
        />
      )}
    </AppFormModal>
  );
}
