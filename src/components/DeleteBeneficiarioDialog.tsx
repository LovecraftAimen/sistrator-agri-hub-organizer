
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2, AlertTriangle } from "lucide-react";
import { CPFInput } from "./CPFInput";

interface DeleteBeneficiarioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  beneficiario: {
    id: number;
    nome: string;
    cpf: string;
  } | null;
  onConfirmDelete: (id: number) => void;
}

export const DeleteBeneficiarioDialog: React.FC<DeleteBeneficiarioDialogProps> = ({
  open,
  onOpenChange,
  beneficiario,
  onConfirmDelete,
}) => {
  const [cpfInput, setCpfInput] = useState("");

  React.useEffect(() => {
    if (open) {
      setCpfInput("");
    }
  }, [open]);

  const handleConfirm = () => {
    if (beneficiario && cpfInput === beneficiario.cpf) {
      onConfirmDelete(beneficiario.id);
      onOpenChange(false);
    }
  };

  const isCPFValid = cpfInput === beneficiario?.cpf;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="w-5 h-5" />
            Confirmar Exclusão
          </DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. O beneficiário será permanentemente removido do sistema.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-900">Atenção!</h4>
                <p className="text-sm text-red-700 mt-1">
                  Você está prestes a excluir o beneficiário <strong>{beneficiario?.nome}</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf-confirmation">
              Para confirmar, digite o CPF do beneficiário:
            </Label>
            <CPFInput
              value={cpfInput}
              onChange={setCpfInput}
              placeholder="000.000.000-00"
            />
            {cpfInput && !isCPFValid && (
              <p className="text-sm text-red-600">
                CPF não confere. Verifique e tente novamente.
              </p>
            )}
            {isCPFValid && (
              <p className="text-sm text-green-600">
                ✓ CPF confirmado
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleConfirm} 
            disabled={!isCPFValid}
            className="bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Excluir Beneficiário
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
