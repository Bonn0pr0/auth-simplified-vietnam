
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ServiceRegistrationForm = ({ initialServiceType = '', onComplete }) => {
  const [formData, setFormData] = useState({
    serviceType: initialServiceType,
    patientName: '',
    partnerName: '',
    phone: '',
    email: '',
    preferredDate: '',
    notes: ''
  });

  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Đăng ký thành công!",
      description: "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
    });
    
    if (onComplete) {
      onComplete();
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="serviceType">Loại dịch vụ *</Label>
          <Select 
            value={formData.serviceType} 
            onValueChange={(value) => handleChange('serviceType', value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn dịch vụ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="iui">IUI - Thụ tinh trong tử cung</SelectItem>
              <SelectItem value="ivf">IVF - Thụ tinh ống nghiệm</SelectItem>
              <SelectItem value="consultation">Tư vấn chuyên sâu</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferredDate">Ngày mong muốn *</Label>
          <Input
            id="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={(e) => handleChange('preferredDate', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="patientName">Họ tên bệnh nhân *</Label>
          <Input
            id="patientName"
            value={formData.patientName}
            onChange={(e) => handleChange('patientName', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="partnerName">Họ tên bạn đời</Label>
          <Input
            id="partnerName"
            value={formData.partnerName}
            onChange={(e) => handleChange('partnerName', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Số điện thoại *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Ghi chú thêm</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          placeholder="Các thông tin bổ sung, yêu cầu đặc biệt..."
          rows={3}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600"
        size="lg"
      >
        <Calendar className="w-4 h-4 mr-2" />
        Đăng ký tư vấn
      </Button>
    </form>
  );
};
