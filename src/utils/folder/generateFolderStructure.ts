import {
  FolderStructureModel,
  FileElement,
  FolderElement,
} from "@/ts/types/folder-structure";

export const generateRandomFileName = (extension: string) => {
  const randomString = Math.random().toString(36).substring(7);
  return `${randomString}.${extension}`;
};

export const generateFolderStructure = (
  startYear: number,
  numYears: number,
  fileExtensions: string[],
  monthData: { index: string; name: string; short: string }[],
  formatYear: (year: number) => string,
  formatMonth: (
    monthIndex: string,
    monthName: string,
    monthShort: string
  ) => string
): FolderStructureModel => {
  const structure: FolderStructureModel = {};

  for (let i = 0; i < numYears; i++) {
    const year = startYear - i;
    const formattedYear = formatYear(year);

    const yearFolder: FolderElement = {
      id: formattedYear,
      name: formattedYear,
      type: "folder",
      children: [],
    };

    monthData.forEach((month) => {
      const formattedMonth = formatMonth(month.index, month.name, month.short);

      const monthFolder: FolderElement = {
        id: `${year}-${month.index}`,
        name: formattedMonth,
        type: "folder",
        children: [],
      };

      fileExtensions.forEach((ext, idx) => {
        const file: FileElement = {
          id: `${year}-${month.index}-${idx}`,
          name: generateRandomFileName(ext),
          type: "file",
        };
        monthFolder.children.push(file);
      });

      yearFolder.children.push(monthFolder);
    });

    structure[formattedYear] = yearFolder;
  }

  return structure;
};
