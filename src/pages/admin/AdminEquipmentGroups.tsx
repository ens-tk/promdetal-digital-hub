import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/admin/RichTextEditor";
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
import { Plus, Pencil, Trash2, Search, Upload } from "lucide-react";
import { toast } from "sonner";

interface EquipmentGroup {
  id: string;
  name: string;
  description: string;
  image: string;
  imageFile?: File | null;
  equipmentCount: number;
}

const mockGroups: EquipmentGroup[] = [
  { id: "1", name: "Насосное оборудование", description: "Насосы различных типов", image: "/placeholder.svg", equipmentCount: 8 },
  { id: "2", name: "Компрессорное оборудование", description: "Компрессоры и системы сжатия", image: "/placeholder.svg", equipmentCount: 5 },
  { id: "3", name: "Теплообменное оборудование", description: "Теплообменники и котлы", image: "/placeholder.svg", equipmentCount: 6 },
];

const AdminEquipmentGroups = () => {
  const [groups, setGroups] = useState<EquipmentGroup[]>(mockGroups);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EquipmentGroup | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageFile: null as File | null,
    imagePreview: "",
  });

  const filteredGroups = groups.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({ name: "", description: "", imageFile: null, imagePreview: "" });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: EquipmentGroup) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      imageFile: null,
      imagePreview: item.image,
    });
    setIsDialogOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, imageFile: file, imagePreview: previewUrl });
    }
  };

  const handleDelete = (id: string) => {
    setGroups(groups.filter(item => item.id !== id));
    toast.success("Группа удалена");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const imageUrl = formData.imagePreview || "/placeholder.svg";
    
    if (editingItem) {
      setGroups(groups.map(item => 
        item.id === editingItem.id 
          ? { ...item, name: formData.name, description: formData.description, image: imageUrl }
          : item
      ));
      toast.success("Группа обновлена");
    } else {
      const newItem: EquipmentGroup = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        image: imageUrl,
        equipmentCount: 0,
      };
      setGroups([newItem, ...groups]);
      toast.success("Группа создана");
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Группы оборудования</h1>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Добавить группу
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
                <TableHead>Описание</TableHead>
                <TableHead>Оборудования</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGroups.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img src={item.image} alt="" className="w-16 h-12 object-cover rounded" />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                  <TableCell>{item.equipmentCount}</TableCell>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Редактировать группу" : "Новая группа"}
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
              <Label>Изображение</Label>
              {formData.imagePreview && (
                <div className="mb-2">
                  <img 
                    src={formData.imagePreview} 
                    alt="Preview" 
                    className="w-32 h-24 object-cover rounded border"
                  />
                </div>
              )}
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="group-image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("group-image-upload")?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {formData.imagePreview ? "Изменить картинку" : "Загрузить картинку"}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <RichTextEditor
                value={formData.description}
                onChange={(description) => setFormData({ ...formData, description })}
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

export default AdminEquipmentGroups;
