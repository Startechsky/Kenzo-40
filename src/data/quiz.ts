export type QuizQuestion = {
  id: number
  prompt: string
  options: string[]
  answer: string
}

export const celebrantProfile = {
  fullName: 'Solomon Adekunle Adediran',
  alias: 'Kenzo',
  eventDate: '3rd of May, 2026',
  eventMonth: 'May',
  eventYear: '2026',
  venue: 'Hope Crescent',
  area: 'Olomi, Omiyale',
  city: 'Ibadan',
  palette: ['Blue', 'Orange', 'White'],
  favoriteFood: 'Jollof rice',
  favoriteColor: 'Blue',
  hobby: 'Reading',
}

export const quizDatabase: QuizQuestion[] = [
  {
    id: 1,
    prompt: 'What is the celebrant’s full name?',
    options: [
      'Solomon Adekunle Adediran',
      'Solomon Adekunle Adebayo',
      'Samuel Adekunle Adediran',
      'Solomon Adediran Kenzo',
    ],
    answer: 'Solomon Adekunle Adediran',
  },
  {
    id: 2,
    prompt: 'What alias is the celebrant known by on the site?',
    options: ['Kenzo', 'Sade', 'Sollo', 'Kenny'],
    answer: 'Kenzo',
  },
  {
    id: 3,
    prompt: 'On what date is Kenzo’s birthday celebration?',
    options: ['3rd of May, 2026', '13th of May, 2026', '3rd of June, 2026', '30th of May, 2026'],
    answer: '3rd of May, 2026',
  },
  {
    id: 4,
    prompt: 'Which month hosts the celebration?',
    options: ['May', 'April', 'June', 'August'],
    answer: 'May',
  },
  {
    id: 5,
    prompt: 'What year is the celebration taking place?',
    options: ['2026', '2025', '2027', '2028'],
    answer: '2026',
  },
  {
    id: 6,
    prompt: 'Which street is listed as the venue?',
    options: ['Hope Crescent', 'Mercy Avenue', 'Glory Close', 'Victory Road'],
    answer: 'Hope Crescent',
  },
  {
    id: 7,
    prompt: 'Which area is part of the venue address?',
    options: ['Olomi, Omiyale', 'Bodija, Agodi', 'Ring Road, Dugbe', 'Akobo, Ojurin'],
    answer: 'Olomi, Omiyale',
  },
  {
    id: 8,
    prompt: 'Which city is hosting Kenzo’s celebration?',
    options: ['Ibadan', 'Lagos', 'Abeokuta', 'Ilorin'],
    answer: 'Ibadan',
  },
  {
    id: 9,
    prompt: 'Which of these colors is part of Kenzo’s birthday palette?',
    options: ['Blue', 'Purple', 'Black', 'Green'],
    answer: 'Blue',
  },
  {
    id: 10,
    prompt: 'Which warm accent color is part of the palette?',
    options: ['Orange', 'Pink', 'Gold', 'Red'],
    answer: 'Orange',
  },
  {
    id: 11,
    prompt: 'Which neutral color completes the palette?',
    options: ['White', 'Brown', 'Grey', 'Silver'],
    answer: 'White',
  },
  {
    id: 12,
    prompt: 'What is Kenzo’s best color?',
    options: ['Blue', 'Orange', 'White', 'Yellow'],
    answer: 'Blue',
  },
  {
    id: 13,
    prompt: 'What is the celebrant’s best food?',
    options: ['Jollof rice', 'Amala', 'Fried rice', 'Beans and plantain'],
    answer: 'Jollof rice',
  },
  {
    id: 14,
    prompt: 'What hobby is listed for the celebrant?',
    options: ['Reading', 'Swimming', 'Cycling', 'Painting'],
    answer: 'Reading',
  },
  {
    id: 15,
    prompt: 'What is the celebrant’s first name?',
    options: ['Solomon', 'Samuel', 'Sunday', 'Sola'],
    answer: 'Solomon',
  },
  {
    id: 16,
    prompt: 'What is the celebrant’s middle name?',
    options: ['Adekunle', 'Adedayo', 'Adewale', 'Akinwale'],
    answer: 'Adekunle',
  },
  {
    id: 17,
    prompt: 'What is the celebrant’s surname?',
    options: ['Adediran', 'Adeniran', 'Adedayo', 'Adeleke'],
    answer: 'Adediran',
  },
  {
    id: 18,
    prompt: 'How many questions are randomly shown to each player at once?',
    options: ['5', '10', '15', '20'],
    answer: '5',
  },
  {
    id: 19,
    prompt: 'How many questions are available in the full quiz database?',
    options: ['20', '12', '15', '25'],
    answer: '20',
  },
  {
    id: 20,
    prompt: 'How many performance grades are used in the quiz result?',
    options: ['3', '2', '4', '5'],
    answer: '3',
  },
]
