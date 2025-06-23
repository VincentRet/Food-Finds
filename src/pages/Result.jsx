
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

        fetch(`http://localhost:9999/analyze?barcode=${barcode}`)
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
                        {/* Risks Section */}
                        {Array.isArray(result.risks) && result.risks.length > 0 && (
                            <div
                                style={{
                                    background: 'var(--color-gray-50)',
                                    border: '1px solid var(--color-gray-200)',
                                    borderRadius: 'var(--radius-md)',
                                    padding: 'var(--spacing-lg)',
                                    marginBottom: 'var(--spacing-xl)',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit',
                                    color: 'var(--color-danger-700)',
                                }}
                            >
                                <h3 style={{ marginTop: 0, marginBottom: 'var(--spacing-md)', color: 'var(--color-danger-700)' }}>
                                    ⚠️ Risks Detected
                                </h3>
                                <ul style={{ paddingLeft: '1.2em', margin: 0 }}>
                                    {result.risks.map((risk, idx) => (
                                        <li
                                            key={idx}
                                            style={{
                                                marginBottom: '0.5em',
                                                background: 'var(--color-danger-50)',
                                                borderRadius: 'var(--radius-sm)',
                                                padding: '0.5em 0.8em',
                                                border: '1px solid var(--color-danger-100)',
                                                listStyle: 'disc',
                                            }}
                                        >
                                            {risk}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
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

