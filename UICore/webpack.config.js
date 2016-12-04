module.exports={
  entry : "./src/index.js",
  output : {
    path : "../public/js",
    filename : "bundle.js"
  },
  module : {
    loaders : [
      {
        test : /\.js$/,
        loader : 'babel-loader',
        exclude: /node_modules/,
        query : {
          presets : ['es2015','react'],
          plugins : ["transform-class-properties"],
          cacheDirectory: true
        }

      }
    ]
  }
}
