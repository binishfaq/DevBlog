const StatCard = ({ title, value, icon: Icon, color, subtitle, trend }) => {
  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100/50 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-gray-500 font-medium truncate">{title}</p>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mt-0.5 sm:mt-1">{value || 0}</p>
          {subtitle && (
            <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 truncate">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-1 sm:mt-2 text-[10px] sm:text-xs font-medium ${
              trend === 'up' ? 'text-green-600' : 
              trend === 'down' ? 'text-red-600' : 'text-gray-400'
            }`}>
              <span>{trend === 'up' ? '↑' : trend === 'down' ? '↓' : '—'}</span>
              <span className="hidden xs:inline">{trend === 'up' ? 'Increased' : trend === 'down' ? 'Decreased' : 'No change'}</span>
            </div>
          )}
        </div>
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg flex-shrink-0"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon size={18} className="sm:w-[22px] sm:h-[22px]" style={{ color }} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;