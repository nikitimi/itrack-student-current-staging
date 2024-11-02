'use client';

import React from 'react';

import Heading from '@/components/Heading';
import useModuleInputController from '@/hooks/useModuleInputController';
import useRevealAllModulesResult from '@/hooks/useRevealAllModulesResult';

const ModuleResults = () => {
  const {
    isCertificateModuleCompleted,
    isGradesModuleCompleted,
    isInternshipModuleCompleted,
  } = useModuleInputController();
  const { certificate, grades, internship, jobHolder } =
    useRevealAllModulesResult();

  return (
    <>
      <div className="grid grid-cols-3">
        <section className="bg-blue-500">
          <Heading text="Certificates:" type="SUB_TITLE" />
          <div>
            {isCertificateModuleCompleted ? (
              certificate.map(([key, number], index) => {
                //   handleIncrementJobState(key as PossibleJob, points);
                console.log({ key, number });

                return (
                  <div key={key} className="flex justify-between px-4 text-sm">
                    <p className="capitalize text-foreground">
                      {key.replace(/_/g, ' ').toLocaleLowerCase()}
                    </p>
                    {/* <p>{number}</p> */}
                    <p>{index + 1}</p>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </section>
        <section className="bg-blue-700">
          <Heading text="Academic grades:" type="SUB_TITLE" />
          <div>
            {isGradesModuleCompleted ? (
              grades?.map(([key, number], index) => {
                // const gradeRoundedOff = Math.floor(number)
                //   handleIncrementJobState(key as PossibleJob, points);
                console.log({ key, number });

                return (
                  <div key={key} className="flex justify-between px-4 text-sm">
                    <p className="capitalize text-foreground">
                      {key.replace(/_/g, ' ').toLocaleLowerCase()}
                    </p>
                    <p>{index + 1}</p>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </section>
        <section className="bg-blue-500">
          <Heading text="Internship:" type="SUB_TITLE" />
          <div>
            {isInternshipModuleCompleted ? (
              internship.map(([key, number], index) => {
                // handleIncrementJobState(key as PossibleJob, points);
                console.log({ key, number });

                return (
                  <div key={key} className="flex justify-between px-4 text-sm">
                    <p className="capitalize text-foreground">
                      {key.replace(/_/g, ' ').toLocaleLowerCase()}
                    </p>
                    {/* <p>{number}</p> */}
                    <p>{index + 1}</p>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </section>
      </div>
      <div className="grid grid-cols-1">
        {Object.entries(jobHolder).map(([key, number]) => {
          return (
            <div key={key} className="flex justify-between px-4">
              <p>{key}</p>
              <p>{number}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ModuleResults;
