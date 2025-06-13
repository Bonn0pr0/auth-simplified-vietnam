
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit } from 'lucide-react';
import { getCategoryColor } from '@/utils/serviceUtils';

const ServiceItem = ({ service, onEdit, onDelete }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="font-semibold">{service.name}</h4>
              <Badge className={getCategoryColor(service.category)}>
                {service.category === 'basic' && 'Cơ bản'}
                {service.category === 'advanced' && 'Nâng cao'}
                {service.category === 'premium' && 'Cao cấp'}
                {service.category === 'support' && 'Hỗ trợ'}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">{service.description}</p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Giá: </span>
                <span>{service.price} VNĐ</span>
              </div>
              <div>
                <span className="font-medium">Thời gian: </span>
                <span>{service.duration}</span>
              </div>
              <div>
                <span className="font-medium">Tỷ lệ thành công: </span>
                <span>{service.successRate}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(service)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDelete(service.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
