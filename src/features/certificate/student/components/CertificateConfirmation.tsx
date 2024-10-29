'use client';

import type { CertificateResult } from '@/utils/types/certificateResult';

import React, { useState } from 'react';

import { useAppSelector } from '@/hooks/redux';
import { certificateList } from '@/redux/reducers/certificateReducer';
import certificateResult from '@/features/certificate/student/utils/certificateResult';

type InitialState = {
  status: 'empty certificate not triggered' | 'empty certificate triggered';
};

const initialState: InitialState = {
  status: 'empty certificate not triggered',
};

const CertificateConfirmation = () => {
  const [state, setState] = useState(initialState);
  const _certificateList = certificateList(
    useAppSelector((s) => s.certificate)
  );
  const isCertificateListEmpty = _certificateList.length === 0;
  function handleSubmit() {
    try {
      if (
        isCertificateListEmpty &&
        state.status === 'empty certificate not triggered'
      )
        throw new Error("Are you sure you didn't take any certificates?");

      //TODO: Save to database
      const result: CertificateResult = {
        certificateList: _certificateList,
      };

      console.log(certificateResult(result));
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
    <div className="w-full bg-violet-500 p-2">
      <div className="grid">
        <button
          onClick={handleSubmit}
          className="h-12 rounded-lg bg-background px-2 py-1 text-foreground shadow-sm duration-300 ease-in-out hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CertificateConfirmation;
