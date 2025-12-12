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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Equipment {
  id: string;
  name: string;
  group: string;
  groupId: string;
  description: string;
  specifications: string;
  image: string;
}

const mockGroups = [
  { id: "1", name: "Насосное оборудование" },
  { id: "2", name: "Компрессорное оборудование" },
  { id: "3", name: "Теплообменное оборудование" },
];

const mockEquipment: Equipment[] = [
  { id: "1", name: "Центробежный насос ЦН-100", group: "Насосное оборудование", groupId: "1", description: "Высокопроизводительный насос", specifications: "Мощность: 100 кВт", image: "/placeholder.svg" },
  { id: "2", name: "Винтовой компрессор ВК-50", group: "Компрессорное оборудование", groupId: "2", description: "Компактный компрессор", specifications: "Давление: 10 бар", image: "/placeholder.svg" },
];

const AdminEquipment = () => {
  const [equipment, setEquipment] = useState<Equipment[]>(mockEquipment);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Equipment | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    groupId: "",
    description: "",
    specifications: "",
    image: "",
  });

  const filteredEquipment = equipment.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({ name: "", groupId: "", description: "", specifications: "", image: "" });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Equipment) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      groupId: item.groupId,
      description: item.description,
      specifications: item.specifications,
      image: item.image,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setEquipment(equipment.filter(item => item.id !== id));
    toast.success("Оборудование удалено");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const group = mockGroups.find(g => g.id === formData.groupId);
    
    if (editingItem) {
      setEquipment(equipment.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData, group: group?.name || "" }
          : item
      ));
      toast.success("Оборудование обновлено");
    } else {
      const newItem: Equipment = {
        id: Date.now().toString(),
        ...formData,
        group: group?.name || "",
      };
      setEquipment([newItem, ...equipment]);
      toast.success("Оборудование создано");
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Оборудование</h1>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Добавить оборудование
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
                <TableHead>Группа</TableHead>
                <TableHead className="hidden md:table-cell">Описание</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEquipment.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img src={item.image} alt="" className="w-16 h-12 object-cover rounded" />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.group}</Badge>
                  </TableCell>
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
              {editingItem ? "Редактировать оборудование" : "Новое оборудование"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="group">Группа</Label>
                <Select
                  value={formData.groupId}
                  onValueChange={(value) => setFormData({ ...formData, groupId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите группу" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specifications">Характеристики</Label>
              <Textarea
                id="specifications"
                value={formData.specifications}
                onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                rows={3}
                placeholder="Мощность: 100 кВт&#10;Давление: 10 бар"
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

export default AdminEquipment;
