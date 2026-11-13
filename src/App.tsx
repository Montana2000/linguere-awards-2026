import { useEffect, useRef, useState, type ReactNode } from 'react'
import NomineesPage from './NomineesPage'
import logoLinguere from '../LOGO LINGUERE.png'
import model1 from '../MODEL 1.jpg'
import model2 from '../MODEL 2.jpg'
import model3 from '../MODEL 3.jpg'
import enfantEdu from '../ENFANT EDU 2.jpg'
import femmesLing from '../femmes ling.png'
// New images from IMAGE WOMANS folder
import woman1 from '../IMAGE WOMANS/portrait-african-woman-wearing-traditional-accessories-looking-away.jpg'
import woman2 from '../IMAGE WOMANS/vibrant-portrait-person-bright-environment.jpg'
import woman3 from '../IMAGE WOMANS/young-woman-wearing-orange-dress-with-turban-ethnic-jewelry.jpg'

const images = {
  hero: 'https://images.unsplash.com/photo-1673447067622-bbc8a34e2c56?auto=format&fit=crop&w=2200&q=90',
  manifesto: 'https://images.unsplash.com/photo-1712821125604-4ca6b1f86488?auto=format&fit=crop&w=1500&q=88',
  heritage: model1,
  leadership: model2,
  future: model3,
  gathering: femmesLing,
  education: enfantEdu,
  portraitOne: woman1,
  portraitTwo: woman2,
  portraitThree: woman3,
}

const navItems = [
  ['Accueil', '/'],
  ['L’Événement', '/evenement'],
  ['Expérience 2026', '/experience'],
  ['Distinctions', '/distinctions'],
  ['Nominées', '/nominees'],
  ['Partenaires', '/partenaires'],
  ['Contact', '/contact'],
]

const categories = [
  'AfricaEducatesHer',
  'Leadership & Influence engagée',
  'Excellence de la Diaspora',
  'Héritage & Création',
  'Sport & Performance Féminine',
  'Innovation & Technologie Féminine',
  'Plume & Parole',
  'Bâtisseuse d’impact',
  'Révélation de l’Année',
  'Yaayam',
  'Excellence Santé',
]

const stats = [
  ['+500', 'participantes attendues'],
  ['+5', 'pays africains représentés'],
  ['+100', 'candidatures visées'],
  ['+1M', 'de personnes ciblées'],
  ['+20', 'retombées médias visées'],
  ['3', 'projets féminins accompagnés'],
]

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a className={`logo ${dark ? 'logo--dark' : ''}`} href="/" aria-label="Linguères Awards — Accueil">
      <img className="logo__img" src={logoLinguere} alt="Linguères Awards" />
    </a>
  )
}

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>
}

function ButtonLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <a className={`button-link ${light ? 'button-link--light' : ''}`} href={href}>
      <span>{children}</span><Arrow />
    </a>
  )
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? 'eyebrow--light' : ''}`}>{children}</p>
}

function Header({ forceDark = false, currentPath }: { forceDark?: boolean; currentPath?: string }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const activePath = currentPath ?? (typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') || '/' : '/')

  return (
    <header className={`site-header ${scrolled || forceDark ? 'site-header--solid' : ''}`}>
      <Logo />
      <nav className="nav-desktop" aria-label="Navigation principale">
        {navItems.slice(0, 5).map(([label, href]) => {
          const isActive = href === '/' ? activePath === '/' : activePath === href
          return (
            <a key={href} href={href} className={isActive ? 'active' : ''}>
              {label}
            </a>
          )
        })}
      </nav>
      <a className="header-contact" href="/contact">Nous contacter <Arrow /></a>
      <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Ouvrir le menu">
        <span /><span />
      </button>
      <div className={`mobile-menu ${open ? 'mobile-menu--open' : ''}`} aria-hidden={!open}>
        <div className="mobile-menu__top"><Logo /><button type="button" onClick={() => setOpen(false)} aria-label="Fermer le menu">Fermer</button></div>
        <nav aria-label="Navigation mobile">
          {navItems.map(([label, href], index) => {
            const isActive = href === '/' ? activePath === '/' : activePath === href
            return (
              <a href={href} key={href} className={isActive ? 'active' : ''} onClick={() => setOpen(false)}>
                <small>0{index + 1}</small>{label}<Arrow />
              </a>
            )
          })}
        </nav>
        <p>Racines & Couronnes<br />L’Afrique élève ses reines.</p>
      </div>
    </header>
  )
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>
}

const EVENT_TARGET_DATE = new Date('2026-12-26T19:00:00Z').getTime()

function getTimeRemaining() {
  const now = Date.now()
  const diff = Math.max(0, EVENT_TARGET_DATE - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeRemaining())
    }, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const units = [
    { label: 'Jours', sub: 'Avant le sacre', value: timeLeft.days, progress: Math.min(100, (timeLeft.days / 365) * 100) },
    { label: 'Heures', sub: 'De préparation', value: timeLeft.hours, progress: (timeLeft.hours / 24) * 100 },
    { label: 'Minutes', sub: 'D’anticipation', value: timeLeft.minutes, progress: (timeLeft.minutes / 60) * 100 },
    { label: 'Secondes', sub: 'En temps réel', value: timeLeft.seconds, progress: (timeLeft.seconds / 60) * 100, isLive: true },
  ]

  return (
    <section className="countdown-section" aria-label="Compte à rebours officiel">
      <div className="countdown__ambient" aria-hidden="true">
        <span className="countdown__orb countdown__orb--1" />
        <span className="countdown__orb countdown__orb--2" />
        <div className="countdown__rays"><i /><i /><i /><i /><i /><i /><i /></div>
      </div>

      <div className="countdown__container">
        <div className="countdown__header">
          <div className="countdown__title-group">
            <Eyebrow light>Rendez-vous officiel · 4e Édition</Eyebrow>
            <h2>L’HEURE DU <em>COURONNEMENT</em><br />APPROCHE.</h2>
          </div>
          <div className="countdown__venue-card">
            <div className="countdown__live-pill">
              <span className="countdown__pulse-dot" />
              <span>Compte à rebours en direct</span>
            </div>
            <div className="countdown__venue-details">
              <div>
                <small>Date officielle</small>
                <strong>26 Décembre 2026</strong>
              </div>
              <span className="countdown__divider" aria-hidden="true" />
              <div>
                <small>Lieu d’exception</small>
                <strong>Noom Hotel Dakar Sea Plaza</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="countdown__grid" role="timer" aria-live="polite">
          {units.map((unit, index) => {
            const formatted = String(unit.value).padStart(2, '0')
            return (
              <div className="countdown__item-wrap" key={unit.label}>
                <article className={`countdown__card ${unit.isLive ? 'countdown__card--live' : ''}`}>
                  <span className="countdown__corner countdown__corner--tl" aria-hidden="true" />
                  <span className="countdown__corner countdown__corner--br" aria-hidden="true" />
                  <div className="countdown__card-top">
                    <span>0{index + 1}</span>
                    {unit.isLive && <em className="countdown__live-tag">LIVE</em>}
                  </div>
                  <div className="countdown__digits">
                    <span className="countdown__number" key={formatted}>
                      {formatted}
                    </span>
                  </div>
                  <div className="countdown__card-footer">
                    <strong>{unit.label}</strong>
                    <small>{unit.sub}</small>
                    <div className="countdown__progress" aria-hidden="true">
                      <span style={{ width: `${unit.progress}%` }} />
                    </div>
                  </div>
                </article>
                {index < units.length - 1 && (
                  <div className="countdown__colon" aria-hidden="true">
                    <span /><span />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="countdown__bottom-bar">
          <p>Corniche Ouest, Dakar — Sénégal · Cérémonie de Gala & Le Talk des Linguères</p>
          <a className="text-link text-link--light" href="/partenaires">Associer votre institution à l’événement <Arrow /></a>
        </div>
      </div>
    </section>
  )
}

const heroStars = [
  { top: '16%', left: '18%', size: 14, delay: '0.2s', dur: '2.6s' },
  { top: '24%', left: '42%', size: 10, delay: '0.8s', dur: '3.1s' },
  { top: '18%', left: '72%', size: 16, delay: '0.4s', dur: '2.8s' },
  { top: '34%', left: '26%', size: 12, delay: '1.4s', dur: '3.4s' },
  { top: '36%', left: '86%', size: 15, delay: '1.0s', dur: '2.5s' },
  { top: '48%', left: '60%', size: 11, delay: '1.8s', dur: '3.2s' },
  { top: '56%', left: '22%', size: 14, delay: '0.6s', dur: '2.9s' },
  { top: '64%', left: '76%', size: 17, delay: '1.2s', dur: '3.0s' },
  { top: '74%', left: '40%', size: 11, delay: '0.3s', dur: '2.7s' },
  { top: '82%', left: '65%', size: 13, delay: '1.6s', dur: '3.3s' },
  { top: '28%', left: '54%', size: 12, delay: '0.5s', dur: '2.4s' },
  { top: '68%', left: '14%', size: 10, delay: '1.3s', dur: '3.0s' },
  { top: '44%', left: '38%', size: 15, delay: '2.0s', dur: '2.7s' },
  { top: '86%', left: '82%', size: 12, delay: '0.7s', dur: '3.1s' },
]

function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const shimmerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    if (shimmerRef.current) {
      shimmerRef.current.style.setProperty('--mx', `${x}%`)
      shimmerRef.current.style.setProperty('--my', `${y}%`)
    }
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX - rect.left}px`
      cursorRef.current.style.top = `${e.clientY - rect.top}px`
    }
  }

  function handleMouseEnter() {
    cursorRef.current?.classList.add('hero__cursor--visible')
  }

  function handleMouseLeave() {
    cursorRef.current?.classList.remove('hero__cursor--visible')
  }

  return (
    <main>
      <section
        className="hero"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Header />
        <img className="hero__image" src={images.hero} alt="Portrait éditorial d'une femme africaine portant un foulard — visuel d'ambiance non officiel" />
        <div className="hero__veil" />
        <div className="hero__shimmer" ref={shimmerRef} aria-hidden="true" />
        <div className="hero__stars" aria-hidden="true">
          {heroStars.map((star, i) => (
            <span
              key={i}
              className="hero__star"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: star.delay,
                animationDuration: star.dur,
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z"
                  fill="url(#goldStarGrad)"
                />
              </svg>
            </span>
          ))}
          <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
            <defs>
              <linearGradient id="goldStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFDF7" />
                <stop offset="45%" stopColor="#E8D8BB" />
                <stop offset="100%" stopColor="#BA9053" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="hero__cursor" ref={cursorRef} aria-hidden="true">
          <svg className="hero__cursor-star" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z"
              fill="url(#goldStarGrad)"
            />
          </svg>
        </div>
        <div className="hero__content">
          <div className="hero__date-badge">
            <span className="hero__date-dot" />
            <span>26 Décembre 2026 · Noom Hotel Dakar Sea Plaza</span>
          </div>
          <p className="hero__kicker">L’Afrique au féminin</p>
          <h1>RACINES<br /><em>&</em> COURONNES</h1>
          <div className="hero__bottom">
            <p>L’Afrique éduque ses filles,<br />élève ses reines.</p>
            <div className="hero__actions">
              <ButtonLink href="#manifeste" light>Découvrir l’événement</ButtonLink>
              <a className="text-link text-link--light" href="#pantheon">Explorer les distinctions <Arrow /></a>
            </div>
          </div>
        </div>
        <p className="photo-credit">Visuel d’ambiance · Ato Aikins / Unsplash</p>
      </section>

      <CountdownSection />

      <section className="manifesto section" id="manifeste">
        <div className="manifesto__intro">
          <div className="manifesto__meta">
            <Eyebrow>Le manifeste</Eyebrow>
            <p className="manifesto__tag">Institution Panafricaine<br /><span>Racines & Couronnes · 2026</span></p>
          </div>
          <Reveal><h2>ET SI L’AFRIQUE<br />ÉCRIVAIT SA GRANDEUR<br /><em>AU FÉMININ ?</em></h2></Reveal>
          <p className="manifesto__lead-note">
            De la mémoire des reines d’hier aux bâtisseuses d’aujourd’hui, nous érigeons un espace où chaque trajectoire féminine devient un repère pour le continent.
          </p>
        </div>
        <div className="manifesto__body">
          <figure className="manifesto__image image-reveal">
            <div className="manifesto__image-frame">
              <img src={images.manifesto} alt="Portrait éditorial d’une femme africaine — visuel d’ambiance non officiel" />
              <div className="manifesto__badge">
                <span>Édition 2026</span>
                <strong>L’Afrique éduque ses filles, élève ses reines.</strong>
              </div>
            </div>
            <figcaption>Visuel d’ambiance · Godfred Kwakye / Unsplash</figcaption>
          </figure>
          <div className="manifesto__copy">
            <p className="dropcap">Les Linguères Awards célèbrent celles qui transforment, transmettent et ouvrent des voies nouvelles.</p>
            <p>Une institution panafricaine dédiée à l’excellence féminine, où les héritages deviennent des forces et l’éducation une promesse d’avenir. À travers le continent et sa diaspora, nous honorons les femmes qui façonnent durablement notre époque.</p>
            <blockquote>
              <span>La devise des Linguères</span>
              « Une femme enracinée<br />peut porter toutes les couronnes. »
            </blockquote>
            <div className="manifesto__pillars">
              <div><span>01</span><strong>Célébrer</strong><p>Distinguer les parcours d’exception</p></div>
              <div><span>02</span><strong>Transmettre</strong><p>Relier les générations de leaders</p></div>
              <div><span>03</span><strong>Éduquer</strong><p>Soutenir l’avenir des jeunes filles</p></div>
            </div>
            <div className="manifesto__actions">
              <ButtonLink href="/evenement">Notre vision</ButtonLink>
              <a className="text-link" href="#pantheon">Découvrir le Panthéon <Arrow /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="chapters">
        {[
          ['01', 'HÉRITAGE', 'Racines, mémoire, identité, transmission.', images.heritage, 'chapter--heritage'],
          ['02', 'LEADERSHIP', 'Audace, influence, impact, excellence.', images.leadership, 'chapter--leadership'],
          ['03', 'FUTUR', 'Éducation, innovation, transformation.', images.future, 'chapter--future'],
        ].map(([number, title, copy, image, modifier]) => (
          <article className={`chapter ${modifier}`} key={title}>
            <img src={image} alt={`Chapitre ${title.toLowerCase()} — Linguères Awards`} />
            <div className="chapter__overlay" />
            <p className="chapter__number">{number} / 03</p>
            <div className="chapter__content">
              <p>Un pilier de notre histoire</p>
              <h2>{title}</h2>
              <span>{copy}</span>
            </div>
            <i className="chapter__line" />
          </article>
        ))}
      </section>

      <section className="experience section" id="experience">
        <div className="section-heading">
          <Eyebrow>L’expérience Linguères</Eyebrow>
          <Reveal><h2>DEUX TEMPS.<br /><em>UNE MÊME ÉLÉVATION.</em></h2></Reveal>
          <p>Une édition pensée comme une narration vivante, de la parole à la célébration.</p>
        </div>
        <div className="experience__grid">
          <article className="experience-card experience-card--talk">
            <p>01 · Penser</p>
            <div><h3>LE TALK<br />DES LINGUÈRES</h3><p>Panels d’impact, entrepreneuriat, innovation, éducation des filles et transmission intergénérationnelle.</p></div>
            <a href="/experience">Découvrir le programme <Arrow /></a>
          </article>
          <article className="experience-card experience-card--ceremony">
            <img src={images.gathering} alt="Femmes Linguères d’exception réunies — La Cérémonie du Sacre" />
            <div className="experience-card__shade" />
            <p>02 · Célébrer</p>
            <div><h3>LA CÉRÉMONIE<br />DU SACRE</h3><p>Keynote, distinctions, narration artistique, exposition et rencontres d’exception.</p></div>
            <a href="/experience">Entrer dans l’expérience <Arrow /></a>
          </article>
        </div>
        <div className="experience__moments">
          {['Le Tunnel des Linguères', 'Le Mur des Engagements', 'Le Pavillon Linguère Sénégal', 'Une narration en trois actes'].map((item, index) => (
            <div key={item}><span>0{index + 1}</span><p>{item}</p></div>
          ))}
        </div>
      </section>

      <section className="pantheon section" id="pantheon">
        <div className="pantheon__head">
          <div><Eyebrow light>Distinctions 2026</Eyebrow><h2>LE PANTHÉON<br /><em>DES LINGUÈRES</em></h2></div>
          <p>Des femmes d’exception.<br />Des parcours qui façonnent l’Afrique.</p>
        </div>
        <div className="category-list">
          {categories.map((category, index) => (
            <a href="/distinctions" key={category}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>Prix {category}</strong>
              <Arrow />
            </a>
          ))}
        </div>
        <div className="special-awards">
          <p>Distinctions spéciales</p>
          <div><span>Prix Art & Scène</span><span>He For She</span></div>
        </div>
      </section>

      <section className="education">
        <img className="education__image" src={images.education} alt="Élèves africaines levant la main en classe avec enthousiasme — #AfricaEducatesHer" />
        <div className="education__veil" />
        <div className="education__content">
          <div className="education__copy">
            <Eyebrow light>Notre engagement · #AfricaEducatesHer</Eyebrow>
            <h2>ÉDUQUER UNE FILLE,<br /><em>C’EST ÉLEVER L’AVENIR.</em></h2>
            <p>L’éducation ne transmet pas seulement un savoir. Elle donne une voix, révèle une puissance et rend possible un leadership nouveau.</p>
            <div className="education__actions">
              <ButtonLink href="/evenement" light>Porter l’engagement</ButtonLink>
              <a className="text-link text-link--light" href="/partenaires">Rejoindre l’initiative <Arrow /></a>
            </div>
          </div>
        </div>
        <p className="photo-credit">Linguères Awards · #AfricaEducatesHer</p>
      </section>

      <section className="faces section">
        <div className="section-heading section-heading--row">
          <div><Eyebrow>Les visages des Linguères</Eyebrow><h2>ELLES ÉCRIVENT<br /><em>LE PROCHAIN CHAPITRE.</em></h2></div>
          <p>Les profils officiels seront révélés prochainement. Aucun nom ne sera publié avant l’annonce de l’organisation.</p>
        </div>
        <div className="faces__gallery">
          {[images.portraitOne, images.portraitTwo, images.portraitThree].map((image, index) => (
            <article className={`portrait portrait--${index + 1}`} key={image}>
              <img src={image} alt="Portrait éditorial temporaire — visuel d’ambiance non officiel" />
              <div><span>Portrait d’ambiance</span><p>Révélation prochaine</p></div>
            </article>
          ))}
        </div>
        <a className="text-link" href="/nominees">Découvrir le futur panthéon <Arrow /></a>
      </section>

      <section className="impact section">
        <div className="impact__title"><Eyebrow>Impact & ambition</Eyebrow><h2>UNE ÉDITION<br />À LA HAUTEUR<br /><em>DE L’AVENIR.</em></h2><p>Objectifs de l’édition 2026</p></div>
        <div className="stats">
          {stats.map(([value, label]) => <div key={label}><strong>{value}</strong><p>{label}</p></div>)}
        </div>
      </section>

      <PartnerCta />
      <Footer />
    </main>
  )
}

const pageData: Record<string, { eyebrow: string; title: ReactNode; intro: string; image: string; sections: [string, string][] }> = {
  '/evenement': {
    eyebrow: 'L’institution',
    title: (
      <>
        L’AFRIQUE ÉCRIT<br />
        SA GRANDEUR AU FÉMININ.
      </>
    ),
    intro: 'Les Linguères Awards distinguent et relient les femmes qui font avancer le continent par l’excellence, la transmission et l’impact.',
    image: images.manifesto,
    sections: [['Une vision panafricaine', 'Faire rayonner des parcours féminins venus de tout le continent et de sa diaspora, sans effacer la singularité de chaque voix.'], ['Trois piliers', 'Héritage pour savoir d’où nous venons. Leadership pour agir aujourd’hui. Futur pour préparer celles qui viennent.'], ['Une édition engagée', 'En 2026, l’éducation des filles devient le fil rouge d’une ambition collective : transformer l’accès au savoir en puissance d’action.']],
  },
  '/experience': {
    eyebrow: 'Expérience 2026',
    title: (
      <>
        DE LA PAROLE<br />
        <em>AU SACRE.</em>
      </>
    ),
    intro: 'Une journée imaginée comme une narration en trois actes : se souvenir, prendre position, ouvrir l’avenir.',
    image: images.gathering,
    sections: [['Le Talk des Linguères', 'Des conversations d’impact autour de l’entrepreneuriat, l’innovation, la transmission et l’éducation des filles.'], ['La Cérémonie du Sacre', 'Un moment de reconnaissance et d’émotion réunissant distinctions, keynote, exposition et rencontres.'], ['Les expériences signature', 'Tunnel des Linguères, Mur des Engagements et Pavillon Linguère Sénégal composent un parcours culturel sensible et contemporain.']],
  },
  '/distinctions': {
    eyebrow: 'Le Panthéon 2026',
    title: (
      <>
        DISTINGUER CELLES<br />
        QUI TRANSFORMENT.
      </>
    ),
    intro: 'Onze prix officiels et deux distinctions spéciales pour honorer la pluralité des talents, des engagements et des trajectoires.',
    image: images.heritage,
    sections: categories.slice(0, 6).map((item, index) => [`${String(index + 1).padStart(2, '0')} — Prix ${item}`, 'Les critères détaillés, modalités et échéances seront publiés par l’organisation lors de l’ouverture officielle.']) as [string, string][],
  },
  '/nominees': {
    eyebrow: 'Les visages des Linguères',
    title: (
      <>
        LE PANTHÉON SE<br />
        RÉVÈLERA BIENTÔT.
      </>
    ),
    intro: 'Cet espace accueillera les femmes officiellement nommées pour l’édition 2026. Aucun profil fictif, aucun palmarès anticipé.',
    image: images.portraitOne,
    sections: [['Annonces officielles', 'Les portraits, domaines d’action et distinctions seront ajoutés au rythme des communications officielles.'], ['Des parcours à explorer', 'Chaque nominée disposera d’un espace éditorial dédié pour raconter son impact au-delà d’un simple palmarès.'], ['Restez informée', 'Suivez les canaux officiels des Linguères Awards pour ne manquer aucune révélation.']],
  },
  '/partenaires': {
    eyebrow: 'Partenariats',
    title: (
      <>
        ENSEMBLE,<br />
        <em>ÉCRIVONS LA SUITE.</em>
      </>
    ),
    intro: 'Entreprises, institutions, médias et mécènes : associez votre engagement à une plateforme panafricaine de leadership féminin.',
    image: images.leadership,
    sections: [['Porter un impact réel', 'Soutenir l’éducation des filles et la mise en lumière de femmes qui transforment durablement leurs communautés.'], ['Créer des connexions', 'Rencontrer un écosystème engagé de décideuses, entrepreneures, créatrices, institutions et médias.'], ['Construire sur mesure', 'Les formats de partenariat seront conçus avec exigence, cohérence et respect de l’identité de chaque organisation.']],
  },
  '/contact': {
    eyebrow: 'Nous contacter',
    title: (
      <>
        OUVRONS LA<br />
        CONVERSATION.
      </>
    ),
    intro: 'Rendez-vous le 26 décembre 2026 au Noom Hotel Dakar Sea Plaza. Pour toute demande institutionnelle, média ou partenariat, notre équipe est à votre écoute.',
    image: images.future,
    sections: [['Partenariats', 'Construisons une collaboration porteuse de sens autour de l’édition du 26 décembre 2026.'], ['Médias & presse', 'Recevez le dossier de presse et les accréditations officielles pour la cérémonie au Noom Hotel Dakar Sea Plaza.'], ['Lieu & Date officiels', 'Samedi 26 décembre 2026 au Noom Hotel Dakar Sea Plaza (Corniche Ouest, Dakar, Sénégal).']],
  },
}

function SecondaryPage({ data, currentPath }: { data: (typeof pageData)[string]; currentPath?: string }) {
  return (
    <main className="inner-page">
      <Header currentPath={currentPath} />
      <section className="inner-hero">
        <img src={data.image} alt="Visuel éditorial d’ambiance non officiel" />
        <div className="inner-hero__veil" />
        <div className="inner-hero__content">
          <Eyebrow light>{data.eyebrow}</Eyebrow>
          <h1>{data.title}</h1>
          <p>{data.intro}</p>
        </div>
      </section>
      <section className="inner-content section">
        <p className="inner-content__index">Linguères Awards 2026 <span /> 4e édition</p>
        <div className="inner-content__list">
          {data.sections.map(([title, copy], index) => (
            <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p></article>
          ))}
        </div>
      </section>
      <PartnerCta />
      <Footer />
    </main>
  )
}

function PartnerCta() {
  return (
    <section className="partner-cta">
      <p>Partenaires · Institutions · Médias · Mécènes</p>
      <h2>ENSEMBLE,<br /><em>ÉCRIVONS LA SUITE.</em></h2>
      <ButtonLink href="/partenaires" light>Devenir partenaire</ButtonLink>
      <div className="crown-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer__top">
        <Logo />
        <p>Racines & Couronnes<br />L’Afrique éduque ses filles,<br />élève ses reines.</p>
        <nav aria-label="Navigation de pied de page">{navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
        <div><p>26 Décembre 2026<br />Noom Hotel Dakar Sea Plaza</p><a href="/contact">Prendre contact <Arrow /></a></div>
      </div>
      <div className="footer__bottom"><span>© 2026 Linguères Awards</span><a href="/">Mentions légales</a><a href="/">Confidentialité</a><span>26 Déc. 2026 · Noom Hotel Dakar</span></div>
    </footer>
  )
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname.replace(/\/$/, '') || '/')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal, .image-reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [currentPath])

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname.replace(/\/$/, '') || '/')
    window.addEventListener('popstate', onPopState)

    // Interception fluide des clics sur les liens internes
    const handleDocClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href) return

      // Ignorer les ancres pures, liens externes ou protocoles
      if (href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return

      if (href.startsWith('/')) {
        e.preventDefault()
        if (href !== window.location.pathname) {
          window.history.pushState({}, '', href)
          setCurrentPath(href.replace(/\/$/, '') || '/')
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    document.addEventListener('click', handleDocClick)
    return () => {
      window.removeEventListener('popstate', onPopState)
      document.removeEventListener('click', handleDocClick)
    }
  }, [])

  if (currentPath === '/nominees') {
    return (
      <NomineesPage
        HeaderComponent={Header}
        FooterComponent={Footer}
        PartnerCtaComponent={PartnerCta}
        EyebrowComponent={Eyebrow}
        heroImage={images.portraitOne}
      />
    )
  }

  return currentPath === '/' ? <HomePage /> : <SecondaryPage data={pageData[currentPath] ?? pageData['/evenement']} currentPath={currentPath} />
}
