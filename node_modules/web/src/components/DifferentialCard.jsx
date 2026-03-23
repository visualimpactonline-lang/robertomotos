
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function DifferentialCard({ icon: Icon, title, description }) {
  return (
    <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 h-full">
      <CardContent className="p-6">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
