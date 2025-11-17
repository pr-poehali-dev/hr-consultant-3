import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

interface Project {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  status: "active" | "completed" | "archived";
}

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "E-commerce платформа",
      type: "React + TypeScript",
      uploadDate: "15.11.2024",
      size: "2.4 MB",
      status: "active"
    },
    {
      id: "2",
      name: "Система управления задачами",
      type: "Vue.js",
      uploadDate: "03.11.2024",
      size: "1.8 MB",
      status: "completed"
    },
    {
      id: "3",
      name: "Мобильное приложение",
      type: "React Native",
      uploadDate: "21.10.2024",
      size: "3.1 MB",
      status: "active"
    }
  ]);

  const getStatusBadge = (status: Project['status']) => {
    const variants = {
      active: { label: "В работе", variant: "default" as const },
      completed: { label: "Завершён", variant: "secondary" as const },
      archived: { label: "Архив", variant: "outline" as const }
    };
    return variants[status];
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 py-12">
        <div className="container mx-auto px-4 max-w-6xl space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Мои проекты</h1>
              <p className="text-muted-foreground text-lg">
                Портфолио ваших работ и достижений
              </p>
            </div>
            <Button onClick={() => navigate('/profile')}>
              <Icon name="User" size={20} className="mr-2" />
              Профиль
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="FolderOpen" size={24} className="text-primary" />
                Список проектов
              </CardTitle>
              <CardDescription>
                Все ваши загруженные проекты и работы
              </CardDescription>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <Icon name="Folder" size={64} className="mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">Проекты не найдены</p>
                  <Button>
                    <Icon name="Upload" size={20} className="mr-2" />
                    Загрузить проект
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => {
                    const statusBadge = getStatusBadge(project.status);
                    return (
                      <div
                        key={project.id}
                        className="p-4 rounded-lg border hover:border-primary/50 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              <Icon name="FileCode" size={20} className="text-primary" />
                              <h3 className="font-semibold text-lg">{project.name}</h3>
                              <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Icon name="Code" size={14} />
                                <span>{project.type}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="Calendar" size={14} />
                                <span>{project.uploadDate}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="HardDrive" size={14} />
                                <span>{project.size}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Icon name="Eye" size={16} className="mr-1" />
                              Открыть
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Projects;
