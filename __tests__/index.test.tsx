// import "jest-canvas-mock";
import { ChakraProvider } from "@chakra-ui/react";
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import Home from "pages";

describe("Home", () => {
  it("renders an input", () => {
    render(<Home />);

    const input = screen.getByRole("textbox", {});

    expect(input).toBeInTheDocument();
  });
});
