import React from "react";
import {useAuth} from "./";

export const withHooksHOC = (Component) => {
  return (props) => {
    const useA = useAuth();

    return <Component auth={useA} {...props} />;
  };
};