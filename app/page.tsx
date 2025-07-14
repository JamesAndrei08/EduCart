import Features from "@/components/featureBox";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <>
    
      {/* TITLE */}
      <div className="h-[60vh] flex flex-col justify-center items-center bg-[#BA3A2C] text-white">
        <div className="flex flex-col gap-5 items-center text-center">
          <h1 className="text-5xl lg:text-6xl font-semibold">Your University's Marketplace</h1>
          <p className="lg:text-[18px] font-medium text-center">Buy, sell, rent, and exchange academic resources within your trusted <br className="hidden md:block" />university community.</p>
          <div className="flex items-center bg-white rounded-full p-1 pl-4 w-full max-w-xl">
            <input 
              className="bg-white text-black placeholder-gray-400 focus:outline-none flex-1 rounded-full px-4 py-3"
              placeholder="Search for textbooks, electronics, dorm essentials..."
            />
            <button className="bg-[#BA3A2C] p-2 rounded-full mr-1">
              <Search className="text-white w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* FEATURES */}

      <div className="flex flex-col justify-center items-center mt-20 gap-8 text-center">
        <h1 className="font-semibold text-3xl lg:text-4xl ">Why Choose EduCart?</h1>
        <p className="font-medium lg:text-xl text-lg">Our platform is specifically designed for university communities with features that address your unique needs.</p>
      </div>

      {/* DESKTOP MARQUEE */}
      
      <div className="mt-10">
        <Features />
      </div>
    </>
  );
}
