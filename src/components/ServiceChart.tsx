
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Dados simulados com datas infinitas
const generateServiceData = () => {
  const data = [];
  const currentDate = new Date();
  
  // Gerar dados para os últimos 12 meses
  for (let i = 11; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const month = format(date, "MMM", { locale: ptBR });
    
    data.push({
      month,
      date: date.toISOString(),
      aracoes: Math.floor(Math.random() * 30) + 30,
      gradagens: Math.floor(Math.random() * 25) + 25,
      total: 0
    });
  }
  
  // Calcular totais
  data.forEach(item => {
    item.total = item.aracoes + item.gradagens;
  });
  
  return data;
};

const serviceData = generateServiceData();

export function ServiceChart() {
  const isMobile = useIsMobile();

  return (
    <Card className="w-full card-hover">
      <CardHeader className={isMobile ? 'p-3 pb-2' : 'p-6 pb-4'}>
        <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-xl'}`}>
          <span>Serviços por Mês</span>
        </CardTitle>
        <CardDescription className={isMobile ? 'text-xs' : 'text-sm'}>
          Comparativo de arações e gradagens realizadas
        </CardDescription>
      </CardHeader>
      <CardContent className={isMobile ? 'p-3 pt-0' : 'p-6 pt-0'}>
        <div className="w-full overflow-hidden">
          <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
            <BarChart 
              data={serviceData} 
              margin={isMobile ? { top: 5, right: 10, left: 0, bottom: 5 } : { top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: isMobile ? 10 : 12 }}
                axisLine={false}
                interval={isMobile ? 1 : 0}
              />
              <YAxis 
                tick={{ fontSize: isMobile ? 10 : 12 }}
                axisLine={false}
                width={isMobile ? 25 : 40}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  fontSize: isMobile ? '12px' : '14px'
                }}
                formatter={(value, name) => [value, name === 'aracoes' ? 'Arações' : 'Gradagens']}
                labelFormatter={(label, payload) => {
                  if (payload && payload[0]) {
                    const date = new Date(payload[0].payload.date);
                    return format(date, "MMMM 'de' yyyy", { locale: ptBR });
                  }
                  return label;
                }}
              />
              <Bar 
                dataKey="aracoes" 
                fill="hsl(142 76% 36%)" 
                name="Arações"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="gradagens" 
                fill="hsl(142 76% 60%)" 
                name="Gradagens"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
