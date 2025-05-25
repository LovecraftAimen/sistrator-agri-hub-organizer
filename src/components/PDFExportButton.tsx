
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Download } from "lucide-react";
import { usePDFExport } from "@/hooks/usePDFExport";
import { useToast } from "@/hooks/use-toast";

interface PDFSection {
  title: string;
  data: any[];
  columns: string[];
  headers: string[];
}

interface PDFExportButtonProps {
  title: string;
  sections: PDFSection[];
  filename?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  className?: string;
}

export const PDFExportButton = ({
  title,
  sections,
  filename,
  variant = "outline",
  size = "sm",
  className,
}: PDFExportButtonProps) => {
  const { exportToPDF, isExporting } = usePDFExport();
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      await exportToPDF(title, sections, filename);
      
      toast({
        title: "PDF exportado",
        description: "O arquivo foi baixado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro na exportação",
        description: "Não foi possível gerar o PDF. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleExport}
      disabled={isExporting}
      className={className}
    >
      {isExporting ? (
        <LoadingSpinner size="sm" text="" className="mr-2" />
      ) : (
        <Download className="w-4 h-4 mr-2" />
      )}
      Exportar PDF
    </Button>
  );
};
