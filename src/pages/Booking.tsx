
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import { Calendar, Clock, User, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Booking = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    doctor: '',
    service: '',
    notes: ''
  });

  const services = [
    'Khám tổng quát hiếm muộn',
    'Siêu âm phụ khoa',
    'Xét nghiệm hormone',
    'Tư vấn dinh dưỡng',
    'IVF/ICSI',
    'IUI',
    'Phẫu thuật nội soi',
    'Theo dõi phóng noãn'
  ];

  const doctors = [
    'BS. Nguyễn Văn An - Sản phụ khoa',
    'BS. Trần Thị Bình - Y học sinh sản',
    'BS. Lê Minh Cường - Nội tiết'
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking data:', formData);
    
    toast({
      title: "Đặt lịch hẹn thành công!",
      description: `Lịch hẹn của bạn đã được ghi nhận cho ngày ${formData.date} lúc ${formData.time}. Chúng tôi sẽ liên hệ xác nhận sớm nhất.`,
    });

    // Reset form
    setFormData({
      patientName: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      doctor: '',
      service: '',
      notes: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Get today's date for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Đặt lịch hẹn</h1>
            <p className="text-gray-600">Đặt lịch khám với các chuyên gia hàng đầu về hiếm muộn</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-pink-500" />
                Thông tin đặt lịch
              </CardTitle>
              <CardDescription>
                Vui lòng điền đầy đủ thông tin để đặt lịch hẹn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Thông tin cá nhân
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Họ và tên *</Label>
                      <Input
                        id="patientName"
                        value={formData.patientName}
                        onChange={(e) => handleChange('patientName', e.target.value)}
                        placeholder="Nhập họ và tên"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="Nhập số điện thoại"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="Nhập email (không bắt buộc)"
                    />
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Thông tin lịch hẹn
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Ngày hẹn *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        min={today}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Giờ hẹn *</Label>
                      <Select value={formData.time} onValueChange={(value) => handleChange('time', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn giờ hẹn" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Chọn bác sĩ *</Label>
                    <Select value={formData.doctor} onValueChange={(value) => handleChange('doctor', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn bác sĩ" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor} value={doctor}>
                            {doctor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Dịch vụ *</Label>
                    <Select value={formData.service} onValueChange={(value) => handleChange('service', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn dịch vụ" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Ghi chú
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Ghi chú thêm</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      placeholder="Nhập ghi chú, triệu chứng hoặc yêu cầu đặc biệt..."
                      rows={4}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 text-lg"
                  disabled={!formData.patientName || !formData.phone || !formData.date || !formData.time || !formData.doctor || !formData.service}
                >
                  Đặt lịch hẹn
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Information Card */}
          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-gray-900">Lưu ý quan trọng</h3>
                <p className="text-sm text-gray-600">
                  • Vui lòng đến trước giờ hẹn 15 phút để làm thủ tục<br/>
                  • Mang theo CCCD/CMND và các kết quả xét nghiệm cũ (nếu có)<br/>
                  • Liên hệ hotline <span className="font-semibold text-pink-600">1900 1234</span> để thay đổi lịch hẹn<br/>
                  • Phí hủy lịch hẹn trong vòng 24h trước giờ khám: 100,000 VNĐ
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Booking;
