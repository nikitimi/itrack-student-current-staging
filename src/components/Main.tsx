import type { Children } from "@/utils/types";
import React from "react";

const Main = (props: Children) => {
  return <main>{props.children}</main>;
};

export default Main;
