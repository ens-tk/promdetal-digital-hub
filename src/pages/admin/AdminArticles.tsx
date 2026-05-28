"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Checkbox } from "@/components/ui/checkbox";
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search, X } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ArticleItem {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  coverImage?: { id: string } | null;
  relatedArticles: number[];
}

const AdminArticles = () => {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [images, setImages] = useState<Record<number, string>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ArticleItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    coverImage: null as File | null,
    relatedArticles: [] as number[],
  });
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");
  const [coverImageRemoved, setCoverImageRemoved] = useState(false);

  // ------------------------
  // Load articles + images
  // ------------------------
  const loadArticles = async () => {
    setLoading(true);
    try {
      const res = await api.get("/articles");
      const data: ArticleItem[] = Array.isArray(res.data)
        ? res.data.map((a: any) => ({
            id: a.id,
            title: a.title,
            content: a.content,
            createdAt: a.createdAt,
            coverImage: a.coverImage || null,
            relatedArticles: (a.recommended || []).map((r: any) => r.id),
          }))
        : [];

      setArticles(data);

      // загружаем изображения
      data.forEach(async (item) => {
        if (item.coverImage && !images[item.id]) {
          try {
            const imgRes = await api.get(`/Files/${item.coverImage.id}`, {
              responseType: "blob",
            });
            const url = URL.createObjectURL(imgRes.data);
            setImages((prev) => ({ ...prev, [item.id]: url }));
          } catch {}
        }
      });
    } catch {
      toast.error("Ошибка загрузки статей");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

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
  // Create / Edit
  // ------------------------
  const handleEdit = async (id: number) => {
  try {
    setIsCreating(false);
    setIsDialogOpen(true); // открываем диалог заранее, чтобы UI был отзывчивым
    setEditingItem(null); // сбрасываем текущий item
    setFormData({
      title: "",
      content: "",
      coverImage: null,
      relatedArticles: [],
    });

    console.log("Fetching article", id);
    const res = await api.get(`/articles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    console.log("Fetched article data:", data);

    setEditingItem({
      id: data.id,
      title: data.title,
      content: data.content,
      createdAt: data.createdAt,
      coverImage: data.coverImage || null,
      relatedArticles: (data.recommended || []).map((r: any) => r.id),
    });

    setFormData({
      title: data.title,
      content: data.content || "",
      coverImage: null,
      relatedArticles: (data.recommended || []).map((r: any) => r.id),
    });
    setCoverImagePreview(
      data.coverImage
        ? `http://157.22.174.170:8080/promdetal/api/Files/${data.coverImage.id}`
        : ""
    );
    setCoverImageRemoved(false);
  } catch (err) {
    console.error("Error fetching article:", err);
    toast.error("Не удалось загрузить статью для редактирования");
    setIsDialogOpen(false);
  }
};


  const handleCreate = () => {
    setIsCreating(true);
    setEditingItem(null);
    setFormData({
      title: "",
      content: "",
      coverImage: null,
      relatedArticles: [],
    });
    setCoverImagePreview("");
    setCoverImageRemoved(false);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit -> formData:", formData);
    try {
      let coverImage = formData.coverImage
        ? { id: await uploadFile(formData.coverImage) }
        : (coverImageRemoved ? null : editingItem?.coverImage || null);

      const payload = {
        title: formData.title,
        content: formData.content,
        coverImage,
        recommended: formData.relatedArticles.map((id) => ({ id })),
      };

      if (isCreating) {
        await api.post("/articles", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Статья создана");
      } else if (editingItem) {
        await api.put(`/articles/${editingItem.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Статья обновлена");
      }

      setIsDialogOpen(false);
      loadArticles();
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при сохранении статьи");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить статью?")) return;
    try {
      await api.delete(`/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles((prev) => prev.filter((a) => a.id !== id));
      toast.success("Статья удалена");
    } catch {
      toast.error("Ошибка при удалении статьи");
    }
  };

  const toggleRelatedArticle = (id: number) => {
    const exists = formData.relatedArticles.includes(id);
    if (exists) {
      setFormData((p) => ({
        ...p,
        relatedArticles: p.relatedArticles.filter((x) => x !== id),
      }));
    } else {
      if (formData.relatedArticles.length >= 3) {
        toast.error("Максимум 3 статьи");
        return;
      }
      setFormData((p) => ({
        ...p,
        relatedArticles: [...p.relatedArticles, id],
      }));
    }
  };

  const filteredArticles = articles.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const availableForRelated = articles.filter(
    (a) => a.id !== editingItem?.id
  );

  // ------------------------
  // Render
  // ------------------------
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Статьи</h1>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Добавить статью
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
                  <TableHead>Связанные</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img
                        src={images[item.id] || "/placeholder.svg"}
                        className="w-16 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString("ru-RU")}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {item.relatedArticles.length} из 3
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
<Button
  variant="ghost"
  size="icon"
  onClick={() => handleEdit(item.id)} // передаем id, а не весь объект
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
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isCreating ? "Создать статью" : "Редактировать статью"}
            </DialogTitle>
            <DialogDescription>
              Редактирование содержимого статьи
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[70vh] pr-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Название</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label>Содержание</Label>
                {/* 🔹 Только рендерим редактор, если есть данные */}
                {(isDialogOpen && (isCreating || editingItem)) && (
                  <RichTextEditor
                    value={formData.content}
                    onChange={(content) => {
                      console.log("RichTextEditor onChange:", content);
                      setFormData({ ...formData, content });
                    }}
                  />
                )}
              </div>

              <div>
                <Label>Картинка</Label>
                {coverImagePreview && !coverImageRemoved && (
                  <div className="relative inline-block mt-2 mb-2">
                    <img
                      src={coverImagePreview}
                      alt="Cover"
                      className="max-w-xs h-24 object-contain rounded border bg-muted p-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={() => {
                        setFormData({ ...formData, coverImage: null });
                        setCoverImagePreview("");
                        setCoverImageRemoved(true);
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData({ ...formData, coverImage: file });
                      setCoverImagePreview(URL.createObjectURL(file));
                      setCoverImageRemoved(false);
                    }
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Может быть интересно (до 3 статей)</Label>
                <div className="border rounded p-3 space-y-2 max-h-48 overflow-y-auto">
                  {articles
                    .filter((a) => a.id !== editingItem?.id)
                    .map((a) => {
                      const selected = formData.relatedArticles.includes(a.id);
                      return (
                        <div
                          key={a.id}
                          className={`flex items-center gap-3 p-2 rounded ${
                            selected
                              ? "bg-primary/10 border border-primary"
                              : "hover:bg-muted"
                          }`}
                        >
                          <Checkbox
                            checked={selected}
                            onCheckedChange={() => toggleRelatedArticle(a.id)}
                          />
                          <span className="flex-1 text-sm">{a.title}</span>
                          {selected && (
                            <Badge variant="secondary">
                              #{formData.relatedArticles.indexOf(a.id) + 1}
                            </Badge>
                          )}
                        </div>
                      );
                    })}
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
                <Button type="submit">{isCreating ? "Создать" : "Сохранить"}</Button>
              </div>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminArticles;
