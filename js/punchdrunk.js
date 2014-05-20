(function() {
  var conf;

  shine.stdout.write = function() {
    return console.log.apply(console, arguments);
  };

  conf = {
    window: {},
    modules: {}
  };

  new shine.FileManager().load('./lua/conf.lua.json', function(_, file) {
    var conf_env, conf_vm, vm;
    conf_env = {
      love: {}
    };
    conf_vm = new shine.VM(conf_env);
    conf_vm.execute(null, file);
    conf_env.love.conf.call(null, conf);
    vm = new shine.VM({
      love: new Love(conf.window)
    });
    return vm.load('./js/boot.lua.json');
  });

}).call(this);
