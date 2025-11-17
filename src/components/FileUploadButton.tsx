import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface FileUploadButtonProps {
  onUpload?: (file: File, category: 'project' | 'certificate') => void;
}

const FileUploadButton = ({ onUpload }: FileUploadButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [detectedType, setDetectedType] = useState<'project' | 'certificate' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const detectFileType = (file: File): 'project' | 'certificate' => {
    const fileName = file.name.toLowerCase();
    const certificateKeywords = ['сертификат', 'certificate', 'диплом', 'diploma', 'курс', 'course'];
    const projectKeywords = ['проект', 'project', 'portfolio', 'портфолио', 'работа'];

    if (certificateKeywords.some(keyword => fileName.includes(keyword))) {
      return 'certificate';
    }
    
    if (projectKeywords.some(keyword => fileName.includes(keyword))) {
      return 'project';
    }

    if (file.type === 'application/pdf') {
      return 'certificate';
    }

    return 'project';
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const type = detectFileType(file);
    setSelectedFile(file);
    setDetectedType(type);
    setIsOpen(true);
  };

  const handleConfirm = (category: 'project' | 'certificate') => {
    if (!selectedFile) return;

    onUpload?.(selectedFile, category);
    
    toast({
      title: "Файл загружен",
      description: `Документ добавлен в раздел "${category === 'project' ? 'Мои проекты' : 'Сертификаты'}"`,
    });

    setIsOpen(false);
    setSelectedFile(null);
    setDetectedType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <div className="fixed bottom-8 left-8 z-50">
        <Button
          size="lg"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 h-14 px-6"
        >
          <Icon name="Upload" size={20} className="mr-2" />
          Загрузить документ
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Куда добавить документ?</DialogTitle>
            <DialogDescription>
              Система определила тип файла как <strong>{detectedType === 'certificate' ? 'Сертификат' : 'Проект'}</strong>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            {selectedFile && (
              <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                <div className="flex items-center gap-2">
                  <Icon name="FileText" size={20} className="text-primary" />
                  <span className="font-medium text-sm">{selectedFile.name}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{(selectedFile.size / 1024).toFixed(1)} KB</span>
                  <Badge variant="secondary" className="text-xs">
                    {detectedType === 'certificate' ? 'Сертификат' : 'Проект'}
                  </Badge>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={detectedType === 'project' ? 'default' : 'outline'}
                onClick={() => handleConfirm('project')}
                className="h-24 flex-col gap-2"
              >
                <Icon name="FolderOpen" size={24} />
                <span className="text-sm">Мои проекты</span>
              </Button>
              <Button
                variant={detectedType === 'certificate' ? 'default' : 'outline'}
                onClick={() => handleConfirm('certificate')}
                className="h-24 flex-col gap-2"
              >
                <Icon name="Award" size={24} />
                <span className="text-sm">Сертификаты</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FileUploadButton;
