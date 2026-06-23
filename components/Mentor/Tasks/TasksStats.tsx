import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { FileText, CheckCircle2, Clock, Edit3, Lock } from 'lucide-react';

interface TasksStatsProps {
  stats: {
    total: number;
    published: number;
    scheduled: number;
    draft: number;
    closed: number;
  };
}

export const TasksStats = ({ stats }: TasksStatsProps) => {
  const t = useTranslations('MentorTasks.stats');

  const cards = [
    {
      title: t('total_tasks'),
      value: stats.total,
      icon: <FileText className="w-5 h-5 text-blue-500" />,
      iconBg: 'bg-blue-50',
      desc: t("task"),
    },
    {
      title: t('published'),
      value: stats.published,
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      iconBg: 'bg-green-50',
      desc: t("task"),
    },
    {
      title: t('scheduled'),
      value: stats.scheduled,
      icon: <Clock className="w-5 h-5 text-orange-500" />,
      iconBg: 'bg-orange-50',
      desc: t("task"),
    },
    {
      title: t('draft'),
      value: stats.draft,
      icon: <Edit3 className="w-5 h-5 text-purple-500" />,
      iconBg: 'bg-purple-50',
      desc: t("task"),
    },
    {
      title: t('closed'),
      value: stats.closed,
      icon: <Lock className="w-5 h-5 text-red-500" />,
      iconBg: 'bg-red-50',
      desc: t("task"),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-2xl py-4
            border border-sidebar-border shadow-xs 
            flex flex-col items-center justify-between
            hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex flex-col items-center gap-2 px-3 w-full">
              {/* Header Row */}
              <div className="flex justify-center items-center gap-2.5 w-full">
                <div className="size-10 rounded-xl bg-brand-light-green border border-[#A7F3D0]/60 flex items-center justify-center shrink-0">
                  {Icon}
                </div>

                <div>
                  <span className="text-black text-base font-bold block">
                    {card.title}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Value */}
                <span className="text-3xl font-extrabold text-black block tracking-tight">
                  {card.value}
                </span>

                <span className="text-xs md:text-sm font-medium block ">
                  {card.desc}
                </span>
              </div>


            </div>
          </div>
        );
      })}
    </div>
  );
};
