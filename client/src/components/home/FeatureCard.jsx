import React from "react";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-transform duration-300 group-hover:scale-110">
        <Icon size={30} />
      </div>

      <h3 className="mt-6 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-600">
        {description}
      </p>

    </div>
  );
};

export default FeatureCard;