
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Eye, 
  Calendar,
  Clock, 
  MapPin, 
  User,
  Tractor
} from "lucide-react";
import type { Service } from "./ServicesTable";

interface ScheduleListProps {
  services: Service[];
  onViewService: (service: Service) => void;
}

export function ScheduleList({ services, onViewService }: ScheduleListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [tratoristaFilter, setTratoristaFilter] = useState<string>("all");
  const [tipoFilter, setTipoFilter] = useState<string>("all");

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

  const filteredServices = services.filter((service) => {
    const matchesSearch = 
      service.beneficiario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.tratorista.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.endereco.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || service.status === statusFilter;
    const matchesTratorist = tratoristaFilter === "all" || service.tratorista === tratoristaFilter;
    const matchesTipo = tipoFilter === "all" || service.tipo === tipoFilter;
    
    return matchesSearch && matchesStatus && matchesTratorist && matchesTipo;
  });

  const uniqueTratoristas = Array.from(new Set(services.map(s => s.tratorista)));
  const uniqueTipos = Array.from(new Set(services.map(s => s.tipo)));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  // Ordenar por data e horário
  const sortedServices = filteredServices.sort((a, b) => {
    const dateA = new Date(a.dataAgendamento + ' ' + a.inicioEstimado);
    const dateB = new Date(b.dataAgendamento + ' ' + b.inicioEstimado);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Lista de Agendamentos
        </CardTitle>
        
        <div className="flex flex-col gap-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por beneficiário, tratorista ou endereço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="all">Todos os status</option>
              <option value="Agendado">Agendado</option>
              <option value="Em execução">Em execução</option>
              <option value="Pausado">Pausado</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </select>

            <select
              value={tratoristaFilter}
              onChange={(e) => setTratoristaFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="all">Todos os tratoristas</option>
              {uniqueTratoristas.map(tratorista => (
                <option key={tratorista} value={tratorista}>{tratorista}</option>
              ))}
            </select>

            <select
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="all">Todos os tipos</option>
              {uniqueTipos.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
            
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Beneficiário</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Tratorista</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">
                        {formatDate(service.dataAgendamento)}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatTime(service.inicioEstimado)}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {service.beneficiario.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{service.beneficiario}</p>
                        <p className="text-xs text-muted-foreground">
                          Região {service.regiao}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{service.tipo}</p>
                      <p className="text-xs text-muted-foreground">
                        {service.area} • {service.horasEstimadas}h
                      </p>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{service.tratorista}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="outline" className={getPriorityColor(service.prioridade)}>
                      {service.prioridade}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm max-w-32">
                      <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="truncate">{service.endereco}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewService(service)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {sortedServices.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Nenhum agendamento encontrado com os filtros aplicados.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
