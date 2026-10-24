import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiStar } from 'react-icons/fi';
import './Menu.css';

const menuItems = [
  { id: 1, name: 'Espresso Classic', price: '25K', category: 'hot', img: '/images/menu-1.png', rating: 4.8, desc: 'Rich and bold single shot espresso' },
  { id: 2, name: 'Cappuccino', price: '32K', category: 'hot', img: '/images/menu-2.png', rating: 4.9, desc: 'Smooth espresso with steamed milk foam' },
  { id: 3, name: 'Caramel Latte', price: '35K', category: 'hot', img: '/images/menu-3.png', rating: 4.7, desc: 'Creamy latte with caramel drizzle' },
  { id: 4, name: 'Iced Americano', price: '28K', category: 'cold', img: '/images/menu-4.png', rating: 4.8, desc: 'Refreshing cold brew americano' },
  { id: 5, name: 'Mocha Frappe', price: '38K', category: 'cold', img: '/images/menu-5.png', rating: 4.6, desc: 'Chocolate blended with espresso' },
  { id: 6, name: 'Matcha Latte', price: '35K', category: 'special', img: '/images/menu-6.png', rating: 4.9, desc: 'Premium Japanese matcha latte' },
];

const categories = [
  { key: 'all', label: 'All Menu' },
  { key: 'hot', label: 'Hot Coffee' },
  { key: 'cold', label: 'Cold Brew' },
  { key: 'special', label: 'Specialty' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Menu() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="menu section-padding" ref={ref}>
      {/* Background */}
      <div className="menu__bg">
        <img src="/images/menu-bg.jpg" alt="" />
        <div className="menu__bg-overlay" />
      </div>

      <div className="container menu__container">
        {/* Header */}
        <motion.div
          className="menu__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-subtitle" style={{ color: 'var(--color-accent-light)' }}>
            Our Menu
          </span>
          <h2 className="section-title" style={{ color: 'var(--color-white)' }}>
            Crafted with Passion
          </h2>
          <p className="section-description" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Setiap minuman kami dibuat dengan bahan berkualitas tinggi dan teknik barista profesional.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="menu__filters"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`menu__filter ${activeCategory === cat.key ? 'menu__filter--active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
              {activeCategory === cat.key && (
                <motion.span
                  className="menu__filter-bg"
                  layoutId="menuFilter"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          className="menu__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          key={activeCategory}
        >
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              className="menu__card"
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="menu__card-image">
                <motion.img
                  src={item.img}
                  alt={item.name}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="menu__card-content">
                <div className="menu__card-rating">
                  <FiStar className="menu__card-star" />
                  <span>{item.rating}</span>
                </div>
                <h3 className="menu__card-name">{item.name}</h3>
                <p className="menu__card-desc">{item.desc}</p>
                <div className="menu__card-footer">
                  <span className="menu__card-price">Rp {item.price}</span>
                  <button className="menu__card-add">+</button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
