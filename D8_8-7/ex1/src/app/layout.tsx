import type { Metadata } from "next";
import "./globals.css";

// Điều chỉnh lại đường dẫn import cho khớp với cấu trúc thư mục src của bạn
import ReduxProvider from "../redux/ReduxProvider"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Student Management System",
  description: "Next.js + Tailwind CSS + Redux Toolkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* flex, flex-col, min-h-screen giúp thay thế min-vh-100 của Bootstrap cũ, đẩy Footer xuống đáy */}
      <body className="flex flex-col min-h-screen bg-gray-50">
        
        {/* ReduxProvider bọc toàn bộ ứng dụng, biến không gian bên trong thành Client an toàn cho Redux */}
        <ReduxProvider>
          <Navbar />
          
          {/* Vùng không gian này tự động thay đổi dựa theo thư mục Route bạn truy cập */}
          <main className="flex-1">
            {children} 
          </main>
          
          <Footer />
        </ReduxProvider>

      </body>
    </html>
  );
}