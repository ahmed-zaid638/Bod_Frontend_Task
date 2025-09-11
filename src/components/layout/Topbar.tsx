import { Menu } from "lucide-react";
import { Button } from "../ui/button";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center">
          <h2 className="text-lg font-semibold text-foreground">
            Welcome to your Dashboard
          </h2>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Button variant="outline" size="sm">
            Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
