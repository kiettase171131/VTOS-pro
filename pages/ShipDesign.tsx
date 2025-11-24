
import React, { useState } from 'react';
import { 
  Save, 
  Trash2, 
  Copy, 
  Clipboard,
  Printer, 
  FileOutput,
  ChevronLeft, 
  ChevronRight, 
  Box, 
  Zap, 
  AlertTriangle, 
  ArrowUpFromLine, 
  Grid3X3,
  Unlock,
  Lock,
  Eraser
} from 'lucide-react';

// Define the cell structure
interface Cell {
  id: string;
  row: number;
  col: number;
  type: 'STANDARD' | 'DG' | 'REEFER' | 'HIGHCUBE' | 'NONE';
  isLocked: boolean;
}

export const ShipDesign: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'SELECT' | 'DG' | 'REEFER' | 'HIGHCUBE' | 'LOCK' | 'ERASER'>('SELECT');
  const [currentBay, setCurrentBay] = useState('01');
  
  // Toggle States for "Copy Options"
  const [copyOptions, setCopyOptions] = useState({
    all: false,
    deck: false,
    hold: false,
    hatch: false,
  });

  // Mock Grid Generation (10 Rows x 14 Cols)
  // Rows 0-4 = Deck, Rows 5-9 = Hold
  const generateGrid = () => {
    const grid: Cell[] = [];
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 14; c++) {
        grid.push({
          id: `${r}-${c}`,
          row: r,
          col: c,
          type: 'STANDARD',
          isLocked: false,
        });
      }
    }
    return grid;
  };

  const [grid, setGrid] = useState<Cell[]>(generateGrid());

  // Handle Cell Click
  const handleCellClick = (id: string) => {
    setGrid(prev => prev.map(cell => {
      if (cell.id === id) {
        if (activeTool === 'LOCK') return { ...cell, isLocked: !cell.isLocked };
        if (cell.isLocked) return cell; // Cannot edit locked cells
        
        if (activeTool === 'ERASER') return { ...cell, type: 'STANDARD' };
        if (activeTool === 'SELECT') return cell; // Just selecting
        
        // Apply tool
        return { ...cell, type: activeTool === cell.type ? 'STANDARD' : activeTool };
      }
      return cell;
    }));
  };

  // Helper to toggle options
  const toggleOption = (key: keyof typeof copyOptions) => {
    setCopyOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex-1 h-screen flex bg-[#F0F4F8] font-sans overflow-hidden">
      
      {/* LEFT SIDEBAR - CONTROLS */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col z-20 shadow-lg">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100">
           <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
             <Grid3X3 className="text-brand-600" />
             Thiết kế Tàu
           </h2>
           <p className="text-xs text-slate-400 mt-1">Cấu hình sơ đồ Bay {currentBay}</p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-8">
          
          {/* 1. Tools Section */}
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Công cụ (Tools)</h3>
            <div className="grid grid-cols-3 gap-3">
               <button 
                 onClick={() => setActiveTool('SELECT')}
                 className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${activeTool === 'SELECT' ? 'bg-slate-800 text-white border-slate-800 shadow-md' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
               >
                 <Box size={20} className="mb-1" />
                 <span className="text-[10px] font-bold">Chọn</span>
               </button>
               
               <button 
                 onClick={() => setActiveTool('ERASER')}
                 className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${activeTool === 'ERASER' ? 'bg-slate-800 text-white border-slate-800 shadow-md' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
               >
                 <Eraser size={20} className="mb-1" />
                 <span className="text-[10px] font-bold">Xóa</span>
               </button>

               <button 
                 onClick={() => setActiveTool('LOCK')}
                 className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${activeTool === 'LOCK' ? 'bg-slate-800 text-white border-slate-800 shadow-md' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
               >
                 {activeTool === 'LOCK' ? <Lock size={20} className="mb-1" /> : <Unlock size={20} className="mb-1" />}
                 <span className="text-[10px] font-bold">Khóa</span>
               </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-3">
               <button 
                 onClick={() => setActiveTool('DG')}
                 className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${activeTool === 'DG' ? 'bg-amber-100 text-amber-700 border-amber-300 shadow-sm ring-1 ring-amber-300' : 'bg-white border-slate-200 text-slate-600 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600'}`}
               >
                 <AlertTriangle size={20} className="mb-1" />
                 <span className="text-[10px] font-bold">DG</span>
               </button>

               <button 
                 onClick={() => setActiveTool('HIGHCUBE')}
                 className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${activeTool === 'HIGHCUBE' ? 'bg-indigo-100 text-indigo-700 border-indigo-300 shadow-sm ring-1 ring-indigo-300' : 'bg-white border-slate-200 text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600'}`}
               >
                 <ArrowUpFromLine size={20} className="mb-1" />
                 <span className="text-[10px] font-bold">HI</span>
               </button>

               <button 
                 onClick={() => setActiveTool('REEFER')}
                 className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${activeTool === 'REEFER' ? 'bg-cyan-100 text-cyan-700 border-cyan-300 shadow-sm ring-1 ring-cyan-300' : 'bg-white border-slate-200 text-slate-600 hover:bg-cyan-50 hover:border-cyan-200 hover:text-cyan-600'}`}
               >
                 <Zap size={20} className="mb-1" />
                 <span className="text-[10px] font-bold">RF</span>
               </button>
            </div>
          </section>

          {/* 2. Navigation */}
          <section>
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Số Bay</h3>
             <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                <button className="p-2 hover:bg-white rounded-lg shadow-sm transition-all text-slate-500 hover:text-slate-800">
                  <ChevronLeft size={20} />
                </button>
                <div className="flex-1 relative">
                  <select 
                    value={currentBay} 
                    onChange={(e) => setCurrentBay(e.target.value)}
                    className="w-full text-center appearance-none bg-transparent font-bold text-slate-800 outline-none"
                  >
                    {Array.from({length: 20}, (_, i) => {
                      const num = (i*2 + 1).toString().padStart(2, '0');
                      return <option key={num} value={num}>Bay {num}</option>
                    })}
                  </select>
                </div>
                <button className="p-2 hover:bg-white rounded-lg shadow-sm transition-all text-slate-500 hover:text-slate-800">
                  <ChevronRight size={20} />
                </button>
             </div>
             <button className="w-full mt-2 py-2 text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors border border-brand-200">
               Xem toàn bộ sơ đồ
             </button>
          </section>

          {/* 3. Copy Options */}
          <section>
            <div className="flex items-center justify-between mb-3">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tùy chọn Copy</h3>
               <label className="flex items-center cursor-pointer">
                  <span className="mr-2 text-xs text-slate-500 font-medium">Tất cả</span>
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={copyOptions.all} onChange={() => toggleOption('all')} />
                    <div className={`block w-8 h-5 rounded-full transition-colors ${copyOptions.all ? 'bg-brand-600' : 'bg-slate-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${copyOptions.all ? 'transform translate-x-3' : ''}`}></div>
                  </div>
               </label>
            </div>
            
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
               {[
                 { id: 'deck', label: 'Boong (Deck)' },
                 { id: 'hold', label: 'Hầm (Hold)' },
                 { id: 'hatch', label: 'Nắp Hầm (Hatch)' },
               ].map((opt) => (
                 <div key={opt.id} className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 font-medium">{opt.label}</span>
                    <div className="relative cursor-pointer" onClick={() => toggleOption(opt.id as any)}>
                      <div className={`block w-9 h-5 rounded-full transition-colors ${copyOptions[opt.id as keyof typeof copyOptions] ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${copyOptions[opt.id as keyof typeof copyOptions] ? 'transform translate-x-4' : ''}`}></div>
                    </div>
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
               <button className="flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 rounded-lg text-sm font-semibold transition-all shadow-sm">
                  <Copy size={16} /> Copy
               </button>
               <button className="flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 text-slate-700 hover:border-emerald-300 hover:text-emerald-600 rounded-lg text-sm font-semibold transition-all shadow-sm">
                  <Clipboard size={16} /> Paste
               </button>
            </div>
          </section>

          {/* 4. Output Actions */}
          <section>
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">In Ấn</h3>
             <div className="grid grid-cols-2 gap-3">
               <button className="flex flex-col items-center justify-center gap-1 py-3 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-xl text-xs font-semibold transition-colors">
                  <Printer size={20} /> In tổng thể
               </button>
               <button className="flex flex-col items-center justify-center gap-1 py-3 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-xl text-xs font-semibold transition-colors">
                  <FileOutput size={20} /> In chi tiết
               </button>
             </div>
          </section>

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
           <button className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-sm font-bold transition-all">
              <Trash2 size={18} /> CLEAR ALL
           </button>
           <button className="w-full flex items-center justify-center gap-2 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-500/30 transition-all">
              <Save size={18} /> SAVE CHANGES
           </button>
        </div>

      </div>

      {/* RIGHT - GRID CANVAS */}
      <div className="flex-1 overflow-hidden relative flex flex-col items-center bg-[#eef2f6]">
        
        {/* Top Info Bar */}
        <div className="w-full px-8 py-4 flex justify-between items-center bg-white/50 backdrop-blur-sm border-b border-slate-200 z-10">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-amber-100 border border-amber-300 rounded-sm"></div>
                 <span className="text-xs font-medium text-slate-600">DG (Hàng nguy hiểm)</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-indigo-100 border border-indigo-300 rounded-sm"></div>
                 <span className="text-xs font-medium text-slate-600">HI (High Cube)</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-cyan-100 border border-cyan-300 rounded-sm"></div>
                 <span className="text-xs font-medium text-slate-600">RF (Hàng lạnh)</span>
              </div>
           </div>
           <div className="text-xs text-slate-400">Mouse: Click to toggle • Mode: {activeTool}</div>
        </div>

        {/* The Ship Grid */}
        <div className="flex-1 w-full overflow-auto p-10 flex items-center justify-center custom-scrollbar">
           
           <div className="relative bg-white p-8 rounded-lg shadow-xl border border-slate-300">
              
              {/* Row Indicators Left */}
              <div className="absolute left-2 top-8 bottom-8 flex flex-col justify-between text-[10px] font-bold text-slate-400 py-1">
                 {/* Top 5 rows (Deck) - usually numbered 82, 84, 86... just using simple index for now */}
                 <div className="flex flex-col gap-[34px]">
                    <span>88</span>
                    <span>86</span>
                    <span>84</span>
                    <span>82</span>
                 </div>
                 {/* Bottom 5 rows (Hold) */}
                 <div className="flex flex-col gap-[34px] mt-10">
                    <span>08</span>
                    <span>06</span>
                    <span>04</span>
                    <span>02</span>
                 </div>
              </div>

              {/* Grid Container */}
              <div className="ml-6">
                
                {/* DECK SECTION */}
                <div className="flex flex-col gap-1 mb-8 relative">
                   <div className="absolute -right-12 top-1/2 -rotate-90 text-xs font-bold text-blue-500 tracking-widest border border-blue-200 px-2 py-1 rounded bg-blue-50">DECK</div>
                   {[0, 1, 2, 3].map(rowIdx => (
                      <div key={`row-${rowIdx}`} className="flex gap-1">
                         {grid.filter(c => c.row === rowIdx).map(cell => (
                            <CellComponent key={cell.id} cell={cell} onClick={() => handleCellClick(cell.id)} />
                         ))}
                      </div>
                   ))}
                </div>

                {/* HATCH COVER DIVIDER */}
                <div className="h-6 w-full bg-slate-100 border-y-2 border-slate-300 border-dashed flex items-center justify-center mb-4">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] bg-white px-2">Hatch Cover</span>
                </div>

                {/* HOLD SECTION */}
                <div className="flex flex-col gap-1 relative">
                   <div className="absolute -right-12 top-1/2 -rotate-90 text-xs font-bold text-slate-500 tracking-widest border border-slate-200 px-2 py-1 rounded bg-slate-50">HOLD</div>
                   {[5, 6, 7, 8].map(rowIdx => (
                      <div key={`row-${rowIdx}`} className="flex gap-1">
                         {grid.filter(c => c.row === rowIdx).map(cell => (
                            <CellComponent key={cell.id} cell={cell} onClick={() => handleCellClick(cell.id)} />
                         ))}
                      </div>
                   ))}
                </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
};

// Sub-component for individual cell rendering to keep main clean
const CellComponent: React.FC<{ cell: Cell; onClick: () => void }> = ({ cell, onClick }) => {
  let bgColor = 'bg-white';
  let borderColor = 'border-slate-300';
  let textColor = 'text-transparent';
  let Icon = null;

  if (cell.isLocked) {
     bgColor = 'bg-slate-100 pattern-diagonal-lines-sm text-slate-300';
     borderColor = 'border-slate-200';
  } else {
     switch (cell.type) {
        case 'STANDARD':
           bgColor = 'bg-white hover:bg-slate-50';
           break;
        case 'DG':
           bgColor = 'bg-amber-100 hover:bg-amber-200';
           borderColor = 'border-amber-400';
           textColor = 'text-amber-600';
           Icon = AlertTriangle;
           break;
        case 'REEFER':
           bgColor = 'bg-cyan-100 hover:bg-cyan-200';
           borderColor = 'border-cyan-400';
           textColor = 'text-cyan-600';
           Icon = Zap;
           break;
        case 'HIGHCUBE':
           bgColor = 'bg-indigo-100 hover:bg-indigo-200';
           borderColor = 'border-indigo-400';
           textColor = 'text-indigo-600';
           Icon = ArrowUpFromLine;
           break;
     }
  }

  return (
    <div 
      onClick={onClick}
      className={`w-10 h-10 border ${borderColor} ${bgColor} rounded-md flex items-center justify-center cursor-pointer transition-all duration-75 relative group select-none`}
    >
       {Icon && <Icon size={16} className={textColor} />}
       {!Icon && !cell.isLocked && <div className="w-1 h-1 bg-slate-200 rounded-full group-hover:bg-slate-400"></div>}
       {cell.isLocked && <Lock size={12} className="text-slate-400" />}
    </div>
  );
};
