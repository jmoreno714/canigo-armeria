import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Shield, MessageCircle, ZoomIn, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getProductById, getRelatedProducts, getCategoryBySlug, formatPrice } from "@/data/mockData";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="container px-4 py-32 text-center">
          <h1 className="text-4xl font-display text-foreground mb-4">Producto no encontrado</h1>
          <Link to="/" className="text-gold hover:underline">Volver al inicio</Link>
        </div>
      </Layout>
    );
  }

  const related = getRelatedProducts(product);
  const category = getCategoryBySlug(product.categorySlug);
  const whatsappMsg = encodeURIComponent(`Hola, quiero consultar por: ${product.name} (SKU: ${product.sku})`);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="container px-4 py-4">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-gold transition-colors">Inicio</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/categoria/${product.categorySlug}`} className="hover:text-gold transition-colors">{category?.name || product.category}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container px-4 py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square bg-white border border-border rounded-lg flex items-center justify-center overflow-hidden group cursor-pointer" onClick={() => setZoomOpen(true)}>
              <img src={product.images[selectedImage]} alt={product.name} className="w-4/5 h-4/5 object-contain" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/30">
                <ZoomIn className="w-8 h-8 text-gold" />
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded border flex items-center justify-center bg-card transition-colors ${i === selectedImage ? "border-gold" : "border-border hover:border-muted-foreground"}`}
                  >
                    <img src={img} alt="" className="w-10 h-10 object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="text-xs text-muted-foreground tracking-wider uppercase mb-1">{product.brand}</p>
            <h1 className="text-3xl md:text-4xl font-display tracking-wider text-foreground">{product.name}</h1>
            <p className="text-xs text-muted-foreground mt-1">SKU: {product.sku}</p>

            <div className="mt-6">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-display text-gold">{formatPrice(product.price)}</span>
                <Badge variant={product.available ? "default" : "secondary"} className={product.available ? "bg-accent text-accent-foreground" : ""}>
                  {product.available ? "Stock disponible" : "Consultar disponibilidad"}
                </Badge>
              </div>
              {product.estimatedPrice && (
                <p className="text-xs text-gold/70 mt-1">💰 Precio referencial · Consultá el precio final con nuestro equipo</p>
              )}
            </div>

            {product.legalNote && (
              <div className="mt-4 flex items-start gap-2 p-3 bg-secondary border border-border rounded-lg">
                <Shield className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">{product.legalNote}</p>
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button asChild className="bg-accent hover:bg-accent/80 text-accent-foreground flex-1">
                <a href={`https://wa.me/5491112345678?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" /> Consultar por WhatsApp
                </a>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-gold text-gold hover:bg-gold/10 flex-1">Consultar disponibilidad</Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="font-display text-2xl tracking-wider">Consultar por {product.name}</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-muted-foreground">Para consultar disponibilidad y precio actualizado, contactanos:</p>
                  <div className="space-y-3 mt-4">
                    <Button asChild className="w-full bg-accent hover:bg-accent/80 text-accent-foreground">
                      <a href={`https://wa.me/5491112345678?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full border-border">
                      <a href="tel:+541149011234">Llamar: (011) 4901-1234</a>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="desc" className="mt-8">
              <TabsList className="bg-secondary border border-border">
                <TabsTrigger value="desc">Descripción</TabsTrigger>
                <TabsTrigger value="specs">Especificaciones</TabsTrigger>
                {product.legalNote && <TabsTrigger value="legal">Legal</TabsTrigger>}
              </TabsList>
              <TabsContent value="desc" className="mt-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              </TabsContent>
              <TabsContent value="specs" className="mt-4">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val]) => (
                      <tr key={key} className="border-b border-border">
                        <td className="py-2 text-muted-foreground w-1/3">{key}</td>
                        <td className="py-2 text-foreground">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabsContent>
              {product.legalNote && (
                <TabsContent value="legal" className="mt-4">
                  <div className="flex items-start gap-2 p-4 bg-secondary rounded-lg">
                    <Shield className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p>{product.legalNote}</p>
                      <Link to="/requisitos-legales" className="text-gold hover:underline text-xs">Ver requisitos completos →</Link>
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </motion.div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-8">
            <h2 className="text-2xl font-display tracking-wider text-foreground mb-6">Productos Relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => (
                <Link key={p.id} to={`/producto/${p.id}`}>
                  <Card className="bg-card border-border hover:border-gold/40 transition-all group overflow-hidden">
                    <div className="aspect-square bg-white flex items-center justify-center">
                      <img src={p.image} alt={p.name} className="w-3/4 h-3/4 object-contain group-hover:scale-105 transition-transform" />
                    </div>
                    <CardContent className="p-3">
                      <p className="text-[10px] text-muted-foreground">{p.brand}</p>
                      <h3 className="text-xs font-semibold text-foreground group-hover:text-gold transition-colors line-clamp-2">{p.name}</h3>
                      <span className="text-sm font-display text-gold mt-1 block">{formatPrice(p.price)}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Zoom dialog */}
      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogContent className="max-w-3xl bg-card border-border">
          <div className="aspect-square flex items-center justify-center">
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-contain" />
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ProductPage;
