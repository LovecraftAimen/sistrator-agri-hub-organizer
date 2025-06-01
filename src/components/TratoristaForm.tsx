
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { TratoristaData } from "@/hooks/useTratoristasData";

interface TratoristaFormProps {
  tratorista?: TratoristaData | null;
  onSubmit: (data: Omit<TratoristaData, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
}

export const TratoristaForm = ({ tratorista, onSubmit, onCancel }: TratoristaFormProps) => {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    endereco: "",
    cnh: "",
    validade_cnh: "",
    experiencia: "",
    especialidades: [] as string[],
    disponibilidade: "",
    observacoes: "",
    status: "ativo" as 'ativo' | 'inativo' | 'licenca',
    data_cadastro: new Date().toISOString().split('T')[0],
    horas_trabalhadas: 0
  });

  const [novaEspecialidade, setNovaEspecialidade] = useState("");

  useEffect(() => {
    if (tratorista) {
      setFormData({
        nome: tratorista.nome,
        cpf: tratorista.cpf,
        telefone: tratorista.telefone || "",
        endereco: tratorista.endereco || "",
        cnh: tratorista.cnh,
        validade_cnh: tratorista.validade_cnh,
        experiencia: tratorista.experiencia || "",
        especialidades: tratorista.especialidades || [],
        disponibilidade: tratorista.disponibilidade || "",
        observacoes: tratorista.observacoes || "",
        status: tratorista.status,
        data_cadastro: tratorista.data_cadastro,
        horas_trabalhadas: tratorista.horas_trabalhadas
      });
    }
  }, [tratorista]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const adicionarEspecialidade = () => {
    if (novaEspecialidade.trim() && !formData.especialidades.includes(novaEspecialidade.trim())) {
      setFormData(prev => ({
        ...prev,
        especialidades: [...prev.especialidades, novaEspecialidade.trim()]
      }));
      setNovaEspecialidade("");
    }
  };

  const removerEspecialidade = (especialidade: string) => {
    setFormData(prev => ({
      ...prev,
      especialidades: prev.especialidades.filter(e => e !== especialidade)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => handleInputChange("nome", e.target.value)}
              placeholder="Digite o nome completo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf">CPF *</Label>
            <Input
              id="cpf"
              value={formData.cpf}
              onChange={(e) => handleInputChange("cpf", formatCPF(e.target.value))}
              placeholder="000.000.000-00"
              maxLength={14}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone *</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={(e) => handleInputChange("telefone", formatPhone(e.target.value))}
              placeholder="(00) 00000-0000"
              maxLength={15}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço *</Label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) => handleInputChange("endereco", e.target.value)}
              placeholder="Rua, número, bairro"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documentação e Habilitação</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cnh">Número da CNH *</Label>
            <Input
              id="cnh"
              value={formData.cnh}
              onChange={(e) => handleInputChange("cnh", e.target.value)}
              placeholder="Digite o número da CNH"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="validade_cnh">Validade da CNH *</Label>
            <Input
              id="validade_cnh"
              type="date"
              value={formData.validade_cnh}
              onChange={(e) => handleInputChange("validade_cnh", e.target.value)}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Experiência Profissional</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="experiencia">Tempo de Experiência *</Label>
            <Input
              id="experiencia"
              value={formData.experiencia}
              onChange={(e) => handleInputChange("experiencia", e.target.value)}
              placeholder="Ex: 5 anos, 2 anos e 6 meses"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Especialidades</Label>
            <div className="flex gap-2">
              <Input
                value={novaEspecialidade}
                onChange={(e) => setNovaEspecialidade(e.target.value)}
                placeholder="Ex: Aração, Gradagem, Plantio"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarEspecialidade())}
              />
              <Button type="button" onClick={adicionarEspecialidade}>
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.especialidades.map((especialidade, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {especialidade}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removerEspecialidade(especialidade)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="disponibilidade">Disponibilidade *</Label>
            <Input
              id="disponibilidade"
              value={formData.disponibilidade}
              onChange={(e) => handleInputChange("disponibilidade", e.target.value)}
              placeholder="Ex: Segunda a Sexta - 7h às 17h"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações Adicionais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="w-full p-2 border border-input rounded-md bg-background"
              required
            >
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
              <option value="licenca">Em Licença</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange("observacoes", e.target.value)}
              placeholder="Observações adicionais sobre o tratorista..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {tratorista ? "Atualizar" : "Cadastrar"} Tratorista
        </Button>
      </div>
    </form>
  );
};
