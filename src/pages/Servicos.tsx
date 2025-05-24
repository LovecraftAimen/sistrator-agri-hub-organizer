
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ServicesTable, type Service } from "@/components/ServicesTable";
import { ServiceDetails } from "@/components/ServiceDetails";
import { ServiceForm } from "@/components/ServiceForm";
import { Plus, Calendar, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Servicos = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);
  const [viewMode, setViewMode] = useState<'details' | 'form'>('details');
  const { toast } = useToast();

  const handleViewService = (service: Service) => {
    setSelectedService(service);
    setViewMode('details');
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
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Agenda
                </Button>
                <Button variant="outline" size="sm">
                  <Activity className="w-4 h-4 mr-2" />
                  Relatórios
                </Button>
                <Button onClick={handleNewService} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Serviço
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-6">
            <ServicesTable 
              onViewService={handleViewService}
              onEditService={handleEditService}
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
