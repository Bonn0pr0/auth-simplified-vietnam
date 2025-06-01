
import { Shield, Clock, Award, HeartHandshake } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-pink-500" />,
      title: "Đội ngũ chuyên gia",
      description: "Bác sĩ giàu kinh nghiệm với chuyên môn cao trong lĩnh vực sinh sản"
    },
    {
      icon: <Clock className="h-8 w-8 text-pink-500" />,
      title: "Công nghệ hiện đại",
      description: "Trang thiết bị y tế hiện đại, công nghệ tiên tiến nhất thế giới"
    },
    {
      icon: <Award className="h-8 w-8 text-pink-500" />,
      title: "Tỷ lệ thành công cao",
      description: "Tỷ lệ thành công cao trong các phương pháp hỗ trợ sinh sản"
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-pink-500" />,
      title: "Chăm sóc tận tình",
      description: "Chăm sóc tận tâm và hỗ trợ suốt quá trình điều trị"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tại sao chọn chúng tôi?
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4 p-4 bg-pink-100 rounded-full w-16 h-16 mx-auto items-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
