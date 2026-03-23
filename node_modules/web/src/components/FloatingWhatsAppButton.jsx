
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { generateDefaultWhatsAppLink } from '@/lib/whatsappUtils.js';

export default function FloatingWhatsAppButton() {
  return (
    <a
      href={generateDefaultWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <Button
        size="lg"
        className="rounded-full w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-premium transition-all duration-300 hover:scale-110 active:scale-[0.98]"
      >
        <MessageCircle className="w-7 h-7" />
      </Button>
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-background text-foreground px-3 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Fale conosco no WhatsApp
      </span>
    </a>
  );
}
