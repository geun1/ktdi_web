import HeroSlider from "@/components/home/HeroSlider";
import IntroVideo from "@/components/home/IntroVideo";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <HeroSlider />
      <IntroVideo />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-8">KTDI News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* News placeholders */}
             {[1, 2, 3].map((i) => (
               <div key={i} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                 <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
                 <h3 className="text-xl font-semibold mb-2">공지사항 제목 {i}</h3>
                 <p className="text-gray-600">KTDI의 새로운 소식을 전해드립니다.</p>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
