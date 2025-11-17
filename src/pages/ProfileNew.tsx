import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

interface UserData {
  fullName: string;
  phone: string;
  email: string;
  position: string;
  github?: string;
  socialLinks?: string[];
}

interface Project {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

interface Task {
  id: string;
  title: string;
  category: 'soft' | 'hard';
  deadline: string;
  progress: number;
  impact: 'high' | 'medium' | 'low';
  completed: boolean;
}

interface Resource {
  id: string;
  title: string;
  category: string;
  type: 'course' | 'article' | 'webinar' | 'book' | 'practice';
  url: string;
  recommended: boolean;
}

const ProfileNew = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Курс по лидерству для менеджеров',
      category: 'Лидерство',
      type: 'course',
      url: '#',
      recommended: true
    },
    {
      id: '2',
      title: 'Архитектура микросервисов',
      category: 'Технические навыки',
      type: 'article',
      url: '#',
      recommended: true
    },
    {
      id: '3',
      title: 'Эффективная коммуникация в команде',
      category: 'Soft Skills',
      type: 'webinar',
      url: '#',
      recommended: true
    },
    {
      id: '4',
      title: 'Clean Code - Robert Martin',
      category: 'Технические навыки',
      type: 'book',
      url: '#',
      recommended: false
    },
    {
      id: '5',
      title: 'Практикум по системному дизайну',
      category: 'Технические навыки',
      type: 'practice',
      url: '#',
      recommended: true
    }
  ]);

  const careerRoadmap = {
    current: {
      role: 'Middle Frontend Developer',
      skills: ['React', 'TypeScript', 'REST API'],
      level: 60
    },
    next: {
      role: 'Senior Frontend Developer',
      skills: ['Архитектура', 'Менторство', 'Performance'],
      duration: '8-12 месяцев',
      progress: 45
    },
    future: {
      role: 'Tech Lead / Engineering Manager',
      skills: ['Лидерство', 'Стратегия', 'Управление командой'],
      duration: '18-24 месяца',
      progress: 15
    }
  };

  const overallProgress = {
    total: 52,
    softSkills: 68,
    hardSkills: 74,
    developmentIndex: 72
  };

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }

    const savedProjects = localStorage.getItem('userProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }

    const savedTasks = localStorage.getItem('developmentTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    setTimeout(() => {
      const newProjects = Array.from(files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type || 'unknown',
        uploadDate: new Date().toLocaleDateString('ru-RU'),
        size: (file.size / 1024).toFixed(2) + ' KB'
      }));

      const updatedProjects = [...projects, ...newProjects];
      setProjects(updatedProjects);
      localStorage.setItem('userProjects', JSON.stringify(updatedProjects));
      
      setIsUploading(false);
      toast({
        title: "Успешно!",
        description: `Загружено файлов: ${newProjects.length}. Индексы обновлены!`
      });
    }, 1500);
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem('userProjects', JSON.stringify(updatedProjects));
    
    toast({
      title: "Удалено",
      description: "Проект удален из списка"
    });
  };

  const generateDevelopmentPlan = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const newTasks: Task[] = [
        {
          id: '1',
          title: 'Изучить паттерны проектирования',
          category: 'hard',
          deadline: '2025-12-15',
          progress: 0,
          impact: 'high',
          completed: false
        },
        {
          id: '2',
          title: 'Провести код-ревью для junior разработчиков',
          category: 'soft',
          deadline: '2025-12-01',
          progress: 0,
          impact: 'high',
          completed: false
        },
        {
          id: '3',
          title: 'Оптимизировать производительность приложения',
          category: 'hard',
          deadline: '2025-12-20',
          progress: 0,
          impact: 'medium',
          completed: false
        },
        {
          id: '4',
          title: 'Улучшить навыки публичных выступлений',
          category: 'soft',
          deadline: '2026-01-10',
          progress: 0,
          impact: 'medium',
          completed: false
        },
        {
          id: '5',
          title: 'Освоить архитектуру микрофронтендов',
          category: 'hard',
          deadline: '2026-01-30',
          progress: 0,
          impact: 'high',
          completed: false
        }
      ];
      
      setTasks(newTasks);
      localStorage.setItem('developmentTasks', JSON.stringify(newTasks));
      setIsGenerating(false);
      
      toast({
        title: "План создан!",
        description: "ИИ сгенерировал персональный план развития"
      });
    }, 2000);
  };

  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, progress: !task.completed ? 100 : 0 }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('developmentTasks', JSON.stringify(updatedTasks));
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-primary" />
            <CardTitle>Требуется регистрация</CardTitle>
            <CardDescription>Пожалуйста, пройдите регистрацию для доступа к профилю</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/registration')} className="w-full">
              <Icon name="UserPlus" size={20} className="mr-2" />
              Зарегистрироваться
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const initials = userData.fullName.split(' ').map(n => n[0]).join('').toUpperCase();

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
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-3xl font-bold">{userData.fullName}</h2>
                  <p className="text-lg text-muted-foreground">{userData.position}</p>
                  <p className="text-sm text-muted-foreground">{userData.email}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default" className="text-sm px-3 py-1">
                    <Icon name="Briefcase" size={14} className="mr-1" />
                    Активный пользователь
                  </Badge>
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    <Icon name="Calendar" size={14} className="mr-1" />
                    На платформе с {new Date().toLocaleDateString('ru-RU', { month: 'short', year: 'numeric' })}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="info">
              <Icon name="User" size={16} className="mr-2" />
              Личная информация
            </TabsTrigger>
            <TabsTrigger value="projects">
              <Icon name="FolderOpen" size={16} className="mr-2" />
              Мои проекты
            </TabsTrigger>
            <TabsTrigger value="career">
              <Icon name="TrendingUp" size={16} className="mr-2" />
              Карьера
            </TabsTrigger>
            <TabsTrigger value="development">
              <Icon name="Target" size={16} className="mr-2" />
              План развития
            </TabsTrigger>
            <TabsTrigger value="resources">
              <Icon name="Library" size={16} className="mr-2" />
              Ресурсы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="UserCircle" size={24} className="text-primary" />
                  Контактная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">ФИО</Label>
                    <div className="font-medium text-lg">{userData.fullName}</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Должность</Label>
                    <div className="font-medium text-lg">{userData.position}</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Телефон</Label>
                    <div className="font-medium text-lg">{userData.phone}</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Email</Label>
                    <div className="font-medium text-lg">{userData.email}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Link" size={24} className="text-primary" />
                  Социальные сети и GitHub
                </CardTitle>
                <CardDescription>
                  Информация появится после прохождения диагностики
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.github ? (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Icon name="Github" size={20} className="text-primary" />
                      <a href={userData.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {userData.github}
                      </a>
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-sm">
                      GitHub не указан
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Rocket" size={24} className="text-primary" />
                  Загрузить новый проект
                </CardTitle>
                <CardDescription>
                  Загрузите документы, проекты или научные работы. ИИ проанализирует их и обновит ваши индексы
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-primary/30 rounded-lg hover:border-primary/50 transition-colors cursor-pointer bg-gradient-to-br from-primary/5 to-secondary/5">
                  <input
                    type="file"
                    id="fileUpload"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                  />
                  <label htmlFor="fileUpload" className="cursor-pointer text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Icon name="Rocket" size={32} className="text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold">Нажмите для загрузки</div>
                      <div className="text-sm text-muted-foreground">PDF, DOC, DOCX, TXT, PPT, PPTX</div>
                    </div>
                  </label>
                </div>
                {isUploading && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Loader2" size={16} className="animate-spin" />
                      Загрузка и анализ файлов...
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FolderOpen" size={24} className="text-primary" />
                  Загруженные проекты ({projects.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {projects.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="Inbox" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Пока нет загруженных проектов</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon name="FileText" size={24} className="text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{project.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {project.uploadDate} • {project.size}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteProject(project.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Icon name="Trash2" size={18} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="career" className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Map" size={24} className="text-primary" />
                  Карьерная карта
                </CardTitle>
                <CardDescription>
                  Визуальная roadmap вашего профессионального роста
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="relative">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex-1 space-y-4">
                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary">
                          <div className="absolute -top-3 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                            Текущая роль
                          </div>
                          <h3 className="text-xl font-bold mb-2">{careerRoadmap.current.role}</h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {careerRoadmap.current.skills.map((skill, idx) => (
                              <Badge key={idx} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                          <Progress value={careerRoadmap.current.level} className="h-2" />
                          <div className="text-sm text-muted-foreground mt-2">
                            Уровень владения: {careerRoadmap.current.level}%
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <Icon name="ArrowDown" size={32} className="text-primary animate-bounce" />
                        </div>

                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 border-2 border-secondary">
                          <div className="absolute -top-3 left-4 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full">
                            Ближайшая цель
                          </div>
                          <h3 className="text-xl font-bold mb-2">{careerRoadmap.next.role}</h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {careerRoadmap.next.skills.map((skill, idx) => (
                              <Badge key={idx} variant="outline">{skill}</Badge>
                            ))}
                          </div>
                          <Progress value={careerRoadmap.next.progress} className="h-2" />
                          <div className="text-sm text-muted-foreground mt-2">
                            Прогресс: {careerRoadmap.next.progress}% • Срок: {careerRoadmap.next.duration}
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <Icon name="ArrowDown" size={32} className="text-muted-foreground" />
                        </div>

                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border-2 border-muted">
                          <div className="absolute -top-3 left-4 px-3 py-1 bg-muted text-muted-foreground text-xs font-bold rounded-full">
                            Долгосрочная цель
                          </div>
                          <h3 className="text-xl font-bold mb-2">{careerRoadmap.future.role}</h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {careerRoadmap.future.skills.map((skill, idx) => (
                              <Badge key={idx} variant="outline">{skill}</Badge>
                            ))}
                          </div>
                          <Progress value={careerRoadmap.future.progress} className="h-2" />
                          <div className="text-sm text-muted-foreground mt-2">
                            Прогресс: {careerRoadmap.future.progress}% • Срок: {careerRoadmap.future.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="development" className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BarChart3" size={24} className="text-primary" />
                  Прогресс развития
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Общий прогресс</Label>
                    <div className="text-3xl font-bold">{overallProgress.total}%</div>
                    <Progress value={overallProgress.total} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Soft Skills</Label>
                    <div className="text-3xl font-bold text-primary">{overallProgress.softSkills}%</div>
                    <Progress value={overallProgress.softSkills} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Hard Skills</Label>
                    <div className="text-3xl font-bold text-secondary">{overallProgress.hardSkills}%</div>
                    <Progress value={overallProgress.hardSkills} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Индекс развития</Label>
                    <div className="text-3xl font-bold text-accent">{overallProgress.developmentIndex}</div>
                    <Progress value={overallProgress.developmentIndex} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Sparkles" size={24} className="text-primary" />
                      Персональный план развития
                    </CardTitle>
                    <CardDescription>
                      ИИ создаст индивидуальный план на основе ваших данных
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={generateDevelopmentPlan} 
                    disabled={isGenerating}
                    className="gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <Icon name="Loader2" size={16} className="animate-spin" />
                        Генерация...
                      </>
                    ) : (
                      <>
                        <Icon name="Wand2" size={16} />
                        Сгенерировать план
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {tasks.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Icon name="ListTodo" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Нажмите кнопку для создания плана развития</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          task.completed 
                            ? 'bg-muted/50 border-muted opacity-70' 
                            : 'bg-background border-primary/20 hover:border-primary/40'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => toggleTaskCompletion(task.id)}
                            className="mt-1"
                          />
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h4 className={`font-semibold ${task.completed ? 'line-through' : ''}`}>
                                  {task.title}
                                </h4>
                                <div className="flex gap-2 mt-2">
                                  <Badge variant={task.category === 'soft' ? 'default' : 'secondary'}>
                                    {task.category === 'soft' ? 'Soft Skills' : 'Hard Skills'}
                                  </Badge>
                                  <Badge 
                                    variant="outline"
                                    className={
                                      task.impact === 'high' 
                                        ? 'border-red-500 text-red-500' 
                                        : task.impact === 'medium'
                                        ? 'border-yellow-500 text-yellow-500'
                                        : 'border-green-500 text-green-500'
                                    }
                                  >
                                    {task.impact === 'high' ? '🔥 Высокое влияние' : task.impact === 'medium' ? '⚡ Среднее влияние' : '✓ Низкое влияние'}
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <Icon name="Calendar" size={14} />
                                {task.deadline}
                              </div>
                            </div>
                            {!task.completed && (
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Прогресс</span>
                                  <span className="font-medium">{task.progress}%</span>
                                </div>
                                <Progress value={task.progress} className="h-2" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Sparkles" size={24} className="text-primary" />
                  Рекомендованные подборки
                </CardTitle>
                <CardDescription>
                  ИИ подобрал ресурсы специально для вас на основе диагностики
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {resources.filter(r => r.recommended).map((resource) => (
                    <div
                      key={resource.id}
                      className="p-4 rounded-lg border-2 border-primary/20 hover:border-primary/40 transition-all bg-gradient-to-br from-primary/5 to-transparent"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon 
                              name={
                                resource.type === 'course' ? 'GraduationCap' :
                                resource.type === 'article' ? 'FileText' :
                                resource.type === 'webinar' ? 'Video' :
                                resource.type === 'book' ? 'Book' :
                                'Wrench'
                              } 
                              size={24} 
                              className="text-primary" 
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{resource.title}</h4>
                            <div className="flex gap-2">
                              <Badge variant="outline">{resource.category}</Badge>
                              <Badge variant="secondary">
                                {resource.type === 'course' ? 'Курс' :
                                 resource.type === 'article' ? 'Статья' :
                                 resource.type === 'webinar' ? 'Вебинар' :
                                 resource.type === 'book' ? 'Книга' :
                                 'Практика'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Icon name="ExternalLink" size={16} className="mr-2" />
                          Открыть
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Library" size={24} className="text-primary" />
                  Все ресурсы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {resources.filter(r => !r.recommended).map((resource) => (
                    <div
                      key={resource.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <Icon 
                            name={
                              resource.type === 'course' ? 'GraduationCap' :
                              resource.type === 'article' ? 'FileText' :
                              resource.type === 'webinar' ? 'Video' :
                              resource.type === 'book' ? 'Book' :
                              'Wrench'
                            } 
                            size={20} 
                          />
                        </div>
                        <div>
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-sm text-muted-foreground">{resource.category}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Icon name="ExternalLink" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileNew;
