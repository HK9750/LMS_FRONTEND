import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <div className="hover:bg-accent hover:text-accent-foreground p-1 rounded-md mr-2">
              <MenuIcon className="h-4 w-4" />
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="text-foreground hover:text-muted-foreground"
              >
                Home
              </Link>
              <Link
                href="/courses"
                className="text-foreground hover:text-muted-foreground"
              >
                Courses
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-muted-foreground"
              >
                About
              </Link>
              <Link
                href="/policy"
                className="text-foreground hover:text-muted-foreground"
              >
                Policy
              </Link>
              <Link
                href="/faq"
                className="text-foreground hover:text-muted-foreground"
              >
                FAQ
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="text-xl font-semibold">LearnHub</h1>
      </div>
      <nav className="hidden items-center space-x-6 sm:flex">
        <Link
          href="/"
          className="text-lg text-foreground hover:text-muted-foreground"
        >
          Home
        </Link>
        <Link
          href="/courses"
          className="text-lg text-foreground hover:text-muted-foreground"
        >
          Courses
        </Link>
        <Link
          href="/about"
          className="text-lg text-foreground hover:text-muted-foreground"
        >
          About
        </Link>
        <Link
          href="/policy"
          className="text-lg text-foreground hover:text-muted-foreground"
        >
          Policy
        </Link>
        <Link
          href="/faq"
          className="text-lg text-foreground hover:text-muted-foreground"
        >
          FAQ
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        <SearchIcon className="w-6 h-6 text-muted-foreground hover:text-primary" />
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <ModeToggle />
      </div>
    </header>
  );
};

export function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-foreground"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default Header;

<svg
  xmlns="http://www.w3.org/2000/svg"
  x="0px"
  y="0px"
  width="100"
  height="100"
  viewBox="0 0 50 50"
>
  <path d="M 2 9 L 2 11 L 48 11 L 48 9 L 2 9 z M 2 24 L 2 26 L 48 26 L 48 24 L 2 24 z M 2 39 L 2 41 L 48 41 L 48 39 L 2 39 z"></path>
</svg>;
