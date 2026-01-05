
import { ProgramData } from './types.ts';

export const VISIT_PROGRAM: ProgramData = {
  agency: "Wevent Smart Meeting",
  location: "Ain Diab - Casablanca (Seaside Meeting Room)",
  date: "14 Janvier",
  duration: "Full Day (Work Morning + Lunch + Relaxation)",
  items: [
    {
      id: '1',
      time: '09:00 - 09:30',
      title: 'Accueil & Pause Café/Thé',
      description: ['Café, thé, jus + pâtisseries traditionnelles marocaines (30 min)'],
      location: 'Wevent Ain Diab',
      icon: '☕'
    },
    {
      id: '2',
      time: '09:30 - 13:00',
      title: 'Réunion de Travail I',
      description: [
        'Réunion Marketing, Commercial (Salle équipée)',
        'Présentation de THALES INFORMATIQUE',
        'Vision commune & Opportunités avec Factorial',
        'Analyse du Marché marocain & pour nos solutions'
      ],
      location: 'Meeting Room Alpha',
      icon: '📊'
    },
    {
      id: '3',
      time: '13:00 - 15:00',
      title: 'Déjeuner Business',
      description: ['Déjeuner d\'affaires au restaurant ou sur le lieu événementiel'],
      location: 'Seaside Restaurant',
      icon: '🍽️'
    },
    {
      id: '4',
      time: '15:00 - 16:30',
      title: 'Réunion de Travail II',
      description: [
        'Réunion avec les consultants (Salle équipée)',
        'Présentation de l\'équipe consulting & rôles',
        'Intégration technique & fonctionnelle Factorial',
        'Méthodologie de déploiement'
      ],
      location: 'Meeting Room Beta',
      icon: '💻'
    },
    {
      id: '5',
      time: '16:30 - 18:30',
      title: 'Activité Team Building',
      description: [
        'Balade détente en bord de mer',
        'Marche guidée le long de la côte',
        'Jeux collaboratifs soft en plein air',
        'Session stretching / relaxation face à la mer',
        'Challenge d\'équipe léger (mini-jeux)'
      ],
      location: 'Casablanca Coastline',
      icon: '🌊'
    }
  ]
};
