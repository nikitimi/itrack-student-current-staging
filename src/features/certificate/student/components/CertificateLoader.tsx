'use client';

import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  certificateList,
  certificateModuleCompleted,
  certificateRemove,
} from '@/redux/reducers/certificateReducer';
import { EMPTY_STRING } from '@/utils/constants';
import { useEffect, useState } from 'react';

/** Loads the certificates uploaded by the student from the database. */
const CertificateLoader = () => {
  const [isCertificateLoaded, setCertificateState] = useState(false);
  const selector = useAppSelector((s) => s.certificate);
  const _certificateList = certificateList(selector);
  const isCertificateCompleted = certificateModuleCompleted(selector);
  const dispatch = useAppDispatch();
  const invalidExtraCharactersRegex = /(%\d{1}\D{1})/g;

  function handleRemoveCertificate(
    certificate: (typeof _certificateList)[number]
  ) {
    if (isCertificateCompleted) return alert('You cannot do that now.');
    dispatch(certificateRemove(certificate));
  }

  useEffect(() => setCertificateState(true), []);

  if (!isCertificateLoaded) return <Loading />;

  return (
    <CardContent>
      <Table className="relative w-full border p-2">
        <TableHeader>
          <TableRow className="capitalize">
            <TableHead>certificate name</TableHead>
            <TableHead>actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="rounded-lg">
          {_certificateList.map((certificate) => {
            const encodedCertificate = encodeURIComponent(certificate).replace(
              invalidExtraCharactersRegex,
              EMPTY_STRING
            );

            return (
              <TableRow key={certificate} id={encodedCertificate}>
                <TableCell>
                  <p>{certificate.replace(/_/g, ' ')}</p>
                </TableCell>
                <TableCell>
                  <div
                    className={`${isCertificateCompleted ? 'opacity-0' : 'flex'} justify-center gap-2`}
                  >
                    <Button
                      variant="destructive"
                      disabled={isCertificateCompleted}
                      onClick={() => handleRemoveCertificate(certificate)}
                    >
                      Remove
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </CardContent>
  );
};

export default CertificateLoader;
