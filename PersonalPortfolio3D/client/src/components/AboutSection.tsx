import Card3D from "@/components/Card3D";

export default function AboutSection() {
  return (
    <Card3D>
      <div className="bg-gray-900 p-6 rounded-2xl h-full">
        <h2 className="text-2xl font-bold mb-4 text-gradient">About Me</h2>
        <p className="text-gray-400 mb-4">
          Hello! I'm Ahmed, a young programmer born in 2008 with a passion for creating digital experiences.
          I started my programming journey at a young age and have been continuously developing my skills.
        </p>
        <p className="text-gray-400">
          I enjoy solving problems through code and am always excited to learn new technologies.
          My goal is to become a full-stack developer and create applications that make an impact.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-sm">Problem Solver</span>
          <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-sm">Quick Learner</span>
          <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-sm">Creative Thinker</span>
        </div>
      </div>
    </Card3D>
  );
}
