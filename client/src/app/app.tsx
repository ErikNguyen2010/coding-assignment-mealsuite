import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Ticket, User } from "@acme/shared-models";

import styles from "./app.module.css";
import Tickets from "./tickets/tickets";
import { Box } from "@mui/material";
import Loading from "../component/Loading";

const App = () => {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [users, setUsers] = useState([] as User[]);
  const [isLoading, setIsLoading] = useState(true);
  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  useEffect(() => {
    async function fetchTickets() {
      const data = await fetch("/api/tickets");
      setTickets(await data.json());
      setIsLoading(false);
    }

    async function fetchUsers() {
      const data = await fetch("/api/users");
      setUsers(await data.json());
    }

    fetchTickets();
    fetchUsers();
  }, []);

  return (
    <div className={styles["app"]}>
      <h1>Ticketing App</h1>
      <Routes>
        <Route
          path="/"
          element={<Tickets tickets={tickets} isLoading={isLoading} />}
        />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route path="/:id" element={<h2>Details Not Implemented</h2>} />
      </Routes>
    </div>
  );
};

export default App;
