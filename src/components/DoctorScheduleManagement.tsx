
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Search, Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DoctorSchedule {
  id: number;
  doctorName: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  maxPatients: number;
  currentPatients: number;
}

const DoctorScheduleManagement = () => {
  const { toast } = useToast();
  const [schedules, setSchedules] = useState<DoctorSchedule[]>([
    {
      id: 1,
      doctorName: 'BS. Nguyễn Văn An',
      date: '2024-06-15',
      startTime: '08:00',
      endTime: '12:00',
      isAvailable: true,
      maxPatients: 10,
      currentPatients: 3
    },
    {
      id: 2,
      doctorName: 'BS. Trần Thị Bình',
      date: '2024-06-15',
      startTime: '13:00',
      endTime: '17:00',
      isAvailable: true,
      maxPatients: 8,
      currentPatients: 5
    },
    {
      id: 3,
      doctorName: 'BS. Lê Minh Cường',
      date: '2024-06-16',
      startTime: '08:00',
      endTime: '12:00',
      isAvailable: false,
      maxPatients: 10,
      currentPatients: 0
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<DoctorSchedule | null>(null);
  const [formData, setFormData] = useState({
    doctorName: '',
    date: '',
    startTime: '',
    endTime: '',
    maxPatients: 10
  });

  const filteredSchedules = schedules.filter(schedule =>
    schedule.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.date.includes(searchTerm)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSchedule) {
      setSchedules(schedules.map(schedule => 
        schedule.id === editingSchedule.id 
          ? { ...schedule, ...formData, isAvailable: true }
          : schedule
      ));
      toast({
        title: "Cập nhật thành công!",
        description: "Lịch làm việc đã được cập nhật.",
      });
    } else {
      const newSchedule: DoctorSchedule = {
        id: Date.now(),
        ...formData,
        isAvailable: true,
        currentPatients: 0
      };
      setSchedules([...schedules, newSchedule]);
      toast({
        title: "Thêm thành công!",
        description: "Lịch làm việc mới đã được thêm.",
      });
    }

    setFormData({ doctorName: '', date: '', startTime: '', endTime: '', maxPatients: 10 });
    setEditingSchedule(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (schedule: DoctorSchedule) => {
    setEditingSchedule(schedule);
    setFormData({
      doctorName: schedule.doctorName,
      date: schedule.date,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      maxPatients: schedule.maxPatients
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
    toast({
      title: "Xóa thành công!",
      description: "Lịch làm việc đã được xóa.",
    });
  };

  const toggleAvailability = (id: number) => {
    setSchedules(schedules.map(schedule => 
      schedule.id === id 
        ? { ...schedule, isAvailable: !schedule.isAvailable }
        : schedule
    ));
    toast({
      title: "Cập nhật trạng thái!",
      description: "Trạng thái lịch làm việc đã được thay đổi.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm lịch làm việc..."
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
                setEditingSchedule(null);
                setFormData({ doctorName: '', date: '', startTime: '', endTime: '', maxPatients: 10 });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm lịch làm việc
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingSchedule ? 'Chỉnh sửa lịch làm việc' : 'Thêm lịch làm việc mới'}
              </DialogTitle>
              <DialogDescription>
                {editingSchedule ? 'Cập nhật lịch làm việc' : 'Nhập thông tin lịch làm việc mới'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doctorName">Bác sĩ</Label>
                <Select value={formData.doctorName} onValueChange={(value) => setFormData({ ...formData, doctorName: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn bác sĩ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BS. Nguyễn Văn An">BS. Nguyễn Văn An</SelectItem>
                    <SelectItem value="BS. Trần Thị Bình">BS. Trần Thị Bình</SelectItem>
                    <SelectItem value="BS. Lê Minh Cường">BS. Lê Minh Cường</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Ngày</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Giờ bắt đầu</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">Giờ kết thúc</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxPatients">Số bệnh nhân tối đa</Label>
                <Input
                  id="maxPatients"
                  type="number"
                  value={formData.maxPatients}
                  onChange={(e) => setFormData({ ...formData, maxPatients: parseInt(e.target.value) || 10 })}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
                {editingSchedule ? 'Cập nhật' : 'Thêm lịch'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Schedules Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch làm việc bác sĩ ({filteredSchedules.length})</CardTitle>
          <CardDescription>
            Quản lý lịch làm việc của các bác sĩ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bác sĩ</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Giờ làm việc</TableHead>
                <TableHead>Bệnh nhân</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.doctorName}</TableCell>
                  <TableCell>{new Date(schedule.date).toLocaleDateString('vi-VN')}</TableCell>
                  <TableCell>{schedule.startTime} - {schedule.endTime}</TableCell>
                  <TableCell>{schedule.currentPatients}/{schedule.maxPatients}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAvailability(schedule.id)}
                      className={schedule.isAvailable 
                        ? 'text-green-600 border-green-600 hover:bg-green-50' 
                        : 'text-red-600 border-red-600 hover:bg-red-50'
                      }
                    >
                      {schedule.isAvailable ? 'Có sẵn' : 'Không có sẵn'}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(schedule)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(schedule.id)}
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

export default DoctorScheduleManagement;
