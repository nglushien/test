define(function() {
  return {
    init: function() {
      this.bindEventHandler();
    },
    bindEventHandler: function() {
      $('.assetListingExpand').on('click', this.showMore);
    },
    hideAssets: function() {
      $('.assetListingExpand').show();
    },
    showMore: function() {
      $('#assetsList li:nth-child(n+4)').addClass('open');
      $(this).remove();
      $('#assetListingFader').remove();
    }
  }
});
