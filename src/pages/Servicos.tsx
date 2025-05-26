
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ServicesTable, type Service } from "@/components/ServicesTable";
import { ServiceDetails } from "@/components/ServiceDetails";
import { ServiceForm } from "@/components/ServiceForm";
import { PDFExportButton } from "@/components/PDFExportButton";
import { Plus, Calendar, Activity, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Servicos = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleViewService = (service: Service) => {
    setSelectedService(service);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setShowNewServiceForm(true);
  };

  const handleNewService = () => {
    setEditingService(null);
    setShowNewServiceForm(true);
  };

  const handleSubmitService = (serviceData: Partial<Service>) => {
    console.log('Service data submitted:', serviceData);
    
    if (editingService) {
      toast({
        title: "Serviço atualizado",
        description: "O serviço foi atualizado com sucesso.",
      });
    } else {
      toast({
        title: "Serviço agendado",
        description: "O novo serviço foi agendado com sucesso.",
      });
    }
    
    setShowNewServiceForm(false);
    setEditingService(null);
  };

  const handleCancelForm = () => {
    setShowNewServiceForm(false);
    setEditingService(null);
  };

  const handleCloseDetails = () => {
    setSelectedService(null);
  };

  const handleGoToAgenda = () => {
    navigate('/agendamentos');
    toast({
      title: "Navegando para Agendamentos",
      description: "Redirecionando para a página de agendamentos...",
    });
  };

  const handleGoToRelatorios = () => {
    navigate('/relatorios');
    toast({
      title: "Navegando para Relatórios",
      description: "Redirecionando para a página de relatórios...",
    });
  };

  // Mock data para PDF
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
      beneficiario: "Maria Santos Oliveira",
      tratorista: "José Carlos Silva",
      tipo: "Gradagem",
      area: "1.8 ha",
      status: "Agendado",
      inicioEstimado: "08:00",
      inicioReal: null,
      endereco: "Fazenda Santa Clara",
      prioridade: "Média",
      dataAgendamento: "2024-01-16",
      culturasPrevistas: ["Soja"],
      equipamentos: ["Grade Aradora", "Trator John Deere"],
      horasEstimadas: 2,
      horasReais: null,
      regiao: "Sul",
      vereador: "João Pedro",
      observacoes: "Verificar umidade do solo"
    }
  ];

  const pdfSections = [
    {
      title: "Serviços Ativos",
      data: mockServices,
      columns: ["id", "beneficiario", "tratorista", "tipo", "area", "status", "prioridade", "regiao"],
      headers: ["ID", "Beneficiário", "Tratorista", "Tipo", "Área", "Status", "Prioridade", "Região"]
    },
    {
      title: "Resumo por Status",
      data: [
        { status: "Em execução", quantidade: 1 },
        { status: "Agendado", quantidade: 1 },
        { status: "Concluído", quantidade: 0 },
        { status: "Pausado", quantidade: 0 }
      ],
      columns: ["status", "quantidade"],
      headers: ["Status", "Quantidade"]
    },
    {
      title: "Resumo por Região",
      data: [
        { regiao: "Norte", servicos: 1 },
        { regiao: "Sul", servicos: 1 },
        { regiao: "Leste", servicos: 0 },
        { regiao: "Oeste", servicos: 0 }
      ],
      columns: ["regiao", "servicos"],
      headers: ["Região", "Número de Serviços"]
    }
  ];

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
                  Serviços Ativos
                </h1>
                <p className="text-sm text-muted-foreground">
                  Gerenciamento dos serviços de mecanização agrícola
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleGoToAgenda}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Agenda
                </Button>
                <Button variant="outline" size="sm" onClick={handleGoToRelatorios}>
                  <Activity className="w-4 h-4 mr-2" />
                  Relatórios
                </Button>
                <PDFExportButton
                  title="Relatório de Serviços Ativos"
                  sections={pdfSections}
                  filename="servicos-ativos"
                  variant="outline"
                  size="sm"
                />
                <Button onClick={handleNewService} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Serviço
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-6 space-y-6">
            {/* Integrated Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar beneficiário..."
                  value={filters.beneficiario || ""}
                  onChange={(e) => setFilters(prev => ({ ...prev, beneficiario: e.target.value }))}
                  className="pl-10"
                />
              </div>
              
              <Select
                value={filters.status || ""}
                onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os status</SelectItem>
                  <SelectItem value="Agendado">Agendado</SelectItem>
                  <SelectItem value="Em execução">Em execução</SelectItem>
                  <SelectItem value="Pausado">Pausado</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.tipo || ""}
                onValueChange={(value) => setFilters(prev => ({ ...prev, tipo: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os tipos</SelectItem>
                  <SelectItem value="Aração">Aração</SelectItem>
                  <SelectItem value="Gradagem">Gradagem</SelectItem>
                  <SelectItem value="Subsolagem">Subsolagem</SelectItem>
                  <SelectItem value="Plantio Direto">Plantio Direto</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.regiao || ""}
                onValueChange={(value) => setFilters(prev => ({ ...prev, regiao: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Região" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as regiões</SelectItem>
                  <SelectItem value="Norte">Norte</SelectItem>
                  <SelectItem value="Sul">Sul</SelectItem>
                  <SelectItem value="Leste">Leste</SelectItem>
                  <SelectItem value="Oeste">Oeste</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <ServicesTable 
              onViewService={handleViewService}
              onEditService={handleEditService}
              filters={filters}
            />
          </div>
        </main>

        {/* Modal para visualizar detalhes do serviço */}
        <Dialog open={!!selectedService} onOpenChange={handleCloseDetails}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalhes do Serviço</DialogTitle>
            </DialogHeader>
            {selectedService && (
              <ServiceDetails service={selectedService} />
            )}
          </DialogContent>
        </Dialog>

        {/* Modal para criar/editar serviço */}
        <Dialog open={showNewServiceForm} onOpenChange={handleCancelForm}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingService ? "Editar Serviço" : "Novo Agendamento"}
              </DialogTitle>
            </DialogHeader>
            <ServiceForm
              service={editingService || undefined}
              onSubmit={handleSubmitService}
              onCancel={handleCancelForm}
            />
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
};

export default Servicos;
