import React,{ useState , useEffect } from "react";
import { PlayerGame } from "@/types/playerGame";
import Header from "./Header";
import PlayerCard from "./PlayerCard";
import StatsTable from "./StatsTable";
import PlayerModal from "./PlayerModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, ChevronDown } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// all allowed positions
const positions = ['QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'CB', 'S', 'K', 'P'];

interface DashboardProps {
  players: PlayerGame[];
}

const Dashboard: React.FC<DashboardProps> = ({ players }) => {
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerGame[]>(players);
  const [positionFilter, setPositionFilter] = useState<string>("ALL");
  const [viewType, setViewType] = useState<"cards" | "table">("cards");
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerGame | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    name: "",
    position: "ALL",
    year: "ALL",
    statCategory: "ALL",
    opponent: "ALL",
    gameType: "ALL"
  });
  
  const years = ["FR", "SO", "JR", "SR", "GR"];
  const statCategories = [
    "ALL",
    "Passing",
    "Rushing",
    "Receiving",
    "Defense",
    "Kicking"
  ];


  
  const [uniqueOptions, setUniqueOptions] = useState({
    seasons: [] as string[],
    opponents: [] as string[],
    gameTypes: [] as string[]
  });
  
  
  useEffect(() => {
    setFilteredPlayers(players);
  
    // Get unique options
    const seasons = Array.from(new Set(players.map(p => p.season)));
    const opponents = Array.from(new Set(players.map(p => p.opponent)));
    const gameTypes = Array.from(new Set(players.map(p => p.gameType)));
  
    setUniqueOptions({ seasons, opponents, gameTypes });
  }, [players]);
  
  

  // Handle search functionality
  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setFilteredPlayers(players);
      applyFilters();
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = players.filter(player => 
      player.playerName.toLowerCase().includes(query) || 
      player.position.toLowerCase().includes(query) || 
      player.location.toLowerCase().includes(query)
    );
    setFilteredPlayers(filtered);
  };

  const applyFilters = () => {
    let filtered = [...players];
  
    // Filter by name
    if (filters.name) {
      filtered = filtered.filter(player =>
        player.playerName.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
  
    // Filter by position
    if (filters.position !== "ALL") {
      filtered = filtered.filter(player => player.position === filters.position);
    }
  
    // Filter by year
    if (filters.year !== "ALL") {
      filtered = filtered.filter(player => player.season === filters.year);
    }
  
    // Filter by opponent
    if (filters.opponent !== "ALL") {
      filtered = filtered.filter(player => player.opponent === filters.opponent);
    }
  
    // Filter by game type
    if (filters.gameType !== "ALL") {
      filtered = filtered.filter(player => player.gameType === filters.gameType);
    }
  
    // Filter by stat category
    if (filters.statCategory !== "ALL") {
      filtered = filtered.filter(player => {
        switch (filters.statCategory) {
          case "Passing":
            return player.passingYards !== undefined && player.passingYards > 0;
          case "Rushing":
            return player.rushingYards !== undefined && player.rushingYards > 0;
          case "Receiving":
            return player.receivingYards !== undefined && player.receivingYards > 0;
          case "Defense":
            return (player.tackles && player.tackles > 0) ||
                   (player.sacks && player.sacks > 0) ||
                   (player.interceptions && player.interceptions > 0);
          case "Kicking":
            return (player.fieldGoalsMade && player.fieldGoalsMade > 0) ||
                   (player.extraPointsMade && player.extraPointsMade > 0);
          default:
            return true;
        }
      });
    }
  
    setFilteredPlayers(filtered);
    setPositionFilter(filters.position);
  };
  
  

  // Handle position filter change
  const handlePositionFilter = (position: string) => {
    setFilters({ ...filters, position });
    setPositionFilter(position);
    
    if (position === "ALL") {
      const newFilters = { ...filters, position: "ALL" };
      setFilters(newFilters);
      
      // Apply other filters if they exist
      let filtered = [...players];
      if (newFilters.name) {
        filtered = filtered.filter(player => 
          player.playerName.toLowerCase().includes(newFilters.name.toLowerCase())
        );
      }
      if (newFilters.year !== "ALL") {
        filtered = filtered.filter(player => player.season === newFilters.year);
      }
      if (newFilters.statCategory !== "ALL") {
        // Apply stat category filtering from applyFilters
        // This is a simplified version
        filtered = filtered.filter(player => {
          if (newFilters.statCategory === "Passing") return player.passingYards !== undefined;
          if (newFilters.statCategory === "Rushing") return player.rushingYards !== undefined;
          if (newFilters.statCategory === "Receiving") return player.receivingYards !== undefined;
          return true;
        });
      }
      setFilteredPlayers(filtered);
    } else {
      const newFilters = { ...filters, position };
      setFilters(newFilters);
      applyFilters();
    }
  };


  // Handle player selection for modal
  const handlePlayerSelect = (player: PlayerGame) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const resetFilters = () => {
    setFilters({
      name: "",
      position: "ALL",
      year: "ALL",
      statCategory: "ALL",
      opponent: "ALL",
      gameType: "ALL"
    });
    setPositionFilter("ALL");
    setFilteredPlayers(players);
  };
  

  // Apply initial filters on component mount
  useEffect(() => {
    setFilteredPlayers(players);
  }, [players]);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onSearch={handleSearch} />

      <main className="container mx-auto py-6 px-4 flex-1">
        {/* Filters and View Toggle */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between mb-6">
            <div className="mb-4 lg:mb-0">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-bold mr-4">Position Filter</h2>
                <Button 
                  variant="outline" 
                  className="flex items-center ml-auto" 
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showFilters ? "Hide Filters" : "Show More Filters"}
                  <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    positionFilter === "ALL"
                    ? "bg-fsu-garnet text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                onClick={() => handlePositionFilter("ALL")}
              >
                ALL
              </button>

              
                
                {positions.map(position => (
                  <button
                    key={position}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      positionFilter === position
                        ? "bg-fsu-garnet text-white" 
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={() => handlePositionFilter(position)}
                  >
                    {position}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="lg:text-right">
              <h2 className="text-xl font-bold mb-2">View Mode</h2>
              <Tabs defaultValue="cards" onValueChange={(value) => setViewType(value as "cards" | "table")}>
                <TabsList className="bg-gray-100">
                  <TabsTrigger value="cards" className="data-[state=active]:bg-fsu-garnet data-[state=active]:text-white">Cards</TabsTrigger>
                  <TabsTrigger value="table" className="data-[state=active]:bg-fsu-garnet data-[state=active]:text-white">Table</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4 animate-in fade-in-50 duration-200">
              <h3 className="font-semibold mb-3 text-fsu-garnet">Advanced Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Player Name</label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search name..."
                      className="pl-9"
                      value={filters.name}
                      onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>

                {/* Opponent Filter */}
<div>
  <label className="block text-sm font-medium mb-1">Opponent</label>
  <Select
    value={filters.opponent}
    onValueChange={(value) => setFilters({ ...filters, opponent: value })}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select Opponent" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="ALL">All Opponents</SelectItem>
      {Array.from(new Set(players.map(p => p.opponent))).map(op => (
        <SelectItem key={op} value={op}>{op}</SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

{/* Game Type Filter */}
<div>
  <label className="block text-sm font-medium mb-1">Game Type</label>
  <Select
    value={filters.gameType}
    onValueChange={(value) => setFilters({ ...filters, gameType: value })}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select Game Type" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="ALL">All Types</SelectItem>
      {Array.from(new Set(players.map(p => p.gameType))).map(gt => (
        <SelectItem key={gt} value={gt}>{gt}</SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

                <div>
                  <label className="block text-sm font-medium mb-1">Year</label>
                  <Select 
                    value={filters.year} 
                    onValueChange={(value) => setFilters({ ...filters, year: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Years</SelectItem>
                      {Array.from(new Set(players.map(p => p.season))).map(year => (
        <SelectItem key={year} value={year}>{year}</SelectItem>
      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Stat Category</label>
                  <Select 
                    value={filters.statCategory} 
                    onValueChange={(value) => setFilters({ ...filters, statCategory: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {statCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end gap-2">
                  <Button 
                    className="bg-fsu-garnet hover:bg-fsu-garnet/90 text-white" 
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Results Count */}
          <div>
            <p className="text-gray-600">
              Showing {filteredPlayers.length} {filteredPlayers.length === 1 ? "player" : "players"}
              {positionFilter !== "ALL" ? ` at ${positionFilter} position` : ""}
            </p>
          </div>
        </div>

        {/* Content */}
        {viewType === "cards" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPlayers.map((player, index) => (
              <PlayerCard
                key={index}
                player={player}
                onClick={handlePlayerSelect}
              />
            ))}

            {filteredPlayers.length === 0 && (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500 text-lg">No data found matching your filters.</p>
              </div>
            )}
          </div>
        ) : (
          <StatsTable
            players={filteredPlayers}
            positionFilter={positionFilter}
          />
        )}
      </main>

      {/* Modal */}
      <PlayerModal
        player={selectedPlayer}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
                <footer className="bg-fsu-garnet text-white py-6 text-center mt-8">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center">
          <div className="my-4">
            <a href="#" className="text-fsu-gold mx-3 no-underline hover:underline">Team Roster</a>
            <a href="#" className="text-fsu-gold mx-3 no-underline hover:underline">Schedule</a>
            <a href="#" className="text-fsu-gold mx-3 no-underline hover:underline">News</a>
            <a href="#" className="text-fsu-gold mx-3 no-underline hover:underline">About</a>
            <a href="#" className="text-fsu-gold mx-3 no-underline hover:underline">Contact</a>
          </div>
          <div className="text-sm mt-4 text-white/70">
            © 2025 Florida State University Athletics. All Rights Reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Dashboard;
