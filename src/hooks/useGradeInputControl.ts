import { gradeModuleInputControl } from '@/redux/reducers/inputControlReducer';
import { useAppSelector } from './redux';
import disabledPromptList from '@/utils/disabledPromptList';

const useCertificateInputControl = () => {
  const inputControl = gradeModuleInputControl(
    useAppSelector((s) => s.inputControl)
  );
  const disableInputs = disabledPromptList.includes(inputControl);

  return disableInputs;
};

export default useCertificateInputControl;
