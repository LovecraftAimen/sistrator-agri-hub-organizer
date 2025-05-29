
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Menu } from "lucide-react";
import { TratoristaForm } from "@/components/TratoristaForm";
import { TratoristasList } from "@/components/TratoristasList";
import { TratoristaDetails } from "@/components/TratoristaDetails";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTratoristasData, TratoristaData } from "@/hooks/useTratoristasData";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Tratoristas = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTratorista, setSelectedTratorista] = useState<TratoristaData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();
  
  const { tratoristas, isLoading, addTratorista, updateTratorista } = useTratoristasData();

  const handleAddTratorista = async (newTratorista: Omit<TratoristaData, 'id' | 'created_at' | 'updated_at'>) => {
    const result = await addTratorista(newTratorista);
    if (result) {
      setShowForm(false);
    }
  };

  const handleEditTratorista = async (updatedTratorista: TratoristaData) => {
    const success = await updateTratorista(updatedTratorista.id, updatedTratorista);
    if (success) {
      setShowForm(false);
      setSelectedTratorista(null);
    }
  };

  const handleViewDetails = (tratorista: TratoristaData) => {
    setSelectedTratorista(tratorista);
    setShowDetails(true);
  };

  const handleEditClick = (tratorista: TratoristaData) => {
    setSelectedTratorista(tratorista);
    setShowForm(true);
  };

  const filteredTratoristas = tratoristas.filter(tratorista =>
    tratorista.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tratorista.cpf.includes(searchTerm) ||
    tratorista.telefone?.includes(searchTerm)
  );

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <main className="flex-1 flex items-center justify-center">
            <LoadingSpinner size="lg" text="Carregando tratoristas..." />
          </main>
        </div>
      </SidebarProvider>
    );
  }

  if (showForm) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <main className="flex-1 overflow-hidden">
            <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className={`flex items-center gap-4 ${isMobile ? 'h-14 px-4' : 'h-16 px-6'}`}>
                <SidebarTrigger className="text-muted-foreground hover:text-foreground">
                  <Menu className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
                </SidebarTrigger>
                <div className="flex-1 min-w-0">
                  <h1 className={`${isMobile ? 'text-base' : 'text-xl'} font-semibold text-foreground truncate`}>
                    {selectedTratorista ? "Editar Tratorista" : "Cadastrar Tratorista"}
                  </h1>
                  {!isMobile && (
                    <p className="text-sm text-muted-foreground">
                      {selectedTratorista ? "Atualize as informações do operador" : "Cadastre um novo operador de trator"}
                    </p>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setSelectedTratorista(null);
                  }}
                  size={isMobile ? "sm" : "default"}
                >
                  Voltar
                </Button>
              </div>
            </div>
            <div className={`flex-1 overflow-auto ${isMobile ? 'p-3' : 'p-6'}`}>
              <TratoristaForm 
                tratorista={selectedTratorista}
                onSubmit={selectedTratorista ? handleEditTratorista : handleAddTratorista}
                onCancel={() => {
                  setShowForm(false);
                  setSelectedTratorista(null);
                }}
              />
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  if (showDetails && selectedTratorista) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <main className="flex-1 overflow-hidden">
            <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className={`flex items-center gap-4 ${isMobile ? 'h-14 px-4' : 'h-16 px-6'}`}>
                <SidebarTrigger className="text-muted-foreground hover:text-foreground">
                  <Menu className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
                </SidebarTrigger>
                <div className="flex-1 min-w-0">
                  <h1 className={`${isMobile ? 'text-base' : 'text-xl'} font-semibold text-foreground truncate`}>
                    Detalhes do Tratorista
                  </h1>
                  {!isMobile && (
                    <p className="text-sm text-muted-foreground">
                      Informações completas do operador
                    </p>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedTratorista(null);
                  }}
                  size={isMobile ? "sm" : "default"}
                >
                  Voltar
                </Button>
              </div>
            </div>
            <div className={`flex-1 overflow-auto ${isMobile ? 'p-3' : 'p-6'}`}>
              <TratoristaDetails 
                tratorista={selectedTratorista}
                onEdit={() => {
                  setShowDetails(false);
                  setShowForm(true);
                }}
              />
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className={`flex items-center gap-4 ${isMobile ? 'h-14 px-4' : 'h-16 px-6'}`}>
              <SidebarTrigger className="text-muted-foreground hover:text-foreground">
                <Menu className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
              </SidebarTrigger>
              <div className="flex-1 min-w-0">
                <h1 className={`${isMobile ? 'text-base' : 'text-xl'} font-semibold text-foreground truncate`}>
                  Gestão de Tratoristas
                </h1>
                {!isMobile && (
                  <p className="text-sm text-muted-foreground">
                    Cadastro e controle dos operadores
                  </p>
                )}
              </div>
              <Button onClick={() => setShowForm(true)} className="gap-2" size={isMobile ? "sm" : "default"}>
                <Plus className={isMobile ? 'w-3 h-3' : 'w-4 h-4'} />
                {isMobile ? 'Novo' : 'Novo Tratorista'}
              </Button>
            </div>
          </div>
          <div className={`flex-1 overflow-auto ${isMobile ? 'p-3' : 'p-6'}`}>
            <div className={`space-y-${isMobile ? '4' : '6'}`}>
              <div className="flex gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                  <Input
                    placeholder={isMobile ? "Buscar..." : "Buscar por nome, CPF ou telefone..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={isMobile ? 'pl-8 text-sm' : 'pl-10'}
                  />
                </div>
              </div>

              <TratoristasList 
                tratoristas={filteredTratoristas}
                onView={handleViewDetails}
                onEdit={handleEditClick}
              />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Tratoristas;
