import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Phone, MapPin, Calendar, Clock, FileText, User } from "lucide-react";
import type { TratoristaData } from "@/hooks/useTratoristasData";

interface TratoristaDetailsProps {
  tratorista: TratoristaData;
  onEdit: () => void;
}

export const TratoristaDetails = ({ tratorista, onEdit }: TratoristaDetailsProps) => {
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

  const isValidadeCnhProxima = () => {
    const hoje = new Date();
    const validadeCnh = new Date(tratorista.validade_cnh);
    const diffTime = validadeCnh.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90 && diffDays > 0;
  };

  const isCnhVencida = () => {
    const hoje = new Date();
    const validadeCnh = new Date(tratorista.validade_cnh);
    return validadeCnh < hoje;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header com informações principais */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">{tratorista.nome}</CardTitle>
                <p className="text-muted-foreground">CPF: {tratorista.cpf}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getStatusColor(tratorista.status)}>
                    {getStatusText(tratorista.status)}
                  </Badge>
                  {isCnhVencida() && (
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                      CNH Vencida
                    </Badge>
                  )}
                  {isValidadeCnhProxima() && !isCnhVencida() && (
                    <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                      CNH a Vencer
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button onClick={onEdit} className="gap-2">
              <Edit className="w-4 h-4" />
              Editar
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informações de Contato */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Telefone</label>
              <p className="text-lg">{tratorista.telefone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Endereço</label>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-muted-foreground" />
                {tratorista.endereco}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Documentação */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documentação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Número da CNH</label>
              <p className="text-lg">{tratorista.cnh}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Validade da CNH</label>
              <p className={`text-lg ${isCnhVencida() ? 'text-red-600' : isValidadeCnhProxima() ? 'text-orange-600' : ''}`}>
                {formatDate(tratorista.validade_cnh)}
                {isCnhVencida() && ' (Vencida)'}
                {isValidadeCnhProxima() && !isCnhVencida() && ' (Próxima ao vencimento)'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Experiência Profissional */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Experiência
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Tempo de Experiência</label>
              <p className="text-lg">{tratorista.experiencia}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Horas Trabalhadas</label>
              <p className="text-lg font-semibold text-primary">{tratorista.horas_trabalhadas}h</p>
            </div>
          </CardContent>
        </Card>

        {/* Disponibilidade */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Disponibilidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{tratorista.disponibilidade}</p>
          </CardContent>
        </Card>
      </div>

      {/* Especialidades */}
      <Card>
        <CardHeader>
          <CardTitle>Especialidades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tratorista.especialidades?.map((especialidade, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {especialidade}
              </Badge>
            ))}
            {(!tratorista.especialidades || tratorista.especialidades.length === 0) && (
              <p className="text-muted-foreground">Nenhuma especialidade cadastrada</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Observações */}
      {tratorista.observacoes && (
        <Card>
          <CardHeader>
            <CardTitle>Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {tratorista.observacoes}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Informações de Cadastro */}
      <Card>
        <CardHeader>
          <CardTitle>Informações de Cadastro</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Cadastrado em: {formatDate(tratorista.data_cadastro)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
