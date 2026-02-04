import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "@/lib/api";
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
import { Plus, Pencil, Trash2, Search, Upload } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EquipmentGroup {
  id: string;
  title: string;
}

interface Solution {
  id: string;
  title: string;
  groupId: string;
  year: number;
  city: string;
  customer: string;
  equipmentType: string;
  services: string;
  problem: string;
  solution: string;
  result: string;
  imageId?: string;
}

const AdminSolutions = () => {
  const [groups, setGroups] = useState<EquipmentGroup[]>([]);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Solution | null>(null);
  const [formData, setFormData] = useState<Partial<Solution>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Загрузка групп
    api.get("/groups")
      .then(res => {
        if (Array.isArray(res.data)) setGroups(res.data);
        else toast.error("Неверный формат групп");
      })
      .catch(() => toast.error("Не удалось загрузить группы"));

    // Загрузка решений
    api.get("/cases")
      .then(res => {
        if (Array.isArray(res.data)) setSolutions(res.data);
        else toast.error("Неверный формат решений");
      })
      .catch(() => toast.error("Не удалось загрузить решения"));
  }, []);

  const filteredSolutions = solutions.filter((s) =>
    s.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({});
    setImageFile(null);
    setImagePreview("");
    setIsDialogOpen(true);
  };

const handleEdit = (item: Solution) => {
  setEditingItem(item);
  setFormData(item);
  setImagePreview(item.imageId ? getFileUrl(item.imageId) : "");
  setImageFile(null);
  setIsDialogOpen(true);
};


const uploadFile = async (file: File) => {
  const data = new FormData();
  data.append("file", file);
  const res = await api.post("/Files", data, { headers: { "Content-Type": "multipart/form-data" } });
  return res.data.id; // предполагаем, что бэк возвращает {id: "..." }
};


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    let imageId = formData.imageId;
    if (imageFile) {
      imageId = await uploadFile(imageFile);
    }

    const payload = {
      ...formData,
      imageId, // для бэка
    };

    if (editingItem) {
      await api.put(`/cases/${editingItem.id}`, payload);
      toast.success("Решение обновлено");
    } else {
      await api.post(`/groups/${formData.groupId}/cases`, payload);
      toast.success("Решение создано");
    }

    // Обновляем список
    const res = await api.get("/cases");
    setSolutions(res.data);
    setIsDialogOpen(false);
  } catch (err) {
    console.error(err);
    toast.error("Ошибка при сохранении решения");
  }
};


  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/cases/${id}`);
      setSolutions(solutions.filter((s) => s.id !== id));
      toast.success("Решение удалено");
    } catch {
      toast.error("Ошибка при удалении");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const getFileUrl = (id?: string) => {
  if (!id) return "/placeholder.svg";
  // api.defaults.baseURL уже содержит http://localhost:8080/promdetal/api
  return `${api.defaults.baseURL}/Files/${id}`;
};

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Готовые решения</h1>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Добавить решение
        </Button>
      </div>

      {/* Table */}
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
                <TableHead className="hidden md:table-cell">Группа</TableHead>
                <TableHead className="hidden md:table-cell">Год</TableHead>
                <TableHead className="hidden lg:table-cell">Город</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSolutions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <img
  src={getFileUrl(s.imageId)}
  alt={s.title}
  className="w-16 h-12 object-cover rounded"
/>
                  </TableCell>
                  <TableCell>{s.title}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {groups.find(g => g.id === s.groupId)?.title || "-"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{s.year}</TableCell>
                  <TableCell className="hidden lg:table-cell">{s.city}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(s)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)}>
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

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Редактировать решение" : "Новое решение"}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Group */}
              <Label>Группа оборудования</Label>
              <Select
                value={formData.groupId}
                onValueChange={(v) => setFormData({ ...formData, groupId: v })}
              >
                <SelectTrigger><SelectValue placeholder="Выберите группу" /></SelectTrigger>
                <SelectContent>
                  {groups.map(g => (
                    <SelectItem key={g.id} value={g.id.toString()}>{g.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Name */}
              <Label>Название</Label>
              <Input
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />

              {/* Year & City */}
<Input
  type="number"
  placeholder="Год"
  value={formData.year ?? ""}
  onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
/>

              <Input
                placeholder="Город"
                value={formData.city || ""}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />

              {/* Customer, Type, Services */}
              <Input
                placeholder="Заказчик"
                value={formData.customer || ""}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              />
              <Input
                placeholder="Тип оборудования"
                value={formData.equipmentType || ""}
                onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
              />
              <Input
                placeholder="Услуги"
                value={formData.services || ""}
                onChange={(e) => setFormData({ ...formData, services: e.target.value })}
              />

              {/* Image */}
              <Button type="button" onClick={() => document.getElementById("solutionImage")?.click()}>
                <Upload /> Выбрать изображение
              </Button>
              <input type="file" id="solutionImage" className="hidden" onChange={handleImageChange} />
              {imagePreview && <img src={imagePreview} className="w-32 h-32 object-cover mt-2" />}

              {/* Problem, Solution, Result */}
              <Textarea
                placeholder="Проблема"
                value={formData.problem || ""}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
              />
              <Textarea
                placeholder="Решение"
                value={formData.solution || ""}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              />
              <Textarea
                placeholder="Итог"
                value={formData.result || ""}
                onChange={(e) => setFormData({ ...formData, result: e.target.value })}
              />

              <Button type="submit">{editingItem ? "Сохранить" : "Создать"}</Button>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSolutions;
