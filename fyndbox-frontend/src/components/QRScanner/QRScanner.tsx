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
  const [scanning, setScanning] = useState(true);
  const [scanTimeout, setScanTimeout] = useState<NodeJS.Timeout | null>(null);
  const [, setStopAttempts] = useState(0);

  // Function to stop the camera stream
  const stopCamera = async () => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      const mediaStream = videoElement.srcObject as MediaStream;
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          if (track.readyState === 'live') {
            track.stop();
          }
        });
        videoElement.srcObject = null;
      }
    }

    await releaseCameraResources();
  };

  const releaseCameraResources = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      mediaStream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error('Error releasing camera resources:', error);
    }
  };

  const attemptStopCamera = async (retryCount = 3) => {
    for (let attempt = 0; attempt < retryCount; attempt++) {
      await stopCamera();
      const videoElement = document.querySelector('video');
      if (!videoElement || !videoElement.srcObject) {
        break;
      }
      setStopAttempts(attempt + 1);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setScanning(false);
      setScanError(t('qrCode.noQrCodeFound'));

      const closeTimeout = setTimeout(() => {
        handleCancelScan();
      }, 5000);

      setScanTimeout(closeTimeout);
    }, 10000);

    setScanTimeout(timeout);

    // Cleanup function on unmount or if timeout is cleared
    return () => {
      if (scanTimeout) {
        clearTimeout(scanTimeout);
      }
      attemptStopCamera();
    };
  }, []);

  const handleError = (error: any) => {
    console.error('QR Scan Error:', error);
    setScanError(t('qrCode.error'));
  };

  const handleScan = (data: string | null) => {
    if (data && scanning) {
      setScanning(false);
      attemptStopCamera().then(() => {
        onScanSuccess(data);
      });
      setScanError(null);
      if (scanTimeout) {
        clearTimeout(scanTimeout);
      }
    }
  };

  const handleCancelScan = () => {
    setScanning(false);
    attemptStopCamera().then(() => {
      onCancel();
    });
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
      <ButtonContainer onClick={handleCancelScan} variant="contained">
        {t('modal.cancel')}
      </ButtonContainer>
    </QrContainer>
  );
};

export default QRScanner;
