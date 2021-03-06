/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var ConcatSource = require("webpack-core/lib/ConcatSource");

function JsonpExportMainTemplatePlugin(name) {
	this.name = name;
}
module.exports = JsonpExportMainTemplatePlugin;
JsonpExportMainTemplatePlugin.prototype.apply = function(mainTemplate) {
	mainTemplate.plugin("render", function(source, chunk, hash) {
		var name = this.applyPluginsWaterfall("asset-path", this.name || "", {
			hash: hash,
			chunk: chunk
		});
		return new ConcatSource(name + "(", source, ");");
	}.bind(this));
	mainTemplate.plugin("global-hash-paths", function(paths) {
		if (this.name) paths.push(this.name);
		return paths;
	}.bind(this));
	mainTemplate.plugin("hash", function(hash) {
		hash.update("jsonp export");
		hash.update(this.name + "");
	}.bind(this));
};
