import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();

  const skillsData = {
    soft: [
      { name: "Коммуникация", value: 7 },
      { name: "Самоорганизация", value: 6 },
      { name: "Решение проблем", value: 8 },
      { name: "Навык обучения", value: 9 }
    ],
    hard: [
      { name: "Аналитика", value: 7 },
      { name: "Управление проектами", value: 5 },
      { name: "Разработка", value: 8 }
    ]
  };

  const careerPath = [
    { role: "Middle Developer", status: "current", skills: ["React", "TypeScript", "API Design"], time: "Текущая позиция" },
    { role: "Senior Developer", status: "next", skills: ["Архитектура", "Менторство", "Performance"], time: "12-18 месяцев" },
    { role: "Tech Lead", status: "future", skills: ["Лидерство", "Стратегия", "Team Building"], time: "24-36 месяцев" }
  ];

  const developmentIndex = 72;
  const skillCoverage = 58;
  const readiness = 85;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 py-12">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Результаты диагностики</h1>
            <p className="text-muted-foreground text-lg">
              Ваша карта навыков и персональная карьерная траектория
            </p>
          </div>
          <Button onClick={() => navigate('/profile')}>
            <Icon name="User" size={20} className="mr-2" />
            В профиль
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">AI Development Index</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-primary">{developmentIndex}</span>
                <span className="text-muted-foreground">/100</span>
              </div>
              <Progress value={developmentIndex} className="h-2" />
              <p className="text-sm text-muted-foreground">Индекс профессионального развития</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Skill Map Coverage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-secondary">{skillCoverage}</span>
                <span className="text-muted-foreground">%</span>
              </div>
              <Progress value={skillCoverage} className="h-2" />
              <p className="text-sm text-muted-foreground">Покрытие карты компетенций</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Career Readiness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-accent">{readiness}</span>
                <span className="text-muted-foreground">%</span>
              </div>
              <Progress value={readiness} className="h-2" />
              <p className="text-sm text-muted-foreground">Готовность к карьерному росту</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Users" size={24} className="text-primary" />
                Soft Skills
              </CardTitle>
              <CardDescription>Гибкие навыки и личные компетенции</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {skillsData.soft.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm font-bold text-primary">{skill.value}/10</span>
                  </div>
                  <Progress value={skill.value * 10} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Code" size={24} className="text-secondary" />
                Hard Skills
              </CardTitle>
              <CardDescription>Профессиональные навыки и технические компетенции</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {skillsData.hard.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm font-bold text-secondary">{skill.value}/10</span>
                  </div>
                  <Progress value={skill.value * 10} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" size={24} className="text-accent" />
              Карьерная траектория
            </CardTitle>
            <CardDescription>Ваш персональный путь профессионального роста</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {careerPath.map((step, index) => (
                <div key={index} className="relative">
                  {index < careerPath.length - 1 && (
                    <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border" />
                  )}
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.status === 'current' ? 'bg-primary text-white' :
                      step.status === 'next' ? 'bg-secondary text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      <Icon name={
                        step.status === 'current' ? 'CheckCircle' :
                        step.status === 'next' ? 'Target' :
                        'Circle'
                      } size={24} />
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">{step.role}</h3>
                          <p className="text-sm text-muted-foreground">{step.time}</p>
                        </div>
                        {step.status === 'current' && (
                          <Badge variant="default">Текущая</Badge>
                        )}
                        {step.status === 'next' && (
                          <Badge variant="secondary">Следующая</Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {step.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center pt-4">
          <Button size="lg" onClick={() => navigate('/development')}>
            <Icon name="Clipboard" size={20} className="mr-2" />
            Перейти к плану развития
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/')}>
            <Icon name="Home" size={20} className="mr-2" />
            На главную
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
