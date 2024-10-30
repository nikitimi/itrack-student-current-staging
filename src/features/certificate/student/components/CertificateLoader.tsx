'use client';

import Loading from '@/components/Loading';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  certificateList,
  certificateRemove,
} from '@/redux/reducers/certificateReducer';
import { EMPTY_STRING } from '@/utils/constants';
import { useEffect, useState } from 'react';

/** Loads the certificates uploaded by the student from the database. */
const CertificateLoader = () => {
  const [isCertificateLoaded, setCertificateState] = useState(false);
  const _certificateList = certificateList(
    useAppSelector((s) => s.certificate)
  );
  const dispatch = useAppDispatch();
  const invalidExtraCharactersRegex = /(%\d{1}\D{1})/g;

  function handleRemoveCertificate(
    certificate: (typeof _certificateList)[number]
  ) {
    dispatch(certificateRemove(certificate));
  }

  useEffect(() => setCertificateState(true), []);

  if (!isCertificateLoaded) return <Loading />;

  return (
    <>
      <div className="w-full bg-violet-400">
        <div className="p-2">
          <h3 className="font-geist-mono text-lg font-medium">
            Acquired Certificates
          </h3>
          <section className="h-72 overflow-y-auto rounded-lg bg-violet-600">
            <table className="relative w-full">
              <thead className="sticky inset-x-0 top-0 bg-violet-600/90 p-2">
                <tr>
                  <th>Certificate Name</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="rounded-lg">
                {_certificateList.map((certificate) => {
                  const encodedCertificate = encodeURIComponent(
                    certificate
                  ).replace(invalidExtraCharactersRegex, EMPTY_STRING);

                  return (
                    <tr
                      key={certificate}
                      id={encodedCertificate}
                      className="bg-violet-700 p-2"
                    >
                      <td>
                        <p className="text-center">
                          {certificate.replace(/_/g, ' ')}
                        </p>
                      </td>
                      <td>
                        <div className="flex justify-center gap-2">
                          <button
                            className="h-12 w-24 rounded-lg bg-red-500 px-2 py-1 text-center text-white shadow-sm"
                            onClick={() => handleRemoveCertificate(certificate)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </>
  );
};

export default CertificateLoader;
