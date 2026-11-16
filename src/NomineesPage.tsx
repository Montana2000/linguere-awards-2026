import { useState, useMemo, useRef, useEffect, type ReactNode } from 'react'
import {
  CATEGORIES,
  NOMINEES,
  normalizeString,
  type CategoryName,
  type Nominee,
} from './nomineesData'

interface NomineesPageProps {
  HeaderComponent: (props: { forceDark?: boolean; currentPath?: string }) => ReactNode
  FooterComponent: () => ReactNode
  PartnerCtaComponent: () => ReactNode
  EyebrowComponent: (props: { children: ReactNode; light?: boolean }) => ReactNode
  heroImage: string
}

// Fonction de mise en surbrillance insensible aux accents et à la casse
function renderHighlightedText(text: string, query: string): ReactNode {
  const cleanQ = query.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  if (!cleanQ) return text

  let qPos = 0
  let matchStart = -1
  let matchEnd = -1

  for (let i = 0; i < text.length; i++) {
    const charNorm = text[i].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    if (!charNorm) continue

    if (charNorm === cleanQ[qPos]) {
      if (qPos === 0) matchStart = i
      qPos++
      if (qPos === cleanQ.length) {
        matchEnd = i + 1
        break
      }
    } else {
      qPos = 0
      matchStart = -1
      if (charNorm === cleanQ[0]) {
        matchStart = i
        qPos = 1
        if (qPos === cleanQ.length) {
          matchEnd = i + 1
          break
        }
      }
    }
  }

  if (matchStart !== -1 && matchEnd !== -1) {
    const before = text.slice(0, matchStart)
    const match = text.slice(matchStart, matchEnd)
    const after = text.slice(matchEnd)
    return (
      <>
        {before}
        <mark className="nominee-suggest-highlight">{match}</mark>
        {after}
      </>
    )
  }

  return text
}

export default function NomineesPage({
  HeaderComponent,
  FooterComponent,
  PartnerCtaComponent,
  EyebrowComponent,
  heroImage,
}: NomineesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryName>('Toutes les catégories')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [activeHighlightId, setActiveHighlightId] = useState<number | null>(null)

  const searchBoxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Fermeture des suggestions lors d'un clic extérieur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Liste des suggestions en temps réel (recherche poussée sur nom, catégorie et alias)
  const suggestions = useMemo(() => {
    const query = normalizeString(searchQuery.trim())
    if (!query) return []

    return NOMINEES.filter((nominee) => {
      const nameNorm = normalizeString(nominee.name)
      const catNorm = normalizeString(nominee.category)
      return nameNorm.includes(query) || catNorm.includes(query)
    }).slice(0, 8)
  }, [searchQuery])

  // Filtrage principal de la grille
  const filteredNominees = useMemo(() => {
    const query = normalizeString(searchQuery.trim())

    return NOMINEES.filter((nominee) => {
      // Filtre catégorie
      const matchesCategory =
        selectedCategory === 'Toutes les catégories' || nominee.category === selectedCategory

      if (!matchesCategory) return false

      // Filtre recherche par nom ou catégorie
      if (!query) return true

      const nameNorm = normalizeString(nominee.name)
      const catNorm = normalizeString(nominee.category)
      return nameNorm.includes(query) || catNorm.includes(query)
    })
  }, [selectedCategory, searchQuery])

  // Comptage par catégorie pour l'affichage des badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'Toutes les catégories': NOMINEES.length }
    NOMINEES.forEach((n) => {
      counts[n.category] = (counts[n.category] || 0) + 1
    })
    return counts
  }, [])

  const hasActiveFilters = selectedCategory !== 'Toutes les catégories' || searchQuery.trim() !== ''

  const handleResetFilters = () => {
    setSelectedCategory('Toutes les catégories')
    setSearchQuery('')
    setShowSuggestions(false)
    setActiveHighlightId(null)
  }

  // Sélection d'une suggestion de nominée
  const handleSelectSuggestion = (nominee: Nominee) => {
    setSearchQuery(nominee.name)
    setSelectedCategory('Toutes les catégories')
    setShowSuggestions(false)
    setActiveHighlightId(nominee.id)

    // Défilement doux vers la carte correspondante
    setTimeout(() => {
      const card = document.getElementById(`nominee-card-${nominee.id}`)
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)

    // Retrait du halo de mise en valeur après 3.5 secondes
    setTimeout(() => {
      setActiveHighlightId((prev) => (prev === nominee.id ? null : prev))
    }, 3500)
  }

  // Gestion de la navigation clavier dans les suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Escape') {
        setShowSuggestions(false)
      }
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        handleSelectSuggestion(suggestions[highlightedIndex])
      } else if (suggestions.length > 0) {
        handleSelectSuggestion(suggestions[0])
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  return (
    <main className="inner-page nominees-page">
      <HeaderComponent forceDark currentPath="/nominees" />

      {/* Hero Section dédiée aux Nominées */}
      <section className="inner-hero nominees-hero">
        <img
          src={heroImage}
          alt="Les visages d'exception des Linguères Awards 2026"
          className="nominees-hero__bg"
        />
        <div className="inner-hero__veil" />
        <div className="inner-hero__content">
          <EyebrowComponent light>Les visages des Linguères · 4e Édition</EyebrowComponent>
          <h1>LES NOMINÉES 2026</h1>
          <p>
            Découvrez les 44 femmes d'exception nominées aux Linguères Awards 2026. Des parcours
            inspirants, des engagements remarquables et des talents qui contribuent au rayonnement
            du leadership féminin.
          </p>

          <div className="nominees-hero__stats">
            <div className="nominees-hero__stat">
              <strong>44</strong>
              <span>Nominées d’exception</span>
            </div>
            <div className="nominees-hero__stat-divider" />
            <div className="nominees-hero__stat">
              <strong>11</strong>
              <span>Catégories officielles</span>
            </div>
            <div className="nominees-hero__stat-divider" />
            <div className="nominees-hero__stat">
              <strong>4</strong>
              <span>Candidates par catégorie</span>
            </div>
            <div className="nominees-hero__stat-divider" />
            <div className="nominees-hero__stat">
              <strong>26 DÉC.</strong>
              <span>Dakar · Noom Hotel</span>
            </div>
          </div>
        </div>
      </section>

      {/* Barre de commande : Recherche poussée avec suggestions & Filtres par catégorie */}
      <section className="nominees-filter-section" id="liste-nominees">
        <div className="nominees-filter-container">
          <div className="nominees-filter-top">
            <div className="nominees-search-box" ref={searchBoxRef}>
              <span className="nominees-search-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                ref={inputRef}
                type="text"
                className="nominees-search-input"
                placeholder="Rechercher une nominée par nom..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSuggestions(true)
                  setHighlightedIndex(-1)
                }}
                onFocus={() => {
                  if (searchQuery.trim().length > 0) {
                    setShowSuggestions(true)
                  }
                }}
                onKeyDown={handleKeyDown}
                aria-label="Rechercher une nominée par nom"
                aria-autocomplete="list"
                aria-controls="nominees-suggestions-popup"
                aria-expanded={showSuggestions}
              />

              {searchQuery && (
                <button
                  type="button"
                  className="nominees-search-clear"
                  onClick={() => {
                    setSearchQuery('')
                    setShowSuggestions(false)
                    setHighlightedIndex(-1)
                    inputRef.current?.focus()
                  }}
                  aria-label="Effacer la recherche"
                >
                  ✕
                </button>
              )}

              {/* Menu déroulant de suggestions en temps réel */}
              {showSuggestions && searchQuery.trim().length > 0 && (
                <div
                  id="nominees-suggestions-popup"
                  className="nominees-suggestions-dropdown"
                  role="listbox"
                  aria-label="Suggestions de nominées"
                >
                  {suggestions.length > 0 ? (
                    <>
                      <div className="nominees-suggestions-header">
                        <span>Suggestions officielles</span>
                        <strong>{suggestions.length} trouvée{suggestions.length > 1 ? 's' : ''}</strong>
                      </div>
                      <ul className="nominees-suggestions-list">
                        {suggestions.map((nominee, idx) => {
                          const isHighlighted = idx === highlightedIndex
                          return (
                            <li
                              key={nominee.id}
                              role="option"
                              aria-selected={isHighlighted}
                              className={`nominees-suggestion-item ${isHighlighted ? 'nominees-suggestion-item--active' : ''}`}
                              onClick={() => handleSelectSuggestion(nominee)}
                              onMouseEnter={() => setHighlightedIndex(idx)}
                            >
                              <div className="nominees-suggestion-thumb">
                                <img
                                  src={nominee.photoUrl}
                                  alt=""
                                  style={nominee.imagePosition ? { objectPosition: nominee.imagePosition } : undefined}
                                  loading="lazy"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none'
                                  }}
                                />
                              </div>
                              <div className="nominees-suggestion-info">
                                <p className="nominees-suggestion-name">
                                  {renderHighlightedText(nominee.name, searchQuery)}
                                </p>
                                <span className="nominees-suggestion-category">
                                  Cat. {nominee.categoryNumber} · {nominee.category}
                                </span>
                              </div>
                              <span className="nominees-suggestion-arrow" aria-hidden="true">↗</span>
                            </li>
                          )
                        })}
                      </ul>
                      <div className="nominees-suggestions-footer">
                        <span>Cliquez ou Entrée pour sélectionner</span>
                        <span>Échap pour fermer</span>
                      </div>
                    </>
                  ) : (
                    <div className="nominees-suggestions-empty">
                      <p>Aucune nominée ne correspond à <em>« {searchQuery} »</em></p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="nominees-status-info">
              <span className="nominees-counter">
                <strong>{filteredNominees.length}</strong> {filteredNominees.length > 1 ? 'nominées affichées' : 'nominée affichée'}
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  className="nominees-reset-btn"
                  onClick={handleResetFilters}
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </div>

          {/* Défilement horizontal des catégories */}
          <div className="nominees-categories-bar" role="tablist" aria-label="Filtrer par catégorie">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category
              const count = categoryCounts[category] ?? 0
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`nominees-category-pill ${isActive ? 'nominees-category-pill--active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(category)
                    setShowSuggestions(false)
                  }}
                >
                  <span className="nominees-pill-label">{category}</span>
                  <span className="nominees-pill-count">{count}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Grille des Cartes Nominées */}
      <section className="nominees-grid-section section">
        {filteredNominees.length > 0 ? (
          <div className="nominees-grid">
            {filteredNominees.map((nominee, index) => (
              <NomineeCard
                key={nominee.id}
                nominee={nominee}
                priority={index < 4}
                isHighlighted={activeHighlightId === nominee.id}
              />
            ))}
          </div>
        ) : (
          <div className="nominees-empty-state">
            <p className="nominees-empty-state__icon">✧</p>
            <h3>Aucune nominée trouvée</h3>
            <p>
              Aucun profil ne correspond à votre recherche {searchQuery && <em>« {searchQuery} »</em>}
              {selectedCategory !== 'Toutes les catégories' && ` dans la catégorie ${selectedCategory}`}.
            </p>
            <button
              type="button"
              className="button-link"
              onClick={handleResetFilters}
            >
              <span>Afficher toutes les 44 nominées</span>
            </button>
          </div>
        )}
      </section>

      <PartnerCtaComponent />
      <FooterComponent />
    </main>
  )
}

function NomineeCard({
  nominee,
  priority = false,
  isHighlighted = false,
}: {
  nominee: Nominee
  priority?: boolean
  isHighlighted?: boolean
}) {
  const [imgError, setImgError] = useState(false)

  // Fallback élégant si l'image subit une erreur de chargement
  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800" fill="%23191416"><rect width="100%" height="100%" fill="%23191416"/><text x="50%" y="48%" font-family="serif" font-size="28" fill="%23ba9053" text-anchor="middle">LINGUÈRES AWARDS</text><text x="50%" y="54%" font-family="sans-serif" font-size="16" fill="%23e8d8bb" text-anchor="middle">Édition 2026</text></svg>`

  return (
    <article
      id={`nominee-card-${nominee.id}`}
      className={`nominee-card ${isHighlighted ? 'nominee-card--highlighted' : ''}`}
      data-category={nominee.category}
    >
      <div className="nominee-card__media">
        <img
          src={imgError ? fallbackSvg : nominee.photoUrl}
          alt={`Photographie de ${nominee.name} — Nominée ${nominee.category}`}
          className="nominee-card__image"
          style={nominee.imagePosition ? { objectPosition: nominee.imagePosition } : undefined}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setImgError(true)}
        />
        <div className="nominee-card__overlay" />

        {/* Badge catégorie et index */}
        <div className="nominee-card__badges">
          <span className="nominee-card__cat-badge">Cat. {nominee.categoryNumber}</span>
          <span className="nominee-card__edition-badge">2026</span>
        </div>

        {/* Ligne dorée subtile décorative */}
        <div className="nominee-card__corner" aria-hidden="true" />
      </div>

      <div className="nominee-card__content">
        <p className="nominee-card__category" title={nominee.category}>
          {nominee.category}
        </p>
        <h3 className="nominee-card__name">{nominee.name}</h3>
        <div className="nominee-card__divider" />
      </div>
    </article>
  )
}
