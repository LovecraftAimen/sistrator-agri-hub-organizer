
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScheduleCalendar } from "@/components/ScheduleCalendar";
import { ScheduleList } from "@/components/ScheduleList";
import { ScheduleStats } from "@/components/ScheduleStats";
import { ServiceDetails } from "@/components/ServiceDetails";
import { ServiceForm } from "@/components/ServiceForm";
import { AdvancedFilters } from "@/components/AdvancedFilters";
import { type Service } from "@/components/ServicesTable";
import { 
  Calendar, 
  List, 
  BarChart3,
  Plus,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock de dados dos serviços (usando os mesmos dados do ServicesTable)
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
  },
  {
    id: "005",
    beneficiario: "Roberto Ferreira Lima",
    tratorista: "José Pereira Lima",
    tipo: "Subsolagem",
    area: "4.0 ha",
    status: "Agendado",
    inicioEstimado: "07:00",
    endereco: "Fazenda Esperança, Zona Rural",
    prioridade: "Alta",
    dataAgendamento: "2024-01-16",
    culturasPrevistas: ["Milho"],
    equipamentos: ["Subsolador", "Trator Case"],
    horasEstimadas: 5,
    regiao: "Norte",
    vereador: "Maria José"
  },
  {
    id: "006",
    beneficiario: "Luiza Santos Oliveira",
    tratorista: "Antonio Lima Souza",
    tipo: "Plantio Direto",
    area: "2.0 ha",
    status: "Agendado",
    inicioEstimado: "09:30",
    endereco: "Sítio São José, Estrada do Campo",
    prioridade: "Média",
    dataAgendamento: "2024-01-17",
    culturasPrevistas: ["Soja", "Milho"],
    equipamentos: ["Plantadeira", "Trator John Deere"],
    horasEstimadas: 3,
    regiao: "Sul",
    observacoes: "Terreno preparado"
  }
];

const Agendamentos = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const filterOptions = [
    {
      key: "beneficiario",
      label: "Beneficiário",
      type: "text" as const,
    },
    {
      key: "tratorista",
      label: "Tratorista",
      type: "select" as const,
      options: [
        { value: "Carlos Alberto Santos", label: "Carlos Alberto Santos" },
        { value: "José Pereira Lima", label: "José Pereira Lima" },
        { value: "Antonio Lima Souza", label: "Antonio Lima Souza" },
      ],
    },
    {
      key: "tipo",
      label: "Tipo de Serviço",
      type: "select" as const,
      options: [
        { value: "Aração", label: "Aração" },
        { value: "Gradagem", label: "Gradagem" },
        { value: "Subsolagem", label: "Subsolagem" },
        { value: "Plantio Direto", label: "Plantio Direto" },
      ],
    },
    {
      key: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { value: "Agendado", label: "Agendado" },
        { value: "Em execução", label: "Em execução" },
        { value: "Pausado", label: "Pausado" },
        { value: "Concluído", label: "Concluído" },
        { value: "Cancelado", label: "Cancelado" },
      ],
    },
    {
      key: "regiao",
      label: "Região",
      type: "select" as const,
      options: [
        { value: "Norte", label: "Norte" },
        { value: "Sul", label: "Sul" },
        { value: "Leste", label: "Leste" },
        { value: "Oeste", label: "Oeste" },
      ],
    },
    {
      key: "prioridade",
      label: "Prioridade",
      type: "select" as const,
      options: [
        { value: "Alta", label: "Alta" },
        { value: "Média", label: "Média" },
        { value: "Baixa", label: "Baixa" },
      ],
    },
    {
      key: "dataAgendamento",
      label: "Data de Agendamento",
      type: "date" as const,
    },
  ];

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const handleCloseDetails = () => {
    setSelectedService(null);
  };

  const handleNewService = () => {
    setShowNewServiceForm(true);
  };

  const handleSubmitService = (serviceData: Partial<Service>) => {
    console.log('New service scheduled:', serviceData);
    toast({
      title: "Serviço agendado",
      description: "O novo agendamento foi criado com sucesso.",
    });
    setShowNewServiceForm(false);
  };

  const handleCancelForm = () => {
    setShowNewServiceForm(false);
  };

  const handleFiltersChange = (filters: Record<string, any>) => {
    setActiveFilters(filters);
  };

  // Filter services based on active filters
  const filteredServices = mockServices.filter((service) => {
    return Object.entries(activeFilters).every(([key, value]) => {
      if (!value) return true;
      
      switch (key) {
        case "beneficiario":
          return service.beneficiario.toLowerCase().includes(value.toLowerCase());
        case "tratorista":
          return service.tratorista === value;
        case "tipo":
          return service.tipo === value;
        case "status":
          return service.status === value;
        case "regiao":
          return service.regiao === value;
        case "prioridade":
          return service.prioridade === value;
        case "dataAgendamento":
          return service.dataAgendamento === value;
        default:
          return true;
      }
    });
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-foreground">
                  Agendamentos
                </h1>
                <p className="text-sm text-muted-foreground">
                  Programação e cronograma de serviços
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
                <Button onClick={handleNewService} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Agendamento
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-6">
              <AdvancedFilters
                filters={filterOptions}
                onFiltersChange={handleFiltersChange}
                activeFilters={activeFilters}
              />
              
              <Tabs defaultValue="calendar" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="calendar" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Calendário
                  </TabsTrigger>
                  <TabsTrigger value="list" className="flex items-center gap-2">
                    <List className="w-4 h-4" />
                    Lista
                  </TabsTrigger>
                  <TabsTrigger value="stats" className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Estatísticas
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="calendar">
                  <ScheduleCalendar
                    services={filteredServices}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                    onServiceClick={handleServiceClick}
                  />
                </TabsContent>

                <TabsContent value="list">
                  <ScheduleList
                    services={filteredServices}
                    onViewService={handleServiceClick}
                  />
                </TabsContent>

                <TabsContent value="stats">
                  <ScheduleStats services={filteredServices} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>

        {/* Modal para visualizar detalhes do serviço */}
        <Dialog open={!!selectedService} onOpenChange={handleCloseDetails}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalhes do Agendamento</DialogTitle>
            </DialogHeader>
            {selectedService && (
              <ServiceDetails service={selectedService} />
            )}
          </DialogContent>
        </Dialog>

        {/* Modal para criar novo agendamento */}
        <Dialog open={showNewServiceForm} onOpenChange={handleCancelForm}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Novo Agendamento</DialogTitle>
            </DialogHeader>
            <ServiceForm
              onSubmit={handleSubmitService}
              onCancel={handleCancelForm}
            />
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
};

export default Agendamentos;
