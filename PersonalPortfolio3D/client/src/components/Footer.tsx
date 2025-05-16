export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="text-center text-gray-500 py-6">
      <p>© {currentYear} Ahmed Shawky. All rights reserved.</p>
      <p className="text-sm mt-2">Built with modern web technologies and a passion for coding.</p>
    </footer>
  );
}
