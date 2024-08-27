import React, { useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import { Input } from "./input";
import { Button } from "./button";

interface FileInputProps {
  onChange: (value: string) => void;
  value: string;
  directory?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({
  onChange,
  value,
  directory = false,
}) => {
  const [isCtrlHovered, setIsCtrlHovered] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleFileSelect = async () => {
    try {
      const selected = await open({
        multiple: false,
        directory,
        defaultPath: inputValue,
      });
      if (typeof selected === "string") {
        setInputValue(selected);
        onChange(selected);
      }
    } catch (error) {
      console.error("Error selecting the file or folder:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.ctrlKey) {
      handleFileSelect();
    }
  };

  const handleMouseOver = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.ctrlKey) {
      setIsCtrlHovered(true);
    }
  };

  const handleMouseOut = () => {
    setIsCtrlHovered(false);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLInputElement>) => {
    setIsCtrlHovered(event.ctrlKey);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onMouseMove={handleMouseMove}
          className={`${
            isCtrlHovered ? "underline cursor-pointer" : ""
          } transition-all`}
          placeholder={directory ? "Select a folder" : "Select a file"}
        />
        <Button type="button" onClick={handleFileSelect}>
          Browse
        </Button>
      </div>
    </div>
  );
};

export default FileInput;
