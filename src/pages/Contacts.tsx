import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Download, Building2, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Contacts = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const handleDownloadRequisites = () => {
    const link = document.createElement("a");
    link.href = "/files/requisites.txt";
    link.download = "requisites.txt";
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
                    +7 (3822) 12-34-56
                    <br />
                    Пн-Пт: 8:00 - 17:00
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
                    info@promdetal.ru
                    <br />
                    sales@promdetal.ru
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
                      423800, РТ, г. Набережные Челны, Мензелинский тракт, д.14, Блок А
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Почтовый:</span>
                      <br />
                      423823, РТ, г. Набережные Челны, а/я 52
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
                    <p className="font-medium">Общество с ограниченной ответственностью «Завод РУ-ДРАЙВ»</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Сокращенное наименование:</span>
                    <p className="font-medium">ООО «Завод РУ-ДРАЙВ»</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Директор:</span>
                    <p className="font-medium">Идиятулин Равиль Фаильевич, действует на основании Устава</p>
                  </div>
                </div>
              </div>

              {/* Addresses */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Адреса</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-muted-foreground text-sm">Юридический:</span>
                    <p className="font-medium">423800, РТ, г. Набережные Челны, Мензелинский тракт, д.14, Блок А</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Почтовый:</span>
                    <p className="font-medium">423823, РТ, г. Набережные Челны, а/я 52</p>
                  </div>
                </div>
              </div>

              {/* Registration Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Регистрационные данные</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-muted-foreground text-sm">ОГРН:</span>
                    <p className="font-medium">1221600055258</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">ИНН:</span>
                    <p className="font-medium">1650415251</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">КПП:</span>
                    <p className="font-medium">165001001</p>
                  </div>
                </div>
              </div>

              {/* Classifiers */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Общероссийские классификаторы</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-muted-foreground text-sm">ОКПО:</span>
                    <p className="font-medium">93879769</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">ОКВЭД:</span>
                    <p className="font-medium">27.12</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">ОКАТО:</span>
                    <p className="font-medium">92430000000</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">ОКФС:</span>
                    <p className="font-medium">16</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">ОКОПФ:</span>
                    <p className="font-medium">12300</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">ОКТМО:</span>
                    <p className="font-medium">92730000001</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">ОКОГУ:</span>
                    <p className="font-medium">4210014</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Bank Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Банковские реквизиты
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-muted-foreground text-sm">Рублевый счет:</span>
                    <p className="font-medium font-mono">40702810434010016915</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-muted-foreground text-sm">Банк:</span>
                    <p className="font-medium">ООО КБЭР «Банк Казани» Центральный офис г. Казань</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Кор.счет:</span>
                    <p className="font-medium font-mono">30101810100000000844</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">БИК:</span>
                    <p className="font-medium font-mono">049205844</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
