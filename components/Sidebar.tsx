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
    <div className="w-[280px] h-screen bg-white text-slate-600 flex flex-col shadow-xl flex-shrink-0 relative font-sans border-r border-slate-200 overflow-hidden z-50">
      
      {/* 0. Light Theme Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100"></div>
         {/* Bubbles */}
         <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-50 rounded-full blur-3xl opacity-60"></div>
         <div className="absolute top-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      {/* 1. Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-slate-100 bg-white/80 backdrop-blur-sm relative z-20">
        <div className="flex items-center gap-3 group cursor-pointer w-full">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-tr from-brand-600 to-brand-700 rounded-xl flex items-center justify-center shadow-lg shadow-brand-200 group-hover:shadow-brand-300 transition-all duration-300 relative z-10">
              <Layers className="text-white w-6 h-6 group-hover:animate-float" />
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-slate-800 text-xl tracking-tight leading-none">VTOS <span className="text-brand-600">PRO</span></h1>
            <p className="text-[10px] text-slate-400 font-bold tracking-widest mt-0.5 uppercase">Terminal OS</p>
          </div>
        </div>
      </div>

      {/* 2. Scrollable Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4 space-y-6 relative z-10">
        
        {/* Dashboard Section */}
        <div className="space-y-2">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Main</p>
          <button
            onClick={() => onNavigate('DASHBOARD')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
              currentView === 'DASHBOARD' 
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-200' 
                : 'text-slate-500 hover:text-brand-600 hover:bg-brand-50'
            }`}
          >
            <LayoutDashboard 
              size={20} 
              className={`
                transition-all duration-300 ease-in-out
                ${currentView === 'DASHBOARD' ? 'text-white scale-110' : 'text-slate-400 group-hover:text-brand-600 group-hover:scale-110 group-hover:rotate-3'}
              `} 
            />
            <span className="font-bold text-sm">Tổng quan</span>
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
                 className={`flex items-center justify-between px-3 py-2 cursor-pointer group select-none transition-colors rounded-lg ${isActiveParent ? 'text-brand-700 bg-brand-50' : 'text-slate-500 hover:text-brand-600 hover:bg-slate-50'}`}
               >
                  <div className="flex items-center gap-3">
                     <Icon 
                       size={18} 
                       className={`
                         transition-all duration-300 ease-in-out
                         ${isActiveParent ? 'text-brand-600' : 'text-slate-400 group-hover:text-brand-500'}
                         ${isExpanded ? 'scale-105' : ''}
                         group-hover:scale-110 group-hover:-rotate-6
                       `} 
                     />
                     <span className="text-xs font-bold uppercase tracking-wider">{group.label}</span>
                  </div>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-0 text-slate-400' : '-rotate-90 text-slate-300'}`} />
               </div>

               {/* Animated Submenu */}
               <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="space-y-1 pt-1 pb-2">
                      {group.items.map(item => {
                        const isActive = currentView === item.id;
                        const ItemIcon = item.icon || CircleDot;
                        
                        return (
                          <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`
                              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 relative ml-2 border-l-2 group
                              ${isActive 
                                ? 'border-brand-500 bg-brand-50 text-brand-700 font-bold' 
                                : 'border-slate-200 text-slate-500 hover:text-brand-600 hover:border-brand-300 hover:bg-slate-50'
                              }
                            `}
                          >
                             <span className={`
                               inline-block transition-all duration-300 ease-out transform origin-center
                               ${isActive ? 'text-brand-600 scale-110 rotate-0' : 'text-slate-400 group-hover:text-brand-500 group-hover:scale-110 group-hover:rotate-6'}
                             `}>
                               <ItemIcon size={16} />
                             </span>
                             <span className={`truncate transition-all duration-300 ${isActive ? '' : 'group-hover:translate-x-1'}`}>{item.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
               </div>
            </div>
          );
        })}
      </nav>

      {/* 3. Footer Profile */}
      <div className="p-4 border-t border-slate-100 bg-white relative z-20">
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center gap-3 hover:border-brand-200 hover:bg-brand-50/50 transition-all cursor-pointer group">
           <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-white p-[2px] shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                <img src="https://ui-avatars.com/api/?name=Admin&background=0284c7&color=fff" className="w-full h-full rounded-md object-cover" alt="Profile" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></span>
           </div>
           <div className="flex-1 overflow-hidden">
              <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-brand-700 transition-colors">Sang Nguyen</h4>
              <p className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-wider">Senior Planner</p>
           </div>
           <Settings size={16} className="text-slate-400 group-hover:text-brand-600 group-hover:rotate-90 transition-all duration-500" />
        </div>
      </div>
    </div>
  );
};