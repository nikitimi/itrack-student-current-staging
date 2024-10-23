'use client';

import Loading from '@/components/Loading';
import certificate from '@/lib/enums/certificate';
import { Suspense } from 'react';

/** Loads the certificates uploaded by the student from the database. */
const CertificateLoader = () => {
  const certificates = certificate.options;

  return (
    <Suspense fallback={<Loading />}>
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
                {certificates.map((certificate) => {
                  const encodedCertificate = encodeURIComponent(
                    certificate
                  ).replace(/(%\d{1}\D{1})/g, '');

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
                            className="w-24 rounded-lg bg-red-500 px-2 py-1 text-center text-white shadow-sm"
                            onClick={() => {
                              const tableRow = document.querySelector(
                                `tr#${encodedCertificate}`
                              ) as HTMLTableRowElement;
                              const toggleClasses = ['hidden'] as const;

                              tableRow.classList.toggle(...toggleClasses);
                            }}
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
    </Suspense>
  );
};

export default CertificateLoader;
