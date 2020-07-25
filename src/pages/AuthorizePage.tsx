import React from "react";
import { useStore } from "react-stores";
import { store } from "../components/store";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";

export const AuthorizePage: React.FC = () => {
  const authStoreState = useStore(store);

  return authStoreState.authorized ? (
    <div>
      <HomePage />
    </div>
  ) : (
    <div>
      <LoginPage />
    </div>
  );
};
