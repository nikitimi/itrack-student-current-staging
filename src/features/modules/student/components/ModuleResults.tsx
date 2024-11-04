'use client';

import { useEffect, useState } from 'react';

import useModuleInputController from '@/hooks/useModuleInputController';
import useRevealAllModulesResult from '@/hooks/useRevealAllModulesResult';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { SidebarMenuSkeleton } from '@/components/ui/sidebar';

const ModuleResults = () => {
  const {
    isCertificateModuleCompleted,
    isGradesModuleCompleted,
    isInternshipModuleCompleted,
  } = useModuleInputController();
  const { certificate, grades, internship, jobHolder } =
    useRevealAllModulesResult();
  const [state, setState] = useState(false);
  const results = [
    {
      title: 'certificate',
      conditionToRender: isCertificateModuleCompleted,
      objectArray: certificate,
    },
    {
      title: 'academic grades',
      conditionToRender: isGradesModuleCompleted,
      objectArray: grades ?? [],
    },
    {
      title: 'internship',
      conditionToRender: isInternshipModuleCompleted,
      objectArray: internship,
    },
    {
      title: 'overall result',
      conditionToRender: true,
      objectArray: Object.entries(jobHolder).splice(0, 3),
    },
  ];
  const titles = results.flatMap(({ title }) => title);

  useEffect(() => setState(true), []);

  if (!state)
    return (
      <>
        {titles.map((title) => (
          <RenderTable
            isLoading
            key={title}
            title={title}
            conditionToRender={true}
            objectArray={[]}
          />
        ))}
      </>
    );

  return (
    <div className="flex flex-col gap-2 p-2">
      {results.map((props) => {
        return <RenderTable key={props.title} {...props} />;
      })}
    </div>
  );
};

const RenderTable = (props: {
  title: string;
  conditionToRender: boolean;
  objectArray: Array<[string, number]>;
  isLoading?: boolean;
}) => {
  const heading = {
    one: 'careers',
    two: 'ranks',
  };
  /** TODO: CRITICAL... This causes hydration issues, please refactor. */
  function handleTableRender() {
    if (props.isLoading)
      return (
        <TableRow>
          {Array.from({ length: 6 }).map((_, index) => (
            <SidebarMenuSkeleton key={index} showIcon />
          ))}
        </TableRow>
      );

    return (
      <>
        <TableHeader className="capitalize">
          <TableRow>
            <TableHead>
              <p>{heading.one}</p>
            </TableHead>
            <TableHead>
              <p>{heading.two}</p>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.conditionToRender ? (
            props.objectArray.map(([key], index) => {
              return (
                <TableRow key={key}>
                  <TableCell className="capitalize">
                    {key.replace(/_/g, ' ').toLocaleLowerCase()}
                  </TableCell>
                  {/* <p>{number}</p> */}
                  <TableCell>{index + 1}</TableCell>
                </TableRow>
              );
            })
          ) : (
            // No results yet.
            <TableRow />
          )}
        </TableBody>
      </>
    );
  }

  return (
    <Card className="p-2">
      <CardTitle className="capitalize">{`${props.title}:`}</CardTitle>
      <CardContent>
        <Table>{handleTableRender()}</Table>
      </CardContent>
    </Card>
  );
};

export default ModuleResults;
