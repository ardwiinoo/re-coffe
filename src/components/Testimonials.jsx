import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Coffee Enthusiast',
    avatar: '/images/pic-2.png',
    text: '"Re-Coffe benar-benar mengubah cara saya menikmati kopi. Suasananya cozy banget, baristanya friendly, dan kopinya? Luar biasa! Setiap kunjungan selalu jadi pengalaman yang spesial."',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'Remote Worker',
    avatar: '/images/pic-3.png',
    text: '"Tempat terbaik untuk bekerja sambil ngopi. WiFi kencang, suasana tenang, dan espresso-nya top! Saya hampir setiap hari ke sini untuk menyelesaikan pekerjaan."',
    rating: 5,
  },
  {
    name: 'Amanda Rivera',
    role: 'Food Blogger',
    avatar: '/images/pic-4.png',
    text: '"Sebagai food blogger, saya sudah mencoba banyak kedai kopi. Re-Coffe punya cita rasa yang unik dan konsisten. Matcha Latte mereka adalah yang terbaik di kota ini!"',
    rating: 5,
  },
  {
    name: 'Michael Torres',
    role: 'Regular Customer',
    avatar: '/images/pic-1.png',
    text: '"Dari pertama kali datang, saya langsung jatuh cinta. Staff-nya ramah, tempatnya bersih, dan yang paling penting — kopi mereka selalu konsisten enak setiap hari."',
    rating: 5,
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
};

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [[current, direction], setCurrent] = useState([0, 0]);

  const paginate = (dir) => {
    setCurrent([
      (current + dir + testimonials.length) % testimonials.length,
      dir,
    ]);
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [current]);

  const testimonial = testimonials[current];

  return (
    <section id="testimonials" className="testimonials section-padding" ref={ref}>
      <div className="container">
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-subtitle">Testimonials</span>
          <h2 className="section-title">
            What Our <span style={{ color: 'var(--color-mocha)' }}>Guests</span> Say
          </h2>
        </motion.div>

        <motion.div
          className="testimonials__slider"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="testimonials__slide-wrapper">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                className="testimonials__card"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Quote mark */}
                <div className="testimonials__quote">"</div>

                {/* Stars */}
                <div className="testimonials__stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                {/* Text */}
                <p className="testimonials__text">{testimonial.text}</p>

                {/* Author */}
                <div className="testimonials__author">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="testimonials__avatar"
                  />
                  <div>
                    <h4 className="testimonials__name">{testimonial.name}</h4>
                    <span className="testimonials__role">{testimonial.role}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="testimonials__nav">
            <button
              className="testimonials__arrow"
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
            >
              <FiChevronLeft />
            </button>

            {/* Dots */}
            <div className="testimonials__dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
                  onClick={() => setCurrent([i, i > current ? 1 : -1])}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="testimonials__arrow"
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
            >
              <FiChevronRight />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
