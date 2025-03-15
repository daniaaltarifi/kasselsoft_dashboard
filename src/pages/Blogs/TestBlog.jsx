import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS for styling
const TestBlog = ({ descriptions, setDescriptions, index }) => {
  return (
    <ReactQuill
      value={descriptions[index].text}
      onChange={(value) => {
        const newDescriptions = [...descriptions];
        newDescriptions[index].text = value; // Directly use the new value
        setDescriptions(newDescriptions);
      }}
    />
    
  );
};

export default TestBlog;
