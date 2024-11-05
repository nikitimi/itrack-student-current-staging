'use client';

import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import certificateEnum, { type Certificate } from '@/lib/enums/certificate';
import {
  certificateAdd,
  certificateList,
  certificateModuleCompleted,
} from '@/redux/reducers/certificateReducer';
import { EMPTY_STRING } from '@/utils/constants';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import useCertificateInputControl from '@/hooks/useCertificateInputControl';

/** The uploader of certificates to the database. */
const CertificateSelector = () => {
  const allUnderscoreRegExp = /_/g;

  const selector = useAppSelector((s) => s.certificate);
  const _certificateList = certificateList(selector);
  const isCertificateCompleted = certificateModuleCompleted(selector);
  const certificates = certificateEnum.options.filter(
    (c) => !_certificateList.includes(c)
  );
  const isCertificateOptionEmpty = certificates.length === 0;
  const [isCertificateLoaded, setCertificateLoad] = useState(false);
  const dispatch = useAppDispatch();
  const [selectState, setSelectState] = useState<string>('');
  const { isInputDisabled } = useCertificateInputControl();
  const condition =
    isCertificateOptionEmpty || isCertificateCompleted || isInputDisabled;

  // The server response is false, false while the client response is false, true.
  console.log(isCertificateOptionEmpty, isCertificateCompleted);

  function handleClick() {
    try {
      if (isCertificateOptionEmpty)
        throw new Error('All certificates are now selected.');

      if (selectState === EMPTY_STRING) throw new Error('Select is null!');

      dispatch(certificateAdd(selectState as Certificate));
    } catch (e) {
      const error = e as Error;
      alert(error.message);
    }
  }

  useEffect(() => setCertificateLoad(true), []);

  return (
    <CardHeader>
      <CardTitle>Certificate Selector</CardTitle>
      <div className="grid grid-flow-col gap-2">
        {isCertificateLoaded ? (
          <Select
            value={selectState}
            onValueChange={(v) => setSelectState(v)}
            disabled={condition}
            name="certificate"
          >
            <SelectTrigger>
              <SelectValue placeholder="Certificate" />
            </SelectTrigger>
            <SelectContent>
              {certificates.map((certificate) => {
                const formattedCertificate = certificate.replace(
                  allUnderscoreRegExp,
                  ' '
                );

                return (
                  <SelectItem
                    key={certificate}
                    value={certificate}
                    className="text-black"
                  >
                    {formattedCertificate}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        ) : (
          <Select disabled={true} name="certificate">
            <SelectTrigger>
              <SelectValue placeholder="Certificate" />
            </SelectTrigger>
            <SelectContent>
              {certificateEnum.options.map((certificate) => {
                const formattedCertificate = certificate.replace(
                  allUnderscoreRegExp,
                  ' '
                );

                return (
                  <SelectItem
                    key={certificate}
                    value={certificate}
                    className="text-black"
                  >
                    {formattedCertificate}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        )}
        <Button disabled={condition} onClick={handleClick}>
          Add Certificate
        </Button>
      </div>
    </CardHeader>
  );
};

export default CertificateSelector;
