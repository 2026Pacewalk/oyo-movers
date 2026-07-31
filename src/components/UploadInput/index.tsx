"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "../Image";
import "./uploadInput.scss";

interface UploadInputProps {
  label?: string;
  accept?: string;
  onChange?: (file: File | null) => void;
  onRemove?: () => void;
  selectedFile?: File | null;
  error?: string;
  className?: string;
  placeholder?: string;
  maxSize?: number; // in MB
}

const UploadInput: React.FC<UploadInputProps> = ({
  label,
  accept = "image/*,.pdf",
  onChange,
  onRemove,
  selectedFile,
  error,
  className = "",
  placeholder = "Choose file or drag and drop",
  maxSize = 2
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const lastProcessedFile = useRef<string>("");
  const processingTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (processingTimeout.current) {
        clearTimeout(processingTimeout.current);
      }
    };
  }, []);

  const handleFileSelect = (file: File) => {
    // Create a unique identifier for this file selection
    const fileIdentifier = `${file.name}-${file.size}-${file.lastModified}`;

    // Check if we just processed this exact file
    if (lastProcessedFile.current === fileIdentifier) {
      return; // Skip duplicate processing
    }

    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size exceeds ${maxSize}MB limit`);
      return;
    }

    // Mark this file as processed
    lastProcessedFile.current = fileIdentifier;
    onChange?.(file);

    // Clear the identifier after a delay
    if (processingTimeout.current) {
      clearTimeout(processingTimeout.current);
    }
    processingTimeout.current = setTimeout(() => {
      lastProcessedFile.current = "";
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      handleFileSelect(file);
    }

    // Reset input value immediately to allow re-selection
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    lastProcessedFile.current = "";
    if (processingTimeout.current) {
      clearTimeout(processingTimeout.current);
    }
    onRemove?.();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleUploadAreaClick = (e: React.MouseEvent) => {
    // Only allow clicking to open file dialog if no file is selected
    // and the click is not on the remove button
    const target = e.target as HTMLElement;
    if (!selectedFile && !target.closest('.remove-btn')) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`upload-input-container ${className}`}>
      {label && <label className="upload-label">{label}</label>}

      <div
        className={`upload-area ${isDragOver ? "drag-over" : ""} ${selectedFile ? "has-file" : ""} ${error ? "has-error" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadAreaClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="file-input"
          style={{ display: 'none' }}
        />

        {selectedFile ? (
          <div className="file-selected">
            <div className="file-info">
              <span className="file-icon">📄</span>
              <div className="file-details">
                <span className="file-name">{selectedFile.name}</span>
                <span className="file-size">{formatFileSize(selectedFile.size)}</span>
              </div>
            </div>
            <button
              type="button"
              className="remove-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemove();
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Image src="/delete.svg" alt="delete" className="remove-icon" />
            </button>
          </div>
        ) : (
          <div className="upload-placeholder">
            <div className="upload-icon"><Image src={"upload.svg"} alt="upload" /></div>
            <div className="upload-text">
              <span className="upload-main-text">{placeholder}</span>
              <span className="upload-sub-text">Max {maxSize}MB • PDF, JPG, PNG</span>
            </div>
          </div>
        )}
      </div>

      {error && <div className="upload-error">{error}</div>}
    </div>
  );
};

export default UploadInput;