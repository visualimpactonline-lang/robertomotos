
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Gauge } from 'lucide-react';
import { getMotorcycleImageUrl } from '@/lib/motorcyclesApi.js';

export default function MotorcycleCard({ motorcycle }) {
  const imageUrl = motorcycle.imagens && motorcycle.imagens.length > 0
    ? getMotorcycleImageUrl(motorcycle.imagens[0])
    : 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=300&fit=crop';

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
    <Card className="group overflow-hidden bg-card border-border hover:shadow-premium transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={`${motorcycle.nome} ${motorcycle.modelo}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {motorcycle.status === 'vendida' && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              VENDIDA
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1 text-foreground">
            {motorcycle.nome}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {motorcycle.modelo}
          </p>
          
          <div className="text-3xl font-bold text-primary mb-4" style={{ letterSpacing: '-0.02em' }}>
            {formatPrice(motorcycle.preco)}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{motorcycle.ano}</span>
            </div>
            <div className="flex items-center gap-1">
              <Gauge className="w-4 h-4" />
              <span>{formatMileage(motorcycle.quilometragem)} km</span>
            </div>
          </div>
        </div>
        
        <Link to={`/moto/${motorcycle.id}`} className="mt-auto">
          <Button 
            className="w-full bg-primary hover:bg-primary-dark text-white transition-colors duration-200 active:scale-[0.98]"
            disabled={motorcycle.status === 'vendida'}
          >
            Ver detalhes
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
