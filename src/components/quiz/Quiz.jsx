import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button.jsx';
import { Input } from '../ui/Input.jsx';
import { ArrowRight, ArrowLeft, CheckCircle2, Phone, Send } from 'lucide-react';
import { MaxMessengerIcon } from '../ui/MaxMessengerIcon.jsx';
import { api } from '../../lib/api.js';

const INITIAL_STATE = { propertyType: '', area: '', package: '', timeframe: '', name: '', phone: '', channel: 'PHONE_CALL' };

const STEPS = [
  { id: 'propertyType', title: 'Какой у вас тип объекта?', options: ['Новостройка', 'Вторичка', 'Обновить ремонт'] },
  { id: 'area', title: 'Укажите площадь квартиры', options: ['до 40 м²', '40–65 м²', '65–90 м²', '90+ м²'] },
  { id: 'package', title: 'Какой пакет ремонта рассматриваете?', options: ['White box', 'Белый (эконом)', 'Комфорт', 'Серый'] },
  { id: 'timeframe', title: 'Когда планируете начать?', options: ['Как можно скорее', 'В течение 1–3 месяцев', 'Пока присматриваюсь'] },
];

export function Quiz() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(INITIAL_STATE);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    try {
      sessionStorage.removeItem('remod_quiz_state');
    } catch {}
    try {
      const saved = sessionStorage.getItem('remod_quiz_v2');
      if (saved) {
        const p = JSON.parse(saved);
        if (p.data) {
          const d = { ...p.data };
          if (d.channel === 'WHATSAPP') d.channel = 'MAX';
          setData(d);
        }
        if (p.step !== undefined) setStep(p.step);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try { sessionStorage.setItem('remod_quiz_v2', JSON.stringify({ step, data })); } catch {}
  }, [step, data]);

  const handleOptionSelect = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => setStep((s) => Math.min(s + 1, STEPS.length)), 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.phone.length < 10) return;
    setStatus('loading');
    try {
      const res = await api.submitLead({ type: 'QUIZ', ...data, pageUrl: window.location.href });
      if (res.ok) { setStatus('success'); sessionStorage.removeItem('remod_quiz_v2'); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20 border border-accent">
          <CheckCircle2 className="h-10 w-10 text-accent" />
        </div>
        <h2 className="text-heading font-bold text-ink mb-3">Заявка принята!</h2>
        <p className="text-body text-ink-muted max-w-sm">Получили ваши ответы — менеджер свяжется в течение 30 минут в рабочее время.</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center font-semibold transition-colors duration-150 cursor-pointer bg-transparent border border-border text-ink hover:bg-ink/5 hover:border-border-strong px-7 py-3.5 text-body rounded-pill"
          >
            На главную
          </Link>
          <Button size="lg" onClick={() => { setStatus('idle'); setStep(0); setData(INITIAL_STATE); }}>Пройти ещё раз</Button>
        </div>
      </div>
    );
  }

  const currentStepData = STEPS[step];
  const isLastStep = step === STEPS.length;

  return (
    <div className="mx-auto max-w-2xl w-full">
      <div className="mb-8">
        <div className="flex items-center justify-between text-caption font-medium text-ink-muted mb-2.5">
          <span>Шаг {step + 1} из {STEPS.length + 1}</span>
          <span>{Math.round(((step + 1) / (STEPS.length + 1)) * 100)}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
          <div className="h-full bg-accent rounded-full transition-all duration-500 ease-out" style={{ width: `${((step + 1) / (STEPS.length + 1)) * 100}%` }} />
        </div>
      </div>

      <div className={isLastStep ? '' : 'relative min-h-[440px] sm:min-h-[380px]'}>
        <AnimatePresence mode="wait">
          {!isLastStep ? (
            <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0">
              <h2 className="text-heading font-bold text-ink mb-7">{currentStepData.title}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {currentStepData.options.map((option) => {
                  const isSelected = data[currentStepData.id] === option;
                  return (
                    <button key={option} onClick={() => handleOptionSelect(currentStepData.id, option)}
                      className={`flex min-h-[68px] items-center justify-between rounded-xl border p-5 text-left transition-all active:scale-[0.99] ${
                        isSelected ? 'border-accent bg-accent text-black' : 'border-border bg-bg-secondary hover:border-border-strong hover:bg-bg-tertiary'
                      }`}>
                      <span className={`font-medium text-body ${isSelected ? 'text-black' : 'text-ink'}`}>{option}</span>
                      <div className={`h-5 w-5 shrink-0 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? 'border-bg bg-bg' : 'border-border-strong'
                      }`}>
                        {isSelected && <div className="h-2 w-2 rounded-full bg-black" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div key="final" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-heading font-bold text-ink">Как с вами связаться?</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-body-sm font-medium text-ink">Имя</label>
                    <Input placeholder="Иван" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-body-sm font-medium text-ink">Телефон <span className="text-ink-muted">(обязательно)</span></label>
                    <Input type="tel" placeholder="+7 (999) 000-00-00" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <label className="mb-2.5 block text-body-sm font-medium text-ink">Удобный способ связи</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[{ value: 'PHONE_CALL', label: 'Звонок', Icon: Phone }, { value: 'TELEGRAM', label: 'Telegram', Icon: Send }, { value: 'MAX', label: 'Max', Icon: MaxMessengerIcon }].map(({ value, label, Icon }) => (
                      <button key={value} type="button" onClick={() => setData({ ...data, channel: value })}
                        className={`flex flex-col sm:flex-row items-center justify-center gap-2 rounded-xl border p-3 transition-all text-xs sm:text-body-sm font-medium ${
                          data.channel === value ? 'border-accent bg-accent text-black' : 'border-border text-ink-muted hover:bg-bg-tertiary hover:border-border-strong'
                        }`}>
                        <Icon className="h-5 w-5 sm:h-4 sm:w-4 shrink-0" />{label}
                      </button>
                    ))}
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={status === 'loading' || data.phone.length < 10}>
                  {status === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
                  {status !== 'loading' && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
                {status === 'error' && <p className="text-center text-body-sm text-red-500">Что-то пошло не так. Позвоните нам напрямую.</p>}
                <p className="text-caption text-ink-faint text-center">Нажимая «Отправить заявку», вы соглашаетесь с <a href="/politika" className="underline hover:text-ink-muted transition-colors">политикой обработки персональных данных</a>.</p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-between border-t border-border pt-5">
        {step > 0 ? (
          <Button variant="ghost" onClick={() => setStep((s) => s - 1)}><ArrowLeft className="mr-2 h-4 w-4" />Назад</Button>
        ) : <div />}
        {step < STEPS.length && (
          <Button variant="outline" onClick={() => setStep((s) => s + 1)} disabled={!data[STEPS[step]?.id]}>Далее<ArrowRight className="ml-2 h-4 w-4" /></Button>
        )}
      </div>
    </div>
  );
}
