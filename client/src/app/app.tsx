import { Ticket, User } from "@acme/shared-models";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import styles from "./app.module.css";
import { TicketDetail } from "./ticketDetail";
import Tickets from "./tickets/tickets";

const App = () => {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [users, setUsers] = useState([] as User[]);
  const [isLoading, setIsLoading] = useState(true);
  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).

  const fetchTickets = async () => {
    const data = await fetch("/api/tickets");
    setTickets(await data.json());
    setIsLoading(false);
  };

  const fetchUsers = async () => {
    const data = await fetch("/api/users");
    const res = await data.json();
    res.unshift({
      id: 0,
      name: "Unassigned",
    });
    setUsers(res);
  };

  useEffect(() => {
    fetchTickets();
    fetchUsers();
  }, []);

  return (
    <div className={styles["app"]}>
      <h1>Ticketing App</h1>
      <Routes>
        <Route
          path="/"
          element={
            <Tickets
              tickets={tickets}
              isLoading={isLoading}
              fetchTickets={fetchTickets}
              users={users}
            />
          }
        />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route
          path="/:id"
          element={<TicketDetail users={users} fetchTickets={fetchTickets} />}
        />
      </Routes>
    </div>
  );
};

export default App;
