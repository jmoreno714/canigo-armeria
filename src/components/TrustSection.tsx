import { motion } from "framer-motion";
import { Award, ShieldCheck, Users } from "lucide-react";

const credentials = [
  {
    icon: Award,
    title: "Representantes Oficiales",
    text: "Distribuidores autorizados de las marcas líderes del mercado argentino e internacional.",
  },
  {
    icon: Users,
    title: "Asesoramiento Especializado",
    text: "Equipo con años de experiencia para guiarte en cada compra, trámite y elección técnica.",
  },
  {
    icon: ShieldCheck,
    title: "Normativa ANMaC",
    text: "Operamos bajo toda la normativa vigente de la Agencia Nacional de Materiales Controlados.",
  },
];

const TrustSection = () => {
  return (
    <section className="py-20 md:py-28 bg-anthracite">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-display tracking-wider text-foreground">
            ¿POR QUÉ CANIGO?
          </h2>
          <div className="w-12 h-[2px] gradient-gold mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {credentials.map((cred, i) => (
            <motion.div
              key={cred.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center"
            >
              <cred.icon className="w-10 h-10 text-gold mx-auto mb-4" />
              <h3 className="text-lg font-display tracking-wide text-foreground mb-2">
                {cred.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {cred.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
