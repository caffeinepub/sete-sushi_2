import { useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronUp,
  LogOut,
  Package,
  Store,
  Truck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Order } from "../store/types";
import { useAdminStore, useOrdersStore } from "../store/useStore";

function formatDate(ts: number) {
  return new Date(ts).toLocaleString("lv-LV", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function OrderRow({ order, index }: { order: Order; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      data-ocid={`admin.order_row.${index + 1}`}
      className="rounded-xl overflow-hidden mb-3"
      style={{ border: "1px solid #3a2e28" }}
    >
      {/* Row header */}
      <button
        type="button"
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[#241b17]"
        style={{ background: expanded ? "#241b17" : "#1e1612" }}
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-4 flex-wrap">
          <span
            className="font-display text-sm font-bold"
            style={{ color: "#d4af37" }}
          >
            #{order.orderNumber}
          </span>
          <span className="text-sm" style={{ color: "#f5f5f5" }}>
            {order.phone}
          </span>
          {order.customerName && (
            <span className="text-sm" style={{ color: "#a0967a" }}>
              {order.customerName}
            </span>
          )}
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
            style={{
              background:
                order.deliveryType === "delivery"
                  ? "rgba(59,130,246,0.12)"
                  : "rgba(212,175,55,0.12)",
              color: order.deliveryType === "delivery" ? "#60a5fa" : "#d4af37",
            }}
          >
            {order.deliveryType === "delivery" ? (
              <Truck size={11} />
            ) : (
              <Store size={11} />
            )}
            {order.deliveryType === "delivery" ? "Delivery" : "Pickup"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span
            className="font-display font-bold text-sm hidden sm:block"
            style={{ color: "#d4af37" }}
          >
            {order.totalPrice % 1 === 0
              ? order.totalPrice
              : order.totalPrice.toFixed(2)}{" "}
            €
          </span>
          <span
            className="text-xs hidden md:block"
            style={{ color: "#7a6e5a" }}
          >
            {formatDate(order.createdAt)}
          </span>
          {expanded ? (
            <ChevronUp size={16} style={{ color: "#7a6e5a" }} />
          ) : (
            <ChevronDown size={16} style={{ color: "#7a6e5a" }} />
          )}
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              className="px-5 py-4"
              style={{ borderTop: "1px solid #3a2e28", background: "#241b17" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Items */}
                <div>
                  <h4
                    className="text-xs font-semibold uppercase tracking-wider mb-3"
                    style={{ color: "#a0967a" }}
                  >
                    Items
                  </h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex justify-between text-sm"
                      >
                        <span style={{ color: "#f5f5f5" }}>
                          {item.name}{" "}
                          <span style={{ color: "#7a6e5a" }}>
                            × {item.quantity}
                          </span>
                        </span>
                        <span style={{ color: "#d4af37" }}>
                          {(item.price * item.quantity) % 1 === 0
                            ? item.price * item.quantity
                            : (item.price * item.quantity).toFixed(2)}{" "}
                          €
                        </span>
                      </div>
                    ))}
                    <div
                      className="flex justify-between text-sm font-semibold pt-2"
                      style={{ borderTop: "1px solid #3a2e28" }}
                    >
                      <span style={{ color: "#a0967a" }}>Total</span>
                      <span style={{ color: "#d4af37" }}>
                        {order.totalPrice % 1 === 0
                          ? order.totalPrice
                          : order.totalPrice.toFixed(2)}{" "}
                        €
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h4
                    className="text-xs font-semibold uppercase tracking-wider mb-3"
                    style={{ color: "#a0967a" }}
                  >
                    Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-xs" style={{ color: "#7a6e5a" }}>
                        Phone:{" "}
                      </span>
                      <span style={{ color: "#f5f5f5" }}>{order.phone}</span>
                    </div>
                    {order.customerName && (
                      <div>
                        <span className="text-xs" style={{ color: "#7a6e5a" }}>
                          Name:{" "}
                        </span>
                        <span style={{ color: "#f5f5f5" }}>
                          {order.customerName}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="text-xs" style={{ color: "#7a6e5a" }}>
                        Address:{" "}
                      </span>
                      <span style={{ color: "#f5f5f5" }}>{order.address}</span>
                    </div>
                    {order.deliveryTime && (
                      <div>
                        <span className="text-xs" style={{ color: "#7a6e5a" }}>
                          Time:{" "}
                        </span>
                        <span style={{ color: "#f5f5f5" }}>
                          {order.deliveryTime}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="text-xs" style={{ color: "#7a6e5a" }}>
                        Ordered:{" "}
                      </span>
                      <span style={{ color: "#a0967a" }}>
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AdminOrdersPage() {
  const navigate = useNavigate();
  const isAdmin = useAdminStore((s) => s.isAdmin);
  const logout = useAdminStore((s) => s.logout);
  const orders = useOrdersStore((s) => s.orders);

  if (!isAdmin) {
    navigate({ to: "/admin" });
    return null;
  }

  return (
    <div className="min-h-screen" style={{ background: "#1b1412" }}>
      {/* Admin header */}
      <header
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid #3a2e28", background: "#150f0d" }}
      >
        <div className="flex items-center gap-6">
          <span
            className="font-display text-2xl font-bold"
            style={{ color: "#d4af37" }}
          >
            SETE
          </span>
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#7a6e5a" }}
          >
            Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/admin/products" })}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:bg-[#3a2e28]"
            style={{ color: "#a0967a" }}
          >
            <Package size={16} />
            Products
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/home" })}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:bg-[#3a2e28]"
            style={{ color: "#a0967a" }}
          >
            View site
          </button>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate({ to: "/admin" });
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:bg-[#3a2e28]"
            style={{ color: "#a0967a" }}
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </header>

      <main className="p-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "#f5f5f5" }}>
            Orders
          </h1>
          <p className="text-sm mt-1" style={{ color: "#7a6e5a" }}>
            {orders.length} total order{orders.length !== 1 ? "s" : ""}
          </p>
        </div>

        {orders.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="admin.orders_empty_state"
          >
            <Package size={40} style={{ color: "#3a2e28" }} />
            <p className="mt-4 text-sm" style={{ color: "#7a6e5a" }}>
              No orders yet
            </p>
          </div>
        ) : (
          <div>
            {orders.map((order, i) => (
              <OrderRow key={order.orderNumber} order={order} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
