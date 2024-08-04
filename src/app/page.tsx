"use client";

import Home from "../components/Home";
import Navbar from "../components/shared/Navbar";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function Main() {
  return (
    <Provider store={store}>
      <main className="">
        <Home />
      </main>
    </Provider>
  );
}
