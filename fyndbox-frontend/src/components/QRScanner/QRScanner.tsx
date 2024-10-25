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
  const [retryCount, setRetryCount] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      const videoElement = document.querySelector('video');
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleError = (error: any) => {
    console.error('QR Scan Error:', error);
    setScanError(t('qrCode.error'));

    if (retryCount < 3) {
      setRetryCount(retryCount + 1);
    } else {
      setScanError(t('qrCode.attemptError'));
    }
  };

  const handleScan = (data: string | null) => {
    if (data) {
      onScanSuccess(data);
      setScanError(null);
    }
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
          legacyMode={false}
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
