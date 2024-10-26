// type RegExpList = Record<string, RegExp | string>;

const regExp = {
  email:
    /^(([^<>()[\],;:\s@"]+(.[^<>()[\],;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/,
} as const;

export default regExp;
