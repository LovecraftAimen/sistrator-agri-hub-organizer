
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChangePasswordDialog } from "@/components/ChangePasswordDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Lock, 
  AlertTriangle,
  History,
  RefreshCw
} from "lucide-react";

export function LimitedSecuritySettings() {
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [confirmChangePasswordOpen, setConfirmChangePasswordOpen] = useState(false);
  const { toast } = useToast();

  const [auditLogs] = useState([
    {
      id: "1",
      action: "Login realizado",
      user: "Prefeito Municipal",
      ip: "192.168.1.100",
      timestamp: "2024-01-15 14:30:25",
      status: "success"
    },
    {
      id: "2",
      action: "Beneficiário adicionado",
      user: "Prefeito Municipal",
      ip: "192.168.1.100",
      timestamp: "2024-01-15 13:45:10",
      status: "success"
    },
    {
      id: "3",
      action: "Prioridade alterada",
      user: "Prefeito Municipal",
      ip: "192.168.1.100",
      timestamp: "2024-01-15 13:15:42",
      status: "success"
    }
  ]);

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
      {/* Configurações de Senha */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Alteração de Senha
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="font-medium">Alterar Senha</label>
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
