import type { AdminOrder, AdminProduct } from "../admin/data/mockData";

export interface StoreSettings {
  storeName: string;
  whatsapp: string;
  email: string;
  workingHours: string;
  instapay: boolean;
  vodafoneCash: boolean;
  bankTransfer: boolean;
}

export interface CreateOrderInput {
  customerName: string;
  phone: string;
  city: string;
  paymentMethod: string;
  notes: string;
  items: { name: string; price: number; qty: number }[];
}

export const defaultSettings: StoreSettings = {
  storeName: "أثر",
  whatsapp: "966500000000",
  email: "hello@athr-perfumes.com",
  workingHours: "السبت إلى الخميس: 9 ص - 10 م",
  instapay: true,
  vodafoneCash: true,
  bankTransfer: true,
};

export const defaultProducts: AdminProduct[] = [
  {
    id: 1,
    name: "دهن العود الملكي",
    subtitle: "تركيبة شرقية فاخرة",
    description: "نفحات عود عميقة مع لمسات عنبر وخشب دافئ تمنح حضورًا قويًا وثباتًا واضحًا.",
    price: 1850,
    size: "100 مل",
    category: "عطور شرقية",
    badges: ["الأكثر طلبًا", "إصدار فاخر"],
    image: "/images/perfume-oud.jpg",
    visible: true,
    topNotes: ["عود نقي", "زعفران", "هيل"],
    middleNotes: ["عنبر", "بخور", "توابل شرقية"],
    baseNotes: ["خشب الصندل", "مسك", "أخشاب داكنة"],
  },
  {
    id: 2,
    name: "مسك الطهارة الفاخر",
    subtitle: "نظافة ناعمة تدوم",
    description: "مزيج ناعم من المسك الأبيض والياسمين ولمسة بودرية هادئة تناسب الاستخدام اليومي.",
    price: 680,
    size: "50 مل",
    category: "عطور زهرية",
    badges: ["هدية مثالية"],
    image: "/images/perfume-musk.jpg",
    visible: true,
    topNotes: ["مسك أبيض", "برغموت", "لمسة حمضية"],
    middleNotes: ["ياسمين", "ورد أبيض", "بودرة ناعمة"],
    baseNotes: ["عنبر خفيف", "فانيليا", "خشب نظيف"],
  },
  {
    id: 3,
    name: "ورد دمشقي",
    subtitle: "زهري شرقي رقيق",
    description: "ورود دمشقية ناعمة مع قلب دافئ من الصندل ولمسات أنثوية أنيقة.",
    price: 920,
    size: "75 مل",
    category: "عطور زهرية",
    badges: [],
    image: "/images/perfume-rose.jpg",
    visible: true,
    topNotes: ["ورد دمشقي", "برغموت", "فلفل وردي"],
    middleNotes: ["ياسمين", "سوسن", "زهر أبيض"],
    baseNotes: ["صندل", "مسك", "عنبر"],
  },
  {
    id: 4,
    name: "عنبر الليل",
    subtitle: "دفء المساء",
    description: "عنبر غني مع فانيليا داكنة ولمسة بخور تناسب الأجواء المسائية والمناسبات.",
    price: 1100,
    size: "90 مل",
    category: "عطور شرقية",
    badges: ["إصدار فاخر"],
    image: "/images/perfume-amber.jpg",
    visible: true,
    topNotes: ["عنبر", "تتبيلات خفيفة", "برغموت"],
    middleNotes: ["فانيليا", "بخور", "جلد ناعم"],
    baseNotes: ["مسك", "أخشاب داكنة", "باتشولي"],
  },
  {
    id: 5,
    name: "زعفران الشرق",
    subtitle: "طابع عربي أنيق",
    description: "زعفران نقي مع عنبر وتوابل شرقية يمنح العطر شخصية فاخرة وواضحة.",
    price: 1350,
    size: "60 مل",
    category: "عطور شرقية",
    badges: ["كمية محدودة"],
    image: "/images/perfume-saffron.jpg",
    visible: true,
    topNotes: ["زعفران", "هيل", "برغموت"],
    middleNotes: ["عنبر", "توابل", "ورد خفيف"],
    baseNotes: ["باتشولي", "خشب الأرز", "مسك"],
  },
  {
    id: 6,
    name: "إصدار أثر الخاص",
    subtitle: "توقيع البراند",
    description: "تركيبة مركزة تجمع بين أندر المكونات الشرقية والعالمية داخل إصدار محدود.",
    price: 2400,
    size: "50 مل",
    category: "إصدارات خاصة",
    badges: ["إصدار محدود"],
    image: "/images/perfume-special.jpg",
    visible: true,
    topNotes: ["ورود فاخرة", "برغموت", "بهارات ناعمة"],
    middleNotes: ["عود", "عنبر", "ياسمين"],
    baseNotes: ["فانيليا", "مسك أبيض", "صندل"],
  },
];

export const defaultOrders: AdminOrder[] = [
  {
    id: "ORD-2026-001",
    customerName: "أحمد محمد",
    phone: "01001234567",
    city: "القاهرة",
    paymentMethod: "فودافون كاش",
    total: 1850,
    status: "new",
    date: "2026-04-20",
    items: [{ name: "دهن العود الملكي", price: 1850, qty: 1 }],
    notes: "يريد تغليف هدية",
    internalNotes: "",
  },
];

export const categories = ["عطور شرقية", "عطور زهرية", "إصدارات خاصة"];
export const paymentMethods = ["إنستاباي", "فودافون كاش", "تحويل بنكي", "واتساب لتأكيد التحويل"];
