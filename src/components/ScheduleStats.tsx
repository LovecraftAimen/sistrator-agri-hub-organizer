
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Users
} from "lucide-react";
import type { Service } from "./ServicesTable";

interface ScheduleStatsProps {
  services: Service[];
}

export function ScheduleStats({ services }: ScheduleStatsProps) {
  // Estatísticas gerais
  const totalAgendamentos = services.length;
  const agendadosHoje = services.filter(s => {
    const hoje = new Date().toDateString();
    const serviceDate = new Date(s.dataAgendamento).toDateString();
    return serviceDate === hoje;
  }).length;

  const statusCount = services.reduce((acc, service) => {
    acc[service.status] = (acc[service.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const prioridadeCount = services.reduce((acc, service) => {
    acc[service.prioridade] = (acc[service.prioridade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Próximos agendamentos (próximos 7 dias)
  const hoje = new Date();
  const proximosSete = new Date();
  proximosSete.setDate(hoje.getDate() + 7);

  const proximosAgendamentos = services.filter(s => {
    const serviceDate = new Date(s.dataAgendamento);
    return serviceDate >= hoje && serviceDate <= proximosSete && s.status === 'Agendado';
  }).length;

  // Tratoristas mais ativos
  const tratoristaCount = services.reduce((acc, service) => {
    acc[service.tratorista] = (acc[service.tratorista] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topTratorist = Object.entries(tratoristaCount).sort(([,a], [,b]) => b - a)[0];

  const stats = [
    {
      title: "Total de Agendamentos",
      value: totalAgendamentos,
      icon: Calendar,
      description: "Agendamentos no sistema",
      color: "text-blue-600"
    },
    {
      title: "Agendados Hoje",
      value: agendadosHoje,
      icon: Clock,
      description: "Serviços programados para hoje",
      color: "text-green-600"
    },
    {
      title: "Próximos 7 Dias",
      value: proximosAgendamentos,
      icon: TrendingUp,
      description: "Agendamentos pendentes",
      color: "text-orange-600"
    },
    {
      title: "Tratorista Mais Ativo",
      value: topTratorist ? topTratorist[1] : 0,
      icon: Users,
      description: topTratorist ? topTratorist[0] : "Nenhum",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Cards de estatísticas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detalhamento por status e prioridade */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Status dos Agendamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(statusCount).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline"
                      className={
                        status === "Em execução" ? "bg-blue-100 text-blue-800" :
                        status === "Agendado" ? "bg-yellow-100 text-yellow-800" :
                        status === "Concluído" ? "bg-green-100 text-green-800" :
                        status === "Cancelado" ? "bg-red-100 text-red-800" :
                        status === "Pausado" ? "bg-orange-100 text-orange-800" :
                        "bg-gray-100 text-gray-800"
                      }
                    >
                      {status}
                    </Badge>
                  </div>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Prioridade dos Agendamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(prioridadeCount).map(([prioridade, count]) => (
                <div key={prioridade} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline"
                      className={
                        prioridade === "Alta" ? "bg-red-100 text-red-800" :
                        prioridade === "Média" ? "bg-yellow-100 text-yellow-800" :
                        prioridade === "Baixa" ? "bg-green-100 text-green-800" :
                        "bg-gray-100 text-gray-800"
                      }
                    >
                      {prioridade}
                    </Badge>
                  </div>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
