"use client";
import React from "react";

type Doc = { s3Url: string; type?: string };

export default function ExistingDocuments({
  title,
  docs,
  filterFn,
  className = "mb-2",
}: {
  title?: string;
  docs: Doc[] | undefined;
  filterFn?: (doc: Doc) => boolean;
  className?: string;
}) {
  if (!Array.isArray(docs) || docs.length === 0) return null;
  const items = filterFn ? docs.filter(filterFn) : docs;
  if (!items.length) return null;

  // Helper function to format document type names
  const formatDocumentType = (type: string) => {
    if (!type) return "Document";
    return type
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/\b(driver|license|front|back|vehicle|registration|liability|insurance|visa)\b/g, (match) => {
        const replacements: { [key: string]: string } = {
          'driver': 'Driver',
          'license': 'License',
          'front': 'Front',
          'back': 'Back',
          'vehicle': 'Vehicle',
          'registration': 'Registration',
          'liability': 'Liability',
          'insurance': 'Insurance',
          'visa': 'Visa'
        };
        return replacements[match.toLowerCase()] || match;
      });
  };

  return (
    <div className={className}>
      {title && <p className="text-muted mb-1">{title}</p>}
      <div className="d-flex gap-1 flex-wrap align-items-center">
        {items.map((doc, idx) => (
          <div
            key={idx}
            className="d-flex align-items-center gap-1 px-2 py-1 border border-success rounded"
            style={{
              borderColor: 'var(--checkboxColor)',
              backgroundColor: '#f8fff8',
              borderWidth: '1px',
              borderStyle: 'solid',
              fontSize: '0.8rem'
            }}
          >
            <span className="text-success fw-bold" style={{ fontSize: '0.75rem' }}>✓</span>
            <span className="text-muted" style={{ fontSize: '0.75rem' }}>
              {formatDocumentType(doc?.type || "document")}
            </span>
            <a
              href={doc?.s3Url}
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none"
              style={{
                fontSize: '0.7rem',
                color: 'var(--checkboxColor)',
                fontWeight: '500'
              }}
            >
              View
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}


