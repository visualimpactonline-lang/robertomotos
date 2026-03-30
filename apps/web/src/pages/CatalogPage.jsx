
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';
import FilterBar from '@/components/FilterBar.jsx';
import SearchBar from '@/components/SearchBar.jsx';
import MotorcycleCard from '@/components/MotorcycleCard.jsx';
import { CatalogProvider, useCatalog } from '@/contexts/CatalogContext.jsx';

function CatalogContent() {
  const { filteredMotorcycles, loading } = useCatalog();

  return (
    <>
      <section className="py-12 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ letterSpacing: '-0.02em' }}>
              Catálogo de motos
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Encontre a moto perfeita para você. Use os filtros para refinar sua busca.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <SearchBar />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <FilterBar />
              </div>
            </aside>

            <div className="lg:col-span-3">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card rounded-2xl p-6 space-y-4 border border-border">
                      <div className="aspect-[4/3] bg-muted rounded-xl animate-pulse" />
                      <div className="h-6 bg-muted rounded animate-pulse" />
                      <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                      <div className="h-10 bg-muted rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : filteredMotorcycles.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🏍️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Nenhuma moto encontrada
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Tente ajustar os filtros ou fazer uma nova busca
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 text-sm text-muted-foreground">
                    {filteredMotorcycles.length} {filteredMotorcycles.length === 1 ? 'moto encontrada' : 'motos encontradas'}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredMotorcycles.map((motorcycle, index) => (
                      <motion.div
                        key={motorcycle.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <MotorcycleCard motorcycle={motorcycle} />
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function CatalogPage() {
  return (
    <CatalogProvider>
      <Helmet>
        <title>Catálogo de Motos - Roberto Motos</title>
        <meta name="description" content="Confira nosso catálogo completo de motos. Motos revisadas com procedência garantida e preços competitivos." />
      </Helmet>

      <Header />
      <FloatingWhatsAppButton />
      <CatalogContent />
      <Footer />
    </CatalogProvider>
  );
}
