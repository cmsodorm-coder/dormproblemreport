import "./globals.css";

export const metadata = {
  title: "ระบบติดตามสถานะการแจ้งซ่อม - หอพักนักศึกษา",
  description: "ตรวจสอบสถานะการแจ้งซ่อมบำรุงและแก้ไขปัญหาในหอพัก",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-100 min-h-screen text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
