import { useTranslations, useLocale } from 'next-intl';
import { Eye, MoreVertical } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Pagination } from '@/components/ui/Pagination';
import { StatusBadge } from './StatusBadge';
import { TaskType } from '@/types';


interface TasksTableProps {
  tasks: TaskType[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const TasksTable = ({ tasks, currentPage, totalPages, onPageChange }: TasksTableProps) => {
  const t = useTranslations('MentorTasks.table');
  const locale = useLocale();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="py-4 text-gray-500 font-medium">{t('task')}</TableHead>
              <TableHead className="py-4 text-gray-500 font-medium">{t('related_lesson')}</TableHead>
              <TableHead className="py-4 text-gray-500 font-medium">{t('due_date')}</TableHead>
              <TableHead className="py-4 text-gray-500 font-medium">{t('progress')}</TableHead>
              <TableHead className="py-4 text-gray-500 font-medium">{t('status')}</TableHead>
              <TableHead className="py-4 text-gray-500 font-medium">{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => {
              const progressPercentage = task.totalStudents > 0
                ? (task.submittedStudents / task.totalStudents) * 100
                : 0;

              return (
                <TableRow key={task.id} className="hover:bg-gray-50/50 transition-colors">
                  <TableCell className="py-4 font-medium text-gray-900">{task.title}</TableCell>
                  <TableCell className="py-4 text-gray-600">{task.relatedLesson}</TableCell>
                  <TableCell className="py-4 text-gray-600">{task.dueDate}</TableCell>
                  <TableCell className="py-4 min-w-[200px]">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-gray-600">
                        {task.submittedStudents === 0 && task.status !== 'published'
                          ? t('no_progress', { total: task.totalStudents })
                          : t('students_progress', { submitted: task.submittedStudents, total: task.totalStudents })}
                      </span>
                      <Progress
                        value={progressPercentage}
                        className="h-1.5 [&>div]:bg-[#1EB58E]"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <StatusBadge status={task.status} />
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8 gap-2 text-gray-600 border-gray-200">
                        <Eye className="w-4 h-4" />
                        {t('view_submissions')}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="border-t border-gray-100 bg-white">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            locale={locale}
          />
        </div>
      )}
    </div>
  );
};
