
import ServiceItem from './ServiceItem';

const ServiceList = ({ services, onEdit, onDelete }) => {
  return (
    <div className="grid gap-4">
      {services.map((service) => (
        <ServiceItem
          key={service.id}
          service={service}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ServiceList;
