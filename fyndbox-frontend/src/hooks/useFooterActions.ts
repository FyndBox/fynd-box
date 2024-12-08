import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useFooterActions = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarRightOpen, setSidebarRightOpen] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);

  const handleFavoriteClick = () => {
    //console.log('Favorite button clicked');
    setSidebarRightOpen(true);
    // Navigate to favorites page or implement favorite functionality
  };

  const handleCloseSidebarRight = () => {
    setSidebarRightOpen(false);
  };

  const handleScanClick = () => {
    setShowQRScanner(true);
  };

  const handleScanSuccess = (data: string) => {
    setTimeout(() => {
      setShowQRScanner(false);
      const url = new URL(data);
      const path = url.pathname;
      navigate(path, { replace: true });
    }, 500);
  };

  const handleCancelScan = () => {
    setShowQRScanner(false);
  };

  const handleSettingsClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return {
    handleFavoriteClick,
    handleScanClick,
    handleScanSuccess,
    handleCancelScan,
    handleSettingsClick,
    handleCloseSidebar,
    handleCloseSidebarRight,
    showQRScanner,
    isSidebarOpen,
    isSidebarRightOpen
  };
};
