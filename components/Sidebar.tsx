import React, { useState } from 'react';
import { 
  Settings, 
  Ship, 
  CalendarDays, 
  Container, 
  ChevronDown, 
  LayoutDashboard,
  Layers,
  CircleDot,
  Gavel,
  Info,
  Weight,
  PencilRuler,
  BarChart4,
  Server,
  Construction,
  ClipboardList,
  Printer,
  ArrowUpFromLine,
  ArrowDownToLine,
  Cuboid,
  FileClock
} from 'lucide-react';
import { MenuGroup, ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'SYSTEM': true, 
    'PLAN': true,
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const menuStructure: MenuGroup[] = [
    {
      id: 'SYSTEM',
      label: 'Hệ thống',
      icon: Settings,
      items: [
        { id: 'SYS_RULES', label: 'Thiết lập quy luật', icon: Gavel },
      ]
    },
    {
      id: 'FORMAT',
      label: 'Định dạng',
      icon: Ship,
      items: [
        { id: 'FMT_VESSEL', label: 'Thông tin tàu', icon: Info },
        { id: 'FMT_WEIGHT', label: 'Trọng lượng tối đa', icon: Weight },
        { id: 'FMT_DESIGN', label: 'Thiết kế tàu', icon: PencilRuler },
      ]
    },
    {
      id: 'PLAN',
      label: 'Kế hoạch',
      icon: CalendarDays,
      items: [
        { id: 'PLN_STATS', label: 'Thống kê KH xếp dỡ', icon: BarChart4 },
        { id: 'PLN_CMC', label: 'CMC', icon: Server },
        { id: 'PLN_CRANE', label: 'Gán cẩu', icon: Construction },
        { id: 'PLN_EXPORT_LIST', label: 'DS container xuất', icon: ClipboardList },
        { id: 'PLN_PRINT', label: 'In kế hoạch', icon: Printer },
        { id: 'PLN_LOAD', label: 'KH xếp container', icon: ArrowUpFromLine },
        { id: 'PLN_DISCHARGE', label: 'KH dỡ container', icon: ArrowDownToLine },
      ]
    },
    {
      id: 'PREPLAN',
      label: 'Pre Planning',
      icon: Container,
      items: [
        { id: 'PRE_GROUP', label: 'Group container xuất', icon: Cuboid },
        { id: 'PRE_LIST', label: 'Danh sách Pre-Plan', icon: FileClock },
      ]
    }
  ];

  return (
    <div className="w-[280px] h-screen bg-[#0F172A] text-slate-300 flex flex-col shadow-2xl flex-shrink-0 relative font-sans border-r border-slate-800">
      
      {/* 1. Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-white/5 bg-[#0F172A] relative z-20">
        <div className="flex items-center gap-3 group cursor-pointer w-full">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 relative z-10">
              <Layers className="text-white w-6 h-6" />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-xl"></div>
          </div>
          <div>
            <h1 className="font-bold text-white text-xl tracking-tight leading-none">VTOS <span className="text-blue-500 font-extrabold">PRO</span></h1>
            <p className="text-[10px] text-slate-500 font-semibold tracking-widest mt-0.5 uppercase">Terminal OS</p>
          </div>
        </div>
      </div>

      {/* 2. Scrollable Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4 space-y-8 relative z-10">
        
        {/* Dashboard Section */}
        <div className="space-y-2">
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Main</p>
          <button
            onClick={() => onNavigate('DASHBOARD')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
              currentView === 'DASHBOARD' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard size={20} className={`${currentView === 'DASHBOARD' ? 'text-white' : 'text-slate-500 group-hover:text-white'} transition-colors`} />
            <span className="font-medium text-sm">Tổng quan</span>
            {currentView === 'DASHBOARD' && (
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/20"></div>
            )}
          </button>
        </div>

        {/* Modules */}
        {menuStructure.map((group) => {
          const isExpanded = expandedGroups[group.id];
          const Icon = group.icon;
          const isActiveParent = group.items.some(i => i.id === currentView);

          return (
            <div key={group.id} className="space-y-1">
               <div 
                 onClick={() => toggleGroup(group.id)}
                 className={`flex items-center justify-between px-3 py-2 cursor-pointer group select-none transition-colors rounded-lg ${isActiveParent ? 'text-blue-400' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'}`}
               >
                  <div className="flex items-center gap-3">
                     <Icon size={18} className={`transition-colors ${isActiveParent ? 'text-blue-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
                     <span className="text-xs font-bold uppercase tracking-wider">{group.label}</span>
                  </div>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />
               </div>

               {/* Animated Submenu */}
               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-1 pt-1 pb-2">
                    {group.items.map(item => {
                      const isActive = currentView === item.id;
                      const ItemIcon = item.icon || CircleDot;
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => onNavigate(item.id)}
                          className={`
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 relative ml-2 border-l-2
                            ${isActive 
                              ? 'border-blue-500 bg-blue-500/10 text-blue-300' 
                              : 'border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-600 hover:bg-white/5'
                            }
                          `}
                        >
                           <span className={`transition-all ${isActive ? 'text-blue-400 scale-110' : 'text-slate-600 group-hover:text-slate-400'}`}>
                             <ItemIcon size={16} />
                           </span>
                           <span className={`truncate ${isActive ? 'font-medium' : ''}`}>{item.label}</span>
                           
                           {/* Active Glow Background */}
                           {isActive && <div className="absolute inset-0 bg-blue-400/5 rounded-lg pointer-events-none"></div>}
                        </button>
                      )
                    })}
                  </div>
               </div>
            </div>
          );
        })}
      </nav>

      {/* 3. Footer Profile */}
      <div className="p-4 border-t border-white/5 bg-[#0B1121] relative z-20">
        <div className="bg-slate-800/40 rounded-xl p-3 border border-white/5 flex items-center gap-3 hover:border-white/10 hover:bg-slate-800/60 transition-all cursor-pointer group">
           <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-slate-700 to-slate-900 p-[1px] shadow-inner">
                <img src="https://ui-avatars.com/api/?name=Admin&background=0F172A&color=fff" className="w-full h-full rounded-lg object-cover" alt="Profile" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#0B1121] rounded-full shadow-sm"></span>
           </div>
           <div className="flex-1 overflow-hidden">
              <h4 className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">Sang Nguyen</h4>
              <p className="text-[10px] font-medium text-slate-500 truncate uppercase tracking-wider">Senior Planner</p>
           </div>
           <Settings size={16} className="text-slate-600 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  );
};