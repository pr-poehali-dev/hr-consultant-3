import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

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

const ProfileNew = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }

    const savedProjects = localStorage.getItem('userProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
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
        description: `Загружено файлов: ${newProjects.length}`
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
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="info">
              <Icon name="User" size={16} className="mr-2" />
              Личная информация
            </TabsTrigger>
            <TabsTrigger value="projects">
              <Icon name="FolderOpen" size={16} className="mr-2" />
              Мои проекты
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
                  {userData.socialLinks && userData.socialLinks.length > 0 ? (
                    userData.socialLinks.map((link, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Icon name="ExternalLink" size={20} className="text-primary" />
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {link}
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="text-muted-foreground text-sm">
                      Социальные сети не указаны
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
                  Загрузите документы, проекты или научные работы для анализа ИИ
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
                      Загрузка файлов...
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
                <CardDescription>
                  Ваши документы и проекты
                </CardDescription>
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
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileNew;
