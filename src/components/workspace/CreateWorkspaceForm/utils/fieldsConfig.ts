import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
  stepFourSchema,
} from "./validationSchemas";

export const fieldsConfig = {
  name: {
    label: "Workspace Name",
    placeholder: "Workspace Name",
    validation: stepOneSchema.shape.name,
  },
  description: {
    label: "Description",
    placeholder: "Description",
    validation: stepOneSchema.shape.description,
  },
  location: {
    label: "Location",
    placeholder: "Select Folder Location",
    validation: stepTwoSchema.shape.location,
  },
  yearFormat: {
    label: "Year Format",
    placeholder: "%YEAR%",
    validation: stepThreeSchema.shape.yearFormat,
  },
  monthFormat: {
    label: "Month Format",
    placeholder: "%MONTH_INDEX% - %MONTH_NAME%",
    validation: stepThreeSchema.shape.monthFormat,
  },
  language: {
    label: "Language",
    placeholder: "Select Language",
    validation: stepThreeSchema.shape.language,
  },
  excludeExtensions: {
    label: "Exclude File Types",
    placeholder: "e.g., .jpg, .png",
    validation: stepFourSchema.shape.excludeExtensions,
  },
};
