export const CUISINES = [
  'American',
  'Japanese',
  'Italian',
  'Farm-to-table',
  'Sushi',
  'Pizza'
] as const

export const PRICE_RANGES = ['$', '$$', '$$$', '$$$$'] as const

export const RATING_OPTIONS = [
  { value: '4', label: '4+ Stars' },
  { value: '3', label: '3+ Stars' },
  { value: '2', label: '2+ Stars' }
] as const