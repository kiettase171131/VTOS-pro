import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal, 
  AlertCircle, 
  CheckCircle2, 
  Truck, 
  Package, 
  Scale,
  Database,
  ClipboardList
} from 'lucide-react';

export const PlanExportList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ALL');

  // KPI Data
  const kpis = [
    { title: 'Tổng Container', value: '450', sub: 'Đã đăng ký', icon: Database, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Chưa hạ bãi', value: '125', sub: 'Đang vận chuyển', icon: Truck, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Thiếu VGM', value: '12', sub: 'Cần cập nhật', icon: Scale, color: 'text-red-600', bg: 'bg-red-50' },
    { title: 'Sẵn sàng xếp', value: '313', sub: 'Đủ điều kiện', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="flex-1 h-screen flex flex-col bg-[#F3F6F9] overflow-hidden font-sans">
      
      {/* Light Theme Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between flex-shrink-0 z-20 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">
            <span className="hover:text-brand-600 cursor-pointer transition-colors">Kế hoạch</span>
            <span className="text-slate-400">/</span>
            <span className="text-brand-600">Container Xuất</span>
          </nav>
          <div className="flex items-center gap-3">
             <div className="bg-brand-50 backdrop-blur p-2 rounded-lg text-brand-600 animate-float">
               <ClipboardList size={24} />
             </div>
             <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Danh Sách Container Xuất</h1>
          </div>
        </div>
        
        <div className="relative z-10 flex items-center gap-3">
            <span className="bg-slate-100 border border-slate-200 text-brand-600 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              MAERSK HANOI / 2304W
            </span>
            <div className="h-8 w-px bg-slate-200 mx-1"></div>
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 rounded-lg text-sm font-medium transition-colors shadow-sm">
              <Download size={16} /> <span className="hidden sm:inline">Export</span>
           </button>
           <button className="flex items-center gap-2 px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-brand-200 transition-all transform hover:-translate-y-0.5">
              <Plus size={18} /> Thêm Mới
           </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
         
         {/* KPI Cards */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {kpis.map((kpi, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-start justify-between group hover:shadow-md transition-all">
                 <div>
                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">{kpi.title}</p>
                    <h3 className="text-3xl font-bold text-slate-800 mb-1">{kpi.value}</h3>
                    <p className="text-xs font-medium text-slate-400">{kpi.sub}</p>
                 </div>
                 <div className={`p-3 rounded-xl ${kpi.bg} ${kpi.color} group-hover:scale-110 transition-transform`}>
                    <kpi.icon size={24} />
                 </div>
              </div>
            ))}
         </div>

         {/* Data Grid Container */}
         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[600px]">
            
            {/* Toolbar */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
               <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-full sm:w-80">
                     <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
                     <input 
                       type="text" 
                       placeholder="Tìm theo số container, booking..." 
                       className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                     />
                  </div>
                  <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-brand-600 hover:border-brand-200 transition-colors">
                     <Filter size={18} />
                  </button>
               </div>

               <div className="flex bg-slate-200/50 p-1 rounded-lg">
                  {['ALL', 'PENDING', 'READY'].map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === tab ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {tab === 'ALL' ? 'Tất cả' : tab === 'PENDING' ? 'Chờ xử lý' : 'Sẵn sàng'}
                    </button>
                  ))}
               </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
               <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase sticky top-0 z-10">
                     <tr>
                        <th className="px-6 py-4 w-12 text-center"><input type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" /></th>
                        <th className="px-6 py-4">Số Container</th>
                        <th className="px-6 py-4">Kích cỡ / ISO</th>
                        <th className="px-6 py-4">Cảng dỡ (POD)</th>
                        <th className="px-6 py-4">Trọng lượng (VGM)</th>
                        <th className="px-6 py-4">Loại hàng</th>
                        <th className="px-6 py-4">Vị trí bãi</th>
                        <th className="px-6 py-4 text-center">Trạng thái</th>
                        <th className="px-6 py-4 w-12"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                        <tr key={item} className="hover:bg-slate-50 transition-colors group">
                           <td className="px-6 py-4 text-center"><input type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" /></td>
                           <td className="px-6 py-4 font-bold text-brand-700">MSKU123456{item}</td>
                           <td className="px-6 py-4">
                              <span className="bg-slate-100 text-slate-600 border border-slate-200 px-2 py-1 rounded text-xs font-mono font-bold">45G1</span>
                           </td>
                           <td className="px-6 py-4 font-medium text-slate-700">USLAX</td>
                           <td className="px-6 py-4 text-slate-600">30.50 T</td>
                           <td className="px-6 py-4 text-slate-600">General</td>
                           <td className="px-6 py-4 text-slate-600 font-mono text-xs">A-12-04-02</td>
                           <td className="px-6 py-4 text-center">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Ready
                              </span>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <button className="text-slate-400 hover:text-brand-600 transition-colors opacity-0 group-hover:opacity-100">
                                 <MoreHorizontal size={18} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* Footer Pagination */}
            <div className="p-4 border-t border-slate-200 bg-white flex justify-between items-center text-xs text-slate-500">
               <span>Showing 1-10 of 450 items</span>
               <div className="flex gap-2">
                  <button className="px-3 py-1.5 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                  <button className="px-3 py-1.5 border border-slate-200 rounded hover:bg-slate-50">Next</button>
               </div>
            </div>
         </div>
      </main>
    </div>
  );
};