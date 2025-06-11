
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, Stethoscope } from 'lucide-react';
import Header from '@/components/Header';
import { ServiceRegistrationForm } from '@/components/ServiceRegistrationForm';

const ServiceRegistration = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng ký dịch vụ IUI/IVF</h1>
          <p className="text-gray-600">Điền thông tin để đăng ký tư vấn và điều trị</p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Service Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Heart className="w-12 h-12 text-pink-500" />
                </div>
                <CardTitle>IUI - Thụ tinh trong tử cung</CardTitle>
                <CardDescription>Phương pháp hỗ trợ sinh sản đơn giản và hiệu quả, giúp tăng khả năng thụ thai tự nhiên.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Users className="w-12 h-12 text-purple-500" />
                </div>
                <CardTitle>IVF - Thụ tinh trong ống nghiệm</CardTitle>
                <CardDescription>Công nghệ tiên tiến nhất trong hỗ trợ sinh sản, mang lại hy vọng cho các cặp vợ chồng hiếm muộn.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Stethoscope className="w-12 h-12 text-blue-500" />
                </div>
                <CardTitle>Tư vấn chuyên sâu</CardTitle>
                <CardDescription>Đội ngũ bác sĩ giàu kinh nghiệm tư vấn và đồng hành cùng bạn trong hành trình làm cha mẹ.</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Registration Form */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin đăng ký</CardTitle>
              <CardDescription>
                Vui lòng điền đầy đủ thông tin để chúng tôi có thể tư vấn tốt nhất cho bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ServiceRegistrationForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceRegistration;
