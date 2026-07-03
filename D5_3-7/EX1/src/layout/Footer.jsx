import React from 'react';

const Footer = () => {
  return (
    // mt-auto (margin-top: auto) là class cực kỳ quan trọng của Bootstrap 
    // để đẩy footer xuống đáy khi kết hợp với flexbox của thẻ cha
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container text-center">
        <p className="mb-0 fw-semibold">
          &copy; {new Date().getFullYear()} Student Management System.
        </p>
        <small className="text-muted">
          Thiết kế tối ưu hóa trải nghiệm người dùng.
        </small>
      </div>
    </footer>
  );
};

export default Footer;