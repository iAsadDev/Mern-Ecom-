import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const backgrounds = [
    "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80&fm=webp",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80&fm=webp",
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80&fm=webp",
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80&fm=webp"
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState([]);
  const [imagesFailed, setImagesFailed] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      const promises = backgrounds.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(src);
          img.onerror = () => resolve(null);
        });
      });

      const loaded = await Promise.all(promises);
      const successfulLoads = loaded.filter(Boolean);
      
      if (successfulLoads.length === 0) {
        setImagesFailed(true);
      } else {
        setLoadedImages(successfulLoads);
      }
    };

    loadImages();
  }, []);

  const rotateBackground = useCallback(() => {
    setCurrentBgIndex(prev => (prev + 1) % backgrounds.length);
  }, [backgrounds.length]);

  useEffect(() => {
    if (loadedImages.length === 0) return;
    
    const interval = setInterval(rotateBackground, 6000);
    return () => clearInterval(interval);
  }, [loadedImages.length, rotateBackground]);

  if (loadedImages.length === 0 && !imagesFailed) {
    return <div className="h-screen w-full bg-gray-100" />;
  }

  const bgStyle = imagesFailed 
    ? { backgroundColor: 'white' }
    : { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${loadedImages[currentBgIndex]})` };

  const textColorClass = imagesFailed ? 'text-gray-800' : 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400';
  const subtitleTextClass = imagesFailed ? 'text-gray-600' : 'text-amber-50';
  const dividerClass = imagesFailed ? 'bg-gray-400' : 'bg-amber-300';
  const italicTextClass = imagesFailed ? 'text-gray-500' : 'text-amber-100/90';
  const buttonClass = imagesFailed 
    ? 'bg-gray-800 hover:bg-gray-700 text-white shadow-gray-900/30' 
    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-amber-50 shadow-amber-900/30';

  return (
    <div 
      className="relative h-screen w-full flex items-center justify-center text-center bg-cover bg-center transition-all duration-1000 ease-in-out overflow-hidden"
      style={bgStyle}
    >
      {!imagesFailed && <div className="absolute inset-0 bg-black/20"></div>}
      
      <div className="relative z-10 max-w-4xl px-8">
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${textColorClass} font-serif tracking-wide`}>
          <span className={`block text-4xl md:text-5xl mb-2 font-light italic ${imagesFailed ? 'text-gray-700' : 'text-amber-100'}`}>
            {imagesFailed ? 'Welcome To' : '𝓦𝓮𝓵𝓬𝓸𝓶𝓮 𝓣𝓸'}
          </span>
          {imagesFailed ? 'Premium Kitchen' : '𝓟𝓻𝓮𝓶𝓲𝓾𝓼 𝓚𝓲𝓽𝓬h𝓮𝓷'}
        </h1>
        
        <div className="relative mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`w-8 h-px ${dividerClass}`}></div>
            <p className={`text-xl ${subtitleTextClass} font-medium tracking-widest uppercase`}>
              Masterfully Crafted Culinary Tools
            </p>
            <div className={`w-8 h-px ${dividerClass}`}></div>
          </div>
          <p className={`mt-4 text-lg ${italicTextClass} italic`}>
            Precision engineered for culinary excellence
          </p>
        </div>

        <Link 
          to="/shop" 
          className={`inline-flex items-center px-10 py-4 ${buttonClass} font-medium rounded-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group`}
        >
          <span>DISCOVER NOW</span>
          <svg 
            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Hero;