import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Banner from "@/public/Banner.svg";
import Image from "next/image";
import { SearchIcon } from "@/components/LandingPage/Header";
import Link from "next/link";

const Hero = () => {
  return (
    <main className="flex flex-col items-center justify-center p-10 md:flex-row">
      <div className="flex-1">
        <Image
          src={Banner}
          alt="Illustration"
          className="w-full max-w-md mx-auto"
          width={400}
          height={300}
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
            <AvatarImage src="/placeholder-user.jpg" alt="User Avatar 1" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User Avatar 2" />
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User Avatar 3" />
            <AvatarFallback>U3</AvatarFallback>
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
