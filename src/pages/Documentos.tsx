
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentsTable } from "@/components/DocumentsTable";
import { DocumentCategories } from "@/components/DocumentCategories";
import { DocumentStats } from "@/components/DocumentStats";
import { 
  FileText, 
  FolderOpen, 
  BarChart3 
} from "lucide-react";

const Documentos = () => {
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
                  Documentos
                </h1>
                <p className="text-sm text-muted-foreground">
                  Gestão de documentos e arquivos do sistema
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <Tabs defaultValue="documents" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="documents" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Documentos
                </TabsTrigger>
                <TabsTrigger value="categories" className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4" />
                  Categorias
                </TabsTrigger>
                <TabsTrigger value="statistics" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Estatísticas
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
