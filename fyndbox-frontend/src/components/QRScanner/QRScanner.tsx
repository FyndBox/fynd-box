import { FC, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import QrReader from 'react-qr-reader';

interface QRScannerProps {
  onScanSuccess: (data: string) => void;
  onCancel: () => void;
}

const QRScanner: FC<QRScannerProps> = ({ onScanSuccess, onCancel }) => {
  const [scanError, setScanError] = useState<string | null>(null);

  const handleScan = (data: string | null) => {
    if (data) {
      onScanSuccess(data);
      setScanError(null);
    }
  };

  const handleError = (error: any) => {
    setScanError('Unable to scan QR code. Please try again.');
    console.error('QR Scan Error:', error);
  };

  return (
    <Box textAlign="center">
      <Typography variant="h6">Scan the QR Code</Typography>
      <QrReader
        onError={handleError}
        onScan={handleScan}
        delay={300}
        style={{ width: '100%' }}
      />
      {scanError && (
        <Typography variant="body2" color="error" mt={2}>
          {scanError}
        </Typography>
      )}
      <Button
        onClick={onCancel}
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default QRScanner;
