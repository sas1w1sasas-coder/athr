import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AdminOrder, AdminProduct } from "../admin/data/mockData";
import type { Product } from "../data/products";
import { defaultOrders, defaultProducts, defaultSettings, type CreateOrderInput, type StoreSettings } from "./storeDefaults";
import { hasSupabaseConfig, supabase } from "./supabaseClient";

type OrderStatus = AdminOrder["status"];

interface StoreContextValue {
  storefrontProducts: Product[];
  adminProducts: AdminProduct[];
  orders: AdminOrder[];
  settings: StoreSettings;
  loading: boolean;
  authLoading: boolean;
  isAdmin: boolean;
  adminEmail: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  saveProduct: (product: Partial<AdminProduct>, editingId?: number | null) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  toggleProductVisibility: (id: number) => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  saveOrderInternalNote: (id: string, note: string) => Promise<void>;
  saveSettings: (nextSettings: StoreSettings) => Promise<void>;
  createOrder: (input: CreateOrderInput) => Promise<{ success: boolean; orderId: string }>;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

function badgeColorFromLabel(label?: string) {
  if (!label) return "bg-gold-500";
  if (label.includes("هدية")) return "bg-brown-500";
  if (label.includes("محدود")) return "bg-brown-600";
  return "bg-gold-500";
}

function mapAdminToStorefront(product: AdminProduct): Product {
  return {
    id: product.id,
    name: product.name,
    subtitle: product.subtitle,
    description: product.description,
    longDescription: product.description,
    price: product.price,
    size: product.size,
    image: product.image,
    badge: product.badges[0],
    badgeColor: badgeColorFromLabel(product.badges[0]),
    notes: {
      top: product.topNotes,
      middle: product.middleNotes,
      base: product.baseNotes,
    },
  };
}

function mapProductRow(row: any): AdminProduct {
  return {
    id: Number(row.id),
    name: row.name,
    subtitle: row.subtitle ?? "",
    description: row.description ?? "",
    price: Number(row.price ?? 0),
    size: row.size ?? "",
    category: row.category ?? "",
    badges: Array.isArray(row.badges) ? row.badges : [],
    image: row.image ?? "/images/perfume-oud.jpg",
    visible: row.visible ?? true,
    topNotes: Array.isArray(row.top_notes) ? row.top_notes : [],
    middleNotes: Array.isArray(row.middle_notes) ? row.middle_notes : [],
    baseNotes: Array.isArray(row.base_notes) ? row.base_notes : [],
  };
}

function toProductRow(product: AdminProduct) {
  return {
    id: product.id,
    name: product.name,
    subtitle: product.subtitle,
    description: product.description,
    price: product.price,
    size: product.size,
    category: product.category,
    badges: product.badges,
    image: product.image,
    visible: product.visible,
    top_notes: product.topNotes,
    middle_notes: product.middleNotes,
    base_notes: product.baseNotes,
  };
}

function mapOrderRow(row: any): AdminOrder {
  return {
    id: row.id,
    customerName: row.customer_name,
    phone: row.phone,
    city: row.city,
    paymentMethod: row.payment_method,
    total: Number(row.total ?? 0),
    status: row.status,
    date: row.date,
    items: Array.isArray(row.items) ? row.items : [],
    notes: row.notes ?? "",
    internalNotes: row.internal_notes ?? "",
  };
}

function toOrderRow(order: AdminOrder) {
  return {
    id: order.id,
    customer_name: order.customerName,
    phone: order.phone,
    city: order.city,
    payment_method: order.paymentMethod,
    total: order.total,
    status: order.status,
    date: order.date,
    items: order.items,
    notes: order.notes,
    internal_notes: order.internalNotes,
  };
}

function mapSettingsRow(row: any): StoreSettings {
  return {
    storeName: row.store_name ?? defaultSettings.storeName,
    whatsapp: row.whatsapp ?? defaultSettings.whatsapp,
    email: row.email ?? defaultSettings.email,
    workingHours: row.working_hours ?? defaultSettings.workingHours,
    instapay: row.instapay ?? defaultSettings.instapay,
    vodafoneCash: row.vodafone_cash ?? defaultSettings.vodafoneCash,
    bankTransfer: row.bank_transfer ?? defaultSettings.bankTransfer,
  };
}

function toSettingsRow(settings: StoreSettings) {
  return {
    id: 1,
    store_name: settings.storeName,
    whatsapp: settings.whatsapp,
    email: settings.email,
    working_hours: settings.workingHours,
    instapay: settings.instapay,
    vodafone_cash: settings.vodafoneCash,
    bank_transfer: settings.bankTransfer,
  };
}

function formatOrderId() {
  const year = new Date().getFullYear();
  const serial = Date.now().toString().slice(-6);
  return `ORD-${year}-${serial}`;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [adminProducts, setAdminProducts] = useState<AdminProduct[]>(defaultProducts);
  const [orders, setOrders] = useState<AdminOrder[]>(defaultOrders);
  const [settings, setSettings] = useState<StoreSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  const storefrontProducts = useMemo(
    () => adminProducts.filter((product) => product.visible).map(mapAdminToStorefront),
    [adminProducts],
  );

  const loadRemoteData = useCallback(async () => {
    if (!supabase || !hasSupabaseConfig) {
      setLoading(false);
      setAuthLoading(false);
      return;
    }

    try {
      const [{ data: productRows }, { data: orderRows }, { data: settingsRows }, { data: sessionData }] = await Promise.all([
        supabase.from("athr_products").select("*").order("id", { ascending: true }),
        supabase.from("athr_orders").select("*").order("date", { ascending: false }),
        supabase.from("athr_store_settings").select("*").limit(1),
        supabase.auth.getSession(),
      ]);

      if (Array.isArray(productRows)) {
        setAdminProducts(productRows.map(mapProductRow));
      }

      if (Array.isArray(orderRows)) {
        setOrders(orderRows.map(mapOrderRow));
      }

      if (Array.isArray(settingsRows) && settingsRows[0]) {
        setSettings(mapSettingsRow(settingsRows[0]));
      }

      const session = sessionData.data.session;
      setIsAdmin(Boolean(session?.user));
      setAdminEmail(session?.user?.email ?? null);
    } catch {
      // Keep local fallback data if remote bootstrap fails.
    } finally {
      setLoading(false);
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRemoteData();

    if (!supabase) return;

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(Boolean(session?.user));
      setAdminEmail(session?.user?.email ?? null);
      setAuthLoading(false);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [loadRemoteData]);

  const login = useCallback(async (email: string, password: string) => {
    if (!supabase) {
      return { success: false, error: "بيانات الربط غير مكتملة." };
    }

    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { success: false, error: "تعذر تسجيل الدخول. راجع البريد وكلمة المرور." };
    }

    setIsAdmin(Boolean(data.user));
    setAdminEmail(data.user?.email ?? null);
    return { success: true };
  }, []);

  const logout = useCallback(async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setIsAdmin(false);
    setAdminEmail(null);
  }, []);

  const saveProduct = useCallback(async (product: Partial<AdminProduct>, editingId?: number | null) => {
    const normalized: AdminProduct = editingId
      ? ({ ...(adminProducts.find((item) => item.id === editingId) as AdminProduct), ...product } as AdminProduct)
      : {
          id: Number(product.id ?? Date.now()),
          name: product.name ?? "",
          subtitle: product.subtitle ?? "",
          description: product.description ?? "",
          price: Number(product.price ?? 0),
          size: product.size ?? "",
          category: product.category ?? "",
          badges: product.badges ?? [],
          image: product.image ?? "/images/perfume-oud.jpg",
          visible: product.visible ?? true,
          topNotes: product.topNotes ?? [],
          middleNotes: product.middleNotes ?? [],
          baseNotes: product.baseNotes ?? [],
        };

    setAdminProducts((prev) => {
      if (editingId) {
        return prev.map((item) => (item.id === editingId ? normalized : item));
      }
      return [...prev, normalized];
    });

    if (supabase) {
      await supabase.from("athr_products").upsert(toProductRow(normalized));
    }
  }, [adminProducts]);

  const deleteProduct = useCallback(async (id: number) => {
    setAdminProducts((prev) => prev.filter((product) => product.id !== id));
    if (supabase) {
      await supabase.from("athr_products").delete().eq("id", id);
    }
  }, []);

  const toggleProductVisibility = useCallback(async (id: number) => {
    let nextVisible = true;
    setAdminProducts((prev) =>
      prev.map((product) => {
        if (product.id !== id) return product;
        nextVisible = !product.visible;
        return { ...product, visible: nextVisible };
      }),
    );

    if (supabase) {
      await supabase.from("athr_products").update({ visible: nextVisible }).eq("id", id);
    }
  }, []);

  const updateOrderStatus = useCallback(async (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)));
    if (supabase) {
      await supabase.from("athr_orders").update({ status }).eq("id", id);
    }
  }, []);

  const saveOrderInternalNote = useCallback(async (id: string, note: string) => {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, internalNotes: note } : order)));
    if (supabase) {
      await supabase.from("athr_orders").update({ internal_notes: note }).eq("id", id);
    }
  }, []);

  const saveSettings = useCallback(async (nextSettings: StoreSettings) => {
    setSettings(nextSettings);
    if (supabase) {
      await supabase.from("athr_store_settings").upsert(toSettingsRow(nextSettings));
    }
  }, []);

  const createOrder = useCallback(async (input: CreateOrderInput) => {
    const orderId = formatOrderId();
    const nextOrder: AdminOrder = {
      id: orderId,
      customerName: input.customerName,
      phone: input.phone,
      city: input.city,
      paymentMethod: input.paymentMethod,
      total: input.items.reduce((sum, item) => sum + item.price * item.qty, 0),
      status: "new",
      date: new Date().toISOString().slice(0, 10),
      items: input.items,
      notes: input.notes,
      internalNotes: "",
    };

    setOrders((prev) => [nextOrder, ...prev]);

    if (supabase) {
      await supabase.from("athr_orders").insert(toOrderRow(nextOrder));
    }

    return { success: true, orderId };
  }, []);

  const value: StoreContextValue = {
    storefrontProducts,
    adminProducts,
    orders,
    settings,
    loading,
    authLoading,
    isAdmin,
    adminEmail,
    login,
    logout,
    saveProduct,
    deleteProduct,
    toggleProductVisibility,
    updateOrderStatus,
    saveOrderInternalNote,
    saveSettings,
    createOrder,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
}
