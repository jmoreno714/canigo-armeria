import { motion } from "framer-motion";
import { Crosshair, Target, Bomb, Wrench } from "lucide-react";

const categories = [
  {
    title: "Armas Cortas",
    description: "Pistolas y revólveres de las mejores marcas nacionales e importadas.",
    icon: Crosshair,
  },
  {
    title: "Armas Largas",
    description: "Rifles, escopetas y carabinas para caza, tiro deportivo y defensa.",
    icon: Target,
  },
  {
    title: "Municiones y Recargas",
    description: "Cartuchería de primer nivel. Componentes y accesorios para recarga.",
    icon: Bomb,
  },
  {
    title: "Accesorios",
    description: "Ópticas, fundas, mantenimiento, limpieza y más.",
    icon: Wrench,
  },
];

const CategoriesGrid = () => {
  return (
    <section id="categorias" className="py-20 md:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-display tracking-wider text-foreground">
            CATEGORÍAS
          </h2>
          <div className="w-12 h-[2px] gradient-gold mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="group relative bg-card border border-border rounded-lg p-8 h-full flex flex-col items-center text-center hover:border-gold transition-colors duration-300 cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                  <cat.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-display tracking-wide text-foreground mb-2">
                  {cat.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {cat.description}
                </p>
                <span className="mt-5 text-gold text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver productos →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
