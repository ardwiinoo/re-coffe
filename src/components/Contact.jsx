import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiMapPin, FiPhone, FiClock, FiMail, FiSend } from 'react-icons/fi';
import './Contact.css';

const contactInfo = [
  { icon: <FiMapPin />, title: 'Location', detail: 'Jl. Kopi Nusantara No. 42, Jakarta Selatan' },
  { icon: <FiPhone />, title: 'Phone', detail: '+62 812-3456-7890' },
  { icon: <FiClock />, title: 'Hours', detail: 'Mon - Sun: 08:00 — 22:00' },
  { icon: <FiMail />, title: 'Email', detail: 'hello@re-coffe.id' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', date: '', guests: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="contact section-padding" ref={ref}>
      {/* Background */}
      <div className="contact__bg">
        <img src="/images/book-bg.jpg" alt="" />
        <div className="contact__bg-overlay" />
      </div>

      <div className="container contact__container">
        <motion.div
          className="contact__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Info Side */}
          <div className="contact__info">
            <motion.span className="section-subtitle" variants={itemVariants} style={{ color: 'var(--color-accent-light)' }}>
              Get in Touch
            </motion.span>
            <motion.h2 className="section-title" variants={itemVariants} style={{ color: 'var(--color-white)' }}>
              Book Your<br />
              <span style={{ color: 'var(--color-accent-light)', fontStyle: 'italic' }}>Table</span>
            </motion.h2>
            <motion.p className="section-description" variants={itemVariants} style={{ color: 'rgba(255,255,255,0.6)' }}>
              Reservasi meja favorit Anda sekarang dan nikmati pengalaman ngopi yang tak terlupakan bersama kami.
            </motion.p>

            <motion.div className="contact__details" variants={containerVariants}>
              {contactInfo.map((info, i) => (
                <motion.div key={i} className="contact__detail" variants={itemVariants}>
                  <div className="contact__detail-icon">{info.icon}</div>
                  <div>
                    <h4 className="contact__detail-title">{info.title}</h4>
                    <p className="contact__detail-text">{info.detail}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Form Side */}
          <motion.div className="contact__form-wrapper" variants={itemVariants}>
            <form className="contact__form" onSubmit={handleSubmit}>
              <h3 className="contact__form-title">Make a Reservation</h3>

              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="contact-name">Full Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="contact-date">Date</label>
                  <input
                    type="date"
                    id="contact-date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="contact-guests">Guests</label>
                  <select
                    id="contact-guests"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    required
                  >
                    <option value="">Select</option>
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3-4">3 - 4 People</option>
                    <option value="5+">5+ People</option>
                  </select>
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="contact-message">Special Request</label>
                <textarea
                  id="contact-message"
                  placeholder="Any special requests..."
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <motion.button
                type="submit"
                className="contact__submit btn btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {submitted ? '✓ Reserved!' : (
                  <>
                    <FiSend />
                    Book Now
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
