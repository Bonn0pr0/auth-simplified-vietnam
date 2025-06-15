
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UnifiedLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    role: 'manager',
    email: 'manager@fertilitycare.com',
    password: '@1'
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRoleChange = (role: string) => {
    setFormData({
      role,
      email: role === 'manager' ? 'manager@fertilitycare.com' : 'staff@fertilitycare.com',
      password: '@1'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    
    if (formData.role === 'manager') {
      if (formData.email === 'manager@fertilitycare.com' && formData.password === '@1') {
        localStorage.setItem('isManagerLoggedIn', 'true');
        toast({
          title: "Đăng nhập thành công!",
          description: "Chào mừng Manager đến với hệ thống quản lý.",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Đăng nhập thất bại!",
          description: "Email hoặc mật khẩu Manager không đúng.",
          variant: "destructive",
        });
      }
    } else {
      if (formData.email === 'staff@fertilitycare.com' && formData.password === '@1') {
        localStorage.setItem('isStaffLoggedIn', 'true');
        toast({
          title: "Đăng nhập thành công!",
          description: "Chào mừng Staff đến với hệ thống quản lý.",
        });
        navigate('/staff-dashboard');
      } else {
        toast({
          title: "Đăng nhập thất bại!",
          description: "Email hoặc mật khẩu Staff không đúng.",
          variant: "destructive",
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
            <Heart className="h-10 w-10 text-pink-500" />
            <span className="text-2xl font-bold text-gray-900">FertilityCare</span>
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Đăng nhập hệ thống</CardTitle>
            <CardDescription className="text-center">
              Chọn vai trò và nhập thông tin để truy cập hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Vai trò</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your-email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="focus:ring-pink-500 focus:border-pink-500 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm text-pink-600 hover:text-pink-500"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              {/* Thông tin tài khoản mặc định */}
              <div className={`p-3 rounded-md ${formData.role === 'manager' ? 'bg-pink-50' : 'bg-blue-50'}`}>
                <p className={`text-sm ${formData.role === 'manager' ? 'text-pink-700' : 'text-blue-700'}`}>
                  <strong>Tài khoản {formData.role === 'manager' ? 'Manager' : 'Staff'} mặc định:</strong><br />
                  Email: {formData.role === 'manager' ? 'manager@fertilitycare.com' : 'staff@fertilitycare.com'}<br />
                  Mật khẩu: @1
                </p>
              </div>

              <Button
                type="submit"
                className={`w-full text-white ${formData.role === 'manager' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                Đăng nhập {formData.role === 'manager' ? 'Manager' : 'Staff'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Chưa có tài khoản?{' '}
                <Link to="/register" className="font-medium text-pink-600 hover:text-pink-500">
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnifiedLogin;
