import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Divider } from "@/components/RoseFrame";
import { InquiryForm } from "@/components/InquiryForm";
import InfiniteMenu from "@/components/InfiniteMenu";

const queryClient = new QueryClient();

const galleryItems = [
  { image: "/gallery/cake-1.png", title: "حلويات أعراس فاخرة", description: "أعراس ومناسبات" },
  { image: "/gallery/cake-2.png", title: "تشكيلة الحلويات الجافة", description: "أعياد ومناسبات" },
  { image: "/gallery/cake-3.png", title: "قاطو بريستيج مخصص", description: "طلبية خاصة" },
  { image: "/gallery/cake-4.png", title: "طبقات الورد والزهر", description: "أعراس" },
  { image: "/gallery/cake-5.png", title: "كيك الذكرى السنوية", description: "مناسبات خاصة" },
  { image: "/gallery/cake-6.png", title: "تصميم حصري بالورود", description: "إبداع خاص" },
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
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-20 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:24px_24px] rounded-full blur-[2px]" />

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

        <InfiniteMenu items={galleryItems} scale={1} />
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
