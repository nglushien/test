define(function() {
  return {
    init: function() {
      this.bindEventHandler();
      this.headerNavActiveTab();
      this.hidePopups();
    },
    bindEventHandler: function() {
      $('.icon-share').on('click', this.socialMenu);
      $('#sponsoredBy').on('click', this.sponsoredContent);
      $('#navList li').on('click', this.tabSelection.close);
      $('#tabDropDown').on('click', this.tabSelection.open);
    },
    socialMenu: function(){
      $('.micrositeSocialMenu').toggleClass('show');
      $('.sponsorInfoPanel.show').removeClass('show');
      $(this).toggleClass('active');
      $('#sponsoredBy i').removeClass('active');
    },
    sponsoredContent: function() {
      $('.sponsorInfoPanel').toggleClass('show');
      $('.micrositeSocialMenu.show').removeClass('show');
      $(this).find('i').toggleClass('active');
      $('.icon-share').removeClass('active');
      $('.sponsoredByText').toggleClass('hide');
    },
    hidePopups: function() {
      $('.sponsorInfoPanel,.micrositeSocialMenu').removeClass('show');
      $('#sponsoredBy i,.icon-share').removeClass('active');
      $('.sponsoredByText').removeClass('hide');
    },
    headerNavActiveTab: function() {
      $('#tabDropDown a').text($('#navList .activeTab').text());
    },
    tabSelection: {
      open: function() {
        $('#navList').toggleClass('show');
      },
      close: function() {
        $('#navList').removeClass('show');
      }
    }
  }
});
