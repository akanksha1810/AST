// Reverses all identifiers except console functions

// Transforms this: function abc (baby) {.     to this        function cba(ybab) {
//	console.log('hello', baby)                                  console.log('hello', ybab)
// }                                                          }

export default function (babel) {
  const { types: t } = babel;
  
  return {
    name: "ast-transform", // not required
    visitor: {
      Identifier (path) {
        if (path.parentPath.isMemberExpression() && path.parentPath
        .get('object')
        .isIdentifier({ name: 'console' })) { return }
      	path.node.name = path.node.name
         .split('')
         .reverse()
         .join('')
      }
    }
  };
