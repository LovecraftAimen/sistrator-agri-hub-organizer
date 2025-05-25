
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  FolderPlus, 
  FolderOpen, 
  Edit, 
  Trash2,
  FileText,
  Image,
  FileSpreadsheet,
  File
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  documentCount: number;
  icon: string;
  color: string;
}

export function DocumentCategories() {
  const [categories] = useState<Category[]>([
    {
      id: "1",
      name: "Manuais",
      description: "Manuais técnicos e de operação de equipamentos",
      documentCount: 15,
      icon: "file-text",
      color: "blue"
    },
    {
      id: "2",
      name: "Relatórios",
      description: "Relatórios mensais, anuais e específicos",
      documentCount: 28,
      icon: "file-text",
      color: "green"
    },
    {
      id: "3",
      name: "Planilhas",
      description: "Planilhas de controle e gestão",
      documentCount: 12,
      icon: "file-spreadsheet",
      color: "purple"
    },
    {
      id: "4",
      name: "Imagens",
      description: "Fotos e imagens das operações",
      documentCount: 45,
      icon: "image",
      color: "orange"
    },
    {
      id: "5",
      name: "Contratos",
      description: "Contratos de prestação de serviços",
      documentCount: 8,
      icon: "file",
      color: "red"
    }
  ]);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "file-text":
        return <FileText className="w-8 h-8" />;
      case "image":
        return <Image className="w-8 h-8" />;
      case "file-spreadsheet":
        return <FileSpreadsheet className="w-8 h-8" />;
      default:
        return <File className="w-8 h-8" />;
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-600 bg-blue-50 border-blue-200",
      green: "text-green-600 bg-green-50 border-green-200",
      purple: "text-purple-600 bg-purple-50 border-purple-200",
      orange: "text-orange-600 bg-orange-50 border-orange-200",
      red: "text-red-600 bg-red-50 border-red-200"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header com ação */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Categorias de Documentos</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie as categorias para organizar seus documentos
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <FolderPlus className="w-4 h-4" />
              Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Categoria</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="categoryName">Nome da Categoria</Label>
                <Input id="categoryName" placeholder="Ex: Certificados" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoryDescription">Descrição</Label>
                <Textarea 
                  id="categoryDescription" 
                  placeholder="Descrição da categoria..."
                  rows={3}
                />
              </div>
              <Button className="w-full">Criar Categoria</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid de Categorias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className={`border-2 ${getColorClasses(category.color)}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${getColorClasses(category.color)}`}>
                  {getIcon(category.icon)}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <FolderOpen className="w-3 h-3" />
                    {category.documentCount} documentos
                  </Badge>
                  <Button variant="outline" size="sm">
                    Ver Documentos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estatísticas Resumidas */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo das Categorias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{categories.length}</p>
              <p className="text-sm text-muted-foreground">Total de Categorias</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {categories.reduce((sum, cat) => sum + cat.documentCount, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total de Documentos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(categories.reduce((sum, cat) => sum + cat.documentCount, 0) / categories.length)}
              </p>
              <p className="text-sm text-muted-foreground">Média por Categoria</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {Math.max(...categories.map(cat => cat.documentCount))}
              </p>
              <p className="text-sm text-muted-foreground">Maior Categoria</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
