const path = require('path');
// const { createDefaultConfig } = require('@open-wc/building-webpack');

// if you need to support IE11 use "modern-and-legacy-config" instead.
// const { createCompatibilityConfig } = require('@open-wc/building-webpack');
// module.exports = createCompatibilityConfig({
//   input: path.resolve(__dirname, './index.html'),
// });

// module.exports = createDefaultConfig({
//   input: path.resolve(__dirname, './index.html'),
// });

module.exports = {

  entry: "./src/views/login/borsuk-login-app.js",
  // entry: "./src/views/startmenu/borsuk-menu-app.js",
  output:  {
    path: path.resolve(__dirname, "./src/views/login"),
    filename: "borsuk-login-bundle.js"
  },
	
	module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            // plugins: ["@babel/plugin-proposal-decorators", { "legacy": true }]
                            // plugins: ['transform-decorators-legacy', {decoratorsBeforeExport: false}]
                            // plugins: ["syntax-dynamic-import"]
                        }
                    }
                },
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "polymer-webpack-loader",
                        options: {
                            // plugins: ["syntax-dynamic-import"]
                        }
                    }
                },
                {
                    test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
                    use: [{
                        // loader: "url-loader",
                        loader: 'file-loader',
                        options: {
                            // limit: 10000,
                            // name: "[name].[ext]",
                            // includePaths: ['./src/img']
                        }
                    },
                    { loader: 'image-webpack-loader' }]
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-inline-loader'
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "awesome-typescript-loader",
                        // query: {
                        //     useBabel: true
                        // }
                    }
                }
            ]
        },

};
