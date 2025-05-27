
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SystemSettings } from "@/components/SystemSettings";
import { UserManagement } from "@/components/UserManagement";
import { SecuritySettings } from "@/components/SecuritySettings";
import { LimitedSecuritySettings } from "@/components/LimitedSecuritySettings";
import { BackupSettings } from "@/components/BackupSettings";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Settings, 
  Users, 
  Shield, 
  Database 
} from "lucide-react";

const Configuracoes = () => {
  const { user } = useAuth();

  // Para prefeito, vereador, secretaria e tratorista, mostrar apenas configurações limitadas
  if (user?.role === 'prefeito' || user?.role === 'vereador' || user?.role === 'secretaria' || user?.role === 'tratorista') {
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
                    Configurações
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Configurações de conta e segurança
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Configurações de Segurança
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LimitedSecuritySettings />
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  // Para admin, mostrar configurações completas
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
                  Configurações
                </h1>
                <p className="text-sm text-muted-foreground">
                  Configurações do sistema e administração
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <Tabs defaultValue="system" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="system" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Sistema
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Usuários
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Segurança
                </TabsTrigger>
                <TabsTrigger value="backup" className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Backup
                </TabsTrigger>
              </TabsList>

              <TabsContent value="system">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Configurações do Sistema
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SystemSettings />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Gerenciamento de Usuários
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <UserManagement />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Configurações de Segurança
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SecuritySettings />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="backup">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Backup e Restauração
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BackupSettings />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Configuracoes;
