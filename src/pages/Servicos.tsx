
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ServicesTable, type Service } from "@/components/ServicesTable";
import { ServiceDetails } from "@/components/ServiceDetails";
import { ServiceForm } from "@/components/ServiceForm";
import { AdvancedFilters } from "@/components/AdvancedFilters";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Plus, Calendar, Activity, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePDFExport } from "@/hooks/usePDFExport";

const Servicos = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { exportToPDF, isExporting } = usePDFExport();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const filterOptions = [
    {
      key: "beneficiario",
      label: "Beneficiário",
      type: "text" as const,
    },
    {
      key: "tratorista",
      label: "Tratorista",
      type: "text" as const,
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
      key: "dataAgendamento",
      label: "Data de Agendamento",
      type: "date" as const,
    },
  ];

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
      title: "Redirecionando",
      description: "Abrindo página de agendamentos...",
    });
  };

  const handleGoToRelatorios = () => {
    navigate('/relatorios');
    toast({
      title: "Redirecionando",
      description: "Abrindo página de relatórios...",
    });
  };

  const handleExportPDF = async () => {
    try {
      // Mock data - em produção seria obtido da API com os filtros aplicados
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
        // ... outros serviços
      ];

      const sections = [
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
            { status: "Concluído", quantidade: 1 },
            { status: "Pausado", quantidade: 1 }
          ],
          columns: ["status", "quantidade"],
          headers: ["Status", "Quantidade"]
        }
      ];

      await exportToPDF("Relatório de Serviços Ativos", sections, "servicos-ativos");
      
      toast({
        title: "PDF exportado",
        description: "O relatório foi baixado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro na exportação",
        description: "Não foi possível gerar o PDF. Tente novamente.",
        variant: "destructive",
      });
    }
  };

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
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleExportPDF}
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <LoadingSpinner size="sm" className="mr-2" text="" />
                  ) : (
                    <Download className="w-4 h-4 mr-2" />
                  )}
                  Exportar PDF
                </Button>
                <Button onClick={handleNewService} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Serviço
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-6 space-y-6">
            <AdvancedFilters
              filters={filterOptions}
              onFiltersChange={setFilters}
              activeFilters={filters}
            />
            
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
