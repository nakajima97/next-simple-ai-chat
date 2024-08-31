import { Alert, Snackbar } from '@mui/material';
import React, { createContext, FC, useState } from 'react';

type Alert = {
  message: string;
  severity: 'success' | 'error';
}

type AlertContextType = {
  alert: Alert | null;
  showAlert: (Alert: Alert) => void;
  hideAlert: () => void;
};

type AlertProviderProps = {
  children: React.ReactNode;
};

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<Alert | null>(null);

  const showAlert = ({message, severity}: Alert) => {
    setAlert({ message, severity });
  }

  const hideAlert = () => {
    setAlert(null);
  }

  return (
    <AlertContext.Provider value={{ alert: alert, showAlert, hideAlert }}>
      {children}
      <Snackbar open={!!alert} onClose={hideAlert} autoHideDuration={5000} anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
        <Alert severity={alert?.severity}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};