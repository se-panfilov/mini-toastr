var fs = require('fs');
var path = require('path');
var find = require('findit');

exports.modules = function (name) {
    var pkgdir = path.dirname(require.resolve(name + '/package.json'));
    var pkg = JSON.parse(fs.readFileSync(pkgdir + '/package.json', 'utf8'));
    
    var main = require.resolve(name);
    
    var modules = {};
    modules[name] = fs.readFileSync(main);
    modules[name + '/package.json'] = pkg;
    
    if (pkg.directories && pkg.directories.lib) {
        var libdir = path.resolve(pkgdir, pkg.directories.lib);
        
        find.sync(libdir)
            .filter(function (lib) {
                return lib.match(/\.js$/)
                    && path.resolve(libdir, lib) !== main
                    && !path.basename(lib).match(/^\./)
                ;
            })
            .forEach(function (lib) {
                var src = fs.readFileSync(lib);
                var p = lib.slice(libdir.length)
                    .replace(/\.js$/,'');
                modules[name + '/lib' + p] = src;
            })
        ;
    }
    else if (path.existsSync(pkgdir + '/lib')) {
        find.sync(pkgdir + '/lib')
            .filter(function (lib) {
                return lib.match(/\.js$/)
                    && path.resolve(pkgdir + '/lib', lib) !== main
                    && !path.basename(lib).match(/^\./)
                ;
            })
            .forEach(function (lib) {
                var src = fs.readFileSync(lib);
                var p = lib.slice((pkgdir + '/lib').length)
                    .replace(/\.js$/,'');
                modules[name + '/lib' + p] = src;
            })
        ;
    }
    
    var bins = [ pkg.bin, pkg.directories && pkg.directories.bin ]
        .map(function (bin) {
            return bin && (pkgdir + '/' + bin)
        })
        .filter(function (bin) {
            return path.existsSync(bin)
        })
    ;
    
    fs.readdirSync(pkgdir)
        .filter(function (file) {
            return file.match(/\.js$/)
                && !path.basename(file).match(/^\./)
                && bins.indexOf(pkgdir + '/' + file) < 0
                && pkgdir + '/' + file !== main
            ;
        })
        .forEach(function (file) {
            var p = name + '/' + file.replace(/\.js$/, '');
            modules[p] = fs.readFileSync(pkgdir + '/' + file);
        })
    ;
    
    return modules;
};
