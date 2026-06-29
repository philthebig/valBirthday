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
  /** Stroller / baby-friendly tip */
  babyTip?: string;
}

export const huntStops: HuntStop[] = [
  {
    id: 'breakfast',
    order: 1,
    emoji: '🥐',
    name: 'Petit-déjeuner — Holiday Inn',
    shortName: 'Déjeuner',
    clue:
      "Avant l'aventure, on se réchauffe le cœur : là où notre famille commence la journée, entre croissants, café et le sourire d'Émile… C'est ici que tout commence.",
    hint: "Le restaurant du Holiday Inn Express — notre table de ce matin, juste à l'hôtel.",
    funFact:
      "Le Holiday Inn Express de Tremblant est au cœur du village piétonnier — parfait pour tout faire à pied avec bébé!",
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
    babyTip: 'Installe-toi confortablement — pas de rush. Émile peut prendre son temps.',
  },
  {
    id: 'village',
    order: 2,
    emoji: '🏘️',
    name: 'Le Village Piétonnier',
    shortName: 'Village',
    clue:
      "Après le café, direction les couleurs! Là où les rues sont sans voitures, les maisons ressemblent à des bonbons et la poussette roule tout doucement…",
    hint: "Sors de l'hôtel et explore les rues piétonnes colorées — tout est accessible à pied.",
    funFact:
      "Le village piétonnier s'inspire des stations alpines européennes — un petit bout d'Europe au Québec!",
    answers: ['village', 'village piétonnier', 'pedestrian village', 'centre ville', 'centre-ville', 'kandahar'],
    lat: 46.1135,
    lng: -74.5872,
    celebration: 'Émile va adorer toutes ces couleurs! Première étoile débloquée. ⭐',
    babyTip: 'Tout le village est piétonnier — idéal pour la poussette. Pause terrasse si besoin.',
  },
  {
    id: 'saint-bernard',
    order: 3,
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
    babyTip: 'Bancs partout pour une pause si Émile a besoin — pas obligé de tout faire d\'un coup.',
  },
  {
    id: 'chocomotive',
    order: 4,
    emoji: '🍫',
    name: 'La Chocomotive',
    shortName: 'Chocolat',
    clue:
      "Une locomotive de chocolat s'est arrêtée en gare du bonheur. L'odeur du cacao guide les gourmands — grands et petits…",
    hint: "Rue des Remparts — la boutique en forme de train, remplie de chocolat artisanal.",
    funFact:
      "La Chocomotive est une institution — leur chocolat chaud est une câline en tasse, surtout en famille!",
    answers: ['chocomotive', 'chocolat', 'chocolate', 'locomotive'],
    lat: 46.1148,
    lng: -74.5878,
    celebration: 'Un petit chocolat pour la super maman? Tu l\'as mérité! 🍫',
    babyTip: 'Arrêt gourmand facultatif — même regarder la vitrine depuis la poussette compte!',
  },
  {
    id: 'lac',
    order: 5,
    emoji: '🌊',
    name: 'Le Lac Tremblant',
    shortName: 'Le Lac',
    clue:
      "Descends doucement vers l'eau bleue. Là où le lac scintille, les canards nagent et le vent sent bon les vacances en famille…",
    hint: "La plage et le quai — quelques minutes à pied du village, chemin plat et accessible.",
    funFact:
      "Le lac Tremblant s'étend sur 14 km — son nom vient de la silhouette de la montagne vue du ciel.",
    answers: ['lac', 'lac tremblant', 'plage', 'beach', 'lake', 'quai'],
    lat: 46.1155,
    lng: -74.5855,
    celebration: 'L\'air du lac, en famille — rien de mieux. 🌊',
    babyTip: 'Chemin accessible en poussette. Si Émile est fatigué, on peut sauter et revenir plus tard!',
  },
  {
    id: 'amano',
    order: 6,
    emoji: '🍝',
    name: 'A Mano Trattoria',
    shortName: 'A Mano',
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
