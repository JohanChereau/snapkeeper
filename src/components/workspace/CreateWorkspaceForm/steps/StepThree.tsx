import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PreviewFolderStructure from "@/components/ui/preview-folder-structure";
import availableMonths from "@/../shared/utils/dates/months.json";
import { SupportedLanguages } from "@/ts/types/folder-structure";
import { CreateWorkspaceFormData } from "@/components/workspace/CreateWorkspaceForm/utils/validationSchemas";

const StepThree = () => {
  const { control, watch } = useFormContext<CreateWorkspaceFormData>();
  const yearFormat = watch("yearFormat");
  const monthFormat = watch("monthFormat");
  const language = watch("language") as SupportedLanguages;

  const availableLanguages = Object.keys(
    availableMonths
  ) as SupportedLanguages[];

  if (!availableLanguages.includes(language)) {
    console.error(`Invalid language selected: ${language}`);
  }

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="yearFormat"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Year Format</FormLabel>
            <FormControl>
              <Input {...field} placeholder="%YEAR%" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="monthFormat"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Month Format</FormLabel>
            <FormControl>
              <Input {...field} placeholder="%MONTH_INDEX% - %MONTH_NAME%" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="language"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Language</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {availableLanguages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <PreviewFolderStructure
        yearFormat={yearFormat}
        monthFormat={monthFormat}
        language={language}
      />
    </div>
  );
};

export default StepThree;
