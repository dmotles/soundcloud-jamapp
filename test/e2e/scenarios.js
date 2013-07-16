'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('cloudvisual', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  it('should automatically redirect to /search when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/search");
  });


  describe('Search View', function() {

    beforeEach(function() {
      browser().navigateTo('#/search');
    });


    it('should render Search View when user navigates to /search', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/partial for view 2/);
    });

  });


  describe('Playlist view', function() {

    beforeEach(function() {
      browser().navigateTo('#/playlist');
    });


    it('should render Playlist View when user navigates to /playlist', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/partial for view 1/);
    });

  });
});
