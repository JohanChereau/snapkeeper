import availableMonths from "@/../shared/utils/dates/months.json";

export type SupportedLanguages = keyof typeof availableMonths;

export type FileElement = {
  id: string;
  name: string;
  isSelectable?: boolean;
  type: "file";
};

export type FolderElement = {
  id: string;
  name: string;
  type: "folder";
  children: Array<FileElement | FolderElement>;
};

export type FolderStructureModel = {
  [year: string]: FolderElement;
};
