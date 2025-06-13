
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Save, X } from 'lucide-react';

const ServiceForm = ({ 
  service = null, 
  onSave, 
  onCancel, 
  isEditing = false 
}) => {
  const [formData, setFormData] = useState(service || {
    name: '',
    category: 'basic',
    price: '',
    duration: '',
    successRate: '',
    description: '',
    features: []
  });

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ 
      ...formData, 
      features: [...formData.features, ''] 
    });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = () => {
    const serviceToSave = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== '')
    };
    onSave(serviceToSave);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Tên dịch vụ</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <Label>Danh mục</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Cơ bản</SelectItem>
                <SelectItem value="advanced">Nâng cao</SelectItem>
                <SelectItem value="premium">Cao cấp</SelectItem>
                <SelectItem value="support">Hỗ trợ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Giá</Label>
            <Input
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
          <div>
            <Label>Thời gian</Label>
            <Input
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
          </div>
          <div>
            <Label>Tỷ lệ thành công</Label>
            <Input
              value={formData.successRate}
              onChange={(e) => setFormData({ ...formData, successRate: e.target.value })}
            />
          </div>
        </div>
        <div>
          <Label>Mô tả</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div>
          <Label>Quy trình</Label>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <Input
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder="Nhập bước quy trình"
              />
              <Button variant="outline" size="sm" onClick={() => removeFeature(index)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addFeature} className="mt-2">
            <Plus className="w-4 h-4 mr-2" />
            Thêm bước
          </Button>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSubmit}>
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? 'Cập nhật' : 'Thêm dịch vụ'}
          </Button>
          <Button variant="outline" onClick={onCancel}>Hủy</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceForm;
