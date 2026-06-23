import { useLocale, useTranslations } from 'next-intl';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { NewTaskModal } from './NewTaskModal';

export const TasksHeader = () => {
  const t = useTranslations('MentorTasks');
  const locale = useLocale();

  const breadcrumbs = [
    { label: t('breadcrumbs.home'), href: '/mentor/' },
    { label: t('breadcrumbs.tasks'), href: '/mentor/tasks' },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <Breadcrumbs items={breadcrumbs} locale={locale} />
        <h1 className="text-2xl font-bold text-gray-900">{t('header.title')}</h1>
        <p className="text-gray-500 mt-1">{t('header.subtitle')}</p>
      </div>

      <NewTaskModal />
    </div>
  );
};
