
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MetricCard } from "@/components/MetricCard";
import { ServiceChart } from "@/components/ServiceChart";
import { ActiveServicesTable } from "@/components/ActiveServicesTable";
import { Button } from "@/components/ui/button";
import { 
  Tractor, 
  Users, 
  Calendar, 
  TrendingUp,
  Bell,
  Download
} from "lucide-react";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          {/* Header */}
          <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-foreground">
                  Dashboard Principal
                </h1>
                <p className="text-sm text-muted-foreground">
                  Visão geral do Programa de Mecanização Agrícola
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Exportar
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Bell className="w-4 h-4" />
                  Notificações
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-6 animate-fade-in">
              {/* Metrics Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                  title="Serviços Hoje"
                  value="12"
                  description="4 em execução"
                  icon={Tractor}
                  trend={{ value: 8, isPositive: true }}
                  className="animate-slide-up"
                />
                <MetricCard
                  title="Beneficiários Ativos"
                  value="248"
                  description="Este mês"
                  icon={Users}
                  trend={{ value: 12, isPositive: true }}
                  className="animate-slide-up"
                />
                <MetricCard
                  title="Agendamentos"
                  value="35"
                  description="Próxima semana"
                  icon={Calendar}
                  trend={{ value: 5, isPositive: true }}
                  className="animate-slide-up"
                />
                <MetricCard
                  title="Área Trabalhada"
                  value="1.247 ha"
                  description="Este mês"
                  icon={TrendingUp}
                  trend={{ value: 15, isPositive: true }}
                  className="animate-slide-up"
                />
              </div>

              {/* Charts and Tables Grid */}
              <div className="grid gap-6 lg:grid-cols-4">
                <ServiceChart />
                <ActiveServicesTable />
              </div>

              {/* Quick Stats */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-6 border border-border rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 card-hover">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                      <Tractor className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900 dark:text-green-100">
                        Equipamentos Ativos
                      </h3>
                      <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                        8/10
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        2 em manutenção
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 border border-border rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 card-hover">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                        Tratoristas Disponíveis
                      </h3>
                      <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                        6/8
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        2 em serviço
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 border border-border rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 card-hover">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                        Taxa de Conclusão
                      </h3>
                      <p className="text-2xl font-bold text-amber-800 dark:text-amber-200">
                        94%
                      </p>
                      <p className="text-sm text-amber-600 dark:text-amber-400">
                        Meta: 90%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
