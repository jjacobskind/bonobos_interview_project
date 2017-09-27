import path from 'path';
import merge from 'lodash/merge';
import loaders from './loaders';
import {serverPlugins} from './queuePlugins';
import {rootDir, serverBuildDir, publicDir} from './directoryPaths';

const STATIC_PROPERTIES = {
  devtool: 'sourcemap',
  recordsPath: path.resolve(publicDir, 'webpack.records.json'),
  output: {
    path: serverBuildDir,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  target: 'node',
  externals: /^[a-z][a-z\.\-0-9]*$/,
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: true,
    __dirname: true
  },
  module : { rules: loaders },
};

export default (options) => {
  const {isDevelopmentBuild} = options;
  const plugins = serverPlugins(isDevelopmentBuild);

  let entry = [path.resolve(rootDir, 'server', 'index.js')];
  if(isDevelopmentBuild) { entry.push('webpack/hot/poll?1000'); }

  const config = merge(STATIC_PROPERTIES, {
    entry,
    plugins: plugins
  });

  return config;
};
