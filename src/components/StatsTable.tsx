import { useState } from "react";
import { PlayerGame } from "@/types/playerGame";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

interface StatsTableProps {
  players: PlayerGame[];
  positionFilter: string;
}

type SortField =
  | "playerName"
  | "position"
  | "season"
  | "passingYards"
  | "rushingYards"
  | "receivingYards"
  | "tackles"
  | "sacks"
  | "interceptions";

type SortDirection = "asc" | "desc";

const StatsTable = ({ players, positionFilter }: StatsTableProps) => {
  const [sortBy, setSortBy] = useState<SortField>("playerName");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);
  const playersPerPage = 5;

  const filteredPlayers = positionFilter === "ALL"
    ? players
    : players.filter((p) => p.position === positionFilter);

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    const aVal = a[sortBy as keyof PlayerGame] ?? 0;
    const bVal = b[sortBy as keyof PlayerGame] ?? 0;

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return sortDirection === "asc"
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number);
  });

  const totalPages = Math.ceil(sortedPlayers.length / playersPerPage);
  const paginatedPlayers = sortedPlayers.slice(
    (page - 1) * playersPerPage,
    page * playersPerPage
  );

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortBy !== field) return <ChevronsUpDown className="ml-1 h-4 w-4" />;
    return sortDirection === "asc"
      ? <ChevronUp className="ml-1 h-4 w-4" />
      : <ChevronDown className="ml-1 h-4 w-4" />;
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort("playerName")} className="cursor-pointer">
              <div className="flex items-center">Player {renderSortIcon("playerName")}</div>
            </TableHead>
            <TableHead onClick={() => handleSort("position")} className="cursor-pointer">
              <div className="flex items-center">Pos {renderSortIcon("position")}</div>
            </TableHead>
            <TableHead onClick={() => handleSort("season")} className="cursor-pointer">
              <div className="flex items-center">Season {renderSortIcon("season")}</div>
            </TableHead>
            <TableHead onClick={() => handleSort("passingYards")} className="cursor-pointer">
              <div className="flex items-center">Pass Yds {renderSortIcon("passingYards")}</div>
            </TableHead>
            <TableHead onClick={() => handleSort("rushingYards")} className="cursor-pointer">
              <div className="flex items-center">Rush Yds {renderSortIcon("rushingYards")}</div>
            </TableHead>
            <TableHead onClick={() => handleSort("receivingYards")} className="cursor-pointer">
              <div className="flex items-center">Rec Yds {renderSortIcon("receivingYards")}</div>
            </TableHead>
            <TableHead onClick={() => handleSort("tackles")} className="cursor-pointer">
              <div className="flex items-center">Tackles {renderSortIcon("tackles")}</div>
            </TableHead>
            <TableHead onClick={() => handleSort("sacks")} className="cursor-pointer">
              <div className="flex items-center">Sacks {renderSortIcon("sacks")}</div>
            </TableHead>
            <TableHead onClick={() => handleSort("interceptions")} className="cursor-pointer">
              <div className="flex items-center">INTs {renderSortIcon("interceptions")}</div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedPlayers.length > 0 ? (
            paginatedPlayers.map((player, i) => (
              <TableRow key={`${player.playerName}-${i}`}>
                <TableCell>{player.playerName}</TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell>{player.season}</TableCell>
                <TableCell>{player.passingYards ?? 0}</TableCell>
                <TableCell>{player.rushingYards ?? 0}</TableCell>
                <TableCell>{player.receivingYards ?? 0}</TableCell>
                <TableCell>{player.tackles ?? 0}</TableCell>
                <TableCell>{player.sacks ?? 0}</TableCell>
                <TableCell>{player.interceptions ?? 0}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-6">
                No players found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-muted-foreground">
            Showing {((page - 1) * playersPerPage) + 1} to{" "}
            {Math.min(page * playersPerPage, filteredPlayers.length)} of{" "}
            {filteredPlayers.length} players
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsTable;
