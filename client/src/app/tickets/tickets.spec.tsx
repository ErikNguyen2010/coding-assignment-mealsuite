import { fireEvent, render, screen, within } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { Tickets } from "./tickets";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Tickets Component", () => {
  const mockTickets = [
    { id: 1, description: "Task 1", completed: true, assigneeId: 1 },
    { id: 2, description: "Task 2", completed: false, assigneeId: 2 },
    { id: 3, description: "Task 3", completed: true, assigneeId: null },
  ];

  const mockUsers = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
  ];

  const mockFetchTickets = jest.fn();

  const defaultProps = {
    tickets: mockTickets,
    isLoading: false,
    fetchTickets: mockFetchTickets,
    users: mockUsers,
  };

  const renderComponent = async (props = {}) => {
    const utils = render(
      <BrowserRouter>
        <Tickets {...defaultProps} {...props} />
      </BrowserRouter>
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    return utils;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state when isLoading is true", async () => {
    await renderComponent({ isLoading: true });
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("should render all tickets when no filter is selected", async () => {
    await renderComponent();
    const descriptions = screen.getAllByText(/Task \d/);
    expect(descriptions).toHaveLength(3);
  });

  it("should render completed tickets first", async () => {
    await renderComponent();
    const descriptions = screen.getAllByText(/Task \d/);
    expect(descriptions[0]).toHaveTextContent("Task 1");
    expect(descriptions[1]).toHaveTextContent("Task 3");
    expect(descriptions[2]).toHaveTextContent("Task 2");
  });

  it("should open create task dialog when clicking Add Task", async () => {
    await renderComponent();

    const button = screen.getByText(/Add Task/i).closest("button");
    if (!button) throw new Error("Add Task button not found");
    fireEvent.click(button);

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("Add Task")).toBeInTheDocument();
    expect(within(dialog).getByLabelText("Task Name")).toBeInTheDocument();
  });

  it("should navigate to ticket detail when clicking a ticket", async () => {
    await renderComponent();
    const firstTicket = screen.getByText("Task 1").closest(".card-detail");
    if (!firstTicket) throw new Error("Ticket not found");
    fireEvent.click(firstTicket);
    expect(mockNavigate).toHaveBeenCalledWith("/1");
  });

  it("should show unassigned for tickets without assignee", async () => {
    await renderComponent();
    expect(screen.getByText("Unassigned")).toBeInTheDocument();
  });
});
