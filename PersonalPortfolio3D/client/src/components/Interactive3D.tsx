import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [countdown, setCountdown] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
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
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2 text-gradient">Project Launch Countdown</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Stay tuned! The SIMPLE e-commerce platform will be launching soon.
        </p>
      </div>
      
      <div className="flex justify-center">
        <div className="w-full max-w-2xl bg-gray-900 rounded-2xl overflow-hidden shadow-xl p-8">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-4xl font-bold text-white mb-1">{countdown.days}</div>
              <div className="text-gray-400 text-sm">Days</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-4xl font-bold text-white mb-1">{countdown.hours}</div>
              <div className="text-gray-400 text-sm">Hours</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-4xl font-bold text-white mb-1">{countdown.minutes}</div>
              <div className="text-gray-400 text-sm">Minutes</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-4xl font-bold text-white mb-1">{countdown.seconds}</div>
              <div className="text-gray-400 text-sm">Seconds</div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <div className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg transition-transform hover:scale-105">
              Coming Soon!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
