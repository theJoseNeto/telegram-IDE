const command = {
  name: 'run-code',
  run: async (toolbox) => {
    const { print } = toolbox

    print.info('Welcome to your CLI')
  },

}

module.exports = command
