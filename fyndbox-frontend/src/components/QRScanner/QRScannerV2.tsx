import { FC, useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader, VideoInputDevice } from '@zxing/browser';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface QRScannerProps {
  onScanSuccess: (data: string) => void;
  onCancel: () => void;
}

const QRScannerV2: FC<QRScannerProps> = ({ onScanSuccess, onCancel }) => {
  const [scanError, setScanError] = useState<string | null>(null);
  const [controls, setControls] = useState<any>(null);
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReader = useRef(new BrowserQRCodeReader());

  const stopCamera = () => {
    if (controls) {
      setTimeout(() => controls.stop(), 2000);
      console.log('Camera stopped');
    }
  };

  useEffect(() => {
    const startScanning = async () => {
      try {
        // List available video input devices (cameras)
        const videoInputDevices: VideoInputDevice[] =
          await BrowserQRCodeReader.listVideoInputDevices();

        if (videoInputDevices.length === 0) {
          setScanError(t('No camera found.'));
          return;
        }

        // Select the first available camera or change this logic as needed
        const selectedDeviceId = videoInputDevices[0].deviceId;
        console.log(`Started decode from camera with id ${selectedDeviceId}`);

        // Initialize scanning
        const controlsInstance = await codeReader.current.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current!,
          (result, error) => {
            if (result) {
              stopCamera(); // Stop scanning after success
              onScanSuccess(result.getText());
            } else if (error && error.name !== 'NotFoundException2') {
              console.error('QR Scan Error:', error);
              setScanError(t('qrCode.error'));
            }
          },
        );

        setControls(controlsInstance);

        // Automatically stop scanning after 20 seconds
        setTimeout(() => controlsInstance.stop(), 5000);
      } catch (error) {
        console.error('Error initializing QR scanner:', error);
        setScanError(t('qrCode.initializationError'));
      }
    };

    startScanning();

    return () => {
      stopCamera();
    };
  }, [onScanSuccess, t]);

  const handleCancel = () => {
    stopCamera();
    onCancel();
  };

  return (
    <div>
      <Typography variant="h6">{t('qrCode.title')}</Typography>
      <div>
        <video ref={videoRef} style={{ width: '100%' }} />
      </div>
      {scanError && <Typography color="error">{scanError}</Typography>}
      <Button onClick={handleCancel}>{t('modal.cancel')}</Button>
    </div>
  );
};

export default QRScannerV2;
