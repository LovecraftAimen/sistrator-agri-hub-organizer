
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Agendamentos = () => {
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
                  Agendamentos
                </h1>
                <p className="text-sm text-muted-foreground">
                  Programação e cronograma de serviços
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Página de Agendamentos em desenvolvimento</p>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Agendamentos;
