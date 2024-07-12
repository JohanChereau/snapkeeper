import CreateWorkspaceForm from "@/components/workspace/CreateWorkspaceForm";

const CreateWorkspacePage = () => {
  return (
    <section className="grid gap-12 py-12">
      <h1 className="text-2xl sm:text-4xl font-bold text-center">
        Create a New Workspace
      </h1>
      <CreateWorkspaceForm />
    </section>
  );
};

export default CreateWorkspacePage;
