import React,{ useState , useEffect } from "react";
import { PlayerGame } from "@/types/playerGame";
import Header from "./Header";
import PlayerCard from "./PlayerCard";
import StatsTable from "./StatsTable";
import PlayerModal from "./PlayerModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  
  useEffect(() => {
    setFilteredPlayers(players);
  }, [players]);
  console.log(players)
  

  // Handle search functionality
  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setFilteredPlayers(players);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = players.filter(player =>
      player.playerName.toLowerCase().includes(query) ||
      player.position.toLowerCase().includes(query) ||
      player.opponent.toLowerCase().includes(query)
    );
    setFilteredPlayers(filtered);
  };

  // Handle position filter change
  const handlePositionFilter = (position: string) => {
    setPositionFilter(position);

    if (position === "ALL") {
      setFilteredPlayers(players);
    } else {
      const filtered = players.filter(player => player.position === position);
      setFilteredPlayers(filtered);
    }
  };

  // Handle player selection for modal
  const handlePlayerSelect = (player: PlayerGame) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />

      <main className="container mx-auto py-6 px-4">
        {/* Filters and View Toggle */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold mb-2">Position Filter</h2>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1 rounded-full text-sm font-medium ${
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
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
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

          <div>
            <h2 className="text-xl font-bold mb-2">View Mode</h2>
            <Tabs defaultValue="cards" onValueChange={(value) => setViewType(value as "cards" | "table")}>
              <TabsList>
                <TabsTrigger value="cards">Cards</TabsTrigger>
                <TabsTrigger value="table">Table</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPlayers.length} {filteredPlayers.length === 1 ? "record" : "records"}
            {positionFilter !== "ALL" ? ` at ${positionFilter} position` : ""}
          </p>
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
    </div>
  );
};

export default Dashboard;
