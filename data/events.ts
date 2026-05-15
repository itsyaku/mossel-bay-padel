export interface Event {
  id: number
  name: string
  category: string
  date: string
  dateDay: string
  dateMonth: string
  time: string
  price: string
  priceUnit: string
  spotsRemaining: number
  totalSpots: number
  shortDescription: string
  fullDescription: string
  colorScheme: 'dark' | 'teal' | 'mid' | 'deep'
}

export const events: Event[] = [
  {
    id: 1,
    name: 'Summer Open Tournament',
    category: 'Tournament',
    date: 'June 14, 2026',
    dateDay: '14',
    dateMonth: 'JUN',
    time: '8:00 AM – 6:00 PM',
    price: 'R350',
    priceUnit: 'per player',
    spotsRemaining: 12,
    totalSpots: 32,
    shortDescription: 'Mixed doubles, all levels welcome',
    fullDescription:
      'Our flagship summer tournament welcomes players of all levels to compete in mixed doubles across three skill divisions — Beginner, Intermediate, and Open. Expect a full day of elite indoor padel action, professional match officials, and prizes for top finishers in each category. On-site refreshments and a braai lunch are included. Register as a pair or solo and we\'ll match you with a partner.',
    colorScheme: 'dark',
  },
  {
    id: 2,
    name: "Beginner's Clinic",
    category: 'Coaching',
    date: 'June 21, 2026',
    dateDay: '21',
    dateMonth: 'JUN',
    time: '10:00 AM – 12:00 PM',
    price: 'R200',
    priceUnit: 'per person',
    spotsRemaining: 5,
    totalSpots: 12,
    shortDescription: '2-hour coached session for new players',
    fullDescription:
      'Never picked up a padel racket? This clinic is designed for you. Our head coach covers all the fundamentals — grip technique, footwork, court positioning, basic shots (volley, smash, lob), and the rules of the game. Maximum 12 participants for a fully personalised experience. All equipment provided. By the end you\'ll be ready to play your first social match with confidence.',
    colorScheme: 'teal',
  },
  {
    id: 3,
    name: 'Friday Night Social',
    category: 'Social',
    date: 'June 27, 2026',
    dateDay: '27',
    dateMonth: 'JUN',
    time: '6:00 PM – 9:00 PM',
    price: 'R100',
    priceUnit: 'per person',
    spotsRemaining: 22,
    totalSpots: 40,
    shortDescription: 'Casual round-robin, drinks included',
    fullDescription:
      'Wind down the week with our legendary Friday Night Social. The format is a casual round-robin — you\'ll play with and against different partners each round, making it the perfect way to meet the local padel community. Entry includes complimentary drinks at the bar. No pressure, just good padel and great people. All skill levels welcome — this is the most popular event on our calendar.',
    colorScheme: 'mid',
  },
  {
    id: 4,
    name: 'Junior Championship',
    category: 'Youth',
    date: 'July 5, 2026',
    dateDay: '05',
    dateMonth: 'JUL',
    time: '9:00 AM – 4:00 PM',
    price: 'R150',
    priceUnit: 'per player',
    spotsRemaining: 6,
    totalSpots: 24,
    shortDescription: 'U18 singles & doubles',
    fullDescription:
      'Calling all junior stars of the Garden Route! Our Under-18 championship features both singles and doubles categories across two age brackets: U14 and U18. Professional match officials, ranked results submitted to Padel SA, and trophies for category winners. Open to players aged 10–17. A fantastic stepping stone for juniors looking to build competitive experience in a supported environment. Parents welcome courtside.',
    colorScheme: 'deep',
  },
]
