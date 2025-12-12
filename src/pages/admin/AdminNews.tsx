import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}

const mockNews: NewsItem[] = [
  { id: "1", title: "Новое оборудование в каталоге", date: "15 декабря 2024", excerpt: "Мы расширили ассортимент...", content: "Полный текст новости...", image: "/placeholder.svg" },
  { id: "2", title: "Участие в выставке", date: "10 декабря 2024", excerpt: "Компания приняла участие...", content: "Полный текст новости...", image: "/placeholder.svg" },
];

const AdminNews = () => {
  const [news, setNews] = useState<NewsItem[]>(mockNews);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
  });

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({ title: "", excerpt: "", content: "", image: "" });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      image: item.image,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    // TODO: Replace with actual API call
    setNews(news.filter(item => item.id !== id));
    toast.success("Новость удалена");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      // Update existing
      setNews(news.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData, date: item.date }
          : item
      ));
      toast.success("Новость обновлена");
    } else {
      // Create new
      const newItem: NewsItem = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }),
      };
      setNews([newItem, ...news]);
      toast.success("Новость создана");
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
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
                <TableHead>Дата</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNews.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img src={item.image} alt="" className="w-16 h-12 object-cover rounded" />
                  </TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.date}</TableCell>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Редактировать новость" : "Новая новость"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Название</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">URL изображения</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Краткое описание</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Полный текст</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
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

export default AdminNews;
