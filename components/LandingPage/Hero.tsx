import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SearchIcon } from "@/components/LandingPage/Header";
import Link from "next/link";
import Books from "@/public/books.png";
import Boy1 from "@/public/feedbackboy1.png";
import Boy2 from "@/public/feedbackboy2.png";

const Hero = () => {
  return (
    <main className="flex flex-col items-center justify-center p-10 md:flex-row">
      <div className="flex-1">
        <Image
          src={Books}
          alt="Illustration"
          className="w-full max-w-md mx-auto rounded-full"
          width={400}
          height={300}
          priority={true}
          style={{ aspectRatio: "400/400", objectFit: "contain" }}
        />
      </div>
      <div className="flex-1 mt-10 text-center md:mt-0 md:text-left">
        <h1 className="text-4xl font-bold leading-tight">
          Improve Your Online Learning Experience Better Instantly
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We have 20k+ Online courses & 500K+ Online registered students. Find
          your desired Courses from them.
        </p>
        <div className="mt-6">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search Courses..."
              className="w-full px-4 py-2 text-foreground bg-input rounded-md"
            />
            <Button className="absolute right-0 top-0 h-full px-4 bg-primary text-primary-foreground">
              <SearchIcon className="w-6 h-6 text-primary-foreground" />
            </Button>
          </div>
        </div>
        <div className="flex items-center mt-6 space-x-4">
          <Avatar>
            <AvatarImage src={Boy1.src} alt="User Avatar 1" />
          </Avatar>
          <Avatar>
            <AvatarImage src={Boy2.src} alt="User Avatar 2" />
          </Avatar>
          <Avatar>
            <AvatarImage src={Boy1.src} alt="User Avatar 3" />
          </Avatar>
          <p className="text-muted-foreground">
            500K+ People already trusted us.{" "}
            <Link href="#" className="text-primary text-nowrap">
              View Courses
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Hero;
