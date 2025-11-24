import React, { useState } from 'react';
import { Search, Ship, ArrowRight, ArrowLeft, Save, Filter, Layers, Weight, RefreshCw, Anchor, Settings2 } from 'lucide-react';

// Mock Data
const MOCK_VESSELS = [
  { id: 'V001', name: 'MAERSK HANOI', code: 'MSK-HN', voyage: '2304W', status: 'In Port' },
  { id: 'V002', name: 'MSC ANNA', code: 'MSC-AN', voyage: '552E', status: 'Scheduled' },
  { id: 'V003', name: 'CMA CGM BLUE', code: 'CMA-BL', voyage: '112N', status: 'In Port' },
  { id: 'V004', name: 'ONE INFINITY', code: 'ONE-INF', voyage: '008E', status: 'Completed' },
  { id: 'V005', name: 'EVER GIVEN', code: 'EVR-GV', voyage: '101S', status: 'Scheduled' },
];

const MOCK_BAYS = Array.from({ length: 20 }, (_, i) => ({
  id: (i * 2 + 1).toString().padStart(2, '0'),
  label: `Bay ${(i * 2 + 1).toString().padStart(2, '0')}`
}));

const MOCK_ROWS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  rowNo: (i + 1).toString().padStart(2, '0'),
  type: 'Container',
  weight: null as number | null
}));

export const MaxWeight: React.FC = () => {
  const [selectedVessel, setSelectedVessel] = useState<any>(null);
  const [selectedBay, setSelectedBay] = useState<string>(MOCK_BAYS[0].id);
  const [rows, setRows] = useState(MOCK_ROWS);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle weight change simulation
  const handleWeightChange = (id: number, val: string) => {
    // In a real app, this would update state based on ID
    // setRows(rows.map(r => r.id === id ? { ...r, weight: Number(val) } : r));
  };

  // ----------------------------------------------------------------------
  // VIEW 1: VESSEL SELECTION PORTAL
  // ----------------------------------------------------------------------
  if (!selectedVessel) {
    return (
      <div className="flex-1 h-screen bg-[#F3F6F9] flex flex-col font-sans overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-5 flex-shrink-0">
          <h1 className="text-2xl font-bold text-slate-800">Thiết Lập Trọng Lượng Tối Đa</h1>
          <p className="text-slate-500 text-sm mt-1">Chọn tàu để bắt đầu cấu hình giới hạn trọng lượng cho từng Bay/Row.</p>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-slate-400 group-focus-within:text-brand-500 transition-colors" size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Nhập tên tàu, mã tàu hoặc số hiệu chuyến..." 
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 shadow-sm text-lg focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Vessel Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_VESSELS.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase())).map(vessel => (
                <div 
                  key={vessel.id}
                  onClick={() => setSelectedVessel(vessel)}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-300 hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Ship size={100} />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors shadow-sm">
                        <Ship size={28} />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        vessel.status === 'In Port' ? 'bg-emerald-100 text-emerald-700' : 
                        vessel.status === 'Scheduled' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {vessel.status}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-brand-700 transition-colors">{vessel.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                      <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        <Anchor size={12} /> {vessel.code}
                      </span>
                      <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        <Settings2 size={12} /> {vessel.voyage}
                      </span>
                    </div>
                    
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 font-semibold rounded-xl group-hover:bg-brand-600 group-hover:text-white transition-all">
                      Cấu hình tàu này <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // VIEW 2: CONFIGURATION COCKPIT
  // ----------------------------------------------------------------------
  return (
    <div className="flex-1 h-screen flex flex-col bg-[#F3F6F9] overflow-hidden font-sans">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between flex-shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedVessel(null)}
            className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-xl text-slate-500 transition-colors border border-transparent hover:border-slate-200"
            title="Quay lại danh sách"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="h-8 w-px bg-slate-200 mx-1"></div>
          
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-800">{selectedVessel.name}</h1>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                {selectedVessel.voyage}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Đang chỉnh sửa trực tuyến
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-right mr-4 hidden md:block">
            <p className="text-xs text-slate-400 uppercase font-bold">Lần sửa cuối</p>
            <p className="text-xs font-medium text-slate-700">10:42 AM - Bởi Admin</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-all shadow-sm">
            <RefreshCw size={16} />
            <span className="hidden sm:inline">Làm mới</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-semibold shadow-lg shadow-brand-500/30 transition-all transform active:scale-95">
            <Save size={18} />
            Lưu thay đổi
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Bay Navigator */}
        <div className="w-72 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-10">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Bay Navigator</h3>
            <div className="relative group">
              <Search size={14} className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-brand-500" />
              <input 
                type="text" 
                placeholder="Tìm nhanh Bay..." 
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
            {MOCK_BAYS.map(bay => (
              <button
                key={bay.id}
                onClick={() => setSelectedBay(bay.id)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all border ${
                  selectedBay === bay.id 
                    ? 'bg-brand-50 text-brand-700 border-brand-200 shadow-sm' 
                    : 'bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-md ${selectedBay === bay.id ? 'bg-brand-200/50' : 'bg-slate-100'}`}>
                    <Layers size={16} className={selectedBay === bay.id ? 'text-brand-600' : 'text-slate-400'} />
                  </div>
                  <span>{bay.label}</span>
                </div>
                {selectedBay === bay.id && <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>}
              </button>
            ))}
          </div>
          
          <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-center text-slate-400">
             Total 20 Bays Available
          </div>
        </div>

        {/* Right Content: Weight Matrix */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#F8FAFC]">
          
          {/* Toolbar */}
          <div className="px-8 py-6 max-w-5xl mx-auto w-full h-full flex flex-col">
            
            <div className="flex items-end justify-between mb-4">
               <div>
                  <h2 className="text-xl font-bold text-slate-800">Cấu hình Bay {selectedBay}</h2>
                  <p className="text-sm text-slate-500 mt-1">Thiết lập giới hạn trọng lượng cho từng hàng (Row) trong Bay này.</p>
               </div>
               <button className="text-sm font-semibold text-brand-600 hover:bg-brand-50 px-4 py-2 rounded-lg transition-colors border border-dashed border-brand-200 hover:border-brand-300">
                  + Áp dụng nhanh cho toàn bộ Rows
               </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
               
               {/* Table Header */}
               <div className="grid grid-cols-12 gap-6 px-6 py-4 bg-slate-50/80 backdrop-blur border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                 <div className="col-span-2 text-center">Row No.</div>
                 <div className="col-span-3">Phân Loại</div>
                 <div className="col-span-7">Trọng lượng tối đa (Tons)</div>
               </div>

               {/* Table Body */}
               <div className="overflow-y-auto px-2 py-2 custom-scrollbar flex-1">
                 {rows.map((row) => (
                   <div key={row.id} className="grid grid-cols-12 gap-6 px-4 py-3 items-center hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100 group">
                     
                     <div className="col-span-2 flex justify-center">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 font-bold flex items-center justify-center group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors">
                          {row.rowNo}
                        </div>
                     </div>
                     
                     <div className="col-span-3">
                       <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold px-3 py-1.5 rounded-lg flex w-fit items-center gap-1.5">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                         CONTAINER
                       </span>
                     </div>
                     
                     <div className="col-span-7">
                        <div className="relative max-w-md group-focus-within:scale-[1.01] transition-transform origin-left">
                          <input 
                            type="number" 
                            className="w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-base font-bold text-slate-800 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all placeholder:font-normal placeholder:text-slate-300"
                            placeholder="Chưa thiết lập"
                            defaultValue={row.weight || ''}
                          />
                          <div className="absolute left-3.5 top-3.5 p-0.5 bg-slate-100 rounded text-slate-400">
                             <Weight size={14} />
                          </div>
                          <span className="absolute right-4 top-3.5 text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">TONS</span>
                        </div>
                     </div>
                   </div>
                 ))}
               </div>
               
               {/* Footer stats */}
               <div className="bg-slate-50 border-t border-slate-200 p-4 flex justify-between items-center text-xs text-slate-500">
                  <span>Showing 12 rows</span>
                  <span>Bay Status: <span className="text-emerald-600 font-bold">Ready</span></span>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};