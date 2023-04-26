import {rest} from 'msw'

export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    const result = await req.json();
    if (result.id && result.pw) {
      if (result.id === 'admin' && result.pw === '1q2w3e') {
        return res(
          ctx.delay(2000),
          ctx.status(200),
          ctx.cookie('sessionkey', 'qqqqq')
        )
      }
    }
    return res(
      ctx.delay(2000),
      ctx.status(400)
    )
  }),

  rest.get('/auth', (req, res, ctx) => {
    console.log(req.cookies);
    
    if ('sessionkey' in req.cookies && req.cookies['sessionkey'] === 'qqqqq') {
      return res(
        ctx.delay(2000),
        ctx.status(200)
      )
    } else {
      return res(
        ctx.delay(2000),
        ctx.status(400)
      )
    }
  })
]