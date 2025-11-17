import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Development = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    { id: 1, title: "Изучить паттерны проектирования", category: "hard", impact: "high", deadline: "2 недели", completed: false, progress: 60 },
    { id: 2, title: "Развить навыки публичных выступлений", category: "soft", impact: "medium", deadline: "1 месяц", completed: false, progress: 30 },
    { id: 3, title: "Пройти курс по архитектуре приложений", category: "hard", impact: "high", deadline: "3 недели", completed: false, progress: 45 },
    { id: 4, title: "Улучшить навыки делегирования", category: "soft", impact: "high", deadline: "2 недели", completed: false, progress: 20 },
    { id: 5, title: "Получить сертификацию AWS", category: "hard", impact: "medium", deadline: "2 месяца", completed: true, progress: 100 }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed, progress: !task.completed ? 100 : task.progress } : task
    ));
  };

  const overallProgress = Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length);
  const softSkillsProgress = Math.round(
    tasks.filter(t => t.category === 'soft').reduce((sum, task) => sum + task.progress, 0) / 
    tasks.filter(t => t.category === 'soft').length
  );
  const hardSkillsProgress = Math.round(
    tasks.filter(t => t.category === 'hard').reduce((sum, task) => sum + task.progress, 0) / 
    tasks.filter(t => t.category === 'hard').length
  );

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 py-12">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">План развития</h1>
            <p className="text-muted-foreground text-lg">
              Персональные задачи для достижения ваших карьерных целей
            </p>
          </div>
          <Button onClick={() => navigate('/profile')}>
            <Icon name="User" size={20} className="mr-2" />
            Профиль
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Общий прогресс</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-4xl font-bold text-primary">{overallProgress}%</div>
              <Progress value={overallProgress} className="h-2" />
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Soft Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-4xl font-bold text-secondary">{softSkillsProgress}%</div>
              <Progress value={softSkillsProgress} className="h-2" />
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Hard Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-4xl font-bold text-accent">{hardSkillsProgress}%</div>
              <Progress value={hardSkillsProgress} className="h-2" />
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Индекс роста</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">+12</span>
                <Icon name="TrendingUp" size={20} className="text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground">За последний месяц</p>
            </CardContent>
          </Card>
        </div>

        <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Персональный план</CardTitle>
              <CardDescription>Задачи для вашего профессионального роста</CardDescription>
            </div>
            <Button 
              onClick={() => {
                setIsGenerating(true);
                setTimeout(() => {
                  const newTasks = [
                    { id: Date.now() + 1, title: "Провести tech talk по архитектуре", category: "soft", impact: "high", deadline: "3 недели", completed: false, progress: 0 },
                    { id: Date.now() + 2, title: "Изучить микрофронтенды", category: "hard", impact: "high", deadline: "1 месяц", completed: false, progress: 0 },
                    { id: Date.now() + 3, title: "Менторить junior разработчика", category: "soft", impact: "high", deadline: "2 месяца", completed: false, progress: 0 }
                  ];
                  setTasks([...tasks.filter(t => !t.completed), ...newTasks, ...tasks.filter(t => t.completed)]);
                  setIsGenerating(false);
                }, 2000);
              }}
              disabled={isGenerating}
            >
              <Icon name={isGenerating ? "Loader2" : "Sparkles"} size={20} className={`mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Генерирую...' : 'Сгенерировать новый план'}
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {activeTasks.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Активные задачи</h3>
                {activeTasks.map((task) => (
                  <div key={task.id} className="p-4 rounded-lg border hover:border-primary/50 transition-all group">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-medium group-hover:text-primary transition-colors">{task.title}</h4>
                            <div className="flex gap-2 mt-2">
                              <Badge variant={task.category === 'soft' ? 'default' : 'secondary'} className="text-xs">
                                {task.category === 'soft' ? 'Soft' : 'Hard'}
                              </Badge>
                              <Badge variant={task.impact === 'high' ? 'default' : 'outline'} className="text-xs">
                                {task.impact === 'high' ? 'Высокий impact' : 'Средний impact'}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Icon name="Clock" size={14} />
                              {task.deadline}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Прогресс</span>
                            <span className="font-medium">{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {completedTasks.length > 0 && (
              <div className="space-y-3 pt-4 border-t">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Выполнено</h3>
                {completedTasks.map((task) => (
                  <div key={task.id} className="p-4 rounded-lg border bg-muted/50">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium line-through text-muted-foreground">{task.title}</h4>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {task.category === 'soft' ? 'Soft' : 'Hard'}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Icon name="CheckCircle" size={12} className="mr-1" />
                            Завершено
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BookOpen" size={24} className="text-primary" />
                Рекомендованные ресурсы
              </CardTitle>
              <CardDescription>Материалы для вашего развития</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: "System Design Interview", type: "Курс", time: "12 часов" },
                  { title: "Effective Communication", type: "Вебинар", time: "2 часа" },
                  { title: "Clean Architecture", type: "Книга", time: "320 стр." }
                ].map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:border-primary/50 transition-colors cursor-pointer">
                    <div>
                      <p className="font-medium">{resource.title}</p>
                      <p className="text-sm text-muted-foreground">{resource.type} • {resource.time}</p>
                    </div>
                    <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '600ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Trophy" size={24} className="text-secondary" />
                Достижения
              </CardTitle>
              <CardDescription>Ваши профессиональные вехи</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: "Первый завершенный план", icon: "Award", color: "text-yellow-500" },
                  { title: "5 навыков освоено", icon: "Star", color: "text-blue-500" },
                  { title: "Месяц стабильного роста", icon: "TrendingUp", color: "text-green-500" }
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center ${achievement.color}`}>
                      <Icon name={achievement.icon as any} size={20} />
                    </div>
                    <p className="font-medium">{achievement.title}</p>
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

export default Development;