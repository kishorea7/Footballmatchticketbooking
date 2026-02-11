import { useParams, Link, useNavigate } from 'react-router';
import { matches } from '../data/matches';
import { Calendar, MapPin, Ticket, ArrowLeft, Users, Clock } from 'lucide-react';

export function MatchDetails() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const match = matches.find(m => m.id === matchId);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to matches</span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Match Hero */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-96">
            <img
              src={match.image}
              alt={`${match.homeTeam} vs ${match.awayTeam}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <span className="text-white font-semibold">{match.league}</span>
                </div>
                <div className="flex items-center justify-center gap-6 mb-4">
                  <h2 className="text-4xl font-bold text-white">{match.homeTeam}</h2>
                  <div className="text-white text-2xl">VS</div>
                  <h2 className="text-4xl font-bold text-white">{match.awayTeam}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Match Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Match Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">Date & Time</div>
                      <div className="text-gray-600">
                        {new Date(match.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="text-gray-600">{match.time}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">Venue</div>
                      <div className="text-gray-600">{match.stadium}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Ticket className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">Availability</div>
                      <div className="text-gray-600">{match.available} tickets remaining</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">Duration</div>
                      <div className="text-gray-600">Approximately 90 minutes + half time</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ticket Pricing</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-green-100">
                    <span className="text-gray-700">Standard Seat</span>
                    <span className="text-2xl font-bold text-green-600">£{match.price}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-green-100">
                    <span className="text-gray-700">Premium Seat</span>
                    <span className="text-2xl font-bold text-green-600">£{match.price + 30}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">VIP Seat</span>
                    <span className="text-2xl font-bold text-green-600">£{match.price + 60}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/match/${match.id}/seats`)}
                  className="mt-6 w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
                >
                  Select Seats
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{Math.floor(Math.random() * 50) + 20} people are viewing this match</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Important Information</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Tickets are non-refundable</li>
                <li>• Please arrive at least 30 minutes before kick-off</li>
                <li>• Valid ID may be required for entry</li>
                <li>• Outside food and beverages are not permitted</li>
                <li>• Tickets will be sent to your email within 24 hours</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
