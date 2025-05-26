import { useAuth } from "@/contexts/AuthContext";
import { PrefeitoSidebar } from "./PrefeitoSidebar";
import { VereadorSidebar } from "./VereadorSidebar";
import { 
  Tractor, 
  Users, 
  ClipboardList, 
  BarChart3, 
  Settings,
  Home,
  Calendar,
  FileText,
  LogOut
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Serviços Ativos",
    url: "/servicos",
    icon: Tractor,
  },
  {
    title: "Beneficiários",
    url: "/beneficiarios",
    icon: Users,
  },
  {
    title: "Tratoristas",
    url: "/tratoristas",
    icon: ClipboardList,
  },
  {
    title: "Agendamentos",
    url: "/agendamentos",
    icon: Calendar,
  },
  {
    title: "Relatórios",
    url: "/relatorios",
    icon: BarChart3,
  },
  {
    title: "Documentos",
    url: "/documentos",
    icon: FileText,
  },
];

const adminItems = [
  {
    title: "Configurações",
    url: "/configuracoes",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  // Se for prefeito, usar sidebar específico
  if (user?.role === 'prefeito') {
    return <PrefeitoSidebar />;
  }

  // Se for vereador, usar sidebar específico
  if (user?.role === 'vereador') {
    return <VereadorSidebar />;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
            <Tractor className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Sistrator</h2>
            <p className="text-sm text-muted-foreground">Secretaria de Agricultura</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Navegação Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Administração
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-2">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-accent">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xs font-semibold text-primary-foreground">
              {user?.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-accent-foreground truncate">
              {user?.name}
            </p>
            <p className="text-xs text-muted-foreground">Acesso total</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogout}
          className="w-full justify-start"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
