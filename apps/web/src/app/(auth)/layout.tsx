export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto bg-blue-600 rounded-xl flex items-center justify-center text-xl font-bold text-white mb-3">
              C
            </div>
            <h1 className="text-2xl font-bold text-white">CashiPro</h1>
            <p className="text-sm text-gray-400 mt-1">Secure Cryptocurrency Exchange</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
