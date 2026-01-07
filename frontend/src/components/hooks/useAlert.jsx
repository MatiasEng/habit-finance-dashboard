import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material'



export const useAlert = () => {
  const [alertState, setAlertState] = useState({
    open: false,
    message: '',
    type: 'info'
  });

  const showAlert = (message, type = 'info') => {
    setAlertState({ open: true, message, type });
  }

  const showSuccess = (message) => {
    showAlert(message, 'success')
  };

  const showError = (message) => {
    showAlert(message, 'error')
  };
  const showInfo = (message) => {
    showAlert(message, 'info')
  };
  const showWarning = (message) => {
    showAlert(message, 'warning')
  };

  const closeAlert = () => {
    setAlertState(prev => ({ ...prev, open: false }));
  };

  const AlertComponent = () => {
    return (
      <Snackbar
        open={alertState.open}
        autoHideDuration={2000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alertState.type} onClose={closeAlert}>
          {alertState.message}
        </Alert>
      </Snackbar>
    );
  }

  return {
    showSuccess, showError, showInfo, showWarning, AlertComponent, closeAlert
  };
}

