// TEST: must be REJECTED. defaultProps on a function component was removed in React 19.
// Configure: Inputs  title (string)
// Expected: GC-API-003.
function WithDefaultProps({ title }: { title?: string }) {
  return <h1>{title}</h1>;
}

WithDefaultProps.defaultProps = {
  title: 'Hello',
};

export default WithDefaultProps;
