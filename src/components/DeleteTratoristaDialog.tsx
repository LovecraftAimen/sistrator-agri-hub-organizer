
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
import { Input } from "@/components/ui/input";
import { Trash2, AlertTriangle } from "lucide-react";
import type { Tratorista } from "@/pages/Tratoristas";

interface DeleteTratoristaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tratorista: Tratorista | null;
  onConfirmDelete: (id: string) => void;
}

export const DeleteTratoristaDialog: React.FC<DeleteTratoristaDialogProps> = ({
  open,
  onOpenChange,
  tratorista,
  onConfirmDelete,
}) => {
  const [nameInput, setNameInput] = useState("");

  React.useEffect(() => {
    if (open) {
      setNameInput("");
    }
  }, [open]);

  const handleConfirm = () => {
    if (tratorista && nameInput === tratorista.nome) {
      onConfirmDelete(tratorista.id);
      onOpenChange(false);
    }
  };

  const isNameValid = nameInput === tratorista?.nome;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="w-5 h-5" />
            Confirmar Exclusão
          </DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. O tratorista será permanentemente removido do sistema.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-900">Atenção!</h4>
                <p className="text-sm text-red-700 mt-1">
                  Você está prestes a excluir o tratorista <strong>{tratorista?.nome}</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name-confirmation">
              Para confirmar, digite o nome completo do tratorista:
            </Label>
            <Input
              id="name-confirmation"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Digite o nome completo"
            />
            {nameInput && !isNameValid && (
              <p className="text-sm text-red-600">
                Nome não confere. Verifique e tente novamente.
              </p>
            )}
            {isNameValid && (
              <p className="text-sm text-green-600">
                ✓ Nome confirmado
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
            disabled={!isNameValid}
            className="bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Excluir Tratorista
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
