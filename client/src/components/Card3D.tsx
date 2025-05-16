interface Card3DProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card3D({ children, className = "" }: Card3DProps) {
  return (
    <div className={`hover:scale-105 transition-transform duration-300 rounded-2xl ${className}`}>
      <div className="h-full">{children}</div>
    </div>
  );
}
