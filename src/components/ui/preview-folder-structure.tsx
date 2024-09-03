import { Tree, Folder, File } from "@/components/ui/file-tree";
import {
  SupportedLanguages,
  FolderElement,
  FileElement,
} from "@/ts/types/folder-structure";
import availableMonths from "@/../shared/utils/dates/months.json";
import { generateFolderStructure } from "@/utils/folder/generateFolderStructure";

type PreviewFolderStructureProps = {
  title?: string;
  className?: string;
  yearFormat: string;
  monthFormat: string;
  language: SupportedLanguages;
  maxYears?: number;
  maxMonths?: number;
  maxFiles?: number;
  initialExpandedItems?: string[];
};

const PreviewFolderStructure = ({
  title,
  className,
  yearFormat,
  monthFormat,
  language,
  maxYears = 5,
  maxMonths = 12,
  maxFiles = Infinity,
  initialExpandedItems = [],
}: PreviewFolderStructureProps) => {
  const currentYear = new Date().getFullYear();
  const monthData = availableMonths[language].months;

  const formattedYear = (year: number) =>
    yearFormat?.replace("%YEAR%", year.toString());

  const formattedMonth = (
    monthIndex: string,
    monthName: string,
    monthShort: string
  ) =>
    monthFormat
      ?.replace("%MONTH_INDEX%", monthIndex)
      ?.replace("%MONTH_NAME%", monthName)
      ?.replace("%MONTH_SHORT%", monthShort);

  const folderStructure = generateFolderStructure(
    currentYear,
    maxYears,
    ["pdf", "jpg", "mp4"],
    monthData,
    formattedYear,
    formattedMonth
  );

  // Get the first year, month and file
  const firstYearKey = Object.keys(folderStructure)[0];
  const firstMonthElement = (folderStructure[firstYearKey] as FolderElement)
    ?.children?.[0] as FolderElement;
  const firstMonthKey = firstMonthElement?.id;
  const firstFileElement = firstMonthElement?.children?.[0] as FileElement;
  const firstFileKey = firstFileElement?.id;

  // Set default open items
  const defaultExpandedItems =
    initialExpandedItems.length > 0
      ? initialExpandedItems
      : [firstYearKey, firstMonthKey, firstFileKey].filter(Boolean);

  const renderTree = (structure: (FolderElement | FileElement)[]) => {
    return structure.map((element) => {
      if (element.type === "folder") {
        const children = (element.children || [])
          .slice(0, maxMonths)
          .map((child) => {
            if (child.type === "folder") {
              return {
                ...child,
                children: child.children?.slice(0, maxFiles),
              };
            }
            return child;
          });

        return (
          <Folder key={element.id} value={element.id} element={element.name}>
            {renderTree(children)}
          </Folder>
        );
      }
      return (
        <File key={element.id} value={element.id}>
          <p>{element.name}</p>
        </File>
      );
    });
  };

  return (
    <div
      className={`relative flex flex-col items-start justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl p-4 ${className}`}
    >
      {title && <h4 className="text-xl font-semibold mb-4">{title}:</h4>}
      <Tree
        className="overflow-hidden rounded-md bg-background w-full"
        initialExpandedItems={defaultExpandedItems}
      >
        {renderTree(Object.values(folderStructure))}
      </Tree>
    </div>
  );
};

export default PreviewFolderStructure;
