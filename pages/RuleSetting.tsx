import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Save, 
  Trash2, 
  Filter, 
  MoreHorizontal, 
  Download,
  Anchor,
  Settings2,
  AlertCircle,
  ArrowUpDown
} from 'lucide-react';

interface Rule {
  id: number;
  berthCode: string;
  ruleCode: string;
  description: string;
  status: 'Active' | 'Inactive';
  lastUpdated: string;
  selected: boolean;
}

export const RuleSetting: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // Enhanced mock data
  const [rules, setRules] = useState<Rule[]>([
    { id: 1, berthCode: 'CD1', ruleCode: 'ID1', description: 'Quy luật xếp hàng chuẩn', status: 'Active', lastUpdated: '10:00 AM', selected: false },
    { id: 2, berthCode: 'CD2', ruleCode: 'ID2', description: 'Ưu tiên hàng lạnh', status: 'Active', lastUpdated: 'Yesterday', selected: false },
    { id: 3, berthCode: 'CD3', ruleCode: 'ID3', description: 'Khu vực bảo trì - Hạn chế', status: 'Inactive', lastUpdated: '2 days ago', selected: true },
    { id: 4, berthCode: 'CD4', ruleCode: 'ID4', description: '', status: 'Active', lastUpdated: '1 week ago', selected: false },
    { id: 5, berthCode: 'CD5', ruleCode: 'ID5', description: 'Hàng siêu trường siêu trọng', status: 'Active', lastUpdated: '10:45 AM', selected: false },
    { id: 6, berthCode: 'CD02', ruleCode: 'ID02', description: '', status: 'Active', lastUpdated: 'Nov 20', selected: false },
    { id: 7, berthCode: 'CD8', ruleCode: 'ID8', description: '', status: 'Inactive', lastUpdated: 'Nov 18', selected: false },
    { id: 8, berthCode: 'CD9', ruleCode: 'ID9', description: '', status: 'Active', lastUpdated: 'Nov 15', selected: false },
    { id: 9, berthCode: 'CD09', ruleCode: 'ID93', description: 'Khu vực ưu tiên xuất', status: 'Active', lastUpdated: 'Just now', selected: false },
  ]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setRules(rules.map(r => ({ ...r, selected: checked })));
  };

  const handleSelectRow = (id: number) => {
    setRules(rules.map(r => r.id === id ? { ...r, selected: !r.selected } : r));
  };

  const filteredRules = rules.filter(r => 
    r.berthCode.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.ruleCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSelected = rules.filter(r => r.selected).length;

  return (
    <div className="flex-1 h-screen flex flex-col bg-[#F3F6F9] overflow-hidden font-sans">
      
      {/* 1. Light Theme Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between flex-shrink-0 z-20 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">
            <span className="hover:text-brand-600 cursor-pointer transition-colors">Hệ thống</span>
            <span className="text-slate-400">/</span>
            <span className="text-brand-600">Thiết lập quy luật</span>
          </nav>
          <div className="flex items-center gap-3">
             <div className="bg-brand-50 p-2 rounded-lg text-brand-600 animate-float">
               <Settings2 size={24} />
             </div>
             <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Quản Lý Quy Luật Bến</h1>
          </div>
        </div>
        
        <div className="relative z-10 flex items-center gap-4">
           {/* Quick Stats in Header */}
           <div className="hidden lg:flex items-center gap-6 mr-6 border-r border-slate-200 pr-6">
              <div className="text-right">
                <p className="text-xs text-slate-400 font-bold uppercase">Tổng bến</p>
                <p className="text-xl font-bold text-slate-800 leading-none">09</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 font-bold uppercase">Hoạt động</p>
                <p className="text-xl font-bold text-emerald-600 leading-none">07</p>
              </div>
           </div>
           
           <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-medium transition-colors border border-slate-200 shadow-sm">
              <AlertCircle size={16} />
              <span>Hướng dẫn</span>
           </button>
        </div>
      </header>

      {/* 2. Main Workspace */}
      <main className="flex-1 p-6 lg:p-8 overflow-hidden flex flex-col gap-6">
        
        {/* Action Toolbar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-4 flex-shrink-0">
          
          {/* Left: Search & Filter */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative group w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400 group-focus-within:text-brand-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm theo mã bến, mã quy luật..."
                className="pl-10 pr-4 py-2.5 w-full bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-brand-600 hover:border-brand-200 transition-all tooltip" title="Bộ lọc nâng cao">
              <Filter size={20} />
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
             {totalSelected > 0 && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg border border-red-100 animate-in fade-in slide-in-from-right-4">
                <span className="text-sm font-bold">{totalSelected} Selected</span>
                <div className="h-4 w-px bg-red-200 mx-1"></div>
                <button className="p-1 hover:bg-red-100 rounded transition-colors" title="Xóa dòng chọn">
                  <Trash2 size={16} />
                </button>
              </div>
            )}
            
            <div className="h-8 w-px bg-slate-200 mx-2 hidden lg:block"></div>

            <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-lg shadow-lg shadow-brand-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
              <Plus size={18} strokeWidth={2.5} />
              Thêm Mới
            </button>
             <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 text-sm font-semibold rounded-lg transition-all">
              <Save size={18} />
              Lưu Lại
            </button>
            <button className="p-2.5 text-slate-400 hover:text-brand-600 transition-colors">
              <Download size={20} />
            </button>
          </div>
        </div>

        {/* Data Grid */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1 custom-scrollbar">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50/80 backdrop-blur text-xs uppercase text-slate-500 font-semibold border-b border-slate-200 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 w-12 text-center">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                      checked={rules.length > 0 && rules.every(r => r.selected)}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center gap-2">
                      Mã Bến
                      <ArrowUpDown size={14} className="opacity-0 group-hover:opacity-50" />
                    </div>
                  </th>
                  <th className="px-6 py-4">Mã Quy Luật</th>
                  <th className="px-6 py-4">Diễn Giải</th>
                  <th className="px-6 py-4">Trạng Thái</th>
                  <th className="px-6 py-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRules.map((rule) => (
                  <tr 
                    key={rule.id} 
                    className={`group transition-all duration-200 hover:bg-slate-50 ${
                      rule.selected ? 'bg-blue-50/60' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-center">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                        checked={rule.selected}
                        onChange={() => handleSelectRow(rule.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${rule.selected ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-500'} group-hover:bg-white group-hover:shadow-sm transition-all`}>
                          <Anchor size={18} />
                        </div>
                        <span className="font-bold text-slate-700 text-base">{rule.berthCode}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 font-mono">
                        {rule.ruleCode}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {rule.description ? (
                         <span className="text-slate-600">{rule.description}</span>
                      ) : (
                         <span className="text-slate-400 italic font-light text-xs">-- Chưa cập nhật --</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${rule.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                          <span className={`text-xs font-medium ${rule.status === 'Active' ? 'text-emerald-700' : 'text-slate-500'}`}>
                            {rule.status === 'Active' ? 'Hoạt động' : 'Tạm dừng'}
                          </span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                         <MoreHorizontal size={20} />
                       </button>
                    </td>
                  </tr>
                ))}
                
                {/* Empty State if no results */}
                {filteredRules.length === 0 && (
                   <tr>
                     <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                        <div className="flex flex-col items-center justify-center gap-3">
                           <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                             <Search size={32} className="text-slate-300" />
                           </div>
                           <p>Không tìm thấy kết quả nào cho "{searchQuery}"</p>
                           <button 
                             onClick={() => setSearchQuery('')}
                             className="text-brand-600 font-medium hover:underline"
                           >
                             Xóa bộ lọc
                           </button>
                        </div>
                     </td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Enhanced Footer */}
          <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
             <div className="text-sm text-slate-500">
                Hiển thị <span className="font-bold text-slate-800">1-9</span> của <span className="font-bold text-slate-800">{rules.length}</span> bản ghi
             </div>
             <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  Trước
                </button>
                <div className="flex gap-1">
                  <button className="px-3 py-1.5 text-sm bg-brand-600 text-white rounded-lg font-medium shadow-sm">1</button>
                  <button className="px-3 py-1.5 text-sm border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">2</button>
                  <button className="px-3 py-1.5 text-sm border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">3</button>
                </div>
                <button className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
                  Sau
                </button>
             </div>
          </div>
        </div>

      </main>
    </div>
  );
};