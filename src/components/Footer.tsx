
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-pink-500" />
              <span className="text-xl font-bold">FertilityCare</span>
            </div>
            <p className="text-gray-400 mb-4">
              Trung tâm điều trị hiếm muộn hàng đầu với đội ngũ bác sĩ giàu kinh nghiệm.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Trang chủ</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Dịch vụ</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Về chúng tôi</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Tin tức</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dịch vụ</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">IUI - Thụ tinh tử cung</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">IVF - Thụ tinh ống nghiệm</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Tư vấn chuyên sâu</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Khám sức khỏe</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-pink-500" />
                <span className="text-gray-400">1900 1234</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-pink-500" />
                <span className="text-gray-400">info@fertilitycare.vn</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-pink-500 mt-1" />
                <span className="text-gray-400">123 Đường ABC, Quận 1, TP.HCM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 FertilityCare. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
