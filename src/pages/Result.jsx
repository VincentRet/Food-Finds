
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function Result() {
  const [searchParams] = useSearchParams();
  const barcode = searchParams.get('barcode');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!barcode) {
      setError('No barcode provided');
      setIsLoading(false);
      return;
    }

    fetch(`http://localhost:8000/analyze?barcode=${barcode}`)
      .then((res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then((data) => {
        setResult(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [barcode]);

  return (
    <div className="page-container">
      <div className="card fade-in" style={{ maxWidth: '800px', width: '100%' }}>
        <div className="text-center mb-xl">
          <h2 className="mb-md">🔍 Ingredient Analysis</h2>
          {barcode && (
            <p style={{ color: 'var(--color-gray-500)', fontSize: '0.9rem' }}>
              Barcode: {barcode}
            </p>
          )}
        </div>

        {isLoading && (
          <div className="loading text-center mb-xl">
            <div className="spin" style={{ fontSize: '1.5rem' }}>⏳</div>
            <span>Analyzing ingredients...</span>
          </div>
        )}

        {error && (
          <div className="error-message mb-xl text-center">
            <strong>⚠️ Error:</strong> {error}
          </div>
        )}

        {result && (
          <div style={{ textAlign: 'left' }}>
            <div style={{ 
              background: 'var(--color-gray-50)', 
              border: '1px solid var(--color-gray-200)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-lg)',
              marginBottom: 'var(--spacing-xl)',
              fontSize: '0.9rem',
              fontFamily: 'Monaco, Consolas, monospace',
              overflow: 'auto',
              maxHeight: '400px'
            }}>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}

        <div className="text-center">
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/')} 
              className="btn btn-secondary"
            >
              🏠 Home
            </button>
            <button 
              onClick={() => navigate('/scan')} 
              className="btn btn-primary"
            >
              📱 Scan Another
            </button>
            <button 
              onClick={() => navigate('/manual')} 
              className="btn btn-accent"
            >
              ✏️ Enter Another
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

