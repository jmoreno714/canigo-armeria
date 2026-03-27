import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, MessageCircle, ChevronRight, Send } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const branches = [
  {
    name: "Casa Central",
    address: "Av. Rivadavia 5036, CABA",
    phone: "(011) 4901-1234",
    hours: "Lun a Vie 9:00–18:00 · Sáb 9:00–13:00",
  },
  {
    name: "Sucursal Norte",
    address: "Av. Cabildo 2480, CABA",
    phone: "(011) 4781-5678",
    hours: "Lun a Vie 9:30–18:30 · Sáb 9:30–13:30",
  },
];

const ContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Completá los campos obligatorios", variant: "destructive" });
      return;
    }
    setSending(true);
    setTimeout(() => {
      toast({ title: "Mensaje enviado", description: "Te responderemos a la brevedad." });
      setForm({ name: "", email: "", phone: "", message: "" });
      setSending(false);
    }, 1000);
  };

  return (
    <Layout>
      {/* Header */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="container px-4 py-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Inicio</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold">Contacto</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-display tracking-wider text-foreground">Contacto</h1>
          <p className="text-muted-foreground mt-2">Visitanos en nuestras sucursales o envianos tu consulta.</p>
        </div>
      </div>

      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: branches + map */}
          <div>
            <h2 className="text-2xl font-display tracking-wider text-foreground mb-6">Sucursales</h2>
            <div className="space-y-4">
              {branches.map((b, i) => (
                <motion.div key={b.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="bg-card border-border">
                    <CardContent className="p-5 space-y-2">
                      <h3 className="font-semibold text-foreground">{b.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="w-4 h-4 text-gold" />{b.address}</div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="w-4 h-4 text-gold" />{b.phone}</div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="w-4 h-4 text-gold" />{b.hours}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mt-6 aspect-video bg-card border border-border rounded-lg flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Mapa — Próximamente</p>
            </div>

            {/* WhatsApp CTA */}
            <Button asChild className="w-full mt-6 bg-accent hover:bg-accent/80 text-accent-foreground h-12">
              <a href="https://wa.me/5491112345678?text=Hola%2C%20quiero%20hacer%20una%20consulta" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" /> Escribinos por WhatsApp
              </a>
            </Button>
          </div>

          {/* Right: form */}
          <div>
            <h2 className="text-2xl font-display tracking-wider text-foreground mb-6">Envianos tu Consulta</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Nombre *</label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="bg-secondary border-border" maxLength={100} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Email *</label>
                <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="bg-secondary border-border" maxLength={255} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Teléfono</label>
                <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="bg-secondary border-border" maxLength={30} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Consulta *</label>
                <Textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5} className="bg-secondary border-border resize-none" maxLength={1000} />
              </div>
              <Button type="submit" disabled={sending} className="w-full bg-gold hover:bg-gold/90 text-primary-foreground h-11">
                <Send className="w-4 h-4 mr-2" /> {sending ? "Enviando..." : "Enviar consulta"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
