import { PlayerGame } from "@/types/playerGame";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Award, User } from "lucide-react";

interface PlayerModalProps {
  player: PlayerGame | null;
  isOpen: boolean;
  onClose: () => void;
}

const getMaxValue = (key: keyof PlayerGame): number => {
  const maxMap: Partial<Record<keyof PlayerGame, number>> = {
    passingYards: 400,
    passingTDs: 5,
    passingInt: 3,
    rushingYards: 200,
    rushingTDs: 4,
    receivingYards: 150,
    receivingTDs: 3,
    receptions: 12,
    tackles: 15,
    sacks: 4,
    interceptions: 2,
  };
  return maxMap[key] || 100;
};

const StatBar = ({
  label,
  value,
  keyName,
}: {
  label: string;
  value: number | undefined;
  keyName: keyof PlayerGame;
}) => {
  const progress = value ? Math.min((value / getMaxValue(keyName)) * 100, 100) : 0;
  return (
    <div>
      <div className="flex justify-between mb-1 text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-gray-600">{value ?? 0}</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

const PlayerModal = ({ player, isOpen, onClose }: PlayerModalProps) => {
  if (!player) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-fsu-garnet">
            {player.playerName}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
          {/* Info */}
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-fsu-garnet mb-4">
              <img
                src={player.playerPhoto || "/placeholder.svg"}
                alt={player.playerName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-gray-100 p-4 rounded-lg w-full text-sm space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4 text-fsu-garnet" />
                  <span>Position</span>
                </div>
                <span>{player.position}</span>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-fsu-garnet" />
                  <span>Season</span>
                </div>
                <span>{player.season}</span>
              </div>

              <div className="flex justify-between">
                <span>Opponent</span>
                <span>{player.opponent}</span>
              </div>

              <div className="flex justify-between">
                <span>Game Type</span>
                <span>{player.gameType}</span>
              </div>

              <div className="flex justify-between">
                <span>Location</span>
                <span>{player.location}</span>
              </div>

              <div className="flex justify-between">
                <span>Date</span>
                <span>{player.date}</span>
              </div>

              {player.result && (
                <div className="flex justify-between">
                  <span>Result</span>
                  <span>{player.result}</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="md:col-span-2 bg-white p-4 shadow-sm rounded-lg space-y-4">
            <h3 className="text-lg font-semibold text-fsu-garnet border-b pb-2">Performance Stats</h3>

            {/* Conditional stats */}
            {player.passingYards !== undefined && (
              <StatBar label="Passing Yards" value={player.passingYards} keyName="passingYards" />
            )}
            {player.passingTDs !== undefined && (
              <StatBar label="Passing TDs" value={player.passingTDs} keyName="passingTDs" />
            )}
            {player.passingInt !== undefined && (
              <StatBar label="INTs" value={player.passingInt} keyName="passingInt" />
            )}
            {player.rushingYards !== undefined && (
              <StatBar label="Rushing Yards" value={player.rushingYards} keyName="rushingYards" />
            )}
            {player.rushingTDs !== undefined && (
              <StatBar label="Rushing TDs" value={player.rushingTDs} keyName="rushingTDs" />
            )}
            {player.receivingYards !== undefined && (
              <StatBar label="Receiving Yards" value={player.receivingYards} keyName="receivingYards" />
            )}
            {player.receivingTDs !== undefined && (
              <StatBar label="Receiving TDs" value={player.receivingTDs} keyName="receivingTDs" />
            )}
            {player.receptions !== undefined && (
              <StatBar label="Receptions" value={player.receptions} keyName="receptions" />
            )}
            {player.tackles !== undefined && (
              <StatBar label="Tackles" value={player.tackles} keyName="tackles" />
            )}
            {player.sacks !== undefined && (
              <StatBar label="Sacks" value={player.sacks} keyName="sacks" />
            )}
            {player.interceptions !== undefined && (
              <StatBar label="Interceptions" value={player.interceptions} keyName="interceptions" />
            )}

            {player.passingYards === undefined &&
              player.rushingYards === undefined &&
              player.receivingYards === undefined &&
              player.tackles === undefined && (
                <div className="text-center text-gray-500 text-sm">
                  No detailed stats available for this game.
                </div>
              )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerModal;
