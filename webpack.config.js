module.exports={
	//入口文件位置
	entry:__dirname+'/js/main.jsx',
	//打包好以后输出的位置
	output:{
		path:__dirname+'/dist',
		filename:'bundle.js'
	},
	module:{
		loaders:[
			{
				loader:'babel-loader', //需要通过babel将react中jsx语法转换成js语法
				test:/\.jsx$/, //匹配jsx文件
				exclude:'node_modules',
				query:{
					presets:['es2015','react']   //将当前的代码转换成react es6 +jsx 转成 es5+js代码
				}
			}
		]
	}
};
