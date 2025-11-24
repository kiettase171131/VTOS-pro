import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowRight, 
  Box, 
  Scale, 
  Layers, 
  MoreHorizontal, 
  Plus, 
  Save, 
  Trash2, 
  Container,
  CheckCircle2,
  Anchor,
  Cuboid
} from 'lucide-react';

export const PrePlanGroup: React.FC = () => {
  const [selectedContainers, setSelectedContainers] = useState<number[]>([]);
  const [activeSizeFilter, setActiveSizeFilter] = useState('ALL');

  // Mock Data for Yard Containers
  const yardContainers = [
    { id: 1, no: 'MSKU102938', size: '40HC', op: 'MAERSK', weight: 24.5, loc: 'A-01-02-03', fe: 'Full' },
    { id: 2, no: 'TCLU482910', size: '20DC', op: 'MSC', weight: 18.2, loc: 'A-01-02-04', fe: 'Full' },
    { id: 3, no: 'CMAU192837', size: '40HC', op: 'CMA', weight: 22.1, loc: 'B-04-01-01', fe: 'Full' },
    { id: 4, no: 'ONEU918273', size: '20DC', op: 'ONE', weight: 12.5, loc: 'C-12-05-02', fe: 'Empty' },
    { id: 5, no: 'HACU817263', size: '45G1', op: 'HAPAG', weight: 28.0, loc: 'A-02-01-01', fe: 'Full' },
    { id: 6, no: 'MSKU918271', size: '40HC', op: 'MAERSK', weight: 25.1, loc: 'B-02-02-02', fe: 'Full' },
  ];

  const toggleSelection = (id: number) => {
    if (selectedContainers.includes(id)) {
      setSelectedContainers(selectedContainers.filter(cid => cid !== id));
    } else {
      setSelectedContainers([...selectedContainers, id]);
    }
  };

  const selectedItems = yardContainers.filter(c => selectedContainers.includes(c.id));
  const totalWeight = selectedItems.reduce((acc, curr) => acc + curr.weight, 0);

  return (
    <div className="flex-1 h-screen flex flex-col bg-[#F3F6F9] overflow-hidden font-sans">
      
      {/* Light Theme Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between flex-shrink-0 z-20 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">
            <span className="hover:text-brand-600 cursor-pointer transition-colors">Pre Planning</span>
            <span className="text-slate-400">/</span>
            <span className="text-brand-600">Group Container</span>
          </nav>
          <div className="flex items-center gap-3">
             <div className="bg-brand-50 backdrop-blur p-2 rounded-lg text-brand-600 animate-float">
               <Cuboid size={24} />
             </div>
             <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Nhóm Container Xuất</h1>
          </div>
        </div>
        
        <div className="relative z-10 flex items-center gap-3">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg">
             <Anchor size={16} className="text-brand-600" />
             <span className="text-sm font-bold text-slate-700">MAERSK HANOI</span>
             <div className="h-4 w-px bg-slate-300 mx-1"></div>
             <span className="text-sm font-medium text-slate-500">V.2304W</span>
           </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden p-6 gap-6">
        
        {/* LEFT PANEL: Source List (Yard) */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
           
           {/* Filters */}
           <div className="p-4 border-b border-slate-100 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                 <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Tìm số container, vị trí..." 
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                    />
                 </div>
                 <div className="flex gap-2">
                    <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-2 outline-none">
                       <option>Block A</option>
                       <option>Block B</option>
                       <option>Block C</option>
                    </select>
                    <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500">
                       <Filter size={18} />
                    </button>
                 </div>
              </div>

              {/* Quick Filters (Size) */}
              <div className="flex gap-2">
                 {['ALL', '20', '20H', '40', '40H', '45'].map(size => (
                    <button 
                      key={size}
                      onClick={() => setActiveSizeFilter(size)}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all border ${
                        activeSizeFilter === size 
                          ? 'bg-brand-50 border-brand-200 text-brand-700' 
                          : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                       {size}
                    </button>
                 ))}
              </div>
           </div>

           {/* Table */}
           <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                 <thead className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase sticky top-0">
                    <tr>
                       <th className="px-4 py-3 w-10"></th>
                       <th className="px-4 py-3">Số Container</th>
                       <th className="px-4 py-3">Vị trí</th>
                       <th className="px-4 py-3">ISO</th>
                       <th className="px-4 py-3">Opr</th>
                       <th className="px-4 py-3 text-right">TL (T)</th>
                       <th className="px-4 py-3 text-center">F/E</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {yardContainers.map(row => (
                       <tr 
                         key={row.id} 
                         onClick={() => toggleSelection(row.id)}
                         className={`cursor-pointer transition-colors hover:bg-slate-50 ${selectedContainers.includes(row.id) ? 'bg-blue-50/50' : ''}`}
                       >
                          <td className="px-4 py-3 text-center">
                             <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedContainers.includes(row.id) ? 'bg-brand-600 border-brand-600' : 'border-slate-300 bg-white'}`}>
                                {selectedContainers.includes(row.id) && <CheckCircle2 size={12} className="text-white" />}
                             </div>
                          </td>
                          <td className="px-4 py-3 font-bold text-slate-700">{row.no}</td>
                          <td className="px-4 py-3 font-mono text-slate-500 text-xs">{row.loc}</td>
                          <td className="px-4 py-3">
                             <span className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-600">{row.size}</span>
                          </td>
                          <td className="px-4 py-3 text-slate-600">{row.op}</td>
                          <td className="px-4 py-3 text-right font-medium text-slate-700">{row.weight.toFixed(1)}</td>
                          <td className="px-4 py-3 text-center">
                             <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${row.fe === 'Full' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                                {row.fe}
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* MIDDLE ACTION AREA */}
        <div className="flex flex-col justify-center items-center gap-4">
           <button className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 shadow-sm">
             <ArrowRight size={20} />
           </button>
        </div>

        {/* RIGHT PANEL: Target Group (Staging) */}
        <div className="w-[400px] bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col overflow-hidden relative">
           
           <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-400 to-pink-500"></div>

           <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                 <Box className="text-orange-500" size={18} />
                 Chi tiết Nhóm (Group)
              </h3>
              <p className="text-xs text-slate-500 mt-1">Các container được chọn sẽ được nhóm lại để lập kế hoạch.</p>
           </div>

           {/* Stats */}
           <div className="p-5 grid grid-cols-2 gap-4 border-b border-slate-100">
              <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                 <p className="text-[10px] uppercase font-bold text-blue-500 mb-1">Số lượng</p>
                 <p className="text-xl font-bold text-blue-700">{selectedContainers.length} <span className="text-xs font-medium text-blue-400">Conts</span></p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                 <p className="text-[10px] uppercase font-bold text-emerald-500 mb-1 flex items-center gap-1"><Scale size={10} /> Tổng Trọng lượng</p>
                 <p className="text-xl font-bold text-emerald-700">{totalWeight.toFixed(1)} <span className="text-xs font-medium text-emerald-400">Tons</span></p>
              </div>
           </div>

           {/* Selected List */}
           <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30 custom-scrollbar">
              {selectedItems.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
                    <Layers size={48} className="mb-2" />
                    <p className="text-sm">Chưa có container nào</p>
                 </div>
              ) : (
                 selectedItems.map((item) => (
                    <div key={item.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex justify-between items-center group">
                       <div>
                          <p className="font-bold text-sm text-slate-700">{item.no}</p>
                          <p className="text-xs text-slate-500">{item.size} • {item.weight}T</p>
                       </div>
                       <button onClick={() => toggleSelection(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                       </button>
                    </div>
                 ))
              )}
           </div>

           {/* Footer Action */}
           <div className="p-5 border-t border-slate-200 bg-white">
              <div className="mb-4">
                 <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Tên Nhóm / Ghi chú</label>
                 <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-500" placeholder="VD: Group-Heavy-01" />
              </div>
              <button 
                disabled={selectedItems.length === 0}
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
              >
                 <Save size={18} />
                 Lưu & Tạo Nhóm
              </button>
           </div>
        </div>

      </main>
    </div>
  );
};