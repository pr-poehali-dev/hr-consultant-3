import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface AIAssistantData {
  image: string;
  customName: string;
  name: string;
}

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [assistant, setAssistant] = useState<AIAssistantData | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const savedAssistant = localStorage.getItem('aiAssistant');
    if (savedAssistant) {
      setAssistant(JSON.parse(savedAssistant));
      
      setTimeout(() => {
        const welcomeMessage: Message = {
          id: '1',
          text: 'Чем могу вам помочь?',
          sender: 'assistant',
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
      }, 500);
    }
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "Я помогу вам с этим вопросом. Что именно вас интересует?",
        "Отличный вопрос! Давайте разберемся вместе.",
        "Я анализирую вашу информацию. Могу предложить несколько вариантов.",
        "Понимаю вашу задачу. Вот что я могу посоветовать...",
        "Это интересная тема. Позвольте объяснить подробнее."
      ];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  if (!assistant) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-96 h-[600px] shadow-2xl animate-fade-in flex flex-col">
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-primary/30">
                <AvatarImage src={assistant.image} alt={assistant.customName} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                  {assistant.customName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-lg">{assistant.customName}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Онлайн
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="hover:bg-destructive/10"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {message.sender === 'assistant' && (
                    <Avatar className="w-8 h-8 border border-primary/30">
                      <AvatarImage src={assistant.image} alt={assistant.customName} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xs">
                        {assistant.customName[0]}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('ru-RU', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                  {message.sender === 'user' && (
                    <Avatar className="w-8 h-8 border border-primary/30">
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                        Вы
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 border border-primary/30">
                    <AvatarImage src={assistant.image} alt={assistant.customName} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xs">
                      {assistant.customName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <CardContent className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Напишите сообщение..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!inputMessage.trim()}>
                <Icon name="Send" size={18} />
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="w-20 h-20 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-fade-in p-0 overflow-hidden"
        >
          <img
            src={assistant.image}
            alt={assistant.customName}
            className="w-full h-full object-cover"
          />
        </Button>
      )}
    </div>
  );
};

export default AIAssistant;
