declare module "react-qr-scanner" {
    import React from "react";
  
    export interface QrScannerProps {
      delay?: number;
      style?: React.CSSProperties;
      onError?: (error: any) => void;
      onScan?: (data: { text: string } | null) => void;
      facingMode?: "user" | "environment";
      legacyMode?: boolean;
      resolution?: number;
      showViewFinder?: boolean;
    }
  
    const QrScanner: React.FC<QrScannerProps>;
    export default QrScanner;
  }
  