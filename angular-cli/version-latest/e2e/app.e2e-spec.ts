import { VersionLatestPage } from './app.po';

describe('version-latest App', function() {
  let page: VersionLatestPage;

  beforeEach(() => {
    page = new VersionLatestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
