
import { Button } from '@/components/ui/button';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className={selectedCategory === category.id ? "bg-pink-500 hover:bg-pink-600" : ""}
          >
            {category.name} ({category.count})
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
