import React, { useState } from 'react';
import axios from 'axios';

const QuestionnairePage = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('questionnaire', file);

    try {
      const res = await axios.post('/api/questionnaires/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setText(res.data.text);
      setError('');
    } catch (err) {
      setError('Error uploading file');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Upload Questionnaire</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input type="file" onChange={onFileChange} />
        </div>
        <input type="submit" value="Upload" />
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {text && (
        <div>
          <h2>Extracted Text:</h2>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionnairePage;
