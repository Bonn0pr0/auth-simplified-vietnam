
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Heart className="h-8 w-8 text-pink-500" />
      <span className="text-xl font-bold text-gray-900">FertilityCare</span>
    </div>
  );
};

export default Logo;
