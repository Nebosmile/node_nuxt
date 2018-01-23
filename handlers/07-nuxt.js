// import { Nuxt, Builder } from 'nuxt'
const {Nuxt, Builder} = require('nuxt')
const options = {}

const nuxt = new Nuxt(options)

exports.init = app=>app.use(async (ctx, next) => {
    await next()
    // ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    // return new Promise((resolve, reject) => {
    //   ctx.res.on('close', resolve)
    //   ctx.res.on('finish', resolve)
    //   nuxt.render(ctx.req, ctx.res, promise => {
    //     // nuxt.render passes a rejected promise into callback on error.
    //     promise.then(resolve).catch(reject)
    //   })
    // })
})
