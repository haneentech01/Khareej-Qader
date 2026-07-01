import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';


interface TasksFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const TasksFilter = ({
  searchQuery,
  setSearchQuery,
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
    </div>
  );
};
