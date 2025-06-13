
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { services as initialServices } from '@/data/services';
import ServiceForm from './ServiceForm';
import ServiceList from './ServiceList';

const ServiceManagement = () => {
  const [services, setServices] = useState(initialServices);
  const [editingService, setEditingService] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const { toast } = useToast();

  const handleEdit = (service) => {
    setEditingService({ ...service, features: [...service.features] });
    setIsAddingNew(false);
  };

  const handleSave = (serviceData) => {
    if (editingService) {
      setServices(services.map(s => 
        s.id === editingService.id ? { ...serviceData, id: editingService.id } : s
      ));
      setEditingService(null);
      toast({
        title: "Cập nhật thành công",
        description: "Dịch vụ đã được cập nhật"
      });
    } else {
      const maxId = Math.max(...services.map(s => s.id));
      const newService = { ...serviceData, id: maxId + 1 };
      setServices([...services, newService]);
      setIsAddingNew(false);
      toast({
        title: "Thêm thành công",
        description: "Dịch vụ mới đã được thêm"
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

  const handleCancel = () => {
    setEditingService(null);
    setIsAddingNew(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Quản lý Dịch vụ</h3>
          <p className="text-sm text-gray-600">Quản lý các dịch vụ hỗ trợ sinh sản</p>
        </div>
        <Button onClick={() => setIsAddingNew(true)} disabled={isAddingNew || editingService}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm dịch vụ mới
        </Button>
      </div>

      {(isAddingNew || editingService) && (
        <ServiceForm
          service={editingService}
          onSave={handleSave}
          onCancel={handleCancel}
          isEditing={!!editingService}
        />
      )}

      <ServiceList
        services={services}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ServiceManagement;
