import type {
  HeadingType,
  HeadingAlignment,
} from '@/lib/schema/components/headingProps';
import React from 'react';

type HeadingProps = {
  type: HeadingType;
  text: string;
  alignment?: HeadingAlignment;
};

function getTextAlignment(alignment: HeadingProps['alignment']) {
  switch (alignment) {
    case 'START':
      return 'text-start';
    case 'CENTER':
      return 'text-center';
    case 'END':
      return 'text-end';
  }
}

const Heading = (props: HeadingProps) => {
  switch (props.type) {
    case 'TITLE':
      return (
        <h1
          className={`text-bold font-geist-mono text-xl ${getTextAlignment(props.alignment ?? 'CENTER')}`}
        >
          {props.text}
        </h1>
      );
    case 'SUB_TITLE':
      return (
        <h3
          className={`text-medium font-geist-mono text-lg ${getTextAlignment(props.alignment ?? 'CENTER')}`}
        >
          {props.text}
        </h3>
      );
  }
};

export default Heading;
