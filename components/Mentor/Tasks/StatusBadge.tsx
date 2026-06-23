import { TaskStatus } from '@/types';
import { useTranslations } from 'next-intl';


interface StatusBadgeProps {
  status: TaskStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const t = useTranslations('MentorTasks.table');

  const getStatusConfig = (status: TaskStatus) => {
    switch (status) {
      case 'published':
        return {
          label: t('status_published'),
          bg: 'bg-green-50',
          text: 'text-green-600',
          dot: 'bg-green-500',
        };
      case 'scheduled':
        return {
          label: t('status_scheduled'),
          bg: 'bg-orange-50',
          text: 'text-orange-500',
          dot: 'bg-orange-500',
        };
      case 'draft':
        return {
          label: t('status_draft'),
          bg: 'bg-purple-50',
          text: 'text-purple-500',
          dot: 'bg-purple-500',
        };
      case 'closed':
        return {
          label: t('status_closed'),
          bg: 'bg-red-50',
          text: 'text-red-500',
          dot: 'bg-red-500',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      {config.label}
    </span>
  );
};
