
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  className = "" 
}: MetricCardProps) {
  const isMobile = useIsMobile();

  return (
    <Card className={`card-hover ${className}`}>
      <CardHeader className={`flex flex-row items-center justify-between space-y-0 ${isMobile ? 'pb-1 px-4 pt-4' : 'pb-2 px-6 pt-6'}`}>
        <CardTitle className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-muted-foreground`}>
          {title}
        </CardTitle>
        <Icon className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-muted-foreground`} />
      </CardHeader>
      <CardContent className={isMobile ? 'px-4 pb-4' : 'px-6 pb-6'}>
        <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-foreground`}>{value}</div>
        <div className={`flex items-center gap-2 ${isMobile ? 'mt-0.5' : 'mt-1'}`}>
          {description && (
            <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-muted-foreground truncate`}>{description}</p>
          )}
          {trend && (
            <Badge 
              variant={trend.isPositive ? "default" : "destructive"}
              className={isMobile ? 'text-xs px-1 py-0' : 'text-xs'}
            >
              {trend.isPositive ? "+" : ""}{trend.value}%
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
