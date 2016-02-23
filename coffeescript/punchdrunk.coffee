class @Punchdrunk
  constructor: (config = {}) ->
    game_root = config["game_root"] or "lua"
    game_code = config["game_code"]
    element = config["canvas"] or null

    conf = {
      window: {},
      modules: {}
    }

    if game_code
      # if we were passed compiled game code directly, run that instead of the boot code
      Love.root = game_root
      love = new Love(element, conf.window, conf.modules)

      vm = new shine.VM({
        love: love
      })
      vm.load(game_code)
      love.run()
    else
      new shine.FileManager().load "#{game_root}/conf.lua.json", (_, file) ->
        if file
          conf_env = {love: {}}
          conf_vm = new shine.VM(conf_env)
          conf_vm.execute(null, file)
          conf_env.love.conf.call(null, conf)

        Love.root = game_root
        love = new Love(element, conf.window, conf.modules)

        vm = new shine.VM({
          love: love
        })

        vm._globals['package'].path = "#{game_root}/?.lua.json;#{game_root}/?.json;#{game_root}/?/init.lua.json;" + vm._globals['package'].path

        # this is boot.lua.json
        # it's convenient to have it embeded here because then we don't need to know its path
        vm.load({"sourceName":"@js/boot.lua","lineDefined":0,"lastLineDefined":0,"upvalueCount":0,"paramCount":0,"is_vararg":2,"maxStackSize":2,"instructions":[5,0,0,0,1,1,1,0,28,0,2,1,5,0,2,0,6,0,0,259,28,0,1,1,30,0,1,0],"constants":["require","main","love","run"],"functions":[],"linePositions":[1,1,1,3,3,3,3],"locals":[],"upvalues":[],"sourcePath":"js/boot.lua"})

  # Forward print() messages to the console
  shine.stdout.write = () ->
    console.log.apply(console, arguments)
