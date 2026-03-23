import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchMotorcycles as fetchMotorcyclesFromApi } from '@/lib/motorcyclesApi.js';

const CatalogContext = createContext();

export function CatalogProvider({ children }) {
  const [motorcycles, setMotorcycles] = useState([]);
  const [filteredMotorcycles, setFilteredMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 200000,
    yearMin: 1900,
    yearMax: 2026,
    brand: '',
    mileageMax: 200000,
    status: 'disponível',
    fuel: '',
    type: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadMotorcycles() {
      try {
        setLoading(true);
        const records = await fetchMotorcyclesFromApi();
        setMotorcycles(records);
        setFilteredMotorcycles(records);
        setError(null);
      } catch (err) {
        console.error('Error fetching motorcycles:', err);
        setError('Erro ao carregar motos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }

    loadMotorcycles();
  }, []);

  useEffect(() => {
    let filtered = [...motorcycles];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((moto) =>
        moto.nome?.toLowerCase().includes(term) ||
        moto.modelo?.toLowerCase().includes(term) ||
        moto.marca?.toLowerCase().includes(term)
      );
    }

    filtered = filtered.filter(
      (moto) => moto.preco >= filters.priceMin && moto.preco <= filters.priceMax
    );

    filtered = filtered.filter(
      (moto) => moto.ano >= filters.yearMin && moto.ano <= filters.yearMax
    );

    if (filters.brand) {
      filtered = filtered.filter(
        (moto) => moto.marca?.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    if (filters.fuel) {
      filtered = filtered.filter(
        (moto) => moto.combustivel?.toLowerCase() === filters.fuel.toLowerCase()
      );
    }

    if (filters.type) {
      filtered = filtered.filter(
        (moto) => moto.tipo?.toLowerCase() === filters.type.toLowerCase()
      );
    }

    filtered = filtered.filter((moto) => {
      const mileageValue = Number(String(moto.quilometragem ?? 0).replace(/\D/g, ''));
      return mileageValue <= Number(filters.mileageMax);
    });

    if (filters.status) {
      filtered = filtered.filter((moto) => moto.status === filters.status);
    }

    setFilteredMotorcycles(filtered);
  }, [motorcycles, filters, searchTerm]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      priceMin: 0,
      priceMax: 200000,
      yearMin: 1900,
      yearMax: 2026,
      brand: '',
      mileageMax: 200000,
      status: '',
      fuel: '',
      type: ''
    });
    setSearchTerm('');
  };

  const value = {
    motorcycles,
    filteredMotorcycles,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    searchTerm,
    setSearchTerm
  };

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within CatalogProvider');
  }
  return context;
}