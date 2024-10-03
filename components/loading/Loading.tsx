import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md px-4 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-32 rounded-full border-4 border-primary opacity-20" />
          </div>
          <Loader2 className="mx-auto h-16 w-16 animate-spin text-primary" />
        </div>
        <h2 className="mb-2 text-2xl font-semibold">Loading Your Job Board</h2>
      </div>
    </div>
  );
};

export default Loading;
