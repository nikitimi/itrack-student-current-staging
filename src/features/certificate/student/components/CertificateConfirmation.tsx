'use client';

import type { CertificateResult } from '@/utils/types/certificateResult';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  certificateList,
  certificateModuleCompleted,
  certificateModuleStateUpdate,
} from '@/redux/reducers/certificateReducer';
import { studentInfoNumber } from '@/redux/reducers/studentInfoReducer';
import { BaseAPIResponse } from '@/server/lib/schema/apiResponse';
import fetchHelper from '@/utils/fetch';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  certificateModuleInputControl,
  inputControlSetPromptType,
} from '@/redux/reducers/inputControlReducer';
import { PromptType } from '@/lib/enums/prompType';
import useCertificateInputControl from '@/hooks/useCertificateInputControl';

const CertificateConfirmation = () => {
  const selector = useAppSelector((s) => s.certificate);
  const _certificateList = certificateList(selector);
  const isCertificateCompleted = certificateModuleCompleted(selector);

  const dispatch = useAppDispatch();
  const inputControlSelector = useAppSelector((s) => s.inputControl);
  const certificateInputControl =
    certificateModuleInputControl(inputControlSelector);
  const studentNumber = studentInfoNumber(useAppSelector((s) => s.studentInfo));
  const { isInputDisabled } = useCertificateInputControl();

  function handleInputControl(prompType: PromptType) {
    dispatch(
      inputControlSetPromptType({
        key: 'certificateModule',
        promptType: prompType,
      })
    );
  }

  function handleSubmit() {
    if (certificateInputControl === 'waiting') {
      handleInputControl('show prompt');
    }
  }

  async function handleConfirmCertificate() {
    handleInputControl('confirmed');

    if (isCertificateCompleted) {
      return alert("You've already uploaded your certificates.");
    }
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
      return alert((responseBody as BaseAPIResponse<string>).errorMessage[0]);
    }
    dispatch(certificateModuleStateUpdate(true));
  }

  return (
    <>
      <CardFooter className="relative z-10 grid">
        <Button
          onClick={handleSubmit}
          disabled={isCertificateCompleted || isInputDisabled}
        >
          Submit
        </Button>
      </CardFooter>
      <Card
        className={`${certificateInputControl === 'show prompt' ? 'z-20 opacity-100' : 'z-0 opacity-0'} h-screen duration-200 ease-in-out`}
      >
        <CardHeader className="text-center">
          <CardTitle>Certificate Confirmation</CardTitle>
          <CardDescription>
            Are you sure about the details you&apos;ve provided?
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center gap-2">
          <Button className="bg-green-400" onClick={handleConfirmCertificate}>
            Confirm
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleInputControl('waiting')}
          >
            Not yet
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default CertificateConfirmation;
