
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  MapPin,
  User,
  Tractor
} from "lucide-react";
import type { Service } from "./ServicesTable";

interface ScheduleCalendarProps {
  services: Service[];
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  onServiceClick: (service: Service) => void;
}

export function ScheduleCalendar({ 
  services, 
  selectedDate, 
  onDateSelect, 
  onServiceClick 
}: ScheduleCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getServicesForDate = (date: Date) => {
    return services.filter(service => {
      const serviceDate = new Date(service.dataAgendamento);
      return serviceDate.toDateString() === date.toDateString();
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em execução":
        return "bg-blue-100 text-blue-800";
      case "Agendado":
        return "bg-yellow-100 text-yellow-800";
      case "Concluído":
        return "bg-green-100 text-green-800";
      case "Cancelado":
        return "bg-red-100 text-red-800";
      case "Pausado":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const daysWithServices = services.reduce((acc, service) => {
    const date = new Date(service.dataAgendamento);
    const dateKey = date.toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  const modifiers = {
    hasServices: Object.keys(daysWithServices).map(date => new Date(date))
  };

  const modifiersStyles = {
    hasServices: {
      backgroundColor: 'rgb(34 197 94 / 0.1)',
      border: '1px solid rgb(34 197 94 / 0.3)',
      borderRadius: '6px'
    }
  };

  const selectedDateServices = selectedDate ? getServicesForDate(selectedDate) : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Calendário de Agendamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-md border w-full"
          />
          <div className="mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-100 border border-green-300"></div>
              <span>Dias com agendamentos</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de serviços do dia selecionado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {selectedDate 
              ? `Agendamentos - ${selectedDate.toLocaleDateString('pt-BR')}` 
              : 'Selecione uma data'
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDate ? (
            selectedDateServices.length > 0 ? (
              <div className="space-y-3">
                {selectedDateServices
                  .sort((a, b) => a.inicioEstimado.localeCompare(b.inicioEstimado))
                  .map((service) => (
                    <div
                      key={service.id}
                      className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                      onClick={() => onServiceClick(service)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{formatTime(service.inicioEstimado)}</span>
                          <Badge className={getStatusColor(service.status)}>
                            {service.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3 text-muted-foreground" />
                          <span>{service.beneficiario}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Tractor className="w-3 h-3 text-muted-foreground" />
                          <span>{service.tipo} - {service.area}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="truncate">{service.endereco}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum agendamento para esta data</p>
              </div>
            )
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Selecione uma data para ver os agendamentos</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
