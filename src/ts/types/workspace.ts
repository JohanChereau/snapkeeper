import { CreateWorkspaceFormData } from "@/components/workspace/CreateWorkspaceForm/utils/validationSchemas";

export type Workspace = CreateWorkspaceFormData & {
  backgroundColor?: string;
  bannerImage?: string;
  accentColor?: string;
  tags?: string[];
};
