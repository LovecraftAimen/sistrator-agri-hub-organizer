
import { useState } from 'react';

export type ExportFormat = 'csv' | 'excel' | 'pdf';

interface ExportOptions {
  filename?: string;
  format: ExportFormat;
}

export const useDataExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportData = async (data: any[], options: ExportOptions) => {
    setIsExporting(true);
    
    try {
      const { filename = 'dados', format } = options;
      
      switch (format) {
        case 'csv':
          await exportToCSV(data, filename);
          break;
        case 'excel':
          await exportToExcel(data, filename);
          break;
        case 'pdf':
          await exportToPDF(data, filename);
          break;
      }
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
      throw error;
    } finally {
      setIsExporting(false);
    }
  };

  const exportToCSV = async (data: any[], filename: string) => {
    if (!data.length) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = async (data: any[], filename: string) => {
    // Implementação básica - em produção usaria uma biblioteca como SheetJS
    await exportToCSV(data, filename);
  };

  const exportToPDF = async (data: any[], filename: string) => {
    // Implementação básica - em produção usaria uma biblioteca como jsPDF
    const printContent = `
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            ${Object.keys(data[0] || {}).map(key => 
              `<th style="border: 1px solid #ddd; padding: 8px;">${key}</th>`
            ).join('')}
          </tr>
        </thead>
        <tbody>
          ${data.map(row => 
            `<tr>
              ${Object.values(row).map(value => 
                `<td style="border: 1px solid #ddd; padding: 8px;">${value}</td>`
              ).join('')}
            </tr>`
          ).join('')}
        </tbody>
      </table>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${filename}</title>
            <style>
              body { font-family: Arial, sans-serif; }
              table { margin: 20px 0; }
              th { background-color: #f5f5f5; font-weight: bold; }
            </style>
          </head>
          <body>
            <h1>${filename}</h1>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return { exportData, isExporting };
};
