import {rest} from 'msw'

export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    const result = await req.json();
    if (result.id && result.pw) {
      // 로그인 성공
      if (result.id === 'admin' && result.pw === '1q2w3e') {
        return res(
          ctx.delay(2000),
          ctx.status(200),
          ctx.cookie('sessionkey', 'qqqqq'),
          ctx.body(JSON.stringify({
            id: 12345,
            name: "티코",
            division: "안전관리 3팀",
          }))
        )
      }
    }
    // 로그인 실패
    return res(
      ctx.delay(2000),
      ctx.status(400)
    )
  }),

  rest.get('/auth', (req, res, ctx) => {
    if ('sessionkey' in req.cookies && req.cookies['sessionkey'] === 'qqqqq') {
      return res(
        ctx.delay(2000),
        ctx.status(200),
        ctx.body(JSON.stringify({
          id: 12345,
          name: "티코",
          division: "안전관리 3팀",
        }))
      )
    } else {
      return res(
        ctx.delay(2000),
        ctx.status(400)
      )
    }
  })
]