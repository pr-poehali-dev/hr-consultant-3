import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

interface Certificate {
  id: number;
  title: string;
  organization: string;
  date: string;
  type: "course" | "certificate" | "diploma";
  image?: string;
  verified: boolean;
}

const Certificates = () => {
  const navigate = useNavigate();
  const [certificates] = useState<Certificate[]>([
    {
      id: 1,
      title: "React Advanced Patterns",
      organization: "Udemy",
      date: "Сен 2024",
      type: "course",
      verified: true
    },
    {
      id: 2,
      title: "TypeScript Expert",
      organization: "Coursera",
      date: "Июл 2024",
      type: "certificate",
      verified: true
    },
    {
      id: 3,
      title: "System Design Mastery",
      organization: "Stepik",
      date: "Май 2024",
      type: "course",
      verified: false
    },
    {
      id: 4,
      title: "Leadership in Tech",
      organization: "LinkedIn Learning",
      date: "Мар 2024",
      type: "certificate",
      verified: true
    }
  ]);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "course":
        return "Курс";
      case "certificate":
        return "Сертификат";
      case "diploma":
        return "Диплом";
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "course":
        return "bg-blue-500/10 text-blue-600";
      case "certificate":
        return "bg-green-500/10 text-green-600";
      case "diploma":
        return "bg-purple-500/10 text-purple-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 py-12">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Сертификаты и курсы</h1>
            <p className="text-muted-foreground mt-2">Ваши достижения в обучении</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/profile')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <Card
              key={cert.id}
              className="animate-fade-in hover:shadow-lg transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{cert.title}</CardTitle>
                    <CardDescription className="mt-1">{cert.organization}</CardDescription>
                  </div>
                  {cert.verified && (
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="BadgeCheck" size={18} className="text-green-600" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Calendar" size={14} />
                  <span>{cert.date}</span>
                </div>
                <Badge className={getTypeColor(cert.type)}>
                  {getTypeLabel(cert.type)}
                </Badge>
              </CardContent>
            </Card>
          ))}

          <Card className="animate-fade-in border-dashed border-2 hover:border-primary/50 transition-all duration-300 cursor-pointer flex items-center justify-center min-h-[200px]">
            <CardContent className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Plus" size={32} className="text-primary" />
              </div>
              <p className="text-muted-foreground">Добавить сертификат</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
