import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Career = () => {
  const navigate = useNavigate();

  const careerPath = [
    {
      id: 1,
      role: "Middle Frontend Developer",
      status: "current",
      level: "Middle",
      description: "Текущая позиция",
      skills: ["React", "TypeScript", "State Management", "REST API"],
      timeframe: "Сейчас",
      readiness: 100
    },
    {
      id: 2,
      role: "Senior Frontend Developer",
      status: "next",
      level: "Senior",
      description: "Ближайшая возможная роль",
      skills: ["Архитектура приложений", "Менторинг", "Performance optimization", "Design Systems"],
      missingSkills: ["Системное проектирование", "Лидерство в команде", "Code review culture"],
      timeframe: "8-12 месяцев",
      readiness: 68
    },
    {
      id: 3,
      role: "Tech Lead / Engineering Manager",
      status: "future",
      level: "Lead",
      description: "Долгосрочная цель",
      skills: ["Стратегическое планирование", "Управление командой", "Принятие технических решений", "Кросс-функциональное взаимодействие"],
      missingSkills: ["Бюджетирование", "Найм и развитие команды", "Стейкхолдер менеджмент", "Roadmap planning"],
      timeframe: "18-24 месяца",
      readiness: 35
    }
  ];

  const competencyGaps = [
    { skill: "Системное проектирование", current: 6, required: 9, priority: "high" },
    { skill: "Лидерство в команде", current: 5, required: 8, priority: "high" },
    { skill: "Performance optimization", current: 7, required: 9, priority: "medium" },
    { skill: "Менторинг", current: 5, required: 8, priority: "medium" }
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 py-12">
      <div className="container mx-auto px-4 max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Карьерная траектория</h1>
            <p className="text-muted-foreground text-lg">
              Визуальная roadmap вашего профессионального развития
            </p>
          </div>
          <Button onClick={() => navigate('/profile')}>
            <Icon name="User" size={20} className="mr-2" />
            Профиль
          </Button>
        </div>

        <div className="relative py-12">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden lg:block" />
          
          <div className="space-y-16">
            {careerPath.map((stage, index) => (
              <div key={stage.id} className={`relative ${index % 2 === 0 ? 'lg:pr-[50%]' : 'lg:pl-[50%]'} animate-fade-in`} style={{ animationDelay: `${index * 150}ms` }}>
                <div className={`absolute hidden lg:block top-8 ${index % 2 === 0 ? 'right-[50%] mr-[-20px]' : 'left-[50%] ml-[-20px]'}`}>
                  <div className={`w-10 h-10 rounded-full border-4 border-background ${
                    stage.status === 'current' ? 'bg-primary' : 
                    stage.status === 'next' ? 'bg-secondary' : 'bg-accent'
                  } shadow-lg`} />
                </div>

                <Card className={`${
                  stage.status === 'current' ? 'border-primary shadow-lg shadow-primary/20' :
                  stage.status === 'next' ? 'border-secondary shadow-md' : 'border-muted'
                }`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <Badge variant={
                            stage.status === 'current' ? 'default' :
                            stage.status === 'next' ? 'secondary' : 'outline'
                          } className="text-xs">
                            {stage.level}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{stage.description}</span>
                        </div>
                        <CardTitle className="text-2xl">{stage.role}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Clock" size={16} />
                          <span>{stage.timeframe}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">{stage.readiness}%</div>
                        <p className="text-xs text-muted-foreground mt-1">готовность</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Progress value={stage.readiness} className="h-2 mb-6" />
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Icon name="CheckCircle" size={18} className="text-green-500" />
                        Требуемые компетенции
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {stage.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {stage.missingSkills && stage.missingSkills.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Icon name="AlertCircle" size={18} className="text-orange-500" />
                          Необходимо развить
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {stage.missingSkills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="text-sm">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {stage.status !== 'current' && (
                      <Button variant="outline" className="w-full mt-4">
                        <Icon name="Target" size={16} className="mr-2" />
                        Создать план для достижения
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" size={24} className="text-primary" />
              Анализ разрывов компетенций
            </CardTitle>
            <CardDescription>Ключевые навыки для перехода на следующий уровень</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {competencyGaps.map((gap, index) => (
                <div key={index} className="space-y-3 pb-6 border-b last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">{gap.skill}</h4>
                        <Badge variant={gap.priority === 'high' ? 'default' : 'outline'} className="text-xs">
                          {gap.priority === 'high' ? 'Высокий приоритет' : 'Средний приоритет'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Текущий уровень:</span>
                          <span className="ml-2 font-semibold">{gap.current}/10</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Требуется:</span>
                          <span className="ml-2 font-semibold text-primary">{gap.required}/10</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-500">+{gap.required - gap.current}</div>
                      <p className="text-xs text-muted-foreground">разрыв</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Прогресс</span>
                      <span>{Math.round((gap.current / gap.required) * 100)}%</span>
                    </div>
                    <Progress value={(gap.current / gap.required) * 100} className="h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="animate-fade-in" style={{ animationDelay: '550ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Calendar" size={24} className="text-secondary" />
                Ближайшие шаги
              </CardTitle>
              <CardDescription>Действия на следующие 3 месяца</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: "Пройти курс по системному дизайну", deadline: "2 недели" },
                  { action: "Начать менторить junior разработчика", deadline: "1 месяц" },
                  { action: "Провести tech talk в команде", deadline: "6 недель" },
                  { action: "Оптимизировать производительность модуля", deadline: "2 месяца" }
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary/50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="ArrowRight" size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{step.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">Срок: {step.deadline}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '600ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Award" size={24} className="text-accent" />
                Ожидаемые результаты
              </CardTitle>
              <CardDescription>Что вы получите через год</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Переход на Senior позицию", icon: "TrendingUp", color: "text-green-500" },
                  { title: "Увеличение влияния в команде", icon: "Users", color: "text-blue-500" },
                  { title: "Рост технической экспертизы", icon: "Code", color: "text-purple-500" },
                  { title: "Развитие лидерских качеств", icon: "Star", color: "text-yellow-500" }
                ].map((result, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center ${result.color}`}>
                      <Icon name={result.icon as any} size={20} />
                    </div>
                    <p className="font-medium">{result.title}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};

export default Career;