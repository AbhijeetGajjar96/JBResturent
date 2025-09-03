import { JayBharatHeader } from '~/components/jay-bharat-header';
import { Footer } from '~/components/footer';

export default function CateringPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <JayBharatHeader />
      
      <main className="flex-1">
        <div className="bg-gradient-to-b from-[#edc56d] to-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-[#31221b] mb-4">
                Catering Services
              </h1>
              <p className="text-xl text-[#7e5039] max-w-2xl mx-auto">
                Make your special events memorable with our authentic Indian catering services. 
                From intimate gatherings to large celebrations, we bring the taste of India to your venue.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-3xl font-semibold text-[#31221b] mb-6">Wedding Catering</h3>
                <p className="text-gray-600 mb-6">
                  Create unforgettable memories with our comprehensive wedding catering packages. 
                  We specialize in traditional Indian wedding feasts with authentic flavors and presentation.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Traditional Indian wedding menu</li>
                  <li>• Live cooking stations</li>
                  <li>• Professional serving staff</li>
                  <li>• Customizable packages</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-3xl font-semibold text-[#31221b] mb-6">Corporate Events</h3>
                <p className="text-gray-600 mb-6">
                  Impress your clients and colleagues with our corporate catering solutions. 
                  Perfect for business meetings, conferences, and office celebrations.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Business lunch packages</li>
                  <li>• Conference catering</li>
                  <li>• Office party menus</li>
                  <li>• Flexible delivery options</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-3xl font-semibold text-[#31221b] mb-6 text-center">
                Get Your Quote Today
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-[#edc56d] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📞</span>
                  </div>
                  <h4 className="font-semibold text-[#31221b] mb-2">Call Us</h4>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
                <div className="text-center">
                  <div className="bg-[#edc56d] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📧</span>
                  </div>
                  <h4 className="font-semibold text-[#31221b] mb-2">Email Us</h4>
                  <p className="text-gray-600">catering@jaybharat.com</p>
                </div>
                <div className="text-center">
                  <div className="bg-[#edc56d] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h4 className="font-semibold text-[#31221b] mb-2">WhatsApp</h4>
                  <p className="text-gray-600">Quick consultation</p>
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
