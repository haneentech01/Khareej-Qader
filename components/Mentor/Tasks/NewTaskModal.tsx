import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Plus, UploadCloud, Calendar, Info, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const NewTaskModal = () => {
  const t = useTranslations('MentorTasks.newTaskModal');
  const [description, setDescription] = useState('');
  const [selectedFileTypes, setSelectedFileTypes] = useState<string[]>(['zip', 'github']);
  const [status, setStatus] = useState<'published' | 'scheduled' | 'draft'>('published');
  const [open, setOpen] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(e.target.files || []);

    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = () => { };
  const uploadFiles = async () => { };

  const fileTypes = [
    { id: 'zip', label: t('file_zip') },
    { id: 'github', label: t('link_github') },
    { id: 'pdf', label: t('file_pdf') },
    { id: 'text', label: t('text') },
  ];

  const handleFileTypeToggle = (id: string) => {
    setSelectedFileTypes(prev =>
      prev.includes(id) ? prev.filter(type => type !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* New Tasks Button */}
      <DialogTrigger asChild>
        <Button className="cursor-pointer py-5 px-5 bg-brand-primary hover:bg-brand-base text-white">
          <Plus className="w-4 h-4" />
          {t('title')}
        </Button>
      </DialogTrigger>

      {/* New Tasks Modal Content */}
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white max-h-[90vh] overflow-y-auto">

        <div className="p-6">
          {/* Header */}
          <DialogHeader className="mb-6">
            <div className="flex items-center gap-4">
              <span className="p-2 bg-green-50 text-brand-primary rounded-lg">
                <Plus className="w-5 h-5" />
              </span>
              <div className="flex flex-col ">
                <DialogTitle className="text-xl font-bold text-black mb-1">
                  {t('title')}
                </DialogTitle>
                <DialogDescription className="text-brand-muted text-xs">
                  {t('subtitle')}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Row 1: Title and Lesson */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* task title */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-brand-muted mb-3 block">
                  {t('task_title')}
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder={t('task_title_placeholder')}
                  className="h-11 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
              </div>

              {/* related lesson */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-brand-muted mb-3 block">
                  {t('related_lesson')} <span className="text-red-500">*</span>
                </label>
                <select className="flex h-11 w-full rounded-md px-2
                 border border-input text-sm 
                 focus:outline-none 
                 focus:ring-0 
                 focus:ring-offset-0 
                 disabled:cursor-not-allowed ">
                  <option
                    value=""
                    disabled
                    selected>
                    {t('related_lesson_placeholder')}
                  </option>
                  <option value="1">الدرس الأول</option>
                  <option value="2">الدرس الثاني</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-muted mb-3 block">
                {t('description')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  className="flex min-h-[120px] w-full rounded-md 
                  border border-input 
                  px-3 py-2 text-sm 
                  focus:outline-none 
                  focus:ring-0 
                  focus:ring-offset-0 
                  disabled:cursor-not-allowed 
                  disabled:opacity-50 
                  resize-none"
                  placeholder={t('description_placeholder')}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={1000}
                />
                <span className="absolute bottom-2 left-2 text-xs text-gray-400">
                  {description.length}/1000
                </span>
              </div>
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-muted mb-3 block">
                {t('due_date')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type="date"
                  className="flex h-11 w-full rounded-md 
                  border border-input 
                  px-2 py-2 text-sm 
                  focus:outline-none 
                  focus:ring-0 
                  focus:ring-offset-0 
                  disabled:cursor-not-allowed 
                  disabled:opacity-50"
                  placeholder={t('due_date_placeholder')}
                />
              </div>
            </div>

            {/* File Types */}
            {/* <div className="flex flex-wrap items-center gap-4">
              {fileTypes.map(type => (
                <label 
                key={type.id} 
                className="flex items-center gap-2 cursor-pointer">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${selectedFileTypes.includes(type.id)
                      ? 'bg-[#1EB58E] border-[#1EB58E]'
                      : 'border-gray-300 bg-white'
                      }`}
                    onClick={() => handleFileTypeToggle(type.id)}
                  >
                    {selectedFileTypes.includes(type.id) && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className="text-sm text-gray-700">{type.label}</span>
                </label>
              ))}
            </div> */}

            {/* Status */}
            {/* <div className="space-y-3">
              <label className="text-sm font-medium text-brand-muted mb-3 block">
                {t('status')} <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { id: 'published', label: t('status_published'), color: 'green' },
                  { id: 'scheduled', label: t('status_scheduled'), color: 'orange' },
                  { id: 'draft', label: t('status_draft'), color: 'purple' },
                ].map(s => (
                  <label
                    key={s.id}
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${status === s.id
                      ? s.color === 'green' ? 'border-green-500 bg-green-50/50'
                        : s.color === 'orange' ? 'border-orange-500 bg-orange-50/50'
                          : 'border-purple-500 bg-purple-50/50'
                      : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    onClick={() => setStatus(s.id as 'published' | 'scheduled' | 'draft')}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${status === s.id
                      ? s.color === 'green' ? 'border-green-500'
                        : s.color === 'orange' ? 'border-orange-500'
                          : 'border-purple-500'
                      : 'border-gray-300'
                      }`}>
                      {status === s.id && (
                        <div className={`w-2 h-2 rounded-full ${s.color === 'green' ? 'bg-green-500'
                          : s.color === 'orange' ? 'bg-orange-500'
                            : 'bg-purple-500'
                          }`} />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${status === s.id
                      ? s.color === 'green' ? 'text-green-700'
                        : s.color === 'orange' ? 'text-orange-700'
                          : 'text-purple-700'
                      : 'text-gray-700'
                      }`}>
                      {s.label}
                    </span>
                  </label>
                ))}
              </div>
              {status === 'scheduled' && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
                  <Info className="w-4 h-4 text-blue-500 shrink-0" />
                  <p>{t('scheduled_info')}</p>
                </div>
              )}
            </div> */}

            {/* Attachments Dropzone */}
            {/* <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-muted mb-3 block">
                {t('attachments')}
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
                <UploadCloud className="w-8 h-8 text-gray-400 mb-3" />
                <p className="text-sm text-gray-700 font-medium mb-1">
                  {t.rich('dropzone_title', {
                    highlight: (chunk: React.ReactNode) => (
                      <span className="text-brand-primary">{chunk}</span>
                    ),
                  })}
                </p>
                <p className="text-xs text-gray-500">
                  {t('dropzone_subtitle')}
                </p>
              </div>
            </div> */}
          </div>
        </div>

        <DialogFooter className="p-6 border-t bg-gray-50 sm:justify-end gap-2 flex-row justify-end">
          {/* close btn */}
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto cursor-pointer">
              {t('cancel')}
            </Button>
          </DialogClose>

          {/* submit btn */}
          <Button className="cursor-pointer w-full sm:w-auto  
          bg-brand-primary hover:bg-brand-base text-white" onClick={() => setOpen(false)}>
            {t('submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
