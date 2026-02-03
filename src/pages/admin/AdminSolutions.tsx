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
import { Plus, Pencil, Trash2, Search, Upload } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock equipment groups - in real app would come from API
const mockEquipmentGroups = [
  { id: "1", name: "Насосное оборудование" },
  { id: "2", name: "Компрессорное оборудование" },
  { id: "3", name: "Теплообменное оборудование" },
  { id: "4", name: "Запорная арматура" },
  { id: "5", name: "Электротехническое оборудование" },
];

interface Solution {
  id: string;
  name: string;
  groupId: string;
  year: string;
  city: string;
  customer: string;
  equipmentType: string;
  services: string;
  problemStage: string;
  solutionStage: string;
  resultStage: string;
  image: string;
}

const mockSolutions: Solution[] = [
  {
    id: "1",
    name: "Модернизация насосной станции",
    groupId: "1",
    year: "2023",
    city: "Москва",
    customer: "ООО Водоканал",
    equipmentType: "Насосное оборудование",
    services: "Проектирование, монтаж, пуско-наладка",
    problemStage: "Устаревшее оборудование с низким КПД",
    solutionStage: "Замена на современные энергоэффективные насосы",
    resultStage: "Снижение энергопотребления на 30%",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Автоматизация котельной",
    groupId: "3",
    year: "2024",
    city: "Санкт-Петербург",
    customer: "АО Теплосеть",
    equipmentType: "Котельное оборудование",
    services: "Автоматизация, техобслуживание",
    problemStage: "Ручное управление процессами",
    solutionStage: "Внедрение системы автоматического управления",
    resultStage: "Оптимизация работы и снижение аварийности",
    image: "/placeholder.svg",
  },
];

const AdminSolutions = () => {
  const [solutions, setSolutions] = useState<Solution[]>(mockSolutions);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Solution | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    groupId: "",
    year: "",
    city: "",
    customer: "",
    equipmentType: "",
    services: "",
    problemStage: "",
    solutionStage: "",
    resultStage: "",
    image: "",
  });

  // File upload states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const filteredSolutions = solutions.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      groupId: "",
      year: new Date().getFullYear().toString(),
      city: "",
      customer: "",
      equipmentType: "",
      services: "",
      problemStage: "",
      solutionStage: "",
      resultStage: "",
      image: "",
    });
    setImageFile(null);
    setImagePreview("");
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Solution) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      groupId: item.groupId,
      year: item.year,
      city: item.city,
      customer: item.customer,
      equipmentType: item.equipmentType,
      services: item.services,
      problemStage: item.problemStage,
      solutionStage: item.solutionStage,
      resultStage: item.resultStage,
      image: item.image,
    });
    setImageFile(null);
    setImagePreview(item.image);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setSolutions(solutions.filter((item) => item.id !== id));
    toast.success("Решение удалено");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const imageUrl = imagePreview || formData.image;

    if (editingItem) {
      setSolutions(
        solutions.map((item) =>
          item.id === editingItem.id
            ? { ...item, ...formData, image: imageUrl }
            : item
        )
      );
      toast.success("Решение обновлено");
    } else {
      const newItem: Solution = {
        id: Date.now().toString(),
        ...formData,
        image: imageUrl,
      };
      setSolutions([newItem, ...solutions]);
      toast.success("Решение создано");
    }

    setIsDialogOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
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
                <TableHead className="hidden md:table-cell">Группа</TableHead>
                <TableHead className="hidden md:table-cell">Год</TableHead>
                <TableHead className="hidden lg:table-cell">Город</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSolutions.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img
                      src={item.image}
                      alt=""
                      className="w-16 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {mockEquipmentGroups.find(g => g.id === item.groupId)?.name || "-"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.year}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {item.city}
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
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Редактировать решение" : "Новое решение"}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Group Selection */}
              <div className="space-y-2">
                <Label htmlFor="groupId">Группа оборудования</Label>
                <Select
                  value={formData.groupId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, groupId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите группу" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockEquipmentGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Название</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              {/* Year and City */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Год поставки</Label>
                  <Input
                    id="year"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    placeholder="2024"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Город</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="Для отметки на карте"
                  />
                </div>
              </div>

              {/* Customer */}
              <div className="space-y-2">
                <Label htmlFor="customer">Заказчик</Label>
                <Input
                  id="customer"
                  value={formData.customer}
                  onChange={(e) =>
                    setFormData({ ...formData, customer: e.target.value })
                  }
                />
              </div>

              {/* Equipment Type */}
              <div className="space-y-2">
                <Label htmlFor="equipmentType">Тип оборудования</Label>
                <Input
                  id="equipmentType"
                  value={formData.equipmentType}
                  onChange={(e) =>
                    setFormData({ ...formData, equipmentType: e.target.value })
                  }
                />
              </div>

              {/* Services */}
              <div className="space-y-2">
                <Label htmlFor="services">Услуги</Label>
                <Input
                  id="services"
                  value={formData.services}
                  onChange={(e) =>
                    setFormData({ ...formData, services: e.target.value })
                  }
                  placeholder="Проектирование, монтаж, пуско-наладка"
                />
              </div>

              {/* Image upload */}
              <div className="space-y-2">
                <Label>Изображение</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("solutionImageInput")?.click()
                    }
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Выбрать файл
                  </Button>
                  <input
                    id="solutionImageInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
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
                    className="w-full max-w-xs h-32 object-cover rounded border mt-2"
                  />
                )}
              </div>

              {/* Implementation Stages */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-lg">Этапы реализации</h3>

                <div className="space-y-2">
                  <Label htmlFor="problemStage">1. Проблема</Label>
                  <Textarea
                    id="problemStage"
                    value={formData.problemStage}
                    onChange={(e) =>
                      setFormData({ ...formData, problemStage: e.target.value })
                    }
                    rows={2}
                    placeholder="Описание исходной проблемы"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solutionStage">2. Решение</Label>
                  <Textarea
                    id="solutionStage"
                    value={formData.solutionStage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        solutionStage: e.target.value,
                      })
                    }
                    rows={2}
                    placeholder="Что было сделано"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resultStage">3. Итог</Label>
                  <Textarea
                    id="resultStage"
                    value={formData.resultStage}
                    onChange={(e) =>
                      setFormData({ ...formData, resultStage: e.target.value })
                    }
                    rows={2}
                    placeholder="Результат работы"
                  />
                </div>
              </div>

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
    </div>
  );
};

export default AdminSolutions;
