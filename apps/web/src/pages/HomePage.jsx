import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Wrench, CreditCard, Users, ArrowRight, Check } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';
import DifferentialCard from '@/components/DifferentialCard.jsx';
import MotorcycleCarousel from '@/components/MotorcycleCarousel.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import { generateDefaultWhatsAppLink } from '@/lib/whatsappUtils.js';
import { fetchFeaturedMotorcycles } from '@/lib/motorcyclesApi.js';

export default function HomePage() {
  const [featuredMotorcycles, setFeaturedMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedMotorcycles() {
      try {
        const records = await fetchFeaturedMotorcycles();
        setFeaturedMotorcycles(records);
      } catch (err) {
        console.error('Error fetching motorcycles:', err);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedMotorcycles();
  }, []);

  const differentials = [
    {
      icon: Wrench,
      title: 'Motos revisadas',
      description: 'Todas as motos passam por revisão completa antes da venda, garantindo segurança e qualidade.'
    },
    {
      icon: ShieldCheck,
      title: 'Procedência garantida',
      description: 'Documentação completa e verificada. Você compra com total tranquilidade e segurança.'
    },
    {
      icon: CreditCard,
      title: 'Facilidade no financiamento',
      description: 'Trabalhamos com as melhores instituições financeiras para facilitar sua compra.'
    },
    {
      icon: Users,
      title: 'Atendimento especializado',
      description: 'Nossa equipe está pronta para ajudar você a encontrar a moto ideal para suas necessidades.'
    }
  ];

  const testimonials = [
    {
      name: 'Lucas Silva',
      text: 'Comprei minha Yamaha na Roberto Motos e foi a melhor experiência. Atendimento impecável, moto revisada e preço justo. Recomendo!',
      initials: 'LS'
    },
    {
      name: 'Marina Santos',
      text: 'Excelente loja! A equipe é muito atenciosa e me ajudou a escolher a moto perfeita. Financiamento aprovado rapidamente.',
      initials: 'MS'
    },
    {
      name: 'Rafael Costa',
      text: 'Já é minha segunda moto comprada na Roberto Motos. Confiança total na procedência e qualidade. Sempre volto aqui!',
      initials: 'RC'
    },
    {
      name: 'Juliana Oliveira',
      text: 'Atendimento diferenciado e motos em perfeito estado. Comprei minha Honda e estou muito satisfeita com a compra.',
      initials: 'JO'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Roberto Motos</title>
        <meta
          name="description"
          content="Encontre sua próxima moto na Roberto Motos. Compra, venda, troca e financiamento com procedência garantida e atendimento rápido no WhatsApp."
        />
      </Helmet>

      <Header />
      <FloatingWhatsAppButton />

      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1686869571381-318f6b69d96d"
            alt="Motocicleta esportiva"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-5xl mx-auto leading-tight text-balance"
              style={{ letterSpacing: '-0.02em' }}
            >
              Compra, Venda, Troca e Financiamento de motos com procedência garantida
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Atendimento rápido e negociação facilitada direto no WhatsApp
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalogo">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-white px-10 py-7 text-lg transition-all duration-200 active:scale-[0.98]"
                >
                  Ver motos disponíveis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <a href={generateDefaultWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 px-10 py-7 text-lg transition-all duration-200 active:scale-[0.98]"
                >
                  Falar agora no WhatsApp
                </Button>
              </a>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-white/90">
              <div className="flex items-center gap-2 text-sm md:text-base">
                <Check className="w-4 h-4 text-primary" />
                <span>Motos revisadas</span>
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/40" />
              <div className="flex items-center gap-2 text-sm md:text-base">
                <Check className="w-4 h-4 text-primary" />
                <span>Procedência garantida</span>
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/40" />
              <div className="flex items-center gap-2 text-sm md:text-base">
                <Check className="w-4 h-4 text-primary" />
                <span>Atendimento rápido</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Por que escolher a Roberto Motos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compromisso com qualidade, segurança e satisfação do cliente
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentials.map((differential, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <DifferentialCard {...differential} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Motos em destaque
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Confira nossa seleção de motos disponíveis
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-background rounded-2xl p-6 space-y-4">
                  <div className="aspect-[4/3] bg-muted rounded-xl animate-pulse" />
                  <div className="h-6 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <MotorcycleCarousel motorcycles={featuredMotorcycles} />
          )}

          <div className="text-center mt-12">
            <Link to="/catalogo">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white transition-all duration-200 active:scale-[0.98]"
              >
                Ver todas as motos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              O que nossos clientes dizem
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Depoimentos de quem já comprou na Roberto Motos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ letterSpacing: '-0.02em' }}
            >
              Pronto para encontrar sua moto ideal?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Entre em contato conosco e descubra as melhores opções do mercado
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalogo">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 px-12 py-7 text-lg transition-all duration-200 active:scale-[0.98]"
                >
                  Ver catálogo completo
                </Button>
              </Link>

              <a href={generateDefaultWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-black text-white border-black hover:bg-black/90 px-12 py-7 text-lg transition-all duration-200 active:scale-[0.98]"
                >
                  Falar no WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}