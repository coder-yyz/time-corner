module.exports = {
  mode: 'development',
  entry: '/src/index',
  output: {
    filename: "[name].js"
  },
  loaders: {
    rules: [
      {
        test: /\.ts/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      }
    ]
  }
}
