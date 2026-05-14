// ============================================================
// Sundarban Ristorante — Roma
// React + Framer Motion (loaded via importmap, exposed as window.React / window.FM / window.ReactDOM)
// ============================================================

const { useEffect, useRef, useState, useMemo, createContext, useContext } = window.React;
const { createRoot } = window.ReactDOM;
const {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  useInView,
  useReducedMotion,
} = window.FM;
const React = window.React;

// ---------- Copy ----------
const COPY = {
  it: {
    nav: { story: 'Storia', order: 'Ordina', hours: 'Orari', visit: 'Trovaci', contact: 'Contatti' },
    hero: {
      tag: ['Sapori', 'autentici', 'del', '*Bengala,*', 'nel', 'cuore', 'di', '*Roma.*'],
      sub: ['Cucina bengalese', 'Roma', 'Torpignattara'],
      cta1: 'Ordina online',
      cta2: 'Chiama',
      cue: 'Scorri',
    },
    welcome: {
      mark: '«',
      lead: 'La cucina del *Bengala* portata a Roma — speziata, calorosa, fatta a mano. Ogni piatto è preparato al momento, con ricette tramandate da generazioni.',
      meta: ['Cucina bangladese', 'Halal', 'Vegetariano disponibile'],
    },
    story: {
      eyebrow: 'La nostra storia',
      title: 'Dal *Bengala* a Roma.',
      p1: 'Sundarban prende il nome dalle foreste di mangrovie del *Bangladesh*, dove il fiume incontra il mare. Quel paesaggio — ricco, in continuo movimento, intrecciato di sapori — è quello che proviamo a portare in tavola ogni sera.',
      p2: 'In via Mario Cartaro, da anni, prepariamo *kacchi biryani*, haleem, chicken chaap, naan dal tandoor — i piatti che la comunità bengalese di Roma riconosce come quelli di casa. Spezie macinate fresche, ricette di famiglia, niente scorciatoie.',
      pull: '“Una cucina di casa, in mezzo a Roma.”',
      credit: [['Fondato', '2013'], ['Cucina', 'Bengalese · Indiana'], ['Quartiere', 'Torpignattara']],
      cap1: 'Kacchi Biryani',
      cap2: 'Chicken Chaap',
      cap3: 'L\u2019entrata',
      cap4: 'Bot Bhuna',
    },
    marquee: ['Kacchi Biryani', 'Haleem', 'Chicken Chaap', 'Naan', 'Tandoori', 'Polao', 'Rashmalai', 'Butter Chicken', 'Fuchka', 'Korma', 'Tikka'],
    order: {
      eyebrow: 'Ordina online',
      title: 'A casa tua in *trenta minuti.*',
      desc: 'Consegna a domicilio o asporto, sulle tue piattaforme preferite. Il menù completo, sempre aggiornato.',
      je_tag: 'Consegna · Asporto',
      je_title: 'JustEat',
      je_desc: 'Menù completo, prenotazione di asporto, pagamento online.',
      gl_tag: 'Consegna express',
      gl_title: 'Glovo',
      gl_desc: 'Consegne rapide nel centro di Roma — il tuo ordine, in pochi minuti.',
      cta: 'Apri',
    },
    hours: {
      eyebrow: 'Orari',
      title: 'Aperti *tutti i giorni.*',
      desc: 'Aperti dalle 8 alle 23, in continuo. Tavolo, asporto e consegna disponibili in tutti gli orari di apertura.',
      open: 'Aperto adesso',
      closed: 'Chiuso',
      days: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
      timeRange: '08:00 — 23:00',
    },
    visit: {
      eyebrow: 'Trovaci',
      title: 'A *Torpignattara,* Roma.',
      addr1: 'Via Mario Cartaro 45/47',
      addr2: '00176 Roma · Italia',
      meta_a: ['Zona', 'Torpignattara'],
      meta_b: ['Parcheggio', 'Libero in strada'],
      meta_c: ['Posti', 'Sala interna · esterna'],
      directions: 'Indicazioni',
      pin: 'Siamo qui',
    },
    contact: {
      eyebrow: 'Contatti',
      title: 'Vuoi Parlarci?',
      phone_label: 'Telefono / Prenotazioni',
      phone: '06 6477 1702',
      social_label: 'Seguici',
    },
    foot: {
      copyright: '© 2026 Sundarban Ristorante Indiano. Tutti i diritti riservati.',
      made_by_prefix: 'Questo sito è stato realizzato da',
      made_by_name: 'X3RO AUTOMATIONS',
    },
  },
  en: {
    nav: { story: 'Story', order: 'Order', hours: 'Hours', visit: 'Visit', contact: 'Contact' },
    hero: {
      tag: ['Authentic', 'flavors', 'of', '*Bengal,*', 'in', 'the', 'heart', 'of', '*Rome.*'],
      sub: ['Bengali cuisine', 'Rome', 'Torpignattara'],
      cta1: 'Order online',
      cta2: 'Call',
      cue: 'Scroll',
    },
    welcome: {
      mark: '"',
      lead: 'The cuisine of *Bengal*, brought to Rome — spiced, warm, hand-made. Every plate is cooked to order, from recipes passed down through generations.',
      meta: ['Bangladeshi cuisine', 'Halal', 'Vegetarian options'],
    },
    story: {
      eyebrow: 'Our story',
      title: 'From *Bengal* to Rome.',
      p1: 'Sundarban is named after the mangrove forests of *Bangladesh*, where the river meets the sea. That landscape — rich, ever-moving, woven through with flavors — is what we try to bring to the table every night.',
      p2: 'On Via Mario Cartaro, for years, we’ve been cooking *kacchi biryani*, haleem, chicken chaap, naan straight from the tandoor — the dishes Rome’s Bengali community knows as home. Spices ground fresh, family recipes, no shortcuts.',
      pull: '“A home kitchen, in the middle of Rome.”',
      credit: [['Founded', '2013'], ['Cuisine', 'Bengali · Indian'], ['Neighborhood', 'Torpignattara']],
      cap1: 'Kacchi Biryani',
      cap2: 'Chicken Chaap',
      cap3: 'Entrance',
      cap4: 'Bot Bhuna',
    },
    marquee: ['Kacchi Biryani', 'Haleem', 'Chicken Chaap', 'Naan', 'Tandoori', 'Polao', 'Rashmalai', 'Butter Chicken', 'Fuchka', 'Korma', 'Tikka'],
    order: {
      eyebrow: 'Order online',
      title: 'At your door in *thirty minutes.*',
      desc: 'Delivery or pickup, through your favorite platforms. Full menu, always up to date.',
      je_tag: 'Delivery · Pickup',
      je_title: 'JustEat',
      je_desc: 'Full menu, pickup booking, pay online.',
      gl_tag: 'Express delivery',
      gl_title: 'Glovo',
      gl_desc: 'Fast deliveries across central Rome — your order, in minutes.',
      cta: 'Open',
    },
    hours: {
      eyebrow: 'Hours',
      title: 'Open *every day.*',
      desc: 'Open from 8 AM to 11 PM, all day. Dine-in, pickup and delivery available throughout opening hours.',
      open: 'Open now',
      closed: 'Closed',
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      timeRange: '08:00 — 23:00',
    },
    visit: {
      eyebrow: 'Visit',
      title: 'In *Torpignattara,* Rome.',
      addr1: 'Via Mario Cartaro 45/47',
      addr2: '00176 Rome · Italy',
      meta_a: ['Area', 'Torpignattara'],
      meta_b: ['Parking', 'Free on-street'],
      meta_c: ['Seating', 'Indoor · outdoor'],
      directions: 'Get directions',
      pin: 'We are here',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Want to talk to us?',
      phone_label: 'Phone / Reservations',
      phone: '06 6477 1702',
      social_label: 'Follow us',
    },
    foot: {
      copyright: '© 2026 Sundarban Indian Restaurant. All rights reserved.',
      made_by_prefix: 'This website was made by',
      made_by_name: 'X3RO AUTOMATIONS',
    },
  },
};

const LINKS = {
  justeat:  'https://www.justeat.it/restaurants-sundarban-ristorante-indiano-roma/menu',
  glovo:    'https://kaspi.glovoapp.com/hr/it/roma/stores/ristorante-sundarban-rom',
  facebook: 'https://www.facebook.com/p/Sundarban-Restaurant-100063619480846/',
  maps:     'https://www.google.com/maps/place/Sundarban+Ristorante/@41.8823053,12.5388503,17z',
  mapEmbed: 'https://maps.google.com/maps?q=Via+Mario+Cartaro+45+Roma&z=17&output=embed',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=Sundarban+Ristorante+Indiano+Via+Mario+Cartaro+45+Roma',
  phoneRaw: '+390664771702',
};

// Refined photos of the real dishes
const PHOTOS = {
  biryani:  'assets/dish-kacchi.jpg',
  naan:     'assets/dish-cchap.jpg',
  interior: 'assets/entrance.jpg',
  spices:   'assets/dish-botbhuna.jpg',
};

// ---------- Lang context ----------
const LangCtx = createContext({ lang: 'it', t: COPY.it, setLang: () => {} });
const useLang = () => useContext(LangCtx);

// ---------- Helpers ----------
function emphasized(text) {
  // turn "*word*" into <em>word</em> spans
  return text.split(/(\*[^*]+\*)/g).map((seg, i) => {
    if (seg.startsWith('*') && seg.endsWith('*')) {
      return <em key={i}>{seg.slice(1, -1)}</em>;
    }
    return <React.Fragment key={i}>{seg}</React.Fragment>;
  });
}

const easeOut = [0.2, 0.7, 0.2, 1];

// Reliable replacement for whileInView (which doesn't fire in this setup).
// Animates a motion element when its ref enters the viewport.
function FadeIn({
  as: Tag = motion.div,
  children, className, style,
  y = 30, x = 0, scale = 1,
  delay = 0, duration = 0.9, amount = 0.2,
  ...rest
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y, x, scale }}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : undefined}
      transition={{ duration, ease: easeOut, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ============================================================
// NAV
// ============================================================
function Nav() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <motion.header
      className={`nav ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
    >
      <a href="#top" className="brand">
        <img src="assets/logo.png" alt="" className="brand-mark" />
        <span>Sundarban</span>
      </a>
      <nav className="links">
        <a href="#story">{t.nav.story}</a>
        <a href="#order">{t.nav.order}</a>
        <a href="#hours">{t.nav.hours}</a>
        <a href="#visit">{t.nav.visit}</a>
        <a href="#contact">{t.nav.contact}</a>
      </nav>
      <div className="lang">
        <button className={lang === 'it' ? 'active' : ''} onClick={() => setLang('it')}>IT</button>
        <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
      </div>
    </motion.header>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  // Scroll-linked parallax for the whole content stack
  const contentY  = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOp = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);

  const orbAY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const orbBY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const orbCY = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const cueOp = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  // Background photo: slow zoom + slight drift down as user scrolls
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);

  return (
    <section ref={ref} id="top" className="hero">
      <div className="hero-bg" aria-hidden>
        <motion.div className="hero-photo" style={{ y: photoY, scale: photoScale }}>
          <img src="assets/entrance.jpg" alt="" />
        </motion.div>
        <div className="hero-vignette" />
        <motion.div className="orb a" style={{ y: orbAY }} />
        <motion.div className="orb b" style={{ y: orbBY }} />
        <motion.div className="orb c" style={{ y: orbCY }} />
      </div>
      <Embers />
      <motion.div className="hero-inner" style={{ y: contentY, opacity: contentOp }}>
        <motion.img
          className="hero-logo"
          src="assets/logo.png"
          alt="Sundarban Ristorante"
          style={{ scale: logoScale }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: easeOut, delay: 0.1 }}
        />
        <motion.div className="hero-sub"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.4 }}
        >
          {t.hero.sub.map((s, i) => (
            <React.Fragment key={i}>
              <span>{s}</span>
              {i < t.hero.sub.length - 1 && <span className="dot" />}
            </React.Fragment>
          ))}
        </motion.div>
        <h1 className="hero-tag">
          {t.hero.tag.map((w, i) => {
            const isEm = w.startsWith('*') && w.endsWith('*');
            const word = isEm ? w.slice(1, -1) : w;
            return (
              <React.Fragment key={i + word}>
                <span className="word-wrap">
                  <motion.span
                    className={isEm ? 'em' : ''}
                    initial={{ y: '60%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: easeOut, delay: 0.5 + i * 0.07 }}
                    style={{ display: 'inline-block' }}
                  >
                    {word}
                  </motion.span>
                </span>
                {' '}
              </React.Fragment>
            );
          })}
        </h1>
        <motion.div className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOut, delay: 1.4 }}
        >
          <a className="btn" href="#order">
            {t.hero.cta1}
            <Arrow />
          </a>
          <a className="btn ghost" href={`tel:${LINKS.phoneRaw}`}>
            {t.hero.cta2}
            <PhoneIcon />
          </a>
        </motion.div>
      </motion.div>
      <motion.div
        className="scroll-cue"
        style={{ opacity: cueOp }}
      >
        <span>{t.hero.cue}</span>
        <span className="line" />
      </motion.div>
    </section>
  );
}

// ---------- Embers ----------
function Embers() {
  const reduce = useReducedMotion();
  const embers = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 2 + Math.random() * 5,
      duration: 14 + Math.random() * 16,
      delay: -Math.random() * 30,
      dx: (Math.random() * 200 - 100),
      warm: Math.random() < 0.3,
    }));
  }, []);
  if (reduce) return null;
  return (
    <div className="embers" aria-hidden>
      {embers.map(e => (
        <motion.span
          key={e.id}
          className={'ember' + (e.warm ? ' warm' : '')}
          style={{
            left: `${e.x}%`,
            width: e.size, height: e.size,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: -window.innerHeight - 200,
            x: e.dx,
            opacity: [0, 1, 1, 0],
            scale: [0.6, 1, 1.1, 1.3],
          }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.1, 0.85, 1],
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// WELCOME
// ============================================================
function Welcome() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const markY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const markR = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  return (
    <section ref={ref} className="welcome section">
      <div className="section-inner welcome-inner">
        <motion.div
          className="mark"
          style={{ y: markY, rotate: markR }}
        >
          {t.welcome.mark}
        </motion.div>
        <div>
          <RevealText text={t.welcome.lead} className="welcome-lead" />
          <motion.div
            className="meta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.4 }}
          >
            {t.welcome.meta.map((m, i) => (
              <React.Fragment key={i}>
                <span>{m}</span>
                {i < t.welcome.meta.length - 1 && <span className="sep" />}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// RevealText: splits a *bold*-marked sentence into words; each rises with stagger
function RevealText({ text, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const segments = text.split(/(\*[^*]+\*)/g);
  let wordIdx = 0;
  return (
    <p ref={ref} className={`reveal-text ${className}`}>
      {segments.map((seg, si) => {
        const isEm = seg.startsWith('*') && seg.endsWith('*');
        const inner = isEm ? seg.slice(1, -1) : seg;
        const words = inner.split(/(\s+)/);
        return (
          <React.Fragment key={si}>
            {words.map((w, wi) => {
              if (!w) return null;
              if (/^\s+$/.test(w)) return <React.Fragment key={`${si}-${wi}`}>{w}</React.Fragment>;
              const idx = wordIdx++;
              return (
                <React.Fragment key={`${si}-${wi}`}>
                  <span className="word-wrap">
                    <motion.span
                      className={isEm ? 'em' : ''}
                      initial={{ y: '40%', opacity: 0 }}
                      animate={inView ? { y: 0, opacity: 1 } : { y: '40%', opacity: 0 }}
                      transition={{ duration: 0.9, ease: easeOut, delay: idx * 0.035 }}
                      style={{ display: 'inline-block' }}
                    >
                      {w}
                    </motion.span>
                  </span>
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </p>
  );
}

// ============================================================
// STORY — text + asymmetric photo grid with scroll parallax
// ============================================================
function PhotoCard({ className, src, cap, y, delay = 0 }) {
  return (
    <motion.figure
      className={`ph ${className}`}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.1, ease: easeOut, delay }}
    >
      <motion.div className="ph-inner" style={{ y }}>
        <img src={src} alt={cap} />
      </motion.div>
      <figcaption>{cap}</figcaption>
    </motion.figure>
  );
}

function Story() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const p1Y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const p2Y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const p3Y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const p4Y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={ref} id="story" className="story section">
      <div className="section-inner">
        <Eyebrow text={t.story.eyebrow} />
        <div className="story-inner">
          <div className="story-text">
            <h2><RevealHeading text={t.story.title} /></h2>
            <RevealText text={t.story.p1} className="story-p" />
            <RevealText text={t.story.p2} className="story-p" />
            <motion.div className="story-credit"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
            >
              {t.story.credit.map(([k, v], i) => (
                <div key={i}>
                  <span className="k">{k}</span>
                  <span className="v">{v}</span>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="story-photos">
            <PhotoCard className="ph-1" src={PHOTOS.biryani}  cap={t.story.cap1} y={p1Y} delay={0} />
            <PhotoCard className="ph-2" src={PHOTOS.naan}     cap={t.story.cap2} y={p2Y} delay={0.1} />
            <PhotoCard className="ph-3" src={PHOTOS.interior} cap={t.story.cap3} y={p3Y} delay={0.2} />
            <PhotoCard className="ph-4" src={PHOTOS.spices}   cap={t.story.cap4} y={p4Y} delay={0.3} />
          </div>
        </div>
        <motion.blockquote className="story-pull"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: easeOut }}
        >
          {t.story.pull}
        </motion.blockquote>
      </div>
    </section>
  );
}

// ============================================================
// MARQUEE
// ============================================================
function Marquee() {
  const { t } = useLang();
  const items = [...t.marquee, ...t.marquee, ...t.marquee, ...t.marquee];
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // scroll-driven extra speed
  const skew = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 3]);
  return (
    <div ref={ref} className="marquee-strip">
      <motion.div className="marquee-track" style={{ skewY: skew }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      >
        {items.map((w, i) => (
          <span key={i} className="m-item">
            <em>{w}</em>
            <span className="m-sep" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ============================================================
// ORDER — sticky giant title, cards slide in
// ============================================================
function Order() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Background giant SUNDARBAN word slides horizontally
  const bgX = useTransform(scrollYProgress, [0, 1], ['10%', '-30%']);
  const bgOp = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 0.06, 0.06, 0]);

  return (
    <section ref={ref} id="order" className="order section">
      <motion.div className="order-bg-word" style={{ x: bgX, opacity: bgOp }} aria-hidden>
        SUNDARBAN
      </motion.div>
      <div className="section-inner">
        <Eyebrow text={t.order.eyebrow} />
        <div className="order-head">
          <h2><RevealHeading text={t.order.title} /></h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.2 }}
          >
            {t.order.desc}
          </motion.p>
        </div>
        <div className="order-grid">
          <PlatformCard
            kind="justeat"
            tag={t.order.je_tag}
            title={t.order.je_title}
            desc={t.order.je_desc}
            cta={t.order.cta}
            href={LINKS.justeat}
            icon={<JustEatIcon size={44} />}
            delay={0}
          />
          <PlatformCard
            kind="glovo"
            tag={t.order.gl_tag}
            title={t.order.gl_title}
            desc={t.order.gl_desc}
            cta={t.order.cta}
            href={LINKS.glovo}
            icon={<GlovoIcon size={44} />}
            delay={0.12}
          />
        </div>
      </div>
    </section>
  );
}

function PlatformCard({ kind, tag, title, desc, cta, href, icon, delay = 0 }) {
  return (
    <motion.a
      href={href} target="_blank" rel="noopener"
      className={`platform-card ${kind}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: easeOut, delay }}
      whileHover={{ y: -8 }}
    >
      <div className="top">
        <span className="platform-icon">{icon}</span>
        <span>{tag}</span>
      </div>
      <div className="platform-name">{title}</div>
      <p className="platform-desc">{desc}</p>
      <span className="platform-cta">
        {cta}
        <span className="arrow" />
      </span>
    </motion.a>
  );
}

// ============================================================
// HEADING REVEAL (word-by-word slide)
// ============================================================
function RevealHeading({ text }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const segments = text.split(/(\*[^*]+\*)/g);
  let wordIdx = 0;
  return (
    <span ref={ref} className="rh">
      {segments.map((seg, si) => {
        const isEm = seg.startsWith('*') && seg.endsWith('*');
        const inner = isEm ? seg.slice(1, -1) : seg;
        const words = inner.split(/(\s+)/);
        return (
          <React.Fragment key={si}>
            {words.map((w, wi) => {
              if (!w) return null;
              if (/^\s+$/.test(w)) return <React.Fragment key={`${si}-${wi}`}>{w}</React.Fragment>;
              const idx = wordIdx++;
              return (
                <span key={`${si}-${wi}`} className="word-wrap">
                  <motion.span
                    className={isEm ? 'em' : ''}
                    initial={{ y: '60%', opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : { y: '60%', opacity: 0 }}
                    transition={{ duration: 1, ease: easeOut, delay: idx * 0.08 }}
                    style={{ display: 'inline-block' }}
                  >
                    {w}
                  </motion.span>
                </span>
              );
            })}
          </React.Fragment>
        );
      })}
    </span>
  );
}

// ============================================================
// EYEBROW
// ============================================================
function Eyebrow({ text }) {
  return (
    <motion.div
      className="eyebrow"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: easeOut }}
    >
      <span className="line" />
      <span>{text}</span>
    </motion.div>
  );
}

// ============================================================
// HOURS
// ============================================================
function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function isOpenAt(date) {
  const hh = date.getHours() + date.getMinutes() / 60;
  return hh >= 8 && hh < 23;
}

function Hours() {
  const { t } = useLang();
  const now = useNow();
  const todayIdx = now.getDay();
  const open = isOpenAt(now);
  const order = [1, 2, 3, 4, 5, 6, 0]; // Mon..Sun (display order)
  return (
    <section id="hours" className="hours section">
      <div className="section-inner hours-inner">
        <div>
          <Eyebrow text={t.hours.eyebrow} />
          <h2><RevealHeading text={t.hours.title} /></h2>
          <motion.div
            className={'hours-badge ' + (open ? 'open' : 'closed')}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.6 }}
          >
            <span className="pulse" />
            <span>{open ? t.hours.open : t.hours.closed}</span>
          </motion.div>
          <motion.p className="hours-desc"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.4 }}
          >
            {t.hours.desc}
          </motion.p>
        </div>
        <div className="hours-list">
          {order.map((dayIdx, i) => (
            <motion.div
              key={dayIdx}
              className={'hours-row' + (dayIdx === todayIdx ? ' today' : '')}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: easeOut, delay: i * 0.06 }}
            >
              <span className="day">{t.hours.days[dayIdx]}</span>
              <span className="time">{t.hours.timeRange}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// VISIT / MAP
// ============================================================
function Visit() {
  const { t } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const mapScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.08]);
  const mapY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  return (
    <section ref={ref} id="visit" className="visit section">
      <div className="section-inner">
        <Eyebrow text={t.visit.eyebrow} />
        <div className="visit-inner">
          <div className="visit-text">
            <h2><RevealHeading text={t.visit.title} /></h2>
            <motion.div className="addr"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
            >
              <span>{t.visit.addr1}</span>
              <span className="city">{t.visit.addr2}</span>
            </motion.div>
            <div className="visit-meta">
              {[t.visit.meta_a, t.visit.meta_b, t.visit.meta_c].map(([k, v], i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, ease: easeOut, delay: 0.4 + i * 0.1 }}
                >
                  <span className="k">{k}</span>
                  <span>{v}</span>
                </motion.div>
              ))}
            </div>
            <motion.a
              href={LINKS.directions}
              target="_blank" rel="noopener"
              className="btn"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.7 }}
            >
              {t.visit.directions}
              <Arrow />
            </motion.a>
          </div>
          <motion.div className="map-frame"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: easeOut }}
          >
            <motion.div className="map-inner" style={{ scale: mapScale, y: mapY }}>
              <iframe
                title="Map"
                src={LINKS.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
            <span className="map-pin">
              <span className="dot" />
              {t.visit.pin}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT
// ============================================================
function Contact() {
  const { t } = useLang();
  return (
    <section id="contact" className="contact section">
      <div className="section-inner">
        <Eyebrow text={t.contact.eyebrow} />
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: easeOut }}
          className="contact-title"
        >
          <RevealHeading text={t.contact.title} />
        </motion.h2>

        <div className="contact-inner">
          <ContactRow label={t.contact.phone_label} delay={0.1}>
            <a href={`tel:${LINKS.phoneRaw}`}>{t.contact.phone}</a>
          </ContactRow>
          <ContactRow label={t.contact.social_label} delay={0.2}>
            <div className="socials">
              <a href={LINKS.facebook} target="_blank" rel="noopener" className="social-chip">
                <FacebookIcon size={32} />
                <span>Facebook</span>
              </a>
              <a href={LINKS.justeat} target="_blank" rel="noopener" className="social-chip">
                <JustEatIcon size={32} />
                <span>JustEat</span>
              </a>
              <a href={LINKS.glovo} target="_blank" rel="noopener" className="social-chip">
                <GlovoIcon size={32} />
                <span>Glovo</span>
              </a>
              <a href={LINKS.maps} target="_blank" rel="noopener" className="social-chip">
                <MapsIcon size={32} />
                <span>Google Maps</span>
              </a>
            </div>
          </ContactRow>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, delay = 0, children }) {
  return (
    <motion.div className="contact-row"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: easeOut, delay }}
    >
      <div className="label">{label}</div>
      <div className="value">{children}</div>
    </motion.div>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  const { t } = useLang();
  return (
    <footer>
      <div className="foot-logos">
        <img src="assets/logo.png" alt="Sundarban" className="foot-logo sundarban" />
        <span className="foot-divider" aria-hidden />
        <a href="https://x3roautomations.it" target="_blank" rel="noopener" className="foot-x3ro-link" aria-label="X3RO Automations">
          <img src="assets/x3ro-logo.png" alt="X3RO Automations" className="foot-logo x3ro" />
        </a>
      </div>
      <div className="foot-copy">{t.foot.copyright}</div>
      <a href="https://x3roautomations.it" target="_blank" rel="noopener" className="foot-credit">
        {t.foot.made_by_prefix}{' '}
        <span className="foot-credit-brand">{t.foot.made_by_name}</span>
      </a>
    </footer>
  );
}

// ============================================================
// Icons
// ============================================================
function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 3.5C3 3 3.4 2.5 4 2.5h2L7.5 5 6 6.5c1 2 2.5 3.5 4.5 4.5L12 9.5l2.5 1.5v2c0 .6-.5 1-1 1A11 11 0 0 1 3 3.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

// Brand glyphs — official Simple Icons SVG paths
function BrandBadge({ brand, bg, color = '#fff', size = 44 }) {
  // Wrapped image in a colored circle for consistent visual treatment
  return (
    <span className="brand-badge" style={{ width: size, height: size, background: bg }}>
      <img
        src={`https://cdn.simpleicons.org/${brand}/${color.replace('#', '')}`}
        alt=""
        width={size * 0.52}
        height={size * 0.52}
        loading="lazy"
      />
    </span>
  );
}
function JustEatIcon({ size = 28 }) {
  return <BrandBadge brand="justeat" bg="#FF8000" size={size} />;
}
function GlovoIcon({ size = 28 }) {
  return <BrandBadge brand="glovo" bg="#FFC244" color="#00A082" size={size} />;
}
function FacebookIcon({ size = 28 }) {
  return <BrandBadge brand="facebook" bg="#1877F2" size={size} />;
}
function MapsIcon({ size = 28 }) {
  return <BrandBadge brand="googlemaps" bg="#fff" color="#1A73E8" size={size} />;
}

// ============================================================
// APP
// ============================================================
function App() {
  const [lang, setLangState] = useState(() => localStorage.getItem('sb-lang') || 'it');
  useEffect(() => {
    localStorage.setItem('sb-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
  }, [lang]);
  const value = useMemo(() => ({ lang, setLang: setLangState, t: COPY[lang] }), [lang]);
  return (
    <LangCtx.Provider value={value}>
      <Nav />
      <main>
        <Hero />
        <Welcome />
        <Story />
        <Marquee />
        <Order />
        <Hours />
        <Visit />
        <Contact />
      </main>
      <Footer />
    </LangCtx.Provider>
  );
}

createRoot(document.getElementById('root')).render(<App />);
