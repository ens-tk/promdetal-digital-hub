"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface Partner {
  id: number;
  name: string;
  image?: { id: string } | null;
}

const AdminPartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partner | null>(null);

  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ------------------------
  // Load partners
  // ------------------------
  const loadPartners = async () => {
    try {
      const res = await api.get("/partners");
      setPartners(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Ошибка загрузки партнёров");
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  const getImageUrl = (image?: { id: string } | null) =>
    image
      ? `http://localhost:8080/promdetal/api/Files/${image.id}`
      : "/placeholder.svg";

  // ------------------------
  // Upload image
  // ------------------------
  const uploadImage = async (file: File) => {
    const form = new FormData();
    form.append("file", file);

    const res = await api.post("/Files", form, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.id;
  };

  // ------------------------
  // Create / Edit
  // ------------------------
  const handleCreate = () => {
    setEditingItem(null);
    setName("");
    setImageFile(null);
    setImagePreview("");
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Partner) => {
    setEditingItem(item);
    setName(item.name);
    setImageFile(null);
    setImagePreview(getImageUrl(item.image));
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let image = editingItem?.image ?? null;

      if (imageFile) {
        image = { id: await uploadImage(imageFile) };
      }

      const payload = { name, image };

      if (editingItem) {
        await api.put(`/partners/${editingItem.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Партнёр обновлён");
      } else {
        await api.post("/partners", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Партнёр добавлен");
      }

      setIsDialogOpen(false);
      loadPartners();
    } catch (err) {
      console.error(err);
      toast.error("Ошибка сохранения партнёра");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить партнёра?")) return;
    try {
      await api.delete(`/partners/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPartners((p) => p.filter((x) => x.id !== id));
      toast.success("Партнёр удалён");
    } catch {
      toast.error("Ошибка удаления");
    }
  };

  const filteredPartners = partners.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ------------------------
  // Render
  // ------------------------
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Партнёры</h1>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Добавить партнёра
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <Input
              placeholder="Поиск..."
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
                <TableHead>Логотип</TableHead>
                <TableHead>Название</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img
                      src={getImageUrl(item.image)}
                      className="w-20 h-12 object-contain bg-muted p-1 rounded"
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>



<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Редактировать партнёра" : "Новый партнёр"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Название</Label>
 <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Логотип</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("partnerImageInput")?.click()
                  }
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Выбрать файл
                </Button>
                <input
                  id="partnerImageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                  }}}
                />
                {imageFile && (
                  <span className="text-sm text-muted-foreground">
                    {imageFile.name}
                  </span>
                )}
              </div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-w-xs h-24 object-contain rounded border mt-2 bg-muted p-2"
                />
              )}
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
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
    
export default AdminPartners;
