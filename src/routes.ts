import { createBrowserRouter } from "react-router";
import { Home } from "./components/Home";
import { MatchDetails } from "./components/MatchDetails";
import { SeatSelection } from "./components/SeatSelection";
import { BookingConfirmation } from "./components/BookingConfirmation";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/match/:matchId",
    Component: MatchDetails,
  },
  {
    path: "/match/:matchId/seats",
    Component: SeatSelection,
  },
  {
    path: "/confirmation",
    Component: BookingConfirmation,
  },
]);
