import { JayBharatHeader } from '~/components/jay-bharat-header';
import { Footer } from '~/components/footer';

export default function RestaurantPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <JayBharatHeader />
      
      <main className="flex-1">
        <div className="bg-gradient-to-b from-[#edc56d] to-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-[#31221b] mb-4">
                Jay Bharat Restaurant
              </h1>
              <p className="text-xl text-[#7e5039] max-w-2xl mx-auto">
                Experience authentic Indian cuisine in a warm and welcoming atmosphere. 
                From traditional curries to modern fusion dishes, we bring the flavors of India to your table.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-[#31221b] mb-4">Our Menu</h3>
                <p className="text-gray-600 mb-4">
                  Discover our extensive menu featuring traditional Indian dishes, 
                  regional specialties, and modern interpretations.
                </p>
                <a href="/menu" className="text-[#7e5039] font-medium hover:underline">
                  View Full Menu →
                </a>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-[#31221b] mb-4">Dining Experience</h3>
                <p className="text-gray-600 mb-4">
                  Enjoy our comfortable dining space with authentic Indian decor 
                  and warm hospitality that makes every visit special.
                </p>
                <a href="/reservations" className="text-[#7e5039] font-medium hover:underline">
                  Make Reservation →
                </a>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-[#31221b] mb-4">Location & Hours</h3>
                <p className="text-gray-600 mb-4">
                  Visit us at our convenient location. We're open 7 days a week 
                  to serve you the best Indian cuisine.
                </p>
                <a href="/contact" className="text-[#7e5039] font-medium hover:underline">
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
