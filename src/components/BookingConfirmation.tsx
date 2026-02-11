import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { CheckCircle, Download, Mail, Calendar, MapPin, Ticket } from 'lucide-react';

export function BookingConfirmation() {
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    const bookingData = sessionStorage.getItem('booking');
    if (bookingData) {
      setBooking(JSON.parse(bookingData));
    }
  }, []);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">No booking found</h2>
          <Link to="/" className="text-green-600 hover:underline mt-2 inline-block">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const bookingReference = `FB${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-20 h-20 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Your tickets have been successfully booked. A confirmation email has been sent to{' '}
            <span className="font-semibold">{booking.customerInfo.email}</span>
          </p>
          <div className="inline-block bg-green-50 px-6 py-3 rounded-lg">
            <span className="text-sm text-gray-600">Booking Reference</span>
            <div className="text-2xl font-bold text-green-600">{bookingReference}</div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Match Header */}
          <div className="relative h-48">
            <img
              src={booking.match.image}
              alt="Match"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
              <div className="p-6 w-full">
                <div className="text-center">
                  <div className="text-sm text-white/80 mb-2">{booking.match.league}</div>
                  <div className="flex items-center justify-center gap-4">
                    <h2 className="text-2xl font-bold text-white">{booking.match.homeTeam}</h2>
                    <span className="text-white">vs</span>
                    <h2 className="text-2xl font-bold text-white">{booking.match.awayTeam}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Match Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900">Date & Time</div>
                  <div className="text-gray-600">
                    {new Date(booking.match.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="text-gray-600">{booking.match.time}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <div className="font-semibold text-gray-900">Venue</div>
                  <div className="text-gray-600">{booking.match.stadium}</div>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="border-t pt-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-3">Customer Information</h3>
              <div className="space-y-2 text-gray-600">
                <div>
                  <span className="font-semibold">Name:</span> {booking.customerInfo.name}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {booking.customerInfo.email}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span> {booking.customerInfo.phone}
                </div>
              </div>
            </div>

            {/* Seats */}
            <div className="border-t pt-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Ticket className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-gray-900">Your Seats</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {booking.seats.map((seat: any) => (
                  <div
                    key={seat.id}
                    className="bg-green-50 border-2 border-green-200 rounded-lg p-3 text-center"
                  >
                    <div className="font-bold text-gray-900">{seat.id}</div>
                    <div className="text-sm text-gray-600">£{seat.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-6 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total Paid</span>
                <span className="text-3xl font-bold text-green-600">£{booking.total}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                <Download className="w-5 h-5" />
                Download Tickets
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                <Mail className="w-5 h-5" />
                Email Tickets
              </button>
            </div>

            <Link
              to="/"
              className="mt-4 block text-center text-green-600 hover:underline"
            >
              Book more tickets
            </Link>
          </div>
        </div>

        {/* Important Information */}
        <div className="mt-6 bg-blue-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-3">Important Information</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Please arrive at the stadium at least 30 minutes before kick-off</li>
            <li>• Bring a valid photo ID along with your ticket</li>
            <li>• Your tickets are non-transferable and non-refundable</li>
            <li>• E-tickets will be sent to your email within 24 hours</li>
            <li>• For any queries, contact our support team at support@footballtickethub.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
