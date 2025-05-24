
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
import { Plus, Search, Users, Phone, MapPin } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const Beneficiarios = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for beneficiários
  const beneficiarios = [
    {
      id: 1,
      nome: "João Silva Santos",
      apelido: "João do Sítio",
      telefone: "(11) 99999-1234",
      endereco: "Rua das Flores, 123",
      propriedade: "Sítio São João - Rod. SP-123, Km 45",
      tamanho: "15 hectares",
      culturas: "Milho, Soja",
      status: "Ativo"
    },
    {
      id: 2,
      nome: "Maria Oliveira Costa",
      apelido: "Maria da Roça",
      telefone: "(11) 98888-5678",
      endereco: "Av. Principal, 456",
      propriedade: "Chácara Bela Vista - Estrada Rural, Km 12",
      tamanho: "8 hectares",
      culturas: "Feijão, Mandioca",
      status: "Ativo"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Beneficiário cadastrado com sucesso!");
    setShowForm(false);
  };

  const filteredBeneficiarios = beneficiarios.filter(b => 
    b.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.apelido.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Novo Beneficiário
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-6">
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
                          <Input id="nome" placeholder="Digite o nome completo" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apelido">Apelido</Label>
                          <Input id="apelido" placeholder="Como é conhecido" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="telefone">Telefone</Label>
                          <Input id="telefone" placeholder="(11) 99999-9999" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endereco">Endereço Residencial</Label>
                          <Input id="endereco" placeholder="Rua, número, bairro" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="propriedade">Endereço da Propriedade Rural</Label>
                        <Input id="propriedade" placeholder="Localização da propriedade" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tamanho">Tamanho da Propriedade</Label>
                        <Input id="tamanho" placeholder="Ex: 10 hectares" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="culturas">Culturas Previstas para Plantio</Label>
                        <Textarea 
                          id="culturas" 
                          placeholder="Ex: Milho, Soja, Feijão..."
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="outras-atividades">Trabalha com Outras Atividades Agrícolas?</Label>
                        <Select>
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
                        <Button type="submit">Cadastrar</Button>
                        <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Search and Stats */}
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
                    <div className="flex gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{beneficiarios.length}</div>
                        <div className="text-sm text-muted-foreground">Total</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{beneficiarios.filter(b => b.status === 'Ativo').length}</div>
                        <div className="text-sm text-muted-foreground">Ativos</div>
                      </div>
                    </div>
                  </div>

                  {/* Beneficiários Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Lista de Beneficiários
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome / Apelido</TableHead>
                            <TableHead>Contato</TableHead>
                            <TableHead>Propriedade</TableHead>
                            <TableHead>Tamanho</TableHead>
                            <TableHead>Culturas</TableHead>
                            <TableHead>Status</TableHead>
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
                              <TableCell>{beneficiario.culturas}</TableCell>
                              <TableCell>
                                <Badge variant={beneficiario.status === 'Ativo' ? 'default' : 'secondary'}>
                                  {beneficiario.status}
                                </Badge>
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
      </div>
    </SidebarProvider>
  );
};

export default Beneficiarios;
