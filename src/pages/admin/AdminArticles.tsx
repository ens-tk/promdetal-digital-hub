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
  relatedArticles: number[]; // IDs of related articles
}

// Mock data for demonstration
const mockArticles: ArticleItem[] = [
  {
    id: 1,
    title: "Как выбрать промышленный насос",
    content: "<p>Подробное руководство по выбору насоса...</p>",
    createdAt: "2024-01-15T10:00:00Z",
    coverImage: null,
    relatedArticles: [2, 3],
  },
  {
    id: 2,
    title: "Обслуживание компрессорного оборудования",
    content: "<p>Регулярное техническое обслуживание...</p>",
    createdAt: "2024-01-10T10:00:00Z",
    coverImage: null,
    relatedArticles: [],
  },
  {
    id: 3,
    title: "Энергоэффективность в промышленности",
    content: "<p>Способы снижения энергопотребления...</p>",
    createdAt: "2024-01-05T10:00:00Z",
    coverImage: null,
    relatedArticles: [1],
  },
];

const AdminArticles = () => {
  const [articles, setArticles] = useState<ArticleItem[]>(mockArticles);
  const [images, setImages] = useState<Record<number, string>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ArticleItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    coverImage: null as File | null,
    relatedArticles: [] as number[],
  });

  const filteredArticles = articles.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get available articles for "related" selection (excluding current)
  const availableForRelated = articles.filter(
    (a) => a.id !== editingItem?.id
  );

  const handleEdit = (item: ArticleItem) => {
    setIsCreating(false);
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content || "",
      coverImage: null,
      relatedArticles: [...item.relatedArticles],
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
      relatedArticles: [],
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isCreating) {
        const newArticle: ArticleItem = {
          id: Date.now(),
          title: formData.title,
          content: formData.content,
          createdAt: new Date().toISOString(),
          coverImage: null,
          relatedArticles: formData.relatedArticles,
        };
        setArticles([newArticle, ...articles]);
        toast.success("Статья создана");
      } else if (editingItem) {
        setArticles(
          articles.map((a) =>
            a.id === editingItem.id
              ? {
                  ...a,
                  title: formData.title,
                  content: formData.content,
                  relatedArticles: formData.relatedArticles,
                }
              : a
          )
        );
        toast.success("Статья обновлена");
      }

      setIsDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при сохранении");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить статью?")) return;
    setArticles((prev) => prev.filter((a) => a.id !== id));
    toast.success("Статья удалена");
  };

  const toggleRelatedArticle = (articleId: number) => {
    const isSelected = formData.relatedArticles.includes(articleId);
    if (isSelected) {
      setFormData({
        ...formData,
        relatedArticles: formData.relatedArticles.filter((id) => id !== articleId),
      });
    } else {
      if (formData.relatedArticles.length >= 3) {
        toast.error("Можно выбрать максимум 3 статьи");
        return;
      }
      setFormData({
        ...formData,
        relatedArticles: [...formData.relatedArticles, articleId],
      });
    }
  };

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
                    <TableCell className="font-medium">{item.title}</TableCell>
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

                {filteredArticles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
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
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{isCreating ? "Создать статью" : "Редактировать статью"}</DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[70vh] pr-4">
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
                <RichTextEditor
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                />
              </div>

              <div>
                <Label>Картинка</Label>
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

              {/* Related Articles Selection */}
              <div className="space-y-3">
                <Label>
                  Может быть интересно{" "}
                  <span className="text-muted-foreground font-normal">
                    (выберите до 3 статей)
                  </span>
                </Label>
                <div className="border rounded-lg p-3 space-y-2 max-h-48 overflow-y-auto">
                  {availableForRelated.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Нет доступных статей для выбора
                    </p>
                  ) : (
                    availableForRelated.map((article) => {
                      const isSelected = formData.relatedArticles.includes(article.id);
                      return (
                        <div
                          key={article.id}
                          className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-primary/10 border border-primary"
                              : "hover:bg-muted"
                          }`}
                          onClick={() => toggleRelatedArticle(article.id)}
                        >
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleRelatedArticle(article.id)}
                          />
                          <span className="flex-1 text-sm">{article.title}</span>
                          {isSelected && (
                            <Badge variant="secondary">
                              #{formData.relatedArticles.indexOf(article.id) + 1}
                            </Badge>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
                {formData.relatedArticles.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Выбрано: {formData.relatedArticles.length} из 3
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
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
