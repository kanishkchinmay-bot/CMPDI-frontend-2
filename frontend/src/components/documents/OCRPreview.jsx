import {
  FileText,
  ScanText,
  CheckCircle2,
  Copy,
  Download,
  Sparkles,
} from "lucide-react";

const OCRPreview = () => {
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
            <ScanText size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-700">
              OCR Preview
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Extracted content from the selected document
            </p>
          </div>

        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">

          <button
            className="
              w-10 h-10
              rounded-xl
              flex items-center justify-center
              bg-[#eef1f4]
              text-slate-400
              shadow-[3px_3px_7px_rgba(163,177,198,0.2),-3px_-3px_7px_rgba(255,255,255,0.8)]
              hover:text-slate-600
              transition
            "
            title="Copy text"
          >
            <Copy size={17} />
          </button>

          <button
            className="
              w-10 h-10
              rounded-xl
              flex items-center justify-center
              bg-[#eef1f4]
              text-slate-400
              shadow-[3px_3px_7px_rgba(163,177,198,0.2),-3px_-3px_7px_rgba(255,255,255,0.8)]
              hover:text-slate-600
              transition
            "
            title="Download"
          >
            <Download size={17} />
          </button>

        </div>

      </div>


      {/* Document Information */}
      <div
        className="
          flex flex-col md:flex-row
          md:items-center
          justify-between
          gap-4
          p-4
          rounded-2xl
          bg-[#eef1f4]
          shadow-[inset_3px_3px_6px_rgba(163,177,198,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]
          mb-5
        "
      >

        <div className="flex items-center gap-3">

          <FileText
            size={18}
            className="text-slate-500"
          />

          <div>
            <p className="text-sm font-medium text-slate-700">
              Environmental Impact Assessment Report
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Page 1 of 84 • PDF Document
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2">

          <CheckCircle2
            size={16}
            className="text-slate-500"
          />

          <span className="text-xs font-medium text-slate-500">
            OCR Complete
          </span>

        </div>

      </div>


      {/* Confidence */}
      <div className="mb-5">

        <div className="flex items-center justify-between mb-2">

          <span className="text-xs font-medium text-slate-500">
            OCR Confidence
          </span>

          <span className="text-xs font-semibold text-slate-600">
            98.6%
          </span>

        </div>

        <div className="h-2 rounded-full bg-slate-200 overflow-hidden">

          <div
            className="h-full rounded-full bg-slate-500"
            style={{ width: "98.6%" }}
          />

        </div>

      </div>


      {/* Extracted Text */}
      <div
        className="
          rounded-2xl
          bg-[#eef1f4]
          p-5
          shadow-[inset_4px_4px_8px_rgba(163,177,198,0.18),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]
        "
      >

        <div className="flex items-center justify-between mb-4">

          <div className="flex items-center gap-2">

            <FileText
              size={16}
              className="text-slate-400"
            />

            <span className="text-xs font-semibold text-slate-500">
              Extracted Text
            </span>

          </div>

          <span className="text-[10px] text-slate-400">
            OCR Engine
          </span>

        </div>

        <div
          className="
            max-h-[300px]
            overflow-y-auto
            pr-2
            text-sm
            leading-7
            text-slate-600
          "
        >
          <p>
            Environmental Impact Assessment Report
          </p>

          <p className="mt-3">
            The present report provides an assessment of the
            environmental conditions associated with the proposed
            mining activity. The study evaluates geological,
            environmental and operational parameters of the
            selected mining block.
          </p>

          <p className="mt-3">
            The assessment includes analysis of groundwater
            conditions, surface water quality, air quality,
            vegetation, land utilization and other environmental
            indicators.
          </p>

          <p className="mt-3">
            Based on the collected observations, appropriate
            mitigation measures and monitoring recommendations
            have been identified for further evaluation.
          </p>

        </div>

      </div>


      {/* AI Extraction */}
      <div
        className="
          mt-5
          flex items-start gap-3
          p-4
          rounded-2xl
          bg-[#f4f6f8]
          border border-slate-200
        "
      >

        <Sparkles
          size={18}
          className="text-slate-500 mt-0.5 shrink-0"
        />

        <div>
          <p className="text-xs font-semibold text-slate-600">
            AI Extraction Available
          </p>

          <p className="text-xs text-slate-400 mt-1 leading-5">
            Key entities, topics and important observations have
            been identified from the extracted document content.
          </p>
        </div>

      </div>

    </div>
  );
};

export default OCRPreview;