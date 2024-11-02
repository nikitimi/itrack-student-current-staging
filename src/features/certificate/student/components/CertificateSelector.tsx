'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import certificateEnum, { type Certificate } from '@/lib/enums/certificate';
import {
  certificateAdd,
  certificateList,
  certificateModuleCompleted,
} from '@/redux/reducers/certificateReducer';
import { useEffect, useRef, useState } from 'react';

/** The uploader of certificates to the database. */
const CertificateSelector = () => {
  const allUnderscoreRegExp = /_/g;
  const selectRef = useRef<HTMLSelectElement>(null);
  const selector = useAppSelector((s) => s.certificate);
  const _certificateList = certificateList(selector);
  const isCertificateCompleted = certificateModuleCompleted(selector);
  const certificates = certificateEnum.options.filter(
    (c) => !_certificateList.includes(c)
  );
  const isCertificateOptionEmpty = certificates.length === 0;
  const isInputDisabled = isCertificateOptionEmpty || isCertificateCompleted;
  const [isCertificateLoaded, setCertificateLoad] = useState(false);
  const dispatch = useAppDispatch();

  // The server response is false, false while the client response is false, true.
  console.log(isCertificateOptionEmpty, isCertificateCompleted);

  function handleClick() {
    try {
      if (isCertificateOptionEmpty)
        throw new Error('All certificates are now selected.');
      const select = selectRef.current;

      if (select === null) throw new Error('Select is null!');

      const certificate = select.value as Certificate;
      dispatch(certificateAdd(certificate));
    } catch (e) {
      const error = e as Error;
      alert(error.message);
    }
  }

  useEffect(() => setCertificateLoad(true), []);

  return (
    <>
      <div className="w-full bg-violet-500">
        <div className="p-6 text-center">
          <h3 className="font-geist-mono text-lg font-medium">
            Certificate Selector
          </h3>
          <div className="grid grid-flow-col gap-2 p-2">
            {isCertificateLoaded ? (
              <select
                disabled={isInputDisabled}
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
            ) : (
              <select
                disabled={true}
                name="certificate"
                className="h-12 rounded-lg p-2 text-slate-500 shadow-sm"
              >
                {certificateEnum.options.map((certificate) => {
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
            )}
            <button
              disabled={isInputDisabled}
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
