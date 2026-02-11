export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  stadium: string;
  league: string;
  price: number;
  available: number;
  image: string;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  section: string;
  price: number;
  status: 'available' | 'selected' | 'booked';
}

export interface Booking {
  matchId: string;
  seats: Seat[];
  customerName: string;
  email: string;
  phone: string;
  total: number;
}
