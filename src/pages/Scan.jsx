import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QrScanner from 'react-qr-barcode-scanner';

export default function Scan() {
  const [barcode, setBarcode] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [permissionChecked, setPermissionChecked] = useState(false);
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data && data !== barcode) {
      setBarcode(data);
      setIsScanning(false);
      navigate(`/result?barcode=${data}`);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach((track) => track.stop()); // stop stream immediately
        setIsScanning(true); // Start scanner
      } catch (error) {
        console.error('Camera access denied or failed:', error);
        alert('Camera access is required to scan barcodes. Please check browser settings.');
      } finally {
        setPermissionChecked(true);
      }
    };

    requestPermission();
  }, []);

  return (
    <div className="page-container">
      <div className="card text-center fade-in">
        <h2 className="mb-lg">📱 Scan Product Barcode</h2>
        <p className="mb-xl">
          Position the barcode within the camera frame. 
          The scan will happen automatically.
        </p>

        {!permissionChecked ? (
          <p>Requesting camera permission...</p>
        ) : isScanning ? (
          <div style={{ maxWidth: '400px', margin: '0 auto var(--spacing-xl)' }}>
            <QrScanner
              onUpdate={(err, result) => {
                if (result) handleScan(result?.text);
                if (err) handleError(err);
              }}
              style={{ width: '100%' }}
            />
          </div>
        ) : (
          <p style={{ color: 'red' }}>Camera access denied. Enable it in your browser settings.</p>
        )}

        <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center' }}>
          <button onClick={() => navigate('/')} className="btn btn-secondary">← Back</button>
          <button onClick={() => navigate('/manual')} className="btn btn-accent">Enter Manually</button>
        </div>
      </div>
    </div>
  );
}
