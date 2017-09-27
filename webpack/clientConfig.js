import path from 'path';
import loaders from './loaders';
import {clientPlugins} from './queuePlugins';
import merge from 'lodash/merge';
import {publicDir, reactDir} from './directoryPaths';

const STATIC_PROPERTIES = {
  devtool: 'sourcemap',
  context: reactDir,
  entry: {
    app: './bootstrapper.js',
    vendors: ['react', 'react-dom', 'redux', 'react-redux', 'redux-thunk']
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve('./node_modules')]
  },
  target: 'web',
  module: { rules: loaders }
}

export default (options) => {
  const {isDevelopmentBuild} = options;
  const plugins = clientPlugins(isDevelopmentBuild);


  const config = merge(STATIC_PROPERTIES, {
    plugins,
    output: {
      path: publicDir,
      filename: '[name].js',
      publicPath: '/'
    }
  });

  return config;
};
