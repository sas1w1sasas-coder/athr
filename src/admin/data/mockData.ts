export interface AdminProduct {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  size: string;
  category: string;
  badges: string[];
  image: string;
  visible: boolean;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
}

export interface AdminOrder {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  paymentMethod: string;
  total: number;
  status: "new" | "contacted" | "pending_payment" | "confirmed" | "shipped" | "completed" | "cancelled";
  date: string;
  items: { name: string; price: number; qty: number }[];
  notes: string;
  internalNotes: string;
}

export const products: AdminProduct[] = [
  {
    id: 1,
    name: "أثر الذهبي",
    subtitle: "عطر شرقي فاخر",
    description: "مزيج دافئ من العود والمسك والعنبر بطابع عربي أنيق.",
    price: 1850,
    size: "100 مل",
    category: "عطور شرقية",
    badges: ["الأكثر طلبًا", "إصدار فاخر"],
    image: "/images/perfume-oud.jpg",
    visible: true,
    topNotes: ["ورد بلغاري", "زعفران"],
    middleNotes: ["عود", "عنبر"],
    baseNotes: ["مسك أبيض", "فانيليا"],
  },
  {
    id: 2,
    name: "ليلى",
    subtitle: "زهري ناعم",
    description: "رائحة هادئة من الياسمين والمسك بلمسة أنثوية رقيقة.",
    price: 1200,
    size: "75 مل",
    category: "عطور زهرية",
    badges: ["هدية مثالية"],
    image: "/images/perfume-rose.jpg",
    visible: true,
    topNotes: ["ياسمين", "برغموت"],
    middleNotes: ["ورد", "زهر أبيض"],
    baseNotes: ["مسك", "صندل"],
  },
  {
    id: 3,
    name: "صحراء الليل",
    subtitle: "دفء شرقي عميق",
    description: "رائحة مسائية غنية تجمع بين التوابل والعنبر والأخشاب الداكنة.",
    price: 2100,
    size: "100 مل",
    category: "عطور شرقية",
    badges: ["إصدار فاخر"],
    image: "/images/perfume-amber.jpg",
    visible: true,
    topNotes: ["قرنفل", "فلفل وردي"],
    middleNotes: ["عنبر", "باتشولي"],
    baseNotes: ["عود", "لبان"],
  },
  {
    id: 4,
    name: "بحر العود",
    subtitle: "منعش بطابع عربي",
    description: "انتعاش بحري هادئ ممزوج بلمسة عود تمنح العطر توازنًا مميزًا.",
    price: 950,
    size: "75 مل",
    category: "عطور منعشة",
    badges: ["جديد"],
    image: "/images/perfume-musk.jpg",
    visible: true,
    topNotes: ["ليمون", "برغموت"],
    middleNotes: ["أعشاب منعشة", "زعتر"],
    baseNotes: ["عنبر بحري", "صندل"],
  },
];

export const orders: AdminOrder[] = [
  {
    id: "ORD-2026-001",
    customerName: "أحمد محمد",
    phone: "01001234567",
    city: "القاهرة",
    paymentMethod: "فودافون كاش",
    total: 1850,
    status: "new",
    date: "2026-04-20",
    items: [{ name: "أثر الذهبي", price: 1850, qty: 1 }],
    notes: "يريد تغليف هدية",
    internalNotes: "",
  },
  {
    id: "ORD-2026-002",
    customerName: "سارة عبدالله",
    phone: "01009876543",
    city: "الإسكندرية",
    paymentMethod: "إنستاباي",
    total: 2400,
    status: "contacted",
    date: "2026-04-19",
    items: [
      { name: "ليلى", price: 1200, qty: 1 },
      { name: "بحر العود", price: 1200, qty: 1 },
    ],
    notes: "",
    internalNotes: "تم التواصل وبانتظار التحويل",
  },
  {
    id: "ORD-2026-003",
    customerName: "خالد محمود",
    phone: "01112223334",
    city: "الجيزة",
    paymentMethod: "تحويل بنكي",
    total: 2100,
    status: "pending_payment",
    date: "2026-04-18",
    items: [{ name: "صحراء الليل", price: 2100, qty: 1 }],
    notes: "",
    internalNotes: "أُرسلت تفاصيل الحساب البنكي",
  },
  {
    id: "ORD-2026-004",
    customerName: "نورا سامي",
    phone: "01223334445",
    city: "المنصورة",
    paymentMethod: "فودافون كاش",
    total: 1200,
    status: "confirmed",
    date: "2026-04-17",
    items: [{ name: "ليلى", price: 1200, qty: 1 }],
    notes: "هدية لصديقة",
    internalNotes: "تم تأكيد التحويل",
  },
  {
    id: "ORD-2026-005",
    customerName: "عمر حسين",
    phone: "01005556677",
    city: "القاهرة",
    paymentMethod: "إنستاباي",
    total: 2800,
    status: "shipped",
    date: "2026-04-16",
    items: [
      { name: "أثر الذهبي", price: 1850, qty: 1 },
      { name: "بحر العود", price: 950, qty: 1 },
    ],
    notes: "",
    internalNotes: "تم الشحن عبر شركة محلية",
  },
];

export const statusLabels: Record<string, string> = {
  new: "جديد",
  contacted: "تم التواصل",
  pending_payment: "بانتظار التحويل",
  confirmed: "تم التأكيد",
  shipped: "تم الشحن",
  completed: "مكتمل",
  cancelled: "ملغي",
};

export const statusColors: Record<string, string> = {
  new: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  contacted: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  pending_payment: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  confirmed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  shipped: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  completed: "bg-gold/15 text-gold border-gold/30",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
};

export const categories = ["عطور شرقية", "عطور زهرية", "عطور منعشة"];
export const paymentMethods = ["إنستاباي", "فودافون كاش", "تحويل بنكي"];
