import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiInstagram, FiHeart } from 'react-icons/fi';
import './Gallery.css';

const galleryImages = [
  { src: '/images/about-img.png', alt: 'Barista at work', likes: 234 },
  { src: '/images/home-img-3.png', alt: 'Latte art heart', likes: 456 },
  { src: '/images/home-img-2.png', alt: 'Coffee mug', likes: 189 },
  { src: '/images/home-img-1.png', alt: 'Hot coffee cup', likes: 312 },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="gallery" className="gallery section-padding" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="gallery__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-subtitle">Gallery</span>
          <h2 className="section-title">
            Moments at <span style={{ color: 'var(--color-mocha)' }}>Re-Coffe</span>
          </h2>
          <p className="section-description" style={{ margin: '0 auto' }}>
            Beberapa momen indah yang tertangkap kamera dari kehidupan sehari-hari di kedai kami.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="gallery__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              className={`gallery__item gallery__item--${i + 1}`}
              variants={imageVariants}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.02 }}
            >
              <img src={img.src} alt={img.alt} className="gallery__image" />
              
              {/* Hover overlay */}
              <motion.div
                className="gallery__overlay"
                initial={false}
                animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="gallery__overlay-content">
                  <div className="gallery__overlay-icon">
                    <FiInstagram />
                  </div>
                  <div className="gallery__overlay-likes">
                    <FiHeart />
                    <span>{img.likes}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
