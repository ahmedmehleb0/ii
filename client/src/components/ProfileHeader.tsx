import { useEffect, useState } from "react";
import SocialLinks from "@/components/SocialLinks";
import profilePhoto from "../assets/profile-photo.jpg";

export default function ProfileHeader() {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <header className="flex flex-col items-center justify-center mb-12">
      <div className={`relative mb-6 transition-all duration-1000 ease-out ${animationComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="absolute -inset-1 bg-gradient rounded-full blur-md opacity-80"></div>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-60 animate-pulse"></div>
        <div className="relative rounded-full overflow-hidden h-40 w-40 sm:h-56 sm:w-56 border-4 border-white/20 shadow-xl" style={{ transform: 'translateZ(20px)' }}>
          <img 
            src={profilePhoto}
            alt="Ahmed Shawky" 
            className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
          />
        </div>
      </div>
      
      <h1 className={`text-4xl md:text-6xl font-bold mb-3 text-gradient transition-all duration-700 delay-300 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ textShadow: '0 0 15px rgba(120, 0, 255, 0.3)' }}>
        Ahmed Shawky
      </h1>
      
      <div className={`flex items-center justify-center space-x-2 mb-4 transition-all duration-700 delay-500 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <span className="px-3 py-1 bg-gradient rounded-full text-white text-sm font-medium">Developer</span>
        <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-sm font-medium">Born 2008</span>
      </div>
      
      <p className={`text-center text-gray-400 max-w-xl mb-6 transition-all duration-700 delay-700 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Passionate programmer with a curiosity for technology and web development. Always learning and exploring new coding challenges.
      </p>
      
      <div className={`transition-all duration-700 delay-900 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <SocialLinks />
      </div>
    </header>
  );
}
