
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import { Heart, Calendar, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ServiceRegistration = () => {
  const [formData, setFormData] = useState({
    serviceType: '',
    patientName: '',
    partnerName: '',
    phone: '',
    email: '',
    preferredDate: '',
    medicalHistory: '',
    notes: ''
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Đăng ký thành công!",
      description: "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng ký dịch vụ IUI/IVF</h1>
          <p className="text-gray-600">Điền thông tin để đăng ký tư vấn và điều trị</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Service Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Heart className="w-8 h-8 text-pink-500" />
                  <div>
                    <CardTitle>IUI - Thụ tinh trong tử cung</CardTitle>
                    <CardDescription>Phương pháp hỗ trợ sinh sản đơn giản</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Phương pháp đưa tinh trùng đã được xử lý vào tử cung trong thời gian rụng trứng.
                </p>
                <p className="font-semibold text-pink-600">Từ 15.000.000 VNĐ</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Heart className="w-8 h-8 text-purple-500" />
                  <div>
                    <CardTitle>IVF - Thụ tinh ống nghiệm</CardTitle>
                    <CardDescription>Công nghệ hỗ trợ sinh sản tiên tiến</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Thụ tinh trứng và tinh trùng trong phòng thí nghiệm, sau đó chuyển phôi vào tử cung.
                </p>
                <p className="font-semibold text-purple-600">Từ 80.000.000 VNĐ</p>
              </CardContent>
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Loại dịch vụ *</Label>
                    <Select onValueChange={(value) => handleChange('serviceType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn dịch vụ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iui">IUI - Thụ tinh trong tử cung</SelectItem>
                        <SelectItem value="ivf">IVF - Thụ tinh ống nghiệm</SelectItem>
                        <SelectItem value="consultation">Tư vấn ban đầu</SelectItem>
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
                  <Label htmlFor="medicalHistory">Tiền sử bệnh</Label>
                  <Textarea
                    id="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={(e) => handleChange('medicalHistory', e.target.value)}
                    placeholder="Mô tả tiền sử bệnh, các điều trị trước đó..."
                    rows={3}
                  />
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceRegistration;
