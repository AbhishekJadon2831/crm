import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
      <Loader2 className="h-14 w-14 text-blue-500 animate-spin" />
    </div>
  );
}
