import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { categories } from "@/data/mockData";

const FooterCanigo = () => {
  return (
    <footer className="bg-anthracite border-t border-border py-16">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="text-3xl font-display tracking-wider text-foreground hover:opacity-80 transition-opacity">
              CANIGO
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mt-4">
              Más de 35 años equipando a cazadores, tiradores deportivos y entusiastas en toda Argentina.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-body font-semibold tracking-widest uppercase text-gold mb-4">
              Categorías
            </h4>
            <div className="space-y-2">
              {categories.map(cat => (
                <Link key={cat.slug} to={`/categoria/${cat.slug}`} className="block text-sm text-muted-foreground hover:text-gold transition-colors">
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Useful links */}
          <div>
            <h4 className="text-sm font-body font-semibold tracking-widest uppercase text-gold mb-4">
              Información
            </h4>
            <div className="space-y-2">
              <Link to="/requisitos-legales" className="block text-sm text-muted-foreground hover:text-gold transition-colors">Requisitos Legales</Link>
              <Link to="/contacto" className="block text-sm text-muted-foreground hover:text-gold transition-colors">Contacto</Link>
            </div>
            <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
              Operamos bajo normativa ANMaC. La venta de armas y municiones se realiza exclusivamente de forma presencial cumpliendo la legislación vigente.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-body font-semibold tracking-widest uppercase text-gold mb-4">
              Contacto
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">Casa Central</p>
                  <p>Av. Rivadavia 5036, CABA</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" />
                <span>(011) 4901-1234</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" />
                <span>armeria@canigo.com.ar</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gold" />
                <span>Lun a Vie 9:00–18:00 · Sáb 9:00–13:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} CANIGO. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default FooterCanigo;
