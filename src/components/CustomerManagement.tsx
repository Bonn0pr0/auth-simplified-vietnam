
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Search, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  address: string;
  registeredDate: string;
  status: 'active' | 'inactive';
}

const CustomerManagement = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: 'Nguyễn Thị Mai',
      email: 'nguyen.thi.mai@email.com',
      phone: '0123456789',
      age: 28,
      address: 'Hà Nội',
      registeredDate: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Trần Văn Nam',
      email: 'tran.van.nam@email.com',
      phone: '0987654321',
      age: 32,
      address: 'TP. Hồ Chí Minh',
      registeredDate: '2024-02-20',
      status: 'active'
    },
    {
      id: 3,
      name: 'Lê Thị Hoa',
      email: 'le.thi.hoa@email.com',
      phone: '0456789123',
      age: 26,
      address: 'Đà Nẵng',
      registeredDate: '2024-03-10',
      status: 'inactive'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: 0,
    address: ''
  });

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCustomer) {
      // Update existing customer
      setCustomers(customers.map(customer => 
        customer.id === editingCustomer.id 
          ? { ...customer, ...formData }
          : customer
      ));
      toast({
        title: "Cập nhật thành công!",
        description: "Thông tin khách hàng đã được cập nhật.",
      });
    } else {
      // Add new customer
      const newCustomer: Customer = {
        id: Date.now(),
        ...formData,
        registeredDate: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      setCustomers([...customers, newCustomer]);
      toast({
        title: "Thêm thành công!",
        description: "Khách hàng mới đã được thêm vào hệ thống.",
      });
    }

    setFormData({ name: '', email: '', phone: '', age: 0, address: '' });
    setEditingCustomer(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      age: customer.age,
      address: customer.address
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setCustomers(customers.filter(customer => customer.id !== id));
    toast({
      title: "Xóa thành công!",
      description: "Khách hàng đã được xóa khỏi hệ thống.",
    });
  };

  const toggleStatus = (id: number) => {
    setCustomers(customers.map(customer => 
      customer.id === id 
        ? { ...customer, status: customer.status === 'active' ? 'inactive' : 'active' }
        : customer
    ));
    toast({
      title: "Cập nhật trạng thái!",
      description: "Trạng thái khách hàng đã được thay đổi.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm khách hàng..."
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
                setEditingCustomer(null);
                setFormData({ name: '', email: '', phone: '', age: 0, address: '' });
              }}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Thêm khách hàng mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingCustomer ? 'Chỉnh sửa thông tin khách hàng' : 'Thêm khách hàng mới'}
              </DialogTitle>
              <DialogDescription>
                {editingCustomer ? 'Cập nhật thông tin khách hàng' : 'Nhập thông tin khách hàng mới'}
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
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Tuổi</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
                {editingCustomer ? 'Cập nhật' : 'Thêm khách hàng'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách khách hàng ({filteredCustomers.length})</CardTitle>
          <CardDescription>
            Quản lý thông tin các khách hàng trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Họ và tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Tuổi</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Ngày đăng ký</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.age}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{formatDate(customer.registeredDate)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(customer.id)}
                      className={customer.status === 'active' 
                        ? 'text-green-600 border-green-600 hover:bg-green-50' 
                        : 'text-red-600 border-red-600 hover:bg-red-50'
                      }
                    >
                      {customer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(customer)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(customer.id)}
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

export default CustomerManagement;
