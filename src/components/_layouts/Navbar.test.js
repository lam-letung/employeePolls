import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Navbar from "../_layouts/Navbar";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "../../redux/reducers";
import { loginAuthedUser } from "../../redux/actions/authedUser";
import '@testing-library/jest-dom';


const store = configureStore({ reducer });

describe("Navbar", () => {
  beforeEach(() => {
    store.dispatch(loginAuthedUser({
      username: "tylermcginnis", password: ""
    }));
  });

  test("should render the component", () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    expect(view).toBeDefined();
    expect(view).toMatchSnapshot();
  });

  test("should display all elements", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const homeLinkElement = screen.getByTestId("home-link");
    const newPollLinkElement = screen.getByTestId("new-poll-link");
    const leaderboardLinkElement = screen.getByTestId("leaderboard-link");
    const logoutLinkElement = screen.getByTestId("logout-link");

    expect(homeLinkElement).toHaveTextContent("Home");
    expect(newPollLinkElement).toHaveTextContent("New Poll");
    expect(leaderboardLinkElement).toHaveTextContent("Leaderboard");
    expect(logoutLinkElement).toHaveTextContent("Logout");
  });
});
