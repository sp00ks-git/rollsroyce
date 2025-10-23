import React, { useState } from 'react';
import axios from 'axios';

const ReportsPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onGenerateReport = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/reports/generate', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.docx');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      setError('Error generating report');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Reports</h1>
      <button onClick={onGenerateReport} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Report'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ReportsPage;
