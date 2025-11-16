import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = {
    name: "Александр",
    surname: "Петров",
    position: "Middle Frontend Developer",
    level: "Middle",
    email: "a.petrov@company.com"
  };

  const metrics = [
    { label: "Оценка навыков", value: 74, max: 100, icon: "Target", color: "text-primary" },
    { label: "Индекс развития", value: 72, max: 100, icon: "TrendingUp", color: "text-secondary" },
    { label: "Готовность к повышению", value: 85, max: 100, icon: "Award", color: "text-accent" },
    { label: "Баланс компетенций", value: 68, max: 100, icon: "Scale", color: "text-primary" },
    { label: "Прогресс плана развития", value: 45, max: 100, icon: "CheckCircle", color: "text-secondary" }
  ];

  const skills = {
    soft: [
      { name: "Коммуникация", level: 7 },
      { name: "Лидерство", level: 5 },
      { name: "Адаптивность", level: 8 }
    ],
    hard: [
      { name: "React/TypeScript", level: 8 },
      { name: "Архитектура", level: 6 },
      { name: "Performance", level: 7 }
    ]
  };

  const achievements = [
    { title: "Career Starter", description: "Завершена первая диагностика", date: "15 окт 2024", icon: "Rocket" },
    { title: "Skill Master", description: "10 навыков улучшено", date: "1 ноя 2024", icon: "Star" },
    { title: "Fast Learner", description: "План выполнен на 50%", date: "10 ноя 2024", icon: "Zap" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 py-12">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Профиль</h1>
          <Button variant="outline" onClick={() => navigate('/')}>
            <Icon name="Home" size={20} className="mr-2" />
            На главную
          </Button>
        </div>

        <Card className="animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-secondary text-white">
                  {user.name[0]}{user.surname[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-3xl font-bold">{user.name} {user.surname}</h2>
                  <p className="text-lg text-muted-foreground">{user.position}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default" className="text-sm px-3 py-1">
                    <Icon name="Briefcase" size={14} className="mr-1" />
                    {user.level}
                  </Badge>
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    <Icon name="Calendar" size={14} className="mr-1" />
                    На платформе с окт 2024
                  </Badge>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button onClick={() => navigate('/diagnostic')}>
                    <Icon name="RefreshCw" size={16} className="mr-2" />
                    Пройти диагностику
                  </Button>
                  <Button variant="outline">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Настройки
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-bold mb-4">Профессиональные метрики</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon name={metric.icon as any} size={16} className={metric.color} />
                    {metric.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{metric.value}</span>
                    <span className="text-muted-foreground">/ {metric.max}</span>
                  </div>
                  <Progress value={metric.value} className="h-1.5" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Users" size={24} className="text-primary" />
                Soft Skills
              </CardTitle>
              <CardDescription>Гибкие навыки</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {skills.soft.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm font-bold text-primary">{skill.level}/10</span>
                  </div>
                  <Progress value={skill.level * 10} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '350ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Code" size={24} className="text-secondary" />
                Hard Skills
              </CardTitle>
              <CardDescription>Профессиональные навыки</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {skills.hard.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm font-bold text-secondary">{skill.level}/10</span>
                  </div>
                  <Progress value={skill.level * 10} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="History" size={24} />
              История развития
            </CardTitle>
            <CardDescription>Ключевые моменты вашего профессионального роста</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Последняя диагностика</span>
                  <span className="text-sm text-muted-foreground">10 ноя 2024</span>
                </div>
                <p className="text-sm text-muted-foreground">Обновлены результаты оценки компетенций</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">+8</div>
                  <p className="text-sm text-muted-foreground">Динамика soft skills</p>
                  <div className="flex items-center justify-center gap-1 text-green-500 text-sm">
                    <Icon name="TrendingUp" size={16} />
                    <span>↑ 12%</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg border text-center space-y-2">
                  <div className="text-2xl font-bold text-secondary">+12</div>
                  <p className="text-sm text-muted-foreground">Динамика hard skills</p>
                  <div className="flex items-center justify-center gap-1 text-green-500 text-sm">
                    <Icon name="TrendingUp" size={16} />
                    <span>↑ 18%</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg border text-center space-y-2">
                  <div className="text-2xl font-bold text-accent">+15</div>
                  <p className="text-sm text-muted-foreground">Общий индекс</p>
                  <div className="flex items-center justify-center gap-1 text-green-500 text-sm">
                    <Icon name="TrendingUp" size={16} />
                    <span>↑ 21%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '450ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Trophy" size={24} className="text-yellow-500" />
              Достижения
            </CardTitle>
            <CardDescription>Профессиональные бейджи и вехи</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="p-4 rounded-lg border hover:border-primary/50 transition-colors">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                      <Icon name={achievement.icon as any} size={28} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">{achievement.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
