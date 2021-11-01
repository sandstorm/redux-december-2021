describe('Fetch posts', () => {
  // Note: this test needs an actual API to run (full e2e test)
  it('redirect from root to posts and fetch posts', () => {
    cy.visit('/')

    cy.url().should('eq', 'http://localhost:3000/posts')

    cy.get('h1').contains('Post')

    cy.get('.post-listing .post-listing-item')
  })

  // This test stubs the response and uses our fixture file 'posts.json' instead
  it('a post can be deleted', () => {
    cy.intercept('http://localhost:3007/posts', { fixture: 'posts.json' })
    cy.visit('/posts')
    cy.get('.post-listing .post-listing-item').should('have.length', 5)
    cy.get('.post-listing .post-listing-item').contains(/first post/i) // search for item with first post headline (case-insensitive)

    cy.intercept('DELETE', 'http://localhost:3007/posts/1').as('deletePost1')
    cy.intercept('http://localhost:3007/posts', {
      body: [
        {
          id: 2,
          title: 'Something else entirely',
          content:
            'Eyahh! These jelly kinders arent... alive, are they? What? No, they cant even talk. Kick it! Thanks for helping me out guys. What are these buggers for, anyway? Oh, theyre decorations for my Biennial Gumball Ball. Tonight!  Sounds like it gonna be large. Yes! So very large. Id like you to be there as my special guest. You want me to go with you to the ball? Heck yes. As my pal! Oh. Right. It starts at seven, so dont be late! Fionna, we got trouble! My tail is totally frizzin out! Ill check it out.',
          creationDate: '2021-10-20T13:40:00',
        },
        {
          id: 3,
          title: 'Mathmatical!',
          content:
            'Every hundred years, it spews evil spores across the land. Then lets burn its butt down to the roof rubbins. (The duo walks forward.) Finn, I can feel a bunch a eyeballs peepin us from the woods. Hhyuuugs!',
          creationDate: '2021-10-21T14:40:00',
        },
        {
          id: 4,
          title: 'Test',
          content: 'something',
          creationDate: '2021-10-20T14:00:00',
        },
        {
          id: '2b9d1d5f-4bf3-47fc-a36f-0a7195c596b1',
          creationDate: '2021-11-01T14:04:01.106Z',
          title: 'test',
          content: 'a new post written by me',
        },
      ],
    }).as('fetchUpdatedPosts')

    cy.get('.post-listing .post-listing-item').first().find('[title="delete post"]').click()

    // Make sure both requests are actually triggered
    cy.wait(['@deletePost1', '@fetchUpdatedPosts'])

    cy.get('.post-listing .post-listing-item').should('have.length', 4)
  })
})
