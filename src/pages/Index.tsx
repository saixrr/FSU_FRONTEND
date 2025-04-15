
import Dashboard from "@/components/Dashboard";
import { PlayerGame } from "@/types/playerGame";

import { useEffect, useState } from "react";
const Index = () => {
  const [players, setPlayers] = useState<PlayerGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/player-games`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setPlayers(data)
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch player game stats", err);
        setLoading(false);
      });
  }, []);
  

  return <Dashboard players={players} />;
};

export default Index;
