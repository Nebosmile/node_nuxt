const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const config = require('./config.js');



var app = new Koa();
app.use(async (ctx, next) => {
  // in the future we'll extend this
  ctx.set('Access-Control-Allow-Origin', '*');

  await next();
});

const handlers = fs.readdirSync('./handlers').sort();
handlers.forEach((handler)=>require('./handlers/'+ handler).init(app));



// console.log(handlers);
// app.use(require('./routers').routes());

const {Nuxt, Builder} = require('nuxt')
const options = {}

const nuxt = new Nuxt(options);
async function builderok (){
    const builder = new Builder(nuxt)
    await builder.build()
}
 builderok();

app.use(async (ctx, next) => {
    await next()
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
})


app.listen(config.port)
