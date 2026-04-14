import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, BadgeCheck, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../lib/api.js';

const ease = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease } });
const fadeRight = (delay = 0) => ({ initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8, delay, ease } });
const utps = [
  { icon: Clock, label: '90 дней', desc: 'Фиксированный срок. Сдаём в дату из договора — или согласуем перенос заранее.' },
  { icon: BadgeCheck, label: 'Цена в договоре', desc: 'Итоговая стоимость фиксируется до начала. Никаких «внезапных доплат».' },
  { icon: Wallet, label: 'Рассрочка', desc: 'Разбиваем платёж на части. Уточняем условия на первой встрече.' },
];

export default function HeroSection() {
  const [heroImages, setHeroImages] = useState({
    imgAfter: null,
    imgBefore: null,
  });
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const [isAfterImgVisible, setIsAfterImgVisible] = useState(false);
  const [isBeforeImgVisible, setIsBeforeImgVisible] = useState(false);

  useEffect(() => {
    api.getHero()
      .then((data) => {
        if (!data) return;
        const nextAfter = data.imgAfter || null;
        const nextBefore = data.imgBefore || null;

        setHeroImages((prev) => {
          if (nextAfter !== prev.imgAfter) {
            setIsAfterImgVisible(false);
          }
          if (nextBefore !== prev.imgBefore) {
            setIsBeforeImgVisible(false);
          }

          return {
            imgAfter: nextAfter,
            imgBefore: nextBefore,
          };
        });
      })
      .catch(console.error)
      .finally(() => setIsHeroLoaded(true));
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden bg-bg">
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />
      <div className="relative max-w-container mx-auto container-px w-full section-py">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.h1 {...fadeUp(0)} className="text-display-xl font-extrabold text-ink text-balance mb-6 tracking-tight">
              Ремонт под ключ.<br />
              <span className="text-accent">90 дней — и можно заезжать.</span>
            </motion.h1>
            <motion.p {...fadeUp(0.1)} className="text-subheading text-ink-muted max-w-[540px] text-pretty mb-10">
              Берём на себя всё: замеры, материалы, команду, контроль и клининг. Цена и срок — в договоре до начала работ.
            </motion.p>
            <motion.div {...fadeUp(0.18)} className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link to="/ocenka" className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-accent text-black text-body font-black rounded-pill hover:bg-accent-hover transition-colors duration-150 active:scale-[0.98] group">
                Оставить заявку
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link to="/kejsy" className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-border text-ink text-body font-semibold rounded-pill hover:bg-ink/5 hover:border-border-strong transition-colors duration-150 active:scale-[0.98]">
                Посмотреть кейсы
              </Link>
            </motion.div>
            <motion.div {...fadeUp(0.26)} className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden border border-border">
              {utps.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-bg-secondary p-5 flex flex-col gap-3">
                  <div className="w-8 h-8 rounded-md bg-bg-tertiary border border-border flex items-center justify-center">
                    <Icon size={16} className="text-accent" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-body-sm font-semibold text-ink mb-1">{label}</p>
                    <p className="text-caption text-ink-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative hidden lg:block">
            <motion.div {...fadeRight(0.2)} className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-elevated">
              <div className={`w-full h-full bg-bg-secondary transition-opacity duration-500 ${isAfterImgVisible ? 'opacity-0' : 'opacity-100'} ${!isHeroLoaded ? 'animate-pulse' : ''}`} />
              {heroImages.imgAfter ? (
                <img
                  src={heroImages.imgAfter}
                  alt="Современный интерьер после ремонта"
                  onLoad={() => setIsAfterImgVisible(true)}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${isAfterImgVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'}`}
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <motion.div
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7, ease }}
                  className="inline-flex items-center gap-2 bg-bg-tertiary/90 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-border"
                >
                  <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-body-sm font-semibold text-ink">Белый · Комфорт · 84 дня</span>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -24, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease }}
              className="absolute -left-10 top-12 w-36 rounded-xl overflow-hidden border border-border shadow-card-hover bg-bg"
            >
              <div className="aspect-square overflow-hidden relative">
                <div className={`w-full h-full bg-bg-secondary transition-opacity duration-500 ${isBeforeImgVisible ? 'opacity-0' : 'opacity-100'} ${!isHeroLoaded ? 'animate-pulse' : ''}`} />
                {heroImages.imgBefore ? (
                  <img
                    src={heroImages.imgBefore}
                    alt="До ремонта"
                    onLoad={() => setIsBeforeImgVisible(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${isBeforeImgVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'}`}
                  />
                ) : null}
              </div>
              <div className="px-3 py-2">
                <p className="text-caption font-semibold text-ink-muted">До</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </section>
  );
}
