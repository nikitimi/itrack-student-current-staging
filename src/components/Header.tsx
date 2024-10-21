import React, { Suspense } from "react";
import Nav from "@/components/Nav";
import Loading from "./Loading";

const Header = () => {
  return (
    <header>
      <p>Header</p>
      <Suspense fallback={<Loading />}>
        <Nav />
      </Suspense>
    </header>
  );
};

export default Header;
