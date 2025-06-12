
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  return (
    <Card className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50">
      <CardContent className="text-center py-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Cần tư vấn thêm về dịch vụ?
        </h3>
        <p className="text-gray-600 mb-6">
          Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn chi tiết về từng dịch vụ
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-pink-500 hover:bg-pink-600">
            Đặt lịch tư vấn
          </Button>
          <Button variant="outline">
            Gọi ngay: 1900-1234
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactSection;
