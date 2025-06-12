
import { useState } from 'react';
import Header from '@/components/Header';
import ServiceCard from '@/components/services/ServiceCard';
import CategoryFilter from '@/components/services/CategoryFilter';
import ContactSection from '@/components/services/ContactSection';
import { services } from '@/data/services';
import { getCategoryColor } from '@/utils/serviceUtils';

const ServiceListPricing = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả', count: services.length },
    { id: 'basic', name: 'Cơ bản', count: services.filter(s => s.category === 'basic').length },
    { id: 'advanced', name: 'Nâng cao', count: services.filter(s => s.category === 'advanced').length },
    { id: 'premium', name: 'Cao cấp', count: services.filter(s => s.category === 'premium').length },
    { id: 'support', name: 'Hỗ trợ', count: services.filter(s => s.category === 'support').length }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dịch vụ & Bảng giá</h1>
          <p className="text-gray-600">Tổng quan về các dịch vụ hỗ trợ sinh sản tại FertilityCare</p>
        </div>

        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              getCategoryColor={getCategoryColor}
            />
          ))}
        </div>

        <ContactSection />
      </div>
    </div>
  );
};

export default ServiceListPricing;
