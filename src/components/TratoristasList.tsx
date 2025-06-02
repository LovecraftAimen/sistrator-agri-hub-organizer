import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Edit, Phone, MapPin, Calendar, Clock, Trash2 } from "lucide-react";
import type { Tratorista } from "@/pages/Tratoristas";

interface TratoristaListProps {
  tratoristas: Tratorista[];
  onView: (tratorista: Tratorista) => void;
  onEdit: (tratorista: Tratorista) => void;
  onDelete: (tratorista: Tratorista) => void;
}

export const TratoristasList = ({ tratoristas, onView, onEdit, onDelete }: TratoristaListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inativo':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'licenca':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'Ativo';
      case 'inativo':
        return 'Inativo';
      case 'licenca':
        return 'Em Licença';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (tratoristas.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              Nenhum tratorista encontrado
            </h3>
            <p className="text-sm text-muted-foreground">
              Comece cadastrando o primeiro tratorista do sistema.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tratoristas.map((tratorista) => (
        <Card key={tratorista.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{tratorista.nome}</h3>
                <p className="text-sm text-muted-foreground mb-2">CNH: {tratorista.cnh}</p>
                <Badge className={getStatusColor(tratorista.status)}>
                  {getStatusText(tratorista.status)}
                </Badge>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                {tratorista.telefone}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {tratorista.endereco}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Experiência: {tratorista.experiencia}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {tratorista.horasTrabalhadas}h trabalhadas
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Especialidades:</p>
              <div className="flex flex-wrap gap-1">
                {tratorista.especialidades.slice(0, 3).map((especialidade, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {especialidade}
                  </Badge>
                ))}
                {tratorista.especialidades.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{tratorista.especialidades.length - 3}
                  </Badge>
                )}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                <strong>Disponibilidade:</strong> {tratorista.disponibilidade}
              </p>
            </div>

            <div className="text-xs text-muted-foreground mb-4">
              Cadastrado em: {formatDate(tratorista.dataCadastro)}
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => onView(tratorista)}
              >
                <Eye className="w-4 h-4 mr-1" />
                Ver
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => onEdit(tratorista)}
              >
                <Edit className="w-4 h-4 mr-1" />
                Editar
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => onDelete(tratorista)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
