import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";

const navLinks = [
  { label: "الرئيسية", href: "#hero" },
  { label: "المنتجات", href: "#products" },
  { label: "طريقة الطلب", href: "#order" },
  { label: "الأسئلة", href: "#faq" },
  { label: "تواصل معنا", href: "#contact" },
];

interface NavbarProps {
  onOpenCart: () => void;
  cartCount: number;
}

export default function Navbar({ onOpenCart, cartCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-dark-900/95 backdrop-blur-md border-b border-gold-400/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="flex items-center gap-2"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-400 tracking-wide">
              أثر
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-beige-200/80 hover:text-gold-400 transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenCart}
              className="relative w-10 h-10 flex items-center justify-center border border-gold-400/20 rounded-sm hover:border-gold-400/40 hover:bg-gold-500/5 transition-all"
              aria-label="سلة الطلبات"
            >
              <ShoppingBag className="w-4 h-4 text-gold-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gold-500 text-dark-900 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <a
              href="#order"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#order");
              }}
              className="btn-shine inline-flex items-center gap-2 px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-dark-900 text-sm font-bold rounded-sm transition-colors duration-300"
            >
              اطلب الآن
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gold-400 hover:text-gold-300 transition-colors"
            aria-label="فتح القائمة"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark-900/98 backdrop-blur-lg border-b border-gold-400/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="block text-base font-medium text-beige-200/80 hover:text-gold-400 transition-colors py-2"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCart();
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-gold-400/20 text-gold-400 text-sm font-bold rounded-sm hover:bg-gold-500/5 transition-colors mt-2"
              >
                <ShoppingBag className="w-4 h-4" />
                سلة الطلبات
                {cartCount > 0 && (
                  <span className="mr-1 px-2 py-0.5 bg-gold-500 text-dark-900 text-xs font-bold rounded-sm">
                    {cartCount}
                  </span>
                )}
              </motion.button>
              <motion.a
                href="#order"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#order");
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="btn-shine inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gold-500 hover:bg-gold-400 text-dark-900 text-sm font-bold rounded-sm transition-colors mt-2"
              >
                اطلب الآن
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
