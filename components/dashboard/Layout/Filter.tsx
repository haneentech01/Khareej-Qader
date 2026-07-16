import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';


interface StudentsFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder: string;
}

export const Filter = ({
  searchQuery,
  setSearchQuery,
  placeholder
}: StudentsFilterProps) => {
  const t = useTranslations('Dashboard.filters');

  return (
    <div className="flex flex-col md:flex-row items-center mb-0
    bg-white p-4 rounded-xl ">
      <div className="relative w-full md:max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-4 py-4 pr-10 border-0 bg-gray-50 
          focus-visible:ring-0 focus-visible:bg-brand-light-green"
        />
      </div>
    </div>
  );
};
