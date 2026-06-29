export interface HuntStop {
  id: string;
  order: number;
  emoji: string;
  name: string;
  shortName: string;
  /** Riddle or clue to find the location */
  clue: string;
  /** Optional extra hint (costs nothing, just taps) */
  hint: string;
  /** Fun fact shown after completion */
  funFact: string;
  /** Answer(s) accepted — case-insensitive, accents ignored */
  answers: string[];
  /** Approximate coords for "open in maps" link */
  lat: number;
  lng: number;
  /** Celebration message on unlock */
  celebration: string;
}

export const huntStops: HuntStop[] = [
  {
    id: 'village',
    order: 1,
    emoji: '🏘️',
    name: 'Le Village Piétonnier',
    shortName: 'Village',
    clue:
      "On commence doucement : là où les maisons portent des couleurs de bonbon et où l'on flâne sans voitures, entre boutiques et terrasses… Trouve le cœur coloré de Tremblant.",
    hint: "Cherche la rue principale du village piétonnier, près de la fontaine et des bancs en bois.",
    funFact:
      "Le village piétonnier de Tremblant s'inspire des stations alpines européennes — on dirait un petit morceau des Alpes au Québec!",
    answers: ['village', 'village piétonnier', 'pedestrian village', 'centre ville', 'centre-ville'],
    lat: 46.1187,
    lng: -74.5962,
    celebration: 'Première étoile au firmament! Le village t\'appartient. ⭐',
  },
  {
    id: 'saint-bernard',
    order: 2,
    emoji: '⏰',
    name: 'Place Saint-Bernard',
    shortName: 'Saint-Bernard',
    clue:
      "L'heure tourne, les montagnes veillent. Sur une place où l'on s'arrête pour regarder le ciel et le lac, un chien saint veille sur le temps qui passe…",
    hint: "Une grande horloge, une statue de Saint-Bernard, et une vue sur le lac. Tu y es presque!",
    funFact:
      "La Place Saint-Bernard est le point de rendez-vous classique des amoureux de Tremblant — parfait pour une photo!",
    answers: ['saint-bernard', 'saint bernard', 'place saint-bernard', 'place saint bernard', 'horloge'],
    lat: 46.1195,
    lng: -74.5955,
    celebration: 'Tick-tock — tu es pile à l\'heure pour l\'aventure! ⏰',
  },
  {
    id: 'lac',
    order: 3,
    emoji: '🌊',
    name: 'Lac Tremblant',
    shortName: 'Le Lac',
    clue:
      "Plus bleu qu'un ciel d'été, plus calme qu'un secret d'amoureux. Descends vers l'eau où les canots chuchotent et le sable accueille les pieds nus…",
    hint: "La plage publique et le quai — là où le lac Tremblant brille sous le soleil.",
    funFact:
      "Le lac Tremblant s'étend sur 14 km et son nom vient de la forme de la montagne vue du ciel — comme un homme qui tremble!",
    answers: ['lac', 'lac tremblant', 'plage', 'beach', 'lake', 'quai'],
    lat: 46.1208,
    lng: -74.5940,
    celebration: 'Les vagues de bonheur montent! 🌊',
  },
  {
    id: 'chocomotive',
    order: 4,
    emoji: '🍫',
    name: 'La Chocomotive',
    shortName: 'Chocomotive',
    clue:
      "Un train de chocolat s'est arrêté en gare du plaisir. Là où le cacao sent bon et les vitrines font rêver les gourmands…",
    hint: "Rue des Remparts — une boutique en forme de locomotive remplie de chocolat artisanal.",
    funFact:
      "La Chocomotive est une institution tremblantoise — leur chocolat chaud en hiver, c'est une hug en tasse!",
    answers: ['chocomotive', 'chocolat', 'chocolate', 'locomotive'],
    lat: 46.1182,
    lng: -74.5970,
    celebration: 'Délicieux! Tu mérites tout le chocolat du monde. 🍫',
  },
  {
    id: 'casino',
    order: 5,
    emoji: '🎰',
    name: 'Casino de Mont-Tremblant',
    shortName: 'Casino',
    clue:
      "Où la chance sourit et les lumières dansent au bord de l'eau. Un palais de verre et de miroirs attend les audacieux…",
    hint: "Le bâtiment moderne au bord du lac, avec son architecture distinctive — le seul casino de la région des Laurentides.",
    funFact:
      "Le Casino de Mont-Tremblant offre une vue spectaculaire sur le lac — même sans jouer, la terrasse vaut le détour!",
    answers: ['casino', 'casino de mont-tremblant', 'casino tremblant'],
    lat: 46.1220,
    lng: -74.5920,
    celebration: 'Jackpot! Tu es la plus belle mise de ma vie. 🎰',
  },
  {
    id: 'cabriolet',
    order: 6,
    emoji: '🚡',
    name: 'Le Cabriolet',
    shortName: 'Cabriolet',
    clue:
      "Sans roues mais avec des câbles, il t'élève vers les nuages. Monte là où le village du haut te fait la fête et la vue s'étire à perte de vue…",
    hint: "Le téléphérique ouvert qui relie le village piétonnier au village du sommet — gratuit l'été!",
    funFact:
      "Le Cabriolet offre une vue à 360° sur les Laurentides — idéal pour un selfie de couple au sommet!",
    answers: ['cabriolet', 'telepherique', 'téléphérique', 'gondola', 'sommet', 'lift'],
    lat: 46.1175,
    lng: -74.5985,
    celebration: 'Tu voles haut, mon trésor! 🚡',
  },
  {
    id: 'diable',
    order: 7,
    emoji: '🍺',
    name: 'Microbrasserie La Diable',
    shortName: 'La Diable',
    clue:
      "Un diable sympathique brasse la joie de vivre. Là où la bière coule et les rires résonnent entre poutres de bois et montagnes…",
    hint: "La microbrasserie iconique de Tremblant — cherche le logo du diable rouge sur la rue principale.",
    funFact:
      "La Diable brasse des bières artisanales depuis 1997 — leur terrasse est l'endroit parfait pour trinquer!",
    answers: ['diable', 'la diable', 'microbrasserie', 'brasserie', 'brewery'],
    lat: 46.1190,
    lng: -74.5968,
    celebration: 'Santé à toi, reine de Tremblant! 🍺',
  },
  {
    id: 'final',
    order: 8,
    emoji: '💝',
    name: 'Le Trésor Final',
    shortName: 'Trésor',
    clue:
      "Dernier indice, le plus précieux : retourne là où tout a commencé, là où les couleurs chantent et où je t'attends avec ce que mon cœur a préparé pour toi…",
    hint: "Notre point de rendez-vous secret — tu le connais. Ou reviens à la Place Saint-Bernard au coucher du soleil.",
    funFact:
      "Le plus beau trésor de Tremblant, c'est l'aventure partagée — et tu viens de la vivre à fond!",
    answers: ['treasure', 'tresor', 'trésor', 'amour', 'love', 'surprise', 'joyeux anniversaire', 'anniversaire'],
    lat: 46.1195,
    lng: -74.5955,
    celebration: 'TU L\'AS FAIT! Le trésor est à toi! 💝🎉',
  },
];
