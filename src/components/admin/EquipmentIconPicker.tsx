import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Zap,
  Wrench,
  Settings,
  Shield,
  Gauge,
  ThermometerSun,
  Droplets,
  Wind,
  Factory,
  Cog,
  Timer,
  Target,
  CheckCircle,
  Award,
  TrendingUp,
  Lightbulb,
  RefreshCw,
  Power,
  Ruler,
  Hammer,
} from "lucide-react";

export const availableIcons = [
  { id: "zap", icon: Zap, label: "Электричество" },
  { id: "wrench", icon: Wrench, label: "Гаечный ключ" },
  { id: "settings", icon: Settings, label: "Настройки" },
  { id: "shield", icon: Shield, label: "Защита" },
  { id: "gauge", icon: Gauge, label: "Датчик" },
  { id: "thermometer", icon: ThermometerSun, label: "Температура" },
  { id: "droplets", icon: Droplets, label: "Жидкость" },
  { id: "wind", icon: Wind, label: "Воздух" },
  { id: "factory", icon: Factory, label: "Завод" },
  { id: "cog", icon: Cog, label: "Шестерёнка" },
  { id: "timer", icon: Timer, label: "Таймер" },
  { id: "target", icon: Target, label: "Цель" },
  { id: "check", icon: CheckCircle, label: "Галочка" },
  { id: "award", icon: Award, label: "Награда" },
  { id: "trending", icon: TrendingUp, label: "Рост" },
  { id: "lightbulb", icon: Lightbulb, label: "Лампочка" },
  { id: "refresh", icon: RefreshCw, label: "Обновление" },
  { id: "power", icon: Power, label: "Питание" },
  { id: "ruler", icon: Ruler, label: "Линейка" },
  { id: "hammer", icon: Hammer, label: "Молоток" },
];

interface EquipmentIconPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (iconId: string) => void;
  selectedIcon?: string;
}

export const EquipmentIconPicker = ({
  open,
  onOpenChange,
  onSelect,
  selectedIcon,
}: EquipmentIconPickerProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Выберите иконку</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-2">
          {availableIcons.map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.id}
                type="button"
                variant={selectedIcon === item.id ? "default" : "outline"}
                className={cn(
                  "h-14 w-14 flex flex-col items-center justify-center p-1",
                  selectedIcon === item.id && "ring-2 ring-primary"
                )}
                onClick={() => {
                  onSelect(item.id);
                  onOpenChange(false);
                }}
                title={item.label}
              >
                <IconComponent className="w-6 h-6" />
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const getIconById = (iconId: string) => {
  return availableIcons.find((item) => item.id === iconId);
};
