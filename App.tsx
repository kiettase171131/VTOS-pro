
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { RuleSetting } from './pages/RuleSetting';
import { VesselInfo } from './pages/VesselInfo';
import { MaxWeight } from './pages/MaxWeight';
import { ShipDesign } from './pages/ShipDesign';
import { PlanStatistics } from './pages/PlanStatistics';
import { CraneSplit } from './pages/CraneSplit';
import { PlanExportList } from './pages/PlanExportList';
import { PlanPrint } from './pages/PlanPrint';
import { LoadingPlan } from './pages/LoadingPlan';
import { PrePlanGroup } from './pages/PrePlanGroup';
import { PrePlanList } from './pages/PrePlanList';
import { ViewState } from './types';
import { Construction } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('DASHBOARD');

  // Helper to render content based on selection
  // In the future, this is where we will route to the specific module screens
  const renderContent = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'SYS_RULES':
        return <RuleSetting />;
      case 'FMT_VESSEL':
        return <VesselInfo />;
      case 'FMT_WEIGHT':
        return <MaxWeight />;
      case 'FMT_DESIGN':
        return <ShipDesign />;
      case 'PLN_STATS':
        return <PlanStatistics />;
      case 'PLN_CRANE':
        return <CraneSplit />;
      case 'PLN_EXPORT_LIST':
        return <PlanExportList />;
      case 'PLN_PRINT':
        return <PlanPrint />;
      case 'PLN_LOAD':
        return <LoadingPlan />;
      case 'PLN_DISCHARGE':
        // For now, Discharge plan can share logic or be similar to Load Plan
        return <LoadingPlan />;
      case 'PRE_GROUP':
        return <PrePlanGroup />;
      case 'PRE_LIST':
        return <PrePlanList />;
      default:
        // Placeholder for screens we haven't built yet
        return (
          <div className="flex-1 h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-500">
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center max-w-lg">
              <div className="w-20 h-20 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Construction size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Đang phát triển</h2>
              <p className="mb-6">
                Giao diện cho chức năng <span className="font-mono font-bold text-brand-700 bg-brand-50 px-2 py-1 rounded">{currentView}</span> sẽ được cập nhật trong bước tiếp theo theo yêu cầu của bạn.
              </p>
              <button 
                onClick={() => setCurrentView('DASHBOARD')}
                className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200"
              >
                Quay lại Trang chủ
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-1 flex flex-col h-full overflow-hidden transition-all duration-300">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
