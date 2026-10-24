import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './About.css';

const features = [
  {
    icon: '/images/about-icon-1.png',
    title: 'Premium Beans',
    desc: 'Biji kopi pilihan dari petani lokal terbaik Indonesia.',
  },
  {
    icon: '/images/about-icon-2.png',
    title: 'Cozy Space',
    desc: 'Suasana nyaman yang sempurna untuk bekerja atau bersantai.',
  },
  {
    icon: '/images/about-icon-3.png',
    title: 'Fast Delivery',
    desc: 'Layanan pesan antar cepat langsung ke pintu rumahmu.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="about section-padding" ref={ref}>
      <div className="container">
        <motion.div
          className="about__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Image Side */}
          <motion.div className="about__image-wrapper" variants={itemVariants}>
            <div className="about__image-container">
              <img src="/images/about-img.png" alt="Barista Re-Coffe" className="about__image" />
              <div className="about__image-accent" />
            </div>
            {/* Experience Badge */}
            <motion.div
              className="about__experience"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
            >
              <span className="about__experience-number">5+</span>
              <span className="about__experience-text">Years of<br />Experience</span>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <div className="about__content">
            <motion.span className="section-subtitle" variants={itemVariants}>
              About Us
            </motion.span>
            <motion.h2 className="section-title" variants={itemVariants}>
              Crafting Moments,<br />
              <span className="about__title-accent">One Cup at a Time</span>
            </motion.h2>
            <motion.p className="section-description" variants={itemVariants}>
              Re-Coffe berdiri sejak 2020 dengan satu misi sederhana — menyajikan kopi terbaik
              dengan pengalaman yang tak terlupakan. Kami percaya bahwa secangkir kopi yang baik
              bisa mengubah hari seseorang menjadi lebih bermakna.
            </motion.p>

            {/* Features */}
            <motion.div className="about__features" variants={containerVariants}>
              {features.map((feature, i) => (
                <motion.div key={i} className="about__feature" variants={itemVariants}>
                  <div className="about__feature-icon">
                    <img src={feature.icon} alt={feature.title} />
                  </div>
                  <div className="about__feature-text">
                    <h4>{feature.title}</h4>
                    <p>{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
