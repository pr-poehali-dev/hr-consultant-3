import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Resources = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const aiRecommendations = [
    {
      title: "Подборка для перехода в Senior",
      description: "Персональная подборка на основе вашего профиля и карьерных целей",
      icon: "TrendingUp",
      color: "text-primary",
      resourceCount: 8
    },
    {
      title: "Развитие лидерства",
      description: "Материалы для развития soft skills и управленческих компетенций",
      icon: "Users",
      color: "text-secondary",
      resourceCount: 6
    },
    {
      title: "Подготовка к менеджерской роли",
      description: "Комплексная программа для Tech Lead / Engineering Manager",
      icon: "Award",
      color: "text-accent",
      resourceCount: 10
    }
  ];

  const resources = {
    courses: [
      {
        title: "System Design Interview",
        provider: "Educative.io",
        duration: "12 часов",
        level: "Advanced",
        rating: 4.8,
        tags: ["Архитектура", "Интервью"],
        recommended: true
      },
      {
        title: "Leadership Principles for Engineers",
        provider: "Coursera",
        duration: "6 недель",
        level: "Intermediate",
        rating: 4.7,
        tags: ["Лидерство", "Менеджмент"],
        recommended: true
      },
      {
        title: "Advanced React Patterns",
        provider: "Frontend Masters",
        duration: "8 часов",
        level: "Advanced",
        rating: 4.9,
        tags: ["React", "Паттерны"],
        recommended: false
      },
      {
        title: "Performance Optimization",
        provider: "Udemy",
        duration: "10 часов",
        level: "Intermediate",
        rating: 4.6,
        tags: ["Performance", "Web"],
        recommended: true
      }
    ],
    articles: [
      {
        title: "The Road to Senior Engineering",
        author: "Will Larson",
        readTime: "12 мин",
        source: "Staff Eng",
        tags: ["Карьера", "Senior"],
        recommended: true
      },
      {
        title: "Technical Leadership and Architecture",
        author: "Martin Fowler",
        readTime: "15 мин",
        source: "martinfowler.com",
        tags: ["Лидерство", "Архитектура"],
        recommended: true
      },
      {
        title: "How to Give Effective Feedback",
        author: "Lara Hogan",
        readTime: "8 мин",
        source: "wherewithall.com",
        tags: ["Менеджмент", "Коммуникация"],
        recommended: false
      }
    ],
    webinars: [
      {
        title: "From IC to Tech Lead",
        speaker: "Sarah Drasner",
        date: "22 ноя 2024",
        duration: "90 мин",
        tags: ["Карьера", "Tech Lead"],
        upcoming: true
      },
      {
        title: "Building Design Systems at Scale",
        speaker: "Brad Frost",
        date: "15 дек 2024",
        duration: "60 мин",
        tags: ["Design Systems", "UI"],
        upcoming: true
      }
    ],
    books: [
      {
        title: "The Manager's Path",
        author: "Camille Fournier",
        pages: 244,
        year: 2017,
        rating: 4.5,
        tags: ["Менеджмент", "Карьера"],
        recommended: true
      },
      {
        title: "Staff Engineer: Leadership Beyond the Management Track",
        author: "Will Larson",
        pages: 320,
        year: 2021,
        rating: 4.7,
        tags: ["Лидерство", "Архитектура"],
        recommended: true
      },
      {
        title: "Clean Architecture",
        author: "Robert Martin",
        pages: 432,
        year: 2017,
        rating: 4.6,
        tags: ["Архитектура", "Паттерны"],
        recommended: false
      }
    ],
    practical: [
      {
        title: "Code Review Practice Sessions",
        description: "Еженедельные сессии по разбору реального кода",
        format: "Live Sessions",
        frequency: "Каждую среду",
        tags: ["Code Review", "Практика"],
        recommended: true
      },
      {
        title: "System Design Mock Interviews",
        description: "Практические интервью с фидбеком",
        format: "1-on-1",
        frequency: "По запросу",
        tags: ["Интервью", "System Design"],
        recommended: true
      },
      {
        title: "Open Source Contribution Guide",
        description: "Пошаговый план участия в Open Source проектах",
        format: "Self-paced",
        frequency: "Гибкий график",
        tags: ["Open Source", "Coding"],
        recommended: false
      }
    ]
  };

  const renderCourses = () => (
    <div className="grid md:grid-cols-2 gap-4">
      {resources.courses.map((course, index) => (
        <Card key={index} className={`hover:border-primary/50 transition-all ${course.recommended ? 'border-primary/30' : ''}`}>
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription className="mt-1">{course.provider}</CardDescription>
              </div>
              {course.recommended && (
                <Badge variant="default" className="text-xs">
                  <Icon name="Sparkles" size={12} className="mr-1" />
                  AI рекомендует
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>{course.duration}</span>
                </div>
                <Badge variant="outline" className="text-xs">{course.level}</Badge>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <Icon name="Star" size={14} />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-2">
              <Icon name="ExternalLink" size={14} className="mr-2" />
              Перейти к курсу
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderArticles = () => (
    <div className="space-y-3">
      {resources.articles.map((article, index) => (
        <Card key={index} className={`hover:border-primary/50 transition-all ${article.recommended ? 'border-primary/30' : ''}`}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-start gap-2">
                  <h3 className="font-semibold text-lg">{article.title}</h3>
                  {article.recommended && (
                    <Badge variant="default" className="text-xs">
                      <Icon name="Sparkles" size={12} className="mr-1" />
                      AI
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {article.author} • {article.source}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Icon name="Clock" size={14} />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="ExternalLink" size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderWebinars = () => (
    <div className="grid md:grid-cols-2 gap-4">
      {resources.webinars.map((webinar, index) => (
        <Card key={index} className="hover:border-primary/50 transition-all">
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg">{webinar.title}</CardTitle>
              {webinar.upcoming && (
                <Badge variant="default" className="text-xs">Скоро</Badge>
              )}
            </div>
            <CardDescription>{webinar.speaker}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Icon name="Calendar" size={14} />
                <span>{webinar.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={14} />
                <span>{webinar.duration}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {webinar.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
            <Button className="w-full mt-2">
              <Icon name="Calendar" size={14} className="mr-2" />
              Зарегистрироваться
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderBooks = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {resources.books.map((book, index) => (
        <Card key={index} className={`hover:border-primary/50 transition-all ${book.recommended ? 'border-primary/30' : ''}`}>
          <CardHeader>
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base leading-tight">{book.title}</CardTitle>
                {book.recommended && (
                  <Badge variant="default" className="text-xs flex-shrink-0">
                    <Icon name="Sparkles" size={10} />
                  </Badge>
                )}
              </div>
              <CardDescription className="text-sm">{book.author}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{book.pages} стр. • {book.year}</span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Icon name="Star" size={14} />
                <span className="text-sm font-medium">{book.rating}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-2" size="sm">
              <Icon name="BookOpen" size={14} className="mr-2" />
              Подробнее
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderPractical = () => (
    <div className="space-y-3">
      {resources.practical.map((item, index) => (
        <Card key={index} className={`hover:border-primary/50 transition-all ${item.recommended ? 'border-primary/30' : ''}`}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Zap" size={24} className="text-primary" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                  {item.recommended && (
                    <Badge variant="default" className="text-xs">
                      <Icon name="Sparkles" size={12} className="mr-1" />
                      AI
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="outline">{item.format}</Badge>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    <span>{item.frequency}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <Button variant="outline" className="mt-2">
                  <Icon name="Play" size={14} className="mr-2" />
                  Начать
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 py-12">
      <div className="container mx-auto px-4 max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Ресурсы для развития</h1>
            <p className="text-muted-foreground text-lg">
              Персонализированные материалы для достижения ваших карьерных целей
            </p>
          </div>
          <Button onClick={() => navigate('/profile')}>
            <Icon name="User" size={20} className="mr-2" />
            Профиль
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {aiRecommendations.map((rec, index) => (
            <Card key={index} className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/50 transition-all animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-lg bg-background flex items-center justify-center ${rec.color}`}>
                    <Icon name={rec.icon as any} size={24} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{rec.title}</CardTitle>
                    <CardDescription className="mt-1">{rec.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{rec.resourceCount} материалов</span>
                  <Button variant="ghost" size="sm">
                    <span className="text-sm font-medium">Открыть</span>
                    <Icon name="ArrowRight" size={14} className="ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Library" size={24} />
              Все ресурсы
            </CardTitle>
            <CardDescription>Выберите категорию материалов</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="courses" className="space-y-6">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="courses" className="flex items-center gap-2">
                  <Icon name="GraduationCap" size={16} />
                  Курсы
                </TabsTrigger>
                <TabsTrigger value="articles" className="flex items-center gap-2">
                  <Icon name="FileText" size={16} />
                  Статьи
                </TabsTrigger>
                <TabsTrigger value="webinars" className="flex items-center gap-2">
                  <Icon name="Video" size={16} />
                  Вебинары
                </TabsTrigger>
                <TabsTrigger value="books" className="flex items-center gap-2">
                  <Icon name="BookOpen" size={16} />
                  Книги
                </TabsTrigger>
                <TabsTrigger value="practical" className="flex items-center gap-2">
                  <Icon name="Zap" size={16} />
                  Практика
                </TabsTrigger>
              </TabsList>

              <TabsContent value="courses" className="space-y-4">
                {renderCourses()}
              </TabsContent>

              <TabsContent value="articles" className="space-y-4">
                {renderArticles()}
              </TabsContent>

              <TabsContent value="webinars" className="space-y-4">
                {renderWebinars()}
              </TabsContent>

              <TabsContent value="books" className="space-y-4">
                {renderBooks()}
              </TabsContent>

              <TabsContent value="practical" className="space-y-4">
                {renderPractical()}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resources;
