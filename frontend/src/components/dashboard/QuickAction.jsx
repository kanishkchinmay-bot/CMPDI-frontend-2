const QuickAction = ({ icon: Icon, title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        group
        w-full
        flex items-center gap-4
        p-4
        rounded-2xl
        bg-[#eef1f4]
        text-left
        shadow-[5px_5px_10px_rgba(163,177,198,0.25),-5px_-5px_10px_rgba(255,255,255,0.85)]
        hover:shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]
        transition-all duration-200
      "
    >
      <div
        className="
          w-11 h-11
          shrink-0
          flex items-center justify-center
          rounded-xl
          bg-[#f4f6f8]
          text-slate-500
        "
      >
        <Icon size={20} />
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-700">
          {title}
        </p>

        <p className="text-xs text-slate-400 mt-0.5">
          {description}
        </p>
      </div>
    </button>
  );
};

export default QuickAction;