import { FaPython, FaHtml5, FaCss3Alt, FaJs } from "react-icons/fa";
import Card3D from "@/components/Card3D";

interface Skill {
  name: string;
  icon: React.ReactNode;
  proficiency: number;
}

export default function SkillsSection() {
  const skills: Skill[] = [
    {
      name: "Python",
      icon: <FaPython className="text-xl text-white" />,
      proficiency: 80
    },
    {
      name: "HTML",
      icon: <FaHtml5 className="text-xl text-white" />,
      proficiency: 85
    },
    {
      name: "CSS",
      icon: <FaCss3Alt className="text-xl text-white" />,
      proficiency: 75
    },
    {
      name: "JavaScript",
      icon: <FaJs className="text-xl text-white" />,
      proficiency: 60
    }
  ];

  return (
    <Card3D>
      <div className="bg-gray-900 p-6 rounded-2xl h-full">
        <h2 className="text-2xl font-bold mb-4 text-gradient">My Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div 
              key={skill.name}
              className="skill-badge flex items-center p-4 bg-gray-800 rounded-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient mr-3">
                {skill.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{skill.name}</h3>
                <div className="mt-1 h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient rounded-full transition-all duration-1000"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card3D>
  );
}
