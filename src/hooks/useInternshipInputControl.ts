import { internshipModuleInputControl } from '@/redux/reducers/inputControlReducer';
import { useAppSelector } from './redux';
import disabledPromptList from '@/utils/disabledPromptList';

const useCertificateInputControl = () => {
  const inputControl = internshipModuleInputControl(
    useAppSelector((s) => s.inputControl)
  );
  const isInputDisabled = disabledPromptList.includes(inputControl);

  return { isInputDisabled, internshipInputControl: inputControl };
};

export default useCertificateInputControl;
