
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Save, 
  Tractor, 
  AlertTriangle,
  CheckCircle,
  Plus
} from "lucide-react";

interface DiarioTrator {
  id: string;
  data: string;
  trator: string;
  horasOperacao: number;
  statusEquipamento: 'bom' | 'atencao' | 'problema';
  problemas: string;
  manutencao: string;
  combustivel: number;
  observacoes: string;
}

const DiarioTrator = () => {
  const [diarioAtual, setDiarioAtual] = useState<Partial<DiarioTrator>>({
    data: new Date().toISOString().split('T')[0],
    statusEquipamento: 'bom',
    combustivel: 0,
    horasOperacao: 0
  });
  const [registros, setRegistros] = useState<DiarioTrator[]>([]);
  const { toast } = useToast();

  const tratores = [
    { id: "TR001", nome: "Trator Massey Ferguson 265" },
    { id: "TR002", nome: "Trator John Deere 5075E" },
    { id: "TR003", nome: "Trator New Holland TL75" },
  ];

  const handleSalvarRegistro = () => {
    if (!diarioAtual.trator || !diarioAtual.data) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const novoRegistro: DiarioTrator = {
      id: Date.now().toString(),
      data: diarioAtual.data!,
      trator: diarioAtual.trator!,
      horasOperacao: diarioAtual.horasOperacao || 0,
      statusEquipamento: diarioAtual.statusEquipamento as 'bom' | 'atencao' | 'problema',
      problemas: diarioAtual.problemas || '',
      manutencao: diarioAtual.manutencao || '',
      combustivel: diarioAtual.combustivel || 0,
      observacoes: diarioAtual.observacoes || ''
    };

    setRegistros([...registros, novoRegistro]);
    
    // Resetar formulário
    setDiarioAtual({
      data: new Date().toISOString().split('T')[0],
      statusEquipamento: 'bom',
      combustivel: 0,
      horasOperacao: 0
    });

    toast({
      title: "Registro salvo",
      description: "Diário do trator registrado com sucesso",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'bom':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'atencao':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'problema':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'bom':
        return 'Funcionando bem';
      case 'atencao':
        return 'Requer atenção';
      case 'problema':
        return 'Com problemas';
      default:
        return 'Desconhecido';
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
                  Diário do Trator
                </h1>
                <p className="text-sm text-muted-foreground">
                  Controle diário dos equipamentos e manutenções
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Novo Registro Diário
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="data">Data</Label>
                      <Input
                        id="data"
                        type="date"
                        value={diarioAtual.data}
                        onChange={(e) => setDiarioAtual({...diarioAtual, data: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="trator">Trator</Label>
                      <Select 
                        value={diarioAtual.trator} 
                        onValueChange={(value) => setDiarioAtual({...diarioAtual, trator: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o trator" />
                        </SelectTrigger>
                        <SelectContent>
                          {tratores.map((trator) => (
                            <SelectItem key={trator.id} value={trator.id}>
                              {trator.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="horasOperacao">Horas de Operação</Label>
                      <Input
                        id="horasOperacao"
                        type="number"
                        min="0"
                        step="0.5"
                        value={diarioAtual.horasOperacao}
                        onChange={(e) => setDiarioAtual({...diarioAtual, horasOperacao: Number(e.target.value)})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="combustivel">Combustível (Litros)</Label>
                      <Input
                        id="combustivel"
                        type="number"
                        min="0"
                        step="0.1"
                        value={diarioAtual.combustivel}
                        onChange={(e) => setDiarioAtual({...diarioAtual, combustivel: Number(e.target.value)})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="statusEquipamento">Status do Equipamento</Label>
                      <Select 
                        value={diarioAtual.statusEquipamento} 
                        onValueChange={(value: 'bom' | 'atencao' | 'problema') => 
                          setDiarioAtual({...diarioAtual, statusEquipamento: value})
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bom">Funcionando bem</SelectItem>
                          <SelectItem value="atencao">Requer atenção</SelectItem>
                          <SelectItem value="problema">Com problemas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="problemas">Problemas Identificados</Label>
                    <Textarea
                      id="problemas"
                      placeholder="Descreva problemas encontrados no equipamento..."
                      value={diarioAtual.problemas || ''}
                      onChange={(e) => setDiarioAtual({...diarioAtual, problemas: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manutencao">Manutenção Realizada</Label>
                    <Textarea
                      id="manutencao"
                      placeholder="Descreva manutenções ou reparos realizados..."
                      value={diarioAtual.manutencao || ''}
                      onChange={(e) => setDiarioAtual({...diarioAtual, manutencao: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observacoes">Observações Gerais</Label>
                    <Textarea
                      id="observacoes"
                      placeholder="Observações adicionais sobre o dia de trabalho..."
                      value={diarioAtual.observacoes || ''}
                      onChange={(e) => setDiarioAtual({...diarioAtual, observacoes: e.target.value})}
                      rows={2}
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={handleSalvarRegistro} className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Salvar Registro
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Registros Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {registros.slice(-5).reverse().map((registro) => (
                      <div key={registro.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Tractor className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">
                                {tratores.find(t => t.id === registro.trator)?.nome}
                              </p>
                              <p className="text-sm text-muted-foreground">{registro.data}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(registro.statusEquipamento)}
                            <Badge variant={registro.statusEquipamento === 'bom' ? 'default' : 
                                           registro.statusEquipamento === 'atencao' ? 'secondary' : 'destructive'}>
                              {getStatusLabel(registro.statusEquipamento)}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Horas:</span>
                            <p className="font-medium">{registro.horasOperacao}h</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Combustível:</span>
                            <p className="font-medium">{registro.combustivel}L</p>
                          </div>
                        </div>
                        
                        {registro.problemas && (
                          <div className="mt-3">
                            <span className="text-sm text-muted-foreground">Problemas:</span>
                            <p className="text-sm mt-1">{registro.problemas}</p>
                          </div>
                        )}
                        
                        {registro.manutencao && (
                          <div className="mt-2">
                            <span className="text-sm text-muted-foreground">Manutenção:</span>
                            <p className="text-sm mt-1">{registro.manutencao}</p>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {registros.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        Nenhum registro encontrado
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DiarioTrator;
