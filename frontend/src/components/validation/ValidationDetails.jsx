import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const ValidationDetails = () => {
  return (
    <div className="neu-card p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div className="flex items-center gap-3">

          <div
            className="
              w-11 h-11
              rounded-2xl
              bg-[#eef1f4]
              flex items-center justify-center
              text-slate-500
              shadow-[3px_3px_7px_rgba(163,177,198,0.2),-3px_-3px_7px_rgba(255,255,255,0.8)]
            "
          >
            <ShieldCheck size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-700">
              Validation Details
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Detailed analysis of the selected validation issue
            </p>
          </div>

        </div>

        <span
          className="
            self-start
            inline-flex items-center gap-2
            px-3 py-1.5
            rounded-xl
            bg-[#e9edf1]
            text-[11px]
            font-semibold
            text-slate-700
          "
        >
          <AlertTriangle size={13} />
          Critical Issue
        </span>

      </div>


      {/* Document */}
      <div
        className="
          p-4
          rounded-2xl
          bg-[#eef1f4]
          shadow-[inset_3px_3px_6px_rgba(163,177,198,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              w-10 h-10
              rounded-xl
              bg-[#f4f6f8]
              flex items-center justify-center
              text-slate-500
            "
          >
            <FileText size={18} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-600">
              Mining Feasibility Study
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Technical Document • 118 Pages
            </p>
          </div>

        </div>

      </div>


      {/* Issue */}
      <div className="mt-5">

        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Detected Issue
        </p>

        <div className="mt-3 p-4 rounded-2xl bg-[#f4f6f8] border border-slate-200">

          <p className="text-sm font-medium text-slate-700">
            Missing groundwater analysis section
          </p>

          <p className="text-xs text-slate-400 mt-2 leading-5">
            The document contains references to groundwater conditions, but a
            dedicated groundwater analysis section could not be identified in
            the extracted document structure.
          </p>

        </div>

      </div>


      {/* Comparison */}
      <div className="mt-6">

        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Validation Comparison
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Detected */}
          <div
            className="
              p-4
              rounded-2xl
              bg-[#eef1f4]
              shadow-[inset_3px_3px_6px_rgba(163,177,198,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]
            "
          >

            <div className="flex items-center gap-2 mb-3">

              <AlertTriangle
                size={16}
                className="text-slate-500"
              />

              <span className="text-xs font-semibold text-slate-600">
                Detected
              </span>

            </div>

            <p className="text-sm text-slate-500">
              Groundwater information mentioned in multiple sections, but no
              dedicated analysis section was detected.
            </p>

          </div>


          {/* Expected */}
          <div
            className="
              p-4
              rounded-2xl
              bg-[#eef1f4]
              shadow-[inset_3px_3px_6px_rgba(163,177,198,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]
            "
          >

            <div className="flex items-center gap-2 mb-3">

              <CheckCircle2
                size={16}
                className="text-slate-500"
              />

              <span className="text-xs font-semibold text-slate-600">
                Expected
              </span>

            </div>

            <p className="text-sm text-slate-500">
              A dedicated groundwater analysis containing observations,
              measurements and assessment results.
            </p>

          </div>

        </div>

      </div>


      {/* AI Explanation */}
      <div
        className="
          mt-6
          p-5
          rounded-2xl
          bg-[#f4f6f8]
          border border-slate-200
        "
      >

        <div className="flex items-start gap-3">

          <div
            className="
              w-9 h-9
              shrink-0
              rounded-xl
              bg-[#eef1f4]
              flex items-center justify-center
              text-slate-500
            "
          >
            <Sparkles size={17} />
          </div>

          <div>

            <p className="text-xs font-semibold text-slate-600">
              AI Validation Explanation
            </p>

            <p className="text-xs text-slate-400 mt-2 leading-5">
              The AI validation engine compared the document structure and
              extracted entities against the expected technical document
              pattern. The missing section may affect completeness of the
              groundwater assessment.
            </p>

          </div>

        </div>

      </div>


      {/* Confidence */}
      <div className="mt-6">

        <div className="flex items-center justify-between mb-2">

          <span className="text-xs font-medium text-slate-500">
            Detection Confidence
          </span>

          <span className="text-xs font-semibold text-slate-600">
            96.2%
          </span>

        </div>

        <div className="h-2 rounded-full bg-slate-200 overflow-hidden">

          <div
            className="h-full rounded-full bg-slate-500"
            style={{ width: "96.2%" }}
          />

        </div>

      </div>


      {/* Action */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">

        <button
          className="
            flex-1
            flex items-center justify-center gap-2
            px-4 py-3
            rounded-2xl
            bg-[#eef1f4]
            text-sm
            font-medium
            text-slate-600
            shadow-[4px_4px_8px_rgba(163,177,198,0.2),-4px_-4px_8px_rgba(255,255,255,0.8)]
            hover:shadow-[inset_3px_3px_6px_rgba(163,177,198,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]
            transition
          "
        >
          <FileText size={17} />
          View Document
        </button>

        <button
          className="
            flex-1
            flex items-center justify-center gap-2
            px-4 py-3
            rounded-2xl
            bg-[#eef1f4]
            text-sm
            font-medium
            text-slate-600
            shadow-[4px_4px_8px_rgba(163,177,198,0.2),-4px_-4px_8px_rgba(255,255,255,0.8)]
            hover:shadow-[inset_3px_3px_6px_rgba(163,177,198,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]
            transition
          "
        >
          Mark as Reviewed
          <ArrowRight size={17} />
        </button>

      </div>

    </div>
  );
};

export default ValidationDetails;