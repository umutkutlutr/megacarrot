import { Twitter, MessageCircle, FileText, Code, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  const socialLinks = [
    { icon: Twitter, label: 'Twitter / X', href: '#' },
    { icon: MessageCircle, label: 'Discord', href: '#' },
    { icon: FileText, label: 'Docs', href: '#' },
    { icon: Code, label: 'Smart Contracts', href: '#' },
    { icon: BookOpen, label: 'Whitepaper', href: '#' }
  ];

  return (
    <footer className="border-t border-white/10 bg-[#0a0a0f]/80 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="bg-gradient-to-r from-[#00d9ff] to-[#b537ff] bg-clip-text text-transparent mb-2">
              BlinkRush
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              BlinkRush is a real-time reflex arena built on MegaETH.
              Play, win, burn, and play again.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div 
            className="flex flex-wrap gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="flex items-center gap-2 text-white/60 hover:text-[#00d9ff] transition-colors"
                whileHover={{ 
                  scale: 1.1,
                  y: -2
                }}
                transition={{ duration: 0.2 }}
              >
                <link.icon className="w-5 h-5" />
                <span className="text-sm">{link.label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div 
            className="text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm text-white/40">
              © 2025 BlinkRush. All rights reserved.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="mt-8 pt-8 border-t border-white/5 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-xs text-white/40">
            © BlinkRush · Built on MegaETH · All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}