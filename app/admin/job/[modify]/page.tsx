"use client";

import { useParams } from "next/navigation";
import React from "react";

const Modify = () => {
  const params = useParams();
  return <div>{params.modify}</div>;
};

export default Modify;
