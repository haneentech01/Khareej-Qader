import { useTranslations } from 'next-intl';
import { Search, Filter, ArrowDownUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TaskStatus } from '@/types';


interface TasksFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: TaskStatus | 'all';
  setStatusFilter: (status: TaskStatus | 'all') => void;
}

export const TasksFilter = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}: TasksFilterProps) => {
  const t = useTranslations('MentorTasks.filters');

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-white p-2 rounded-xl border border-gray-100">
      <div className="relative w-full md:max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder={t('search_placeholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-4 pr-10 border-0 bg-gray-50 focus-visible:ring-0 focus-visible:bg-white"
        />
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <Button variant="outline" className="flex items-center gap-2 text-gray-600 border-gray-200 w-full md:w-auto">
          <ArrowDownUp className="w-4 h-4" />
          {t('sort_tasks')}
        </Button>
        <Button variant="outline" className="flex items-center gap-2 text-gray-600 border-gray-200 w-full md:w-auto">
          <Filter className="w-4 h-4" />
          {t('all')}
        </Button>
      </div>
    </div>
  );
};
