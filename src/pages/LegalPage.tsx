import { Link } from "react-router-dom";
import { Shield, FileText, CreditCard, Users, MessageCircle, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const sections = [
  {
    id: "clu",
    icon: FileText,
    title: "Credencial de Legítimo Usuario (CLU)",
    content: [
      "La CLU es el documento básico que habilita a una persona a poseer armas de fuego en Argentina.",
      "Se tramita ante ANMaC (Agencia Nacional de Materiales Controlados).",
      "Requisitos: ser mayor de 21 años, certificado de domicilio, aptitud psicológica, idoneidad en manejo de armas, certificado de antecedentes penales, medios de vida lícitos.",
      "La CLU tiene una vigencia de 5 años y debe renovarse antes de su vencimiento.",
      "Sin CLU no es posible adquirir, tener ni transportar armas de fuego.",
    ],
  },
  {
    id: "tenencia",
    icon: Shield,
    title: "Tenencia de Armas",
    content: [
      "La tenencia autoriza a mantener el arma en el domicilio declarado.",
      "Se tramita por cada arma adquirida, presentando la CLU vigente.",
      "Es obligatorio registrar cada arma dentro de los plazos establecidos.",
      "El arma solo puede permanecer en el domicilio declarado; para trasladarla se necesita autorización de transporte.",
      "La tenencia no autoriza a portar el arma fuera del domicilio.",
    ],
  },
  {
    id: "portacion",
    icon: Users,
    title: "Portación de Armas",
    content: [
      "La portación permite llevar el arma cargada y en condiciones de uso inmediato fuera del domicilio.",
      "Es un permiso excepcional y muy restringido, otorgado solo ante justificación fehaciente.",
      "Se requiere demostrar riesgo cierto para la vida o la integridad física, y cumplir requisitos adicionales exigentes.",
      "Las fuerzas de seguridad y ciertos funcionarios tienen portación por función.",
      "La portación tiene vigencia limitada y condiciones estrictas de renovación.",
    ],
  },
  {
    id: "municion",
    icon: CreditCard,
    title: "Tarjeta de Control de Consumo (Munición)",
    content: [
      "Para adquirir munición es imprescindible contar con la Tarjeta de Control de Consumo emitida por ANMaC.",
      "La compra de munición es exclusivamente presencial; no se puede adquirir online.",
      "Se debe presentar la tarjeta en cada compra, donde se registra el tipo y cantidad adquirida.",
      "El consumo máximo anual está regulado según el calibre y el tipo de usuario (deportivo, defensa, etc.).",
      "En CANIGO te asesoramos sobre el trámite y los requisitos para obtener tu tarjeta.",
    ],
  },
];

const LegalPage = () => {
  return (
    <Layout>
      {/* Header */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="container px-4 py-8">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Inicio</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold">Requisitos Legales</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-display tracking-wider text-foreground">Requisitos Legales</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">Todo lo que necesitás saber para comprar armas y municiones legalmente en Argentina. Información basada en la normativa vigente de ANMaC.</p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-4">
          {sections.map((section, i) => (
            <motion.div key={section.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <AccordionItem value={section.id} className="border border-border rounded-lg bg-card px-4">
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <section.icon className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-left font-display text-lg tracking-wider text-foreground">{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 pb-2">
                    {section.content.map((text, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-1.5" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12 text-center p-8 bg-card border border-border rounded-lg">
          <Shield className="w-10 h-10 text-gold mx-auto mb-4" />
          <h2 className="text-2xl font-display tracking-wider text-foreground mb-2">¿Tenés dudas?</h2>
          <p className="text-sm text-muted-foreground mb-6">Nuestro equipo te asesora sobre trámites, requisitos y normativa vigente.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-accent hover:bg-accent/80 text-accent-foreground">
              <a href="https://wa.me/5491112345678?text=Hola%2C%20tengo%20consultas%20sobre%20requisitos%20legales" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" /> Contactanos por WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" className="border-border">
              <Link to="/contacto">Ir a Contacto</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default LegalPage;
