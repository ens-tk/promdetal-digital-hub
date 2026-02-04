import { useState, useEffect } from "react";
import { api } from "@/lib/api"; // твой axios
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Plus, Pencil, Trash2, Search, X, MapPin, Upload } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  EquipmentIconPicker,
  getIconById,
} from "@/components/admin/EquipmentIconPicker";
import {
  ImageHotspotEditor,
  Hotspot,
} from "@/components/admin/ImageHotspotEditor";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Advantage {
  id: string;
  iconId: string;
  text: string;
}

interface Equipment {
  id: string;
  title: string;
  group: string;
  groupId: string;
  shortDescription: string;
  fullDescription: string;
  mainImageId?: string | null;
  hotspotImageId?: string | null;
  showOnMain: boolean;
  advantages: Advantage[];
  hotspots: Hotspot[];
  videoUrl: string;
  searchKeywords: string;
}



interface EquipmentGroup {
  id: string;
  title: string;
}

const AdminEquipment = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [groups, setGroups] = useState<EquipmentGroup[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Equipment | null>(null);const [images, setImages] = useState<Record<string, string>>({});
const [hotspotImages, setHotspotImages] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<Omit<Equipment, "id" | "group">>({
    title: "",
    groupId: "",
    shortDescription: "",
    fullDescription: "",
    mainImageId: null,
    hotspotImageId: null,
    showOnMain: false,
    advantages: [],
    hotspots: [],
    videoUrl: "",
    searchKeywords: "",
  });
const [imageFile, setImageFile] = useState<File | null>(null);
const [hotspotImageFile, setHotspotImageFile] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string>("");
  const [hotspotImagePreview, setHotspotImagePreview] = useState<string>("");

  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [editingAdvantageIndex, setEditingAdvantageIndex] = useState<number | null>(null);
  const [isHotspotEditorOpen, setIsHotspotEditorOpen] = useState(false);

  // Загрузка данных с бэка
useEffect(() => {
  const fetchData = async () => {
    try {
      const [eqRes, grRes] = await Promise.all([
        api.get<Equipment[]>("/equipment"),
        api.get<EquipmentGroup[]>("/groups"),
      ]);

      const equipmentData = eqRes.data;
      setEquipment(equipmentData);
      setGroups(grRes.data);

      // Загружаем все картинки
      const imagePromises = equipmentData.map(async (item) => {
        if (!item.mainImageId) return [item.id, undefined] as const;
        const res = await api.get(`/Files/${item.mainImageId}`, { responseType: "blob" });
        const url = URL.createObjectURL(res.data);
        return [item.id, url] as const;
      });

      const results = await Promise.all(imagePromises);
      const imagesMap: Record<string, string> = {};
      results.forEach(([id, url]) => {
        if (url) imagesMap[id] = url;
      });
      setImages(imagesMap);

      // Аналогично для hotspotImages
      const hotspotPromises = equipmentData.map(async (item) => {
        if (!item.hotspotImageId) return [item.id, undefined] as const;
        const res = await api.get(`/Files/${item.hotspotImageId}`, { responseType: "blob" });
        const url = URL.createObjectURL(res.data);
        return [item.id, url] as const;
      });

      const hotspotResults = await Promise.all(hotspotPromises);
      const hotspotMap: Record<string, string> = {};
      hotspotResults.forEach(([id, url]) => {
        if (url) hotspotMap[id] = url;
      });
      setHotspotImages(hotspotMap);

    } catch (error) {
      console.error(error);
      toast.error("Не удалось загрузить данные с сервера");
    }
  };

  fetchData();
}, []);



const filteredEquipment = equipment.filter((item) =>
  (item.title ?? "").toLowerCase().includes(searchQuery.toLowerCase())
);

const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

const uploadFile = async (file: File) => {
  const token = localStorage.getItem("token");
  const data = new FormData();
  data.append("file", file);
  const res = await api.post("/Files", data, {
    headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
  });
  return res.data.id;
};



const getFileUrl = (id?: string) =>
  id ? `http://localhost:8080/promdetal/api/Files/${id}` : "/placeholder.svg";

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      groupId: "",
      shortDescription: "",
      fullDescription: "",
      mainImageId: null,
      hotspotImageId: null,
      showOnMain: false,
      advantages: [],
      hotspots: [],
      videoUrl: "",
      searchKeywords: "",
    });
    setImageFile(null);
    setImagePreview("");
    setHotspotImageFile(null);
    setHotspotImagePreview("");
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Equipment) => {
setEditingItem(item);
setFormData({
  title: item.title,
  groupId: item.groupId,
  shortDescription: item.shortDescription,
  fullDescription: item.fullDescription,
  mainImageId: item.mainImageId ?? null,
  hotspotImageId: item.hotspotImageId ?? null,
  showOnMain: item.showOnMain,
  advantages: [...item.advantages],
  hotspots: [...item.hotspots],
  videoUrl: item.videoUrl,
  searchKeywords: item.searchKeywords,
});
setImageFile(null);
setImagePreview(getFileUrl(item.mainImageId));           // <-- URL для preview
setHotspotImageFile(null);
setHotspotImagePreview(getFileUrl(item.hotspotImageId));
setIsDialogOpen(true);
};

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/equipment/${id}`);
      setEquipment(equipment.filter((item) => item.id !== id));
      toast.success("Оборудование удалено");
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при удалении оборудования");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
const mainImageId = imageFile
  ? await uploadFile(imageFile)      // возвращает UUID
  : editingItem?.mainImageId || null;

const hotspotImageId = hotspotImageFile
  ? await uploadFile(hotspotImageFile)
  : editingItem?.hotspotImageId || null;

const dto = {
  title: formData.title,
  groupId: formData.groupId,
  shortDescription: formData.shortDescription,
  fullDescription: formData.fullDescription,
  showOnMain: formData.showOnMain,
  videoUrl: formData.videoUrl,
  searchKeywords: formData.searchKeywords,
  advantages: formData.advantages,
  hotspots: formData.hotspots,
  mainImageId,        // <-- теперь UUID
  hotspotImageId,     // <-- теперь UUID
};

    if (editingItem) {
      await api.put(`/equipment/${editingItem.id}`, dto, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Оборудование обновлено");
    } else {
      await api.post("/equipment", dto, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Оборудование создано");
    }

    setIsDialogOpen(false);
    // Перезагружаем с сервера, чтобы обновились превью и данные
    const eqRes = await api.get<Equipment[]>("/equipment");
    setEquipment(eqRes.data);
  } catch (err) {
    console.error(err);
    toast.error("Ошибка при сохранении оборудования");
  }
};



  // Преимущества
  const handleAddAdvantage = () => {
    setFormData({
      ...formData,
      advantages: [
        ...formData.advantages,
        { id: Date.now().toString(), iconId: "zap", text: "" },
      ],
    });
  };

  const handleRemoveAdvantage = (index: number) => {
    setFormData({
      ...formData,
      advantages: formData.advantages.filter((_, i) => i !== index),
    });
  };

  const handleAdvantageTextChange = (index: number, text: string) => {
    setFormData({
      ...formData,
      advantages: formData.advantages.map((adv, i) =>
        i === index ? { ...adv, text } : adv
      ),
    });
  };

  const handleOpenIconPicker = (index: number) => {
    setEditingAdvantageIndex(index);
    setIsIconPickerOpen(true);
  };

  const handleSelectIcon = (iconId: string) => {
    if (editingAdvantageIndex === null) return;
    setFormData({
      ...formData,
      advantages: formData.advantages.map((adv, i) =>
        i === editingAdvantageIndex ? { ...adv, iconId } : adv
      ),
    });
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
                <TableHead className="hidden md:table-cell">
                  На главной
                </TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEquipment.map((item) => (
                <TableRow key={item.id}>
<TableCell>
<img
  src={item.mainImageId ? getFileUrl(item.mainImageId) : "/placeholder.svg"}
  className="w-16 h-12 object-cover rounded"
  alt={item.title}
/>
</TableCell>

                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
  <Badge variant="secondary">
    {groups.find((g) => g.id === item.groupId)?.title || "—"}
  </Badge>
</TableCell>

                  <TableCell className="hidden md:table-cell">
                    {item.showOnMain ? (
                      <Badge variant="default">Да</Badge>
                    ) : (
                      <Badge variant="outline">Нет</Badge>
                    )}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              {editingItem
                ? "Редактировать оборудование"
                : "Новое оборудование"}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Название</Label>
                  <Input
                    id="name"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="group">Группа</Label>
                  <Select
  value={formData.groupId} // должно быть string
  onValueChange={(value) =>
    setFormData({ ...formData, groupId: value })
  }
>
  <SelectTrigger>
    <SelectValue placeholder="Выберите группу" />
  </SelectTrigger>
  <SelectContent>
    {groups.map((group) => (
      <SelectItem key={group.id} value={group.id.toString()}>
        {group.title}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

                </div>
              </div>

              {/* Short description */}
              <div className="space-y-2">
                <Label htmlFor="shortDescription">Короткое описание</Label>
                <Input
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, shortDescription: e.target.value })
                  }
                  placeholder="Краткое описание для карточки"
                />
              </div>

              {/* Long description */}
              <div className="space-y-2">
                <Label htmlFor="fullDescription">Длинное описание</Label>
                <Textarea
                  id="fullDescription"
                  value={formData.fullDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, fullDescription: e.target.value })
                  }
                  rows={4}
                  placeholder="Подробное описание оборудования"
                />
              </div>

              {/* Main Image - File Upload */}
              <div className="space-y-2">
                <Label>Основное изображение</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("mainImageInput")?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Выбрать файл
                  </Button>
                  <input
                    id="mainImageInput"
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
                    <span className="text-sm text-muted-foreground">{imageFile.name}</span>
                  )}
                </div>
                {imagePreview && (
<img
  src={imagePreview || getFileUrl(editingItem.mainImageId)}
  alt="Preview"
  className="w-full max-w-xs h-32 object-cover rounded border mt-2"
/>
                )}
              </div>

              {/* Hotspot Image - File Upload */}
              <div className="space-y-2">
                <Label>Изображение для интерактивных точек</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("hotspotImageInput")?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Выбрать файл
                  </Button>
                  <input
                    id="hotspotImageInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setHotspotImageFile(file);
                        setHotspotImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsHotspotEditorOpen(true)}
                    disabled={!hotspotImagePreview}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Точки ({formData.hotspots.length})
                  </Button>
                </div>
                {hotspotImagePreview && (
<img
  src={hotspotImagePreview || getFileUrl(editingItem.hotspotImageId)}
  alt="Hotspot Preview"
  className="w-full max-w-xs h-32 object-cover rounded border mt-2"
/>
                )}
              </div>

              {/* Show on homepage */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showOnMain"
                  checked={formData.showOnMain}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      showOnMain: checked === true,
                    })
                  }
                />
                <Label htmlFor="showOnMain" className="cursor-pointer">
                  Показывать на главной странице
                </Label>
              </div>

              {/* Video URL */}
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Видео (Rutube URL)</Label>
                <Input
                  id="videoUrl"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                  placeholder="https://rutube.ru/video/..."
                />
              </div>

              {/* Search Keywords */}
              <div className="space-y-2">
                <Label htmlFor="searchKeywords">Ключевые слова для поиска</Label>
                <Input
                  id="searchKeywords"
                  value={formData.searchKeywords}
                  onChange={(e) =>
                    setFormData({ ...formData, searchKeywords: e.target.value })
                  }
                  placeholder="Синонимы через запятую: помпа, водяной насос"
                />
                <p className="text-xs text-muted-foreground">
                  Альтернативные названия для улучшения поиска
                </p>
              </div>

              {/* Advantages */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Преимущества</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddAdvantage}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Добавить
                  </Button>
                </div>

                {formData.advantages.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Преимущества не добавлены
                  </p>
                )}

                <div className="space-y-2">
                  {formData.advantages.map((advantage, index) => {
                    const iconData = getIconById(advantage.iconId);
                    const IconComponent = iconData?.icon;

                    return (
                      <div
                        key={advantage.id}
                        className="flex items-center gap-2 p-2 border rounded-lg"
                      >
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="shrink-0"
                          onClick={() => handleOpenIconPicker(index)}
                          title="Выбрать иконку"
                        >
                          {IconComponent && <IconComponent className="w-4 h-4" />}
                        </Button>
                        <Input
                          value={advantage.text}
                          onChange={(e) =>
                            handleAdvantageTextChange(index, e.target.value)
                          }
                          placeholder="Текст преимущества"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveAdvantage(index)}
                        >
                          <X className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit buttons */}
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

      {/* Icon picker dialog */}
      <EquipmentIconPicker
        open={isIconPickerOpen}
        onOpenChange={setIsIconPickerOpen}
        onSelect={handleSelectIcon}
        selectedIcon={
          editingAdvantageIndex !== null
            ? formData.advantages[editingAdvantageIndex]?.iconId
            : undefined
        }
      />

      {/* Hotspot editor dialog */}
      <ImageHotspotEditor
        open={isHotspotEditorOpen}
        onOpenChange={setIsHotspotEditorOpen}
        imageUrl={hotspotImagePreview}
        hotspots={formData.hotspots}
        onHotspotsChange={(hotspots) => setFormData({ ...formData, hotspots })}
      />
    </div>
  );
};

export default AdminEquipment;
