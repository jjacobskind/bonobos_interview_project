import ExtractTextPlugin from 'extract-text-webpack-plugin';

const cssLoaders = ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!resolve-url-loader!postcss-loader?sourceMap' });
const scssLoaders = ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!resolve-url-loader!postcss-loader?sourceMap!sass-loader' });

export default [
  { test: /\.(js|jsx)$/, use: ['babel-loader'], exclude: [/node_modules/, /__tests__/] },
  { test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/, use: 'file-loader?limit=10000&name=[sha512:hash:base64:7].[ext]' },
  { test: /\.mp4$/, use: 'file-loader' },
  { test: /\.css$/, use: cssLoaders },
  { test: /\.scss$/, use: scssLoaders },
  { test: /\.json$/, use: 'json-loader' }
];
