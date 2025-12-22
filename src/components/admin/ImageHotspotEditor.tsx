import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus, MapPin } from "lucide-react";
import { toast } from "sonner";

export interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  text: string;
}

interface ImageHotspotEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string;
  hotspots: Hotspot[];
  onHotspotsChange: (hotspots: Hotspot[]) => void;
}

export const ImageHotspotEditor = ({
  open,
  onOpenChange,
  imageUrl,
  hotspots,
  onHotspotsChange,
}: ImageHotspotEditorProps) => {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const imageRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newHotspot: Hotspot = {
      id: Date.now().toString(),
      x,
      y,
      text: "",
    };

    onHotspotsChange([...hotspots, newHotspot]);
    setSelectedHotspot(newHotspot.id);
    setEditingText("");
    toast.success("Точка добавлена. Введите текст для неё.");
  };

  const handleHotspotClick = (e: React.MouseEvent, hotspotId: string) => {
    e.stopPropagation();
    const hotspot = hotspots.find((h) => h.id === hotspotId);
    setSelectedHotspot(hotspotId);
    setEditingText(hotspot?.text || "");
  };

  const handleRemoveHotspot = (hotspotId: string) => {
    onHotspotsChange(hotspots.filter((h) => h.id !== hotspotId));
    if (selectedHotspot === hotspotId) {
      setSelectedHotspot(null);
      setEditingText("");
    }
  };

  const handleSaveText = () => {
    if (!selectedHotspot) return;

    onHotspotsChange(
      hotspots.map((h) =>
        h.id === selectedHotspot ? { ...h, text: editingText } : h
      )
    );
    toast.success("Текст сохранён");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Редактор точек на изображении</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Кликните на изображение, чтобы добавить точку. Кликните на точку,
            чтобы редактировать или удалить.
          </p>

          <div
            ref={imageRef}
            className="relative border rounded-lg overflow-hidden cursor-crosshair bg-muted"
            onClick={handleImageClick}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Оборудование"
                className="w-full h-auto pointer-events-none"
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center text-muted-foreground">
                Изображение не загружено
              </div>
            )}

            {hotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                  selectedHotspot === hotspot.id
                    ? "bg-primary text-primary-foreground scale-125"
                    : "bg-destructive text-destructive-foreground hover:scale-110"
                }`}
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                onClick={(e) => handleHotspotClick(e, hotspot.id)}
                title={hotspot.text || "Без текста"}
              >
                <MapPin className="w-4 h-4" />
              </div>
            ))}
          </div>

          {selectedHotspot && (
            <div className="border rounded-lg p-4 space-y-3 bg-muted/50">
              <div className="flex items-center justify-between">
                <Label>Текст для выбранной точки</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() => handleRemoveHotspot(selectedHotspot)}
                >
                  <X className="w-4 h-4 mr-1" />
                  Удалить точку
                </Button>
              </div>
              <div className="flex gap-2">
                <Input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  placeholder="Введите описание для этой точки..."
                />
                <Button type="button" onClick={handleSaveText}>
                  Сохранить
                </Button>
              </div>
            </div>
          )}

          {hotspots.length > 0 && (
            <div className="space-y-2">
              <Label>Список точек ({hotspots.length})</Label>
              <div className="grid gap-2 max-h-32 overflow-auto">
                {hotspots.map((hotspot, index) => (
                  <div
                    key={hotspot.id}
                    className={`flex items-center justify-between p-2 rounded border cursor-pointer ${
                      selectedHotspot === hotspot.id
                        ? "border-primary bg-primary/10"
                        : "bg-background"
                    }`}
                    onClick={() => {
                      setSelectedHotspot(hotspot.id);
                      setEditingText(hotspot.text);
                    }}
                  >
                    <span className="text-sm">
                      {index + 1}. {hotspot.text || "(без текста)"}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveHotspot(hotspot.id);
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button type="button" onClick={() => onOpenChange(false)}>
              Готово
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
