import { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [formato, setFormato] = useState('best');
  const [status, setStatus] = useState('');

  const handleDownload = async () => {
    setStatus('Descargando...');
    const result = await window.api.descargarVideo(url, formato);
    if (result.ok) {
      setStatus(`Descarga completada: ${result.path}`);
    } else {
      setStatus(`Error: ${result.error}`);
    }
  };

  return (
    <div className="p-4">
      <input
        className="border p-2 w-full mb-4"
        type="text"
        placeholder="URL del video"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <select
        className="border p-2 w-full mb-4"
        value={formato}
        onChange={(e) => setFormato(e.target.value)}
      >
        <option value="best">Mejor calidad de video</option>
        <option value="worst">Menor calidad de video</option>
        <option value="mp3">Solo audio (MP3)</option>
      </select>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleDownload}
      >
        Descargar
      </button>
      <p className="mt-4">{status}</p>
    </div>
  );
}

export default App;
