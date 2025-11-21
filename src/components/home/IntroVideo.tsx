export default function IntroVideo() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">KTDI 소개 영상</h2>
          <p className="text-lg text-gray-600">대한재능개발원의 비전과 가치를 확인하세요</p>
        </div>
        <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-black">
          {/* Placeholder for video - using a static image or a dummy video for now */}
          <div className="absolute inset-0 flex items-center justify-center text-white">
             <p>Video Placeholder (Upload your video to public/video.mp4)</p>
             {/* 
             <video controls className="w-full h-full object-cover">
               <source src="/video.mp4" type="video/mp4" />
               Your browser does not support the video tag.
             </video>
             */}
          </div>
          {/* Using an iframe for demo purposes if no local video */}
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=ad" 
            title="KTDI Intro"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
