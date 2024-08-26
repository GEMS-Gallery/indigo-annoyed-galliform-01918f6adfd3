export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'addItem' : IDL.Func([IDL.Text], [Result], []),
    'getItems' : IDL.Func([], [IDL.Opt(IDL.Vec(IDL.Text))], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
