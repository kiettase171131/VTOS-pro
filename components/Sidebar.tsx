import React, { useState } from 'react';
import { 
  Settings, 
  Ship, 
  CalendarDays, 
  Container, 
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
  FileClock,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { MenuGroup, ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [isHoveringDrawer, setIsHoveringDrawer] = useState(false);

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
        { id: 'PRE_GROUP', label: 'Group container', icon: Cuboid },
        { id: 'PRE_LIST', label: 'Danh sách Pre-Plan', icon: FileClock },
      ]
    }
  ];

  // Helper to check if a group is active based on current view
  const isGroupActive = (group: MenuGroup) => {
    return group.items.some(item => item.id === currentView);
  };

  const handleGroupEnter = (groupId: string) => {
    setActiveGroupId(groupId);
  };

  const handleSidebarLeave = () => {
    if (!isHoveringDrawer) {
      setActiveGroupId(null);
    }
  };

  return (
    <div className="flex h-full z-50" onMouseLeave={handleSidebarLeave}>
      
      {/* 1. NAVIGATION RAIL (Fixed Left) */}
      <div className="w-20 h-full bg-white border-r border-slate-200 flex flex-col items-center py-6 shadow-xl z-50 relative">
        
        {/* Brand Logo */}
        <div className="mb-8 w-12 h-12 bg-gradient-to-tr from-brand-600 to-brand-700 rounded-xl flex items-center justify-center shadow-lg shadow-brand-200 cursor-pointer hover:scale-105 transition-transform group relative">
          <Layers className="text-white w-7 h-7" />
          <div className="absolute left-14 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
             VTOS PRO
          </div>
        </div>

        {/* Navigation Icons */}
        <nav className="flex-1 flex flex-col w-full gap-4 px-2">
          
          {/* Dashboard Icon */}
          <div className="relative group w-full flex justify-center">
            <button
              onClick={() => onNavigate('DASHBOARD')}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                currentView === 'DASHBOARD'
                  ? 'bg-brand-50 text-brand-600 shadow-sm ring-2 ring-brand-100'
                  : 'text-slate-400 hover:bg-slate-50 hover:text-brand-600'
              }`}
            >
              <LayoutDashboard size={24} strokeWidth={currentView === 'DASHBOARD' ? 2.5 : 2} />
            </button>
            {/* Tooltip */}
            <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
               Tổng quan
            </div>
          </div>

          <div className="w-8 h-px bg-slate-100 mx-auto my-1"></div>

          {/* Group Icons */}
          {menuStructure.map((group) => {
            const active = isGroupActive(group);
            const isOpen = activeGroupId === group.id;

            return (
              <div 
                key={group.id} 
                className="relative group w-full flex justify-center"
                onMouseEnter={() => handleGroupEnter(group.id)}
              >
                <button
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative ${
                    active || isOpen
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30 scale-105'
                      : 'text-slate-400 hover:bg-slate-50 hover:text-brand-600'
                  }`}
                >
                  <group.icon size={24} strokeWidth={active ? 2.5 : 2} className={isOpen ? 'animate-pulse' : ''} />
                  
                  {active && (
                    <span className="absolute -right-1 top-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                  )}
                </button>
              </div>
            );
          })}
        </nav>

        {/* Footer Profile */}
        <div className="mt-auto flex flex-col items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors">
             <LogOut size={18} />
          </button>
          <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white shadow-md cursor-pointer hover:ring-2 hover:ring-brand-500 transition-all">
             <img src="https://ui-avatars.com/api/?name=Admin&background=0284c7&color=fff" alt="User" />
          </div>
        </div>
      </div>

      {/* 2. FLOATING DRAWER (Sub-menu Panel) */}
      <div 
        className={`fixed left-20 top-0 h-full w-72 bg-white/95 backdrop-blur-md border-r border-slate-200 shadow-2xl transition-all duration-300 transform z-40 flex flex-col ${
          activeGroupId ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0 pointer-events-none'
        }`}
        onMouseEnter={() => setIsHoveringDrawer(true)}
        onMouseLeave={() => {
           setIsHoveringDrawer(false);
           setActiveGroupId(null);
        }}
      >
        {/* Drawer Header */}
        {activeGroupId && (
          <>
             <div className="h-20 flex items-center px-6 border-b border-slate-100 bg-slate-50/50">
               <div className="flex items-center gap-3 text-brand-700">
                  {(() => {
                    const group = menuStructure.find(g => g.id === activeGroupId);
                    const Icon = group?.icon || CircleDot;
                    return (
                      <>
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <Icon size={20} />
                        </div>
                        <h2 className="text-lg font-bold tracking-tight">{group?.label}</h2>
                      </>
                    );
                  })()}
               </div>
             </div>

             {/* Drawer Background Deco */}
             <div className="absolute bottom-0 right-0 pointer-events-none opacity-5">
               <Layers size={200} />
             </div>

             {/* Drawer Items */}
             <div className="p-4 space-y-2 relative z-10 overflow-y-auto flex-1 custom-scrollbar">
                {menuStructure.find(g => g.id === activeGroupId)?.items.map(item => {
                  const isActive = currentView === item.id;
                  const ItemIcon = item.icon || CircleDot;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        setActiveGroupId(null);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all group ${
                        isActive
                          ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-100'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600 border border-transparent hover:border-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                         <ItemIcon size={18} className={isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-brand-500'} />
                         <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight size={16} className="text-brand-400" />}
                    </button>
                  );
                })}
             </div>

             {/* Quick Tip Footer */}
             <div className="p-4 bg-slate-50 border-t border-slate-100 mt-auto">
                <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                   <Info size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                   <div>
                      <p className="text-xs font-bold text-blue-700 mb-0.5">Mẹo nhanh</p>
                      <p className="text-[10px] text-blue-600/80 leading-relaxed">
                         Bạn có thể nhấn phím tắt <span className="font-mono font-bold bg-white px-1 rounded border border-blue-200">Cmd+K</span> để tìm kiếm nhanh các chức năng.
                      </p>
                   </div>
                </div>
             </div>
          </>
        )}
      </div>

    </div>
  );
};