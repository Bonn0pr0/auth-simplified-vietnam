
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthSectionProps {
  isLoggedIn: boolean;
  onLinkClick?: () => void;
}

const AuthSection = ({ isLoggedIn, onLinkClick }: AuthSectionProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('isManagerLoggedIn');
    toast({
      title: "Đăng xuất thành công!",
      description: "Hẹn gặp lại bạn.",
    });
    navigate('/');
    if (onLinkClick) onLinkClick();
  };

  if (isLoggedIn) {
    return (
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
    );
  }

  return (
    <>
      <Link to="/login" onClick={onLinkClick}>
        <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50">
          Đăng nhập
        </Button>
      </Link>
      <Link to="/register" onClick={onLinkClick}>
        <Button className="bg-pink-500 hover:bg-pink-600 text-white">
          Đăng ký ngay
        </Button>
      </Link>
    </>
  );
};

export default AuthSection;
