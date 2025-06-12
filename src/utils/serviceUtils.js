
export const getCategoryColor = (category) => {
  switch (category) {
    case 'basic': return 'bg-green-100 text-green-800';
    case 'advanced': return 'bg-blue-100 text-blue-800';
    case 'premium': return 'bg-purple-100 text-purple-800';
    case 'support': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
