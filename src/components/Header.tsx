
import { useState } from 'react';
import Logo from './header/Logo';
import Navigation from './header/Navigation';
import AuthSection from './header/AuthSection';
import MobileMenu from './header/MobileMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Kiểm tra xem có đang đăng nhập không dựa trên localStorage hoặc sessionStorage
  const isLoggedIn = localStorage.getItem('isManagerLoggedIn') === 'true';

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Navigation />
          </nav>

          {/* Auth Buttons / User Info */}
          <div className="hidden md:flex items-center space-x-4">
            <AuthSection isLoggedIn={isLoggedIn} />
          </div>

          {/* Mobile Menu */}
          <MobileMenu 
            isMenuOpen={isMenuOpen}
            onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
