import { useState, useEffect } from "react";
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
import { Plus, Pencil, Trash2, Search, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  EquipmentIconPicker,
  getIconById,
} from "@/components/admin/EquipmentIconPicker";

interface Service {
  id: number;
  title: string;
  description: string;
  imageId?: string | null;
  features: string[];
  iconId?: string | null;
}

const emptyForm = (): Omit<Service, "id"> => ({
  title: "",
  description: "",
  imageId: null,
  features: [],
  iconId: null,
});

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Omit<Service, "id">>(emptyForm());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

  const getFileUrl = (id?: string | null) =>
    id
      ? `http://157.22.174.170:8080/promdetal/api/Files/${id}`
      : "/placeholder.svg";

  const loadServices = async () => {
    try {
      const res = await api.get<Service[]>("/services");
      setServices(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Ошибка загрузки услуг");
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const uploadFile = async (file: File): Promise<string> => {
    const form = new FormData();
    form.append("file", file);
    const res = await api.post("/Files", form);
    return res.data.id;
  };

  const handleCreate = () => {
    setEditingItem(null);
    setFormData(emptyForm());
    setImageFile(null);
    setImagePreview("");
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Service) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      imageId: item.imageId ?? null,
      features: [...item.features],
      iconId: item.iconId ?? null,
    });
    setImageFile(null);
    setImagePreview(item.imageId ? getFileUrl(item.imageId) : "");
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить услугу?")) return;
    try {
      await api.delete(`/services/${id}`);
      setServices((prev) => prev.filter((s) => s.id !== id));
      toast.success("Услуга удалена");
    } catch {
      toast.error("Ошибка удаления");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageId = formData.imageId;
      if (imageFile) {
        imageId = await uploadFile(imageFile);
      }

      const payload = { ...formData, imageId };

      if (editingItem) {
        await api.put(`/services/${editingItem.id}`, payload);
        toast.success("Услуга обновлена");
      } else {
        await api.post("/services", payload);
        toast.success("Услуга создана");
      }

      setIsDialogOpen(false);
      loadServices();
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при сохранении");
    }
  };

  // --- Features helpers ---
  const addFeature = () =>
    setFormData((f) => ({ ...f, features: [...f.features, ""] }));

  const removeFeature = (idx: number) =>
    setFormData((f) => ({
      ...f,
      features: f.features.filter((_, i) => i !== idx),
    }));

  const updateFeature = (idx: number, value: string) =>
    setFormData((f) => ({
      ...f,
      features: f.features.map((v, i) => (i === idx ? value : v)),
    }));

  const filtered = services.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const IconComponent = formData.iconId
    ? getIconById(formData.iconId)?.icon
    : null;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Услуги и сервисы</h1>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Добавить услугу
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
                <TableHead className="hidden md:table-cell">
                  Пунктов включено
                </TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img
                      src={getFileUrl(item.imageId)}
                      alt={item.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.features.length}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
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
            <DialogTitle>
              {editingItem ? "Редактировать услугу" : "Новая услуга"}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <Label>Название</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Описание</Label>
                <Textarea
                  rows={5}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Подробное описание услуги..."
                />
              </div>

              {/* Icon */}
              <div className="space-y-2">
                <Label>Иконка</Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsIconPickerOpen(true)}
                    className="gap-2"
                  >
                    {IconComponent ? (
                      <IconComponent className="w-4 h-4" />
                    ) : null}
                    {formData.iconId
                      ? getIconById(formData.iconId)?.label
                      : "Выбрать иконку"}
                  </Button>
                  {formData.iconId && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setFormData({ ...formData, iconId: null })
                      }
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Image */}
              <div className="space-y-2">
                <Label>Изображение</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("serviceImageInput")?.click()
                    }
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Выбрать файл
                  </Button>
                  <input
                    id="serviceImageInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImageFile(file);
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
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
                    className="max-w-xs max-h-48 object-contain rounded border mt-2"
                  />
                )}
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Что включено</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFeature}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Добавить пункт
                  </Button>
                </div>
                {formData.features.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Пункты не добавлены
                  </p>
                )}
                <div className="space-y-2">
                  {formData.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={f}
                        onChange={(e) => updateFeature(idx, e.target.value)}
                        placeholder={`Пункт ${idx + 1}`}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeature(idx)}
                      >
                        <X className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
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
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Icon Picker */}
      <EquipmentIconPicker
        open={isIconPickerOpen}
        onOpenChange={setIsIconPickerOpen}
        onSelect={(iconId) => setFormData((f) => ({ ...f, iconId }))}
        selectedIcon={formData.iconId ?? undefined}
      />
    </div>
  );
};

export default AdminServices;
