export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">CashiPro</h1>
      <div className="space-x-4">
        <a href="/" className="hover:text-yellow-400">Home</a>
        <a href="/trade" className="hover:text-yellow-400">Trade</a>
        <a href="/markets" className="hover:text-yellow-400">Markets</a>
        <a href="/login" className="hover:text-yellow-400">Login</a>
      </div>
    </nav>
  );
}
