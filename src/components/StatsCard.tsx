
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    type: "increase" | "decrease" | "neutral";
    period?: string;
  };
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
  icon?: React.ReactNode;
  className?: string;
}

export const StatsCard = ({
  title,
  value,
  description,
  trend,
  badge,
  icon,
  className
}: StatsCardProps) => {
  const getTrendIcon = (type: "increase" | "decrease" | "neutral") => {
    switch (type) {
      case "increase":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "decrease":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (type: "increase" | "decrease" | "neutral") => {
    switch (type) {
      case "increase":
        return "text-green-600";
      case "decrease":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="flex items-center gap-2">
          {badge && (
            <Badge variant={badge.variant || "default"} className="text-xs">
              {badge.text}
            </Badge>
          )}
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground">
            {value}
          </div>
          
          <div className="flex items-center justify-between">
            {description && (
              <p className="text-xs text-muted-foreground flex-1">
                {description}
              </p>
            )}
            
            {trend && (
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium",
                getTrendColor(trend.type)
              )}>
                {getTrendIcon(trend.type)}
                <span>
                  {trend.value > 0 ? "+" : ""}{trend.value}%
                </span>
                {trend.period && (
                  <span className="text-muted-foreground">
                    {trend.period}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
