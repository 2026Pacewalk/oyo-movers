// components/QuoteBarSkeleton.tsx
"use client";
import React from "react";
import "./QuoteSkeleton.scss";

export default function QuoteBarSkeleton() {
    return (
        <div className="oqs-quote">
            <div className="oqs-quote__header">
                <div className="oqs-quote__title oqs-shimmer" />
                <div className="oqs-quote__subtitle oqs-shimmer" />
            </div>

            <div className="oqs-quote__row">
                <div className="oqs-quote__input oqs-shimmer" />
                <div className="oqs-quote__input oqs-shimmer" />
                <div className="oqs-quote__btn oqs-shimmer" />
            </div>
        </div>
    );
}
