import { useState } from 'react';

const useDragAndDrop = (fields, setFields) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOverIndex(index);
  };

  const handleDragLeave = () => {
    setDraggedOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedItem !== null && draggedItem !== dropIndex) {
      const newFields = [...fields];
      const draggedField = newFields[draggedItem];
      newFields.splice(draggedItem, 1);
      const adjustedDropIndex = draggedItem < dropIndex ? dropIndex - 1 : dropIndex;
      newFields.splice(adjustedDropIndex, 0, draggedField);
      setFields(newFields);
    }
    setDraggedItem(null);
    setDraggedOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOverIndex(null);
  };

  return {
    draggedItem,
    draggedOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd
  };
};

export default useDragAndDrop;
