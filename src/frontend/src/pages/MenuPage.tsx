import { motion } from "motion/react";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { StickyCartBar } from "../components/StickyCartBar";
import { Toaster } from "../components/ui/sonner";
import type { ProductCategory } from "../store/types";
import { useProductsStore } from "../store/useStore";

const categoryConfig: Record<
  ProductCategory,
  { label: string; description: string }
> = {
  set: {
    label: "Komplekti",
    description: "Mūsu rūpīgi veidotie sushi komplekti dažādām kompānijām",
  },
  addon: {
    label: "Pielikumi",
    description: "Papildiniet savu pasūtījumu ar klasiskajiem ruļļiem",
  },
  drink: {
    label: "Dzērieni",
    description: "Atspirdzinošie dzērieni jūsu maltītei",
  },
};

const categoryOrder: ProductCategory[] = ["set", "addon", "drink"];

export function MenuPage() {
  const products = useProductsStore((s) => s.products);
  const enabledProducts = products.filter((p) => p.enabled);

  // Track cumulative index for data-ocid markers
  let globalIndex = 0;

  return (
    <div
      className="min-h-screen flex flex-col pt-16"
      style={{ background: "#1b1412" }}
    >
      {/* Page header */}
      <div
        className="py-16 px-4 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #150f0d 0%, #1b1412 100%)",
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #d4af37, transparent)",
          }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-semibold tracking-[0.4em] uppercase mb-3"
          style={{ color: "#d4af37" }}
        >
          Mūsu piedāvājums
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold"
          style={{ color: "#f5f5f5" }}
        >
          Ēdienkarte
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mt-5 h-px w-24"
          style={{
            background:
              "linear-gradient(90deg, transparent, #d4af37, transparent)",
          }}
        />
      </div>

      {/* Menu sections */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-24">
        {categoryOrder.map((category) => {
          const items = enabledProducts.filter((p) => p.category === category);
          if (items.length === 0) return null;
          const config = categoryConfig[category];

          return (
            <section key={category} className="mb-20">
              {/* Section heading */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-10 pb-4"
                style={{ borderBottom: "1px solid #3a2e28" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-1 h-8 rounded-full"
                    style={{ background: "#d4af37" }}
                  />
                  <h2
                    className="font-display text-2xl md:text-3xl font-bold"
                    style={{ color: "#f5f5f5" }}
                  >
                    {config.label}
                  </h2>
                </div>
                <p className="text-sm ml-4" style={{ color: "#a0967a" }}>
                  {config.description}
                </p>
              </motion.div>

              {/* Product grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((product) => {
                  const cardIndex = globalIndex;
                  globalIndex++;
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={cardIndex}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>

      <Footer />
      <StickyCartBar />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#241b17",
            border: "1px solid #3a2e28",
            color: "#f5f5f5",
          },
        }}
      />
    </div>
  );
}
