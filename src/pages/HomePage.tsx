import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Workspaces</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create a new workspace</h2>
        <Button>Create a workspace</Button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Import a workspace</h2>
        <Button>Import a workspace</Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Existing workspaces</h2>
        {/* Liste des workspaces */}
        <div className="border p-4 rounded">
          <p>No workspaces found.</p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
