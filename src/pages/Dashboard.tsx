
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import DoctorManagement from '@/components/DoctorManagement';
import CustomerManagement from '@/components/CustomerManagement';
import { Users, UserPlus } from 'lucide-react';

const Dashboard = () => {
  const [stats] = useState({
    totalDoctors: 12,
    totalCustomers: 156,
    newCustomersThisMonth: 23,
    activeAppointments: 45
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bảng điều khiển quản lý</h1>
          <p className="text-gray-600">Quản lý bác sĩ và khách hàng của hệ thống</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng số bác sĩ</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-600">{stats.totalDoctors}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng số khách hàng</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-600">{stats.totalCustomers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Khách hàng mới tháng này</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.newCustomersThisMonth}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lịch hẹn đang hoạt động</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.activeAppointments}</div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Quản lý hệ thống</CardTitle>
            <CardDescription>
              Quản lý thông tin bác sĩ và khách hàng trong hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="doctors" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="doctors">Quản lý Bác sĩ</TabsTrigger>
                <TabsTrigger value="customers">Quản lý Khách hàng</TabsTrigger>
              </TabsList>
              
              <TabsContent value="doctors" className="mt-6">
                <DoctorManagement />
              </TabsContent>
              
              <TabsContent value="customers" className="mt-6">
                <CustomerManagement />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
