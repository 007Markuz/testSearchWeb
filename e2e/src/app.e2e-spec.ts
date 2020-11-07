import { browser, logging, element, by } from 'protractor';
import {  of } from 'rxjs';
describe('workspace-project App', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should display the icon search in the header', () => {
    expect(element(by.css('.mat-icon')).getText()).toContain('search');
    expect(element(by.css('.mat-card')).isPresent()).toBe(false);
  });

  it('there should be no product cards', () => {
    expect(element(by.css('.mat-card')).isPresent()).toBe(false);
  });

  it('there should have one product cards', (done) => {
    element(by.id('search')).sendKeys('2');
    browser.sleep(1000).then(function(){
      expect(element(by.css('.mat-card')).isPresent()).toBe(true);
      done();
    });
  });

  it('there should have one product cards', (done) => {
    element(by.id('search')).sendKeys('dsaasd');
    browser.sleep(1000).then(function(){
      expect(element(by.css('.mat-card')).isPresent()).toBe(true);
      done();
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
