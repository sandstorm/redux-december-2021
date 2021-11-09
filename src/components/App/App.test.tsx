import React from 'react'
import { fireEvent, getByText, queryByText, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from './App'

// declare which API requests to mock
const server = setupServer(
  // NOTE: We use mock service worker (https://github.com/mswjs/msw) to intercept requests
  // capture "GET /greeting" requests
  rest.get('http://localhost:3007/posts', (_req, res, ctx) => {
    // respond using a mocked JSON body
    return res(
      ctx.json([
        {
          id: 1,
          title: 'First post',
          content:
            'Hey, what kind of coffee do you want? Hazelnut! Hazelnut! What if your name was Zelnut? And then I would be all like Hey, Zelnut. Thats terrible. Hey, Zelnut. Stop!',
          creationDate: '2021-10-20T13:30:00',
        },
        {
          id: 2,
          title: 'Something else entirely',
          content:
            'Eyahh! These jelly kinders arent... alive, are they? What? No, they cant even talk. Kick it! Thanks for helping me out guys. What are these buggers for, anyway? Oh, theyre decorations for my Biennial Gumball Ball. Tonight!  Sounds like it gonna be large. Yes! So very large. Id like you to be there as my special guest. You want me to go with you to the ball? Heck yes. As my pal! Oh. Right. It starts at seven, so dont be late! Fionna, we got trouble! My tail is totally frizzin out! Ill check it out.',
          creationDate: '2021-10-20T13:40:00',
        },
      ])
    )
  })
)

describe('navigation', () => {
  // establish API mocking before all tests
  beforeAll(() => server.listen())
  // reset any request handlers that are declared as a part of our tests
  // (i.e. for testing one-time error scenarios)
  afterEach(() => server.resetHandlers())
  // clean up once the tests are done
  afterAll(() => server.close())

  describe('links', () => {
    it('renders learn home link', () => {
      render(<App />)
      const linkElement = screen.getByRole('link', { name: /home/i })
      expect(linkElement).toBeInTheDocument()
    })

    it('should select Home link by default', () => {
      render(<App />)
      const linkElement = screen.getByRole('link', { name: /home/i })
      expect(linkElement).toHaveAttribute('class', 'active')
    })

    it('renders "Create" link', () => {
      render(<App />)
      const linkElement = screen.getByText('Create')
      expect(linkElement).toBeInTheDocument()

      fireEvent.click(linkElement)

      const createPostTitle = screen.getByText('Create Post')
      expect(createPostTitle).toBeInTheDocument()
    })
  })

  describe('routes', () => {
    it('should show warning if posts could not be loaded', async () => {
      server.use(
        // override the initial "GET /greeting" request handler
        // to return a 500 Server Error
        rest.get('http://localhost:3007/posts', (_req, res, ctx) => {
          return res(ctx.status(500))
        })
      )

      // TODO Fragen:
      // * warum ist er hier noch auf der create route? (bin davon ausgegangen, das die renders independent sind)
      // * warum ist die component angeblich zwischendurch ge-unmounted?

      render(<App />)
      const linkElement = screen.getByRole('link', { name: /home/i })
      fireEvent.click(linkElement)

      const loadingEl = await screen.findByText(/loading/i)
      expect(loadingEl).toBeInTheDocument()

      const warningEl = await screen.findByText(/unable to/i)
      expect(warningEl).toBeInTheDocument()
    })

    it('should show posts if they could be loaded', async () => {
      render(<App />)
      const linkElement = screen.getByRole('link', { name: /home/i })
      fireEvent.click(linkElement)

      expect(screen.getByText(/loading/i)).toBeInTheDocument()
      const post = await screen.findByText(/first post/i)
      expect(post).toBeInTheDocument()
    })

    it('navigate to create post route on "Create" link click', () => {
      render(<App />)
      const linkElement = screen.getByText('Create')

      fireEvent.click(linkElement)

      const createPostTitle = screen.getByText('Create Post')
      expect(createPostTitle).toBeInTheDocument()
    })
  })
})
