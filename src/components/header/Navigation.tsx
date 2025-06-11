
import { Link } from 'react-router-dom';

interface NavigationProps {
  onLinkClick?: () => void;
}

const Navigation = ({ onLinkClick }: NavigationProps) => {
  const navItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Booking", path: "/booking" },
    { label: "Dịch vụ", path: "/services" },
    { label: "Về chúng tôi", path: "#" },
    { label: "Liên hệ", path: "#" }
  ];

  return (
    <>
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="text-gray-600 hover:text-pink-500 transition-colors"
          onClick={onLinkClick}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
};

export default Navigation;
