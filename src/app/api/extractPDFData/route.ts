'server only';

import type { ExtractedCOGData } from '@/lib/schema/apiDataResponse/extractedCOGData';
import { EMPTY_STRING } from '@/utils/constants';
import parsingStatus from '@/utils/parsingStatus';
import type { ApiResponse } from '@/utils/types/apiResponse';
import PDFParser, { type Output } from 'pdf2json';

type FinalResponse = ApiResponse<ExtractedCOGData>;
type ParsingStatus = (typeof parsingStatus)[number];

export async function POST(request: Request): Promise<Response> {
  const pdfParser = new PDFParser(true);
  /** Default data, No transaction. */
  const data = {
    body: EMPTY_STRING,
    footer: EMPTY_STRING,
    header: EMPTY_STRING,
  };

  const headerTexts: string[] = [];
  const bodyTexts: string[] = [];
  const footerTexts: string[] = [];

  const formdata = await request.formData();
  const documentHolder = formdata.get('file') as File | null;

  if (!documentHolder) {
    return Response.json(
      {
        data: data,
        errorMessage: ['No file provided.'],
      } as FinalResponse,
      {
        status: 411,
      }
    );
  }

  return new Promise((resolve) => {
    pdfParser.on('pdfParser_dataError', (errData) => {
      resolve(
        Response.json(
          {
            data: data,
            errorMessage: [errData.parserError.message ?? EMPTY_STRING],
          } as FinalResponse,
          { status: 500 }
        )
      );
    });

    pdfParser.on('pdfParser_dataReady', (pdfData: Output) => {
      const uriEncodedRegExp = { comma: /%2C/g, colon: /%3A/g };
      const normalEncoding = { comma: ',', colon: ':' };
      const endingSigns = { header: 'REMARKS', body: 'nothing follows' };

      pdfData.Pages.forEach((page) => {
        let parsingStatus: ParsingStatus = 'header';
        page.Texts.forEach((text) => {
          const decodedText = `${decodeURI(text.R[0].T).replace(
            uriEncodedRegExp.colon,
            normalEncoding.colon
          )} `;

          if (decodedText.includes(endingSigns.body)) {
            parsingStatus = 'footer';
          }

          switch (parsingStatus) {
            case 'header':
              headerTexts.push(decodedText);
              break;
            case 'body':
              bodyTexts.push(decodedText);
              break;
            case 'footer':
              footerTexts.push(decodedText);
              break;
          }

          if (decodedText.includes(endingSigns.header)) {
            parsingStatus = 'body';
          }
        });
      });

      /** Final result of extracted data from COG PDF. */
      const transactedData = {
        header: headerTexts
          .join(EMPTY_STRING)
          .replace(uriEncodedRegExp.comma, normalEncoding.comma)
          .trimEnd(),
        body: bodyTexts
          .join(EMPTY_STRING)
          .replace(uriEncodedRegExp.comma, normalEncoding.comma)
          .trimEnd(),
        footer: footerTexts
          .join(EMPTY_STRING)
          .replace(uriEncodedRegExp.comma, normalEncoding.comma)
          .trimEnd(),
      };

      resolve(
        Response.json({
          data: transactedData,
          errorMessage: [],
        } as FinalResponse)
      );
    });

    documentHolder
      .arrayBuffer()
      .then((arrayBuffer) => pdfParser.parseBuffer(Buffer.from(arrayBuffer)));
  });
}
