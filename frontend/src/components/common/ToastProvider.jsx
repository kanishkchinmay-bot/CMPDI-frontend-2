
import { createContext, useContext } from "react";
import Toast from "./Toast";
import useToast from "../../hooks/useToast";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const { toast, showToast, hideToast } = useToast();

  return (
    <ToastContext.Provider
      value={{
        showToast,
        hideToast,
      }}
    >
      {children}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToastContext must be used inside ToastProvider"
    );
  }

  return context;
};
