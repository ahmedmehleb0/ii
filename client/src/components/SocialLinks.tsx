import { FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa";

export default function SocialLinks() {
  const socialLinks = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-xl" />,
      url: "https://wa.me/201011181495",
      eventName: "openWhatsApp"
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-xl" />,
      url: "https://instagram.com/ahmed.mehleb",
      eventName: "openInstagram"
    },
    {
      name: "TikTok",
      icon: <FaTiktok className="text-xl" />,
      url: "https://tiktok.com/@ahmed.mehleb",
      eventName: "openTikTok"
    }
  ];
  
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          className="social-icon flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300"
          aria-label={`Visit Ahmed's ${link.name}`}
          target="_blank"
          rel="noopener noreferrer"
          data-event={`click:${link.eventName}`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
