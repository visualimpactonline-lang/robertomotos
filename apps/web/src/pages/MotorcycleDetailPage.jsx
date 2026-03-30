import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { Calendar, Gauge, Fuel, Bike, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';
import MotorcycleCard from '@/components/MotorcycleCard.jsx';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { generateMotorcycleWhatsAppLink } from '@/lib/whatsappUtils.js';
import { fetchMotorcycleById, fetchSimilarMotorcycles, getMotorcycleImageUrl } from '@/lib/motorcyclesApi.js';

export default function MotorcycleDetailPage() {
  const { id } = useParams();
  const [motorcycle, setMotorcycle] = useState(null);
  const [similarMotorcycles, setSimilarMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    async function fetchMotorcycle() {
      try {
        setLoading(true);
        const record = await fetchMotorcycleById(id);
        setMotorcycle(record);

        if (record) {
          const similar = await fetchSimilarMotorcycles(record);
          setSimilarMotorcycles(similar);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching motorcycle:', err);
        setError('Erro ao carregar moto. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }

    fetchMotorcycle();
  }, [id]);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-[4/3] rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-16 w-1/2" />
              <Skeleton className="h-32" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !motorcycle) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Moto não encontrada</h2>
          <Link to="/catalogo">
            <Button className="bg-primary hover:bg-primary-dark text-white">
              Voltar ao catálogo
            </Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const images = motorcycle.imagens && motorcycle.imagens.length > 0
    ? motorcycle.imagens.map((img) => getMotorcycleImageUrl(img))
    : ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop'];

  const specs = [
    { icon: Calendar, label: 'Ano', value: motorcycle.ano },
    { icon: Gauge, label: 'Quilometragem', value: `${formatMileage(motorcycle.quilometragem)} km` },
    { icon: Fuel, label: 'Combustível', value: motorcycle.combustivel || 'Gasolina' },
    { icon: Bike, label: 'Tipo', value: motorcycle.tipo || 'Esportiva' }
  ];

  return (
    <>
      <Helmet>
        <title>{`${motorcycle.nome} ${motorcycle.modelo} - Roberto Motos`}</title>
        <meta name="description" content={`${motorcycle.nome} ${motorcycle.modelo} ${motorcycle.ano} - ${formatPrice(motorcycle.preco)}. ${motorcycle.descricao || 'Moto revisada com procedência garantida.'}`} />
      </Helmet>

      <Header />
      <FloatingWhatsAppButton />

      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/catalogo" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao catálogo
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                  <div className="flex">
                    {images.map((image, index) => (
                      <div key={index} className="flex-[0_0_100%] min-w-0">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img src={image} alt={`${motorcycle.nome} ${motorcycle.modelo}`} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {images.length > 1 && (
                  <>
                    <Button variant="outline" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80" onClick={scrollPrev}>
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80" onClick={scrollNext}>
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </>
                )}

                {motorcycle.status === 'vendida' && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      VENDIDA
                    </Badge>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2" style={{ letterSpacing: '-0.02em' }}>
                  {motorcycle.nome}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {motorcycle.modelo}
                </p>
              </div>

              <div className="text-5xl font-bold text-primary" style={{ letterSpacing: '-0.02em' }}>
                {formatPrice(motorcycle.preco)}
              </div>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Especificações técnicas
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {specs.map((spec, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <spec.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{spec.label}</p>
                          <p className="font-semibold text-foreground">{spec.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {motorcycle.descricao && (
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Descrição
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {motorcycle.descricao}
                    </p>
                  </CardContent>
                </Card>
              )}

              <a
                href={generateMotorcycleWhatsAppLink(`${motorcycle.nome} ${motorcycle.modelo}`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white transition-all duration-200 active:scale-[0.98]"
                  disabled={motorcycle.status === 'vendida'}
                >
                  Falar no WhatsApp sobre esta moto
                </Button>
              </a>
            </motion.div>
          </div>

          {similarMotorcycles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-20"
            >
              <h2 className="text-3xl font-bold text-foreground mb-8" style={{ letterSpacing: '-0.02em' }}>
                Motos similares
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarMotorcycles.map((moto) => (
                  <MotorcycleCard key={moto.id} motorcycle={moto} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
