import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Registration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    position: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.email || !formData.position) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('userData', JSON.stringify(formData));
    localStorage.setItem('isRegistered', 'true');
    
    toast({
      title: "Успешно!",
      description: "Регистрация завершена"
    });
    
    navigate('/avatar-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-2xl animate-fade-in">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Icon name="UserPlus" size={32} className="text-white" />
          </div>
          <CardTitle className="text-3xl font-bold">Регистрация</CardTitle>
          <CardDescription className="text-lg">
            Заполните информацию о себе для начала работы
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-base">
                ФИО <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="Иванов Иван Иванович"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="text-base h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base">
                Номер телефона <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="text-base h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                Электронная почта <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="text-base h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position" className="text-base">
                Должность <span className="text-destructive">*</span>
              </Label>
              <Input
                id="position"
                placeholder="Frontend Developer"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="text-base h-12"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" size="lg" className="flex-1 text-lg h-12">
                <Icon name="ArrowRight" size={20} className="mr-2" />
                Продолжить
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="lg" 
                onClick={() => navigate('/')}
                className="text-lg h-12"
              >
                Отмена
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;
