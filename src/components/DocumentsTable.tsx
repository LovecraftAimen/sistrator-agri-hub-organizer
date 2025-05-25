
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  Search, 
  Download, 
  Eye, 
  Trash2,
  FileText,
  Image,
  FileSpreadsheet,
  File
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  size: string;
  uploadDate: string;
  uploadedBy: string;
  description: string;
}

export function DocumentsTable() {
  const [documents] = useState<Document[]>([
    {
      id: "1",
      name: "Manual do Operador - Trator MT500",
      type: "pdf",
      category: "Manuais",
      size: "2.5 MB",
      uploadDate: "2024-01-15",
      uploadedBy: "João Silva",
      description: "Manual completo de operação do trator modelo MT500"
    },
    {
      id: "2",
      name: "Relatório Mensal - Dezembro 2023",
      type: "pdf",
      category: "Relatórios",
      size: "1.8 MB",
      uploadDate: "2024-01-10",
      uploadedBy: "Maria Santos",
      description: "Relatório mensal de atividades e serviços realizados"
    },
    {
      id: "3",
      name: "Planilha de Custos 2024",
      type: "xlsx",
      category: "Planilhas",
      size: "145 KB",
      uploadDate: "2024-01-08",
      uploadedBy: "Pedro Costa",
      description: "Planilha de controle de custos operacionais"
    },
    {
      id: "4",
      name: "Foto - Área Plantio Norte",
      type: "jpg",
      category: "Imagens",
      size: "3.2 MB",
      uploadDate: "2024-01-05",
      uploadedBy: "Ana Lima",
      description: "Registro fotográfico da área de plantio norte"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    const matchesType = selectedType === "all" || doc.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-4 h-4 text-red-600" />;
      case "jpg":
      case "png":
        return <Image className="w-4 h-4 text-blue-600" />;
      case "xlsx":
      case "xls":
        return <FileSpreadsheet className="w-4 h-4 text-green-600" />;
      default:
        return <File className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      "Manuais": "bg-blue-100 text-blue-800",
      "Relatórios": "bg-green-100 text-green-800",
      "Planilhas": "bg-purple-100 text-purple-800",
      "Imagens": "bg-orange-100 text-orange-800",
      "Contratos": "bg-red-100 text-red-800"
    };
    return (
      <Badge variant="outline" className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
        {category}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filtros e Ações */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="Manuais">Manuais</SelectItem>
              <SelectItem value="Relatórios">Relatórios</SelectItem>
              <SelectItem value="Planilhas">Planilhas</SelectItem>
              <SelectItem value="Imagens">Imagens</SelectItem>
              <SelectItem value="Contratos">Contratos</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="xlsx">Excel</SelectItem>
              <SelectItem value="jpg">Imagem</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Documento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Upload de Documento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Arquivo</Label>
                <Input id="file" type="file" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manuais">Manuais</SelectItem>
                    <SelectItem value="relatorios">Relatórios</SelectItem>
                    <SelectItem value="planilhas">Planilhas</SelectItem>
                    <SelectItem value="imagens">Imagens</SelectItem>
                    <SelectItem value="contratos">Contratos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description" 
                  placeholder="Descrição do documento"
                  rows={3}
                />
              </div>
              <Button className="w-full">Fazer Upload</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabela de Documentos */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead>Data Upload</TableHead>
                <TableHead>Enviado por</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getCategoryBadge(doc.category)}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>{doc.uploadDate}</TableCell>
                  <TableCell>{doc.uploadedBy}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nenhum documento encontrado</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
