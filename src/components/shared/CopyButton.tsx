"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

interface CopyProps {
  code: string;
}

const CopyButton = ({ code }: CopyProps) => {
  const [copy, setCopy] = useState(false);

  const handleCopy = (e: any) => {
    e.preventDefault();
    navigator.clipboard.writeText(code);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 10000);
  };

  return (
    <div className="relative w-full flex justify-end items-center bg-orange-950/10 border border-orange-950/20">
      {copy ? (
        <span>copied!</span>
      ) : (
        <button onClick={handleCopy} className="p-1">
          <Copy size={17} />
        </button>
      )}
    </div>
  );
};
export default CopyButton;
