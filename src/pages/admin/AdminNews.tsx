import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
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

interface NewsItem {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  coverImage?: { id: string } | null; // только id
}

const AdminNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [images, setImages] = useState<Record<number, string>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    coverImage: null as File | null,
  });

  // ------------------------
  // Load news + fetch images
  // ------------------------
  const loadNews = async () => {
    setLoading(true);
    try {
      const res = await api.get("/news");
      const data: NewsItem[] = Array.isArray(res.data) ? res.data : [];
      setNews(data);

      // Загружаем картинки для таблицы
      data.forEach(async (item) => {
        if (item.coverImage && !images[item.id]) {
          try {
            const imgRes = await api.get(`/Files/${item.coverImage.id}`, { responseType: "blob" });
            const url = URL.createObjectURL(imgRes.data);
            setImages((prev) => ({ ...prev, [item.id]: url }));
          } catch {
            // Игнорируем ошибки загрузки отдельных изображений
          }
        }
      });
    } catch {
      toast.error("Ошибка загрузки новостей");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  // ------------------------
  // Filter
  // ------------------------
  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
  // Edit / Create
  // ------------------------
  const handleEdit = (item: NewsItem) => {
    setIsCreating(false);
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content || "",
      coverImage: null,
    });
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingItem(null);
    setFormData({
      title: "",
      content: "",
      coverImage: null,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let coverImage = formData.coverImage ? { id: await uploadFile(formData.coverImage) } : null;

      if (isCreating) {
        await api.post("/news", {
          title: formData.title,
          content: formData.content,
          coverImage,
        });
        toast.success("Новость создана");
      } else if (editingItem) {
        coverImage = coverImage || editingItem.coverImage || null;
        await api.put(`/news/${editingItem.id}`, {
          title: formData.title,
          content: formData.content,
          coverImage,
        });
        toast.success("Новость обновлена");
      }

      setIsDialogOpen(false);
      loadNews();
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при сохранении");
    }
  };

  // ------------------------
  // Delete
  // ------------------------
  const handleDelete = async (id: number) => {
    if (!confirm("Удалить новость?")) return;
    try {
      await api.delete(`/news/${id}`);
      toast.success("Новость удалена");
      setNews((prev) => prev.filter((n) => n.id !== id));
    } catch {
      toast.error("Ошибка при удалении");
    }
  };

  // ------------------------
  // Render
  // ------------------------
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Новости</h1>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Добавить новость
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Загрузка...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Изображение</TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredNews.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img
                        src={images[item.id] || "/placeholder.svg"}
                        className="w-16 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString("ru-RU")}
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

                {filteredNews.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      Ничего не найдено
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Dialog для создания / редактирования */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isCreating ? "Создать новость" : "Редактировать новость"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Название</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Содержание</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <Label>Картинка</Label>
              {/* Текущая картинка только при редактировании */}
              {!isCreating && editingItem?.coverImage && !formData.coverImage && (
                <p className="text-sm text-muted-foreground mb-1">
                  {`Текущая картинка: ${editingItem.coverImage.id}`}
                </p>
              )}
              {formData.coverImage && (
                <p className="text-sm text-muted-foreground mb-1">
                  {`Выбран файл: ${formData.coverImage.name}`}
                </p>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFormData({ ...formData, coverImage: file });
                }}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Отмена
              </Button>
              <Button type="submit">{isCreating ? "Создать" : "Сохранить"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminNews;
