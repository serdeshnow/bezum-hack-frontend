module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order',
  ],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    /* Colors */
    'color-hex-length': 'long',
    // "color-named": "never", // Disallow using named colors

    /* Nesting */
    'max-nesting-depth': 3,

    /* Selectors */
    'selector-class-pattern': [
      '^[a-zA-Z][a-zA-Z0-9]+$',
      {
        message: 'Class name should be camelCase',
        severity: 'error',
      },
    ],
    'selector-max-compound-selectors': 3,
    'selector-max-id': 0,
    'selector-max-pseudo-class': 2, // Disallow `.classSelector:hover:focus:active`

    /* Duplicating */
    'block-no-empty': true,
    'declaration-no-important': true,
    'no-duplicate-selectors': true,
    'declaration-block-no-duplicate-properties': true,

    /* SCSS */
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'blockless-after-blockless', 'inside-block'],
        ignoreAtRules: ['use'],
      },
    ],
    'scss/selector-no-redundant-nesting-selector': true,

    /* SCSS - comments */
    'scss/double-slash-comment-whitespace-inside': 'always', // Whitespace after `//`
    'scss/comment-no-empty': true, // Disallow empty comments
    'scss/comment-no-loud': null, // Allow `/* */` and `//`

    /* SCSS - mixins */
    'scss/at-mixin-pattern': ['^([a-z][a-z0-9-]+)$',
      {
        message: 'Mixin name should be kebab-case',
        severity: 'error',
      },],
    'scss/no-duplicate-mixins': true,

    /* SCSS - vars */
    'scss/dollar-variable-pattern': [
      '^[a-zA-Z][a-zA-Z0-9]+$',
      {
        message: 'SCSS variable should be camelCase',
        severity: 'error',
      },
    ],
    'scss/dollar-variable-no-missing-interpolation': true, // Disallow using vars without #{}
    'scss/dollar-variable-colon-space-after': 'always-single-line' /* Expect
      whitespace at: $color:blue */,

    /* Ordering */
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-order': [],

    /* Units */
    'declaration-property-unit-disallowed-list': {
      "/^margin|^padding|^gap/": ['px']
    },
    // 'unit-disallowed-list': [
    //   'px',
    //   {
    //     message: 'Do not use "px" unit',
    //     severity: 'warning', // Warning using px
    //   },
    // ],
  },

  /* Disable Stylelint rules */
  overrides: [
    {
      files: ['src/shared/styles/abstracts/**'],
      rules: {
        'scss/at-if-closing-brace-newline-after': null,
        'scss/at-if-closing-brace-space-after': null,
      },
    },
  ],

  ignoreFiles: ['src/shared/styles/base/**', 'src/shared/styles/abstracts/_mixins.scss'],
  // defaultSeverity: 'warning',
};
