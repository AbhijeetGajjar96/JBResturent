import { HeaderSection } from '@/vibes/soul/sections/header-section';
import { Footer } from '@/vibes/soul/sections/footer';

export default function HeaderDemoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section - Will use default navigation from layout */}
      <HeaderSection
        navigation={{
          accountHref: '/account',
          cartHref: '/cart',
          searchHref: '/search',
        }}
      />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">Header & Footer Demo</h1>
          <p className="text-center text-gray-600">This page demonstrates the header and footer structure</p>
        </div>
      </main>

      {/* Footer Section - Will use default footer from layout */}
      <Footer />
    </div>
  );
}
