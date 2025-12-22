import { useState } from "react";
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
import { Plus, Pencil, Trash2, Search, X, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  EquipmentIconPicker,
  getIconById,
  availableIcons,
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
  name: string;
  group: string;
  groupId: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  showOnHomepage: boolean;
  advantages: Advantage[];
  hotspots: Hotspot[];
}

const mockGroups = [
  { id: "1", name: "Насосное оборудование" },
  { id: "2", name: "Компрессорное оборудование" },
  { id: "3", name: "Теплообменное оборудование" },
];

const mockEquipment: Equipment[] = [
  {
    id: "1",
    name: "Центробежный насос ЦН-100",
    group: "Насосное оборудование",
    groupId: "1",
    shortDescription: "Высокопроизводительный насос",
    longDescription:
      "Центробежный насос ЦН-100 предназначен для перекачивания чистых жидкостей. Отличается высокой надёжностью и эффективностью.",
    image: "/placeholder.svg",
    showOnHomepage: true,
    advantages: [
      { id: "1", iconId: "zap", text: "Энергоэффективность" },
      { id: "2", iconId: "shield", text: "Надёжность" },
    ],
    hotspots: [],
  },
  {
    id: "2",
    name: "Винтовой компрессор ВК-50",
    group: "Компрессорное оборудование",
    groupId: "2",
    shortDescription: "Компактный компрессор",
    longDescription:
      "Винтовой компрессор ВК-50 идеально подходит для промышленного применения. Низкий уровень шума и вибраций.",
    image: "/placeholder.svg",
    showOnHomepage: false,
    advantages: [],
    hotspots: [],
  },
];

const AdminEquipment = () => {
  const [equipment, setEquipment] = useState<Equipment[]>(mockEquipment);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Equipment | null>(null);
  const [formData, setFormData] = useState<Omit<Equipment, "id" | "group">>({
    name: "",
    groupId: "",
    shortDescription: "",
    longDescription: "",
    image: "",
    showOnHomepage: false,
    advantages: [],
    hotspots: [],
  });

  // Icon picker state
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [editingAdvantageIndex, setEditingAdvantageIndex] = useState<
    number | null
  >(null);

  // Hotspot editor state
  const [isHotspotEditorOpen, setIsHotspotEditorOpen] = useState(false);

  const filteredEquipment = equipment.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      groupId: "",
      shortDescription: "",
      longDescription: "",
      image: "",
      showOnHomepage: false,
      advantages: [],
      hotspots: [],
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Equipment) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      groupId: item.groupId,
      shortDescription: item.shortDescription,
      longDescription: item.longDescription,
      image: item.image,
      showOnHomepage: item.showOnHomepage,
      advantages: [...item.advantages],
      hotspots: [...item.hotspots],
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setEquipment(equipment.filter((item) => item.id !== id));
    toast.success("Оборудование удалено");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const group = mockGroups.find((g) => g.id === formData.groupId);

    if (editingItem) {
      setEquipment(
        equipment.map((item) =>
          item.id === editingItem.id
            ? { ...item, ...formData, group: group?.name || "" }
            : item
        )
      );
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

  // Advantages management
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
                      src={item.image}
                      alt=""
                      className="w-16 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.group}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.showOnHomepage ? (
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
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="group">Группа</Label>
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
                      {mockGroups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
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
                <Label htmlFor="longDescription">Длинное описание</Label>
                <Textarea
                  id="longDescription"
                  value={formData.longDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, longDescription: e.target.value })
                  }
                  rows={4}
                  placeholder="Подробное описание оборудования"
                />
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="image">URL изображения</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://..."
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsHotspotEditorOpen(true)}
                    disabled={!formData.image}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Точки ({formData.hotspots.length})
                  </Button>
                </div>
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full max-w-xs h-32 object-cover rounded border mt-2"
                  />
                )}
              </div>

              {/* Show on homepage */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showOnHomepage"
                  checked={formData.showOnHomepage}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      showOnHomepage: checked === true,
                    })
                  }
                />
                <Label htmlFor="showOnHomepage" className="cursor-pointer">
                  Показывать на главной странице
                </Label>
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
        imageUrl={formData.image}
        hotspots={formData.hotspots}
        onHotspotsChange={(hotspots) => setFormData({ ...formData, hotspots })}
      />
    </div>
  );
};

export default AdminEquipment;
