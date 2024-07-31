"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "./input";
import Image from "next/image";
import { convertFileToUrl } from "@/lib/utils";
import { ImageDown } from "lucide-react";

interface FileUploaderProps {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
}

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <Input {...getInputProps()} />

      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="uploaded Image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <ImageDown className="text-rose-600" />

          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-rose-500 mr-1">Click to upload</span>
              or drag and drop
            </p>
            <p>SVG, PNG, JPG or Gif (max 800 * 400)</p>
          </div>
        </>
      )}
    </div>
  );
};
