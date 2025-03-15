import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS for styling
const TextEditorMainDescription = ({ mainDescription, setMainDescription}) => {
  return (
    <ReactQuill
        value={mainDescription}
        onChange={setMainDescription} // Directly use the setter function
      />
    
  );
};

export default TextEditorMainDescription;
