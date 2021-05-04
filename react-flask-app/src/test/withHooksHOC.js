import React from "react";
import {useAuthE} from "./index";

export const withHooksHOC = (Component) => {
  return (props) => {
    const useA = useAuthE();

    return <Component auth={useA} {...props} />;
  };
};