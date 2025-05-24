
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  MapPin, 
  Clock, 
  Calendar, 
  Tractor,
  Wheat,
  Tool,
  AlertCircle,
  CheckCircle2,
  Timer
} from "lucide-react";
import type { Service } from "./ServicesTable";

interface ServiceDetailsProps {
  service: Service;
}

export function ServiceDetails({ service }: ServiceDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em execução":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Agendado":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "Concluído":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Cancelado":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "Pausado":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "Média":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "Baixa":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  return (
    <div className="space-y-6">
      {/* Header com informações principais */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Tractor className="w-5 h-5" />
              Detalhes do Serviço #{service.id}
            </CardTitle>
            <div className="flex gap-2">
              <Badge className={getStatusColor(service.status)}>
                {service.status}
              </Badge>
              <Badge variant="outline" className={getPriorityColor(service.prioridade)}>
                {service.prioridade}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {service.beneficiario.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{service.beneficiario}</p>
                  <p className="text-sm text-muted-foreground">Beneficiário</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{service.tratorista}</p>
                  <p className="text-sm text-muted-foreground">Tratorista Responsável</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{service.endereco}</p>
                  <p className="text-sm text-muted-foreground">
                    Região {service.regiao}
                    {service.vereador && ` • Vereador: ${service.vereador}`}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tipo de Serviço</p>
                  <p className="font-medium">{service.tipo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Área</p>
                  <p className="font-medium">{service.area}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Data Agendamento</p>
                  <p className="font-medium flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(service.dataAgendamento)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Horário Estimado</p>
                  <p className="font-medium flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatTime(service.inicioEstimado)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cronograma de Execução */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="w-5 h-5" />
              Cronograma de Execução
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Início Estimado</span>
                </div>
                <span className="font-medium">{service.inicioEstimado}</span>
              </div>

              {service.inicioReal && (
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Início Real</span>
                  </div>
                  <span className="font-medium">{service.inicioReal}</span>
                </div>
              )}

              {service.fimEstimado && (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Fim Estimado</span>
                  </div>
                  <span className="font-medium">{service.fimEstimado}</span>
                </div>
              )}

              {service.fimReal && (
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Fim Real</span>
                  </div>
                  <span className="font-medium">{service.fimReal}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Horas Estimadas</p>
                  <p className="font-medium">{service.horasEstimadas}h</p>
                </div>
                {service.horasReais && (
                  <div>
                    <p className="text-sm text-muted-foreground">Horas Reais</p>
                    <p className="font-medium">{service.horasReais}h</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detalhes Técnicos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tool className="w-5 h-5" />
              Detalhes Técnicos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wheat className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium">Culturas Previstas</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {service.culturasPrevistas.map((cultura, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {cultura}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tractor className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium">Equipamentos</p>
              </div>
              <div className="space-y-1">
                {service.equipamentos.map((equipamento, index) => (
                  <p key={index} className="text-sm text-muted-foreground">
                    • {equipamento}
                  </p>
                ))}
              </div>
            </div>

            {service.observacoes && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Observações</p>
                </div>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                  {service.observacoes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
