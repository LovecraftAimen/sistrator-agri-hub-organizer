
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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
  Edit, 
  Clock, 
  MapPin, 
  User,
  Tractor,
  Calendar,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Service {
  id: string;
  beneficiario: string;
  tratorista: string;
  tipo: 'Aração' | 'Gradagem' | 'Subsolagem' | 'Plantio Direto';
  area: string;
  status: 'Agendado' | 'Em execução' | 'Concluído' | 'Cancelado' | 'Pausado';
  inicioEstimado: string;
  inicioReal?: string;
  fimEstimado?: string;
  fimReal?: string;
  endereco: string;
  observacoes?: string;
  prioridade: 'Alta' | 'Média' | 'Baixa';
  dataAgendamento: string;
  culturasPrevistas: string[];
  equipamentos: string[];
  horasEstimadas: number;
  horasReais?: number;
  regiao: string;
  vereador?: string;
}

const mockServices: Service[] = [
  {
    id: "001",
    beneficiario: "João Silva Santos",
    tratorista: "Carlos Alberto Santos",
    tipo: "Aração",
    area: "2.5 ha",
    status: "Em execução",
    inicioEstimado: "14:30",
    inicioReal: "14:45",
    endereco: "Sítio Boa Vista, Zona Rural",
    prioridade: "Alta",
    dataAgendamento: "2024-01-15",
    culturasPrevistas: ["Milho", "Feijão"],
    equipamentos: ["Arado de Disco", "Trator Massey Ferguson"],
    horasEstimadas: 3,
    horasReais: 2.5,
    regiao: "Norte",
    vereador: "Maria José",
    observacoes: "Solo úmido, condições favoráveis"
  },
  {
    id: "002",
    beneficiario: "Maria Oliveira Costa",
    tratorista: "José Pereira Lima",
    tipo: "Gradagem",
    area: "1.8 ha",
    status: "Agendado",
    inicioEstimado: "16:00",
    endereco: "Fazenda Santa Clara, Km 15",
    prioridade: "Média",
    dataAgendamento: "2024-01-15",
    culturasPrevistas: ["Soja"],
    equipamentos: ["Grade Aradora", "Trator New Holland"],
    horasEstimadas: 2,
    regiao: "Sul",
    vereador: "João Pedro"
  },
  {
    id: "003",
    beneficiario: "Pedro Costa Almeida",
    tratorista: "Antonio Lima Souza",
    tipo: "Aração",
    area: "3.2 ha",
    status: "Concluído",
    inicioEstimado: "08:00",
    inicioReal: "08:15",
    fimReal: "11:30",
    endereco: "Propriedade Rural, Estrada Velha",
    prioridade: "Baixa",
    dataAgendamento: "2024-01-14",
    culturasPrevistas: ["Milho", "Sorgo"],
    equipamentos: ["Arado de Aiveca", "Trator Valtra"],
    horasEstimadas: 4,
    horasReais: 3.25,
    regiao: "Leste",
    observacoes: "Serviço concluído com sucesso"
  },
  {
    id: "004",
    beneficiario: "Ana Souza Ferreira",
    tratorista: "Carlos Alberto Santos",
    tipo: "Gradagem",
    area: "1.5 ha",
    status: "Pausado",
    inicioEstimado: "15:45",
    inicioReal: "16:00",
    endereco: "Chácara Bom Jesus, Zona Rural",
    prioridade: "Alta",
    dataAgendamento: "2024-01-15",
    culturasPrevistas: ["Feijão"],
    equipamentos: ["Grade Niveladora", "Trator John Deere"],
    horasEstimadas: 2,
    horasReais: 1,
    regiao: "Oeste",
    vereador: "Carlos Mendes",
    observacoes: "Pausado devido à chuva"
  }
];

interface ServicesTableProps {
  onViewService: (service: Service) => void;
  onEditService: (service: Service) => void;
}

export function ServicesTable({ onViewService, onEditService }: ServicesTableProps) {
  const [services] = useState<Service[]>(mockServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

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
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tractor className="w-5 h-5" />
          Serviços Ativos
        </CardTitle>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por beneficiário, tratorista ou serviço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="all">Todos os status</option>
              <option value="Agendado">Agendado</option>
              <option value="Em execução">Em execução</option>
              <option value="Pausado">Pausado</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
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
                <TableHead>Beneficiário</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Tratorista</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Área</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
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
                          {formatDate(service.dataAgendamento)}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{service.tipo}</p>
                      <p className="text-xs text-muted-foreground">
                        {service.horasEstimadas}h estimadas
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
                    <span className="font-medium text-sm">{service.area}</span>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {service.inicioEstimado}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm max-w-32">
                      <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="truncate">{service.endereco}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onViewService(service)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEditService(service)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredServices.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Nenhum serviço encontrado com os filtros aplicados.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
