import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Filter, ChevronRight, Grid3X3, List } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { categories, getProductsByCategory, getCategoryBySlug, brands, formatPrice } from "@/data/mockData";

const ITEMS_PER_PAGE = 8;

const CategoryPage = () => {
  const { nombre } = useParams<{ nombre: string }>();
  const category = getCategoryBySlug(nombre || "");
  const allProducts = getProductsByCategory(nombre || "");

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categoryBrands = useMemo(() => {
    return [...new Set(allProducts.map(p => p.brand))];
  }, [allProducts]);

  const filtered = useMemo(() => {
    let result = [...allProducts];
    if (selectedBrands.length > 0) result = result.filter(p => selectedBrands.includes(p.brand));
    if (availability === "available") result = result.filter(p => p.available);
    if (availability === "consult") result = result.filter(p => !p.available);
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [allProducts, selectedBrands, availability, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    setPage(1);
  };

  if (!category) {
    return (
      <Layout>
        <div className="container px-4 py-32 text-center">
          <h1 className="text-4xl font-display text-foreground mb-4">Categoría no encontrada</h1>
          <Link to="/" className="text-gold hover:underline">Volver al inicio</Link>
        </div>
      </Layout>
    );
  }

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-xs font-semibold tracking-widest uppercase text-gold mb-3">Marca</h4>
        <div className="space-y-2">
          {categoryBrands.map(brand => (
            <label key={brand} className="flex items-center gap-2 text-sm text-foreground cursor-pointer hover:text-gold transition-colors">
              <Checkbox checked={selectedBrands.includes(brand)} onCheckedChange={() => toggleBrand(brand)} />
              {brand}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-semibold tracking-widest uppercase text-gold mb-3">Disponibilidad</h4>
        <Select value={availability} onValueChange={v => { setAvailability(v); setPage(1); }}>
          <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="available">Con stock</SelectItem>
            <SelectItem value="consult">Consultar</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <Layout>
      {/* Breadcrumb + Header */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="container px-4 py-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Inicio</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="hover:text-gold transition-colors">Armería</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold">{category.name}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-display tracking-wider text-foreground">{category.name}</h1>
          <p className="text-muted-foreground mt-2">{category.description} · {allProducts.length} productos</p>
        </div>
      </div>

      <div className="container px-4 py-8">
        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <Button variant="outline" size="sm" onClick={() => setFiltersOpen(!filtersOpen)} className="border-border">
            <Filter className="w-4 h-4 mr-2" /> Filtros
          </Button>
          {filtersOpen && (
            <div className="mt-4 p-4 bg-card border border-border rounded-lg">
              <FilterPanel />
            </div>
          )}
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar filters */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <FilterPanel />
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">{filtered.length} resultado{filtered.length !== 1 ? "s" : ""}</p>
              <Select value={sortBy} onValueChange={v => { setSortBy(v); setPage(1); }}>
                <SelectTrigger className="w-44 bg-secondary border-border text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nombre A-Z</SelectItem>
                  <SelectItem value="price-asc">Menor precio</SelectItem>
                  <SelectItem value="price-desc">Mayor precio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginated.map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link to={`/producto/${product.id}`}>
                    <Card className="group bg-card border-border hover:border-gold/40 transition-all duration-300 overflow-hidden">
                      <div className="aspect-square bg-white flex items-center justify-center overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-4/5 h-4/5 object-contain group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors line-clamp-2">{product.name}</h3>
                        <div className="mt-3">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-display text-gold">{formatPrice(product.price)}</span>
                            <Badge variant={product.available ? "default" : "secondary"} className={product.available ? "bg-accent text-accent-foreground text-[10px]" : "text-[10px]"}>
                              {product.available ? "Stock" : "Consultar"}
                            </Badge>
                          </div>
                          {product.estimatedPrice && (
                            <p className="text-[10px] text-gold/70 mt-1">💰 Precio referencial · Consultar precio final</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={page === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(i + 1)}
                    className={page === i + 1 ? "bg-gold text-primary-foreground" : "border-border"}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related categories */}
        <div className="mt-16 border-t border-border pt-8">
          <h2 className="text-2xl font-display tracking-wider text-foreground mb-6">Otras Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.filter(c => c.slug !== nombre).map(cat => (
              <Link key={cat.slug} to={`/categoria/${cat.slug}`} className="p-4 bg-card border border-border rounded-lg hover:border-gold/40 transition-colors text-center group">
                <h3 className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{cat.productCount} productos</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
