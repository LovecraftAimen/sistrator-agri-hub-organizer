
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, X, Search, RotateCcw } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FilterOption {
  key: string;
  label: string;
  type: "text" | "select" | "date";
  options?: { value: string; label: string }[];
}

interface AdvancedFiltersProps {
  filters: FilterOption[];
  onFiltersChange: (filters: Record<string, any>) => void;
  activeFilters: Record<string, any>;
}

export const AdvancedFilters = ({ 
  filters, 
  onFiltersChange, 
  activeFilters 
}: AdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(activeFilters);

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    if (!value) delete newFilters[key];
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
  };

  const clearFilters = () => {
    setLocalFilters({});
    onFiltersChange({});
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtros Avançados
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filters.map((filter) => (
                    <div key={filter.key} className="space-y-2">
                      <Label htmlFor={filter.key}>{filter.label}</Label>
                      {filter.type === "text" && (
                        <Input
                          id={filter.key}
                          value={localFilters[filter.key] || ""}
                          onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                          placeholder={`Filtrar por ${filter.label.toLowerCase()}`}
                        />
                      )}
                      {filter.type === "select" && filter.options && (
                        <Select
                          value={localFilters[filter.key] || ""}
                          onValueChange={(value) => handleFilterChange(filter.key, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={`Selecionar ${filter.label.toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {filter.options.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {filter.type === "date" && (
                        <Input
                          id={filter.key}
                          type="date"
                          value={localFilters[filter.key] || ""}
                          onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-4 border-t">
                  <Button onClick={applyFilters} className="gap-2">
                    <Search className="w-4 h-4" />
                    Aplicar Filtros
                  </Button>
                  <Button variant="outline" onClick={clearFilters} className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Limpar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => {
            const filter = filters.find(f => f.key === key);
            if (!filter || !value) return null;
            
            return (
              <Badge key={key} variant="secondary" className="gap-1">
                {filter.label}: {value}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-1"
                  onClick={() => {
                    const newFilters = { ...activeFilters };
                    delete newFilters[key];
                    onFiltersChange(newFilters);
                  }}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};
