// To replace all variable bindings to its value
// Convert this: const b = {          to          const g = 'a' + 'b' + 'c' + 'e' + {
//   expression: v,                                 expression: 'a' + 'b' + 'c',
//   usage: 'uses v'                                usage: 'uses v'
// }                                              }.expression;

const c = v + 'e'

const g = c + b.expression





export default function (babel) {
  const { types: t } = babel;
  
  return {
    name: "ast-transform", // not required
    visitor: {
      Identifier (path) {
        if (path.parentPath.isVariableDeclarator()) {
        	path.scope.getBinding(path.node.name).referencePaths.map((node) => {
              	const newNode = path.parentPath.get('init').node.__clone()
            	node.replaceWith(newNode)
            })
          if (path.scope.getBinding(path.node.name).referencePaths.length) {
          	path.parentPath.parentPath._remove()
          }
        }
      }
    }
  };
}
