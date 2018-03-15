export default (options = {}) => {
    return tree => new Promise((resolve, reject) => {
        const {tags, nonce} = options;

        if (!tags && !nonce) {
            resolve(tree);
        }

        if (!Array.isArray(tags)) {
            reject(new Error(`tags must be Array`));
        }

        if (!Array.isArray(tree)) {
            reject(new Error(`tree is not Array`));
        }

        if (tree.length === 0) {
            resolve(tree);
        }

        tree.walk(node => {
            let {tag, attrs} = node;

            if (tags.includes(tag)) {
                if (!attrs) {
                    attrs = {};
                }

                node.attrs = Object.assign(attrs, {nonce});
            }

            return node;
        });

        resolve(tree);
    });
};
