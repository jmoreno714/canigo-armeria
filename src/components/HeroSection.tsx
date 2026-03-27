import { motion } from "framer-motion";
import heroImage from "@/assets/hero-armeria.jpg";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Armería CANIGO - Equipamiento táctico premium"
        width={1920}
        height={1024}
        className="absolute inset-0 w-full h-full object-cover" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      
      <div className="relative z-10 container text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          
          <p className="text-gold font-body text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-extrabold">
            ​
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display tracking-wider leading-none lg:text-6xl text-primary">
            ​CANIGO · Desde 1985
          </h1>
          <div className="w-20 h-[2px] gradient-gold mx-auto my-6" />
          <p className="text-secondary-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Las mejores marcas. Atención especializada.<br />
            Representantes oficiales en Argentina.
          </p>
        </motion.div>

        <motion.a
          href="#categorias"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 mt-10 text-gold text-sm tracking-widest uppercase hover:opacity-80 transition-opacity cursor-pointer">
          
          Explorar
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.a>
      </div>
    </section>);

};

export default HeroSection;