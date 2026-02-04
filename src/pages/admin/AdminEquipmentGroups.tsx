"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
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
  title: string;
  description: string;
  coverImage?: { id: string } | null;
  equipmentCount: number;
}

const AdminEquipmentGroups = () => {
  const [groups, setGroups] = useState<EquipmentGroup[]>([]);
  const [images, setImages] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EquipmentGroup | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImageFile: null as File | null,
    imagePreview: "",
  });

  // ------------------------
  // Load groups + images
  // ------------------------
  const loadGroups = async () => {
    try {
      const { data } = await api.get("/groups");
      setGroups(data);

      data.forEach(async (item) => {
        if (item.coverImage && !images[item.id]) {
          try {
            const res = await api.get(`/Files/${item.coverImage.id}`, { responseType: "blob" });
            const url = URL.createObjectURL(res.data);
            setImages(prev => ({ ...prev, [item.id]: url }));
          } catch {
            // если не удалось загрузить картинку — игнорируем
          }
        }
      });
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  // ------------------------
  // Filtered groups
  // ------------------------
  const filteredGroups = groups.filter((item) =>
    (item.title ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ------------------------
  // Create / Edit
  // ------------------------
  const handleCreate = () => {
    setEditingItem(null);
    setFormData({ title: "", description: "", coverImageFile: null, imagePreview: "" });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: EquipmentGroup) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      coverImageFile: null,
      imagePreview: images[item.id] || "",
    });
    setIsDialogOpen(true);
  };

  // ------------------------
  // File select
  // ------------------------
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, coverImageFile: file, imagePreview: previewUrl });
    }
  };

  // ------------------------
  // Delete
  // ------------------------
  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить группу?")) return;
    try {
      await api.delete(`/groups/${id}`);
      toast.success("Группа удалена");
      await loadGroups();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  // ------------------------
  // Upload file
  // ------------------------
  const uploadFile = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    const res = await api.post("/Files", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.id;
  };

  // ------------------------
  // Submit form
  // ------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let coverImageId = editingItem?.coverImage?.id || null;

      if (formData.coverImageFile) {
        coverImageId = await uploadFile(formData.coverImageFile);
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        coverImage: coverImageId ? { id: coverImageId } : null,
      };

      if (editingItem) {
        await api.put(`/groups/${editingItem.id}`, payload);
        toast.success("Группа обновлена");
      } else {
        await api.post("/groups", payload);
        toast.success("Группа создана");
      }

      setIsDialogOpen(false);
      await loadGroups();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  // ------------------------
  // Render
  // ------------------------
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
                    <img
                      src={images[item.id] || "/placeholder.svg"}
                      alt={item.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="max-w-xs">
  <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.description }} />
</TableCell>
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
            <DialogTitle>{editingItem ? "Редактировать группу" : "Новая группа"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Название</Label>
              <Input
                id="name"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
              <Button type="submit">{editingItem ? "Сохранить" : "Создать"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEquipmentGroups;
