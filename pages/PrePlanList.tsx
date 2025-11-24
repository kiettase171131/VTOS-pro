
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  FileText, 
  Clock, 
  AlertCircle, 
  CheckCircle2,
  Ship,
  ToggleLeft,
  ToggleRight,
  ChevronDown
} from 'lucide-react';

export const PrePlanList: React.FC = () => {
  
  // Mock Data
  const plans = [
    { id: 1, status: 'Active', container: 'AVIU213812392', op: 'HAPAG', size: '40ft', iso: '45G1', fe: 'Full', weight: 24.5, pod: 'VNHPH', vgm: true },
    { id: 2, status: 'Active', container: 'MSKU928172311', op: 'MAERSK', size: '40ft', iso: '42G1', fe: 'Empty', weight: 4.2, pod: 'SGSIN', vgm: true },
    { id: 3, status: 'Inactive', container: 'TCLU102938122', op: 'ONE', size: '20ft', iso: '22G1', fe: 'Full', weight: 18.5, pod: 'USLAX', vgm: false },
    { id: 4, status: 'Active', container: 'CMAU192837111', op: 'CMA', size: '40ft', iso: '45R1', fe: 'Full', weight: 28.1, pod: 'HKHKG', vgm: true },
    { id: 5, status: 'Active', container: 'HACU918273666', op: 'HAPAG', size: '20ft', iso: '22G1', fe: 'Empty', weight: 2.3, pod: 'CNSHA', vgm: true },
    { id: 6, status: 'Inactive', container: 'OOLU192837444', op: 'OOCL', size: '40ft', iso: '45G1', fe: 'Full', weight: 22.0, pod: 'JPTYO', vgm: true },
  ];

  return (
    <div className="flex-1 h-screen flex flex-col bg-[#F3F6F9] overflow-hidden font-sans">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between flex-shrink-0 z-20">
        <div>
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
            <span className="hover:text-brand-600 cursor-pointer">Pre Planning</span>
            <span className="text-slate-300">/</span>
            <span className="text-brand-600">Danh Sách Pre-Plan</span>
          </nav>
          <div className="flex items-center gap-3">
             <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
               <FileText size={24} />
             </div>
             <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Danh Sách Kế Hoạch Sớm</h1>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-bold shadow-lg shadow-brand-500/30 transition-all">
           <Plus size={18} /> Tạo Mới
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
         
         {/* KPI Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
               <div>
                  <p className="text-slate-500 text-xs font-bold uppercase mb-1">Tổng Plans</p>
                  <h3 className="text-3xl font-bold text-slate-800">128</h3>
               </div>
               <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <FileText size={24} />
               </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
               <div>
                  <p className="text-slate-500 text-xs font-bold uppercase mb-1">Đang Active</p>
                  <h3 className="text-3xl font-bold text-emerald-600">94</h3>
               </div>
               <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <CheckCircle2 size={24} />
               </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
               <div>
                  <p className="text-slate-500 text-xs font-bold uppercase mb-1">Thiếu thông tin</p>
                  <h3 className="text-3xl font-bold text-amber-600">12</h3>
               </div>
               <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                  <AlertCircle size={24} />
               </div>
            </div>
         </div>

         {/* Data Grid Container */}
         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[500px]">
            
            {/* Filter Toolbar */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
               <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative w-full sm:w-80">
                     <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
                     <input 
                       type="text" 
                       placeholder="Tìm theo Container, Operator..." 
                       className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                     />
                  </div>
                  <div className="relative">
                     <select className="appearance-none pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none focus:border-brand-500 cursor-pointer hover:bg-slate-50">
                        <option>Tất cả Hãng</option>
                        <option>MAERSK</option>
                        <option>MSC</option>
                        <option>HAPAG</option>
                     </select>
                     <ChevronDown size={14} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
                  </div>
               </div>
               <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-white transition-colors">
                  <Filter size={18} />
               </button>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
               <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase sticky top-0 z-10 border-b border-slate-200">
                     <tr>
                        <th className="px-6 py-4 w-12 text-center">#</th>
                        <th className="px-6 py-4">Trạng thái</th>
                        <th className="px-6 py-4">Số Container</th>
                        <th className="px-6 py-4">Hãng KT</th>
                        <th className="px-6 py-4">Kích cỡ / ISO</th>
                        <th className="px-6 py-4">F/E</th>
                        <th className="px-6 py-4">Trọng lượng (VGM)</th>
                        <th className="px-6 py-4">Cảng Đích (POD)</th>
                        <th className="px-6 py-4">VGM</th>
                        <th className="px-6 py-4 w-12"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {plans.map((row, index) => (
                        <tr key={row.id} className="hover:bg-slate-50 transition-colors group">
                           <td className="px-6 py-4 text-center text-slate-400 font-medium">{index + 1}</td>
                           <td className="px-6 py-4">
                              <button className={`flex items-center gap-2 text-sm font-medium transition-colors ${row.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                                 {row.status === 'Active' ? <ToggleRight size={24} className="fill-current" /> : <ToggleLeft size={24} />}
                                 {row.status}
                              </button>
                           </td>
                           <td className="px-6 py-4 font-bold text-slate-700">{row.container}</td>
                           <td className="px-6 py-4">
                              <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">{row.op}</span>
                           </td>
                           <td className="px-6 py-4 text-slate-600">
                              {row.size} <span className="text-slate-400 mx-1">/</span> <span className="font-mono font-medium">{row.iso}</span>
                           </td>
                           <td className="px-6 py-4">
                              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${row.fe === 'Full' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                                 {row.fe}
                              </span>
                           </td>
                           <td className="px-6 py-4 font-mono font-medium text-slate-700">{row.weight} T</td>
                           <td className="px-6 py-4 font-bold text-brand-700 flex items-center gap-1">
                              <Ship size={14} className="text-slate-400" /> {row.pod}
                           </td>
                           <td className="px-6 py-4">
                              {row.vgm ? (
                                <input type="checkbox" checked readOnly className="rounded text-brand-600 focus:ring-brand-500 cursor-default" />
                              ) : (
                                <input type="checkbox" readOnly className="rounded border-slate-300 text-slate-400 cursor-default" />
                              )}
                           </td>
                           <td className="px-6 py-4 text-right">
                              <button className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded transition-all opacity-0 group-hover:opacity-100">
                                 <MoreHorizontal size={18} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            
            {/* Pagination */}
            <div className="p-4 border-t border-slate-200 bg-white flex justify-between items-center text-xs text-slate-500">
               <span>Showing 6 of 128 plans</span>
               <div className="flex gap-2">
                  <button className="px-3 py-1.5 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">Previous</button>
                  <button className="px-3 py-1.5 border border-slate-200 rounded hover:bg-slate-50">Next</button>
               </div>
            </div>
         </div>
      </main>
    </div>
  );
};
