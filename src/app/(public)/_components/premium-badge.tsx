import { StarIcon } from "lucide-react";

export function PremiumCardBadge() {
  return (
    <div
      className="absolute top-2 right-2 bg-yellow-300 w-12 h-12 z-50
      rounded-full flex items-center justify-center"
    >
      <StarIcon className="text-white" />
    </div>
  );
}
