import duckduckgo from './page-objects/duckduckgo'
import { Selector } from 'testcafe'
import { ClientFunction } from 'testcafe'

const getWindowLocation = ClientFunction(() => window.location);

fixture('Test Duckduckgo search')
  .page('https://duckduckgo.com')

test('search for dogs', async (t) => {
  const searchInputField = Selector('#search_form_input_homepage')
  const searchButton = Selector('#search_button_homepage')
  const body = Selector('body')

  await t
    .expect(duckduckgo.searchInputField.exists).ok()
    .typeText(duckduckgo.searchInputField, 'dog')
    .click(duckduckgo.searchButton)
    .takeElementScreenshot(body, 'duckduckgo-screenshots.png')

  const location = await getWindowLocation();

  await t
    .expect(location.href).contains('q=dog')
})
