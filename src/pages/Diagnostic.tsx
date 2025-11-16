import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const Diagnostic = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    position: "",
    level: "",
    softSkills: {
      communication: 5,
      organization: 5,
      problemSolving: 5,
      learning: 5
    },
    hardSkills: {
      analytics: 5,
      projectManagement: 5,
      development: 5
    },
    careerGoal: "",
    skillsToImprove: "",
    priority: "",
    allowDataCollection: false,
    socialLinks: ""
  });

  const updateSkill = (category: 'softSkills' | 'hardSkills', skill: string, value: number[]) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [skill]: value[0]
      }
    }));
  };

  const handleSubmit = () => {
    navigate('/results');
  };

  const softSkillsList = [
    { key: "communication", label: "Коммуникация" },
    { key: "organization", label: "Самоорганизация" },
    { key: "problemSolving", label: "Решение проблем" },
    { key: "learning", label: "Навык обучения" }
  ];

  const hardSkillsList = [
    { key: "analytics", label: "Аналитика" },
    { key: "projectManagement", label: "Управление проектами" },
    { key: "development", label: "Разработка" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 space-y-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            На главную
          </Button>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Диагностика навыков</h1>
            <p className="text-muted-foreground text-lg">
              Ответьте на вопросы — ИИ сформирует карту навыков, определит ваш уровень и предложит осмысленную карьерную траекторию. Время: 5-7 минут.
            </p>
          </div>
          <div className="flex gap-2 pt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all ${
                  s <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>
              {step === 1 && "Основная информация"}
              {step === 2 && "Оценка soft skills"}
              {step === 3 && "Оценка hard skills"}
              {step === 4 && "Цели и предпочтения"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Расскажите о своей текущей позиции"}
              {step === 2 && "Оцените свои гибкие навыки по шкале от 1 до 10"}
              {step === 3 && "Оцените свои профессиональные навыки"}
              {step === 4 && "Определите свои карьерные цели"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="position">Должность</Label>
                  <Input
                    id="position"
                    placeholder="Например: Frontend Developer"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Уровень</Label>
                  <RadioGroup value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="junior" id="junior" />
                      <Label htmlFor="junior" className="flex-1 cursor-pointer">Junior</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="middle" id="middle" />
                      <Label htmlFor="middle" className="flex-1 cursor-pointer">Middle</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="senior" id="senior" />
                      <Label htmlFor="senior" className="flex-1 cursor-pointer">Senior</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                {softSkillsList.map((skill) => (
                  <div key={skill.key} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-base">{skill.label}</Label>
                      <span className="text-2xl font-bold text-primary">
                        {formData.softSkills[skill.key as keyof typeof formData.softSkills]}
                      </span>
                    </div>
                    <Slider
                      value={[formData.softSkills[skill.key as keyof typeof formData.softSkills]]}
                      onValueChange={(value) => updateSkill('softSkills', skill.key, value)}
                      min={1}
                      max={10}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Начальный</span>
                      <span>Экспертный</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                {hardSkillsList.map((skill) => (
                  <div key={skill.key} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-base">{skill.label}</Label>
                      <span className="text-2xl font-bold text-secondary">
                        {formData.hardSkills[skill.key as keyof typeof formData.hardSkills]}
                      </span>
                    </div>
                    <Slider
                      value={[formData.hardSkills[skill.key as keyof typeof formData.hardSkills]]}
                      onValueChange={(value) => updateSkill('hardSkills', skill.key, value)}
                      min={1}
                      max={10}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Начальный</span>
                      <span>Экспертный</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="careerGoal">Какой карьерный уровень вы хотите достигнуть в течение года?</Label>
                  <Input
                    id="careerGoal"
                    placeholder="Например: Senior Developer"
                    value={formData.careerGoal}
                    onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skillsToImprove">Какие навыки вы хотите развить?</Label>
                  <Textarea
                    id="skillsToImprove"
                    placeholder="Опишите навыки, которые хотите улучшить"
                    value={formData.skillsToImprove}
                    onChange={(e) => setFormData({ ...formData, skillsToImprove: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Что для вас важнее?</Label>
                  <RadioGroup value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                    {['Деньги', 'Ответственность', 'Интересные проекты', 'Баланс работы и жизни'].map((option) => (
                      <div key={option} className="flex items-center space-x-2 p-3 rounded-lg border hover:border-primary/50 transition-colors">
                        <RadioGroupItem value={option.toLowerCase()} id={option} />
                        <Label htmlFor={option} className="flex-1 cursor-pointer">{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="dataCollection" className="text-base">Сбор данных из внешних источников</Label>
                      <p className="text-sm text-muted-foreground">GitHub, LinkedIn и другие профили</p>
                    </div>
                    <Switch
                      id="dataCollection"
                      checked={formData.allowDataCollection}
                      onCheckedChange={(checked) => setFormData({ ...formData, allowDataCollection: checked })}
                    />
                  </div>
                  {formData.allowDataCollection && (
                    <div className="space-y-2 pt-2 animate-fade-in">
                      <Label htmlFor="socialLinks">Ссылки на профили</Label>
                      <Textarea
                        id="socialLinks"
                        placeholder="Укажите ссылки на GitHub, LinkedIn и другие профили (по одной на строку)"
                        value={formData.socialLinks}
                        onChange={(e) => setFormData({ ...formData, socialLinks: e.target.value })}
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-6">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                  <Icon name="ChevronLeft" size={20} className="mr-2" />
                  Назад
                </Button>
              )}
              {step < 4 ? (
                <Button onClick={() => setStep(step + 1)} className="flex-1">
                  Далее
                  <Icon name="ChevronRight" size={20} className="ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="flex-1">
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Сформировать результаты
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Diagnostic;
