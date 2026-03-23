import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useCatalog } from '@/contexts/CatalogContext.jsx';

export default function FilterBar() {
  const { filters, updateFilters, resetFilters, motorcycles } = useCatalog();

  const brands = [...new Set(motorcycles.map((m) => m.marca).filter(Boolean))].sort();
  const fuels = [...new Set(motorcycles.map((m) => m.combustivel).filter(Boolean))].sort();
  const types = [...new Set(motorcycles.map((m) => m.tipo).filter(Boolean))].sort();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatMileage = (km) => {
    return new Intl.NumberFormat('pt-BR').format(km);
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6 space-y-6">
        <div>
          <Label className="text-sm font-medium mb-3 block">Preço</Label>
          <div className="space-y-2">
            <Slider
              min={0}
              max={200000}
              step={1000}
              value={[filters.priceMin, filters.priceMax]}
              onValueChange={([min, max]) => updateFilters({ priceMin: min, priceMax: max })}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatPrice(filters.priceMin)}</span>
              <span>{formatPrice(filters.priceMax)}</span>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-3 block">Ano</Label>
          <div className="grid grid-cols-2 gap-3">
            <Select
              value={filters.yearMin ? filters.yearMin.toString() : undefined}
              onValueChange={(value) => updateFilters({ yearMin: parseInt(value) })}
            >
              <SelectTrigger className="bg-background text-foreground">
                <SelectValue placeholder="De" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 30 }, (_, i) => 2026 - i).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.yearMax ? filters.yearMax.toString() : undefined}
              onValueChange={(value) => updateFilters({ yearMax: parseInt(value) })}
            >
              <SelectTrigger className="bg-background text-foreground">
                <SelectValue placeholder="Até" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 30 }, (_, i) => 2026 - i).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-3 block">Marca</Label>
          <Select
            value={filters.brand || undefined}
            onValueChange={(value) => updateFilters({ brand: value })}
          >
            <SelectTrigger className="bg-background text-foreground">
              <SelectValue placeholder="Todas as marcas" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {fuels.length > 0 && (
          <div>
            <Label className="text-sm font-medium mb-3 block">Combustível</Label>
            <Select
              value={filters.fuel || undefined}
              onValueChange={(value) => updateFilters({ fuel: value })}
            >
              <SelectTrigger className="bg-background text-foreground">
                <SelectValue placeholder="Todos os combustíveis" />
              </SelectTrigger>
              <SelectContent>
                {fuels.map((fuel) => (
                  <SelectItem key={fuel} value={fuel}>
                    {fuel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {types.length > 0 && (
          <div>
            <Label className="text-sm font-medium mb-3 block">Tipo</Label>
            <Select
              value={filters.type || undefined}
              onValueChange={(value) => updateFilters({ type: value })}
            >
              <SelectTrigger className="bg-background text-foreground">
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div>
          <Label className="text-sm font-medium mb-3 block">Quilometragem máxima</Label>
          <div className="space-y-2">
            <Slider
              min={0}
              max={200000}
              step={5000}
              value={[Number(filters.mileageMax) || 200000]}
              onValueChange={(value) => {
                const km = Number(value[0]);
                updateFilters({ mileageMax: km });
              }}
              className="mb-2"
            />
            <div className="text-sm text-muted-foreground text-right">
              {formatMileage(filters.mileageMax)} km
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-3 block">Status</Label>
          <Select
            value={filters.status || undefined}
            onValueChange={(value) => updateFilters({ status: value })}
          >
            <SelectTrigger className="bg-background text-foreground">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="disponível">Disponível</SelectItem>
              <SelectItem value="vendida">Vendida</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          className="w-full transition-colors duration-200 active:scale-[0.98]"
          onClick={resetFilters}
        >
          Limpar filtros
        </Button>
      </CardContent>
    </Card>
  );
}