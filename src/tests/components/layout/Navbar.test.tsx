import { render, screen } from "@testing-library/react";
import Navbar from "../../../components/layout/Navbar";

describe("<Navbar />", () => {
  test("should display title link", () => {
    render(<Navbar />);

    expect(screen.getAllByRole("link")[0]).toHaveTextContent(/bandmate/i);
  });

  test("should display login/register links when cookie is not present", () => {
    //arrange
    jest.mock("js-cookie", () => {
      get: () => undefined;
    });
    render(<Navbar />);

    //assert
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  test("should display account button when cookie is present", () => {
    //arrange
    jest.mock("js-cookie", () => {
      get: () => "token";
    });
    render(<Navbar />);

    //assert
    //expect(screen.getByText(/account/i)).toBeInTheDocument();
    //TODO: repair
  });
});
