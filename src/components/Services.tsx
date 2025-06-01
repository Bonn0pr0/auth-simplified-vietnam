
import { Heart, Users, Stethoscope } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Heart className="h-12 w-12 text-pink-500" />,
      title: "IUI - Thụ tinh trong tử cung",
      description: "Phương pháp hỗ trợ sinh sản đơn giản và hiệu quả, giúp tăng khả năng thụ thai tự nhiên."
    },
    {
      icon: <Users className="h-12 w-12 text-pink-500" />,
      title: "IVF - Thụ tinh trong ống nghiệm",
      description: "Công nghệ tiên tiến nhất trong hỗ trợ sinh sản, mang lại hy vọng cho các cặp vợ chồng hiếm muộn."
    },
    {
      icon: <Stethoscope className="h-12 w-12 text-pink-500" />,
      title: "Tư vấn chuyên sâu",
      description: "Đội ngũ bác sĩ giàu kinh nghiệm tư vấn và đồng hành cùng bạn trong hành trình làm cha mẹ."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dịch vụ điều trị hiếm muộn
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
