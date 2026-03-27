import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, AlertTriangle, FileText } from "lucide-react";

const LegalSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 max-w-4xl">
        {/* Legal requirements collapsible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-lg overflow-hidden mb-8"
        >
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <FileText className="w-6 h-6 text-gold flex-shrink-0" />
              <div>
                <h3 className="text-xl font-display tracking-wide text-foreground">
                  Requisitos Legales para Comprar Armas
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Información sobre CLU, tenencia y trámites en Argentina
                </p>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gold transition-transform duration-300 flex-shrink-0 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 md:px-8 pb-8 space-y-4 text-sm text-secondary-foreground leading-relaxed border-t border-border pt-6">
                  <p>
                    Para adquirir armas de fuego en Argentina, es necesario contar con la siguiente documentación:
                  </p>
                  <ul className="space-y-3 list-none">
                    <li className="flex gap-3">
                      <span className="text-gold font-bold">1.</span>
                      <span><strong className="text-foreground">Credencial de Legítimo Usuario (CLU):</strong> Otorgada por ANMaC, habilita la tenencia de armas de fuego. Se tramita de forma online.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gold font-bold">2.</span>
                      <span><strong className="text-foreground">Autorización de compra:</strong> Una vez obtenida la CLU, se solicita la autorización específica para cada arma que se desee adquirir.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gold font-bold">3.</span>
                      <span><strong className="text-foreground">DNI vigente:</strong> Documento Nacional de Identidad en vigencia.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gold font-bold">4.</span>
                      <span><strong className="text-foreground">Apto psicofísico:</strong> Certificado médico que avale la aptitud para la tenencia de armas.</span>
                    </li>
                  </ul>
                  <p className="text-muted-foreground pt-2">
                    Nuestro equipo puede asesorarte en cada paso del trámite. No dudes en consultarnos.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Ammo disclaimer banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary/10 border border-gold/30 rounded-lg p-6 md:p-8 flex items-start gap-4"
        >
          <AlertTriangle className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-base font-display tracking-wide text-gold mb-1">
              Aviso sobre Municiones
            </h4>
            <p className="text-sm text-secondary-foreground leading-relaxed">
              La venta de municiones es exclusivamente presencial y requiere la presentación de la
              <strong className="text-foreground"> Tarjeta de Control de Consumo de Municiones</strong> vigente,
              emitida por ANMaC. No se realizan envíos de municiones.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LegalSection;
