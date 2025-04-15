import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlayerGame } from "@/types/playerGame";

interface PlayerCardProps {
  player: PlayerGame;
  onClick: (player: PlayerGame) => void;
}

const PlayerCard = ({ player, onClick }: PlayerCardProps) => {
  const displayStats = () => {
    switch (player.position) {
      case "QB":
        return (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="font-semibold">Pass Yards</p>
              <p>{player.passingYards}</p>
            </div>
            <div>
              <p className="font-semibold">TD / INT</p>
              <p>{player.passingTDs} / {player.passingInt}</p>
            </div>
          </div>
        );
      case "RB":
        return (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="font-semibold">Rush Yards</p>
              <p>{player.rushingYards}</p>
            </div>
            <div>
              <p className="font-semibold">Rush TDs</p>
              <p>{player.rushingTDs}</p>
            </div>
          </div>
        );
      case "WR":
      case "TE":
        return (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="font-semibold">Rec Yards</p>
              <p>{player.receivingYards}</p>
            </div>
            <div>
              <p className="font-semibold">Receptions</p>
              <p>{player.receptions}</p>
            </div>
          </div>
        );
      case "DL":
      case "LB":
      case "CB":
      case "S":
        return (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="font-semibold">Tackles</p>
              <p>{player.tackles}</p>
            </div>
            <div>
              <p className="font-semibold">Sacks</p>
              <p>{player.sacks}</p>
            </div>
          </div>
        );
      case "K":
        return (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="font-semibold">FG Made</p>
              <p>{player.fieldGoalsMade}/{player.fieldGoalsAttempted}</p>
            </div>
            <div>
              <p className="font-semibold">XP Made</p>
              <p>{player.extraPointsMade}/{player.extraPointsAttempted}</p>
            </div>
          </div>
        );
      default:
        return <p className="text-sm">Stats not available</p>;
    }
  };

  return (
    <Card
      className="player-card h-full cursor-pointer border-2 border-transparent hover:border-fsu-garnet"
      onClick={() => onClick(player)}
    >
      <CardHeader className="p-4 pb-2 flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-fsu-garnet mb-2">
          <img
            src={player.playerPhoto || "/placeholder.svg"}
            alt={player.playerName}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-bold text-fsu-garnet text-center">{player.playerName}</h3>
        <div className="flex space-x-2 mt-1">
          <span className="bg-fsu-garnet text-white px-2 py-0.5 rounded-md text-xs">
            {player.position}
          </span>
          <span className="bg-fsu-gold text-fsu-black px-2 py-0.5 rounded-md text-xs">
            {player.season}
          </span>
        </div>
        <p className="text-xs text-gray-600 mt-1">vs {player.opponent} ({player.date})</p>
      </CardHeader>
      <CardContent className="p-4 pt-2">{displayStats()}</CardContent>
    </Card>
  );
};

export default PlayerCard;
