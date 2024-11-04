'use client';

import type { CertificateResult } from '@/utils/types/certificateResult';

import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  certificateList,
  certificateModuleCompleted,
  certificateModuleStateUpdate,
} from '@/redux/reducers/certificateReducer';
import { studentInfoNumber } from '@/redux/reducers/studentInfoReducer';
import { BaseAPIResponse } from '@/server/lib/schema/apiResponse';
import fetchHelper from '@/utils/fetch';
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type InitialState = {
  status: 'empty certificate not triggered' | 'empty certificate triggered';
};

const initialState: InitialState = {
  status: 'empty certificate not triggered',
};

const CertificateConfirmation = () => {
  const [state, setState] = useState(initialState);
  const selector = useAppSelector((s) => s.certificate);
  const _certificateList = certificateList(selector);
  const isCertificateCompleted = certificateModuleCompleted(selector);

  const dispatch = useAppDispatch();
  const studentNumber = studentInfoNumber(useAppSelector((s) => s.studentInfo));
  const isCertificateListEmpty = _certificateList.length === 0;

  async function handleSubmit() {
    try {
      if (isCertificateCompleted)
        throw new Error("You've already uploaded your certificates.");

      if (
        isCertificateListEmpty &&
        state.status === 'empty certificate not triggered'
      )
        throw new Error("Are you sure you didn't take any certificates?");

      const result: Pick<CertificateResult, 'certificateList'> = {
        certificateList: _certificateList,
      };

      // Posting to database.
      const postingCertificate = await fetchHelper(
        '/api/mongo/certificate',
        'POST',
        {
          ...result,
          studentNumber,
        }
      );

      const responseBody = await postingCertificate.json();

      if (!postingCertificate.ok) {
        throw new Error(
          (responseBody as BaseAPIResponse<string>).errorMessage[0]
        );
      }

      dispatch(certificateModuleStateUpdate(true));
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        status: 'empty certificate triggered',
      }));
      const error = e as Error;
      alert(error.message);
    }
  }
  return (
    <CardFooter className="grid">
      <Button onClick={handleSubmit} disabled={isCertificateCompleted}>
        Submit
      </Button>
    </CardFooter>
  );
};

export default CertificateConfirmation;
