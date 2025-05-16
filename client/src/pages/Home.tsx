import { Helmet } from "react-helmet";
import Background3D from "@/components/Background3D";
import ProfileHeader from "@/components/ProfileHeader";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Ahmed Shawky | Developer Profile</title>
        <meta name="description" content="Ahmed Shawky's personal developer profile showcasing programming skills and projects in a modern interface." />
        <meta property="og:title" content="Ahmed Shawky | Developer Profile" />
        <meta property="og:description" content="Check out Ahmed Shawky's programming portfolio featuring Python, HTML, CSS, and JavaScript skills." />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="min-h-screen w-full bg-background text-foreground">
        <Background3D />
        
        <main className="container mx-auto px-4 py-12 relative z-10">
          <ProfileHeader />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <AboutSection />
            <SkillsSection />
          </div>
          
          <ProjectsSection />
          <ContactSection />
          <Footer />
        </main>
      </div>
    </>
  );
}
