import React, { createContext, useContext, useState, ReactNode } from 'react';
import CustomModal, { ModalType } from '@/components/ui/custom-modal';

interface ModalOptions {
  title?: string;
  type?: ModalType;
  confirmText?: string;
  cancelText?: string;
}

interface ModalContextType {
  showAlert: (message: string, options?: ModalOptions) => void;
  showConfirm: (message: string, onConfirm: () => void, options?: ModalOptions) => void;
  showSuccess: (message: string, options?: ModalOptions) => void;
  showError: (message: string, options?: ModalOptions) => void;
  showWarning: (message: string, options?: ModalOptions) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<{
    isOpen: boolean;
    message: string;
    title?: string;
    type: ModalType;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
  }>({
    isOpen: false,
    message: '',
    type: 'info'
  });

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  const showAlert = (message: string, options: ModalOptions = {}) => {
    setModal({
      isOpen: true,
      message,
      title: options.title,
      type: options.type || 'info',
      confirmText: options.confirmText || 'OK',
      cancelText: options.cancelText
    });
  };

  const showConfirm = (message: string, onConfirm: () => void, options: ModalOptions = {}) => {
    setModal({
      isOpen: true,
      message,
      title: options.title,
      type: 'confirm',
      onConfirm: () => {
        onConfirm();
        closeModal();
      },
      confirmText: options.confirmText || 'Confirmar',
      cancelText: options.cancelText || 'Cancelar'
    });
  };

  const showSuccess = (message: string, options: ModalOptions = {}) => {
    showAlert(message, { ...options, type: 'success' });
  };

  const showError = (message: string, options: ModalOptions = {}) => {
    showAlert(message, { ...options, type: 'error' });
  };

  const showWarning = (message: string, options: ModalOptions = {}) => {
    showAlert(message, { ...options, type: 'warning' });
  };

  return (
    <ModalContext.Provider value={{
      showAlert,
      showConfirm,
      showSuccess,
      showError,
      showWarning
    }}>
      {children}
      <CustomModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        onConfirm={modal.onConfirm}
        message={modal.message}
        title={modal.title}
        type={modal.type}
        confirmText={modal.confirmText}
        cancelText={modal.cancelText}
      />
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
