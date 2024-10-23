'use client';

import Loading from '@/components/Loading';
import certificate from '@/lib/enums/certificate';
import React, { Suspense, useRef } from 'react';

/** The uploader of certificates to the database. */
const CertificateSelector = () => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const certificates = certificate.options;
  const allUnderscoreRegExp = /_/g;

  function handleClick() {
    alert(selectRef.current?.value.replace(allUnderscoreRegExp, ' '));
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full bg-violet-500">
        <div className="p-6 text-center">
          <h3 className="font-geist-mono text-lg font-medium">
            Certificate Selector
          </h3>
          <select
            ref={selectRef}
            className="rounded-lg p-2 text-black shadow-sm"
          >
            {certificates.map((certificate) => {
              const formattedCertificate = certificate.replace(
                allUnderscoreRegExp,
                ' '
              );
              return (
                <option
                  key={certificate}
                  value={certificate}
                  className="text-black"
                >
                  {formattedCertificate}
                </option>
              );
            })}
          </select>
          <button
            onClick={handleClick}
            className="rounded-lg border border-green-300 bg-green-300 px-2 py-1 font-geist-sans text-black shadow-sm duration-300 ease-in-out hover:border-green-400 hover:bg-green-400 hover:text-white"
          >
            Add Certificate
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default CertificateSelector;
