import React, { useState } from 'react';
import { 
  Printer, 
  FileText, 
  List, 
  LayoutTemplate, 
  Eye, 
  Download,
  ChevronRight,
  Check
} from 'lucide-react';

export const PlanPrint: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('GENERAL');

  const reportTypes = [
    { id: 'GENERAL', title: 'Kế hoạch tổng thể', desc: 'Sơ đồ bay view tổng quan màu sắc theo cảng', icon: LayoutTemplate },
    { id: 'SEQUENCE', title: 'Trình tự xếp dỡ', desc: 'Danh sách chi tiết thứ tự làm hàng cho cẩu', icon: List },
    { id: 'MANIFEST', title: 'Cargo Manifest', desc: 'Bản khai hàng hóa chi tiết cho hải quan', icon: FileText },
  ];

  return (
    <div className="flex-1 h-screen flex flex-col bg-[#F3F6F9] overflow-hidden font-sans">
       {/* Light Theme Header */}
       <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between flex-shrink-0 z-20 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">
            <span className="hover:text-brand-600 cursor-pointer transition-colors">Kế hoạch</span>
            <span className="text-slate-400">/</span>
            <span className="text-brand-600">In Ấn</span>
          </nav>
          <div className="flex items-center gap-3">
             <div className="bg-brand-50 backdrop-blur p-2 rounded-lg text-brand-600 animate-float">
               <Printer size={24} />
             </div>
             <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Xuất Báo Cáo & In Ấn</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden p-8 gap-8">
         
         {/* Left: Configuration Panel */}
         <div className="w-1/3 flex flex-col gap-6">
            
            <section>
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">1. Chọn loại báo cáo</h3>
               <div className="space-y-3">
                  {reportTypes.map((report) => (
                    <button
                      key={report.id}
                      onClick={() => setSelectedReport(report.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 group relative ${
                        selectedReport === report.id 
                          ? 'bg-blue-50 border-blue-500 shadow-md' 
                          : 'bg-white border-slate-200 hover:border-blue-300'
                      }`}
                    >
                       <div className={`p-3 rounded-lg ${selectedReport === report.id ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
                          <report.icon size={24} />
                       </div>
                       <div>
                          <h4 className={`font-bold text-sm ${selectedReport === report.id ? 'text-blue-700' : 'text-slate-700'}`}>{report.title}</h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{report.desc}</p>
                       </div>
                       {selectedReport === report.id && (
                          <div className="absolute top-4 right-4 text-blue-500">
                             <Check size={20} />
                          </div>
                       )}
                    </button>
                  ))}
               </div>
            </section>

            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">2. Tùy chọn in</h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <span className="text-sm text-slate-700 font-medium">Khổ giấy</span>
                     <select className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-sm font-medium outline-none">
                        <option>A4 (Dọc)</option>
                        <option>A3 (Ngang)</option>
                     </select>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm text-slate-700 font-medium">Màu sắc</span>
                     <div className="flex bg-slate-100 p-1 rounded">
                        <button className="px-3 py-1 text-xs font-bold bg-white shadow-sm rounded">Màu</button>
                        <button className="px-3 py-1 text-xs font-bold text-slate-500">Đen trắng</button>
                     </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                     <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                     <span className="text-sm text-slate-600">Bao gồm ghi chú đặc biệt</span>
                  </label>
               </div>
            </section>

            <button className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-lg font-bold shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 transition-all">
               <Printer size={24} />
               Tiến Hành In
            </button>
         </div>

         {/* Right: Preview Panel */}
         <div className="flex-1 bg-slate-200/50 rounded-2xl border border-slate-200 flex flex-col overflow-hidden relative">
            <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center">
               <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                  <Eye size={18} /> Preview
               </div>
               <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded text-slate-500"><Download size={18} /></button>
               </div>
            </div>
            
            <div className="flex-1 overflow-auto p-8 flex justify-center bg-slate-100 custom-scrollbar">
               {/* Paper Simulation */}
               <div className="w-[595px] min-h-[842px] bg-white shadow-2xl p-10 text-xs text-slate-800 flex flex-col gap-4">
                  <div className="border-b-2 border-slate-800 pb-4 mb-4 flex justify-between items-end">
                     <div>
                        <h1 className="text-2xl font-bold uppercase tracking-widest text-slate-900">Stowage Plan</h1>
                        <p className="font-mono text-slate-500 mt-1">VESSEL: MAERSK HANOI / V.2304W</p>
                     </div>
                     <div className="text-right">
                        <p>Date: 25/10/2023</p>
                        <p>Page 1 of 5</p>
                     </div>
                  </div>
                  
                  {/* Mock Content */}
                  <div className="grid grid-cols-2 gap-8 mb-8">
                     <div className="h-32 bg-slate-100 border border-slate-200 rounded flex items-center justify-center text-slate-400">Bay 01 Chart</div>
                     <div className="h-32 bg-slate-100 border border-slate-200 rounded flex items-center justify-center text-slate-400">Bay 03 Chart</div>
                  </div>
                  
                  <div className="space-y-2 font-mono text-[10px]">
                     <div className="bg-slate-50 p-2 border-b border-slate-100">001 | MSKU89231 | 40HC | USLAX | 22.5T</div>
                     <div className="bg-white p-2 border-b border-slate-100">002 | CMAU81273 | 20DC | USNYC | 18.2T</div>
                     <div className="bg-slate-50 p-2 border-b border-slate-100">003 | MSKU89231 | 40HC | USLAX | 22.5T</div>
                     <div className="bg-white p-2 border-b border-slate-100">004 | CMAU81273 | 20DC | USNYC | 18.2T</div>
                     <div className="bg-slate-50 p-2 border-b border-slate-100">005 | MSKU89231 | 40HC | USLAX | 22.5T</div>
                     {/* More lines simulation */}
                     {Array.from({length: 15}).map((_, i) => (
                        <div key={i} className="h-4 bg-slate-50 w-full rounded-sm opacity-50"></div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

      </main>
    </div>
  );
};