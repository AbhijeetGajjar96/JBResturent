import { JayBharatHeader } from '~/components/jay-bharat-header';
import { Footer } from '~/components/footer';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <JayBharatHeader />
      
      <main className="flex-1">
        <div className="bg-gradient-to-b from-[#edc56d] to-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-[#31221b] mb-4">
                Our Legacy
              </h1>
              <p className="text-xl text-[#7e5039] max-w-2xl mx-auto">
                For over three decades, Jay Bharat Restaurant has been serving authentic Indian cuisine, 
                preserving traditional recipes and creating lasting memories for our community.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-3xl font-semibold text-[#31221b] mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Founded in 1985 by the Patel family, Jay Bharat Restaurant began as a small family kitchen 
                    with a dream to share the authentic flavors of India with our community. What started as 
                    a humble establishment has grown into a beloved institution, serving generations of families.
                  </p>
                  <p>
                    Our commitment to using traditional cooking methods, fresh ingredients, and time-honored 
                    recipes has remained unchanged. Each dish tells a story of our heritage, passed down 
                    through generations of skilled chefs and passionate cooks.
                  </p>
                  <p>
                    Today, we continue to honor our legacy while embracing innovation, ensuring that every 
                    guest experiences the true taste of India in every bite.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-semibold text-[#31221b] mb-6">Our Values</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#7e5039] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">🌿</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#31221b] mb-2">Authenticity</h3>
                      <p className="text-gray-600">We stay true to traditional recipes and cooking methods, ensuring every dish reflects the authentic flavors of India.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#7e5039] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">❤️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#31221b] mb-2">Family Values</h3>
                      <p className="text-gray-600">We treat every guest as family, creating a warm and welcoming atmosphere that makes you feel at home.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#7e5039] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">⭐</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#31221b] mb-2">Quality</h3>
                      <p className="text-gray-600">We use only the finest ingredients and maintain the highest standards in food preparation and service.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold text-[#31221b] mb-6 text-center">Our Journey</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-[#edc56d] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🏠</span>
                  </div>
                  <h3 className="font-semibold text-[#31221b] mb-2">1985 - The Beginning</h3>
                  <p className="text-gray-600">Started as a small family restaurant with a vision to share authentic Indian cuisine.</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-[#edc56d] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📈</span>
                  </div>
                  <h3 className="font-semibold text-[#31221b] mb-2">2000 - Expansion</h3>
                  <p className="text-gray-600">Expanded our menu and services, becoming a community favorite for special occasions.</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-[#edc56d] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🌟</span>
                  </div>
                  <h3 className="font-semibold text-[#31221b] mb-2">Today - Legacy</h3>
                  <p className="text-gray-600">Continuing our tradition of excellence while embracing modern dining experiences.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
