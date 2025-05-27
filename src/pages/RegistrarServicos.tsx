
import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Save, 
  Clock, 
  MapPin, 
  Plus,
  Wifi,
  WifiOff,
  Play,
  Square
} from "lucide-react";

interface ServicoRegistro {
  id: string;
  beneficiarioNome: string;
  tipoServico: 'aracao' | 'gradagem';
  horaEntrada: string;
  horaSaida: string;
  horasTotais: number;
  observacoes: string;
  data: string;
  status: 'concluido' | 'em_andamento';
  sincronizado: boolean;
}

const RegistrarServicos = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [servicoAtual, setServicoAtual] = useState<Partial<ServicoRegistro>>({
    tipoServico: 'aracao',
    data: new Date().toISOString().split('T')[0],
    status: 'em_andamento'
  });
  const [servicos, setServicos] = useState<ServicoRegistro[]>([]);
  const { toast } = useToast();

  // Mock de beneficiários
  const beneficiarios = [
    { id: "1", nome: "João Silva" },
    { id: "2", nome: "Maria Santos" },
    { id: "3", nome: "Pedro Oliveira" },
  ];

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Conexão restaurada",
        description: "Sincronizando dados pendentes...",
      });
      sincronizarDados();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Modo offline",
        description: "Os dados serão salvos localmente e sincronizados quando a conexão for restaurada.",
        variant: "destructive"
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Carregar dados salvos localmente
    carregarDadosLocais();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const carregarDadosLocais = () => {
    const dadosSalvos = localStorage.getItem('servicos_tratorista');
    if (dadosSalvos) {
      setServicos(JSON.parse(dadosSalvos));
    }
  };

  const salvarDadosLocais = (novosServicos: ServicoRegistro[]) => {
    localStorage.setItem('servicos_tratorista', JSON.stringify(novosServicos));
  };

  const sincronizarDados = async () => {
    // Simular sincronização com servidor
    const servicosNaoSincronizados = servicos.filter(s => !s.sincronizado);
    
    if (servicosNaoSincronizados.length > 0) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const servicosAtualizados = servicos.map(s => ({
        ...s,
        sincronizado: true
      }));
      
      setServicos(servicosAtualizados);
      salvarDadosLocais(servicosAtualizados);
      
      toast({
        title: "Sincronização concluída",
        description: `${servicosNaoSincronizados.length} registros sincronizados.`,
      });
    }
  };

  const calcularHorasTotais = (entrada: string, saida: string): number => {
    if (!entrada || !saida) return 0;
    
    const [horaEntrada, minutoEntrada] = entrada.split(':').map(Number);
    const [horaSaida, minutoSaida] = saida.split(':').map(Number);
    
    const minutosEntrada = horaEntrada * 60 + minutoEntrada;
    const minutosSaida = horaSaida * 60 + minutoSaida;
    
    const diferencaMinutos = minutosSaida - minutosEntrada;
    return Math.max(0, diferencaMinutos / 60);
  };

  const handleIniciarServico = () => {
    if (!servicoAtual.beneficiarioNome) {
      toast({
        title: "Erro",
        description: "Selecione um beneficiário antes de iniciar o serviço",
        variant: "destructive"
      });
      return;
    }

    const agora = new Date();
    const horaAtual = agora.toTimeString().slice(0, 5);
    
    setServicoAtual({
      ...servicoAtual,
      horaEntrada: horaAtual,
      status: 'em_andamento'
    });
    
    toast({
      title: "Serviço iniciado",
      description: `Horário de entrada registrado: ${horaAtual}`,
    });
  };

  const handleFinalizarServico = () => {
    if (!servicoAtual.beneficiarioNome || !servicoAtual.horaEntrada) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const agora = new Date();
    const horaAtual = agora.toTimeString().slice(0, 5);
    const horasTotais = calcularHorasTotais(servicoAtual.horaEntrada!, horaAtual);

    const novoServico: ServicoRegistro = {
      id: Date.now().toString(),
      beneficiarioNome: servicoAtual.beneficiarioNome!,
      tipoServico: servicoAtual.tipoServico as 'aracao' | 'gradagem',
      horaEntrada: servicoAtual.horaEntrada!,
      horaSaida: horaAtual,
      horasTotais,
      observacoes: servicoAtual.observacoes || '',
      data: servicoAtual.data!,
      status: 'concluido',
      sincronizado: isOnline
    };

    const novosServicos = [...servicos, novoServico];
    setServicos(novosServicos);
    salvarDadosLocais(novosServicos);

    // Resetar formulário
    setServicoAtual({
      tipoServico: 'aracao',
      data: new Date().toISOString().split('T')[0],
      status: 'em_andamento'
    });

    toast({
      title: "Serviço registrado",
      description: `${horasTotais.toFixed(1)} horas trabalhadas registradas`,
    });
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
                  Registrar Serviços
                </h1>
                <p className="text-sm text-muted-foreground">
                  Registre os serviços realizados em campo
                </p>
              </div>
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <Badge variant="default" className="flex items-center gap-1">
                    <Wifi className="w-3 h-3" />
                    Online
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <WifiOff className="w-3 h-3" />
                    Offline
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Novo Registro de Serviço
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="data">Data</Label>
                      <Input
                        id="data"
                        type="date"
                        value={servicoAtual.data}
                        onChange={(e) => setServicoAtual({...servicoAtual, data: e.target.value})}
                        disabled={!!servicoAtual.horaEntrada}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tipoServico">Tipo de Serviço</Label>
                      <Select 
                        value={servicoAtual.tipoServico} 
                        onValueChange={(value: 'aracao' | 'gradagem') => 
                          setServicoAtual({...servicoAtual, tipoServico: value})
                        }
                        disabled={!!servicoAtual.horaEntrada}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aracao">Aração</SelectItem>
                          <SelectItem value="gradagem">Gradagem</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="beneficiario">Beneficiário</Label>
                    <Select 
                      value={servicoAtual.beneficiarioNome} 
                      onValueChange={(value) => setServicoAtual({...servicoAtual, beneficiarioNome: value})}
                      disabled={!!servicoAtual.horaEntrada}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o beneficiário" />
                      </SelectTrigger>
                      <SelectContent>
                        {beneficiarios.map((beneficiario) => (
                          <SelectItem key={beneficiario.id} value={beneficiario.nome}>
                            {beneficiario.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {servicoAtual.horaEntrada && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="horaEntrada">Hora Entrada</Label>
                        <Input
                          id="horaEntrada"
                          type="time"
                          value={servicoAtual.horaEntrada || ''}
                          readOnly
                          className="bg-muted"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="horaSaida">Hora Saída</Label>
                        <Input
                          id="horaSaida"
                          value="Automático ao finalizar"
                          readOnly
                          className="bg-muted text-muted-foreground"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="observacoes">Observações</Label>
                    <Input
                      id="observacoes"
                      placeholder="Observações sobre o serviço..."
                      value={servicoAtual.observacoes || ''}
                      onChange={(e) => setServicoAtual({...servicoAtual, observacoes: e.target.value})}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    {!servicoAtual.horaEntrada ? (
                      <Button onClick={handleIniciarServico} className="flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Iniciar Serviço
                      </Button>
                    ) : (
                      <Button onClick={handleFinalizarServico} className="flex items-center gap-2">
                        <Square className="w-4 h-4" />
                        Finalizar Serviço
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Serviços Registrados Hoje</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {servicos
                      .filter(s => s.data === new Date().toISOString().split('T')[0])
                      .map((servico) => (
                      <div key={servico.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{servico.beneficiarioNome}</p>
                            <p className="text-sm text-muted-foreground">
                              {servico.tipoServico === 'aracao' ? 'Aração' : 'Gradagem'} • 
                              {servico.horaEntrada} - {servico.horaSaida} • 
                              {servico.horasTotais.toFixed(1)}h
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={servico.sincronizado ? "default" : "secondary"}>
                            {servico.sincronizado ? "Sincronizado" : "Pendente"}
                          </Badge>
                          <Badge variant="outline">
                            {servico.status === 'concluido' ? 'Concluído' : 'Em andamento'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    
                    {servicos.filter(s => s.data === new Date().toISOString().split('T')[0]).length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        Nenhum serviço registrado hoje
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

export default RegistrarServicos;
