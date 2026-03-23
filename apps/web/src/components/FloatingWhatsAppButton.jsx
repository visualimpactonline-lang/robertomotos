import React from 'react';
import { MessageCircleMore } from 'lucide-react';
import { generateDefaultWhatsAppLink } from '@/lib/whatsappUtils.js';

export default function FloatingWhatsAppButton() {
  return (
    <a
      href={generateDefaultWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative flex items-center justify-center">

        {/* círculo pulsando */}
        <span className="absolute w-16 h-16 rounded-full bg-[#25D366] opacity-40 animate-ping"></span>

        {/* botão principal */}
        <div className="rounded-full w-16 h-16 bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-[0.98] z-10">
          <MessageCircleMore className="w-7 h-7 text-white" strokeWidth={2.3} />
        </div>
      </div>

      {/* tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Fale conosco no WhatsApp
      </span>
    </a>
  );
}