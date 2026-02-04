import { Link, useLocation, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Newspaper, 
  Layers, 
  Wrench, 
  Lightbulb,
  LogOut,
  Menu,
  X,
  FileText,
  Handshake
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const menuItems = [
  { title: "Новости", href: "/admin/news", icon: Newspaper },
  { title: "Статьи", href: "/admin/articles", icon: FileText },
  { title: "Группы оборудования", href: "/admin/equipment-groups", icon: Layers },
  { title: "Оборудование", href: "/admin/equipment", icon: Wrench },
  { title: "Решения", href: "/admin/solutions", icon: Lightbulb },
  { title: "Партнёры", href: "/admin/partners", icon: Handshake },
];

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    // TODO: Replace with actual logout logic
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-background border-b">
        <span className="font-bold text-lg">Админ-панель</span>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform lg:translate-x-0 lg:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b hidden lg:block">
              <h1 className="font-bold text-xl">Админ-панель</h1>
            </div>
            
            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                Выйти
              </Button>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-6 lg:p-8 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
