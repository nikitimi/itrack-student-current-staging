'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import certificateEnum, { type Certificate } from '@/lib/enums/certificate';
import {
  certificateAdd,
  certificateList,
} from '@/redux/reducers/certificateReducer';
import { useRef } from 'react';

/** The uploader of certificates to the database. */
const CertificateSelector = () => {
  const allUnderscoreRegExp = /_/g;
  const selectRef = useRef<HTMLSelectElement>(null);
  const _certificateList = certificateList(
    useAppSelector((s) => s.certificate)
  );
  const certificates = certificateEnum.options.filter(
    (c) => !_certificateList.includes(c)
  );
  const isCertificateOptionEmpty = certificates.length === 0;
  const dispatch = useAppDispatch();

  function handleClick() {
    try {
      if (isCertificateOptionEmpty)
        throw new Error('All certificates are now selected.');
      const select = selectRef.current;

      if (select === null) throw new Error('Select is null!');

      const certificate = select.value as Certificate;
      console.log(certificate);
      dispatch(certificateAdd(certificate));
    } catch (e) {
      const error = e as Error;
      alert(error.message);
    }
  }

  return (
    <>
      <div className="w-full bg-violet-500">
        <div className="p-6 text-center">
          <h3 className="font-geist-mono text-lg font-medium">
            Certificate Selector
          </h3>
          <div className="grid grid-flow-col gap-2 p-2">
            <select
              disabled={isCertificateOptionEmpty}
              ref={selectRef}
              name="certificate"
              className="h-12 rounded-lg p-2 text-black shadow-sm"
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
              disabled={isCertificateOptionEmpty}
              onClick={handleClick}
              className="h-12 rounded-lg border border-background border-green-300 bg-background bg-green-300 px-2 py-1 font-geist-sans text-foreground shadow-sm duration-300 ease-in-out hover:border-green-400 hover:bg-green-400 hover:text-white"
            >
              Add Certificate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificateSelector;
