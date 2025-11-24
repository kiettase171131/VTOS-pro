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
    { title: 'Tàu tại cảng', value: '4', sub: '2 Chờ cập cầu', icon: Ship, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Container tồn bãi', value: '12,450', sub: 'TEUs', icon: Container, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'Hiệu suất cầu bến', value: '88%', sub: '+2.4% tuần này', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Yêu cầu chờ xử lý', value: '15', sub: 'Cần duyệt gấp', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <div className="flex-1 h-screen overflow-hidden flex flex-col bg-slate-50 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-brand-900 z-0"></div>
      
      {/* Header Content */}
      <div className="relative z-10 px-8 pt-8 pb-6 flex justify-between items-end text-white">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-1">Tổng quan hoạt động</h2>
          <p className="text-brand-200 opacity-90">Chào mừng trở lại! Đây là báo cáo tình hình cảng hôm nay.</p>
        </div>
        <div className="flex items-center gap-3 text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <Clock size={16} />
          <span>Cập nhật: 10:45 AM - 25/10/2023</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-8 pb-8 relative z-10 custom-scrollbar">
        
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start justify-between hover:shadow-md transition-shadow">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
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
                className="group relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Anchor size={120} className="text-brand-900" />
                </div>
                <div className="p-6 relative z-10">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 mb-4 group-hover:scale-110 transition-transform">
                    <CalendarCheck size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-brand-600 transition-colors">Kế hoạch xếp dỡ</h4>
                  <p className="text-slate-500 text-sm mb-4">Quản lý CMC, gán cẩu và lập kế hoạch xếp dỡ container cho tàu.</p>
                  <span className="text-brand-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Mở module <ArrowUpRight size={16} />
                  </span>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>

              {/* Pre-Plan Card */}
              <div 
                onClick={() => onNavigate('PRE_LIST')}
                className="group relative overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Container size={120} className="text-emerald-900" />
                </div>
                <div className="p-6 relative z-10">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 mb-4 group-hover:scale-110 transition-transform">
                    <Map size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">Pre-Planning</h4>
                  <p className="text-slate-500 text-sm mb-4">Nhóm container xuất tàu và quản lý danh sách Pre-Plan sớm.</p>
                  <span className="text-emerald-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Mở module <ArrowUpRight size={16} />
                  </span>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            </div>

            {/* Vessel Schedule Mini-Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                 <h4 className="font-bold text-slate-800">Lịch tàu cập cảng (Dự kiến)</h4>
                 <button className="text-sm text-brand-600 hover:underline">Xem tất cả</button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                   <thead className="bg-slate-50 text-slate-500 font-medium">
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
                         <td className="px-5 py-4 font-medium text-slate-800">{row.name}</td>
                         <td className="px-5 py-4 text-slate-600">{row.eta}</td>
                         <td className="px-5 py-4 text-slate-600">{row.berth}</td>
                         <td className="px-5 py-4 text-right text-slate-600">{row.moves}</td>
                         <td className="px-5 py-4">
                           <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                             row.status === 'Inbound' ? 'bg-blue-100 text-blue-700' :
                             row.status === 'Planned' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
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
              <div className="rounded-lg overflow-hidden h-48 w-full relative group">
                {/* Logistics Image Placeholder */}
                <img 
                  src="https://picsum.photos/400/300?grayscale" 
                  alt="Terminal View" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                   <p className="text-white font-medium text-sm">Camera 04: Bãi container A</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-800 to-brand-900 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
               <h3 className="font-bold text-lg mb-2">Hệ thống sẵn sàng</h3>
               <p className="text-brand-200 text-sm mb-4">Tất cả các module đang hoạt động bình thường. Lần bảo trì tiếp theo dự kiến vào 02:00 CN.</p>
               <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                 Xem log hệ thống
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
