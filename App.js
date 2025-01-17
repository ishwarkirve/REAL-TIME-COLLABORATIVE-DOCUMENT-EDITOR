import React from 'react';
import Editor from './components/Editor';

const App = () => {
  const documentId = 'example-document-id';
  return <Editor documentId={documentId} />;
};

export default App;
