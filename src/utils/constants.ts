/** These are the keys passed in the NextJS's middleware as identifier in the request headers. */
export const HEADER_KEY = {
  origin: 'x-origin',
  pathname: 'x-pathname',
  role: 'x-role',
  specialization: 'x-specialization',
  studentNumber: 'x-studentNumber',
  studentType: 'x-studentType',
  uid: 'x-uid',
  url: 'x-url',
};
/** URL consists of '/'. */
export const ROUTE_DIVIDER = '/' as const;
/** Default route of the app. */
export const ABOUT_ROUTE = `${ROUTE_DIVIDER}` as const;

// The following will be used for setting state that needs to be the same type but is invalid.
export const EMPTY_STRING = '';
export const WRONG_NUMBER = NaN;
