// import { FC, useEffect, useState } from 'react';
// import { Typography } from '@mui/material';
// import QrReader from 'react-qr-reader';
// import { useTranslation } from 'react-i18next';
// import {
//   ButtonContainer,
//   QrContainer,
//   QrReaderContainer,
// } from './QRScanner.styles';

// interface QRScannerProps {
//   onScanSuccess: (data: string) => void;
//   onCancel: () => void;
// }

// const QRScanner: FC<QRScannerProps> = ({ onScanSuccess, onCancel }) => {
//   const [scanError, setScanError] = useState<string | null>(null);
//   const [retryCount, setRetryCount] = useState(0);
//   const { t } = useTranslation();
//   const [scanTimeout, setScanTimeout] = useState<NodeJS.Timeout | null>(null);
//   const [scanning, setScanning] = useState(true);

//   const stopCamera = async () => {
//     const videoElement = document.querySelector('video');
//     if (videoElement) {
//       const mediaStream = videoElement.srcObject as MediaStream;
//       if (mediaStream) {
//         mediaStream.getTracks().forEach((track) => {
//           if (track.readyState === 'live' || track.readyState === 'ended') {
//             track.stop();
//             console.log(`Stopped track: ${track.label}`);
//           }
//         });
//         videoElement.srcObject = null; // Clear the video source
//         console.log('Camera resources released.');
//       }
//     }

//     await releaseCameraResources();
//   };

//   const releaseCameraResources = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//       });
//       mediaStream.getTracks().forEach((track) => track.stop());
//       console.log(
//         'Camera access requested and released again to ensure proper cleanup.',
//       );
//     } catch (error) {
//       console.error('Error releasing camera resources:', error);
//     }
//   };

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setScanning(false);
//       setScanError(t('qrCode.noQrCodeFound'));

//       const closeTimeout = setTimeout(() => {
//         handleCancelScan();
//       }, 5000);

//       setScanTimeout(closeTimeout);
//     }, 10000);

//     setScanTimeout(timeout);

//     // Cleanup timeout and stop the camera stream on unmount
//     return () => {
//       if (scanTimeout) {
//         clearTimeout(scanTimeout);
//       }
//       stopCamera();
//     };
//   }, []);

//   const handleError = (error: any) => {
//     console.error('QR Scan Error:', error);
//     setScanError(t('qrCode.error'));

//     if (retryCount < 3) {
//       setRetryCount(retryCount + 1);
//     } else {
//       setScanError(t('qrCode.attemptError'));
//     }
//   };

//   const handleScan = (data: string | null) => {
//     if (data && scanning) {
//       stopCamera(); // Stop the camera immediately after scanning
//       onScanSuccess(data);
//       setScanError(null);
//       setScanning(false);
//       // Clear the timeout if scanning was successful
//       if (scanTimeout) {
//         clearTimeout(scanTimeout);
//       }
//     }
//   };

//   const handleCancelScan = () => {
//     setScanning(false);
//     onCancel();
//   };

//   return (
//     <QrContainer>
//       <Typography variant="h6" mb={2}>
//         {t('qrCode.title')}
//       </Typography>
//       <QrReaderContainer>
//         <QrReader
//           onError={handleError}
//           onScan={handleScan}
//           delay={500}
//           facingMode="environment"
//           style={{ width: '100%' }}
//           legacyMode={false}
//         />
//       </QrReaderContainer>
//       {scanError && (
//         <Typography variant="body2" color="error" mt={2}>
//           {scanError}
//         </Typography>
//       )}
//       <ButtonContainer onClick={onCancel} variant="contained">
//         {t('modal.cancel')}
//       </ButtonContainer>
//     </QrContainer>
//   );
// };

// export default QRScanner;

// import { FC, useEffect, useState } from 'react';
// import { Typography } from '@mui/material';
// import QrReader from 'react-qr-reader';
// import { useTranslation } from 'react-i18next';
// import {
//   ButtonContainer,
//   QrContainer,
//   QrReaderContainer,
// } from './QRScanner.styles';

// interface QRScannerProps {
//   onScanSuccess: (data: string) => void;
//   onCancel: () => void;
// }

// const QRScanner: FC<QRScannerProps> = ({ onScanSuccess, onCancel }) => {
//   const [scanError, setScanError] = useState<string | null>(null);
//   const [retryCount, setRetryCount] = useState(0);
//   const { t } = useTranslation();
//   const [scanning, setScanning] = useState(true);

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setScanning(false);
//       setScanError(t('qrCode.noQrCodeFound'));

//       const closeTimeoutId = setTimeout(handleCancelScan, 5000);

//       return () => clearTimeout(closeTimeoutId);
//     }, 10000);

//     return () => {
//       clearTimeout(timeoutId);
//       stopCamera();
//     };
//   }, [t]);

//   const stopCamera = async () => {
//     const videoElement = document.querySelector('video');
//     if (videoElement) {
//       const mediaStream = videoElement.srcObject as MediaStream;
//       console.log(mediaStream);
//       mediaStream?.getTracks().forEach((track) => track.stop());
//       videoElement.srcObject = null;
//     }
//   };

//   const handleError = (error: any) => {
//     console.error('Error:', error);
//     setScanError(retryCount < 3 ? t('qrCode.error') : t('qrCode.attemptError'));
//     if (retryCount < 3) {
//       setRetryCount((prevCount) => prevCount + 1);
//     }
//   };

//   const handleScan = (data: string | null) => {
//     if (data && scanning) {
//       setScanError(null);
//       setScanning(false);
//       stopCamera().then(() => {
//         onScanSuccess(data);
//       });
//     }
//   };

//   const handleCancelScan = () => {
//     setScanning(false);
//     stopCamera().then(() => {
//       onCancel();
//     });
//   };

//   return (
//     <QrContainer>
//       <Typography variant="h6" mb={2}>
//         {t('qrCode.title')}
//       </Typography>
//       <QrReaderContainer>
//         <QrReader
//           onError={handleError}
//           onScan={handleScan}
//           delay={500}
//           facingMode="environment"
//           style={{ width: '100%' }}
//           legacyMode={false}
//         />
//       </QrReaderContainer>
//       {scanError && (
//         <Typography variant="body2" color="error" mt={2}>
//           {scanError}
//         </Typography>
//       )}
//       <ButtonContainer onClick={handleCancelScan} variant="contained">
//         {t('modal.cancel')}
//       </ButtonContainer>
//     </QrContainer>
//   );
// };

// export default QRScanner;

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
  const [stopAttempts, setStopAttempts] = useState(0);

  // Function to stop the camera stream
  const stopCamera = async () => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      const mediaStream = videoElement.srcObject as MediaStream;
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          if (track.readyState === 'live') {
            track.stop();
            console.log(`Stopped track: ${track.label}`);
          }
        });
        videoElement.srcObject = null; // Clear the video source
        console.log('Camera resources released.');
      }
    }

    await releaseCameraResources();
  };

  // Release camera resources to ensure proper cleanup
  const releaseCameraResources = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      mediaStream.getTracks().forEach((track) => track.stop());
      console.log('Camera access requested and released again for cleanup.');
    } catch (error) {
      console.error('Error releasing camera resources:', error);
    }
  };

  // Retry stopping the camera if needed
  const attemptStopCamera = async (retryCount = 3) => {
    for (let attempt = 0; attempt < retryCount; attempt++) {
      await stopCamera();
      const videoElement = document.querySelector('video');
      console.log(videoElement);
      if (!videoElement || !videoElement.srcObject) {
        console.log('Camera successfully stopped.');
        break; // Exit loop if camera is successfully stopped
      }
      console.log(`Retrying to stop camera (Attempt ${attempt + 1})...`);
      setStopAttempts(attempt + 1);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  };

  // Effect to handle scanning timeout and cleanup
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

  // Handle errors during scanning
  const handleError = (error: any) => {
    console.error('QR Scan Error:', error);
    setScanError(t('qrCode.error'));
  };

  // Handle successful QR code scan
  const handleScan = (data: string | null) => {
    if (data && scanning) {
      setScanning(false); // Stop further scans
      attemptStopCamera().then(() => {
        onScanSuccess(data);
      });
      setScanError(null);
      // Clear the timeout if scanning was successful
      if (scanTimeout) {
        clearTimeout(scanTimeout);
      }
    }
  };

  // Cancel the scanning process
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
