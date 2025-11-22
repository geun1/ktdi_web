import HeroSlider from "@/components/home/HeroSlider";
import IntroVideo from "@/components/home/IntroVideo";
import Image from "next/image";
import Link from "next/link";

const newsItems = [
  {
    id: 1,
    title: "AI 실용 심화과정 성공적 개최",
    description: "AI 기술을 실무에 바로 적용할 수 있는 심화 교육 프로그램이 성공적으로 진행되었습니다.",
    image: "/images/hero/main-1.avif",
    link: "/page/ai-advanced",
  },
  {
    id: 2,
    title: "체스심판 자격연수 안내",
    description: "체스 대회의 공정한 진행을 위한 전문 심판 양성 과정이 개설되었습니다.",
    image: "/images/hero/main-3.avif",
    link: "/page/chess-referee",
  },
  {
    id: 3,
    title: "바둑지도사 과정 모집",
    description: "체계적인 바둑 이론과 교수법을 갖춘 우수한 바둑지도사를 양성합니다.",
    image: "/images/hero/main-4.avif",
    link: "/page/go-instructor",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <HeroSlider />
      <IntroVideo />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-8">KTDI News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <Link 
                key={item.id} 
                href={item.link}
                className="bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-left">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
