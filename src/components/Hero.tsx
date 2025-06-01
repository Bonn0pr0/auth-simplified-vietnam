
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Chăm sóc sức khỏe sinh sản
            <span className="block text-pink-500">Với tình yêu thương</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Chúng tôi đồng hành cùng bạn trên hành trình mang thai hạnh phúc. Đem đến 
            những dịch vụ chăm sóc sức khỏe sinh sản tốt nhất dành cho bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 text-lg">
                Tư vấn ngay
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50 px-8 py-3 text-lg">
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
