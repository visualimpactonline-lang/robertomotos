
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Missão',
      description: 'Oferecer motos de qualidade com procedência garantida, proporcionando segurança e satisfação aos nossos clientes.'
    },
    {
      icon: Eye,
      title: 'Visão',
      description: 'Ser referência no mercado de motos usadas, reconhecida pela excelência no atendimento e confiabilidade.'
    },
    {
      icon: Award,
      title: 'Valores',
      description: 'Transparência, qualidade, compromisso com o cliente e responsabilidade em todas as nossas negociações.'
    },
    {
      icon: Users,
      title: 'Equipe',
      description: 'Profissionais especializados e apaixonados por motos, prontos para ajudar você a fazer a melhor escolha.'
    }
  ];

  const differentials = [
    'Todas as motos passam por revisão completa',
    'Documentação verificada e regularizada',
    'Garantia de procedência',
    'Facilidade no financiamento',
    'Atendimento personalizado',
    'Pós-venda de qualidade'
  ];

  return (
    <>
      <Helmet>
        <title>Sobre a RP Motos - Nossa história e valores</title>
        <meta name="description" content="Conheça a RP Motos, nossa história, missão, visão e valores. Compromisso com qualidade e satisfação do cliente." />
      </Helmet>

      <Header />
      <FloatingWhatsAppButton />

      <section className="py-12 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ letterSpacing: '-0.02em' }}>
              Sobre a RP Motos
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Conheça nossa história e nosso compromisso com você
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" style={{ letterSpacing: '-0.02em' }}>
                Nossa história
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A RP Motos nasceu da paixão por motocicletas e do desejo de oferecer ao mercado uma opção confiável para quem busca motos usadas de qualidade.
                </p>
                <p>
                  Com anos de experiência no mercado, construímos nossa reputação baseada em três pilares fundamentais: qualidade, procedência e atendimento diferenciado.
                </p>
                <p>
                  Cada moto que passa pela RP Motos é cuidadosamente selecionada, revisada e preparada para oferecer a melhor experiência ao novo proprietário. Nossa equipe de especialistas garante que você está fazendo um investimento seguro.
                </p>
                <p>
                  Hoje, somos referência em Piracicaba quando o assunto é compra de motos usadas com garantia de procedência e qualidade.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-premium">
                <img 
                  src="/pedrinho.jpg" 
                  alt="Showroom RP Motos"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ letterSpacing: '-0.02em' }}>
              Missão, visão e valores
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Os princípios que guiam nosso trabalho
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-background border-border h-full">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <div className="aspect-video rounded-2xl overflow-hidden shadow-premium">
                <img 
                  src="https://images.unsplash.com/photo-1558981806-ec527fa84c39" 
                  alt="Motos RP Motos"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" style={{ letterSpacing: '-0.02em' }}>
                Nossos diferenciais
              </h2>
              <div className="space-y-3">
                {differentials.map((differential, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-foreground">{differential}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
