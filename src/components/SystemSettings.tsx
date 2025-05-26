
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Save, 
  RefreshCw, 
  Bell, 
  Globe, 
  Clock,
  Server,
  AlertTriangle
} from "lucide-react";

export function SystemSettings() {
  const [settings, setSettings] = useState({
    systemName: "Sistrator",
    timezone: "America/Sao_Paulo",
    language: "pt-BR",
    maintenanceMode: false,
    notifications: true,
    autoBackup: true,
    sessionTimeout: "120",
    maxUsers: "50"
  });

  const [originalSettings] = useState({...settings});
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    console.log("Salvando configurações:", settings);
    
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Sucesso",
      description: "Configurações do sistema salvas com sucesso"
    });
    
    setIsLoading(false);
  };

  const handleReset = () => {
    setConfirmResetOpen(true);
  };

  const confirmReset = () => {
    setSettings({...originalSettings});
    setConfirmResetOpen(false);
    toast({
      title: "Configurações Restauradas",
      description: "Todas as configurações foram restauradas para os valores padrão"
    });
  };

  const handleSettingChange = (setting: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));

    // Feedback específico para configurações críticas
    if (setting === 'maintenanceMode' && value) {
      toast({
        title: "Modo de Manutenção Ativado",
        description: "O sistema será bloqueado para novos usuários",
        variant: "destructive"
      });
    }

    if (setting === 'autoBackup' && !value) {
      toast({
        title: "Backup Automático Desativado",
        description: "Lembre-se de fazer backups manuais regularmente",
        variant: "destructive"
      });
    }
  };

  const testNotifications = () => {
    toast({
      title: "Teste de Notificação",
      description: "As notificações estão funcionando corretamente!"
    });
  };

  return (
    <div className="space-y-6">
      {/* Configurações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Configurações Gerais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="systemName">Nome do Sistema</Label>
              <Input
                id="systemName"
                value={settings.systemName}
                onChange={(e) => handleSettingChange('systemName', e.target.value)}
                placeholder="Digite o nome do sistema"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Fuso Horário</Label>
              <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Sao_Paulo">São Paulo (UTC-3)</SelectItem>
                  <SelectItem value="America/Brasilia">Brasília (UTC-3)</SelectItem>
                  <SelectItem value="America/Manaus">Manaus (UTC-4)</SelectItem>
                  <SelectItem value="America/Recife">Recife (UTC-3)</SelectItem>
                  <SelectItem value="America/Rio_Branco">Rio Branco (UTC-5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Idioma</Label>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="es-ES">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Timeout de Sessão (minutos)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                min="15"
                max="480"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                placeholder="120"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações do Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-4 h-4" />
            Sistema
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Modo de Manutenção</Label>
              <p className="text-sm text-muted-foreground">
                Ativar modo de manutenção para bloquear acesso ao sistema
              </p>
            </div>
            <div className="flex items-center gap-2">
              {settings.maintenanceMode && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Ativo
                </Badge>
              )}
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
              />
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificações do Sistema</Label>
              <p className="text-sm text-muted-foreground">
                Receber notificações sobre eventos do sistema
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={testNotifications}
                disabled={!settings.notifications}
              >
                <Bell className="w-4 h-4 mr-2" />
                Testar
              </Button>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
              />
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Backup Automático</Label>
              <p className="text-sm text-muted-foreground">
                Executar backup automático diariamente
              </p>
            </div>
            <div className="flex items-center gap-2">
              {settings.autoBackup && <Badge>Ativo</Badge>}
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="maxUsers">Máximo de Usuários Simultâneos</Label>
            <Input
              id="maxUsers"
              type="number"
              min="1"
              max="1000"
              value={settings.maxUsers}
              onChange={(e) => handleSettingChange('maxUsers', e.target.value)}
              placeholder="50"
            />
            <p className="text-sm text-muted-foreground">
              Limite de usuários que podem acessar o sistema simultaneamente
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex gap-3">
        <Button 
          onClick={handleSave} 
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <Save className="w-4 h-4" />
          {isLoading ? "Salvando..." : "Salvar Configurações"}
        </Button>
        <Button 
          variant="outline" 
          onClick={handleReset} 
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <RefreshCw className="w-4 h-4" />
          Restaurar Padrões
        </Button>
      </div>

      {/* Diálogo de Confirmação */}
      <ConfirmDialog
        open={confirmResetOpen}
        onOpenChange={setConfirmResetOpen}
        title="Restaurar Configurações Padrão"
        description="Tem certeza que deseja restaurar todas as configurações para os valores padrão? Esta ação não pode ser desfeita."
        confirmText="Sim, Restaurar"
        variant="destructive"
        onConfirm={confirmReset}
      />
    </div>
  );
}
