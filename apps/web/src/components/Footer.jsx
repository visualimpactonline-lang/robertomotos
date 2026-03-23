import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Clock, Instagram, MessageCircle } from 'lucide-react';import {
  ADDRESS_LABEL,
  CONTACT_PHONE_PRIMARY,
  CONTACT_PHONE_SECONDARY,
  GOOGLE_MAPS_LINK,
  LOGO_PATH,
  WHATSAPP_LINK,
  COMPANY_NAME
} from '@/lib/siteConfig.js';
import { unlockAdmin } from '@/lib/adminUnlock.js';

export default function Footer() {
  const navigate = useNavigate();
  const [tapCount, setTapCount] = useState(0);

  function handleSecretAdminAccess() {
    const nextCount = tapCount + 1;
    if (nextCount >= 7) {
      unlockAdmin();
      setTapCount(0);
      navigate('/admin');
      return;
    }
    setTapCount(nextCount);
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* LOGO + NOME */}
          <div>
            <button
              type="button"
              onClick={handleSecretAdminAccess}
              className="flex items-center gap-3 mb-4 text-left"
            >
              <img
                src={LOGO_PATH}
                alt={COMPANY_NAME}
                className="h-12 md:h-14 w-auto object-contain"
              />

              <div className="leading-tight">
                <h2 className="text-white font-semibold">
                  RP Motos
                </h2>
              </div>
            </button>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Motos revisadas com qualidade e procedência garantida.
            </p>
          </div>

          <div>
            <span className="text-sm font-semibold text-foreground mb-4 block">
              Endereço
            </span>
            <div className="space-y-3">
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{ADDRESS_LABEL}</span>
              </a>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold text-foreground mb-4 block">
              Contato
            </span>
            <div className="space-y-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                <span>{CONTACT_PHONE_PRIMARY}</span>
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                <span>{CONTACT_PHONE_SECONDARY}</span>
              </a>

              {/* INSTAGRAM CORRIGIDO */}
              <a
                href="https://www.instagram.com/rp_motos1?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Instagram className="w-4 h-4" />
                <span>@rp_motos1</span>
              </a>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold text-foreground mb-4 block">
              Horário de funcionamento
            </span>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Seg-Sex: 9h-18h</p>
                  <p>Sábado: 9h-14h</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 RP Motos. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link to="/privacidade" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              Termos de Serviço
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}