import { CheckCircle2, AlertCircle, X } from "lucide-react";

const Toast = ({
  message = "Action completed successfully",
  type = "success",
  onClose,
}) => {
  const isSuccess = type === "success";

  return (
    <div
      className="
        fixed
        right-5
        bottom-5
        z-50
        w-[calc(100%-40px)]
        max-w-sm
        p-4
        rounded-2xl
        bg-[#eef1f4]
        shadow-[8px_8px_16px_rgba(163,177,198,0.28),-8px_-8px_16px_rgba(255,255,255,0.9)]
        flex items-center gap-3
      "
    >

      {/* Icon */}
      <div
        className="
          w-10 h-10
          shrink-0
          rounded-xl
          bg-[#f4f6f8]
          flex items-center justify-center
          text-slate-500
          shadow-[inset_3px_3px_6px_rgba(163,177,198,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]
        "
      >
        {isSuccess ? (
          <CheckCircle2 size={18} />
        ) : (
          <AlertCircle size={18} />
        )}
      </div>


      {/* Message */}
      <div className="flex-1 min-w-0">

        <p className="text-sm font-semibold text-slate-600">
          {isSuccess ? "Success" : "Action Required"}
        </p>

        <p className="text-xs text-slate-400 mt-1 leading-4">
          {message}
        </p>

      </div>


      {/* Close */}
      <button
        onClick={onClose}
        className="
          w-8 h-8
          shrink-0
          rounded-xl
          flex items-center justify-center
          text-slate-400
          hover:text-slate-600
          hover:bg-white/60
          transition
        "
        aria-label="Close notification"
      >
        <X size={15} />
      </button>

    </div>
  );
};

export default Toast;