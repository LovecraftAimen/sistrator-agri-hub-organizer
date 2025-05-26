
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChangePasswordDialog } from "@/components/ChangePasswordDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Key, 
  Lock, 
  AlertTriangle,
  Save,
  History,
  RefreshCw
} from "lucide-react";

export function SecuritySettings() {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiration: true,
    passwordMinLength: "8",
    maxLoginAttempts: "3",
    sessionTimeout: "30",
    auditLog: true,
    ipWhitelist: false,
    forceHttps: true
  });

  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [confirmChangePasswordOpen, setConfirmChangePasswordOpen] = useState(false);
  const { toast } = useToast();

  const [auditLogs] = useState([
    {
      id: "1",
      action: "Login realizado",
      user: "João Silva",
      ip: "192.168.1.100",
      timestamp: "2024-01-15 14:30:25",
      status: "success"
    },
    {
      id: "2",
      action: "Tentativa de login falhada",
      user: "admin",
      ip: "192.168.1.50",
      timestamp: "2024-01-15 14:25:10",
      status: "failure"
    },
    {
      id: "3",
      action: "Configuração alterada",
      user: "Maria Santos",
      ip: "192.168.1.105",
      timestamp: "2024-01-15 13:15:42",
      status: "success"
    }
  ]);

  const handleSave = () => {
    console.log("Salvando configurações de segurança:", securitySettings);
    toast({
      title: "Sucesso",
      description: "Configurações de segurança salvas com sucesso"
    });
  };

  const handleSettingChange = (setting: string, value: boolean | string) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    // Toast informativo para mudanças importantes
    if (setting === 'twoFactorAuth' && value) {
      toast({
        title: "Autenticação 2FA Ativada",
        description: "Maior segurança habilitada para o sistema"
      });
    }
    
    if (setting === 'maintenanceMode' && value) {
      toast({
        title: "Modo de Manutenção",
        description: "Sistema será bloqueado para novos acessos",
        variant: "destructive"
      });
    }
  };

  const handlePasswordChange = () => {
    setConfirmChangePasswordOpen(true);
  };

  const confirmPasswordChange = () => {
    setConfirmChangePasswordOpen(false);
    setChangePasswordOpen(true);
  };

  const clearAuditLogs = () => {
    toast({
      title: "Logs Limpos",
      description: "Histórico de auditoria foi limpo com sucesso"
    });
  };

  return (
    <div className="space-y-6">
      {/* Configurações de Autenticação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            Autenticação e Senhas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Autenticação de Dois Fatores</Label>
              <p className="text-sm text-muted-foreground">
                Exigir código adicional para login
              </p>
            </div>
            <div className="flex items-center gap-2">
              {securitySettings.twoFactorAuth && <Badge>Ativo</Badge>}
              <Switch
                checked={securitySettings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
              />
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Expiração de Senhas</Label>
              <p className="text-sm text-muted-foreground">
                Forçar alteração de senha a cada 90 dias
              </p>
            </div>
            <Switch
              checked={securitySettings.passwordExpiration}
              onCheckedChange={(checked) => handleSettingChange('passwordExpiration', checked)}
            />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="passwordMinLength">Tamanho Mínimo da Senha</Label>
              <Input
                id="passwordMinLength"
                type="number"
                min="6"
                max="20"
                value={securitySettings.passwordMinLength}
                onChange={(e) => handleSettingChange('passwordMinLength', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxLoginAttempts">Máximo de Tentativas de Login</Label>
              <Input
                id="maxLoginAttempts"
                type="number"
                min="1"
                max="10"
                value={securitySettings.maxLoginAttempts}
                onChange={(e) => handleSettingChange('maxLoginAttempts', e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Alterar Senha</Label>
              <p className="text-sm text-muted-foreground">
                Alterar a senha de acesso ao sistema
              </p>
            </div>
            <Button onClick={handlePasswordChange} variant="outline">
              <Lock className="w-4 h-4 mr-2" />
              Alterar Senha
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Acesso */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Controle de Acesso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Log de Auditoria</Label>
              <p className="text-sm text-muted-foreground">
                Registrar todas as ações do sistema
              </p>
            </div>
            <Switch
              checked={securitySettings.auditLog}
              onCheckedChange={(checked) => handleSettingChange('auditLog', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Lista Branca de IPs</Label>
              <p className="text-sm text-muted-foreground">
                Permitir acesso apenas de IPs específicos
              </p>
            </div>
            <Switch
              checked={securitySettings.ipWhitelist}
              onCheckedChange={(checked) => handleSettingChange('ipWhitelist', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Forçar HTTPS</Label>
              <p className="text-sm text-muted-foreground">
                Redirecionar todas as conexões para HTTPS
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">Recomendado</Badge>
              <Switch
                checked={securitySettings.forceHttps}
                onCheckedChange={(checked) => handleSettingChange('forceHttps', checked)}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Timeout de Sessão (minutos)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              min="5"
              max="480"
              value={securitySettings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Log de Auditoria */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <History className="w-4 h-4" />
              Log de Auditoria Recente
            </CardTitle>
            <Button variant="outline" size="sm" onClick={clearAuditLogs}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Limpar Logs
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {log.status === "success" ? (
                    <Shield className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  )}
                  <div>
                    <p className="font-medium">{log.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {log.user} • {log.ip}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm">{log.timestamp}</p>
                  <Badge variant={log.status === "success" ? "default" : "destructive"}>
                    {log.status === "success" ? "Sucesso" : "Falha"}
                  </Badge>
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
          Salvar Configurações de Segurança
        </Button>
      </div>

      {/* Diálogos */}
      <ConfirmDialog
        open={confirmChangePasswordOpen}
        onOpenChange={setConfirmChangePasswordOpen}
        title="Confirmar Alteração de Senha"
        description="Tem certeza que deseja alterar sua senha? Você precisará usar a nova senha para futuros acessos."
        confirmText="Sim, Alterar Senha"
        onConfirm={confirmPasswordChange}
      />

      <ChangePasswordDialog
        open={changePasswordOpen}
        onOpenChange={setChangePasswordOpen}
      />
    </div>
  );
}
