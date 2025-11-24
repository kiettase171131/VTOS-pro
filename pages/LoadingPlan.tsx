
import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Move, 
  Layers, 
  ChevronRight, 
  ChevronLeft, 
  Search,
  Box,
  AlertTriangle
} from 'lucide-react';

export const LoadingPlan: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  return (
    <div className="flex-1 h-screen flex flex-col bg-[#1e293b] overflow-hidden font-sans relative">
       
       {/* Dark Mode Header */}
       <header className="bg-[#0f172a] border-b border-slate-800 px-6 py-4 flex items-center justify-between z-30 shadow-lg">
          <div className="flex items-center gap-4">
             <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Layers size={20} />
             </div>
             <div>
                <h1 className="text-white font-bold text-lg tracking-wide">Kế Hoạch Xếp Container</h1>
                <p className="text-slate-400 text-xs">MAERSK HANOI • Bay 05 (Deck)</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded"><ZoomOut size={18} /></button>
                <span className="text-xs font-mono text-slate-300 px-2">100%</span>
                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded"><ZoomIn size={18} /></button>
             </div>
             <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-lg shadow-emerald-900/20 transition-all">
                Lưu Kế Hoạch
             </button>
          </div>
       </header>

       {/* Main Workspace */}
       <div className="flex-1 flex overflow-hidden relative">
          
          {/* Central Canvas (Stowage Plan) */}
          <div className="flex-1 bg-[#1e293b] relative overflow-auto flex items-center justify-center p-10 cursor-grab active:cursor-grabbing">
             {/* Grid Background */}
             <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

             {/* The Bay Graphic */}
             <div className="relative bg-[#0f172a] border-2 border-slate-700 rounded-xl p-8 shadow-2xl min-w-[600px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 bg-slate-700 px-4 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-slate-600">Deck 05</div>
                
                {/* Cells */}
                <div className="grid grid-cols-6 gap-1">
                   {/* Row 88 */}
                   {Array.from({length: 6}).map((_, i) => (
                      <div key={`88-${i}`} className="w-16 h-16 bg-slate-800 border border-slate-700 rounded hover:border-blue-500 transition-colors relative group">
                         <span className="absolute top-1 left-1 text-[8px] text-slate-600">88-{String(i*2+2).padStart(2,'0')}</span>
                         {/* Empty Slot */}
                      </div>
                   ))}

                   {/* Row 86 (With some containers) */}
                   {Array.from({length: 6}).map((_, i) => (
                      <div key={`86-${i}`} className="w-16 h-16 bg-slate-800 border border-slate-700 rounded hover:border-blue-500 transition-colors relative group">
                         <span className="absolute top-1 left-1 text-[8px] text-slate-600">86-{String(i*2+2).padStart(2,'0')}</span>
                         {i % 2 === 0 && (
                            <div className="absolute inset-1 bg-blue-600 rounded shadow-md border-t border-blue-400 flex flex-col items-center justify-center">
                               <span className="text-[10px] font-bold text-white">MSKU</span>
                               <span className="text-[8px] text-blue-200">22T</span>
                            </div>
                         )}
                      </div>
                   ))}

                   {/* Row 84 */}
                   {Array.from({length: 6}).map((_, i) => (
                      <div key={`84-${i}`} className="w-16 h-16 bg-slate-800 border border-slate-700 rounded hover:border-blue-500 transition-colors relative group">
                         <span className="absolute top-1 left-1 text-[8px] text-slate-600">84-{String(i*2+2).padStart(2,'0')}</span>
                         <div className="absolute inset-1 bg-emerald-600 rounded shadow-md border-t border-emerald-400 flex flex-col items-center justify-center">
                            <span className="text-[10px] font-bold text-white">CMAU</span>
                            <span className="text-[8px] text-emerald-200">18T</span>
                         </div>
                      </div>
                   ))}
                </div>

                {/* Legend */}
                <div className="mt-6 pt-4 border-t border-slate-700 flex gap-4 justify-center text-xs text-slate-400">
                   <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-600 rounded"></div> 40' GP</div>
                   <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-600 rounded"></div> 20' GP</div>
                   <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-600 rounded"></div> DG</div>
                </div>
             </div>
          </div>

          {/* Right Drawer: Unplanned List */}
          <div className={`w-80 bg-white border-l border-slate-200 z-40 transition-all duration-300 flex flex-col shadow-2xl ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full absolute right-0 h-full'}`}>
             
             {/* Drawer Toggle */}
             <button 
               onClick={() => setIsDrawerOpen(!isDrawerOpen)}
               className="absolute -left-8 top-1/2 bg-white p-2 rounded-l-lg shadow-lg border-y border-l border-slate-200 text-slate-500 hover:text-brand-600"
             >
                {isDrawerOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
             </button>

             {/* Drawer Header */}
             <div className="p-5 border-b border-slate-100 bg-slate-50">
                <h3 className="font-bold text-slate-800 mb-1">Container chờ xếp</h3>
                <p className="text-xs text-slate-500">Kéo thả vào sơ đồ để lập kế hoạch</p>
                
                <div className="mt-3 relative">
                   <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                   <input 
                     type="text" 
                     placeholder="Tìm container..." 
                     className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                   />
                </div>
             </div>

             {/* Draggable List */}
             <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-100 custom-scrollbar">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                   <div key={item} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm cursor-move hover:shadow-md hover:border-brand-300 hover:bg-blue-50 transition-all group">
                      <div className="flex justify-between items-start mb-1">
                         <span className="font-bold text-slate-700 text-sm">TCLU 81293{item}</span>
                         <span className="text-[10px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 border border-slate-200">40HC</span>
                      </div>
                      <div className="flex justify-between items-end">
                         <div className="text-xs text-slate-500">
                            <p>POL: VNHPH</p>
                            <p>POD: USLAX</p>
                         </div>
                         <div className="font-mono text-xs font-bold text-slate-600">24.5T</div>
                      </div>
                      {item % 3 === 0 && (
                         <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded w-fit">
                            <AlertTriangle size={10} /> DG Class 3
                         </div>
                      )}
                   </div>
                ))}
             </div>
             
             <div className="p-3 border-t border-slate-200 bg-slate-50 text-xs text-center text-slate-400 font-medium">
                Showing 6 of 42 containers
             </div>
          </div>
       </div>
    </div>
  );
};
