'use client';

import { useClerk } from '@clerk/nextjs';

import Heading from '@/components/Heading';
import { useAppDispatch } from '@/hooks/redux';
import useAppRouter from '@/hooks/useAppRouter';
import { authenticationResetState } from '@/redux/reducers/authenticationReducer';
import { certificateResetState } from '@/redux/reducers/certificateReducer';
import { gradeResetState } from '@/redux/reducers/gradeReducer';
import { internshipResetState } from '@/redux/reducers/internshipReducer';
import { studentInfoResetState } from '@/redux/reducers/studentInfoReducer';

const Profile = () => {
  const clerk = useClerk();
  const router = useAppRouter();
  const dispatch = useAppDispatch();

  function handleSignout() {
    // TODO: Disable all buttons while signing out.
    clerk.signOut().finally(() => {
      dispatch(authenticationResetState());
      dispatch(certificateResetState());
      dispatch(gradeResetState());
      dispatch(internshipResetState());
      dispatch(studentInfoResetState());
      router.replace('/student/signin');
    });
  }

  return (
    <div>
      <Heading text="Student Profile" type="TITLE" />

      <div className="grid bg-violet-400 p-2">
        <button
          className="h-12 rounded-lg bg-red-500 px-2 py-1 text-white shadow-sm"
          onClick={handleSignout}
        >
          Signout
        </button>
      </div>
    </div>
  );
};

export default Profile;
