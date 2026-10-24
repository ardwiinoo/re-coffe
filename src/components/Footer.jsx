import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiCoffee, FiInstagram, FiTwitter, FiFacebook, FiArrowUp } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" ref={ref}>
      <div className="container">
        <motion.div
          className="footer__grid"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Brand */}
          <div className="footer__brand">
            <a href="#home" className="footer__logo">
              <FiCoffee />
              <span>re-<strong>coffe</strong></span>
            </a>
            <p className="footer__tagline">
              Crafting moments, one cup at a time. Specialty coffee with love, from Jakarta to the world.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" className="footer__social" aria-label="Twitter"><FiTwitter /></a>
              <a href="#" className="footer__social" aria-label="Facebook"><FiFacebook /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__column">
            <h4 className="footer__column-title">Quick Links</h4>
            <ul className="footer__links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Hours */}
          <div className="footer__column">
            <h4 className="footer__column-title">Open Hours</h4>
            <ul className="footer__hours">
              <li><span>Mon — Fri</span><span>08:00 — 22:00</span></li>
              <li><span>Saturday</span><span>09:00 — 23:00</span></li>
              <li><span>Sunday</span><span>09:00 — 21:00</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer__column">
            <h4 className="footer__column-title">Stay Updated</h4>
            <p className="footer__newsletter-text">
              Subscribe untuk promo eksklusif dan update terbaru dari Re-Coffe.
            </p>
            <form className="footer__newsletter" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="your@email.com" />
              <button type="submit" aria-label="Subscribe">→</button>
            </form>
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="footer__bottom">
          <p>© 2024 Re-Coffe. All rights reserved. Made with ☕ in Jakarta.</p>
          <motion.button
            className="footer__back-top"
            onClick={scrollToTop}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <FiArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
