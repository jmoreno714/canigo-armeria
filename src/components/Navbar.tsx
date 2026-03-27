import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/categoria/armas-cortas?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-display tracking-widest text-gold hover:opacity-80 transition-opacity">
          CANIGO
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {/* Categories dropdown */}
          <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
            <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-gold transition-colors">
              Categorías <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {catOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-card border border-border rounded-md shadow-xl py-1 animate-fade-in-up">
                {categories.map(cat => (
                  <Link
                    key={cat.slug}
                    to={`/categoria/${cat.slug}`}
                    className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary hover:text-gold transition-colors"
                    onClick={() => setCatOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/requisitos-legales" className="text-sm font-medium text-foreground hover:text-gold transition-colors">
            Requisitos Legales
          </Link>
          <Link to="/contacto" className="text-sm font-medium text-foreground hover:text-gold transition-colors">
            Contacto
          </Link>

          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <Input
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar..."
                  className="w-48 h-8 text-sm bg-secondary border-border"
                />
                <button type="button" onClick={() => setSearchOpen(false)}>
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </form>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="text-muted-foreground hover:text-gold transition-colors">
                <Search className="w-4.5 h-4.5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border animate-fade-in-up">
          <div className="container px-4 py-4 space-y-1">
            <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-2">Categorías</p>
            {categories.map(cat => (
              <Link
                key={cat.slug}
                to={`/categoria/${cat.slug}`}
                className="block py-2 text-sm text-foreground hover:text-gold transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <div className="border-t border-border my-3" />
            <Link to="/requisitos-legales" className="block py-2 text-sm text-foreground hover:text-gold transition-colors" onClick={() => setMobileOpen(false)}>
              Requisitos Legales
            </Link>
            <Link to="/contacto" className="block py-2 text-sm text-foreground hover:text-gold transition-colors" onClick={() => setMobileOpen(false)}>
              Contacto
            </Link>
            <form onSubmit={handleSearch} className="pt-3">
              <Input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="bg-secondary border-border text-sm"
              />
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
