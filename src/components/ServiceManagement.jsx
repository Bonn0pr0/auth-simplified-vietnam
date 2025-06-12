
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { services as initialServices } from '@/data/services';
import { getCategoryColor } from '@/utils/serviceUtils';

const ServiceManagement = () => {
  const [services, setServices] = useState(initialServices);
  const [editingService, setEditingService] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    category: 'basic',
    price: '',
    duration: '',
    successRate: '',
    description: '',
    features: []
  });
  const { toast } = useToast();

  const handleEdit = (service) => {
    setEditingService({ ...service, features: [...service.features] });
    setIsAddingNew(false);
  };

  const handleSave = () => {
    if (editingService) {
      setServices(services.map(s => 
        s.id === editingService.id ? editingService : s
      ));
      setEditingService(null);
      toast({
        title: "Cập nhật thành công",
        description: "Dịch vụ đã được cập nhật"
      });
    }
  };

  const handleDelete = (id) => {
    setServices(services.filter(s => s.id !== id));
    toast({
      title: "Xóa thành công",
      description: "Dịch vụ đã được xóa"
    });
  };

  const handleAddNew = () => {
    const maxId = Math.max(...services.map(s => s.id));
    const serviceToAdd = {
      ...newService,
      id: maxId + 1,
      features: newService.features.filter(f => f.trim() !== '')
    };
    setServices([...services, serviceToAdd]);
    setNewService({
      name: '',
      category: 'basic',
      price: '',
      duration: '',
      successRate: '',
      description: '',
      features: []
    });
    setIsAddingNew(false);
    toast({
      title: "Thêm thành công",
      description: "Dịch vụ mới đã được thêm"
    });
  };

  const handleFeatureChange = (index, value, isEditing = false) => {
    if (isEditing && editingService) {
      const newFeatures = [...editingService.features];
      newFeatures[index] = value;
      setEditingService({ ...editingService, features: newFeatures });
    } else {
      const newFeatures = [...newService.features];
      newFeatures[index] = value;
      setNewService({ ...newService, features: newFeatures });
    }
  };

  const addFeature = (isEditing = false) => {
    if (isEditing && editingService) {
      setEditingService({ 
        ...editingService, 
        features: [...editingService.features, ''] 
      });
    } else {
      setNewService({ 
        ...newService, 
        features: [...newService.features, ''] 
      });
    }
  };

  const removeFeature = (index, isEditing = false) => {
    if (isEditing && editingService) {
      const newFeatures = editingService.features.filter((_, i) => i !== index);
      setEditingService({ ...editingService, features: newFeatures });
    } else {
      const newFeatures = newService.features.filter((_, i) => i !== index);
      setNewService({ ...newService, features: newFeatures });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Quản lý Dịch vụ</h3>
          <p className="text-sm text-gray-600">Quản lý các dịch vụ hỗ trợ sinh sản</p>
        </div>
        <Button onClick={() => setIsAddingNew(true)} disabled={isAddingNew}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm dịch vụ mới
        </Button>
      </div>

      {isAddingNew && (
        <Card>
          <CardHeader>
            <CardTitle>Thêm dịch vụ mới</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tên dịch vụ</Label>
                <Input
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Danh mục</Label>
                <Select value={newService.category} onValueChange={(value) => setNewService({ ...newService, category: value })}>
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
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                />
              </div>
              <div>
                <Label>Thời gian</Label>
                <Input
                  value={newService.duration}
                  onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                />
              </div>
              <div>
                <Label>Tỷ lệ thành công</Label>
                <Input
                  value={newService.successRate}
                  onChange={(e) => setNewService({ ...newService, successRate: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>Mô tả</Label>
              <Textarea
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              />
            </div>
            <div>
              <Label>Quy trình</Label>
              {newService.features.map((feature, index) => (
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
              <Button variant="outline" size="sm" onClick={() => addFeature()} className="mt-2">
                <Plus className="w-4 h-4 mr-2" />
                Thêm bước
              </Button>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddNew}>Thêm dịch vụ</Button>
              <Button variant="outline" onClick={() => setIsAddingNew(false)}>Hủy</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-4">
              {editingService && editingService.id === service.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Tên dịch vụ</Label>
                      <Input
                        value={editingService.name}
                        onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Danh mục</Label>
                      <Select value={editingService.category} onValueChange={(value) => setEditingService({ ...editingService, category: value })}>
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
                        value={editingService.price}
                        onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Thời gian</Label>
                      <Input
                        value={editingService.duration}
                        onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Tỷ lệ thành công</Label>
                      <Input
                        value={editingService.successRate}
                        onChange={(e) => setEditingService({ ...editingService, successRate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Mô tả</Label>
                    <Textarea
                      value={editingService.description}
                      onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Quy trình</Label>
                    {editingService.features.map((feature, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value, true)}
                          placeholder="Nhập bước quy trình"
                        />
                        <Button variant="outline" size="sm" onClick={() => removeFeature(index, true)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addFeature(true)} className="mt-2">
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm bước
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Lưu
                    </Button>
                    <Button variant="outline" onClick={() => setEditingService(null)}>Hủy</Button>
                  </div>
                </div>
              ) : (
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
                    <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(service.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceManagement;
