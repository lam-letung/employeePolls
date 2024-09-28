import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import NewPoll from "./NewPoll";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "../redux/reducers";

const store = configureStore({ reducer });

describe("NewPoll", () => {
  test("should render the component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText("Create a New Poll")).toBeInTheDocument();
    expect(screen.getByTestId("firstOptionLabel")).toHaveTextContent("First Option");
    expect(screen.getByTestId("secondOptionLabel")).toHaveTextContent("Second Option");
    expect(screen.getByTestId("submit-poll")).toHaveTextContent("Add Poll");
  });

  test("should display input values", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const firstOptionInputElement = screen.getByTestId("firstOption");
    const secondOptionInputElement = screen.getByTestId("secondOption");

    fireEvent.change(firstOptionInputElement, { target: { value: 'Texas' } });
    fireEvent.change(secondOptionInputElement, { target: { value: 'New Hampshire' } });
    expect(firstOptionInputElement.value).toBe("Texas");
    expect(secondOptionInputElement.value).toBe("New Hampshire");
  });

  test("should alert when options are empty", () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId("submit-poll"));
    expect(alertMock).toHaveBeenCalledWith("Please enter both options");

    alertMock.mockRestore(); // Restore original implementation
  });
});
