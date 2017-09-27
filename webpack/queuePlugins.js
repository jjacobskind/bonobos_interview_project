import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import Clean from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {rootDir, serverBuildDir, publicDir} from './directoryPaths';

const processVars = {
  'process.env': {
    BROWSER: JSON.stringify(true)
  }
};

const _commonPlugins = (isDevelopmentBuild) => {
  let commonPlugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('[name].css')
  ];

  if(!isDevelopmentBuild) { commonPlugins.push(new webpack.PrefetchPlugin('react')); }
  return commonPlugins;
}

export const clientPlugins = (isDevelopmentBuild) => {
  const envString = isDevelopmentBuild ? 'development' : 'production';
  processVars['process.env'].NODE_ENV = JSON.stringify(envString);
  let clientPlugins = [
    new Clean([publicDir, serverBuildDir], rootDir),
    new webpack.DefinePlugin(processVars),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors' }),
    new WebpackMd5Hash(),
    new ManifestPlugin({ fileName: '../../serverBuild/manifest.json' }),
    new webpack.optimize.OccurrenceOrderPlugin(true)
  ];

  if(!isDevelopmentBuild) {
    clientPlugins.push(new webpack.optimize.UglifyJsPlugin({warnings: false, minimize: true, sourceMap: false}));
  }

  return _commonPlugins(isDevelopmentBuild).concat(clientPlugins);
};

export const serverPlugins = (isDevelopmentBuild) => {
  let serverPlugins = [
    new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false }),
    new webpack.DefinePlugin({ __SERVER_BUILD_DIR__: JSON.stringify(serverBuildDir) })
  ];

  if(isDevelopmentBuild) { serverPlugins.push(new webpack.HotModuleReplacementPlugin()); }
  return _commonPlugins(isDevelopmentBuild).concat(serverPlugins);
};
