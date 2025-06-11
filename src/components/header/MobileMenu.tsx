
import { Button } from '@/components/ui/button';
import { X, Menu } from 'lucide-react';
import Navigation from './Navigation';
import AuthSection from './AuthSection';

interface MobileMenuProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  isLoggedIn: boolean;
}

const MobileMenu = ({ isMenuOpen, onToggleMenu, isLoggedIn }: MobileMenuProps) => {
  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 space-y-2">
          <div className="space-y-2">
            <Navigation onLinkClick={onToggleMenu} />
          </div>
          <div className="pt-4 space-y-2">
            <AuthSection isLoggedIn={isLoggedIn} onLinkClick={onToggleMenu} />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
