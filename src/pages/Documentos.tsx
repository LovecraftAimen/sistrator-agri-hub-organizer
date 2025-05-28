
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentsTable } from "@/components/DocumentsTable";
import { DocumentCategories } from "@/components/DocumentCategories";
import { DocumentStats } from "@/components/DocumentStats";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  FileText, 
  FolderOpen, 
  BarChart3,
  Menu
} from "lucide-react";

const Documentos = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className={`flex items-center gap-4 ${isMobile ? 'h-14 px-4' : 'h-16 px-6'}`}>
              <SidebarTrigger className="text-muted-foreground hover:text-foreground">
                <Menu className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
              </SidebarTrigger>
              <div className="flex-1 min-w-0">
                <h1 className={`${isMobile ? 'text-base' : 'text-xl'} font-semibold text-foreground truncate`}>
                  Documentos
                </h1>
                {!isMobile && (
                  <p className="text-sm text-muted-foreground">
                    Gestão de documentos e arquivos do sistema
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={`flex-1 overflow-auto ${isMobile ? 'p-3' : 'p-6'}`}>
            <Tabs defaultValue="documents" className={`space-y-${isMobile ? '4' : '6'}`}>
              <TabsList className={`grid w-full grid-cols-3 ${isMobile ? 'text-xs' : ''}`}>
                <TabsTrigger value="documents" className="flex items-center gap-2">
                  <FileText className={isMobile ? 'w-3 h-3' : 'w-4 h-4'} />
                  {!isMobile ? 'Documentos' : 'Docs'}
                </TabsTrigger>
                <TabsTrigger value="categories" className="flex items-center gap-2">
                  <FolderOpen className={isMobile ? 'w-3 h-3' : 'w-4 h-4'} />
                  {!isMobile ? 'Categorias' : 'Cat.'}
                </TabsTrigger>
                <TabsTrigger value="statistics" className="flex items-center gap-2">
                  <BarChart3 className={isMobile ? 'w-3 h-3' : 'w-4 h-4'} />
                  {!isMobile ? 'Estatísticas' : 'Stats'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="documents">
                <DocumentsTable />
              </TabsContent>

              <TabsContent value="categories">
                <DocumentCategories />
              </TabsContent>

              <TabsContent value="statistics">
                <DocumentStats />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Documentos;
