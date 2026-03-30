import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Pencil, Plus, Trash2, Star, ArrowLeft, Upload } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { isAdminUnlocked } from '@/lib/adminUnlock.js';
import {
  createMotorcycle,
  deleteMotorcycle,
  fetchMotorcycles,
  getMotorcycleImageUrl,
  updateMotorcycle,
  uploadMotorcycleImages
} from '@/lib/motorcyclesApi.js';
import { isSupabaseConfigured } from '@/lib/supabaseClient.js';

const emptyForm = {
  nome: '',
  modelo: '',
  marca: '',
  preco: '',
  ano: '',
  quilometragem: '',
  combustivel: 'Gasolina',
  tipo: 'Street',
  status: 'disponível',
  descricao: '',
  featured_home: false
};

export default function AdminPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (!isAdminUnlocked()) {
      navigate('/', { replace: true });
      return;
    }

    loadMotorcycles();
  }, [navigate]);

  async function loadMotorcycles() {
    try {
      setLoading(true);
      const data = await fetchMotorcycles();
      setMotorcycles(data);
    } catch (error) {
      toast({ title: 'Erro ao carregar motos', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  const featuredCount = useMemo(
    () => motorcycles.filter((item) => item.featured_home).length,
    [motorcycles]
  );

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  function startCreate() {
    setSelectedId(null);
    setFormData(emptyForm);
    setImageFiles([]);
    setExistingImages([]);
  }

  function startEdit(moto) {
    setSelectedId(moto.id);
    setFormData({
      nome: moto.nome || '',
      modelo: moto.modelo || '',
      marca: moto.marca || '',
      preco: moto.preco || '',
      ano: moto.ano || '',
      quilometragem: moto.quilometragem || '',
      combustivel: moto.combustivel || 'Gasolina',
      tipo: moto.tipo || 'Street',
      status: moto.status || 'disponível',
      descricao: moto.descricao || '',
      featured_home: Boolean(moto.featured_home)
    });
    setExistingImages(moto.imagens || []);
    setImageFiles([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function removeExistingImage(indexToRemove) {
    setExistingImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isSupabaseConfigured) {
      toast({ title: 'Configure o Supabase primeiro', description: 'Preencha o arquivo .env com URL e chave anon.', variant: 'destructive' });
      return;
    }

    try {
      setSaving(true);
      const uploadedPaths = imageFiles.length ? await uploadMotorcycleImages(imageFiles) : [];
      const imagens = [...existingImages, ...uploadedPaths];

      const payload = {
        ...formData,
        preco: Number(formData.preco || 0),
        ano: Number(formData.ano || 0),
        quilometragem: Number(formData.quilometragem || 0),
        imagens
      };

      if (selectedId) {
        await updateMotorcycle(selectedId, payload);
        toast({ title: 'Moto atualizada com sucesso' });
      } else {
        await createMotorcycle(payload);
        toast({ title: 'Moto adicionada com sucesso' });
      }

      startCreate();
      await loadMotorcycles();
    } catch (error) {
      toast({ title: 'Erro ao salvar', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(moto) {
    const shouldDelete = window.confirm(`Excluir ${moto.nome} ${moto.modelo}?`);
    if (!shouldDelete) return;

    try {
      await deleteMotorcycle(moto.id, moto.imagens || []);
      toast({ title: 'Moto excluída com sucesso' });
      if (selectedId === moto.id) startCreate();
      await loadMotorcycles();
    } catch (error) {
      toast({ title: 'Erro ao excluir', description: error.message, variant: 'destructive' });
    }
  }

  async function toggleFeatured(moto) {
    try {
      await updateMotorcycle(moto.id, { featured_home: !moto.featured_home });
      await loadMotorcycles();
    } catch (error) {
      toast({ title: 'Erro ao atualizar destaque', description: error.message, variant: 'destructive' });
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin - Roberto Motos</title>
      </Helmet>
      <Header />

      <section className="py-12 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Voltar para o site
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3" style={{ letterSpacing: '-0.02em' }}>
                Área administrativa
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Gerencie as motos do catálogo e escolha quais motos aparecem em destaque na home.
              </p>
            </div>
            <Button onClick={startCreate} className="bg-primary hover:bg-primary-dark text-white">
              <Plus className="w-5 h-5 mr-2" />
              Nova moto
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-8">
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {selectedId ? 'Editar moto' : 'Adicionar moto'}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Preencha os dados abaixo e mantenha o catálogo atualizado.
                  </p>
                </div>
                {featuredCount > 0 && (
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {featuredCount} em destaque na home
                  </Badge>
                )}
              </div>

              {!isSupabaseConfigured && (
                <div className="mb-6 rounded-xl border border-yellow-500/30 bg-green-600/10 p-4 text-sm text-black">
                  Para o admin funcionar de verdade, configure o Supabase no arquivo <strong>.env</strong> usando o modelo <strong>.env.example</strong>.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="nome">Nome</Label>
                    <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required className="mt-2" placeholder="Ex.: Honda CB 500" />
                  </div>
                  <div>
                    <Label htmlFor="modelo">Modelo</Label>
                    <Input id="modelo" name="modelo" value={formData.modelo} onChange={handleChange} required className="mt-2" placeholder="Ex.: F ABS" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                  <div>
                    <Label htmlFor="marca">Marca</Label>
                    <Input id="marca" name="marca" value={formData.marca} onChange={handleChange} required className="mt-2" placeholder="Honda" />
                  </div>
                  <div>
                    <Label htmlFor="preco">Preço</Label>
                    <Input id="preco" name="preco" type="number" value={formData.preco} onChange={handleChange} required className="mt-2" placeholder="32990" />
                  </div>
                  <div>
                    <Label htmlFor="ano">Ano</Label>
                    <Input id="ano" name="ano" type="number" value={formData.ano} onChange={handleChange} required className="mt-2" placeholder="2022" />
                  </div>
                  <div>
                    <Label htmlFor="quilometragem">KM</Label>
                    <Input id="quilometragem" name="quilometragem" type="number" value={formData.quilometragem} onChange={handleChange} required className="mt-2" placeholder="16500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <Label htmlFor="combustivel">Combustível</Label>
                    <Input id="combustivel" name="combustivel" value={formData.combustivel} onChange={handleChange} className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="tipo">Tipo</Label>
                    <Input id="tipo" name="tipo" value={formData.tipo} onChange={handleChange} className="mt-2" placeholder="Street, Trail, Esportiva" />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select id="status" name="status" value={formData.status} onChange={handleChange} className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      <option value="disponível">Disponível</option>
                      <option value="vendida">Vendida</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea id="descricao" name="descricao" rows={5} value={formData.descricao} onChange={handleChange} className="mt-2 resize-none" placeholder="Descreva os detalhes da moto, acessórios, estado geral e diferenciais." />
                </div>

                <div>
                  <Label htmlFor="imagens">Imagens da moto</Label>
                  <Input
                    id="imagens"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(event) => setImageFiles(Array.from(event.target.files || []))}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Você pode enviar várias imagens. Elas serão adicionadas junto com as já existentes.</p>
                </div>

                {existingImages.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-foreground mb-3">Imagens já cadastradas</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {existingImages.map((image, index) => (
                        <div key={`${image}-${index}`} className="relative rounded-xl overflow-hidden border border-border bg-background">
                          <img src={getMotorcycleImageUrl(image)} alt="Moto cadastrada" className="w-full h-32 object-cover" />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md"
                          >
                            Remover
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <label className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured_home"
                    checked={formData.featured_home}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-foreground">Mostrar esta moto em destaque na Home</span>
                </label>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button type="submit" disabled={saving} className="bg-primary hover:bg-primary-dark text-white sm:min-w-44">
                    <Upload className="w-4 h-4 mr-2" />
                    {saving ? 'Salvando...' : selectedId ? 'Salvar alterações' : 'Cadastrar moto'}
                  </Button>
                  <Button type="button" variant="outline" onClick={startCreate}>
                    Limpar formulário
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Motos cadastradas</h2>
              <p className="text-sm text-muted-foreground mb-6">Use a estrela para escolher as motos em destaque na home e os botões para editar ou excluir.</p>

              {loading ? (
                <p className="text-muted-foreground">Carregando motos...</p>
              ) : motorcycles.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                  Nenhuma moto cadastrada ainda.
                </div>
              ) : (
                <div className="space-y-4 max-h-[900px] overflow-auto pr-1">
                  {motorcycles.map((moto) => (
                    <div key={moto.id} className="rounded-2xl border border-border bg-background p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                      <img
                        src={getMotorcycleImageUrl(moto.imagens?.[0])}
                        alt={`${moto.nome} ${moto.modelo}`}
                        className="w-full sm:w-28 h-24 object-cover rounded-xl"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-bold text-foreground">{moto.nome} {moto.modelo}</h3>
                          {moto.featured_home && <Badge className="bg-primary text-white"><Star className="w-3 h-3 mr-1" />Destaque</Badge>}
                          {moto.status === 'vendida' && <Badge variant="destructive">Vendida</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{moto.marca} • {moto.ano} • {new Intl.NumberFormat('pt-BR').format(moto.quilometragem)} km</p>
                        <p className="text-lg font-bold text-primary mt-1">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(moto.preco || 0)}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button variant={moto.featured_home ? 'default' : 'outline'} onClick={() => toggleFeatured(moto)} className={moto.featured_home ? 'bg-primary text-white' : ''}>
                          <Star className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" onClick={() => startEdit(moto)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" onClick={() => handleDelete(moto)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </>
  );
}
