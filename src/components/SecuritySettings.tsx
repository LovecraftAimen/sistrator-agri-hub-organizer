
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Key, 
  Lock, 
  AlertTriangle,
  Save,
  History
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
                onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
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
              onCheckedChange={(checked) => setSecuritySettings({...securitySettings, passwordExpiration: checked})}
            />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="passwordMinLength">Tamanho Mínimo da Senha</Label>
              <Input
                id="passwordMinLength"
                type="number"
                value={securitySettings.passwordMinLength}
                onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxLoginAttempts">Máximo de Tentativas de Login</Label>
              <Input
                id="maxLoginAttempts"
                type="number"
                value={securitySettings.maxLoginAttempts}
                onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: e.target.value})}
              />
            </div>
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
              onCheckedChange={(checked) => setSecuritySettings({...securitySettings, auditLog: checked})}
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
              onCheckedChange={(checked) => setSecuritySettings({...securitySettings, ipWhitelist: checked})}
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
                onCheckedChange={(checked) => setSecuritySettings({...securitySettings, forceHttps: checked})}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Timeout de Sessão (minutos)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              value={securitySettings.sessionTimeout}
              onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Log de Auditoria */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-4 h-4" />
            Log de Auditoria Recente
          </CardTitle>
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
    </div>
  );
}
