import { useNavigate, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Главная', icon: 'Home' },
    { path: '/diagnostic', label: 'Диагностика', icon: 'ClipboardCheck' },
    { path: '/profile', label: 'Профиль', icon: 'User' },
    { path: '/career', label: 'Карьера', icon: 'TrendingUp' },
    { path: '/development', label: 'План', icon: 'ListChecks' },
    { path: '/resources', label: 'Ресурсы', icon: 'BookOpen' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex items-center gap-2 px-4 py-3.5 whitespace-nowrap transition-colors relative min-w-fit",
                isActive(item.path)
                  ? "text-cyan-500 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-500"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Icon name={item.icon as any} size={16} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;