export interface HuntStop {
  id: string;
  order: number;
  emoji: string;
  name: string;
  shortName: string;
  clue: string;
  hint: string;
  funFact: string;
  answers: string[];
  lat: number;
  lng: number;
  celebration: string;
  babyTip?: string;
  scheduledTime?: string;
  flexibleTime?: string;
}

export const huntStops: HuntStop[] = [
  {
    id: 'breakfast',
    order: 1,
    emoji: '🥐',
    name: 'Petit-déjeuner — Holiday Inn',
    shortName: 'Déjeuner',
    scheduledTime: 'Matin',
    clue:
      "Avant l'aventure, on se réchauffe le cœur : là où notre famille commence la journée, entre croissants, café et le sourire d'Émile… C'est ici que tout commence.",
    hint: "Le restaurant du Holiday Inn Express — notre table de ce matin, juste à l'hôtel.",
    funFact:
      "Le Holiday Inn Express de Tremblant est au cœur du village piétonnier — à deux pas du Studio Créatif!",
    answers: [
      'holiday inn',
      'hotel',
      'hôtel',
      'dejeuner',
      'déjeuner',
      'petit dejeuner',
      'petit-déjeuner',
      'breakfast',
      'inn',
    ],
    lat: 46.1128,
    lng: -74.5868,
    celebration: 'Bonne journée, belle maman! Le petit-déjeuner en famille, c\'est déjà un trésor. 🥐',
    babyTip: 'Installe-toi confortablement — pas de rush. Émile peut prendre son temps avant le studio à 10h.',
  },
  {
    id: 'studio-creatif',
    order: 2,
    emoji: '🎨',
    name: 'Studio Créatif — Peinture sur céramique',
    shortName: 'Poterie',
    scheduledTime: '10h00',
    clue:
      "À dix heures pile, les artistes se réveillent! Là où l'on choisit une pièce en céramique, on la peint en famille, et on repart avec un souvenir fait de nos mains…",
    hint: "151 Chemin du Curé-Deslauriers — le studio de peinture sur céramique, à quelques pas de l'hôtel. Ouvert à 10h!",
    funFact:
      "Le Studio Créatif existe depuis 1999 — figurines, bols, souvenirs… parfait pour créer un keepsake d'anniversaire avec Émile!",
    answers: [
      'studio creatif',
      'studio créatif',
      'creatif',
      'créatif',
      'ceramique',
      'céramique',
      'poterie',
      'pottery',
      'peinture',
      'painting',
      'studio',
    ],
    lat: 46.1130,
    lng: -74.5866,
    celebration: 'Picasso en famille! Votre création sera prête demain — un souvenir pour la vie. 🎨',
    babyTip: 'Activité calme et climatisée — idéal avec bébé. Choisis une pièce simple, prenez votre temps.',
  },
  {
    id: 'village',
    order: 3,
    emoji: '🏘️',
    name: 'Le Village Piétonnier',
    shortName: 'Village',
    clue:
      "Après les pinceaux, direction les couleurs! Là où les rues sont sans voitures, les maisons ressemblent à des bonbons et la poussette roule tout doucement…",
    hint: "Explore les rues piétonnes colorées autour du studio et de l'hôtel.",
    funFact:
      "Le village piétonnier s'inspire des stations alpines européennes — un petit bout d'Europe au Québec!",
    answers: ['village', 'village piétonnier', 'pedestrian village', 'centre ville', 'centre-ville', 'kandahar'],
    lat: 46.1135,
    lng: -74.5872,
    celebration: 'Émile va adorer toutes ces couleurs! ⭐',
    babyTip: 'Tout le village est piétonnier — idéal pour la poussette. Pause terrasse si besoin.',
  },
  {
    id: 'chalets-drive',
    order: 4,
    emoji: '🚗',
    name: 'Tour des grands chalets',
    shortName: 'Chalets',
    flexibleTime: "N'importe quand dans la journée",
    clue:
      "Monte en voiture avec nous : là où les chalets sont immenses, les toits pointent vers le ciel et les Laurentides défilent par la fenêtre… Une petite ride pour admirer les plus belles maisons des environs.",
    hint: "Petit tour en auto — Chemin Ryan, Montée Ryan, ou vers La Conception pour voir les grands chalets de luxe. Émile peut faire la sieste!",
    funFact:
      "Les Laurentides comptent plus de 8 000 lacs et des milliers de chalets — certains dans le secteur Bel Air et La Conception sont spectaculaires!",
    answers: [
      'chalets',
      'chalet',
      'cottages',
      'cottage',
      'voiture',
      'auto',
      'car',
      'drive',
      'tour',
      'promenade',
      'ryan',
      'conception',
    ],
    lat: 46.1480,
    lng: -74.6100,
    celebration: 'Quelle vue! Les plus beaux chalets n\'ont rien sur notre petite famille. 🏡',
    babyTip: 'Parfait pendant la sieste d\'Émile en voiture. Pas besoin de sortir — admirez depuis l\'auto!',
  },
  {
    id: 'saint-bernard',
    order: 5,
    emoji: '⏰',
    name: 'Place Saint-Bernard',
    shortName: 'St-Bernard',
    clue:
      "Une place pour faire une pause, regarder le lac et prendre une photo de famille. Un chien saint veille sur une grande horloge… et sur nous trois.",
    hint: "La place centrale avec l'horloge et la statue de Saint-Bernard — vue magnifique sur le lac.",
    funFact:
      "La Place Saint-Bernard est LE spot photo de Tremblant — parfait pour un selfie famille!",
    answers: ['saint-bernard', 'saint bernard', 'place saint-bernard', 'place saint bernard', 'horloge'],
    lat: 46.1142,
    lng: -74.5865,
    celebration: 'Clic! Un souvenir en famille sur la plus belle place. 📸',
    babyTip: 'Bancs partout pour une pause si Émile a besoin.',
  },
  {
    id: 'chocomotive',
    order: 6,
    emoji: '🍫',
    name: 'La Chocomotive',
    shortName: 'Chocolat',
    clue:
      "Une locomotive de chocolat s'est arrêtée en gare du bonheur. L'odeur du cacao guide les gourmands — grands et petits…",
    hint: "Rue des Remparts — la boutique en forme de train, remplie de chocolat artisanal.",
    funFact:
      "La Chocomotive est une institution — leur chocolat chaud est une câline en tasse!",
    answers: ['chocomotive', 'chocolat', 'chocolate', 'locomotive'],
    lat: 46.1148,
    lng: -74.5878,
    celebration: 'Un petit chocolat pour la super maman? Tu l\'as mérité! 🍫',
    babyTip: 'Arrêt gourmand facultatif — même une vitrine depuis la poussette compte!',
  },
  {
    id: 'amano',
    order: 7,
    emoji: '🍝',
    name: 'A Mano Trattoria',
    shortName: 'A Mano',
    scheduledTime: 'Soir',
    clue:
      "Le trésor final se mange ce soir! Là où les pâtes sont fraîches, l'Italie est à Tremblant, et une table nous attend pour fêter la plus belle des mamans…",
    hint: "116 Chemin de Kandahar — notre restaurant italien pour ce soir. Menu enfants pour Émile!",
    funFact:
      "A Mano prépare ses pâtes fraîches sur place et a un menu pour les enfants — parfait pour une soirée anniversaire en famille!",
    answers: ['a mano', 'amano', 'mano', 'italien', 'italian', 'trattoria', 'pates', 'pâtes', 'diner', 'dîner'],
    lat: 46.1132,
    lng: -74.5870,
    celebration: 'TU L\'AS FAIT! Joyeux 32e anniversaire, mon amour. Ce soir, c\'est pour toi! 💝🎉',
    babyTip: 'Ce soir seulement — habille-toi à l\'aise, Émile aussi. On profite, sans stress.',
  },
];
