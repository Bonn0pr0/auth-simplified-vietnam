
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X, User, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Kiểm tra xem có đang ở trang dashboard không để hiển thị thông tin manager
  const isLoggedIn = location.pathname === '/dashboard';

  const handleLogout = () => {
    toast({
      title: "Đăng xuất thành công!",
      description: "Hẹn gặp lại bạn.",
    });
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-xl font-bold text-gray-900">FertilityCare</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isLoggedIn && (
              <Link to="/dashboard" className="text-gray-600 hover:text-pink-500 transition-colors">
                Dashboard
              </Link>
            )}
            <Link to="/booking" className="text-gray-600 hover:text-pink-500 transition-colors">
              Booking
            </Link>
            <Link to="#" className="text-gray-600 hover:text-pink-500 transition-colors">
              Dịch vụ
            </Link>
            <Link to="#" className="text-gray-600 hover:text-pink-500 transition-colors">
              Về chúng tôi
            </Link>
            <Link to="#" className="text-gray-600 hover:text-pink-500 transition-colors">
              Liên hệ
            </Link>
          </nav>

          {/* Auth Buttons / User Info */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">Manager</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-red-500 text-red-500 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50">
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                    Đăng ký ngay
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {isLoggedIn && (
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-gray-600 hover:text-pink-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/booking"
              className="block px-3 py-2 text-gray-600 hover:text-pink-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Booking
            </Link>
            <Link
              to="#"
              className="block px-3 py-2 text-gray-600 hover:text-pink-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dịch vụ
            </Link>
            <Link
              to="#"
              className="block px-3 py-2 text-gray-600 hover:text-pink-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Về chúng tôi
            </Link>
            <Link
              to="#"
              className="block px-3 py-2 text-gray-600 hover:text-pink-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Liên hệ
            </Link>
            <div className="pt-4 space-y-2">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 px-3 py-2 text-gray-700">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Manager</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full border-red-500 text-red-500 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng xuất
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-pink-500 text-pink-500 hover:bg-pink-50">
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                      Đăng ký ngay
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
