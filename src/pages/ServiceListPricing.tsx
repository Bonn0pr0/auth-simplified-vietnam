
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { Heart, Clock, Star, CheckCircle } from 'lucide-react';

const ServiceListPricing = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      id: 1,
      name: 'IUI - Thụ tinh trong tử cung',
      category: 'basic',
      price: '15.000.000 - 25.000.000',
      duration: '2-3 tuần',
      successRate: '15-20%',
      description: 'Phương pháp hỗ trợ sinh sản đơn giản, phù hợp với các trường hợp vô sinh nhẹ.',
      features: [
        'Theo dõi rụng trứng',
        'Xử lý tinh trùng',
        'Thụ tinh trong tử cung',
        'Theo dõi sau thủ thuật'
      ]
    },
    {
      id: 2,
      name: 'IVF - Thụ tinh ống nghiệm cơ bản',
      category: 'advanced',
      price: '80.000.000 - 120.000.000',
      duration: '4-6 tuần',
      successRate: '40-50%',
      description: 'Thụ tinh ngoài cơ thể với công nghệ tiên tiến, phù hợp với nhiều trường hợp vô sinh.',
      features: [
        'Kích thích buồng trứng',
        'Lấy trứng',
        'Thụ tinh trong phòng thí nghiệm',
        'Nuôi cấy phôi',
        'Chuyển phôi vào tử cung'
      ]
    },
    {
      id: 3,
      name: 'ICSI - Tiêm tinh trùng vào bào tương trứng',
      category: 'advanced',
      price: '100.000.000 - 150.000.000',
      duration: '4-6 tuần',
      successRate: '45-55%',
      description: 'Công nghệ IVF kết hợp ICSI, phù hợp với vô sinh nam và trường hợp khó.',
      features: [
        'Tất cả quy trình IVF',
        'Tiêm tinh trùng trực tiếp',
        'Tăng tỷ lệ thụ tinh',
        'Phù hợp vô sinh nam'
      ]
    },
    {
      id: 4,
      name: 'PGT-A - Chẩn đoán di truyền tiền làm tổ',
      category: 'premium',
      price: '150.000.000 - 200.000.000',
      duration: '6-8 tuần',
      successRate: '60-70%',
      description: 'IVF kết hợp xét nghiệm di truyền phôi, đảm bảo phôi khỏe mạnh.',
      features: [
        'Tất cả quy trình IVF/ICSI',
        'Sinh thiết phôi',
        'Xét nghiệm di truyền',
        'Chọn phôi khỏe mạnh',
        'Tỷ lệ thành công cao'
      ]
    },
    {
      id: 5,
      name: 'Đông lạnh phôi/trứng',
      category: 'support',
      price: '5.000.000 - 10.000.000',
      duration: '1 ngày',
      successRate: '90%+',
      description: 'Bảo quản phôi hoặc trứng để sử dụng trong tương lai.',
      features: [
        'Công nghệ đông lạnh hiện đại',
        'Bảo quản dài hạn',
        'Tỷ lệ sống cao',
        'Linh hoạt thời gian'
      ]
    },
    {
      id: 6,
      name: 'Tư vấn và khám sàng lọc',
      category: 'support',
      price: '500.000 - 2.000.000',
      duration: '1-2 giờ',
      successRate: '100%',
      description: 'Khám và tư vấn toàn diện về tình trạng sinh sản.',
      features: [
        'Khám tổng quát',
        'Xét nghiệm cơ bản',
        'Tư vấn chuyên sâu',
        'Lập kế hoạch điều trị'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'Tất cả', count: services.length },
    { id: 'basic', name: 'Cơ bản', count: services.filter(s => s.category === 'basic').length },
    { id: 'advanced', name: 'Nâng cao', count: services.filter(s => s.category === 'advanced').length },
    { id: 'premium', name: 'Cao cấp', count: services.filter(s => s.category === 'premium').length },
    { id: 'support', name: 'Hỗ trợ', count: services.filter(s => s.category === 'support').length }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'advanced': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'support': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dịch vụ & Bảng giá</h1>
          <p className="text-gray-600">Tổng quan về các dịch vụ hỗ trợ sinh sản tại FertilityCare</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "bg-pink-500 hover:bg-pink-600" : ""}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-pink-500" />
                    <Badge className={getCategoryColor(service.category)}>
                      {service.category === 'basic' && 'Cơ bản'}
                      {service.category === 'advanced' && 'Nâng cao'}
                      {service.category === 'premium' && 'Cao cấp'}
                      {service.category === 'support' && 'Hỗ trợ'}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{service.successRate}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Quy trình bao gồm:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-pink-600">{service.price}</p>
                      <p className="text-xs text-gray-500">VNĐ</p>
                    </div>
                    <Button className="bg-pink-500 hover:bg-pink-600">
                      Đăng ký tư vấn
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50">
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Cần tư vấn thêm về dịch vụ?
            </h3>
            <p className="text-gray-600 mb-6">
              Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn chi tiết về từng dịch vụ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-pink-500 hover:bg-pink-600">
                Đặt lịch tư vấn
              </Button>
              <Button variant="outline">
                Gọi ngay: 1900-1234
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceListPricing;
