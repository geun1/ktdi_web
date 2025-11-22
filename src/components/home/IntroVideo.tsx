export default function IntroVideo() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">KTDI 소개 영상</h2>
          <p className="text-lg text-gray-600">대한재능개발원의 비전과 가치를 확인하세요</p>
        </div>
        <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-black">
          {/* Local video player */}
          <video 
            controls 
            className="w-full h-full object-cover"
            poster="/images/video-poster.jpg"
          >
            <source src="/videos/intro.mp4" type="video/mp4" />
            <source src="/videos/intro.webm" type="video/webm" />
            귀하의 브라우저는 비디오 태그를 지원하지 않습니다.
          </video>
        </div>
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>영상을 업로드하려면: <code className="bg-gray-200 px-2 py-1 rounded">public/videos/intro.mp4</code> 파일을 추가하세요</p>
        </div>
      </div>
    </section>
  );
}
