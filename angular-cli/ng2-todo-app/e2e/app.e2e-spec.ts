import { Ng2TodoAppPage } from './app.po';

describe('ng2-todo-app App', function() {
  let page: Ng2TodoAppPage;

  beforeEach(() => {
    page = new Ng2TodoAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
