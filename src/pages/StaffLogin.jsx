
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StaffLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: 'staff@fertilitycare.com',
    password: '@1'
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Staff login attempt:', formData);
    
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
        description: "Email hoặc mật khẩu không đúng.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
            <Heart className="h-10 w-10 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">Staff Portal</span>
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Đăng nhập Staff</CardTitle>
            <CardDescription className="text-center">
              Nhập thông tin Staff để truy cập hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="staff@fertilitycare.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="focus:ring-blue-500 focus:border-blue-500"
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
                    className="focus:ring-blue-500 focus:border-blue-500 pr-10"
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

              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm text-blue-700">
                  <strong>Tài khoản Staff mặc định:</strong><br />
                  Email: staff@fertilitycare.com<br />
                  Mật khẩu: @1
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Đăng nhập
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Về trang đăng nhập Manager
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffLogin;
