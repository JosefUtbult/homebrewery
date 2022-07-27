const fs = require('fs-extra');
const zlib = require('zlib');
const browserify = require('browserify');
const bl = require('bl');
const { minify } = require("terser");
const Proj = require('./project.json');

const { pack, watchFile, livereload } = require('vitreum');
const isDev = !!process.argv.find((arg)=>arg=='--dev');

const lessTransform  = require('vitreum/transforms/less.js');
const assetTransform = require('vitreum/transforms/asset.js');
const babel          = require('@babel/core');
const less           = require('less');
const { writeFileSync, writeFile } = require('fs');

const babelify = async (code)=>(await babel.transformAsync(code, { presets: [['@babel/preset-env', { 'exclude': ['proposal-dynamic-import'] }], '@babel/preset-react'], plugins: ['@babel/plugin-transform-runtime'] })).code;

const transforms = {
	'.js'   : (code, filename, opts)=>babelify(code),
	'.jsx'  : (code, filename, opts)=>babelify(code),
	'.less' : lessTransform,
	'*'     : assetTransform('./build')
};

const build = async ({ bundle, render, ssr })=>{
	const css = await lessTransform.generate({ paths: './shared' });
	await fs.outputFile('./build/homebrew/bundle.css', css);
	await fs.outputFile('./build/homebrew/bundle.js', bundle);
	await fs.outputFile('./build/homebrew/ssr.js', ssr);

	await fs.copy('./client/homebrew/favicon.ico', './build/assets/favicon.ico');

	//compress files in production
	if(!isDev){
		await fs.outputFile('./build/homebrew/bundle.css.br', zlib.brotliCompressSync(css));
		await fs.outputFile('./build/homebrew/bundle.js.br', zlib.brotliCompressSync(bundle));
		await fs.outputFile('./build/homebrew/ssr.js.br', zlib.brotliCompressSync(ssr));
	} else {
		await fs.remove('./build/homebrew/bundle.css.br');
		await fs.remove('./build/homebrew/bundle.js.br');
		await fs.remove('./build/homebrew/ssr.js.br');
	}
};

fs.emptyDirSync('./build');


(async ()=>{

	//v==----------------------------- COMPILE THEMES --------------------------------==v//

	// Update list of all Theme files
	const themes = { Legacy: {}, V3: {} };

	let themeFiles = fs.readdirSync('./themes/Legacy');
	for (dir of themeFiles) {
		const themeData = JSON.parse(fs.readFileSync(`./themes/Legacy/${dir}/settings.json`).toString());
		themeData.path = dir;
		themes.Legacy[dir] = (themeData);
		//fs.copy(`./themes/Legacy/${dir}/dropdownTexture.png`, `./build/themes/Legacy/${dir}/dropdownTexture.png`);
		const src = `./themes/Legacy/${dir}/style.less`;
		((outputDirectory)=>{
			less.render(fs.readFileSync(src).toString(), {
				compress : !isDev
			}, function(e, output) {
				fs.outputFile(outputDirectory, output.css);
			});
		})(`./build/themes/Legacy/${dir}/style.css`);

	}

	themeFiles = fs.readdirSync('./themes/V3');
	for (dir of themeFiles) {
		const themeData = JSON.parse(fs.readFileSync(`./themes/V3/${dir}/settings.json`).toString());
		themeData.path = dir;
		themes.V3[dir] = (themeData);
		fs.copy(`./themes/V3/${dir}/dropdownTexture.png`, `./build/themes/V3/${dir}/dropdownTexture.png`);
		const src = `./themes/V3/${dir}/style.less`;
	  ((outputDirectory)=>{
			less.render(fs.readFileSync(src).toString(), {
				compress : !isDev
			}, function(e, output) {
				fs.outputFile(outputDirectory, output.css);
			});
		})(`./build/themes/V3/${dir}/style.css`);
	}

	await fs.outputFile('./themes/themes.json', JSON.stringify(themes, null, 2));

	// await less.render(lessCode, {
	// 	compress  : !dev,
	// 	sourceMap : (dev ? {
	// 		sourceMapFileInline: true,
	// 		outputSourceFiles: true
	// 	} : false),
	// })

	// Move assets
	await fs.copy('./themes/fonts', './build/fonts');
	await fs.copy('./themes/assets', './build/assets');

	//v==----------------------------- BUNDLE PACKAGES --------------------------------==v//

	const bundles = await pack('./client/homebrew/homebrew.jsx', {
		paths : ['./shared', './'],
		libs  : Proj.libs,
		dev   : isDev && build,
		transforms
	});
	build(bundles);

	// Possible method for generating separate bundles for theme snippets: factor-bundle first sending all common files to bundle.js, then again using default settings, keeping only snippet bundles
	// await fs.outputFile('./build/junk.js', '');
	// await fs.outputFile('./build/themes/Legacy/5ePHB/snippets.js', '');
	//
	// const files = ['./client/homebrew/homebrew.jsx','./themes/Legacy/5ePHB/snippets.js'];
	//
	// bundles = await pack(files, {
	// 	dedupe: false,
	// 	plugin : [['factor-bundle', { outputs: [ './build/junk.js','./build/themes/Legacy/5ePHB/snippets.js'], threshold : function(row, groups) {
	// 		console.log(groups);
	//     if (groups.some(group => /.*homebrew.jsx$/.test(group))) {
	// 			console.log("found homebrewery")
	// 			return true;
	// 		}
	//     return this._defaultThreshold(row, groups);
	// 	}}]],
	// 	paths  : ['./shared','./','./build'],
	// 	libs   : Proj.libs,
	// 	dev    : isDev && build,
	// 	transforms
	// });
	// build(bundles);
	//

})().catch(console.error);

// Uses Browserify to build a standalone parser containing the parser in markdown.js and all its required modules
(async()=>{
	const INPUT_FILEPATH = './client/homebrew/parser/homebreweryParser.js';
	const OUTPUT_DIR_PATH = './build/parser'
	const OUTPUT_FILEPATH = OUTPUT_DIR_PATH + '/homebreweryParser.js';

	if (!fs.existsSync(OUTPUT_DIR_PATH)){
		fs.mkdirSync(OUTPUT_DIR_PATH);
	}
	const bundle = browserify(INPUT_FILEPATH, {standalone: 'homebreweryParser'})
		.bundle()
		// I hate pipes...
		.pipe(fs.createWriteStream(OUTPUT_FILEPATH)).on("close", async () =>{
			// To write and then read the output file is kinda bad, but I cant be bothered to figure out how to 
			// do it with pipes
			var result = await minify((await fs.readFile(OUTPUT_FILEPATH)).toString(), { sourceMap: false });
			writeFile(OUTPUT_FILEPATH, result.code, (err)=>{
				if(err){
					console.log(err);
				}
			});
		});
})().catch(console.error);

//In development set up a watch server and livereload
if(isDev){
	livereload('./build');
	watchFile('./server.js', {
		watch : ['./client', './server'] // Watch additional folders if you want
	});
}
