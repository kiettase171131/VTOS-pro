import React, { useState } from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  Box, 
  CheckCircle2, 
  Clock, 
  Container, 
  Download, 
  FileBarChart, 
  Filter, 
  MoreHorizontal, 
  PieChart, 
  RefreshCw, 
  Search,
  Ship,
  Truck
} from 'lucide-react';

export const PlanStatistics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'INBOUND' | 'OUTBOUND'>('INBOUND');

  // Mock Data
  const stats = {
    totalMoves: 2450,
    completed: 840,
    remaining: 1610,
    efficiency: '28.5 moves/h',
    eta: 'Oct 26, 14:00'
  };

  const dischargeData = [
    { id: 1, port: 'SGN - Cat Lai', type: 'General', size: '40HC', cargo: 'Textiles', total: 450, planned: 450, remaining: 0, status: 'Completed' },
    { id: 2, port: 'SGN - Cat Lai', type: 'Reefer', size: '40RF', cargo: 'Frozen Fish', total: 120, planned: 80, remaining: 40, status: 'In Progress' },
    { id: 3, port: 'VUNG TAU', type: 'General', size: '20DC', cargo: 'Electronics', total: 300, planned: 0, remaining: 300, status: 'Pending' },
    { id: 4, port: 'DA NANG', type: 'OpenTop', size: '40OT', cargo: 'Machinery', total: 50, planned: 50, remaining: 0, status: 'Completed' },
    { id: 5, port: 'HAI PHONG', type: 'Dangerous', size: '20DG', cargo: 'Chemicals', total: 80, planned: 20, remaining: 60, status: 'In Progress' },
  ];

  const loadData = [
    { id: 1, port: 'HONG KONG', type: 'General', size: '40HC', cargo: 'Furniture', total: 500, planned: 100, remaining: 400, status: 'In Progress' },
    { id: 2, port: 'SHANGHAI', type: 'General', size: '20DC', cargo: 'Rice', total: 600, planned: 0, remaining: 600, status: 'Pending' },
    { id: 3, port: 'TOKYO', type: 'Reefer', size: '40RF', cargo: 'Fruits', total: 200, planned: 200, remaining: 0, status: 'Completed' },
  ];

  const currentData = activeTab === 'INBOUND' ? dischargeData : loadData;

  return (
    <div className="flex-1 h-screen flex flex-col bg-[#F3F6F9] overflow-hidden font-sans">
      
      {/* 1. Header with Context */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex-shrink-0 z-20 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
             <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
              <span className="hover:text-brand-600 cursor-pointer transition-colors">Kế hoạch</span>
              <span className="text-slate-300">/</span>
              <span className="text-brand-600">Thống kê xếp dỡ</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Thống Kê Kế Hoạch</h1>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200 flex items-center gap-1">
                <Ship size={12} /> MAERSK HANOI / 2304W
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <button className="p-2 text-slate-400 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors">
               <RefreshCw size={20} />
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-all shadow-sm">
               <Download size={16} />
               Xuất báo cáo
             </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8 space-y-6">
        
        {/* 2. Top Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Moves */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
             <div>
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Tổng Moves</p>
                <h3 className="text-2xl font-bold text-slate-800">{stats.totalMoves.toLocaleString()}</h3>
                <p className="text-xs text-slate-400 mt-1">Dự kiến hoàn thành: <span className="font-medium text-slate-600">{stats.eta}</span></p>
             </div>
             <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Box size={24} />
             </div>
          </div>

          {/* Completion Progress */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-center">
             <div className="flex justify-between items-end mb-2">
                <p className="text-slate-500 text-xs font-bold uppercase">Tiến độ</p>
                <span className="text-emerald-600 font-bold text-xl">34%</span>
             </div>
             <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[34%]"></div>
             </div>
             <p className="text-xs text-slate-400 mt-2 flex justify-between">
                <span>Completed: {stats.completed}</span>
                <span>Remaining: {stats.remaining}</span>
             </p>
          </div>

          {/* Crane Efficiency */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
             <div>
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Năng suất TB</p>
                <h3 className="text-2xl font-bold text-slate-800">{stats.efficiency}</h3>
                <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
                   <ArrowUp size={12} /> +2.4% so với định mức
                </p>
             </div>
             <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                <Clock size={24} />
             </div>
          </div>

          {/* Special Cargo */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
             <div>
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Hàng đặc biệt</p>
                <h3 className="text-2xl font-bold text-slate-800">45 <span className="text-sm font-normal text-slate-400">Conts</span></h3>
                <p className="text-xs text-amber-600 mt-1 font-medium">Cần lưu ý: DG, OOG</p>
             </div>
             <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                <CheckCircle2 size={24} />
             </div>
          </div>
        </div>

        {/* 3. Main Data Area */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[500px]">
           
           {/* Visual Tabs */}
           <div className="flex border-b border-slate-200">
              <button 
                onClick={() => setActiveTab('INBOUND')}
                className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all relative ${
                  activeTab === 'INBOUND' 
                    ? 'text-blue-600 bg-blue-50/50' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                 <ArrowDown size={18} className={activeTab === 'INBOUND' ? 'text-blue-600' : 'text-slate-400'} />
                 DISCHARGE (Hàng Nhập)
                 {activeTab === 'INBOUND' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>}
              </button>
              <div className="w-px bg-slate-200"></div>
              <button 
                onClick={() => setActiveTab('OUTBOUND')}
                className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all relative ${
                  activeTab === 'OUTBOUND' 
                    ? 'text-emerald-600 bg-emerald-50/50' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                 <ArrowUp size={18} className={activeTab === 'OUTBOUND' ? 'text-emerald-600' : 'text-slate-400'} />
                 LOAD (Hàng Xuất)
                 {activeTab === 'OUTBOUND' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600"></div>}
              </button>
           </div>

           {/* Toolbar */}
           <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
              <div className="flex items-center gap-3">
                 <div className="relative">
                    <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Tìm theo cảng, loại hàng..." 
                      className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 w-64"
                    />
                 </div>
                 <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50">
                    <Filter size={16} /> Bộ lọc
                 </button>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-500">
                 <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span> Pending
                 </span>
                 <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> In Progress
                 </span>
                 <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Completed
                 </span>
              </div>
           </div>

           {/* Data Grid */}
           <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                 <thead className="bg-slate-50 text-slate-500 font-semibold text-xs uppercase sticky top-0 z-10">
                    <tr>
                       <th className="px-6 py-4">Cảng Dỡ/Xếp</th>
                       <th className="px-6 py-4">Loại Container</th>
                       <th className="px-6 py-4">Kích Cỡ</th>
                       <th className="px-6 py-4">Loại Hàng</th>
                       <th className="px-6 py-4 text-center">Tổng Số</th>
                       <th className="px-6 py-4 text-center">Đã Lên KH</th>
                       <th className="px-6 py-4 text-center">Còn Lại</th>
                       <th className="px-6 py-4">Trạng Thái</th>
                       <th className="px-6 py-4 text-right"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {currentData.map((row) => (
                       <tr key={row.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-4 font-bold text-slate-700">{row.port}</td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-2">
                                <Container size={16} className="text-slate-400" />
                                {row.type}
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className="bg-slate-100 text-slate-600 border border-slate-200 px-2 py-1 rounded text-xs font-mono font-bold">
                                {row.size}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-slate-600">{row.cargo}</td>
                          <td className="px-6 py-4 text-center font-medium">{row.total}</td>
                          <td className="px-6 py-4 text-center text-blue-600 font-medium">{row.planned}</td>
                          <td className="px-6 py-4 text-center text-slate-400">{row.remaining}</td>
                          <td className="px-6 py-4">
                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                row.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                                row.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                'bg-slate-100 text-slate-800'
                             }`}>
                                {row.status}
                             </span>
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
        </div>
      </main>
    </div>
  );
};