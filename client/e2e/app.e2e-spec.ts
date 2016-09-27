import { PagesClientPage } from './app.po';

describe('pages-client App', function() {
  let page: PagesClientPage;

  beforeEach(() => {
    page = new PagesClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
