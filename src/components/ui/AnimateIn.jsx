import { motion } from 'framer-motion';

const presets = {
  'fade-up':    { hidden: { opacity: 0, y: 32 },  show: { opacity: 1, y: 0 } },
  'fade-down':  { hidden: { opacity: 0, y: -24 }, show: { opacity: 1, y: 0 } },
  'fade-in':    { hidden: { opacity: 0 },          show: { opacity: 1 } },
  'fade-left':  { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } },
  'fade-right': { hidden: { opacity: 0, x: 28 },  show: { opacity: 1, x: 0 } },
};

export default function AnimateIn({
  children,
  preset = 'fade-up',
  delay = 0,
  duration = 0.65,
  className,
}) {
  const v = presets[preset];
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: v.hidden,
        show: {
          ...v.show,
          transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
