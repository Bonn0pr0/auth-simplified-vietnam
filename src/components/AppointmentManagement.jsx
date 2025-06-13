
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Edit, Plus, Save, X, Calendar, Clock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'Nguyễn Thị Lan',
      doctorName: 'BS. Trần Văn Nam',
      service: 'IUI - Thụ tinh trong tử cung',
      date: '2024-06-15',
      time: '09:00',
      status: 'scheduled',
      phone: '0901234567'
    },
    {
      id: 2,
      patientName: 'Lê Thị Hoa',
      doctorName: 'BS. Nguyễn Thị Mai',
      service: 'IVF - Thụ tinh ống nghiệm',
      date: '2024-06-16',
      time: '14:30',
      status: 'completed',
      phone: '0907654321'
    }
  ]);

  const [editingAppointment, setEditingAppointment] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    doctorName: '',
    service: '',
    date: '',
    time: '',
    status: 'scheduled',
    phone: ''
  });
  const { toast } = useToast();

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'scheduled': return 'Đã đặt lịch';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return 'Không xác định';
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment({ ...appointment });
    setIsAddingNew(false);
  };

  const handleSave = () => {
    if (editingAppointment) {
      setAppointments(appointments.map(a => 
        a.id === editingAppointment.id ? editingAppointment : a
      ));
      setEditingAppointment(null);
      toast({
        title: "Cập nhật thành công",
        description: "Lịch khám đã được cập nhật"
      });
    }
  };

  const handleDelete = (id) => {
    setAppointments(appointments.filter(a => a.id !== id));
    toast({
      title: "Xóa thành công",
      description: "Lịch khám đã được xóa"
    });
  };

  const handleAddNew = () => {
    const maxId = Math.max(...appointments.map(a => a.id));
    const appointmentToAdd = {
      ...newAppointment,
      id: maxId + 1
    };
    setAppointments([...appointments, appointmentToAdd]);
    setNewAppointment({
      patientName: '',
      doctorName: '',
      service: '',
      date: '',
      time: '',
      status: 'scheduled',
      phone: ''
    });
    setIsAddingNew(false);
    toast({
      title: "Thêm thành công",
      description: "Lịch khám mới đã được thêm"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Quản lý Lịch khám</h3>
          <p className="text-sm text-gray-600">Quản lý lịch hẹn khám của khách hàng</p>
        </div>
        <Button onClick={() => setIsAddingNew(true)} disabled={isAddingNew}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm lịch khám mới
        </Button>
      </div>

      {/* Add New Form */}
      {isAddingNew && (
        <Card>
          <CardHeader>
            <CardTitle>Thêm lịch khám mới</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tên khách hàng</Label>
                <Input
                  value={newAppointment.patientName}
                  onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
                />
              </div>
              <div>
                <Label>Số điện thoại</Label>
                <Input
                  value={newAppointment.phone}
                  onChange={(e) => setNewAppointment({ ...newAppointment, phone: e.target.value })}
                />
              </div>
              <div>
                <Label>Bác sĩ</Label>
                <Input
                  value={newAppointment.doctorName}
                  onChange={(e) => setNewAppointment({ ...newAppointment, doctorName: e.target.value })}
                />
              </div>
              <div>
                <Label>Dịch vụ</Label>
                <Input
                  value={newAppointment.service}
                  onChange={(e) => setNewAppointment({ ...newAppointment, service: e.target.value })}
                />
              </div>
              <div>
                <Label>Ngày khám</Label>
                <Input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                />
              </div>
              <div>
                <Label>Giờ khám</Label>
                <Input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddNew}>Thêm lịch khám</Button>
              <Button variant="outline" onClick={() => setIsAddingNew(false)}>Hủy</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách lịch khám</CardTitle>
          <CardDescription>Tổng quan về tất cả lịch khám trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Bác sĩ</TableHead>
                <TableHead>Dịch vụ</TableHead>
                <TableHead>Ngày giờ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  {editingAppointment && editingAppointment.id === appointment.id ? (
                    <>
                      <TableCell>
                        <div className="space-y-2">
                          <Input
                            value={editingAppointment.patientName}
                            onChange={(e) => setEditingAppointment({ ...editingAppointment, patientName: e.target.value })}
                            placeholder="Tên khách hàng"
                          />
                          <Input
                            value={editingAppointment.phone}
                            onChange={(e) => setEditingAppointment({ ...editingAppointment, phone: e.target.value })}
                            placeholder="Số điện thoại"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editingAppointment.doctorName}
                          onChange={(e) => setEditingAppointment({ ...editingAppointment, doctorName: e.target.value })}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editingAppointment.service}
                          onChange={(e) => setEditingAppointment({ ...editingAppointment, service: e.target.value })}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <Input
                            type="date"
                            value={editingAppointment.date}
                            onChange={(e) => setEditingAppointment({ ...editingAppointment, date: e.target.value })}
                          />
                          <Input
                            type="time"
                            value={editingAppointment.time}
                            onChange={(e) => setEditingAppointment({ ...editingAppointment, time: e.target.value })}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select value={editingAppointment.status} onValueChange={(value) => setEditingAppointment({ ...editingAppointment, status: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="scheduled">Đã đặt lịch</SelectItem>
                            <SelectItem value="completed">Hoàn thành</SelectItem>
                            <SelectItem value="cancelled">Đã hủy</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSave}>
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setEditingAppointment(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>
                        <div>
                          <div className="font-medium">{appointment.patientName}</div>
                          <div className="text-sm text-gray-500">{appointment.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{appointment.doctorName}</TableCell>
                      <TableCell>{appointment.service}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {appointment.date}
                          <Clock className="w-4 h-4 ml-2" />
                          {appointment.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusText(appointment.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(appointment)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(appointment.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentManagement;
