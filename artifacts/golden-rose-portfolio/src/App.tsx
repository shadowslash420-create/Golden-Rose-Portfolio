import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, useScroll, useTransform } from "framer-motion";
import { RoseFrame, Divider } from "@/components/RoseFrame";
import { InquiryForm } from "@/components/InquiryForm";

const queryClient = new QueryClient();

const galleryImages = [
  { id: 1, src: "/gallery/cake-1.png", title: "Blush Rose Wedding", type: "Wedding Tier", align: "object-center" },
  { id: 2, src: "/gallery/cake-2.png", title: "Botanical Pressed", type: "Anniversary", align: "object-top" },
  { id: 3, src: "/gallery/cake-3.png", title: "Velvet Amber", type: "Birthday Gâteau", align: "object-bottom" },
  { id: 4, src: "/gallery/cake-4.png", title: "Minimalist Fondant", type: "Wedding Tier", align: "object-center" },
  { id: 5, src: "/gallery/cake-5.png", title: "Rustic Cascading", type: "Celebration", align: "object-[center_20%]" },
  { id: 6, src: "/gallery/cake-6.png", title: "Spring Gold Leaf", type: "Custom Creation", align: "object-center" },
];

function Home() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  return (
    <div className="min-h-screen bg-background w-full overflow-hidden flex flex-col">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-20 z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(var(--color-primary)_1px,transparent_1px)] [background-size:24px_24px] rounded-full blur-[2px]" />
          
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-secondary tracking-tight drop-shadow-sm mb-6 max-w-5xl mx-auto leading-[1.1]">
            Golden Rose <br/><span className="text-primary italic font-light">Bakes</span>
          </h1>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="h-[1px] w-16 md:w-24 bg-primary/40"></span>
            <p className="text-secondary/70 font-sans tracking-[0.3em] text-xs md:text-sm uppercase font-semibold">
              Bespoke Cakes & Gâteaux
            </p>
            <span className="h-[1px] w-16 md:w-24 bg-primary/40"></span>
          </div>
        </motion.div>
      </section>

      {/* Story / About Section */}
      <section className="max-w-4xl mx-auto px-6 py-12 md:py-24 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <p className="font-serif text-2xl md:text-4xl text-secondary/90 leading-relaxed md:leading-relaxed">
            Crafting memories from butter, sugar, and wild botanicals. Every creation is an intimate reflection of your most cherished celebrations.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-loose md:text-lg">
            Based in the heart of the UK, we approach baking the way a florist approaches a bouquet—unhurried, organic, and beautifully bespoke. From lush wedding tiers adorned with fresh garden roses to luxurious birthday gâteaux, our philosophy is simple: cake should be as breathtaking as it is delicious.
          </p>
        </motion.div>
      </section>

      <Divider />

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-serif text-4xl md:text-5xl text-secondary mb-4">Our Portfolio</h2>
          <p className="text-muted-foreground tracking-widest uppercase text-xs">Selected Works</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {galleryImages.map((img, i) => (
            <RoseFrame key={img.id} className={i % 2 === 0 ? "md:mt-12" : ""}>
              <div className="relative aspect-[3/4] w-full bg-accent overflow-hidden group-hover:scale-105 transition-transform duration-1000 ease-out">
                <img 
                  src={img.src} 
                  alt={img.title}
                  className={`w-full h-full object-cover ${img.align}`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] uppercase bg-primary/90 text-primary-foreground tracking-widest px-3 py-1.5 rounded-full font-semibold backdrop-blur-md">
                    {img.type}
                  </span>
                  <h3 className="font-serif text-2xl text-white mt-4 tracking-wide">{img.title}</h3>
                </div>
              </div>
            </RoseFrame>
          ))}
        </div>
      </section>

      <Divider />

      {/* Inquiry Section */}
      <section className="relative z-10 w-full pt-12 pb-24">
        <InquiryForm />
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-16 md:py-24 relative overflow-hidden z-10 mt-auto">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(var(--color-primary-foreground)_1px,transparent_1px)] [background-size:24px_24px] mix-blend-overlay" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <svg className="w-12 h-12 text-primary-foreground/30 mx-auto mb-8" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,10 C25,10 10,25 10,50 C10,65 20,75 35,78 C30,60 40,40 50,30 C60,40 70,60 65,78 C80,75 90,65 90,50 C90,25 75,10 50,10 Z" />
            <path d="M50,35 C45,45 35,55 40,70 C45,65 55,65 60,70 C65,55 55,45 50,35 Z" opacity="0.6"/>
          </svg>
          <h2 className="font-serif text-3xl md:text-5xl text-primary-foreground/90 mb-6">Golden Rose Bakes</h2>
          <p className="text-secondary-foreground/60 font-sans tracking-widest uppercase text-xs md:text-sm mb-12">
            Bespoke Botanical Cakes &bull; United Kingdom
          </p>
          <p className="text-secondary-foreground/40 text-xs">
            &copy; {new Date().getFullYear()} Golden Rose Bakes. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Home />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;