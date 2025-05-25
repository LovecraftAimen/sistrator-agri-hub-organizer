
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UserCheck, UserX, UserMinus } from "lucide-react";

interface StatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  beneficiario: {
    id: number;
    nome: string;
    status: string;
  } | null;
  onStatusChange: (id: number, newStatus: string) => void;
}

export const StatusDialog: React.FC<StatusDialogProps> = ({
  open,
  onOpenChange,
  beneficiario,
  onStatusChange,
}) => {
  const [selectedStatus, setSelectedStatus] = React.useState<string>("");

  React.useEffect(() => {
    if (beneficiario) {
      setSelectedStatus(beneficiario.status);
    }
  }, [beneficiario]);

  const handleConfirm = () => {
    if (beneficiario && selectedStatus) {
      onStatusChange(beneficiario.id, selectedStatus);
      onOpenChange(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Ativo':
        return <UserCheck className="w-4 h-4 text-green-600" />;
      case 'Inativo':
        return <UserX className="w-4 h-4 text-red-600" />;
      case 'Pendente':
        return <UserMinus className="w-4 h-4 text-yellow-600" />;
      default:
        return <UserMinus className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getStatusIcon(selectedStatus)}
            Alterar Status do Beneficiário
          </DialogTitle>
          <DialogDescription>
            Altere o status do beneficiário <strong>{beneficiario?.nome}</strong>.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status">Novo Status</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-green-600" />
                    Ativo
                  </div>
                </SelectItem>
                <SelectItem value="Inativo">
                  <div className="flex items-center gap-2">
                    <UserX className="w-4 h-4 text-red-600" />
                    Inativo
                  </div>
                </SelectItem>
                <SelectItem value="Pendente">
                  <div className="flex items-center gap-2">
                    <UserMinus className="w-4 h-4 text-yellow-600" />
                    Pendente
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedStatus}>
            Confirmar Alteração
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
