const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devServer = (isDev) => !isDev ? {} : { //в каком режиме у нас проект в разработке или нет, если да, возвращаем объект
    devServer: {
        open: true, //автоматически запуск браузера при запуске сервера
        hot: true, //горячая перезагрузка hot module replacement
        port: 8080,
    }
}

module.exports = ({develop}) => ({
    mode: develop ? 'development' : 'production', //чтобы каждый раз не обновлять вручную проект при изменениях (это режим/настройка для минимизации файлов и удалении комментов для уменьшения размера бандла )
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    /*assetModuleFilename: 'images/[hash][ext][query]', убираем тк переписали типа у картинок в inline */
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
        filename: './styles/main.css'
    })
  ],
  module: {
    rules: [        
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/inline',
            },       
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    },
    ...devServer(develop), // оператор ... распаковывает результат функции, после вызова ф-ия возвращает наш объект из devServer
});