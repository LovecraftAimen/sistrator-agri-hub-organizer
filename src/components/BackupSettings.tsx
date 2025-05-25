
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Download, 
  Upload, 
  Clock,
  HardDrive,
  CheckCircle,
  AlertCircle
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

  const [backupHistory] = useState([
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

  const handleManualBackup = () => {
    console.log("Iniciando backup manual...");
  };

  const handleRestore = () => {
    console.log("Iniciando restauração...");
  };

  const handleSave = () => {
    console.log("Salvando configurações de backup:", backupSettings);
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
                <p className="font-bold">16/01/2024 02:00</p>
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
              onCheckedChange={(checked) => setBackupSettings({...backupSettings, autoBackup: checked})}
            />
          </div>

          {backupSettings.autoBackup && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequência</Label>
                  <Select value={backupSettings.backupFrequency} onValueChange={(value) => setBackupSettings({...backupSettings, backupFrequency: value})}>
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
                    onChange={(e) => setBackupSettings({...backupSettings, backupTime: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="retention">Retenção (dias)</Label>
                <Input
                  id="retention"
                  type="number"
                  value={backupSettings.retentionDays}
                  onChange={(e) => setBackupSettings({...backupSettings, retentionDays: e.target.value})}
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
              onCheckedChange={(checked) => setBackupSettings({...backupSettings, includeFiles: checked})}
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
              onCheckedChange={(checked) => setBackupSettings({...backupSettings, compression: checked})}
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
            <Button onClick={handleManualBackup} className="w-full">
              Executar Backup Agora
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
            <Button variant="outline" onClick={handleRestore} className="w-full">
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
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex gap-3">
        <Button onClick={handleSave}>
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}
