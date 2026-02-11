import { Link } from 'react-router';
import { matches } from '../data/matches';
import { Calendar, MapPin, Ticket } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Ticket className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Football Ticket Hub</h1>
          </div>
          <p className="mt-2 text-gray-600">Book your seats for the biggest matches</p>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative h-80 rounded-2xl overflow-hidden mb-12">
          <img
            src="https://images.unsplash.com/photo-1549923015-badf41b04831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBjcm93ZHxlbnwxfHx8fDE3NzA4MTgyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Stadium"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
            <div className="px-12">
              <h2 className="text-5xl font-bold text-white mb-4">
                Experience Live Football
              </h2>
              <p className="text-xl text-white/90 max-w-2xl">
                Secure your tickets for the most exciting matches of the season
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Matches */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <Link
                key={match.id}
                to={`/match/${match.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={match.image}
                    alt={`${match.homeTeam} vs ${match.awayTeam}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-700">{match.league}</span>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-3">
                      <span className="font-bold text-lg text-gray-900">{match.homeTeam}</span>
                      <span className="text-gray-400">vs</span>
                      <span className="font-bold text-lg text-gray-900">{match.awayTeam}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(match.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })} at {match.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{match.stadium}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4" />
                      <span>{match.available} tickets available</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">£{match.price}</span>
                    <span className="text-sm text-gray-500">per ticket</span>
                  </div>

                  <button className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
