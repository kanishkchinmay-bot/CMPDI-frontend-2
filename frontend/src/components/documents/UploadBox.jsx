
import { useRef, useState } from "react";
import { Upload, FileText, X, CheckCircle2 } from "lucide-react";
import { useToastContext } from "../common/ToastProvider";

const UploadBox = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const { showToast } = useToastContext();

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);

    showToast(
      `${selectedFile.name} uploaded successfully.`,
      "success"
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files?.[0];

    handleFile(droppedFile);
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0];

    handleFile(selectedFile);
  };

  const removeFile = () => {
    const fileName = file?.name;

    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    showToast(
      `${fileName || "Document"} removed successfully.`,
      "success"
    );
  };

  return (
    <div className="neu-card p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-700">
          Upload Document
        </h2>

        <p className="text-xs text-slate-400 mt-1">
          Upload a document for OCR, AI analysis and validation
        </p>
      </div>

      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="
            cursor-pointer
            rounded-3xl
            border-2
            border-dashed
            border-slate-300
            bg-[#eef1f4]
            p-10
            text-center
            transition-all
            hover:border-slate-400
            hover:bg-[#e9edf1]
          "
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
            onChange={handleChange}
            className="hidden"
          />

          <div
            className="
              mx-auto
              w-16
              h-16
              rounded-2xl
              bg-[#f4f6f8]
              flex
              items-center
              justify-center
              text-slate-500
              shadow-[5px_5px_10px_rgba(163,177,198,0.25),-5px_-5px_10px_rgba(255,255,255,0.85)]
            "
          >
            <Upload size={25} />
          </div>

          <h3 className="mt-5 text-sm font-semibold text-slate-700">
            Drop your document here
          </h3>

          <p className="text-xs text-slate-400 mt-2">
            or click to browse from your computer
          </p>

          <p className="text-[11px] text-slate-400 mt-4">
            Supported: PDF, DOC, DOCX, TXT, PNG, JPG
          </p>
        </div>
      ) : (
        <div
          className="
            rounded-3xl
            bg-[#eef1f4]
            p-5
            shadow-[inset_4px_4px_8px_rgba(163,177,198,0.18),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]
          "
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div
                className="
                  w-12
                  h-12
                  shrink-0
                  rounded-2xl
                  bg-[#f4f6f8]
                  flex
                  items-center
                  justify-center
                  text-slate-500
                "
              >
                <FileText size={21} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">
                  {file.name}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              onClick={removeFile}
              className="
                w-9
                h-9
                shrink-0
                rounded-xl
                flex
                items-center
                justify-center
                text-slate-400
                hover:text-slate-600
                hover:bg-white
                transition
              "
              aria-label="Remove document"
            >
              <X size={17} />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-200">
            <CheckCircle2 size={16} className="text-slate-500" />

            <span className="text-xs text-slate-500">
              Document ready for processing
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadBox;
