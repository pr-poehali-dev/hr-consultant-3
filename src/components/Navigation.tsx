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
    { path: '/projects', label: 'Мои проекты', icon: 'FolderOpen' },
    { path: '/certificates', label: 'Сертификаты', icon: 'Award' },
    { path: '/career', label: 'Карьера', icon: 'TrendingUp' },
    { path: '/development', label: 'План', icon: 'ListChecks' },
    { path: '/resources', label: 'Ресурсы', icon: 'BookOpen' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex items-center gap-2 px-6 py-4 whitespace-nowrap border-b-2 transition-colors",
                isActive(item.path)
                  ? "text-primary border-primary font-medium"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground/50"
              )}
            >
              <Icon name={item.icon as any} size={18} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;