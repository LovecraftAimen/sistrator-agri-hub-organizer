
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Tractor,
  Plus,
  X
} from "lucide-react";
import type { Service } from "./ServicesTable";

interface ServiceFormProps {
  service?: Service;
  onSubmit: (serviceData: Partial<Service>) => void;
  onCancel: () => void;
}

export function ServiceForm({ service, onSubmit, onCancel }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    beneficiario: service?.beneficiario || "",
    tratorista: service?.tratorista || "",
    tipo: service?.tipo || "Aração",
    area: service?.area || "",
    endereco: service?.endereco || "",
    prioridade: service?.prioridade || "Média",
    dataAgendamento: service?.dataAgendamento || "",
    inicioEstimado: service?.inicioEstimado || "",
    fimEstimado: service?.fimEstimado || "",
    horasEstimadas: service?.horasEstimadas || 0,
    regiao: service?.regiao || "",
    vereador: service?.vereador || "",
    observacoes: service?.observacoes || "",
    culturasPrevistas: service?.culturasPrevistas || [],
    equipamentos: service?.equipamentos || []
  });

  const [newCultura, setNewCultura] = useState("");
  const [newEquipamento, setNewEquipamento] = useState("");

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addCultura = () => {
    if (newCultura.trim() && !formData.culturasPrevistas.includes(newCultura.trim())) {
      setFormData(prev => ({
        ...prev,
        culturasPrevistas: [...prev.culturasPrevistas, newCultura.trim()]
      }));
      setNewCultura("");
    }
  };

  const removeCultura = (cultura: string) => {
    setFormData(prev => ({
      ...prev,
      culturasPrevistas: prev.culturasPrevistas.filter(c => c !== cultura)
    }));
  };

  const addEquipamento = () => {
    if (newEquipamento.trim() && !formData.equipamentos.includes(newEquipamento.trim())) {
      setFormData(prev => ({
        ...prev,
        equipamentos: [...prev.equipamentos, newEquipamento.trim()]
      }));
      setNewEquipamento("");
    }
  };

  const removeEquipamento = (equipamento: string) => {
    setFormData(prev => ({
      ...prev,
      equipamentos: prev.equipamentos.filter(e => e !== equipamento)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tractor className="w-5 h-5" />
          {service ? "Editar Serviço" : "Novo Agendamento de Serviço"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações do Beneficiário */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="beneficiario">Beneficiário</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="beneficiario"
                  value={formData.beneficiario}
                  onChange={(e) => handleInputChange("beneficiario", e.target.value)}
                  placeholder="Nome completo do beneficiário"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tratorista">Tratorista</Label>
              <select
                id="tratorista"
                value={formData.tratorista}
                onChange={(e) => handleInputChange("tratorista", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="">Selecione um tratorista</option>
                <option value="Carlos Alberto Santos">Carlos Alberto Santos</option>
                <option value="José Pereira Lima">José Pereira Lima</option>
                <option value="Antonio Lima Souza">Antonio Lima Souza</option>
                <option value="Pedro Henrique Costa">Pedro Henrique Costa</option>
              </select>
            </div>
          </div>

          {/* Detalhes do Serviço */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Serviço</Label>
              <select
                id="tipo"
                value={formData.tipo}
                onChange={(e) => handleInputChange("tipo", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="Aração">Aração</option>
                <option value="Gradagem">Gradagem</option>
                <option value="Subsolagem">Subsolagem</option>
                <option value="Plantio Direto">Plantio Direto</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Área (hectares)</Label>
              <Input
                id="area"
                value={formData.area}
                onChange={(e) => handleInputChange("area", e.target.value)}
                placeholder="Ex: 2.5 ha"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prioridade">Prioridade</Label>
              <select
                id="prioridade"
                value={formData.prioridade}
                onChange={(e) => handleInputChange("prioridade", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
          </div>

          {/* Localização */}
          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço da Propriedade</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="endereco"
                value={formData.endereco}
                onChange={(e) => handleInputChange("endereco", e.target.value)}
                placeholder="Endereço completo da propriedade rural"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="regiao">Região</Label>
              <select
                id="regiao"
                value={formData.regiao}
                onChange={(e) => handleInputChange("regiao", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="">Selecione a região</option>
                <option value="Norte">Norte</option>
                <option value="Sul">Sul</option>
                <option value="Leste">Leste</option>
                <option value="Oeste">Oeste</option>
                <option value="Centro">Centro</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vereador">Vereador Responsável (Opcional)</Label>
              <Input
                id="vereador"
                value={formData.vereador}
                onChange={(e) => handleInputChange("vereador", e.target.value)}
                placeholder="Nome do vereador"
              />
            </div>
          </div>

          {/* Agendamento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataAgendamento">Data do Agendamento</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="dataAgendamento"
                  type="date"
                  value={formData.dataAgendamento}
                  onChange={(e) => handleInputChange("dataAgendamento", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inicioEstimado">Horário de Início</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="inicioEstimado"
                  type="time"
                  value={formData.inicioEstimado}
                  onChange={(e) => handleInputChange("inicioEstimado", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="horasEstimadas">Horas Estimadas</Label>
              <Input
                id="horasEstimadas"
                type="number"
                min="0.5"
                step="0.5"
                value={formData.horasEstimadas}
                onChange={(e) => handleInputChange("horasEstimadas", parseFloat(e.target.value) || 0)}
                placeholder="Ex: 3"
                required
              />
            </div>
          </div>

          {/* Culturas Previstas */}
          <div className="space-y-3">
            <Label>Culturas Previstas</Label>
            <div className="flex gap-2">
              <Input
                value={newCultura}
                onChange={(e) => setNewCultura(e.target.value)}
                placeholder="Ex: Milho, Soja, Feijão..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCultura())}
              />
              <Button type="button" onClick={addCultura} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.culturasPrevistas.map((cultura, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {cultura}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removeCultura(cultura)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Equipamentos */}
          <div className="space-y-3">
            <Label>Equipamentos Necessários</Label>
            <div className="flex gap-2">
              <Input
                value={newEquipamento}
                onChange={(e) => setNewEquipamento(e.target.value)}
                placeholder="Ex: Arado de Disco, Trator Massey Ferguson..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEquipamento())}
              />
              <Button type="button" onClick={addEquipamento} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.equipamentos.map((equipamento, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {equipamento}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removeEquipamento(equipamento)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange("observacoes", e.target.value)}
              placeholder="Informações adicionais sobre o serviço, condições do solo, etc."
              rows={3}
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              {service ? "Atualizar Serviço" : "Agendar Serviço"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
