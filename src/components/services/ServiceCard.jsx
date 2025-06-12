
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Clock, Star, CheckCircle } from 'lucide-react';

const ServiceCard = ({ service, getCategoryColor }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
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
  );
};

export default ServiceCard;
