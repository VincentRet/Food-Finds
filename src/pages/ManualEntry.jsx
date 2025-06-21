import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManualEntry() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setIsLoading(true);
      // Small delay for better UX
      setTimeout(() => {
        navigate(`/result?barcode=${encodeURIComponent(input.trim())}`);
      }, 300);
    }
  };

  return (
    <div className="page-container">
      <div className="card text-center fade-in">
        <h2 className="mb-lg">✏️ Enter Barcode Manually</h2>
        <p className="mb-xl">
          Type or paste the barcode number from your product package.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter barcode (e.g., 1234567890123)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="form-input"
              disabled={isLoading}
              autoFocus
            />
          </div>
          
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              type="button"
              onClick={() => navigate('/')} 
              className="btn btn-secondary"
              disabled={isLoading}
            >
              ← Back
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? '🔍 Analyzing...' : '🔍 Analyze'}
            </button>
            <button 
              type="button"
              onClick={() => navigate('/scan')} 
              className="btn btn-accent"
              disabled={isLoading}
            >
              📱 Scan Instead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

