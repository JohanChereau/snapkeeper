import { Toaster } from "@/services/providers/toaster-provider";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="min-h-svh grid grid-rows-[1fr]">
      <main className="container">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default Root;
