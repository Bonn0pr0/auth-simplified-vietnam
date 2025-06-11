
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import { Calendar, FileText, Clock, CheckCircle, AlertCircle, User } from 'lucide-react';

const TreatmentProgress = () => {
  const [selectedTreatment] = useState('current');

  const currentTreatment = {
    id: 1,
    type: 'IVF - Thụ tinh ống nghiệm',
    startDate: '2024-01-15',
    currentPhase: 'Nuôi cấy phôi',
    progress: 75,
    nextAppointment: '2024-02-10',
    doctor: 'BS. Nguyễn Thị Lan',
    status: 'active'
  };

  const treatmentSteps = [
    {
      id: 1,
      name: 'Tư vấn và khám ban đầu',
      date: '2024-01-15',
      status: 'completed',
      description: 'Khám tổng quát, xét nghiệm máu, siêu âm'
    },
    {
      id: 2,
      name: 'Kích thích buồng trứng',
      date: '2024-01-20',
      status: 'completed',
      description: 'Tiêm thuốc kích thích, theo dõi phát triển nang trứng'
    },
    {
      id: 3,
      name: 'Lấy trứng',
      date: '2024-02-02',
      status: 'completed',
      description: 'Thủ thuật lấy trứng thành công, thu được 12 trứng'
    },
    {
      id: 4,
      name: 'Thụ tinh và nuôi cấy phôi',
      date: '2024-02-03',
      status: 'in-progress',
      description: 'Đang nuôi cấy phôi, hiện có 8 phôi phát triển tốt'
    },
    {
      id: 5,
      name: 'Chuyển phôi',
      date: '2024-02-10',
      status: 'upcoming',
      description: 'Dự kiến chuyển 1-2 phôi chất lượng tốt nhất'
    },
    {
      id: 6,
      name: 'Theo dõi sau chuyển phôi',
      date: '2024-02-25',
      status: 'upcoming',
      description: 'Xét nghiệm beta-hCG, siêu âm theo dõi'
    }
  ];

  const appointments = [
    {
      id: 1,
      date: '2024-02-10',
      time: '09:00',
      type: 'Chuyển phôi',
      doctor: 'BS. Nguyễn Thị Lan',
      status: 'upcoming'
    },
    {
      id: 2,
      date: '2024-02-25',
      time: '10:30',
      type: 'Kiểm tra sau chuyển phôi',
      doctor: 'BS. Nguyễn Thị Lan',
      status: 'scheduled'
    }
  ];

  const medications = [
    {
      id: 1,
      name: 'Progesterone',
      dosage: '200mg',
      frequency: '2 lần/ngày',
      duration: '14 ngày',
      status: 'active'
    },
    {
      id: 2,
      name: 'Estradiol',
      dosage: '2mg',
      frequency: '1 lần/ngày',
      duration: '10 ngày',
      status: 'active'
    }
  ];

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'upcoming':
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800">Đang thực hiện</Badge>;
      case 'upcoming':
        return <Badge className="bg-gray-100 text-gray-800">Sắp tới</Badge>;
      case 'active':
        return <Badge className="bg-pink-100 text-pink-800">Đang dùng</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Chưa xác định</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Theo dõi điều trị</h1>
          <p className="text-gray-600">Theo dõi tiến trình điều trị và lịch hẹn của bạn</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Treatment Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Treatment Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Điều trị hiện tại</CardTitle>
                    <CardDescription>Thông tin tổng quan về quá trình điều trị</CardDescription>
                  </div>
                  <Badge className="bg-pink-100 text-pink-800">Đang tiến hành</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Loại điều trị</p>
                    <p className="font-medium">{currentTreatment.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Bác sĩ điều trị</p>
                    <p className="font-medium">{currentTreatment.doctor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ngày bắt đầu</p>
                    <p className="font-medium">{currentTreatment.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Giai đoạn hiện tại</p>
                    <p className="font-medium">{currentTreatment.currentPhase}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Tiến độ điều trị</p>
                    <p className="text-sm font-medium">{currentTreatment.progress}%</p>
                  </div>
                  <Progress value={currentTreatment.progress} className="w-full" />
                </div>
              </CardContent>
            </Card>

            {/* Treatment Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Các bước điều trị</CardTitle>
                <CardDescription>Tiến trình chi tiết của quá trình điều trị</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {treatmentSteps.map((step, index) => (
                    <div key={step.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getStepIcon(step.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{step.name}</h4>
                          {getStatusBadge(step.status)}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Medical Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Hồ sơ y tế</CardTitle>
                <CardDescription>Các báo cáo và kết quả xét nghiệm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Kết quả xét nghiệm máu</p>
                        <p className="text-sm text-gray-600">02/02/2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Xem</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Báo cáo siêu âm</p>
                        <p className="text-sm text-gray-600">01/02/2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Xem</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Kết quả nuôi cấy phôi</p>
                        <p className="text-sm text-gray-600">03/02/2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Xem</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Lịch hẹn sắp tới</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {appointments.map(appointment => (
                  <div key={appointment.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-sm">{appointment.type}</p>
                      {getStatusBadge(appointment.status)}
                    </div>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{appointment.date}</span>
                      </p>
                      <p className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{appointment.time}</span>
                      </p>
                      <p className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{appointment.doctor}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Current Medications */}
            <Card>
              <CardHeader>
                <CardTitle>Thuốc đang sử dụng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {medications.map(medication => (
                  <div key={medication.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-sm">{medication.name}</p>
                      {getStatusBadge(medication.status)}
                    </div>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>Liều lượng: {medication.dosage}</p>
                      <p>Tần suất: {medication.frequency}</p>
                      <p>Thời gian: {medication.duration}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Hành động nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-pink-500 hover:bg-pink-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Đặt lịch hẹn
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Tải báo cáo
                </Button>
                <Button variant="outline" className="w-full">
                  Liên hệ bác sĩ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentProgress;
