import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: "Target",
      title: "Диагностика навыков",
      description: "Оценка компетенций, построение карты навыков, анализ сильных/слабых сторон"
    },
    {
      icon: "TrendingUp",
      title: "Карьерная траектория",
      description: "Подбор реалистичных карьерных направлений с учётом уровня, навыков и корпоративных треков"
    },
    {
      icon: "Clipboard",
      title: "План развития",
      description: "Индивидуальный набор задач, рекомендации по ресурсам, оценка прогресса"
    },
    {
      icon: "BarChart3",
      title: "Профессиональные метрики",
      description: "Индекс развития, динамика навыков, карьерный уровень"
    }
  ];

  const metrics = [
    { label: "AI Development Index", value: 72, color: "bg-primary" },
    { label: "Skill Map Coverage", value: 58, color: "bg-secondary" },
    { label: "Career Readiness", value: 85, color: "bg-accent" }
  ];

  const steps = [
    { number: "01", title: "Пройдите диагностику", description: "Оцените свои навыки и определите цели" },
    { number: "02", title: "Получите карьерную траекторию", description: "ИИ построит персональный план развития" },
    { number: "03", title: "Начните работать по плану", description: "Выполняйте задачи и отслеживайте прогресс" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16 space-y-24">
        
        <section className="text-center space-y-8 max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Icon name="Sparkles" size={16} />
            <span>ИИ-платформа для профессионального роста</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            HR Консультант
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ИИ-ассистент анализирует навыки, помогает ставить карьерные цели и формирует персональные планы развития
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link to="/diagnostic">
              <Button size="lg" className="text-lg px-8 py-6 rounded-xl">
                <Icon name="Zap" size={20} className="mr-2" />
                Пройти диагностику
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl">
                <Icon name="User" size={20} className="mr-2" />
                Войти в профиль
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon name={feature.icon as any} size={24} className="text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Прогресс и метрики</h2>
            <p className="text-muted-foreground text-lg">
              Отслеживайте свое профессиональное развитие с помощью ключевых показателей
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <CardTitle className="text-base font-medium text-muted-foreground">{metric.label}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold">{metric.value}%</div>
                  <Progress value={metric.value} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Как это работает</h2>
            <p className="text-muted-foreground text-lg">
              Простой путь к профессиональному развитию
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto text-center space-y-8 py-12">
          <h2 className="text-3xl md:text-4xl font-bold">Готовы начать путь развития?</h2>
          <p className="text-muted-foreground text-lg">
            Пройдите диагностику за 5-7 минут и получите персональный план карьерного роста
          </p>
          <Link to="/diagnostic">
            <Button size="lg" className="text-lg px-12 py-6 rounded-xl">
              <Icon name="Rocket" size={20} className="mr-2" />
              Начать сейчас
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Home;
