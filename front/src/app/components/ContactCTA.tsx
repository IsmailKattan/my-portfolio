import { motion } from 'motion/react';
import { ArrowRight, Mail, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ContactCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/20 via-[#0a0e27] to-[#151933]" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-[#00d4ff]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#0ea5e9]/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Ready to secure your digital assets? I'm always open to discussing 
            new projects, opportunities, and partnerships.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/cv"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#00d4ff] text-[#0a0e27] rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#00d4ff]/30 transition-all hover:-translate-y-1"
            >
              <Briefcase className="w-5 h-5" />
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="mailto:contact@example.com"
              className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-[#00d4ff] text-[#00d4ff] rounded-xl font-semibold text-lg hover:bg-[#00d4ff] hover:text-[#0a0e27] transition-all"
            >
              <Mail className="w-5 h-5" />
              Get In Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
