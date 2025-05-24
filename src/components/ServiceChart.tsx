
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const serviceData = [
  { month: "Jan", aracoes: 45, gradagens: 32, total: 77 },
  { month: "Fev", aracoes: 52, gradagens: 38, total: 90 },
  { month: "Mar", aracoes: 48, gradagens: 42, total: 90 },
  { month: "Abr", aracoes: 61, gradagens: 45, total: 106 },
  { month: "Mai", aracoes: 55, gradagens: 49, total: 104 },
  { month: "Jun", aracoes: 67, gradagens: 52, total: 119 },
];

export function ServiceChart() {
  return (
    <Card className="col-span-2 card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Serviços por Mês</span>
        </CardTitle>
        <CardDescription>
          Comparativo de arações e gradagens realizadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={serviceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Bar 
              dataKey="aracoes" 
              fill="hsl(142 76% 36%)" 
              name="Arações"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="gradagens" 
              fill="hsl(142 76% 60%)" 
              name="Gradagens"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
