import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FiArrowDown } from 'react-icons/fi';
import './Hero.css';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);

  const coffeeImages = [
    { src: '/images/home-img-1.png', alt: 'Hot Coffee Cup' },
    { src: '/images/home-img-2.png', alt: 'Coffee Mug' },
    { src: '/images/home-img-3.png', alt: 'Latte Art' },
  ];

  return (
    <section id="home" className="hero" ref={ref}>
      {/* Parallax Background */}
      <motion.div className="hero__bg" style={{ y: bgY }}>
        <img src="/images/home-bg.jpg" alt="Coffee background" />
        <div className="hero__bg-overlay" />
      </motion.div>

      {/* Floating coffee beans decoration */}
      <div className="hero__decorations">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="hero__bean"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.15, 0.35, 0.15],
              y: [0, -20, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.7,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            ☕
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <motion.div className="hero__content container" style={{ y: textY, opacity, scale }}>
        <div className="hero__text">
          <motion.span
            className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            ✦ Specialty Coffee Since 2020
          </motion.span>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Where Every Cup
            <br />
            <span className="hero__title-accent">Tells a Story</span>
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            Nikmati pengalaman ngopi yang berbeda di Re-Coffe.
            Setiap biji kopi dipilih dengan teliti, disangrai dengan sempurna,
            dan disajikan dengan penuh cinta.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <a href="#menu" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Explore Menu
            </a>
            <a href="#about" className="btn btn-outline" onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Our Story
            </a>
          </motion.div>
        </div>

        {/* Floating coffee images */}
        <div className="hero__images">
          {coffeeImages.map((img, i) => (
            <motion.div
              key={i}
              className={`hero__float-img hero__float-img--${i + 1}`}
              initial={{ opacity: 0, scale: 0.5, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, i % 2 === 0 ? 3 : -3, 0],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiArrowDown />
        </motion.div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
}
