
import React, { useState } from 'react';
import { 
  Settings, 
  Search, 
  RefreshCw,
  MoreVertical,
  Filter,
  Ship,
  ArrowRight,
  ChevronDown,
  Layout,
  List,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  GripVertical
} from 'lucide-react';

export const CraneSplit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ASSIGN' | 'UNASSIGN'>('ASSIGN');
  const [viewMode, setViewMode] = useState<'VISUAL' | 'LIST'>('VISUAL');

  // Mock Crane Data
  const cranes = [
    { id: 'QC01', name: 'Crane 01', status: 'Active', load: 120, efficiency: 98, color: 'bg-blue-500' },
    { id: 'QC02', name: 'Crane 02', status: 'Active', load: 85, efficiency: 92, color: 'bg-indigo-500' },
    { id: 'QC03', name: 'Crane 03', status: 'Maintenance', load: 0, efficiency: 0, color: 'bg-slate-400' },
  ];

  return (
    <div className="flex-1 h-screen flex flex-col bg-[#F0F2F5] overflow-hidden font-sans">
      
      {/* 1. Modern Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0 z-30 sticky top-0">
         <div className="flex items-center gap-4">
            <div className="bg-brand-600 text-white p-2 rounded-lg shadow-lg shadow-brand-500/30">
              <Layout size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">Điều Phối Cầu Bến</h1>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span>TRAK/0001/0001</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-emerald-600 flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Live Updating
                </span>
              </div>
            </div>
         </div>
         
         <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
               <button 
                 onClick={() => setViewMode('VISUAL')}
                 className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'VISUAL' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 <Layout size={14} /> Visual
               </button>
               <button 
                 onClick={() => setViewMode('LIST')}
                 className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'LIST' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 <List size={14} /> List
               </button>
            </div>
            <button className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-all flex items-center gap-2">
               <Settings size={16} /> Cấu hình
            </button>
         </div>
      </header>

      {/* 2. Main Split Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL: Tactical Ship View */}
        <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-50">
           
           {/* Crane Status Bar Overlay */}
           <div className="absolute top-4 left-4 right-4 z-20 flex gap-4 overflow-x-auto pb-2 custom-scrollbar pointer-events-none">
              {cranes.map(crane => (
                <div key={crane.id} className="bg-white/90 backdrop-blur border border-white/50 p-3 rounded-xl shadow-lg min-w-[160px] pointer-events-auto cursor-pointer hover:-translate-y-1 transition-transform">
                   <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-500">{crane.id}</span>
                      <span className={`w-2 h-2 rounded-full ${crane.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                   </div>
                   <div className="flex items-center gap-2 mb-1">
                      <div className={`w-8 h-8 rounded-lg ${crane.color} flex items-center justify-center text-white`}>
                        <Layout size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{crane.name}</div>
                        <div className="text-[10px] text-slate-400">{crane.efficiency}% Eff.</div>
                      </div>
                   </div>
                   <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className={`h-full ${crane.color}`} style={{ width: `${crane.efficiency}%` }}></div>
                   </div>
                </div>
              ))}
           </div>

           {/* The Ship Visualization Canvas */}
           <div className="flex-1 overflow-auto custom-scrollbar flex items-center justify-center p-10 pt-28">
              <div className="relative min-w-[600px] flex flex-col items-center">
                 
                 {/* Bow/Stern Indicators */}
                 <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 flex flex-col items-center gap-2 opacity-50">
                    <ArrowUpRight size={24} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest -rotate-90">BOW</span>
                 </div>
                 
                 {/* Ship Body */}
                 <div className="bg-white rounded-[3rem] shadow-2xl border-2 border-slate-200 p-8 pb-12 relative">
                    {/* Water Line Decoration */}
                    <div className="absolute bottom-6 left-8 right-8 h-1 bg-blue-100 rounded-full"></div>

                    {/* Bays Container */}
                    <div className="flex gap-4 items-end">
                       {[1, 3, 5, 7, 9].map((bayNum) => (
                         <div key={bayNum} className="flex flex-col gap-2 group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                            {/* Bay Header */}
                            <div className="text-center">
                               <span className="text-xs font-bold text-slate-400 group-hover:text-brand-600 transition-colors">Bay {bayNum.toString().padStart(2, '0')}</span>
                            </div>
                            
                            {/* The Bay Stack */}
                            <div className="w-16 bg-slate-100 rounded-lg border border-slate-200 overflow-hidden relative shadow-inner group-hover:shadow-lg transition-shadow">
                               {/* Deck (Top) */}
                               <div className="bg-sky-50 p-1 flex flex-col gap-px border-b-2 border-slate-300 border-dashed">
                                  <div className="h-3 bg-sky-200 rounded-sm"></div>
                                  <div className="h-3 bg-sky-200 rounded-sm"></div>
                                  <div className="h-3 bg-sky-200 rounded-sm"></div>
                                  <div className="h-3 bg-sky-100 rounded-sm"></div>
                               </div>
                               {/* Hold (Bottom) */}
                               <div className="bg-slate-50 p-1 flex flex-col gap-px">
                                  <div className="h-3 bg-red-100 rounded-sm"></div>
                                  <div className="h-3 bg-red-200 rounded-sm"></div>
                                  <div className="h-3 bg-red-200 rounded-sm"></div>
                               </div>

                               {/* Crane Assignment Indicator (Floating) */}
                               <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <div className="bg-white/90 shadow-sm px-2 py-0.5 rounded text-[10px] font-bold text-slate-700 backdrop-blur">
                                     + Assign
                                  </div>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

              </div>
           </div>

           {/* Bottom Toolbar */}
           <div className="bg-white border-t border-slate-200 p-4 flex justify-between items-center relative z-20">
               <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                  <div className="flex items-center gap-2">
                     <span className="w-3 h-3 bg-sky-200 rounded shadow-sm"></span> Deck Cargo
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="w-3 h-3 bg-red-200 rounded shadow-sm"></span> Hold Cargo
                  </div>
               </div>
               
               <div className="flex gap-2">
                  <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-bold transition-colors">
                     Reset Selection
                  </button>
                  <button className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-bold shadow-lg shadow-brand-500/20 transition-colors">
                     Auto Assign
                  </button>
               </div>
           </div>
        </div>

        {/* RIGHT PANEL: Assignment Control Center */}
        <div className="w-[400px] bg-white border-l border-slate-200 flex flex-col z-20 shadow-xl">
           
           {/* Panel Header */}
           <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Danh sách công việc</h2>
              
              {/* Tab Switcher */}
              <div className="bg-slate-200/50 p-1 rounded-xl flex font-bold text-sm">
                 <button 
                   onClick={() => setActiveTab('ASSIGN')}
                   className={`flex-1 py-2 rounded-lg transition-all shadow-sm ${activeTab === 'ASSIGN' ? 'bg-white text-brand-700' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                    Cần phân bổ (12)
                 </button>
                 <button 
                   onClick={() => setActiveTab('UNASSIGN')}
                   className={`flex-1 py-2 rounded-lg transition-all shadow-sm ${activeTab === 'UNASSIGN' ? 'bg-white text-brand-700' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                    Đã phân bổ (45)
                 </button>
              </div>
           </div>

           {/* Filter Section */}
           <div className="px-6 py-4 border-b border-slate-100 grid grid-cols-2 gap-3">
              <div className="relative group cursor-pointer">
                 <input type="checkbox" className="peer sr-only" defaultChecked />
                 <div className="p-3 border border-slate-200 rounded-xl bg-white peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                       <ArrowRight size={16} />
                    </div>
                    <div>
                       <div className="text-[10px] uppercase font-bold text-slate-400">Type</div>
                       <div className="text-sm font-bold text-slate-800">Inbound</div>
                    </div>
                 </div>
              </div>

              <div className="relative group cursor-pointer">
                 <input type="checkbox" className="peer sr-only" />
                 <div className="p-3 border border-slate-200 rounded-xl bg-white peer-checked:border-red-500 peer-checked:bg-red-50 transition-all flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                       <ArrowRight size={16} />
                    </div>
                    <div>
                       <div className="text-[10px] uppercase font-bold text-slate-400">Type</div>
                       <div className="text-sm font-bold text-slate-800">Outbound</div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Task List */}
           <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-slate-50/30">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-200 transition-all group cursor-pointer relative overflow-hidden">
                   <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                         <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Bay 0{item}</span>
                         <span className="text-xs font-bold text-slate-800">Tier 82 • Row 04</span>
                      </div>
                      <GripVertical size={16} className="text-slate-300 group-hover:text-slate-500" />
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-slate-600">Container 40HC</div>
                      <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Ready</div>
                   </div>
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
           </div>

           {/* Action Footer */}
           <div className="p-5 border-t border-slate-200 bg-white">
              <button className="w-full py-3 bg-brand-900 hover:bg-brand-800 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-900/20 transition-all flex items-center justify-center gap-2">
                 <CheckCircle2 size={18} />
                 Xác Nhận Phân Bổ
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
