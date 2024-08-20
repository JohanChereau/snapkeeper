import { Tree, Folder, File } from "@/components/ui/file-tree";
import { SupportedLanguages, FolderElement } from "@/ts/types/folder-structure";
import availableMonths from "@/../shared/utils/dates/months.json";
import { generateFolderStructure } from "@/utils/folder/generateFolderStructure";

type PreviewFolderStructureProps = {
  yearFormat: string;
  monthFormat: string;
  language: SupportedLanguages;
};

const PreviewFolderStructure = ({
  yearFormat,
  monthFormat,
  language,
}: PreviewFolderStructureProps) => {
  const currentYear = new Date().getFullYear();
  const monthData = availableMonths[language].months;

  const formattedYear = (year: number) =>
    yearFormat.replace("%YEAR%", year.toString());

  const formattedMonth = (
    monthIndex: string,
    monthName: string,
    monthShort: string
  ) =>
    monthFormat
      .replace("%MONTH_INDEX%", monthIndex)
      .replace("%MONTH_NAME%", monthName)
      .replace("%MONTH_SHORT%", monthShort);

  const folderStructure = generateFolderStructure(
    currentYear,
    5,
    ["pdf", "jpg", "mp4"],
    monthData,
    formattedYear,
    formattedMonth
  );

  // Get the first year and the first month of that year
  const firstYearKey = Object.keys(folderStructure)[0];
  const firstMonthKey = folderStructure[firstYearKey].children?.[0]?.id;

  const renderTree = (structure: FolderElement[]) => {
    return structure.map((element) => {
      if (element.type === "folder") {
        return (
          <Folder key={element.id} value={element.id} element={element.name}>
            {renderTree(element.children as FolderElement[])}
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
    <div className="relative flex flex-col items-start justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl p-4">
      <h4 className="text-xl font-semibold mb-4">Preview:</h4>
      <Tree
        className="overflow-hidden rounded-md bg-background w-full"
        // Expand files only for the first year and the first month of that year by default
        initialExpandedItems={[firstYearKey, firstMonthKey]}
      >
        {renderTree(Object.values(folderStructure))}
      </Tree>
    </div>
  );
};

export default PreviewFolderStructure;
