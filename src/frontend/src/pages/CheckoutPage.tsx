import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin, Store, Truck } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Footer } from "../components/Footer";
import { OrderSuccessModal } from "../components/OrderSuccessModal";
import { useCartStore, useOrdersStore } from "../store/useStore";

const PLACEHOLDER = "/assets/generated/sushi-roll-placeholder.dim_600x400.jpg";

interface FormState {
  phone: string;
  customerName: string;
  deliveryType: "delivery" | "pickup";
  address: string;
  deliveryTime: string;
}

interface FormErrors {
  phone?: string;
  address?: string;
}

export function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice)();
  const addOrder = useOrdersStore((s) => s.addOrder);

  const [form, setForm] = useState<FormState>({
    phone: "",
    customerName: "",
    deliveryType: "delivery",
    address: "",
    deliveryTime: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [successModal, setSuccessModal] = useState<{
    open: boolean;
    orderNumber: number;
  }>({
    open: false,
    orderNumber: 0,
  });

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    if (!form.phone.trim()) {
      newErrors.phone = "Tālrunis ir obligāts lauks";
    }
    if (form.deliveryType === "delivery" && !form.address.trim()) {
      newErrors.address = "Piegādes adrese ir obligāta";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const order = addOrder({
      items,
      totalPrice,
      phone: form.phone,
      customerName: form.customerName,
      address:
        form.deliveryType === "delivery"
          ? form.address
          : "Blaumaņa iela 34-2, Rīga (paņemšana)",
      deliveryType: form.deliveryType,
      deliveryTime: form.deliveryTime,
    });

    setSuccessModal({ open: true, orderNumber: order.orderNumber });
  };

  // Redirect to cart if empty (but NOT after successful order — modal handles that)
  if (items.length === 0 && !successModal.open) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center pt-16"
        style={{ background: "#1b1412" }}
      >
        <p className="text-lg mb-6" style={{ color: "#a0967a" }}>
          Grozs ir tukšs
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all hover:brightness-110"
          style={{ background: "#d4af37", color: "#1b1412" }}
        >
          <ArrowLeft size={16} />
          Uz ēdienkarti
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col pt-16"
      style={{ background: "#1b1412" }}
    >
      {/* Page header */}
      <div
        className="py-12 px-4 relative overflow-hidden"
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
        <div className="max-w-4xl mx-auto">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm mb-4 transition-colors hover:text-[#d4af37]"
            style={{ color: "#a0967a" }}
          >
            <ArrowLeft size={15} />
            Atpakaļ uz grozu
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-4xl font-bold"
            style={{ color: "#f5f5f5" }}
          >
            Noformēt pasūtījumu
          </motion.h1>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Delivery type */}
              <div>
                <p
                  className="block text-sm font-semibold mb-3 tracking-wide"
                  style={{ color: "#f5f5f5" }}
                >
                  Piegādes veids *
                </p>
                <div
                  data-ocid="checkout.delivery_select"
                  className="grid grid-cols-2 gap-3"
                >
                  <button
                    type="button"
                    onClick={() => update("deliveryType", "delivery")}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all"
                    style={{
                      background:
                        form.deliveryType === "delivery"
                          ? "rgba(212,175,55,0.12)"
                          : "#241b17",
                      border:
                        form.deliveryType === "delivery"
                          ? "1.5px solid #d4af37"
                          : "1px solid #3a2e28",
                      color:
                        form.deliveryType === "delivery"
                          ? "#d4af37"
                          : "#a0967a",
                    }}
                  >
                    <Truck size={20} />
                    <span className="text-sm font-semibold">Piegāde</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => update("deliveryType", "pickup")}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all"
                    style={{
                      background:
                        form.deliveryType === "pickup"
                          ? "rgba(212,175,55,0.12)"
                          : "#241b17",
                      border:
                        form.deliveryType === "pickup"
                          ? "1.5px solid #d4af37"
                          : "1px solid #3a2e28",
                      color:
                        form.deliveryType === "pickup" ? "#d4af37" : "#a0967a",
                    }}
                  >
                    <Store size={20} />
                    <span className="text-sm font-semibold">
                      Saņemt uz vietas
                    </span>
                  </button>
                </div>

                {/* Pickup address info */}
                {form.deliveryType === "pickup" && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex items-center gap-2 px-4 py-3 rounded-lg"
                    style={{
                      background: "rgba(212,175,55,0.08)",
                      border: "1px solid rgba(212,175,55,0.2)",
                    }}
                  >
                    <MapPin
                      size={15}
                      style={{ color: "#d4af37", flexShrink: 0 }}
                    />
                    <p className="text-sm" style={{ color: "#a0967a" }}>
                      Saņemšanas adrese:{" "}
                      <span style={{ color: "#f5f5f5" }}>
                        Blaumaņa iela 34-2, Rīga
                      </span>
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold mb-2 tracking-wide"
                  style={{ color: "#f5f5f5" }}
                >
                  Tālrunis *
                </label>
                <input
                  id="phone"
                  type="tel"
                  data-ocid="checkout.phone_input"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+371 12 345 678"
                  autoComplete="tel"
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none focus:ring-1"
                  style={{
                    background: "#241b17",
                    border: errors.phone
                      ? "1.5px solid #c0392b"
                      : "1px solid #3a2e28",
                    color: "#f5f5f5",
                  }}
                />
                {errors.phone && (
                  <p
                    className="mt-1.5 text-xs"
                    style={{ color: "#c0392b" }}
                    data-ocid="checkout.phone_error"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold mb-2 tracking-wide"
                  style={{ color: "#f5f5f5" }}
                >
                  Vārds
                </label>
                <input
                  id="name"
                  type="text"
                  data-ocid="checkout.name_input"
                  value={form.customerName}
                  onChange={(e) => update("customerName", e.target.value)}
                  placeholder="Jūsu vārds"
                  autoComplete="name"
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none"
                  style={{
                    background: "#241b17",
                    border: "1px solid #3a2e28",
                    color: "#f5f5f5",
                  }}
                />
              </div>

              {/* Address (only if delivery) */}
              {form.deliveryType === "delivery" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label
                    htmlFor="address"
                    className="block text-sm font-semibold mb-2 tracking-wide"
                    style={{ color: "#f5f5f5" }}
                  >
                    Piegādes adrese *
                  </label>
                  <input
                    id="address"
                    type="text"
                    data-ocid="checkout.address_input"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    placeholder="Iela, māja, dzīvoklis, pilsēta"
                    autoComplete="street-address"
                    className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none"
                    style={{
                      background: "#241b17",
                      border: errors.address
                        ? "1.5px solid #c0392b"
                        : "1px solid #3a2e28",
                      color: "#f5f5f5",
                    }}
                  />
                  {errors.address && (
                    <p
                      className="mt-1.5 text-xs"
                      style={{ color: "#c0392b" }}
                      data-ocid="checkout.address_error"
                    >
                      {errors.address}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Delivery time */}
              <div>
                <label
                  htmlFor="deliveryTime"
                  className="block text-sm font-semibold mb-2 tracking-wide"
                  style={{ color: "#f5f5f5" }}
                >
                  <span className="flex items-center gap-2">
                    <Clock size={14} />
                    Vēlamais laiks (nav obligāts)
                  </span>
                </label>
                <input
                  id="deliveryTime"
                  type="text"
                  data-ocid="checkout.time_input"
                  value={form.deliveryTime}
                  onChange={(e) => update("deliveryTime", e.target.value)}
                  placeholder="piem. 14:00 vai Pēc iespējas ātrāk"
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none"
                  style={{
                    background: "#241b17",
                    border: "1px solid #3a2e28",
                    color: "#f5f5f5",
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                data-ocid="checkout.submit_button"
                className="w-full py-4 rounded-xl text-sm font-bold tracking-widest uppercase transition-all hover:brightness-110 active:scale-[0.98]"
                style={{ background: "#d4af37", color: "#1b1412" }}
              >
                Nosūtīt pasūtījumu
              </button>
            </motion.form>
          </div>

          {/* Order summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl p-6 sticky top-24"
              style={{ background: "#241b17", border: "1px solid #3a2e28" }}
            >
              <h2
                className="font-display text-lg font-bold mb-5"
                style={{ color: "#f5f5f5" }}
              >
                Jūsu pasūtījums
              </h2>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3 items-center">
                    <div className="w-12 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || PLACEHOLDER}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-medium truncate"
                        style={{ color: "#f5f5f5" }}
                      >
                        {item.name}
                      </p>
                      <p className="text-xs" style={{ color: "#a0967a" }}>
                        × {item.quantity}
                      </p>
                    </div>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: "#d4af37" }}
                    >
                      {(item.price * item.quantity) % 1 === 0
                        ? item.price * item.quantity
                        : (item.price * item.quantity).toFixed(2)}{" "}
                      €
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4" style={{ borderTop: "1px solid #3a2e28" }}>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: "#a0967a" }}>
                    Kopā
                  </span>
                  <span
                    className="font-display text-xl font-bold"
                    style={{ color: "#d4af37" }}
                  >
                    {totalPrice % 1 === 0 ? totalPrice : totalPrice.toFixed(2)}{" "}
                    €
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />

      <OrderSuccessModal
        isOpen={successModal.open}
        orderNumber={successModal.orderNumber}
        onClose={() => setSuccessModal((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
