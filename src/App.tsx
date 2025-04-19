import React, { useState } from 'react';
import './App.css';

interface Country {
  name: { common: string };
  flags: { png: string; alt: string };
  capital?: string[];
  population: number;
  region: string;
  languages?: { [key: string]: string };
}

const App: React.FC = () => {
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCountry = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) throw new Error('Failed to fetch');
      const data: Country[] = await response.json();
      const random = data[Math.floor(Math.random() * data.length)];
      setCountry(random);
    } catch (err) {
      setError('Failed to load country data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>🌍 Random Country Info</h1>
      </header>

      <main>
        <button onClick={fetchCountry}>Get a Country</button>

        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        {country && (
          <div className="country-card">
            <h2>{country.name.common}</h2>
            <img src={country.flags.png} alt={country.flags.alt || 'Flag'} />
            <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p>
              <strong>Languages:</strong>{' '}
              {country.languages
                ? Object.values(country.languages).join(', ')
                : 'N/A'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
