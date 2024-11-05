import { certificateModuleInputControl } from '@/redux/reducers/inputControlReducer';
import { useAppSelector } from './redux';
import disabledPromptList from '@/utils/disabledPromptList';

const useCertificateInputControl = () => {
  const inputControl = certificateModuleInputControl(
    useAppSelector((s) => s.inputControl)
  );
  const isInputDisabled = disabledPromptList.includes(inputControl);

  return { isInputDisabled, certificateInputControl: inputControl };
};

export default useCertificateInputControl;
