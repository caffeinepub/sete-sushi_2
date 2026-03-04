import { Link } from "@tanstack/react-router";
import { ArrowRight, ChefHat, Leaf, UtensilsCrossed } from "lucide-react";
import { motion } from "motion/react";
import { Footer } from "../components/Footer";
import { StickyCartBar } from "../components/StickyCartBar";

const features = [
  {
    icon: Leaf,
    title: "Sastāvdaļas",
    text: "Ikdienas piegādes no uzticamiem piegādātājiem.",
  },
  {
    icon: ChefHat,
    title: "Meistarība",
    text: "Sushi šefi ar vairāk nekā 10 gadu pieredzi.",
  },
  {
    icon: UtensilsCrossed,
    title: "Sushi komplekti",
    text: "Rūpīgi veidoti komplekti 2–6 personām.",
  },
];

export function HomePage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#1b1412" }}
    >
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center"
        style={{ minHeight: "100svh" }}
      >
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/assets/generated/sushi-set-hero.dim_1200x800.jpg"
            alt="Premium sushi"
            className="w-full h-full object-cover"
          />
          {/* Multi-layer overlay for depth */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(27,20,18,0.55) 0%, rgba(27,20,18,0.75) 60%, rgba(27,20,18,0.97) 100%)",
            }}
          />
          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)",
            }}
          />
        </div>

        {/* Decorative gold line top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24"
          style={{
            background: "linear-gradient(180deg, transparent, #d4af37)",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span
              className="inline-block text-xs font-semibold tracking-[0.4em] uppercase px-4 py-1.5 rounded-full"
              style={{
                color: "#d4af37",
                border: "1px solid rgba(212,175,55,0.35)",
                background: "rgba(212,175,55,0.08)",
              }}
            >
              Premium Sushi · Rīga
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display font-black leading-none mb-4"
            style={{
              fontSize: "clamp(5rem, 18vw, 10rem)",
              color: "#d4af37",
              textShadow: "0 4px 40px rgba(212,175,55,0.3)",
              letterSpacing: "0.08em",
            }}
          >
            SETE
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto mb-6 h-px w-24"
            style={{
              background:
                "linear-gradient(90deg, transparent, #d4af37, transparent)",
            }}
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl font-light tracking-widest mb-10"
            style={{ color: "#e8d8b4", letterSpacing: "0.3em" }}
          >
            Premium sushi Rīgā
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <Link
              to="/menu"
              data-ocid="hero.cta_button"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
              style={{
                border: "1.5px solid #d4af37",
                color: "#d4af37",
                background: "rgba(212,175,55,0.08)",
                backdropFilter: "blur(4px)",
              }}
            >
              Apskatīt piedāvājumus
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* Decorative bottom */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "#7a6e5a" }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <div
              className="w-px h-12"
              style={{
                background: "linear-gradient(180deg, #d4af37, transparent)",
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
      <section
        className="py-24 px-4 relative"
        style={{
          background: "linear-gradient(180deg, #1b1412 0%, #150f0d 100%)",
        }}
      >
        {/* Gold accent line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #d4af37, transparent)",
          }}
        />

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p
              className="text-xs font-semibold tracking-[0.4em] uppercase mb-3"
              style={{ color: "#d4af37" }}
            >
              Kāpēc SETE
            </p>
            <h2
              className="font-display text-3xl md:text-4xl font-bold"
              style={{ color: "#f5f5f5" }}
            >
              Mūsu filozofija
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Icon container */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                    style={{
                      background: "rgba(212,175,55,0.08)",
                      border: "1px solid rgba(212,175,55,0.25)",
                    }}
                  >
                    <Icon size={24} style={{ color: "#d4af37" }} />
                  </div>

                  <h3
                    className="font-display text-xl font-semibold mb-3"
                    style={{ color: "#f5f5f5" }}
                  >
                    {f.title}
                  </h3>

                  {/* Ornamental line */}
                  <div
                    className="w-8 h-px mb-3"
                    style={{ background: "#d4af37" }}
                  />

                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#a0967a" }}
                  >
                    {f.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4" style={{ background: "#150f0d" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div
            className="p-12 rounded-2xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #241b17 0%, #2e211a 100%)",
              border: "1px solid #3a2e28",
            }}
          >
            {/* Gold corner accents */}
            <div
              className="absolute top-0 left-0 w-20 h-20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-20 h-20"
              style={{
                background:
                  "linear-gradient(315deg, rgba(212,175,55,0.15) 0%, transparent 70%)",
              }}
            />

            <p
              className="text-xs font-semibold tracking-[0.4em] uppercase mb-4"
              style={{ color: "#d4af37" }}
            >
              Pasūtiet tagad
            </p>
            <h2
              className="font-display text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#f5f5f5" }}
            >
              Bez reģistrācijas.
              <br />
              <span style={{ color: "#d4af37" }}>Ātri un vienkārši.</span>
            </h2>
            <p className="text-sm mb-8" style={{ color: "#a0967a" }}>
              Izvēlieties savu komplektu un pasūtiet dažu minūšu laikā.
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all hover:brightness-110 active:scale-95"
              style={{ background: "#d4af37", color: "#1b1412" }}
            >
              Sākt pasūtīšanu
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
      <StickyCartBar />
    </div>
  );
}
