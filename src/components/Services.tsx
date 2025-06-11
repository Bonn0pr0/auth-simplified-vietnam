
import { Heart, Users, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServiceRegistrationForm } from './ServiceRegistrationForm';

const Services = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleServiceClick = (serviceType: string) => {
    setSelectedService(serviceType);
    setIsDialogOpen(true);
  };

  const services = [
    {
      icon: <Heart className="h-12 w-12 text-pink-500" />,
      title: "IUI - Thụ tinh trong tử cung",
      description: "Phương pháp hỗ trợ sinh sản đơn giản và hiệu quả, giúp tăng khả năng thụ thai tự nhiên.",
      type: "iui"
    },
    {
      icon: <Users className="h-12 w-12 text-pink-500" />,
      title: "IVF - Thụ tinh trong ống nghiệm",
      description: "Công nghệ tiên tiến nhất trong hỗ trợ sinh sản, mang lại hy vọng cho các cặp vợ chồng hiếm muộn.",
      type: "ivf"
    },
    {
      icon: <Stethoscope className="h-12 w-12 text-pink-500" />,
      title: "Tư vấn chuyên sâu",
      description: "Đội ngũ bác sĩ giàu kinh nghiệm tư vấn và đồng hành cùng bạn trong hành trình làm cha mẹ.",
      type: "consultation"
    }
  ];

  return (
    <section className="py-20 bg-white" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dịch vụ điều trị hiếm muộn
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <Button 
                className="bg-pink-500 hover:bg-pink-600"
                onClick={() => handleServiceClick(service.type)}
              >
                Đăng ký dịch vụ
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Đăng ký dịch vụ {selectedService === 'iui' ? 'IUI' : selectedService === 'ivf' ? 'IVF' : 'Tư vấn chuyên sâu'}</DialogTitle>
            <DialogDescription>
              Vui lòng điền đầy đủ thông tin để chúng tôi có thể tư vấn tốt nhất cho bạn
            </DialogDescription>
          </DialogHeader>
          <ServiceRegistrationForm 
            initialServiceType={selectedService} 
            onComplete={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Services;
