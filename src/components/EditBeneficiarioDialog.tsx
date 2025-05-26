
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Save } from "lucide-react";
import { CPFInput } from "./CPFInput";

interface EditBeneficiarioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  beneficiario: {
    id: number;
    nome: string;
    apelido: string;
    cpf: string;
    telefone: string;
    endereco: string;
    propriedade: string;
    tamanho: string;
    culturas: string;
    status: string;
    municipio: string;
  } | null;
  onUpdateBeneficiario: (id: number, updatedData: any) => void;
}

export const EditBeneficiarioDialog: React.FC<EditBeneficiarioDialogProps> = ({
  open,
  onOpenChange,
  beneficiario,
  onUpdateBeneficiario,
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    apelido: '',
    cpf: '',
    telefone: '',
    endereco: '',
    propriedade: '',
    tamanho: '',
    culturas: '',
    status: '',
    municipio: '',
  });

  useEffect(() => {
    if (beneficiario) {
      setFormData({
        nome: beneficiario.nome,
        apelido: beneficiario.apelido,
        cpf: beneficiario.cpf,
        telefone: beneficiario.telefone,
        endereco: beneficiario.endereco,
        propriedade: beneficiario.propriedade,
        tamanho: beneficiario.tamanho,
        culturas: beneficiario.culturas,
        status: beneficiario.status,
        municipio: beneficiario.municipio,
      });
    }
  }, [beneficiario]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (beneficiario) {
      onUpdateBeneficiario(beneficiario.id, formData);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Editar Beneficiário
          </DialogTitle>
          <DialogDescription>
            Edite as informações do beneficiário <strong>{beneficiario?.nome}</strong>.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apelido">Apelido</Label>
              <Input
                id="apelido"
                value={formData.apelido}
                onChange={(e) => handleInputChange('apelido', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <CPFInput
                value={formData.cpf}
                onChange={(value) => handleInputChange('cpf', value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço Residencial</Label>
              <Input
                id="endereco"
                value={formData.endereco}
                onChange={(e) => handleInputChange('endereco', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="municipio">Município</Label>
              <Input
                id="municipio"
                value={formData.municipio}
                onChange={(e) => handleInputChange('municipio', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="propriedade">Endereço da Propriedade Rural</Label>
            <Input
              id="propriedade"
              value={formData.propriedade}
              onChange={(e) => handleInputChange('propriedade', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tamanho">Tamanho da Propriedade</Label>
            <Input
              id="tamanho"
              value={formData.tamanho}
              onChange={(e) => handleInputChange('tamanho', e.target.value)}
              placeholder="Ex: 10 hectares"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="culturas">Culturas Previstas para Plantio</Label>
            <Textarea
              id="culturas"
              value={formData.culturas}
              onChange={(e) => handleInputChange('culturas', e.target.value)}
              placeholder="Ex: Milho, Soja, Feijão..."
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
