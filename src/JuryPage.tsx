import { type ReactNode } from 'react'
import { JURY_MEMBERS } from './juryData'

interface JuryPageProps {
  HeaderComponent: (props: { forceDark?: boolean; currentPath?: string }) => ReactNode
  FooterComponent: () => ReactNode
  PartnerCtaComponent: () => ReactNode
  EyebrowComponent: (props: { children: ReactNode; light?: boolean }) => ReactNode
  heroImage: string
}

function Arrow({ className = '' }: { className?: string }) {
  return (
    <span className={`arrow ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 14 14"
        width="0.85em"
        height="0.85em"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: 'inline-block', verticalAlign: '-0.05em' }}
      >
        <path d="M3 11L11 3M11 3H5M11 3V9" />
      </svg>
    </span>
  )
}

export default function JuryPage({
  HeaderComponent,
  FooterComponent,
  PartnerCtaComponent,
  EyebrowComponent,
  heroImage,
}: JuryPageProps) {
  return (
    <main className="jury-page">
      <HeaderComponent currentPath="/jury" />

      {/* ─── Hero Section du Jury ─── */}
      <section className="jury-hero">
        <img
          src={heroImage}
          alt="Comité du Jury — Linguères Awards 2026"
          className="jury-hero__bg"
        />
        <div className="jury-hero__veil" />

        <div className="jury-hero__content">
          <EyebrowComponent light>Comité d’Évaluation &amp; d’Excellence · 4e Édition</EyebrowComponent>
          <h1>
            LE JURY OFFICIEL<br />
            <em>DES LINGUÈRES.</em>
          </h1>
          <p className="jury-hero__lead">
            Cinq personnalités d'exception issues des industries créatives, de la finance, du marketing social, de l'expérience client et du mentorat de dirigeantes. Garantes d’une sélection indépendante, exigeante et inspirante pour sacrer les reines de l'Afrique.
          </p>

          <div className="jury-hero__stats">
            <div className="jury-hero__stat">
              <strong>05</strong>
              <span>Personnalités d’exception</span>
            </div>
            <span className="jury-hero__stat-divider" aria-hidden="true" />
            <div className="jury-hero__stat">
              <strong>13</strong>
              <span>Distinctions à décerner</span>
            </div>
            <span className="jury-hero__stat-divider" aria-hidden="true" />
            <div className="jury-hero__stat">
              <strong>100%</strong>
              <span>Expertise &amp; Intégrité</span>
            </div>
            <span className="jury-hero__stat-divider" aria-hidden="true" />
            <div className="jury-hero__stat">
              <strong>26 DÉC.</strong>
              <span>Dakar · Noom Hotel</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Piliers & Charte d’Évaluation ─── */}
      <section className="jury-charter-section">
        <div className="jury-charter-container">
          <div className="jury-charter-header">
            <span className="jury-charter-badge">Éthique &amp; Rigueur</span>
            <h2>LES PRINCIPES DU JURY</h2>
            <p>
              Pour distinguer les lauréates des 11 Prix officiels et des 2 Distinctions d'Honneur, le comité s’appuie sur des critères stricts et transparents.
            </p>
          </div>

          <div className="jury-charter-grid">
            <article className="jury-charter-card">
              <span className="jury-charter-num">01</span>
              <h3>Impact &amp; Pérennité</h3>
              <p>Évaluation concrète des retombées positives des projets sur les communautés, l'émancipation des femmes et l’économie locale.</p>
            </article>

            <article className="jury-charter-card">
              <span className="jury-charter-num">02</span>
              <h3>Transmission &amp; Éducation</h3>
              <p>Une attention prioritaire portée à la volonté de mentorat, au soutien aux jeunes filles et à la relève intergénérationnelle.</p>
            </article>

            <article className="jury-charter-card">
              <span className="jury-charter-num">03</span>
              <h3>Audace &amp; Leadership</h3>
              <p>Reconnaissance de l’originalité, de la force de caractère et de la capacité à briser les plafonds de verre à travers le continent.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ─── Grille des Membres du Jury ─── */}
      <section className="jury-grid-section" id="membres">
        <div className="jury-grid-container">
          <div className="jury-section-header">
            <div className="jury-section-header__left">
              <span className="jury-badge-gold">Composition Officielle · 2026</span>
              <h2>LES MEMBRES <em>DU JURY</em></h2>
              <p>Découvrez les profils des personnalités qui composent le haut comité d'évaluation.</p>
            </div>
            <div className="jury-section-header__motto">
              <span>La devise des Linguères</span>
              <strong>« Une femme enracinée peut porter toutes les couronnes. »</strong>
            </div>
          </div>

          <div className="jury-grid">
            {JURY_MEMBERS.map((member) => (
              <article className="jury-card" key={member.id}>
                {/* Coins dorés ornementaux */}
                <span className="jury-card__corner jury-card__corner--tl" aria-hidden="true" />
                <span className="jury-card__corner jury-card__corner--tr" aria-hidden="true" />
                <span className="jury-card__corner jury-card__corner--bl" aria-hidden="true" />
                <span className="jury-card__corner jury-card__corner--br" aria-hidden="true" />

                <span className="jury-card__num" aria-hidden="true">{member.num}</span>

                {/* Photo de la jurée */}
                <div className="jury-card__photo-wrap">
                  <div className="jury-card__photo-frame">
                    <img
                      src={member.photo}
                      alt={`${member.name} — ${member.role}`}
                      className="jury-card__photo"
                    />
                    <div className="jury-card__photo-veil" />
                    <div className="jury-card__photo-border" aria-hidden="true" />
                  </div>
                  <div className="jury-card__badge">
                    <span className="jury-card__badge-dot" />
                    <span>{member.role}</span>
                  </div>
                </div>

                {/* Informations de la jurée */}
                <div className="jury-card__content">
                  <div className="jury-card__crown" aria-hidden="true">
                    <svg width="28" height="18" viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 26 L4 10 L16 18 L24 4 L32 18 L44 10 L44 26 Z" stroke="#ba9053" strokeWidth="1.6" fill="rgba(186,144,83,0.12)" strokeLinejoin="round"/>
                      <circle cx="4" cy="10" r="2.5" fill="#ba9053"/>
                      <circle cx="24" cy="4" r="2.5" fill="#ba9053"/>
                      <circle cx="44" cy="10" r="2.5" fill="#ba9053"/>
                      <line x1="4" y1="27" x2="44" y2="27" stroke="#ba9053" strokeWidth="1.2"/>
                    </svg>
                    <span className="jury-card__crown-line" />
                  </div>

                  <h3 className="jury-card__name">{member.name}</h3>
                  <p className="jury-card__specialty">{member.specialty}</p>

                  {/* Tags d'expertise */}
                  <div className="jury-card__tags">
                    {member.tags.map((tag) => (
                      <span className="jury-card__tag" key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="jury-card__divider" />

                  <p className="jury-card__bio">{member.bio}</p>

                  <div className="jury-card__footer">
                    <div className="jury-card__edition">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span>Édition 2026 · Noom Hotel Dakar</span>
                    </div>
                    <a className="jury-card__link" href="/distinctions">
                      Voir distinctions <Arrow />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Citation Signature ─── */}
      <section className="jury-quote-section">
        <div className="jury-quote-container">
          <blockquote className="jury-quote">
            <span className="jury-quote__mark" aria-hidden="true">“</span>
            <p>
              Célébrer l'excellence, c'est révéler la puissance des trajectoires féminines qui façonnent l'Afrique contemporaine.
            </p>
            <cite>Le Comité du Jury — Linguères Awards 2026</cite>
          </blockquote>
        </div>
      </section>

      <PartnerCtaComponent />
      <FooterComponent />
    </main>
  )
}
