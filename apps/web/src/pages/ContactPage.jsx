import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, Send } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { generateWhatsAppLink } from '@/lib/whatsappUtils.js';
import { ADDRESS_LABEL, CONTACT_PHONE_PRIMARY, CONTACT_PHONE_SECONDARY, GOOGLE_MAPS_LINK } from '@/lib/siteConfig.js';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast({
        title: 'Mensagem enviada',
        description: 'Entraremos em contato em breve.'
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Endereço',
      content: ADDRESS_LABEL,
      link: GOOGLE_MAPS_LINK
    },
    {
      icon: Phone,
      title: 'Telefone principal',
      content: CONTACT_PHONE_PRIMARY,
      link: generateWhatsAppLink()
    },
    {
      icon: Phone,
      title: 'Telefone secundário',
      content: CONTACT_PHONE_SECONDARY,
      link: generateWhatsAppLink()
    },
    {
      icon: Clock,
      title: 'Horário',
      content: 'Seg-Sex: 9h-18h\nSábado: 9h-14h'
    },
    {
      icon: Mail,
      title: 'E-mail',
      content: 'contato@rpmotos.com.br',
      link: 'mailto:contato@rpmotos.com.br'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contato - RP Motos</title>
        <meta name="description" content="Entre em contato com a RP Motos. Estamos prontos para ajudar você a encontrar a moto ideal." />
      </Helmet>

      <Header />
      <FloatingWhatsAppButton />

      <section className="py-12 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ letterSpacing: '-0.02em' }}>
              Entre em contato
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Estamos prontos para ajudar você a encontrar a moto ideal
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="bg-card border-border">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Envie sua mensagem</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="name" className="text-foreground">Nome completo</Label>
                        <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="mt-2 bg-background text-foreground border-border" placeholder="Seu nome" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="email" className="text-foreground">E-mail</Label>
                          <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="mt-2 bg-background text-foreground border-border" placeholder="seu@email.com" />
                        </div>

                        <div>
                          <Label htmlFor="phone" className="text-foreground">Telefone</Label>
                          <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="mt-2 bg-background text-foreground border-border" placeholder={CONTACT_PHONE_PRIMARY} />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-foreground">Mensagem</Label>
                        <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows={6} className="mt-2 bg-background text-foreground border-border resize-none" placeholder="Como podemos ajudar você?" />
                      </div>

                      <Button type="submit" size="lg" disabled={loading} className="w-full bg-primary hover:bg-primary-dark text-white transition-all duration-200 active:scale-[0.98]">
                        {loading ? 'Enviando...' : (
                          <>
                            Enviar mensagem
                            <Send className="ml-2 w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <Card className="bg-card border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                          {info.link ? (
                            <a href={info.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-200 whitespace-pre-line">
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-muted-foreground whitespace-pre-line">{info.content}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white transition-all duration-200 active:scale-[0.98]">
                    Falar no WhatsApp
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-12">
            <a href={GOOGLE_MAPS_LINK} target="_blank" rel="noopener noreferrer">
              <Card className="bg-card border-border overflow-hidden">
                <div className="aspect-[21/9] bg-muted flex items-center justify-center">
                  <div className="text-center px-6">
                    <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
                    <p className="text-xl font-semibold text-foreground mb-2">Abrir localização no Google Maps</p>
                    <p className="text-muted-foreground">{ADDRESS_LABEL}</p>
                  </div>
                </div>
              </Card>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
