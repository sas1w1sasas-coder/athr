import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "../data/products";

export default function Testimonials() {
  return (
    <section className="relative py-20 sm:py-28 bg-dark-900 noise-overlay">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-gold-400/15 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-gold-400/15 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm text-gold-400 tracking-widest mb-3 font-medium">
            آراء العملاء
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-beige-100 mb-4">
            انطباعات صنعت الثقة
          </h2>
          <div className="w-24 h-px bg-gradient-to-l from-transparent via-gold-400 to-transparent mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="card-lift relative bg-dark-800/50 border border-gold-400/10 rounded-sm p-6 sm:p-8 h-full hover:border-gold-400/25 transition-all duration-500">
                <div className="absolute top-6 left-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-10 h-10 text-gold-400" />
                </div>

                <div className="flex gap-1 mb-5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-gold-400 fill-gold-400"
                    />
                  ))}
                </div>

                <p className="text-beige-200/70 leading-relaxed mb-6 text-sm sm:text-base">
                  {testimonial.text}
                </p>

                <div className="flex items-center gap-3 pt-5 border-t border-gold-400/10">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-400/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-gold-400">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-beige-100">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-beige-200/40">
                      عميل موثق
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
