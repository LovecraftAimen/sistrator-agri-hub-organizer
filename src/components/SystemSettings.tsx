
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  RefreshCw, 
  Bell, 
  Globe, 
  Clock,
  Server
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

  const handleSave = () => {
    console.log("Salvando configurações:", settings);
    // Aqui seria feita a chamada para a API
  };

  const handleReset = () => {
    console.log("Resetando configurações");
    // Aqui seria feito o reset para configurações padrão
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
                onChange={(e) => setSettings({...settings, systemName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Fuso Horário</Label>
              <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Sao_Paulo">São Paulo (UTC-3)</SelectItem>
                  <SelectItem value="America/Brasilia">Brasília (UTC-3)</SelectItem>
                  <SelectItem value="America/Manaus">Manaus (UTC-4)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Idioma</Label>
              <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
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
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
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
              {settings.maintenanceMode && <Badge variant="destructive">Ativo</Badge>}
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
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
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => setSettings({...settings, notifications: checked})}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Backup Automático</Label>
              <p className="text-sm text-muted-foreground">
                Executar backup automático diariamente
              </p>
            </div>
            <Switch
              checked={settings.autoBackup}
              onCheckedChange={(checked) => setSettings({...settings, autoBackup: checked})}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="maxUsers">Máximo de Usuários Simultâneos</Label>
            <Input
              id="maxUsers"
              type="number"
              value={settings.maxUsers}
              onChange={(e) => setSettings({...settings, maxUsers: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex gap-3">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Salvar Configurações
        </Button>
        <Button variant="outline" onClick={handleReset} className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Restaurar Padrões
        </Button>
      </div>
    </div>
  );
}
