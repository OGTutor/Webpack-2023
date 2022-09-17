const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const devMode = process.env.NODE_ENV === 'development';
const prodMode = !devMode;

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all',
		},
	};
	if (prodMode) {
		config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()];
	}
	return config;
};

const cssLoaders = extra => {
	const loaders = [
		devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
		'css-loader',
	];

	if (extra) {
		loaders.push(extra);
	}

	return loaders;
};

const babelOptions = preset => {
	const options = {
		presets: ['@babel/preset-env'],
	};

	if (preset) {
		options.presets.push(preset);
	}

	return options;
};

const plugins = () => {
	const base = [
		new HTMLWebpackPlugin({
			template: './index.html',
			minify: { collapseWhitespace: prodMode },
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/icon.ico'),
					to: path.resolve(__dirname, 'dist'),
				},
			],
		}),
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : '[name].[hash].css',
		}),
		new ESLintPlugin(),
	];

	if (prodMode) {
		base.push(new BundleAnalyzerPlugin());
	}

	return base;
};

console.log('devMode:', devMode);

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: './index.jsx',
		analytics: './analytics.ts',
	},
	output: {
		filename: devMode ? '[name].js' : '[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	optimization: optimization(),
	devServer: {
		port: 4200,
		open: true,
		hot: devMode,
	},
	devtool: devMode ? 'source-map' : false,
	plugins: plugins(),
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelOptions(),
				},
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-typescript'),
				},
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-react'),
				},
			},
			{
				test: /\.css$/i,
				use: cssLoaders(),
			},
			{
				test: /\.less$/i,
				use: cssLoaders('less-loader'),
			},
			{
				test: /\.(sass|scss)$/i,
				use: cssLoaders('sass-loader'),
			},
			{
				test: /\.(png|jpg|gif|svg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.xml$/i,
				use: ['xml-loader'],
			},
			{
				test: /\.csv$/i,
				use: ['csv-loader'],
			},
		],
	},
};
