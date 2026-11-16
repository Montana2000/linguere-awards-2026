// Données officielles des 44 nominées des Linguères Awards 2026
// 11 catégories officielles · 4 nominées par catégorie

export interface Nominee {
  id: number
  name: string
  category: string
  categoryNumber: string
  categoryCode: string
  fileName: string
  photoUrl: string
  imagePosition?: string
}

export const CATEGORIES = [
  'Toutes les catégories',
  'AfricaEducatesHer',
  'Leadership & Influence Engagée',
  'Excellence Diaspora',
  'Excellence Santé',
  'Héritage & Création',
  'Bâtisseuse d\'Impact',
  'Yaayam',
  'Plume & Paroles',
  'Révélation',
  'Innovation & Technologie',
  'Sport & Performance Féminine',
] as const

export type CategoryName = typeof CATEGORIES[number]

// Fonction d'aide pour normaliser les chaînes (minuscules, sans accents ni ponctuation)
export function normalizeString(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

// Chargement automatique via Vite de toutes les images du dossier 'Photos nominées'
const globPhotos = import.meta.glob<string>('../Photos nominées/*.{jpg,jpeg,png,webp,PNG,JPEG,JPG,jfif,JFIF}', {
  eager: true,
  import: 'default',
})

// Indexations multiples pour garantir la correspondance
const photoByNormalized: Record<string, string> = {}
const photoByExact: Record<string, string> = {}

for (const [filePath, resolvedUrl] of Object.entries(globPhotos)) {
  const parts = filePath.split('/')
  const base = parts[parts.length - 1]
  if (base) {
    photoByExact[base] = resolvedUrl
    photoByExact[base.toLowerCase()] = resolvedUrl
    const norm = normalizeString(base)
    photoByNormalized[norm] = resolvedUrl
  }
}

function resolvePhotoUrl(fileName: string): string {
  if (photoByExact[fileName]) {
    return photoByExact[fileName]
  }
  if (photoByExact[fileName.toLowerCase()]) {
    return photoByExact[fileName.toLowerCase()]
  }
  const norm = normalizeString(fileName)
  if (photoByNormalized[norm]) {
    return photoByNormalized[norm]
  }
  // Secours vers le dossier servi statiquement dans public/photos-nominees/
  return `/photos-nominees/${encodeURIComponent(fileName)}`
}

export const NOMINEES_RAW = [
  // CATÉGORIE 01 — AfricaEducatesHer (Prix d'Excellence dans l'éducation)
  { id: 1, name: 'Adama Diallo', category: 'AfricaEducatesHer', categoryNumber: '01', categoryCode: 'EDU', fileName: 'ADAMA DIALLO.jpg' },
  { id: 2, name: 'Dr COLETTE MANE ALLAGBE', category: 'AfricaEducatesHer', categoryNumber: '01', categoryCode: 'EDU', fileName: 'Colette MANE ALLAGBE.jpg', imagePosition: '75% 20%' },
  { id: 3, name: 'Fatou Diene', category: 'AfricaEducatesHer', categoryNumber: '01', categoryCode: 'EDU', fileName: 'Fatou DIENE.png' },
  { id: 4, name: 'Elvy Gotiene', category: 'AfricaEducatesHer', categoryNumber: '01', categoryCode: 'EDU', fileName: 'ELVY GOTIENE. - Elvy GOTIENE.png' },

  // CATÉGORIE 02 — Leadership & Influence Engagée
  { id: 5, name: 'Aminata Ndiaye', category: 'Leadership & Influence Engagée', categoryNumber: '02', categoryCode: 'LDR', fileName: 'AMINATA NDIAYE.jpeg' },
  { id: 6, name: 'Lalla Fall', category: 'Leadership & Influence Engagée', categoryNumber: '02', categoryCode: 'LDR', fileName: 'LALA_FALL (1).jpeg' },
  { id: 7, name: 'Ndèye Awa Gueye', category: 'Leadership & Influence Engagée', categoryNumber: '02', categoryCode: 'LDR', fileName: 'Ndeye_Awa_GUEYE.jpg' },
  { id: 8, name: 'Khady Cissé Sow', category: 'Leadership & Influence Engagée', categoryNumber: '02', categoryCode: 'LDR', fileName: 'khady_CISSE_SOW.jpg' },

  // CATÉGORIE 03 — Excellence Diaspora
  { id: 9, name: 'Kya Mangane', category: 'Excellence Diaspora', categoryNumber: '03', categoryCode: 'DSP', fileName: 'KYA MANGANE.jpeg' },
  { id: 10, name: 'Dieynaba Dia', category: 'Excellence Diaspora', categoryNumber: '03', categoryCode: 'DSP', fileName: 'DIEYNABA_DIA.jpeg' },
  { id: 11, name: 'Diamilatou SOW', category: 'Excellence Diaspora', categoryNumber: '03', categoryCode: 'DSP', fileName: 'Diamilatou_SOW.jpg' },
  { id: 12, name: 'Maya Seck', category: 'Excellence Diaspora', categoryNumber: '03', categoryCode: 'DSP', fileName: 'MAYA SECK.jpeg' },

  // CATÉGORIE 04 — Excellence Santé
  { id: 13, name: 'Fatoumata Ngayta Diop', category: 'Excellence Santé', categoryNumber: '04', categoryCode: 'SAN', fileName: 'Fatoumata_Ngayta_DIOP.jpg' },
  { id: 14, name: 'Aminata (Amy) Niang', category: 'Excellence Santé', categoryNumber: '04', categoryCode: 'SAN', fileName: 'AMINATA AMY NIANG.jpg' },
  { id: 15, name: 'Fatou Khouma', category: 'Excellence Santé', categoryNumber: '04', categoryCode: 'SAN', fileName: 'Fatou_KHOUMA.jpg' },
  { id: 16, name: 'Diara Gueye Kébé', category: 'Excellence Santé', categoryNumber: '04', categoryCode: 'SAN', fileName: 'DIARA GUEYE KEBE.jpeg' },

  // CATÉGORIE 05 — Héritage & Création
  { id: 17, name: 'Racky Daffé', category: 'Héritage & Création', categoryNumber: '05', categoryCode: 'HER', fileName: 'RACKY DAFFE.jpeg' },
  { id: 18, name: 'Fatou Dior Ndiaye', category: 'Héritage & Création', categoryNumber: '05', categoryCode: 'HER', fileName: 'Fatou_Dior_NDIAYE.jpeg' },
  { id: 19, name: 'Ndèye Rokhaya Diagne', category: 'Héritage & Création', categoryNumber: '05', categoryCode: 'HER', fileName: 'NDEYE ROKHAYA DIAGNE.jpeg' },
  { id: 20, name: 'Elisabeth Anayes Niouky', category: 'Héritage & Création', categoryNumber: '05', categoryCode: 'HER', fileName: 'Elisabeth Anayes Niouky.jpeg' },

  // CATÉGORIE 06 — Bâtisseuse d'Impact
  { id: 21, name: 'Maimouna Diallo', category: 'Bâtisseuse d\'Impact', categoryNumber: '06', categoryCode: 'IMP', fileName: 'Maïmouna_DIALLO.jpeg' },
  { id: 22, name: 'Gnylane Thiam', category: 'Bâtisseuse d\'Impact', categoryNumber: '06', categoryCode: 'IMP', fileName: 'GNYLANE THIAM.jpeg' },
  { id: 23, name: 'Khady Thiam', category: 'Bâtisseuse d\'Impact', categoryNumber: '06', categoryCode: 'IMP', fileName: 'KHADY THIAM.jpeg' },
  { id: 24, name: 'Hadja Khadija Daraameh', category: 'Bâtisseuse d\'Impact', categoryNumber: '06', categoryCode: 'IMP', fileName: 'Khadija_Daraameh.jpeg' },

  // CATÉGORIE 07 — Yaayam
  { id: 25, name: 'Aminata Sy Ndiaye', category: 'Yaayam', categoryNumber: '07', categoryCode: 'YAY', fileName: 'AMINATA SY NDIAYE.PNG' },
  { id: 26, name: 'Ndèye Borsso Ndao', category: 'Yaayam', categoryNumber: '07', categoryCode: 'YAY', fileName: 'Ndeye_Borsso_NDAO.jpeg' },
  { id: 27, name: 'Furaha Bigarura Irene', category: 'Yaayam', categoryNumber: '07', categoryCode: 'YAY', fileName: 'Furaha_Bigarura_Irène.jpg' },
  { id: 28, name: 'Khady Bijou Ndiaye', category: 'Yaayam', categoryNumber: '07', categoryCode: 'YAY', fileName: 'Khady_Bijou_NDIAYE.jpeg' },

  // CATÉGORIE 08 — Plume & Paroles
  { id: 29, name: 'Fatou Mbou Marega', category: 'Plume & Paroles', categoryNumber: '08', categoryCode: 'PLM', fileName: 'FATOU MBOU MAREGA.jpeg' },
  { id: 30, name: 'Tacko Dièye', category: 'Plume & Paroles', categoryNumber: '08', categoryCode: 'PLM', fileName: 'Ndeye_Tacko_DIEYE.jpg' },
  { id: 31, name: 'Ndèye Mané Tall', category: 'Plume & Paroles', categoryNumber: '08', categoryCode: 'PLM', fileName: 'NDEYE MANE TALL .jpeg' },
  { id: 32, name: 'MERRY BEYE', category: 'Plume & Paroles', categoryNumber: '08', categoryCode: 'PLM', fileName: 'Merry_BEYE.jpg' },

  // CATÉGORIE 09 — Révélation
  { id: 33, name: 'Véronique Diouf (VG Surprise)', category: 'Révélation', categoryNumber: '09', categoryCode: 'REV', fileName: 'Véronique_DIOUF.jpeg' },
  { id: 34, name: 'Mame Peinda Bathily', category: 'Révélation', categoryNumber: '09', categoryCode: 'REV', fileName: 'Mame_Penda_BATHILY.jpg' },
  { id: 35, name: 'Mariama Doukansse (Riam\'art)', category: 'Révélation', categoryNumber: '09', categoryCode: 'REV', fileName: 'MARIAMA DOUKANSSE.jpeg' },
  { id: 36, name: 'Mariama Dieng', category: 'Révélation', categoryNumber: '09', categoryCode: 'REV', fileName: 'MARIAMA DIENG.jpg' },

  // CATÉGORIE 10 — Innovation & Technologie
  { id: 37, name: 'Kadiatou Telly Diallo', category: 'Innovation & Technologie', categoryNumber: '10', categoryCode: 'INN', fileName: 'KADIATOUtellyDIALLO.jpeg' },
  { id: 38, name: 'Charlotte Sake Sake', category: 'Innovation & Technologie', categoryNumber: '10', categoryCode: 'INN', fileName: 'Charlotte_Saké_Saké (1).jpg' },
  { id: 39, name: 'Yacine Yade', category: 'Innovation & Technologie', categoryNumber: '10', categoryCode: 'INN', fileName: 'YYADE2.jpeg' },
  { id: 40, name: 'Nadège Donfack Nkenla', category: 'Innovation & Technologie', categoryNumber: '10', categoryCode: 'INN', fileName: 'Nadege_Donfack_Nkenla (1).png' },

  // CATÉGORIE 11 — Sport & Performance Féminine
  { id: 41, name: 'Ndèye Khady Kane', category: 'Sport & Performance Féminine', categoryNumber: '11', categoryCode: 'SPT', fileName: 'Ndeye_Khady_KANE.jpeg' },
  { id: 42, name: 'Tabara Gakou', category: 'Sport & Performance Féminine', categoryNumber: '11', categoryCode: 'SPT', fileName: 'Tabara_GAKOU.jpeg' },
  { id: 43, name: 'Coumba Diouf', category: 'Sport & Performance Féminine', categoryNumber: '11', categoryCode: 'SPT', fileName: 'Coumba_DIOUF.jpg' },
  { id: 44, name: 'Fatou Kiné Ndiaye', category: 'Sport & Performance Féminine', categoryNumber: '11', categoryCode: 'SPT', fileName: 'Fatou_Kiné_NDIAYE.jpg' },
]

export const NOMINEES: Nominee[] = NOMINEES_RAW.map((item) => ({
  ...item,
  photoUrl: resolvePhotoUrl(item.fileName),
}))
