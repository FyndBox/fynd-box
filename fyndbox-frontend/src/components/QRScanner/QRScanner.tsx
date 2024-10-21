import { FC, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import QrReader from 'react-qr-reader';
import { useTranslation } from 'react-i18next';
import {
  ButtonContainer,
  QrContainer,
  QrReaderContainer,
} from './QRScanner.styles';

interface QRScannerProps {
  onScanSuccess: (data: string) => void;
  onCancel: () => void;
}

const QRScanner: FC<QRScannerProps> = ({ onScanSuccess, onCancel }) => {
  const [scanError, setScanError] = useState<string | null>(null);
  const { t } = useTranslation();

  // Cleanup function to stop the camera stream when the component unmounts
  useEffect(() => {
    return () => {
      const videoElement = document.querySelector('video');
      if (videoElement) {
        const stream = videoElement.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
      }
    };
  }, []);

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
    <QrContainer>
      <Typography variant="h6" mb={2}>
        {t('qrCode.title')}
      </Typography>
      <QrReaderContainer>
        <QrReader
          onError={handleError}
          onScan={handleScan}
          delay={500}
          facingMode="environment"
          style={{ width: '100%' }}
        />
      </QrReaderContainer>
      {scanError && (
        <Typography variant="body2" color="error" mt={2}>
          {scanError}
        </Typography>
      )}
      <ButtonContainer onClick={onCancel} variant="contained">
        {t('modal.cancel')}
      </ButtonContainer>
    </QrContainer>
  );
};

export default QRScanner;
