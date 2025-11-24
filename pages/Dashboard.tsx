import React from 'react';
import { 
  Ship, 
  Anchor, 
  Container, 
  ArrowUpRight, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Map,
  CalendarCheck
} from 'lucide-react';
import { ViewState } from '../types';

interface DashboardProps {
  onNavigate: (view: ViewState) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  
  // Placeholder data for the visual prototype
  const stats = [
    { title: 'Tàu tại cảng', value: '4', sub: '2 Chờ cập cầu', icon: Ship, color: 'text-brand-600', bg: 'bg-brand-50' },
    { title: 'Container tồn bãi', value: '12,450', sub: 'TEUs', icon: Container, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Hiệu suất cầu bến', value: '88%', sub: '+2.4% tuần này', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Yêu cầu chờ xử lý', value: '15', sub: 'Cần duyệt gấp', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="flex-1 h-screen overflow-hidden flex flex-col bg-slate-50 relative font-sans">
      
      {/* Light Mode Header */}
      <div className="bg-white border-b border-slate-200 relative z-10 px-8 py-6 flex justify-between items-end shadow-sm">
        <div className="absolute inset-0 bg-slate-50/50 opacity-50 z-0"></div>
        {/* Subtle Wave in Light Blue */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden z-0 opacity-20 pointer-events-none">
           <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-[200%] h-full animate-wave text-brand-600 fill-current">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
           </svg>
        </div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold tracking-tight mb-1 flex items-center gap-3 text-slate-800">
            Tổng quan hoạt động
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </h2>
          <p className="text-slate-500 font-medium">Chào mừng trở lại! Đây là báo cáo tình hình cảng hôm nay.</p>
        </div>
        <div className="flex items-center gap-3 text-sm bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm relative z-10 text-slate-600">
          <Clock size={16} className="text-brand-500" />
          <span className="font-semibold">Cập nhật: 10:45 AM - 25/10/2023</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-8 pb-8 pt-6 relative z-10 custom-scrollbar">
        
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start justify-between hover:shadow-md hover:border-brand-200 transition-all duration-300 cursor-default group">
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase mb-1 tracking-wider">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">{stat.sub}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300 ${index % 2 === 0 ? 'animate-float' : 'animate-float-delayed'}`}>
                <stat.icon size={24} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          
          {/* Main Module Shortcuts */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ArrowUpRight size={20} className="text-brand-600" />
              Truy cập nhanh
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Planning Card */}
              <div 
                onClick={() => onNavigate('PLN_LOAD')}
                className="group relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-xl transition-all duration-300 hover:border-brand-300"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity animate-float">
                  <Anchor size={120} className="text-brand-900" />
                </div>
                <div className="p-6 relative z-10">
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <CalendarCheck size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-brand-600 transition-colors">Kế hoạch xếp dỡ</h4>
                  <p className="text-slate-500 text-sm mb-4">Quản lý CMC, gán cẩu và lập kế hoạch xếp dỡ container cho tàu.</p>
                  <span className="text-brand-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Mở module <ArrowUpRight size={16} />
                  </span>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-brand-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>

              {/* Pre-Plan Card */}
              <div 
                onClick={() => onNavigate('PRE_LIST')}
                className="group relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-xl transition-all duration-300 hover:border-emerald-300"
              >
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity animate-float-delayed">
                  <Container size={120} className="text-emerald-900" />
                </div>
                <div className="p-6 relative z-10">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <Map size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">Pre-Planning</h4>
                  <p className="text-slate-500 text-sm mb-4">Nhóm container xuất tàu và quản lý danh sách Pre-Plan sớm.</p>
                  <span className="text-emerald-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Mở module <ArrowUpRight size={16} />
                  </span>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            </div>

            {/* Vessel Schedule Mini-Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    <Ship size={18} className="text-slate-400" />
                    Lịch tàu cập cảng (Dự kiến)
                 </h4>
                 <button className="text-sm font-semibold text-brand-600 hover:underline">Xem tất cả</button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                   <thead className="bg-white text-slate-500 font-bold border-b border-slate-100 uppercase text-xs">
                     <tr>
                       <th className="px-5 py-3">Tên tàu / Chuyến</th>
                       <th className="px-5 py-3">ETA</th>
                       <th className="px-5 py-3">Vị trí</th>
                       <th className="px-5 py-3 text-right">SL Nhập/Xuất</th>
                       <th className="px-5 py-3">Trạng thái</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                     {[
                       { name: 'MAERSK HANOI / 2304W', eta: '25/10 14:00', berth: 'Cầu 1', moves: '1,200 / 850', status: 'Inbound' },
                       { name: 'MSC ANNA / 552E', eta: '25/10 18:30', berth: 'Cầu 2', moves: '450 / 600', status: 'Planned' },
                       { name: 'CMA CGM BLUE / 112N', eta: '26/10 06:00', berth: 'Cầu 1', moves: '900 / 1,100', status: 'Scheduled' },
                     ].map((row, i) => (
                       <tr key={i} className="hover:bg-slate-50 transition-colors">
                         <td className="px-5 py-4 font-bold text-slate-700">{row.name}</td>
                         <td className="px-5 py-4 text-slate-600 font-medium">{row.eta}</td>
                         <td className="px-5 py-4 text-slate-600">{row.berth}</td>
                         <td className="px-5 py-4 text-right text-slate-600 font-mono font-bold">{row.moves}</td>
                         <td className="px-5 py-4">
                           <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                             row.status === 'Inbound' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                             row.status === 'Planned' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-slate-100 text-slate-600 border border-slate-200'
                           }`}>
                             {row.status}
                           </span>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>

          {/* Right Column: Visual / Notifications */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4">Hình ảnh hiện trường</h3>
              <div className="rounded-lg overflow-hidden h-48 w-full relative group shadow-inner border border-slate-100">
                {/* Logistics Image Placeholder */}
                <img 
                  src="https://images.unsplash.com/photo-1494412574643-35d324698420?auto=format&fit=crop&q=80&w=800" 
                  alt="Terminal View" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                   <div className="flex items-center gap-2">
                     <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                     <p className="text-white font-bold text-xs">LIVE: Bãi container A</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl shadow-lg p-6 text-white relative overflow-hidden group">
               {/* Animated Background Effect */}
               <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
               
               <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                 <AlertCircle size={20} className="text-emerald-400" />
                 Hệ thống sẵn sàng
               </h3>
               <p className="text-slate-300 text-sm mb-4 leading-relaxed">Tất cả các module đang hoạt động bình thường. Lần bảo trì tiếp theo dự kiến vào 02:00 CN.</p>
               <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2 rounded-lg text-sm font-bold transition-colors">
                 Xem log hệ thống
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};