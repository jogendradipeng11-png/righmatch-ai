import React from 'react';
import {
  CheckCircle2,
  Globe,
  FileText,
  Sliders,
  History,
  FolderArchive,
  Paperclip,
} from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  pendingCount: number;
  unreadNotifications: number;
  onOpenNotifications: () => void;
  attachedDocsCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  setCurrentTab,
  pendingCount,
  attachedDocsCount,
}) => {
  const navItems = [
    {
      id: 'approvals',
      label: 'Approvals',
      icon: CheckCircle2,
      badge: pendingCount > 0 ? pendingCount : null,
      badgeColor: 'bg-amber-500 text-slate-950',
    },
    {
      id: 'feed',
      label: 'Jobs',
      icon: Globe,
      badge: null,
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FolderArchive,
      badge: typeof attachedDocsCount === 'number' && attachedDocsCount > 0 ? attachedDocsCount : null,
      badgeColor: 'bg-emerald-500 text-slate-950',
    },
    {
      id: 'resume',
      label: 'Profile',
      icon: FileText,
      badge: null,
    },
    {
      id: 'criteria',
      label: 'Rules',
      icon: Sliders,
      badge: null,
    },
    {
      id: 'history',
      label: 'History',
      icon: History,
      badge: null,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800/90 shadow-2xl px-1.5 py-1"
      style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
    >
      <div className="grid grid-cols-6 gap-0.5 items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-0.5 rounded-lg transition min-h-[46px] select-none ${
                isActive
                  ? 'text-amber-400 bg-amber-500/10 font-bold'
                  : 'text-slate-400 hover:text-slate-200 active:bg-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110 text-amber-400' : ''}`} />
                {item.badge !== null && item.badge > 0 && (
                  <span
                    className={`absolute -top-1.5 -right-2 px-1 py-0.2 rounded-full text-[9px] font-black leading-none ${item.badgeColor} shadow-sm`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-full">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-4 h-0.5 rounded-full bg-amber-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
