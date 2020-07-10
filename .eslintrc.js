module.exports = {
    root: true,
    extends: [
        '@react-native-community',
        'tslint:recommended',
        'tslint-config-standard',
        'tslint-react',
        'tslint-config-prettier',
    ],
    rules: {
        'ordered-imports': false,
        'object-literal-sort-keys': false,
        'member-ordering': false,
        'member-access': [true, 'no-public'],
        'jsx-boolean-value': false,
        'interface-name': false,
        'no-empty-interface': false,
        'no-namespace': false,
        'jsx-no-lambda': false,
        'no-extra-boolean-cast': false,
        'no-var-requires': false,
        'array-type': false,
        'no-console': {
            severity: 'warning',
        },
        linterOptions: {
            exclude: ['*.json', '**/*.json'],
        },
    },
};
