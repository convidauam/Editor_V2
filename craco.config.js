const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Permitir que webpack procese TypeScript desde node_modules/@convida/frontend
      const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
      
      if (oneOfRule) {
        // Encontrar el loader de TypeScript/JavaScript
        const tsLoader = oneOfRule.oneOf.find(
          (rule) =>
            rule.test &&
            rule.test.toString().includes('tsx') &&
            rule.loader &&
            rule.loader.includes('babel-loader')
        );

        if (tsLoader) {
          // Modificar la regla de include para permitir procesar @convida/frontend
          tsLoader.include = [
            tsLoader.include,
            path.resolve(__dirname, 'node_modules/@convida/frontend')
          ];
        }
      }

      return webpackConfig;
    },
  },
};
