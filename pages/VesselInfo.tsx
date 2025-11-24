import React, { useState } from 'react';
import { 
  Save, 
  Trash2, 
  Ship, 
  Search, 
  Anchor, 
  Navigation, 
  Radio, 
  Scale, 
  Ruler, 
  FileText, 
  Flag, 
  Globe,
  MoreHorizontal,
  UploadCloud,
  Clock,
  ChevronDown
} from 'lucide-react';

export const VesselInfo: React.FC = () => {
  // State for form interaction
  const [activeTab, setActiveTab] = useState<'specs' | 'capacity'>('specs');
  const [serviceRounding, setServiceRounding] = useState<'0H' | '0.5H' | '1H'>('0.5H');

  return (
    <div className="flex-1 h-screen flex flex-col bg-[#F3F6F9] overflow-hidden font-sans">
      
      {/* 1. Light Theme Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between flex-shrink-0 z-20 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">
            <span className="hover:text-brand-600 cursor-pointer transition-colors">Định dạng</span>
            <span className="text-slate-400">/</span>
            <span className="text-brand-600">Thông tin tàu</span>
          </nav>
          <div className="flex items-center gap-3">
             <div className="bg-brand-50 backdrop-blur p-2 rounded-lg text-brand-600 animate-float">
               <Ship size={24} />
             </div>
             <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Hồ Sơ Tàu Biển</h1>
          </div>
        </div>
        
        <div className="relative z-10 flex items-center gap-3">
           <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 text-sm font-semibold rounded-lg transition-all shadow-sm">
              <Trash2 size={18} />
              <span className="hidden sm:inline">Xóa Tàu</span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1"></div>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-brand-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
              <Save size={18} strokeWidth={2.5} />
              Lưu Hồ Sơ
            </button>
        </div>
      </header>

      {/* 2. Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Top Search Bar (Context Selector) */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center">
             <div className="flex-1 w-full relative">
                <label className="text-[10px] uppercase font-bold text-slate-400 absolute top-2 left-3">Tìm kiếm mã tàu</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pt-6 pb-2 px-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all placeholder:font-normal"
                  placeholder="Nhập mã tàu..."
                />
                <Search className="absolute right-3 top-4 text-slate-400" size={20} />
             </div>
             <div className="flex-1 w-full relative">
                <label className="text-[10px] uppercase font-bold text-slate-400 absolute top-2 left-3">Tên tàu</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pt-6 pb-2 px-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all placeholder:font-normal"
                  placeholder="Nhập tên tàu..."
                />
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Vessel Identity (Editable) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Profile Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative group">
                {/* Decorative Header */}
                <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative overflow-hidden">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                   <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/20 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Active
                   </div>
                </div>
                
                <div className="px-6 pb-6 relative">
                   {/* Avatar / Uploader */}
                   <div className="w-24 h-24 bg-white rounded-2xl p-1 shadow-xl -mt-12 mb-6 relative overflow-hidden group-hover:translate-y-[-2px] transition-transform duration-300">
                      <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center border border-slate-100 overflow-hidden relative">
                         <div className="absolute inset-0 bg-blue-500/10"></div>
                         <Ship size={40} className="text-blue-500 animate-float" /> 
                      </div>
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                         <UploadCloud className="text-white" size={24} />
                      </div>
                   </div>
                   
                   {/* Editable Fields Section */}
                   <div className="space-y-5">
                      {/* Name & Code */}
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Tên Tàu</label>
                        <input 
                          type="text"
                          className="w-full text-lg font-bold text-slate-800 border-b-2 border-slate-100 focus:border-brand-600 focus:outline-none bg-transparent py-1 transition-colors placeholder:text-slate-300"
                          placeholder="VD: MAERSK HANOI"
                          defaultValue="MAERSK HANOI"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Loại Tàu</label>
                           <div className="relative">
                             <select className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none appearance-none">
                               <option value="CONTAINER">Container</option>
                               <option value="BULK">Bulk Carrier</option>
                               <option value="TANKER">Tanker</option>
                             </select>
                             <ChevronDown size={14} className="absolute right-2 top-3 text-slate-400 pointer-events-none"/>
                           </div>
                        </div>
                        <div>
                           <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Số hiệu (Voyage)</label>
                           <input 
                              type="text"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                              defaultValue="V-2304W"
                           />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block flex items-center gap-1"><Flag size={10}/> Quốc tịch</label>
                          <div className="relative">
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-2 text-sm text-slate-700 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none appearance-none">
                              <option value="VN">🇻🇳 Vietnam</option>
                              <option value="SG">🇸🇬 Singapore</option>
                              <option value="PA">🇵🇦 Panama</option>
                              <option value="LR">🇱🇷 Liberia</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-2 top-3 text-slate-400 pointer-events-none"/>
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block flex items-center gap-1"><Navigation size={10}/> Hãng KT</label>
                          <div className="relative">
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-2 text-sm text-slate-700 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none appearance-none">
                              <option value="MAERSK">MAERSK</option>
                              <option value="MSC">MSC</option>
                              <option value="CMA">CMA CGM</option>
                              <option value="COSCO">COSCO</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-2 top-3 text-slate-400 pointer-events-none"/>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-slate-100">
                         <div className="flex items-center justify-between gap-3">
                           <label className="text-xs font-semibold text-slate-500">Call Sign</label>
                           <input type="text" className="w-32 text-right text-sm font-mono font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:border-brand-500 focus:outline-none uppercase" defaultValue="3EFG8" />
                         </div>
                         <div className="flex items-center justify-between gap-3">
                           <label className="text-xs font-semibold text-slate-500">IMO Number</label>
                           <input type="text" className="w-32 text-right text-sm font-mono font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:border-brand-500 focus:outline-none" defaultValue="9876543" />
                         </div>
                         <div className="flex items-center justify-between gap-3">
                           <label className="text-xs font-semibold text-slate-500">Inmarsat</label>
                           <input type="text" className="w-32 text-right text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded px-2 py-1 focus:border-brand-500 focus:outline-none" defaultValue="765432109" />
                         </div>
                         <div className="flex items-center justify-between gap-3">
                           <label className="text-xs font-semibold text-slate-500">Lloyd Code</label>
                           <input type="text" className="w-32 text-right text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded px-2 py-1 focus:border-brand-500 focus:outline-none" defaultValue="L-12345" />
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Service Settings Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                 <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                   <Clock size={18} className="text-orange-500" />
                   Thiết lập dịch vụ
                 </h3>
                 
                 <div className="mb-4">
                   <label className="text-xs font-semibold text-slate-500 uppercase mb-2 block">Làm tròn giờ dịch vụ</label>
                   <div className="flex bg-slate-100 p-1 rounded-lg">
                      {['0H', '0.5H', '1H'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setServiceRounding(opt as any)}
                          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                            serviceRounding === opt 
                              ? 'bg-white text-brand-600 shadow-sm ring-1 ring-black/5' 
                              : 'text-slate-500 hover:text-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                   </div>
                 </div>

                 <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase mb-2 block">Ghi chú đặc biệt</label>
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none min-h-[100px] resize-none"
                      placeholder="Nhập ghi chú vận hành, lưu ý xếp dỡ..."
                    ></textarea>
                 </div>
              </div>
            </div>

            {/* Right Column: Technical Specs Form */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Tabs Navigation */}
              <div className="flex items-center gap-1 border-b border-slate-200">
                <button 
                  onClick={() => setActiveTab('specs')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'specs' 
                      ? 'border-brand-600 text-brand-600' 
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Ruler size={18} />
                  Thông số Kỹ thuật
                </button>
                <button 
                  onClick={() => setActiveTab('capacity')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'capacity' 
                      ? 'border-brand-600 text-brand-600' 
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Scale size={18} />
                  Sức chứa & Tải trọng
                </button>
              </div>

              {/* Form Content Area */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                
                {activeTab === 'specs' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                     <div className="md:col-span-2 mb-2">
                        <h4 className="text-base font-bold text-slate-800">Kích thước vật lý</h4>
                        <p className="text-sm text-slate-400">Các thông số kích thước cơ bản của vỏ tàu.</p>
                     </div>

                     <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">LOA (Length Overall)</label>
                        <div className="relative">
                          <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-3 pr-12 text-slate-700 font-medium focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" placeholder="0.00" />
                          <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded">M</span>
                        </div>
                     </div>

                     <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">LBP (Length Between Perpendiculars)</label>
                         <div className="relative">
                          <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-3 pr-12 text-slate-700 font-medium focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" placeholder="0.00" />
                          <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded">M</span>
                        </div>
                     </div>

                     <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Max Beam (Chiều rộng)</label>
                         <div className="relative">
                          <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-3 pr-12 text-slate-700 font-medium focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" placeholder="0.00" />
                          <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded">M</span>
                        </div>
                     </div>

                     <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Depth (Độ sâu)</label>
                         <div className="relative">
                          <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-3 pr-12 text-slate-700 font-medium focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" placeholder="0.00" />
                          <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded">M</span>
                        </div>
                     </div>

                     <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Antenna Height</label>
                         <div className="relative">
                          <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-3 pr-12 text-slate-700 font-medium focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" placeholder="0.00" />
                          <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded">M</span>
                        </div>
                     </div>
                  </div>
                )}

                {activeTab === 'capacity' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                     <div className="md:col-span-2 mb-2">
                        <h4 className="text-base font-bold text-slate-800">Tải trọng & Sức chứa</h4>
                        <p className="text-sm text-slate-400">Thông tin giới hạn an toàn và năng lực vận tải.</p>
                     </div>

                     {/* Highlighted Stat */}
                     <div className="md:col-span-2 bg-blue-50/50 border border-blue-100 rounded-xl p-4 grid grid-cols-2 gap-4 mb-2">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-blue-600 uppercase">Max TEU</label>
                          <input type="number" className="w-full bg-white border border-blue-200 rounded-lg py-2 px-3 text-lg font-bold text-blue-800 outline-none" placeholder="0" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-blue-600 uppercase">Summer Draft</label>
                          <div className="relative">
                            <input type="number" className="w-full bg-white border border-blue-200 rounded-lg py-2 pl-3 pr-8 text-lg font-bold text-blue-800 outline-none" placeholder="0.0" />
                            <span className="absolute right-3 top-3 text-xs font-bold text-blue-400">M</span>
                          </div>
                        </div>
                     </div>

                     <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">DWT (Deadweight Tonnage)</label>
                         <div className="relative">
                          <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-3 pr-12 text-slate-700 font-medium focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" placeholder="0" />
                          <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded">T</span>
                        </div>
                     </div>

                     <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">GRT (Gross Register Tonnage)</label>
                         <div className="relative">
                          <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-3 pr-12 text-slate-700 font-medium focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" placeholder="0" />
                          <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded">T</span>
                        </div>
                     </div>

                     <div className="h-px bg-slate-100 md:col-span-2 my-2"></div>

                     <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Max Row of Deck</label>
                        <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-slate-700 font-medium focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" placeholder="0" />
                     </div>

                     <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Max Row of Hold</label>
                        <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-slate-700 font-medium focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" placeholder="0" />
                     </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Top Tier Height</label>
                        <div className="relative">
                          <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-3 pr-12 text-slate-700 font-medium focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" placeholder="0.00" />
                          <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded">M</span>
                        </div>
                     </div>

                     <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Max Row Define</label>
                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-slate-700 font-medium focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all" placeholder="Text..." />
                     </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};