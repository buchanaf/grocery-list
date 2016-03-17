require('babel-polyfill');
const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  appId: 'b92692d3',
  appKey: 'ed3b420c52aed783c57255daaee9c828',
  app: {
    title: 'Grocery List',
    description: 'A grocery list manager for making shopping easy. Grocery list allows for creating custom shopping lists, saving lists, and easily sharing lists between friends.',//eslint-disable-line
    head: {
      titleTemplate: 'Alex Buchanan: %s',
      meta: [
        { name: 'A grocery list manager for making shopping easy. Grocery list allows for creating custom shopping lists, saving lists, and easily sharing lists between friends.' },//eslint-disable-line
      ],
    },
  },

}, environment);
