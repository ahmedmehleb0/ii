import { useEffect, useState } from "react";
import { Project } from "@/types/project";
import simpleLogoSrc from "../assets/simple-logo.jpg";

export default function ProjectsSection() {
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "SIMPLE E-commerce",
      description: "A modern, user-friendly e-commerce platform for online shopping with secure payment processing.",
      image: simpleLogoSrc,
      tags: ["HTML", "CSS", "JavaScript", "E-commerce"],
      link: "#"
    }
  ]);

  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    // Animation effect
    const timer = setTimeout(() => {
      setVisible(true);
    }, 400);
    
    // Set target date to 30 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        // Countdown finished
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }
      
      // Calculate remaining time
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    };
    
    // Initial update
    updateCountdown();
    
    // Update countdown every second
    const intervalId = setInterval(updateCountdown, 1000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
    };
  }, []);

  // 3D rotation effect
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = ((centerY - y) / centerY) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };
  
  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2 text-gradient">My Projects</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Creative web development solutions with modern design
        </p>
      </div>
      
      <div className="flex justify-center">
        <div 
          className={`w-full max-w-xl transition-all duration-700 animate-float ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          style={{
            perspective: '1000px'
          }}
        >
          <div 
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg transition-transform duration-200"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: 'preserve-3d'
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetRotation}
          >
            <div className="p-6 flex flex-col items-center">
              <div className="w-full mb-6 relative" style={{ transform: 'translateZ(30px)' }}>
                <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/40 to-purple-600/40 rounded-xl blur-xl"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-md animate-pulse"></div>
                <div className="rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-5 relative mx-auto shadow-2xl" style={{ maxWidth: "220px" }}>
                  <img 
                    src={simpleLogoSrc}
                    alt="SIMPLE E-commerce Logo" 
                    className="w-full h-auto transform hover:scale-110 transition-transform duration-500 rounded-md"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(120, 0, 255, 0.3))' }}
                  />
                </div>
              </div>
              
              <div className="w-full text-center" style={{ transform: 'translateZ(30px)' }}>
                <h3 className="text-2xl font-bold mb-3">SIMPLE E-commerce</h3>
                <p className="text-gray-400 mb-4">
                  A modern, user-friendly e-commerce platform for online shopping with secure payment processing. 
                  Featuring a clean interface and responsive design.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {projects[0].tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300 hover:bg-gray-700 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Countdown inside project card */}
                <div className="mt-6 mb-4">
                  <h4 className="text-lg font-semibold mb-3 text-gradient">Project Launch Countdown</h4>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-gray-800 p-2 rounded-lg">
                      <div className="text-2xl font-bold text-white">{countdown.days}</div>
                      <div className="text-gray-400 text-xs">Days</div>
                    </div>
                    <div className="bg-gray-800 p-2 rounded-lg">
                      <div className="text-2xl font-bold text-white">{countdown.hours}</div>
                      <div className="text-gray-400 text-xs">Hours</div>
                    </div>
                    <div className="bg-gray-800 p-2 rounded-lg">
                      <div className="text-2xl font-bold text-white">{countdown.minutes}</div>
                      <div className="text-gray-400 text-xs">Minutes</div>
                    </div>
                    <div className="bg-gray-800 p-2 rounded-lg">
                      <div className="text-2xl font-bold text-white">{countdown.seconds}</div>
                      <div className="text-gray-400 text-xs">Seconds</div>
                    </div>
                  </div>
                </div>
                

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
