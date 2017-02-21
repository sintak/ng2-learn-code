import { Ng2BootstrapStartPage } from './app.po';

describe('ng2-bootstrap-start App', function() {
  let page: Ng2BootstrapStartPage;

  beforeEach(() => {
    page = new Ng2BootstrapStartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
