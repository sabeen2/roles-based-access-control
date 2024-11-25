export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a]">
      {children}
    </div>
  );
}
