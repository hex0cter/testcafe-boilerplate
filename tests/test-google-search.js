import google from './page-objects/duckduckgo'
import { Selector } from 'testcafe'
import { ClientFunction } from 'testcafe'

const getWindowLocation = ClientFunction(() => window.location);

fixture('Test Google search')
  .page('https://google.com')

test.skip('search for bees', async (t) => {
  const searchInputField = Selector('#search_form_input_homepage')
  const searchButton = Selector('#search_button_homepage')
  const body = Selector('body')

  await t
    .expect(google.searchInputField.exists).ok()
    .typeText(google.searchInputField, 'dog')
    .click(google.searchButton)
    .takeElementScreenshot(body, 'google-screenshots.png')

  const location = await getWindowLocation();

  await t
    .expect(location.href).contains('q=god')
})
