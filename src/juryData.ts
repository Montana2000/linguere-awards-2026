import photoAissatou from '../JURY/AISSATOU DIOP.jpeg'
import photoAminata from '../JURY/AMINATA RASSOUL CISSE.jpeg'
import photoDior from '../JURY/DIOR BIRIMA.jpeg'
import photoEssie from '../JURY/ESSIE E. CODJIE.jpeg'
import photoMameBineta from '../JURY/MAME BINETA DIALLO.jpeg'

export interface JuryMember {
  id: string
  num: string
  name: string
  role: string
  specialty: string
  tags: string[]
  bio: string
  quote: string
  photo: string
}

export const JURY_MEMBERS: JuryMember[] = [
  {
    id: 'aissatou-diop',
    num: '01',
    name: 'Aïssatou Diop',
    role: 'Membre du Jury',
    specialty: 'Experte en Industries Culturelles et Créatives',
    tags: ['Industries Créatives', 'Culture & Patrimoine', 'Valorisation des Talents'],
    bio: 'Experte en Industries Culturelles et Créatives, elle apporte son regard aiguisé sur la création artistique, le rayonnement culturel et la valorisation des talents féminins à l’échelle du continent.',
    quote: 'Une femme enracinée peut porter toutes les couronnes.',
    photo: photoAissatou,
  },
  {
    id: 'aminata-rassoul-cisse',
    num: '02',
    name: 'Aminata Rassoul Cissé',
    role: 'Membre du Jury',
    specialty: 'Analyste financière & Consultante en gestion stratégique',
    tags: ['Finance & Stratégie', 'Entrepreneuriat', 'Mesure d’Impact'],
    bio: 'Analyste financière & Consultante en gestion stratégique d’entreprise, elle apporte un regard stratégique et rigoureux sur la performance financière, l’entrepreneuriat pérenne et l’impact réel des projets.',
    quote: 'Une femme enracinée peut porter toutes les couronnes.',
    photo: photoAminata,
  },
  {
    id: 'dior-birima',
    num: '03',
    name: 'Dior Birima',
    role: 'Membre du Jury',
    specialty: 'Spécialiste en marketing et communication à impact social',
    tags: ['Marketing Social', 'Éducation des Filles', 'Alumni CIEFFA / UA'],
    bio: 'Spécialiste en marketing et communication à impact social. Membre du Comité Directeur de la Communauté des Pratiques des Alumni du CIEFFA Union Africaine – Éducation des Filles en Afrique, elle incarne la mobilisation panafricaine pour l’émancipation par le savoir.',
    quote: 'Une femme enracinée peut porter toutes les couronnes.',
    photo: photoDior,
  },
  {
    id: 'essie-e-codjie',
    num: '04',
    name: 'Essie E. Codjie',
    role: 'Membre du Jury',
    specialty: 'Consultante Sénior & Formatrice Customer Care',
    tags: ['Expérience Client', 'Qualité de Service', 'Mentorat Professionnel'],
    bio: 'Consultante Sénior & Formatrice Customer Care, elle apporte sa vaste expérience en accompagnement professionnel, excellence de la qualité de service et développement des compétences des futures leaders.',
    quote: 'Une femme enracinée peut porter toutes les couronnes.',
    photo: photoEssie,
  },
  {
    id: 'mame-bineta-diouf-diallo',
    num: '05',
    name: 'Mame Bineta Diouf Diallo',
    role: 'Membre du Jury',
    specialty: 'Coach et Mentor certifiée',
    tags: ['Coaching de Dirigeantes', 'Développement Personnel', 'Leadership Féminin'],
    bio: 'Coach et Mentor certifiée, elle met son expertise reconnue au service du développement personnel, du leadership transformationnel et de l’accompagnement stratégique des parcours féminins d’exception.',
    quote: 'Une femme enracinée peut porter toutes les couronnes.',
    photo: photoMameBineta,
  },
]
