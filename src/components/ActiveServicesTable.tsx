
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const activeServices = [
  {
    id: "001",
    beneficiario: "João Silva",
    tratorista: "Carlos Santos",
    tipo: "Aração",
    area: "2.5 ha",
    status: "Em execução",
    inicioEstimado: "14:30"
  },
  {
    id: "002",
    beneficiario: "Maria Oliveira",
    tratorista: "José Pereira",
    tipo: "Gradagem",
    area: "1.8 ha",
    status: "Agendado",
    inicioEstimado: "16:00"
  },
  {
    id: "003",
    beneficiario: "Pedro Costa",
    tratorista: "Antonio Lima",
    tipo: "Aração",
    area: "3.2 ha",
    status: "Concluído",
    inicioEstimado: "08:00"
  },
  {
    id: "004",
    beneficiario: "Ana Souza",
    tratorista: "Carlos Santos",
    tipo: "Gradagem",
    area: "1.5 ha",
    status: "Em execução",
    inicioEstimado: "15:45"
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case "Em execução":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "Agendado":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "Concluído":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}

export function ActiveServicesTable() {
  return (
    <Card className="col-span-2 card-hover">
      <CardHeader>
        <CardTitle>Serviços do Dia</CardTitle>
        <CardDescription>
          Monitoramento em tempo real dos serviços programados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeServices.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {service.beneficiario.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{service.beneficiario}</p>
                  <p className="text-sm text-muted-foreground">
                    Tratorista: {service.tratorista}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium text-foreground">{service.tipo}</p>
                  <p className="text-sm text-muted-foreground">{service.area}</p>
                </div>
                
                <div className="text-right">
                  <Badge className={getStatusColor(service.status)}>
                    {service.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {service.inicioEstimado}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
