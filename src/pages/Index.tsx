
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MetricCard } from "@/components/MetricCard";
import { ServiceChart } from "@/components/ServiceChart";
import { ActiveServicesTable } from "@/components/ActiveServicesTable";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Tractor, 
  Users, 
  Calendar, 
  TrendingUp,
  Bell,
  Download,
  Menu
} from "lucide-react";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          {/* Mobile-optimized Header */}
          <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className={`flex items-center gap-4 ${isMobile ? 'h-14 px-4' : 'h-16 px-6'}`}>
              <SidebarTrigger className="text-muted-foreground hover:text-foreground">
                <Menu className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
              </SidebarTrigger>
              <div className="flex-1 min-w-0">
                <h1 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-foreground truncate`}>
                  Dashboard Principal
                </h1>
                {!isMobile && (
                  <p className="text-sm text-muted-foreground">
                    Visão geral do Programa de Mecanização Agrícola
                  </p>
                )}
              </div>
              {!isMobile && (
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
              )}
              {isMobile && (
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Bell className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile-optimized Content */}
          <div className={`flex-1 overflow-auto ${isMobile ? 'p-4' : 'p-6'}`}>
            <div className={`space-y-${isMobile ? '4' : '6'} animate-fade-in`}>
              {/* Mobile-first Metrics Grid */}
              <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
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

              {/* Mobile-optimized Charts and Tables Grid */}
              <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-4'}`}>
                <div className={isMobile ? 'col-span-1' : 'col-span-2'}>
                  <ServiceChart />
                </div>
                <div className={isMobile ? 'col-span-1' : 'col-span-2'}>
                  <ActiveServicesTable />
                </div>
              </div>

              {/* Mobile-optimized Quick Stats */}
              <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'}`}>
                <div className={`${isMobile ? 'p-4' : 'p-6'} border border-border rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 card-hover`}>
                  <div className="flex items-center gap-3">
                    <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full bg-green-500 flex items-center justify-center`}>
                      <Tractor className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
                    </div>
                    <div>
                      <h3 className={`${isMobile ? 'text-sm' : 'font-semibold'} text-green-900 dark:text-green-100`}>
                        Equipamentos Ativos
                      </h3>
                      <p className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-green-800 dark:text-green-200`}>
                        8/10
                      </p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-600 dark:text-green-400`}>
                        2 em manutenção
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`${isMobile ? 'p-4' : 'p-6'} border border-border rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 card-hover`}>
                  <div className="flex items-center gap-3">
                    <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full bg-blue-500 flex items-center justify-center`}>
                      <Users className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
                    </div>
                    <div>
                      <h3 className={`${isMobile ? 'text-sm' : 'font-semibold'} text-blue-900 dark:text-blue-100`}>
                        Tratoristas Disponíveis
                      </h3>
                      <p className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-blue-800 dark:text-blue-200`}>
                        6/8
                      </p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-600 dark:text-blue-400`}>
                        2 em serviço
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`${isMobile ? 'p-4' : 'p-6'} border border-border rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 card-hover`}>
                  <div className="flex items-center gap-3">
                    <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full bg-amber-500 flex items-center justify-center`}>
                      <Calendar className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
                    </div>
                    <div>
                      <h3 className={`${isMobile ? 'text-sm' : 'font-semibold'} text-amber-900 dark:text-amber-100`}>
                        Taxa de Conclusão
                      </h3>
                      <p className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-amber-800 dark:text-amber-200`}>
                        94%
                      </p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-600 dark:text-amber-400`}>
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
