import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { RoseFrame, Divider } from "@/components/RoseFrame";
import { InquiryForm } from "@/components/InquiryForm";

const queryClient = new QueryClient();

const galleryImages = [
  { id: 1, src: "/gallery/cake-1.png", title: "حلويات أعراس فاخرة", type: "أعراس ومناسبات", align: "object-center" },
  { id: 2, src: "/gallery/cake-2.png", title: "تشكيلة الحلويات الجافة", type: "أعياد ومناسبات", align: "object-top" },
  { id: 3, src: "/gallery/cake-3.png", title: "قاطو بريستيج مخصص", type: "طلبية خاصة", align: "object-bottom" },
  { id: 4, src: "/gallery/cake-4.png", title: "طبقات الورد والزهر", type: "أعراس", align: "object-center" },
  { id: 5, src: "/gallery/cake-5.png", title: "كيك الذكرى السنوية", type: "مناسبات خاصة", align: "object-[center_20%]" },
  { id: 6, src: "/gallery/cake-6.png", title: "تصميم حصري بالورود", type: "إبداع خاص", align: "object-center" },
];

function Home() {
  return (
    <div className="min-h-screen bg-[#FFFDFB] w-full overflow-hidden flex flex-col" dir="rtl">

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-rose-100/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-amber-50/60 blur-[100px]" />
      </div>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-20 z-10 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/hero-bg.png"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          {/* Layered overlays for text legibility while keeping warmth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDFB]/60 via-[#FFF1F2]/40 to-[#FFFDFB]/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDFB] via-transparent to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-amber-900 tracking-tight drop-shadow-sm mb-6 max-w-5xl mx-auto leading-[1.1]">
            Golden Rose <br /><span className="text-rose-600 italic font-light">Bakes</span>
          </h1>

          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="h-[1px] w-16 md:w-24 bg-rose-300"></span>
            <p className="text-rose-600/80 font-sans tracking-widest text-xs md:text-sm uppercase font-semibold">
              حلويات الأعراس &bull; الحلويات الجافة &bull; مناسبات &bull; أعياد
            </p>
            <span className="h-[1px] w-16 md:w-24 bg-rose-300"></span>
          </div>
        </motion.div>
      </section>

      {/* About */}
      <section className="max-w-4xl mx-auto px-6 py-12 md:py-24 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <p className="font-serif text-2xl md:text-4xl text-amber-950/90 leading-relaxed">
            نصنع لكم لحظات لا تُنسى من العجين والورود والحب.
          </p>
          <p className="text-stone-500 max-w-2xl mx-auto leading-loose md:text-lg">
            حلويات Golden Rose Bakes تُجسّد شغف عميق بفن الحلويات الراقية. من حلويات الأعراس المزيّنة بالورود الطازجة، إلى الحلويات الجافة الأنيقة لكل مناسبة — نؤمن أن كل طلبية هي تحفة فنية تستحق العناية والإتقان.
          </p>
        </motion.div>
      </section>

      <Divider />

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-serif text-4xl md:text-5xl text-amber-950 mb-4">معرض أعمالنا</h2>
          <p className="text-stone-400 tracking-widest uppercase text-xs">تشكيلة مختارة</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {galleryImages.map((img, i) => (
            <RoseFrame key={img.id} className={i % 2 === 0 ? "md:mt-12" : ""}>
              <div className="relative aspect-[3/4] w-full bg-rose-50 overflow-hidden group-hover:scale-105 transition-transform duration-1000 ease-out">
                <img
                  src={img.src}
                  alt={img.title}
                  className={`w-full h-full object-cover ${img.align}`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-right">
                  <span className="text-[10px] uppercase bg-rose-600/90 text-white tracking-widest px-3 py-1.5 rounded-full font-semibold">
                    {img.type}
                  </span>
                  <h3 className="font-serif text-xl text-white mt-4 tracking-wide">{img.title}</h3>
                </div>
              </div>
            </RoseFrame>
          ))}
        </div>
      </section>

      <Divider />

      {/* Inquiry Form */}
      <section className="relative z-10 w-full pt-12 pb-24">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-amber-950 mb-4">احجزي طلبيتك</h2>
          <p className="text-stone-400 tracking-widest text-xs">نرد عليكم خلال 24 ساعة</p>
        </div>
        <InquiryForm />
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-50 py-16 md:py-24 relative overflow-hidden z-10 mt-auto">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fce7f3_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <svg className="w-12 h-12 text-rose-300/40 mx-auto mb-8" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,10 C25,10 10,25 10,50 C10,65 20,75 35,78 C30,60 40,40 50,30 C60,40 70,60 65,78 C80,75 90,65 90,50 C90,25 75,10 50,10 Z" />
            <path d="M50,35 C45,45 35,55 40,70 C45,65 55,65 60,70 C65,55 55,45 50,35 Z" opacity="0.6"/>
          </svg>
          <h2 className="font-serif text-3xl md:text-5xl text-rose-100/90 mb-6">Golden Rose Bakes</h2>
          <p className="text-amber-200/60 font-sans tracking-widest uppercase text-xs md:text-sm mb-12">
            حلويات الأعراس &bull; الحلويات الجافة &bull; طلبيات خاصة
          </p>
          <p className="text-amber-200/40 text-xs">
            &copy; {new Date().getFullYear()} Golden Rose Bakes. جميع الحقوق محفوظة.
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
