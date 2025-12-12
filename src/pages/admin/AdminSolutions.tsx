import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

interface Solution {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  advantages: string;
  image: string;
}

const mockSolutions: Solution[] = [
  { id: "1", name: "Системы водоподготовки", description: "Комплексные решения для очистки воды", fullDescription: "Полное описание...", advantages: "Экономия, надёжность, долговечность", image: "/placeholder.svg" },
  { id: "2", name: "Системы отопления", description: "Эффективные отопительные системы", fullDescription: "Полное описание...", advantages: "Энергоэффективность, автоматизация", image: "/placeholder.svg" },
];

const AdminSolutions = () => {
  const [solutions, setSolutions] = useState<Solution[]>(mockSolutions);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Solution | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    fullDescription: "",
    advantages: "",
    image: "",
  });

  const filteredSolutions = solutions.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({ name: "", description: "", fullDescription: "", advantages: "", image: "" });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Solution) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      fullDescription: item.fullDescription,
      advantages: item.advantages,
      image: item.image,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setSolutions(solutions.filter(item => item.id !== id));
    toast.success("Решение удалено");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      setSolutions(solutions.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData }
          : item
      ));
      toast.success("Решение обновлено");
    } else {
      const newItem: Solution = {
        id: Date.now().toString(),
        ...formData,
      };
      setSolutions([newItem, ...solutions]);
      toast.success("Решение создано");
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Готовые решения</h1>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Добавить решение
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по названию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Изображение</TableHead>
                <TableHead>Название</TableHead>
                <TableHead className="hidden md:table-cell">Описание</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSolutions.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img src={item.image} alt="" className="w-16 h-12 object-cover rounded" />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate">
                    {item.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Редактировать решение" : "Новое решение"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Название</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">URL изображения</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Краткое описание</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullDescription">Полное описание</Label>
              <Textarea
                id="fullDescription"
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="advantages">Преимущества</Label>
              <Textarea
                id="advantages"
                value={formData.advantages}
                onChange={(e) => setFormData({ ...formData, advantages: e.target.value })}
                rows={2}
                placeholder="Экономия, надёжность, долговечность"
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Отмена
              </Button>
              <Button type="submit">
                {editingItem ? "Сохранить" : "Создать"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSolutions;
