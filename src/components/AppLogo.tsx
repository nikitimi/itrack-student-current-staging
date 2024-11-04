import Image from 'next/image';
import React from 'react';

const AppLogo = () => {
  return (
    <div className="h-8 w-24">
      <Image
        draggable={false}
        src="/itrack-removebg.png"
        width={360}
        height={240}
        className="h-auto w-auto"
        alt=""
      />
    </div>
  );
};

export default AppLogo;
