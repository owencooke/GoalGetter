import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Footprints, Trophy, User, Menu } from "lucide-react";

function NavButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Button variant="ghost" asChild className="w-full justify-start">
      <Link href={href}>
        {icon}
        <span className="ml-2">{label}</span>
        <span className="sr-only">{label}</span>
      </Link>
    </Button>
  );
}

export default function Navigation() {
  return (
    <nav className="bg-background border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          KidsStepTracker
        </Link>
        <div className="hidden md:flex space-x-2">
          <NavButton
            href="/activity"
            icon={<Footprints className="h-4 w-4" />}
            label="Activity"
          />
          <NavButton
            href="/achievements"
            icon={<Trophy className="h-4 w-4" />}
            label="Achievements"
          />
          <NavButton
            href="/profile"
            icon={<User className="h-4 w-4" />}
            label="Profile"
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col space-y-2 mt-4">
              <NavButton
                href="/activity"
                icon={<Footprints className="h-4 w-4" />}
                label="Activity"
              />
              <NavButton
                href="/achievements"
                icon={<Trophy className="h-4 w-4" />}
                label="Achievements"
              />
              <NavButton
                href="/profile"
                icon={<User className="h-4 w-4" />}
                label="Profile"
              />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
