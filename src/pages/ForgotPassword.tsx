
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reset password for:', email);
    
    // Simulate sending reset email
    setIsSubmitted(true);
    toast({
      title: "Email đã được gửi!",
      description: "Vui lòng kiểm tra email để đặt lại mật khẩu.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
              <Heart className="h-10 w-10 text-pink-500" />
              <span className="text-2xl font-bold text-gray-900">FertilityCare</span>
            </Link>
          </div>

          <Card className="shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Kiểm tra email</CardTitle>
              <CardDescription className="text-center">
                Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-pink-500" />
                </div>
                <p className="text-sm text-gray-600">
                  Vui lòng kiểm tra hộp thư đến của bạn tại <strong>{email}</strong> và làm theo hướng dẫn để đặt lại mật khẩu.
                </p>
                <p className="text-xs text-gray-500">
                  Không thấy email? Kiểm tra thư mục spam hoặc thử lại sau vài phút.
                </p>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full"
                >
                  Gửi lại email
                </Button>
                <Link to="/login">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Quay lại đăng nhập
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
            <CardTitle className="text-2xl font-bold text-center">Quên mật khẩu</CardTitle>
            <CardDescription className="text-center">
              Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu
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
                  placeholder="your-email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="focus:ring-pink-500 focus:border-pink-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white"
              >
                Gửi hướng dẫn đặt lại
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                to="/login" 
                className="flex items-center justify-center text-sm text-pink-600 hover:text-pink-500"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Quay lại đăng nhập
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
