import { BootstrapScssStartPage } from './app.po';

describe('bootstrap-scss-start App', function() {
  let page: BootstrapScssStartPage;

  beforeEach(() => {
    page = new BootstrapScssStartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
