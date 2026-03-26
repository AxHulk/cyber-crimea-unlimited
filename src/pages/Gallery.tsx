import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import HudNavbar from "@/components/HudNavbar";
import Footer from "@/components/Footer";
import { galleries } from "@/data/galleries";

const box = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.38 } } };

export default function Gallery() {
  const { galleryId } = useParams<{ galleryId: string }>();
  const gallery = galleries.find((g) => g.id === galleryId);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  if (!gallery) {
    return (
      <div className="min-h-screen bg-background">
        <HudNavbar />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="font-display text-3xl font-black text-foreground mb-4">Галерея не найдена</h1>
          <Link to="/media-hub" className="font-mono text-xs text-primary hover:underline">← Вернуться в Медиа-хаб</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx((i) => (i !== null ? (i - 1 + gallery.photos.length) % gallery.photos.length : null));
  const next = () => setLightboxIdx((i) => (i !== null ? (i + 1) % gallery.photos.length : null));

  return (
    <div className="min-h-screen bg-background">
      <HudNavbar />

      <section className="relative pt-28 pb-12 overflow-hidden scanline">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/media-hub"
            className="inline-flex items-center gap-2 font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-3 h-3" /> МЕДИА-ХАБ
          </Link>
          <p className="font-mono text-[10px] tracking-[0.35em] text-primary mb-3">// PHOTO_GALLERY</p>
          <h1 className="font-display text-3xl md:text-5xl font-black text-foreground">{gallery.title}</h1>
          <p className="font-mono text-xs text-muted-foreground mt-3 max-w-2xl">{gallery.description}</p>
          <p className="font-mono text-[10px] text-muted-foreground mt-2">{gallery.date} · {gallery.photos.length} фото</p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {gallery.photos.map((photo, idx) => (
            <motion.div
              key={idx}
              variants={box}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => openLightbox(idx)}
            >
              <div className="bento-card hud-corner overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.img
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={gallery.photos[lightboxIdx].src}
              alt={gallery.photos[lightboxIdx].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white/50">
              {lightboxIdx + 1} / {gallery.photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
