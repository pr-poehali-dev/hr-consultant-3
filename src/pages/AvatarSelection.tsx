import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AvatarSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [avatarName, setAvatarName] = useState("");

  const avatars = [
    {
      id: 1,
      image: "https://cdn.poehali.dev/files/49a93a3f-286f-436f-9a71-e1b03ad183cb.jpg",
      description: "Дружелюбный и заботливый помощник"
    },
    {
      id: 2,
      image: "https://cdn.poehali.dev/files/23cadad3-2905-4b3d-ba9e-9cd8d86d7ebd.jpg",
      description: "Весёлый и находчивый советник"
    },
    {
      id: 3,
      image: "https://cdn.poehali.dev/files/0b75a6d2-9fe6-4081-b0a8-314975e637a2.jpg",
      description: "Мудрый и технологичный ассистент"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedAvatar === null) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите аватар",
        variant: "destructive"
      });
      return;
    }

    if (!avatarName.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите имя для помощника",
        variant: "destructive"
      });
      return;
    }

    const selectedAvatarData = avatars.find(a => a.id === selectedAvatar);
    localStorage.setItem('aiAssistant', JSON.stringify({
      ...selectedAvatarData,
      customName: avatarName
    }));
    
    toast({
      title: "Отлично!",
      description: `Ваш помощник ${avatarName} готов к работе`
    });
    
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <Card className="animate-fade-in">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Bot" size={32} className="text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Выберите AI-помощника</CardTitle>
            <CardDescription className="text-lg">
              Выберите аватар и дайте ему имя. Ваш помощник будет всегда рядом
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                {avatars.map((avatar) => (
                  <Card
                    key={avatar.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                      selectedAvatar === avatar.id
                        ? 'ring-4 ring-primary shadow-xl shadow-primary/20'
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedAvatar(avatar.id)}
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                        <img
                          src={avatar.image}
                          alt={avatar.description}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">{avatar.description}</p>
                      </div>
                      {selectedAvatar === avatar.id && (
                        <div className="flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <Icon name="Check" size={20} className="text-white" />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedAvatar !== null && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="avatarName" className="text-base">
                    Как вы хотите назвать своего помощника? <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="avatarName"
                    placeholder="Введите имя"
                    value={avatarName}
                    onChange={(e) => setAvatarName(e.target.value)}
                    className="text-base h-12"
                  />
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button type="submit" size="lg" className="flex-1 text-lg h-12">
                  <Icon name="Rocket" size={20} className="mr-2" />
                  Начать работу
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg" 
                  onClick={() => navigate('/registration')}
                  className="text-lg h-12"
                >
                  Назад
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AvatarSelection;