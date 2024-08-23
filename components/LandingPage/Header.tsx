"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state: any) => state.user);
  const router = useRouter();
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <div className="p-1 rounded-md mr-2 flex sm:hidden hover:bg-accent hover:text-accent-foreground">
              <MenuIcon className="h-4 w-4" />
            </div>
          </SheetTrigger>

          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-semibold">
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
      <nav className="hidden items-center space-x-6 sm:flex font-semibold">
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={user?.avatar.url}
                alt="User Avatar"
                className="object-contain"
                loading="lazy"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {user ? (
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                Profile
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem onClick={() => router.push("/login")}>
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/signup")}>
                  Signup
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
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
