
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

export default function TestimonialCard({ name, text, photo, initials }) {
  return (
    <Card className="bg-card border-border h-full">
      <CardContent className="p-6">
        <Quote className="w-10 h-10 text-primary/20 mb-4" />
        <p className="text-foreground leading-relaxed mb-6 text-balance">
          {text}
        </p>
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 rounded-xl">
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback className="rounded-xl bg-primary/10 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">Cliente Roberto Motos</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
