'use client';

import type { ModuleList } from '@/lib/schema/moduleList';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { inputControlSetPromptType } from '@/redux/reducers/inputControlReducer';

type PromptProps = {
  key: keyof ModuleList;
};
/** TODO: This is not working as intended. Redux's state is updating but the component remains the same. */
const Prompt = (props: PromptProps) => {
  const dispatch = useAppDispatch();
  const inputControl = useAppSelector((s) => s.inputControl);

  return (
    <Card
      className={`${inputControl[props.key] === 'show prompt' ? 'z-20 opacity-100' : 'z-0 opacity-0'} h-screen duration-200 ease-in-out`}
    >
      <CardHeader className="text-center">
        <CardTitle>Certificate Confirmation</CardTitle>
        <CardDescription>
          Are you sure about the details you&apos;ve provided?
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-2">
        <Button
          className="bg-green-400"
          onClick={() =>
            dispatch(
              inputControlSetPromptType({
                key: props.key,
                promptType: 'confirmed',
              })
            )
          }
        >
          Confirm
        </Button>
        <Button
          variant="destructive"
          onClick={() =>
            dispatch(
              inputControlSetPromptType({
                key: props.key,
                promptType: 'waiting',
              })
            )
          }
        >
          Not yet
        </Button>
      </CardContent>
    </Card>
  );
};

export default Prompt;
