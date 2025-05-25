
import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface PDFSection {
  title: string;
  data: any[];
  columns: string[];
  headers: string[];
}

export const usePDFExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async (
    title: string,
    sections: PDFSection[],
    filename?: string
  ) => {
    setIsExporting(true);
    
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      let yPosition = 20;

      // Título principal
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text(title, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      // Data de geração
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(
        `Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`,
        pageWidth / 2,
        yPosition,
        { align: 'center' }
      );
      yPosition += 20;

      // Processar cada seção
      sections.forEach((section, sectionIndex) => {
        // Verificar se há espaço suficiente para o título da seção
        if (yPosition > pageHeight - 40) {
          doc.addPage();
          yPosition = 20;
        }

        // Título da seção
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(section.title, 20, yPosition);
        yPosition += 10;

        if (section.data.length === 0) {
          doc.setFontSize(10);
          doc.setFont('helvetica', 'italic');
          doc.text('Nenhum dado encontrado', 20, yPosition);
          yPosition += 15;
          return;
        }

        // Preparar dados para a tabela
        const tableData = section.data.map(item => 
          section.columns.map(col => {
            const value = item[col];
            if (value === null || value === undefined) return '-';
            if (typeof value === 'object') return JSON.stringify(value);
            return String(value);
          })
        );

        // Criar tabela
        doc.autoTable({
          head: [section.headers],
          body: tableData,
          startY: yPosition,
          styles: {
            fontSize: 8,
            cellPadding: 2,
          },
          headStyles: {
            fillColor: [66, 139, 202],
            textColor: 255,
            fontStyle: 'bold',
          },
          alternateRowStyles: {
            fillColor: [245, 245, 245],
          },
          margin: { left: 20, right: 20 },
          didDrawPage: (data: any) => {
            // Rodapé
            const pageNumber = doc.internal.getCurrentPageInfo().pageNumber;
            doc.setFontSize(8);
            doc.text(
              `Página ${pageNumber}`,
              pageWidth - 30,
              pageHeight - 10
            );
          },
        });

        yPosition = (doc as any).lastAutoTable.finalY + 15;
      });

      // Salvar PDF
      const finalFilename = filename || `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`;
      doc.save(finalFilename);

    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      throw error;
    } finally {
      setIsExporting(false);
    }
  };

  return { exportToPDF, isExporting };
};
