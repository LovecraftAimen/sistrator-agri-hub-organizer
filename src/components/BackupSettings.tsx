
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Database, 
  Download, 
  Upload, 
  Clock,
  HardDrive,
  CheckCircle,
  AlertCircle,
  Save
} from "lucide-react";

export function BackupSettings() {
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupTime: "02:00",
    retentionDays: "30",
    includeFiles: true,
    compression: true
  });

  const [backupHistory, setBackupHistory] = useState([
    {
      id: "1",
      date: "2024-01-15",
      time: "02:00:15",
      size: "2.3 GB",
      status: "success",
      type: "automático"
    },
    {
      id: "2",
      date: "2024-01-14",
      time: "02:00:12",
      size: "2.1 GB",
      status: "success",
      type: "automático"
    },
    {
      id: "3",
      date: "2024-01-13",
      time: "14:30:45",
      size: "2.0 GB",
      status: "success",
      type: "manual"
    },
    {
      id: "4",
      date: "2024-01-12",
      time: "02:00:08",
      size: "-",
      status: "failed",
      type: "automático"
    }
  ]);

  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [confirmRestoreOpen, setConfirmRestoreOpen] = useState(false);
  const [selectedBackupId, setSelectedBackupId] = useState<string>("");
  const { toast } = useToast();

  const handleManualBackup = async () => {
    setIsBackingUp(true);
    setBackupProgress(0);
    
    toast({
      title: "Backup Iniciado",
      description: "Realizando backup do sistema..."
    });

    // Simular progresso do backup
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setBackupProgress(i);
    }

    // Adicionar novo backup ao histórico
    const newBackup = {
      id: String(Date.now()),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('pt-BR'),
      size: "2.4 GB",
      status: "success",
      type: "manual"
    };

    setBackupHistory(prev => [newBackup, ...prev]);
    setIsBackingUp(false);
    setBackupProgress(0);

    toast({
      title: "Backup Concluído",
      description: "Backup realizado com sucesso!"
    });
  };

  const handleRestore = (backupId?: string) => {
    if (backupId) {
      setSelectedBackupId(backupId);
    }
    setConfirmRestoreOpen(true);
  };

  const confirmRestore = async () => {
    setConfirmRestoreOpen(false);
    
    toast({
      title: "Restauração Iniciada",
      description: "Restaurando sistema a partir do backup..."
    });

    // Simular restauração
    await new Promise(resolve => setTimeout(resolve, 3000));

    toast({
      title: "Restauração Concluída",
      description: "Sistema restaurado com sucesso!"
    });
  };

  const handleSave = () => {
    console.log("Salvando configurações de backup:", backupSettings);
    toast({
      title: "Sucesso",
      description: "Configurações de backup salvas com sucesso"
    });
  };

  const handleSettingChange = (setting: string, value: string | boolean) => {
    setBackupSettings(prev => ({
      ...prev,
      [setting]: value
    }));

    if (setting === 'autoBackup' && !value) {
      toast({
        title: "Backup Automático Desativado",
        description: "Lembre-se de fazer backups manuais regularmente",
        variant: "destructive"
      });
    }
  };

  const downloadBackup = (backupId: string) => {
    const backup = backupHistory.find(b => b.id === backupId);
    if (backup) {
      toast({
        title: "Download Iniciado",
        description: `Baixando backup de ${backup.date} - ${backup.size}`
      });
      // Simular download
      console.log("Baixando backup:", backup);
    }
  };

  return (
    <div className="space-y-6">
      {/* Status do Sistema */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Último Backup</p>
                <p className="font-bold">15/01/2024 02:00</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Tamanho do Banco</p>
                <p className="font-bold">2.3 GB</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Próximo Backup</p>
                <p className="font-bold">
                  {backupSettings.autoBackup ? `16/01/2024 ${backupSettings.backupTime}` : "Desativado"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configurações de Backup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Configurações de Backup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Backup Automático</Label>
              <p className="text-sm text-muted-foreground">
                Executar backup automaticamente
              </p>
            </div>
            <Switch
              checked={backupSettings.autoBackup}
              onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
            />
          </div>

          {backupSettings.autoBackup && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequência</Label>
                  <Select value={backupSettings.backupFrequency} onValueChange={(value) => handleSettingChange('backupFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupTime">Horário</Label>
                  <Input
                    id="backupTime"
                    type="time"
                    value={backupSettings.backupTime}
                    onChange={(e) => handleSettingChange('backupTime', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="retention">Retenção (dias)</Label>
                <Input
                  id="retention"
                  type="number"
                  min="1"
                  max="365"
                  value={backupSettings.retentionDays}
                  onChange={(e) => handleSettingChange('retentionDays', e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Backups mais antigos serão removidos automaticamente
                </p>
              </div>
            </>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Incluir Arquivos</Label>
              <p className="text-sm text-muted-foreground">
                Incluir documentos e imagens no backup
              </p>
            </div>
            <Switch
              checked={backupSettings.includeFiles}
              onCheckedChange={(checked) => handleSettingChange('includeFiles', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Compressão</Label>
              <p className="text-sm text-muted-foreground">
                Comprimir backup para economizar espaço
              </p>
            </div>
            <Switch
              checked={backupSettings.compression}
              onCheckedChange={(checked) => handleSettingChange('compression', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Ações de Backup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Backup Manual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Execute um backup completo do sistema agora
            </p>
            {isBackingUp && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progresso</span>
                  <span>{backupProgress}%</span>
                </div>
                <Progress value={backupProgress} className="w-full" />
              </div>
            )}
            <Button 
              onClick={handleManualBackup} 
              className="w-full"
              disabled={isBackingUp}
            >
              {isBackingUp ? "Executando..." : "Executar Backup Agora"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Restaurar Backup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Restaurar sistema a partir de um backup
            </p>
            <Button 
              variant="outline" 
              onClick={() => handleRestore()} 
              className="w-full"
            >
              Restaurar Sistema
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Histórico de Backups */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Backups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backupHistory.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {backup.status === "success" ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                  <div>
                    <p className="font-medium">{backup.date} - {backup.time}</p>
                    <p className="text-sm text-muted-foreground">
                      {backup.type} • {backup.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={backup.status === "success" ? "default" : "destructive"}>
                    {backup.status === "success" ? "Sucesso" : "Falhou"}
                  </Badge>
                  {backup.status === "success" && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => downloadBackup(backup.id)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRestore(backup.id)}
                      >
                        <Upload className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex gap-3">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Salvar Configurações
        </Button>
      </div>

      {/* Diálogo de Confirmação */}
      <ConfirmDialog
        open={confirmRestoreOpen}
        onOpenChange={setConfirmRestoreOpen}
        title="Confirmar Restauração"
        description="Tem certeza que deseja restaurar o sistema? Esta ação irá substituir todos os dados atuais pelos dados do backup selecionado. Esta ação não pode ser desfeita."
        confirmText="Sim, Restaurar"
        variant="destructive"
        onConfirm={confirmRestore}
      />
    </div>
  );
}
