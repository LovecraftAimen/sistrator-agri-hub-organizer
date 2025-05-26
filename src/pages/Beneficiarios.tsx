import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Users, Phone, MapPin, Download, Edit, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdvancedFilters } from "@/components/AdvancedFilters";
import { StatsCard } from "@/components/StatsCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EditBeneficiarioDialog } from "@/components/EditBeneficiarioDialog";
import { DeleteBeneficiarioDialog } from "@/components/DeleteBeneficiarioDialog";
import { CPFInput } from "@/components/CPFInput";
import { useDataExport } from "@/hooks/useDataExport";

const Beneficiarios = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedBeneficiario, setSelectedBeneficiario] = useState<any>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [formData, setFormData] = useState({
    nome: '',
    apelido: '',
    cpf: '',
    telefone: '',
    endereco: '',
    propriedade: '',
    tamanho: '',
    culturas: '',
    municipio: '',
    outrasAtividades: ''
  });
  const { exportData, isExporting } = useDataExport();
  
  // Mock data para beneficiários com CPF e status expandidos
  const [beneficiarios, setBeneficiarios] = useState([
    {
      id: 1,
      nome: "João Silva Santos",
      apelido: "João do Sítio",
      cpf: "123.456.789-01",
      telefone: "(11) 99999-1234",
      endereco: "Rua das Flores, 123",
      propriedade: "Sítio São João - Rod. SP-123, Km 45",
      tamanho: "15 hectares",
      culturas: "Milho, Soja",
      status: "Ativo",
      municipio: "São Paulo",
      dataCadastro: "2024-01-15"
    },
    {
      id: 2,
      nome: "Maria Oliveira Costa",
      apelido: "Maria da Roça",
      cpf: "987.654.321-09",
      telefone: "(11) 98888-5678",
      endereco: "Av. Principal, 456",
      propriedade: "Chácara Bela Vista - Estrada Rural, Km 12",
      tamanho: "8 hectares",
      culturas: "Feijão, Mandioca",
      status: "Pendente",
      municipio: "Campinas",
      dataCadastro: "2024-02-10"
    },
    {
      id: 3,
      nome: "Carlos Ferreira Lima",
      apelido: "Carlinhos",
      cpf: "456.789.123-45",
      telefone: "(11) 97777-9999",
      endereco: "Rua do Campo, 789",
      propriedade: "Fazenda Santa Clara - Estrada Velha, Km 8",
      tamanho: "25 hectares",
      culturas: "Café, Milho",
      status: "Inativo",
      municipio: "Sorocaba",
      dataCadastro: "2024-01-20"
    }
  ]);

  const filterOptions = [
    { key: "nome", label: "Nome", type: "text" as const },
    { key: "municipio", label: "Município", type: "select" as const, options: [
      { value: "São Paulo", label: "São Paulo" },
      { value: "Campinas", label: "Campinas" },
      { value: "Sorocaba", label: "Sorocaba" },
    ]},
    { key: "status", label: "Status", type: "select" as const, options: [
      { value: "Ativo", label: "Ativo" },
      { value: "Inativo", label: "Inativo" },
      { value: "Pendente", label: "Pendente" },
    ]},
    { key: "dataCadastro", label: "Data de Cadastro", type: "date" as const },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simula envio
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Adiciona novo beneficiário
    const newBeneficiario = {
      id: beneficiarios.length + 1,
      ...formData,
      status: "Pendente",
      dataCadastro: new Date().toISOString().split('T')[0]
    };
    
    setBeneficiarios(prev => [...prev, newBeneficiario]);
    
    // Reset form
    setFormData({
      nome: '',
      apelido: '',
      cpf: '',
      telefone: '',
      endereco: '',
      propriedade: '',
      tamanho: '',
      culturas: '',
      municipio: '',
      outrasAtividades: ''
    });
    
    toast.success("Beneficiário cadastrado com sucesso!");
    setShowForm(false);
    setIsLoading(false);
  };

  const handleExport = async (format: 'csv' | 'excel' | 'pdf') => {
    try {
      await exportData(filteredBeneficiarios, {
        filename: 'beneficiarios',
        format
      });
      toast.success(`Dados exportados em ${format.toUpperCase()} com sucesso!`);
    } catch (error) {
      toast.error("Erro ao exportar dados");
    }
  };

  const handleUpdateBeneficiario = (id: number, updatedData: any) => {
    setBeneficiarios(prev => 
      prev.map(b => 
        b.id === id ? { ...b, ...updatedData } : b
      )
    );
    toast.success("Beneficiário atualizado com sucesso!");
  };

  const handleDeleteBeneficiario = (id: number) => {
    setBeneficiarios(prev => prev.filter(b => b.id !== id));
    toast.success("Beneficiário excluído com sucesso!");
  };

  const openEditDialog = (beneficiario: any) => {
    setSelectedBeneficiario(beneficiario);
    setShowEditDialog(true);
  };

  const openDeleteDialog = (beneficiario: any) => {
    setSelectedBeneficiario(beneficiario);
    setShowDeleteDialog(true);
  };

  const filteredBeneficiarios = beneficiarios.filter(b => {
    const matchesSearch = b.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         b.apelido.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = Object.entries(activeFilters).every(([key, value]) => {
      if (!value) return true;
      const fieldValue = b[key as keyof typeof b];
      return fieldValue?.toString().toLowerCase().includes(value.toLowerCase());
    });

    return matchesSearch && matchesFilters;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Ativo': return 'default';
      case 'Inativo': return 'destructive';
      case 'Pendente': return 'secondary';
      default: return 'secondary';
    }
  };

  const statsData = {
    total: beneficiarios.length,
    ativos: beneficiarios.filter(b => b.status === 'Ativo').length,
    inativos: beneficiarios.filter(b => b.status === 'Inativo').length,
    pendentes: beneficiarios.filter(b => b.status === 'Pendente').length,
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          {/* Header */}
          <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-foreground">
                  Gestão de Beneficiários
                </h1>
                <p className="text-sm text-muted-foreground">
                  Cadastro e gerenciamento de beneficiários do programa
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleExport('csv')} disabled={isExporting}>
                  <Download className="w-4 h-4 mr-2" />
                  {isExporting ? "Exportando..." : "Exportar"}
                </Button>
                <Button onClick={() => setShowForm(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Novo Beneficiário
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-6">
              <Breadcrumbs />
              
              {showForm ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Cadastro de Beneficiário</CardTitle>
                    <CardDescription>
                      Preencha as informações do novo beneficiário
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nome">Nome Completo</Label>
                          <Input 
                            id="nome" 
                            placeholder="Digite o nome completo"
                            value={formData.nome}
                            onChange={(e) => handleInputChange('nome', e.target.value)}
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apelido">Apelido</Label>
                          <Input 
                            id="apelido" 
                            placeholder="Como é conhecido"
                            value={formData.apelido}
                            onChange={(e) => handleInputChange('apelido', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cpf">CPF</Label>
                          <CPFInput
                            value={formData.cpf}
                            onChange={(value) => handleInputChange('cpf', value)}
                            placeholder="000.000.000-00"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefone">Telefone</Label>
                          <Input 
                            id="telefone" 
                            placeholder="(11) 99999-9999"
                            value={formData.telefone}
                            onChange={(e) => handleInputChange('telefone', e.target.value)}
                            required 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="endereco">Endereço Residencial</Label>
                          <Input 
                            id="endereco" 
                            placeholder="Rua, número, bairro"
                            value={formData.endereco}
                            onChange={(e) => handleInputChange('endereco', e.target.value)}
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="municipio">Município</Label>
                          <Input 
                            id="municipio" 
                            placeholder="Nome do município"
                            value={formData.municipio}
                            onChange={(e) => handleInputChange('municipio', e.target.value)}
                            required 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="propriedade">Endereço da Propriedade Rural</Label>
                        <Input 
                          id="propriedade" 
                          placeholder="Localização da propriedade"
                          value={formData.propriedade}
                          onChange={(e) => handleInputChange('propriedade', e.target.value)}
                          required 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tamanho">Tamanho da Propriedade</Label>
                        <Input 
                          id="tamanho" 
                          placeholder="Ex: 10 hectares"
                          value={formData.tamanho}
                          onChange={(e) => handleInputChange('tamanho', e.target.value)}
                          required 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="culturas">Culturas Previstas para Plantio</Label>
                        <Textarea 
                          id="culturas" 
                          placeholder="Ex: Milho, Soja, Feijão..."
                          value={formData.culturas}
                          onChange={(e) => handleInputChange('culturas', e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="outras-atividades">Trabalha com Outras Atividades Agrícolas?</Label>
                        <Select value={formData.outrasAtividades} onValueChange={(value) => handleInputChange('outrasAtividades', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nao">Não</SelectItem>
                            <SelectItem value="sim">Sim</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-2">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? <LoadingSpinner size="sm" text="Salvando..." /> : "Cadastrar"}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatsCard
                      title="Total de Beneficiários"
                      value={statsData.total}
                      description="Cadastrados no sistema"
                      trend={{ value: 12, type: "increase", period: "este mês" }}
                      icon={<Users className="w-4 h-4" />}
                    />
                    <StatsCard
                      title="Beneficiários Ativos"
                      value={statsData.ativos}
                      description="Em atividade"
                      badge={{ text: "Ativo", variant: "default" }}
                    />
                    <StatsCard
                      title="Beneficiários Pendentes"
                      value={statsData.pendentes}
                      description="Aguardando aprovação"
                      badge={{ text: "Pendente", variant: "secondary" }}
                    />
                    <StatsCard
                      title="Beneficiários Inativos"
                      value={statsData.inativos}
                      description="Desativados"
                      badge={{ text: "Inativo", variant: "destructive" }}
                    />
                  </div>

                  {/* Search and Filters */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                      <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Buscar beneficiário..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <AdvancedFilters
                      filters={filterOptions}
                      activeFilters={activeFilters}
                      onFiltersChange={setActiveFilters}
                    />
                  </div>

                  {/* Beneficiários Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Lista de Beneficiários ({filteredBeneficiarios.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome / Apelido</TableHead>
                            <TableHead>CPF</TableHead>
                            <TableHead>Contato</TableHead>
                            <TableHead>Propriedade</TableHead>
                            <TableHead>Tamanho</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-center">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBeneficiarios.map((beneficiario) => (
                            <TableRow key={beneficiario.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{beneficiario.nome}</div>
                                  <div className="text-sm text-muted-foreground">"{beneficiario.apelido}"</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="font-mono text-sm">{beneficiario.cpf}</span>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm">{beneficiario.telefone}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-start gap-2">
                                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                                  <span className="text-sm">{beneficiario.propriedade}</span>
                                </div>
                              </TableCell>
                              <TableCell>{beneficiario.tamanho}</TableCell>
                              <TableCell>
                                <Badge variant={getStatusBadgeVariant(beneficiario.status)}>
                                  {beneficiario.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center justify-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => openEditDialog(beneficiario)}
                                    className="h-8"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => openDeleteDialog(beneficiario)}
                                    className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </main>

        {/* Edit Dialog */}
        <EditBeneficiarioDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          beneficiario={selectedBeneficiario}
          onUpdateBeneficiario={handleUpdateBeneficiario}
        />

        {/* Delete Dialog */}
        <DeleteBeneficiarioDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          beneficiario={selectedBeneficiario}
          onConfirmDelete={handleDeleteBeneficiario}
        />

        {/* Legacy Confirm Dialog */}
        <ConfirmDialog
          open={showDeleteConfirm}
          onOpenChange={setShowDeleteConfirm}
          title="Confirmar Exclusão"
          description="Tem certeza de que deseja excluir este beneficiário? Esta ação não pode ser desfeita."
          confirmText="Excluir"
          variant="destructive"
          onConfirm={() => {
            setShowDeleteConfirm(false);
            toast.success("Beneficiário excluído com sucesso!");
          }}
        />
      </div>
    </SidebarProvider>
  );
};

export default Beneficiarios;
