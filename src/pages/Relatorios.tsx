import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, BarChart3, Users, Clock, MapPin, Tractor } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";
import { usePDFExport } from "@/hooks/usePDFExport";

const Relatorios = () => {
  const { toast } = useToast();
  const { exportToPDF, isExporting } = usePDFExport();

  // Mock data para relatórios
  const servicosPorTipo = [
    { tipo: "Aração", quantidade: 145, horas: 289 },
    { tipo: "Gradagem", quantidade: 132, horas: 198 }
  ];

  const servicosPorRegiao = [
    { regiao: "Norte", concluidos: 45, pendentes: 12, prioridade: "Alta" },
    { regiao: "Sul", concluidos: 38, pendentes: 8, prioridade: "Média" },
    { regiao: "Leste", concluidos: 52, pendentes: 15, prioridade: "Alta" },
    { regiao: "Oeste", concluidos: 41, pendentes: 6, prioridade: "Baixa" }
  ];

  const tratoristas = [
    { nome: "Carlos Silva", servicos: 45, horas: 89, eficiencia: "95%" },
    { nome: "José Santos", servicos: 38, horas: 76, eficiencia: "92%" },
    { nome: "Antonio Costa", servicos: 42, horas: 84, eficiencia: "88%" },
    { nome: "Pedro Oliveira", servicos: 35, horas: 71, eficiencia: "90%" }
  ];

  const horasPorPropriedade = [
    { propriedade: "Sítio São João", beneficiario: "João Silva", horasAracao: 12, horasGradagem: 8, total: 20 },
    { propriedade: "Chácara Bela Vista", beneficiario: "Maria Costa", horasAracao: 15, horasGradagem: 10, total: 25 },
    { propriedade: "Fazenda Santa Clara", beneficiario: "Pedro Santos", horasAracao: 18, horasGradagem: 12, total: 30 }
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

  const handleExportPDF = async () => {
    try {
      const sections = [
        {
          title: "Resumo Geral",
          data: [
            { metrica: "Total de Beneficiários", valor: "248", observacao: "+12% em relação ao mês anterior" },
            { metrica: "Serviços Realizados", valor: "277", observacao: "145 arações + 132 gradagens" },
            { metrica: "Total de Horas", valor: "487h", observacao: "Tempo total trabalhado" },
            { metrica: "Eficiência Média", valor: "91%", observacao: "Meta: 85%" }
          ],
          columns: ["metrica", "valor", "observacao"],
          headers: ["Métrica", "Valor", "Observação"]
        },
        {
          title: "Serviços por Tipo",
          data: servicosPorTipo,
          columns: ["tipo", "quantidade", "horas"],
          headers: ["Tipo", "Quantidade", "Horas"]
        },
        {
          title: "Desempenho por Tratorista",
          data: tratoristas,
          columns: ["nome", "servicos", "horas", "eficiencia"],
          headers: ["Tratorista", "Serviços", "Horas", "Eficiência"]
        },
        {
          title: "Progresso por Região",
          data: servicosPorRegiao,
          columns: ["regiao", "concluidos", "pendentes", "prioridade"],
          headers: ["Região", "Concluídos", "Pendentes", "Prioridade"]
        },
        {
          title: "Horas por Propriedade",
          data: horasPorPropriedade,
          columns: ["propriedade", "beneficiario", "horasAracao", "horasGradagem", "total"],
          headers: ["Propriedade", "Beneficiário", "Horas Aração", "Horas Gradagem", "Total"]
        }
      ];

      await exportToPDF("Relatório Completo de Mecanização Agrícola", sections, "relatorio-completo");
      
      toast({
        title: "PDF exportado",
        description: "O relatório completo foi baixado com sucesso.",
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
          {/* Header */}
          <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-foreground">
                  Relatórios e Estatísticas
                </h1>
                <p className="text-sm text-muted-foreground">
                  Análises detalhadas do programa de mecanização agrícola
                </p>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="todos">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os períodos</SelectItem>
                    <SelectItem value="mes">Último mês</SelectItem>
                    <SelectItem value="trimestre">Último trimestre</SelectItem>
                    <SelectItem value="ano">Último ano</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={handleExportPDF}
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <LoadingSpinner size="sm" text="" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  Exportar PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-6">
              {/* Cards de Resumo */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total de Beneficiários</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">248</div>
                    <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Serviços Realizados</CardTitle>
                    <Tractor className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">277</div>
                    <p className="text-xs text-muted-foreground">145 arações + 132 gradagens</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total de Horas</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">487h</div>
                    <p className="text-xs text-muted-foreground">Tempo total trabalhado</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Eficiência Média</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">91%</div>
                    <p className="text-xs text-muted-foreground">Meta: 85%</p>
                  </CardContent>
                </Card>
              </div>

              {/* Gráficos */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Serviços por Tipo</CardTitle>
                    <CardDescription>Comparativo entre arações e gradagens</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={servicosPorTipo}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="tipo" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="quantidade" fill="#22c55e" name="Quantidade" />
                        <Bar dataKey="horas" fill="#3b82f6" name="Horas" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição por Região</CardTitle>
                    <CardDescription>Progresso dos serviços por área</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={servicosPorRegiao}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ regiao, concluidos }) => `${regiao}: ${concluidos}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="concluidos"
                        >
                          {servicosPorRegiao.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Tabelas Detalhadas */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Desempenho por Tratorista</CardTitle>
                    <CardDescription>Detalhamento dos serviços por operador</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tratorista</TableHead>
                          <TableHead>Serviços</TableHead>
                          <TableHead>Horas</TableHead>
                          <TableHead>Eficiência</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tratoristas.map((tratorista, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{tratorista.nome}</TableCell>
                            <TableCell>{tratorista.servicos}</TableCell>
                            <TableCell>{tratorista.horas}h</TableCell>
                            <TableCell>
                              <Badge variant={parseInt(tratorista.eficiencia) >= 90 ? 'default' : 'secondary'}>
                                {tratorista.eficiencia}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Progresso por Região</CardTitle>
                    <CardDescription>Status e prioridades regionais</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Região</TableHead>
                          <TableHead>Concluídos</TableHead>
                          <TableHead>Pendentes</TableHead>
                          <TableHead>Prioridade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {servicosPorRegiao.map((regiao, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{regiao.regiao}</TableCell>
                            <TableCell>{regiao.concluidos}</TableCell>
                            <TableCell>{regiao.pendentes}</TableCell>
                            <TableCell>
                              <Badge variant={
                                regiao.prioridade === 'Alta' ? 'destructive' :
                                regiao.prioridade === 'Média' ? 'default' : 'secondary'
                              }>
                                {regiao.prioridade}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Horas por Propriedade */}
              <Card>
                <CardHeader>
                  <CardTitle>Horas Trabalhadas por Propriedade</CardTitle>
                  <CardDescription>Detalhamento do tempo investido em cada propriedade</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Propriedade</TableHead>
                        <TableHead>Beneficiário</TableHead>
                        <TableHead>Horas Aração</TableHead>
                        <TableHead>Horas Gradagem</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {horasPorPropriedade.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.propriedade}</TableCell>
                          <TableCell>{item.beneficiario}</TableCell>
                          <TableCell>{item.horasAracao}h</TableCell>
                          <TableCell>{item.horasGradagem}h</TableCell>
                          <TableCell className="font-semibold">{item.total}h</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Relatorios;
