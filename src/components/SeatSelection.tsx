import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { matches } from '../data/matches';
import { Seat } from '../types/booking';
import { ArrowLeft, Info } from 'lucide-react';

export function SeatSelection() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const match = matches.find(m => m.id === matchId);

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Match not found</h2>
          <Link to="/" className="text-green-600 hover:underline mt-2 inline-block">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  // Generate seats for the stadium
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const sections = ['A', 'B', 'C', 'D', 'E'];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    
    sections.forEach((section) => {
      rows.forEach((row) => {
        const seatsPerRow = 12;
        for (let i = 1; i <= seatsPerRow; i++) {
          const seatId = `${section}-${row}-${i}`;
          let price = match.price;
          let status: 'available' | 'booked' = 'available';

          // Premium sections
          if (section === 'C' || section === 'D') {
            price = match.price + 30;
          }
          // VIP sections (first rows)
          if (row === 'A' || row === 'B') {
            price = match.price + 60;
          }

          // Randomly book some seats
          if (Math.random() > 0.7) {
            status = 'booked';
          }

          seats.push({
            id: seatId,
            row,
            number: i,
            section,
            price,
            status: selectedSeats.find(s => s.id === seatId) ? 'selected' : status
          });
        }
      });
    });

    return seats;
  };

  const [seats] = useState<Seat[]>(generateSeats());

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'booked') return;

    const isSelected = selectedSeats.find(s => s.id === seat.id);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, { ...seat, status: 'selected' }]);
    }
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert('Please fill in all customer information');
      return;
    }

    // Store booking info in sessionStorage
    sessionStorage.setItem('booking', JSON.stringify({
      match,
      seats: selectedSeats,
      customerInfo,
      total: totalPrice
    }));

    navigate('/confirmation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to={`/match/${matchId}`} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to match details</span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Select Your Seats</h1>
          <p className="text-gray-600">{match.homeTeam} vs {match.awayTeam}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Stadium Pitch */}
              <div className="mb-6">
                <div className="bg-green-600 text-white text-center py-3 rounded-t-lg font-semibold">
                  PITCH
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-8">
                {['A', 'B', 'C', 'D', 'E'].map((section) => (
                  <div key={section}>
                    <div className="font-bold text-gray-700 mb-2">Section {section}</div>
                    <div className="space-y-1">
                      {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((row) => (
                        <div key={`${section}-${row}`} className="flex items-center gap-1">
                          <span className="text-xs font-semibold text-gray-500 w-6">{row}</span>
                          <div className="flex gap-1">
                            {seats
                              .filter(s => s.section === section && s.row === row)
                              .map((seat) => {
                                const isSelected = selectedSeats.find(s => s.id === seat.id);
                                return (
                                  <button
                                    key={seat.id}
                                    onClick={() => handleSeatClick(seat)}
                                    disabled={seat.status === 'booked'}
                                    className={`w-7 h-7 rounded text-xs font-semibold transition-all ${
                                      isSelected
                                        ? 'bg-green-600 text-white scale-110'
                                        : seat.status === 'booked'
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : seat.price > match.price + 30
                                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                        : seat.price > match.price
                                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                    title={`${seat.id} - £${seat.price}`}
                                  >
                                    {seat.number}
                                  </button>
                                );
                              })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-100 rounded"></div>
                    <span>Standard (£{match.price})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded"></div>
                    <span>Premium (£{match.price + 30})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-amber-100 rounded"></div>
                    <span>VIP (£{match.price + 60})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-600 rounded"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    <span>Booked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary & Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>

              {/* Selected Seats */}
              <div className="mb-4">
                <div className="font-semibold text-gray-700 mb-2">Selected Seats:</div>
                {selectedSeats.length === 0 ? (
                  <p className="text-gray-500 text-sm">No seats selected</p>
                ) : (
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {selectedSeats.map(seat => (
                      <div key={seat.id} className="flex justify-between text-sm">
                        <span className="text-gray-700">{seat.id}</span>
                        <span className="font-semibold">£{seat.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total:</span>
                  <span className="text-2xl font-bold text-green-600">£{totalPrice}</span>
                </div>
              </div>

              {/* Customer Information Form */}
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={selectedSeats.length === 0}
                >
                  Proceed to Payment
                </button>
              </form>

              <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Your seats will be held for 10 minutes while you complete your booking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
