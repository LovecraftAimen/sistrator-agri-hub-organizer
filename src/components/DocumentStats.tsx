
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  HardDrive, 
  TrendingUp, 
  Calendar,
  Download,
  Upload,
  Users,
  FolderOpen
} from "lucide-react";

export function DocumentStats() {
  const totalDocuments = 108;
  const totalSize = "15.7 GB";
  const monthlyUploads = 23;
  const monthlyDownloads = 156;

  const categoryStats = [
    { name: "Imagens", count: 45, percentage: 42, color: "bg-orange-500" },
    { name: "Relatórios", count: 28, percentage: 26, color: "bg-green-500" },
    { name: "Manuais", count: 15, percentage: 14, color: "bg-blue-500" },
    { name: "Planilhas", count: 12, percentage: 11, color: "bg-purple-500" },
    { name: "Contratos", count: 8, percentage: 7, color: "bg-red-500" }
  ];

  const typeStats = [
    { type: "PDF", count: 51, size: "8.2 GB" },
    { type: "JPG/PNG", count: 45, size: "6.1 GB" },
    { type: "XLSX", count: 12, size: "1.4 GB" }
  ];

  const recentActivity = [
    {
      id: "1",
      action: "Upload",
      document: "Relatório Mensal Janeiro 2024",
      user: "Maria Santos",
      date: "2024-01-15",
      type: "upload"
    },
    {
      id: "2",
      action: "Download",
      document: "Manual Trator MT500",
      user: "João Silva",
      date: "2024-01-15",
      type: "download"
    },
    {
      id: "3",
      action: "Upload",
      document: "Foto Área Plantio Sul",
      user: "Ana Lima",
      date: "2024-01-14",
      type: "upload"
    },
    {
      id: "4",
      action: "Download",
      document: "Planilha Custos 2024",
      user: "Pedro Costa",
      date: "2024-01-14",
      type: "download"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total de Documentos</p>
                <p className="text-2xl font-bold">{totalDocuments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Espaço Utilizado</p>
                <p className="text-2xl font-bold">{totalSize}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Uploads este Mês</p>
                <p className="text-2xl font-bold">{monthlyUploads}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Downloads este Mês</p>
                <p className="text-2xl font-bold">{monthlyDownloads}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas por Categoria */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              Documentos por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryStats.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {category.count} ({category.percentage}%)
                  </span>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Tipos de Arquivo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {typeStats.map((type) => (
              <div key={type.type} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{type.type}</p>
                  <p className="text-sm text-muted-foreground">{type.count} arquivos</p>
                </div>
                <Badge variant="outline">{type.size}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Atividade Recente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Atividade Recente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {activity.type === "upload" ? (
                    <Upload className="w-4 h-4 text-green-600" />
                  ) : (
                    <Download className="w-4 h-4 text-blue-600" />
                  )}
                  <div>
                    <p className="font-medium">{activity.document}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action} por {activity.user}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm">{activity.date}</p>
                  <Badge variant={activity.type === "upload" ? "default" : "secondary"}>
                    {activity.action}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resumo de Uso */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Resumo de Uso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Usuários Ativos</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Upload className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">95%</p>
              <p className="text-sm text-muted-foreground">Taxa de Upload</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Download className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold">2.3</p>
              <p className="text-sm text-muted-foreground">Downloads/Dia</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <HardDrive className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold">78%</p>
              <p className="text-sm text-muted-foreground">Espaço Usado</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
