
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useCatalog } from '@/contexts/CatalogContext.jsx';

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useCatalog();

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Buscar por nome, modelo ou marca..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 bg-background text-foreground border-border"
      />
    </div>
  );
}
