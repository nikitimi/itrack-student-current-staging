import React from "react";
import type { Children } from "@/app/layout";

const Main = (props: Children) => {
  return <main>{props.children}</main>;
};

export default Main;
