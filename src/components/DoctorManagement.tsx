
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Search, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Doctor {
  id: number;
  name: string;
  email: string;
  specialty: string;
  phone: string;
  experience: number;
  status: 'active' | 'inactive';
}

const DoctorManagement = () => {
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: 1,
      name: 'BS. Nguyễn Văn An',
      email: 'nguyen.van.an@fertilityclinic.com',
      specialty: 'Sản phụ khoa',
      phone: '0123456789',
      experience: 8,
      status: 'active'
    },
    {
      id: 2,
      name: 'BS. Trần Thị Bình',
      email: 'tran.thi.binh@fertilityclinic.com',
      specialty: 'Y học sinh sản',
      phone: '0987654321',
      experience: 12,
      status: 'active'
    },
    {
      id: 3,
      name: 'BS. Lê Minh Cường',
      email: 'le.minh.cuong@fertilityclinic.com',
      specialty: 'Nội tiết',
      phone: '0456789123',
      experience: 6,
      status: 'inactive'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: '',
    phone: '',
    experience: 0
  });

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingDoctor) {
      // Update existing doctor
      setDoctors(doctors.map(doctor => 
        doctor.id === editingDoctor.id 
          ? { ...doctor, ...formData }
          : doctor
      ));
      toast({
        title: "Cập nhật thành công!",
        description: "Thông tin bác sĩ đã được cập nhật.",
      });
    } else {
      // Add new doctor
      const newDoctor: Doctor = {
        id: Date.now(),
        ...formData,
        status: 'active'
      };
      setDoctors([...doctors, newDoctor]);
      toast({
        title: "Thêm thành công!",
        description: "Bác sĩ mới đã được thêm vào hệ thống.",
      });
    }

    setFormData({ name: '', email: '', specialty: '', phone: '', experience: 0 });
    setEditingDoctor(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      email: doctor.email,
      specialty: doctor.specialty,
      phone: doctor.phone,
      experience: doctor.experience
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setDoctors(doctors.filter(doctor => doctor.id !== id));
    toast({
      title: "Xóa thành công!",
      description: "Bác sĩ đã được xóa khỏi hệ thống.",
    });
  };

  const toggleStatus = (id: number) => {
    setDoctors(doctors.map(doctor => 
      doctor.id === id 
        ? { ...doctor, status: doctor.status === 'active' ? 'inactive' : 'active' }
        : doctor
    ));
    toast({
      title: "Cập nhật trạng thái!",
      description: "Trạng thái bác sĩ đã được thay đổi.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm bác sĩ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-pink-500 hover:bg-pink-600"
              onClick={() => {
                setEditingDoctor(null);
                setFormData({ name: '', email: '', specialty: '', phone: '', experience: 0 });
              }}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Thêm bác sĩ mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingDoctor ? 'Chỉnh sửa thông tin bác sĩ' : 'Thêm bác sĩ mới'}
              </DialogTitle>
              <DialogDescription>
                {editingDoctor ? 'Cập nhật thông tin bác sĩ' : 'Nhập thông tin bác sĩ mới'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Chuyên khoa</Label>
                <Input
                  id="specialty"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Kinh nghiệm (năm)</Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
                {editingDoctor ? 'Cập nhật' : 'Thêm bác sĩ'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Doctors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách bác sĩ ({filteredDoctors.length})</CardTitle>
          <CardDescription>
            Quản lý thông tin các bác sĩ trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Họ và tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Chuyên khoa</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Kinh nghiệm</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell className="font-medium">{doctor.name}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.specialty}</TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>{doctor.experience} năm</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(doctor.id)}
                      className={doctor.status === 'active' 
                        ? 'text-green-600 border-green-600 hover:bg-green-50' 
                        : 'text-red-600 border-red-600 hover:bg-red-50'
                      }
                    >
                      {doctor.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(doctor)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(doctor.id)}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorManagement;
