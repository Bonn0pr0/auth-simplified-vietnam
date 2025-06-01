
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <section className="bg-gradient-to-r from-pink-500 to-purple-600 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Bắt đầu hành trình của bạn ngay hôm nay
        </h2>
        <p className="text-lg text-pink-100 mb-8 max-w-2xl mx-auto">
          Hãy để chúng tôi đồng hành cùng bạn trên con đường trở thành cha mẹ. Đăng ký tư vấn miễn phí ngay hôm nay.
        </p>
        <Link to="/register">
          <Button size="lg" className="bg-white text-pink-500 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
            Đăng ký tư vấn ngay
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTA;
