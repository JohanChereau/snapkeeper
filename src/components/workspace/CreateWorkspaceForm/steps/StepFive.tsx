import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useFormContext } from "react-hook-form";
import { CreateWorkspaceFormData } from "@/components/workspace/CreateWorkspaceForm/utils/validationSchemas";
import {
  FolderIcon,
  PinIcon,
  GlobeIcon,
  DeleteIcon,
  TextCursorInputIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PreviewFolderStructure from "@/components/ui/preview-folder-structure";
import { SupportedLanguages } from "@/ts/types/folder-structure";

export function StepFive() {
  const { getValues } = useFormContext<CreateWorkspaceFormData>();
  const values = getValues();

  // Define the grid items
  const items = [
    {
      title: "Basic Details",
      description: (
        <div>
          <p className="mb-2 font-bold">{values.name}</p>
          <p>{values.description}</p>
        </div>
      ),
      header: <FolderIcon className="h-8 w-8 text-primary" />,
      className: "md:col-span-1",
    },
    {
      title: "Location",
      description: <p>{values.location}</p>,
      header: <PinIcon className="h-8 w-8 text-primary" />,
      className: "md:col-span-1",
    },
    {
      title: "Language",
      description: <p>{values?.language}</p>,
      header: <GlobeIcon className="h-8 w-8 text-primary" />,
      className: "md:col-span-1",
    },
    {
      title: "Formatting",
      description: (
        <PreviewFolderStructure
          language={values?.language as SupportedLanguages}
          monthFormat={values?.monthFormat}
          yearFormat={values?.yearFormat}
          maxYears={1}
          maxMonths={1}
          maxFiles={1}
          className="border-none"
        />
      ),
      header: <TextCursorInputIcon className="h-8 w-8 text-primary" />,
      className: "md:col-span-1",
    },
    {
      title: "Exclude File Types",
      description: (
        <div>
          <ul className="flex flex-wrap gap-2 my-2">
            {values.excludeExtensions?.map((extension, index) => (
              <li key={index}>
                <Badge>{extension}</Badge>
              </li>
            ))}
          </ul>
        </div>
      ),
      header: <DeleteIcon className="h-8 w-8 text-primary" />,
      className: "md:col-span-2",
    },
  ];

  return (
    <div className="space-y-6">
      <BentoGrid className="max-w-4xl mx-auto md:auto-rows">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

export default StepFive;
