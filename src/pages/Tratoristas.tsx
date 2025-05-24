
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Eye } from "lucide-react";
import { TratoristaForm } from "@/components/TratoristaForm";
import { TratoristasList } from "@/components/TratoristasList";
import { TratoristaDetails } from "@/components/TratoristaDetails";

export interface Tratorista {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  endereco: string;
  cnh: string;
  validadeCnh: string;
  experiencia: string;
  especialidades: string[];
  disponibilidade: string;
  observacoes: string;
  status: 'ativo' | 'inativo' | 'licenca';
  dataCadastro: string;
  horasTrabalhadas: number;
}

const Tratoristas = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTratorista, setSelectedTratorista] = useState<Tratorista | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tratoristas, setTratoristas] = useState<Tratorista[]>([
    {
      id: "1",
      nome: "João Silva Santos",
      cpf: "123.456.789-00",
      telefone: "(11) 99999-9999",
      endereco: "Rua das Flores, 123 - Centro",
      cnh: "12345678901",
      validadeCnh: "2025-12-15",
      experiencia: "5 anos",
      especialidades: ["Aração", "Gradagem", "Plantio"],
      disponibilidade: "Segunda a Sexta - 7h às 17h",
      observacoes: "Operador experiente, especialista em terrenos irregulares",
      status: "ativo",
      dataCadastro: "2024-01-15",
      horasTrabalhadas: 245
    },
    {
      id: "2",
      nome: "Maria Oliveira Costa",
      cpf: "987.654.321-00",
      telefone: "(11) 88888-8888",
      endereco: "Av. Principal, 456 - Vila Nova",
      cnh: "98765432109",
      validadeCnh: "2024-08-20",
      experiencia: "3 anos",
      especialidades: ["Gradagem", "Cultivo"],
      disponibilidade: "Segunda a Sábado - 6h às 16h",
      observacoes: "Ótima performance em terrenos pequenos e médios",
      status: "ativo",
      dataCadastro: "2024-02-10",
      horasTrabalhadas: 189
    }
  ]);

  const handleAddTratorista = (newTratorista: Omit<Tratorista, 'id' | 'dataCadastro' | 'horasTrabalhadas'>) => {
    const tratorista: Tratorista = {
      ...newTratorista,
      id: Date.now().toString(),
      dataCadastro: new Date().toISOString().split('T')[0],
      horasTrabalhadas: 0
    };
    setTratoristas([...tratoristas, tratorista]);
    setShowForm(false);
  };

  const handleEditTratorista = (updatedTratorista: Tratorista) => {
    setTratoristas(tratoristas.map(t => 
      t.id === updatedTratorista.id ? updatedTratorista : t
    ));
    setShowForm(false);
    setSelectedTratorista(null);
  };

  const handleViewDetails = (tratorista: Tratorista) => {
    setSelectedTratorista(tratorista);
    setShowDetails(true);
  };

  const handleEditClick = (tratorista: Tratorista) => {
    setSelectedTratorista(tratorista);
    setShowForm(true);
  };

  const filteredTratoristas = tratoristas.filter(tratorista =>
    tratorista.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tratorista.cpf.includes(searchTerm) ||
    tratorista.telefone.includes(searchTerm)
  );

  if (showForm) {
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
                    {selectedTratorista ? "Editar Tratorista" : "Cadastrar Tratorista"}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {selectedTratorista ? "Atualize as informações do operador" : "Cadastre um novo operador de trator"}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setSelectedTratorista(null);
                  }}
                >
                  Voltar
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6">
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
              <div className="flex h-16 items-center gap-4 px-6">
                <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
                <div className="flex-1">
                  <h1 className="text-xl font-semibold text-foreground">
                    Detalhes do Tratorista
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Informações completas do operador
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowDetails(false);
                    setSelectedTratorista(null);
                  }}
                >
                  Voltar
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6">
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
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-foreground">
                  Gestão de Tratoristas
                </h1>
                <p className="text-sm text-muted-foreground">
                  Cadastro e controle dos operadores
                </p>
              </div>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Novo Tratorista
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar por nome, CPF ou telefone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
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
