import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-0 font-semibold">
          &copy; {new Date().getFullYear()} Student Management System.
        </p>
        <small className="text-gray-400">
          Thiết kế tối ưu hóa trải nghiệm người dùng.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
