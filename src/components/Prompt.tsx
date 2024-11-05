'use client';

import type { ModuleList } from '@/lib/schema/moduleList';

import { useAppDispatch } from '@/hooks/redux';
import { Button } from './ui/button';
import { inputControlSetPromptType } from '@/redux/reducers/inputControlReducer';
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog';
import { DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { useState } from 'react';

type PromptProps<T> = {
  description: string;
  promptKey: keyof ModuleList;
  title: string;
  trigger: string | React.ReactNode;
  handleConfirmation: () => T;
};
/** TODO: This is not working as intended. Redux's state is updating but the component remains the same. */
const Prompt = <T,>(props: PromptProps<T>) => {
  const dispatch = useAppDispatch();
  const [isConfirm, setIsConfirm] = useState(false);

  function handleCloseModal() {
    dispatch(
      inputControlSetPromptType({
        key: props.promptKey,
        promptType: 'no document',
      })
    );
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        // Guard clauses.
        if (open) return;

        dispatch(
          inputControlSetPromptType({
            key: props.promptKey,
            promptType: isConfirm ? 'submitted' : 'no document',
          })
        );
      }}
    >
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent className="fixed inset-x-0 inset-y-0 z-20 flex flex-col items-center justify-center rounded-lg bg-white/90 p-4 text-center shadow-sm duration-200 ease-in-out">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <DialogClose asChild>
            <Button
              className="bg-green-400"
              onClick={() => {
                setIsConfirm(true);
                props.handleConfirmation();
              }}
            >
              Confirm
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={() => handleCloseModal()}>
              Not yet
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Prompt;
