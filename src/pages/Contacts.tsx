import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Download, Building2, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/api";

const Contacts = () => {
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  const name = (form.elements.namedItem("name") as HTMLInputElement).value;
  const contact = (form.elements.namedItem("contact") as HTMLInputElement).value;
  const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

  try {
    await api.post("/contact", {
      name,
      contact,
      message,
    });

    alert("Сообщение успешно отправлено!");
    form.reset();
  } catch (error: any) {
    console.error("Ошибка при отправке:", error);
    alert("Не удалось отправить сообщение. Попробуйте позже.");
  }
};

  const handleDownloadRequisites = () => {
    const link = document.createElement("a");
    link.href = "/files/Реквизиты ENS Group Альфа Банк рубли.pdf";
    link.download = "Реквизиты ENS Group Альфа Банк рубли.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-industrial-dark text-background py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h1>
          <p className="text-lg text-background/80">
            Свяжитесь с нами удобным для вас способом
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Отправить сообщение</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя</Label>
                <Input id="name" placeholder="Иван Иванов" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Контактная информация</Label>
                <Input id="contact" type="text" placeholder="Телефон или email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Ваш вопрос</Label>
                <Textarea id="message" placeholder="Опишите ваш вопрос или запрос..." rows={5} required />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Send className="h-4 w-4 mr-2" />
                Отправить сообщение
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Контактная информация</h2>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <p className="text-muted-foreground">
                    +7 (382 2) 21- 79- 88
                    <br />
                    +7 (382 2) 25- 52- 85
                    <br />
                    +7 (382 2) 25- 55- 66
                    <br />
                    Пн-Пт: 9:00 - 18:00
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">
                    info@enspg.ru
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Адреса</h3>
                  <div className="text-muted-foreground space-y-2">
                    <div>
                      <span className="font-medium text-foreground">Юридический:</span>
                      <br />
                      Россия, 634027, г. Томск, ул. Смирнова, 7/11 строение 6 помещение 1
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Почтовый:</span>
                      <br />
                      Россия, 634027, г. Томск, ул. Смирнова, а/я 3235
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Requisites Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Building2 className="h-7 w-7 text-primary" />
              Реквизиты компании
            </h2>
            <Button onClick={handleDownloadRequisites} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Скачать реквизиты
            </Button>
          </div>

          <Card className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Основные сведения</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-muted-foreground text-sm">Полное наименование:</span>
                    <p className="font-medium">Общество с Ограниченной Ответственностью "Промдеталь"</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Сокращенное наименование:</span>
                    <p className="font-medium">ООО «Промдеталь»</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Директор:</span>
                    <p className="font-medium">Энс Дмитрий Владимирович, действует на основании Устава</p>
                  </div>
                </div>
              </div>

              {/* Addresses */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Адреса</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-muted-foreground text-sm">Юридический:</span>
                    <p className="font-medium">Россия, 634027, г. Томск, ул. Смирнова, 7/11 строение 6 помещение 1</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Почтовый:</span>
                    <p className="font-medium">Россия, 634027, г. Томск, ул. Смирнова, а/я 3235</p>
                  </div>
                </div>
              </div>

              {/* Registration Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Регистрационные данные</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-muted-foreground text-sm">ОГРН:</span>
                    <p className="font-medium">1057002688852</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">ИНН:</span>
                    <p className="font-medium">7017133548</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">КПП:</span>
                    <p className="font-medium">701701001</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">ЭДО:</span>
                    <p className="font-medium">2BE461bfa9e480011e3ba45005056917125</p>
                  </div>
                </div>
              </div>

              {/* Classifiers */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Общероссийские классификаторы</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-muted-foreground text-sm">ОКПО:</span>
                    <p className="font-medium">79195171</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">ОКВЭД:</span>
                    <p className="font-medium">28.12</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">ОКОПФ:</span>
                    <p className="font-medium">12300</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
