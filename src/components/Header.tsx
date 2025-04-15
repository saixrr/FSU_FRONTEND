
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface HeaderProps {
  onSearch: (searchQuery: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <header className="bg-fsu-garnet py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-16 h-16 rounded-full bg-white p-2 flex items-center justify-center mr-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Florida_State_Seminoles_logo.svg/1200px-Florida_State_Seminoles_logo.svg.png" 
              alt="FSU Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <div>
            <h1 className="text-white text-2xl md:text-3xl font-bold">FSU Football</h1>
            <p className="text-fsu-gold text-sm md:text-base">Player Stats Dashboard</p>
          </div>
        </div>
        
        <div className="relative w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Search players..."
            className="pl-10 pr-4 py-2 w-full rounded-md border-fsu-gold focus:border-fsu-gold focus:ring-fsu-gold"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fsu-garnet h-4 w-4" />
        </div>
      </div>
    </header>
  );
};

export default Header;
