import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, Layers, Wrench, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { title: "Новости", count: 12, href: "/admin/news", icon: Newspaper, color: "text-blue-500" },
  { title: "Группы оборудования", count: 5, href: "/admin/equipment-groups", icon: Layers, color: "text-green-500" },
  { title: "Оборудование", count: 24, href: "/admin/equipment", icon: Wrench, color: "text-orange-500" },
  { title: "Решения", count: 8, href: "/admin/solutions", icon: Lightbulb, color: "text-purple-500" },
];

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Дашборд</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.href} to={stat.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.count}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
