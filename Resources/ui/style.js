module.exports = {
    h1: {
      font: {fontWeight: 'normal', fontFamily: 'Georgia', fontSize: 30, fontStyle: 'italic'},
      color: "#707070",
      height: Ti.UI.SIZE,
      width: Ti.UI.SIZE
    },

    h2: {
      font:{fontFamily:'Helvetica Neue', fontSize:12, fontWeight:'bold'},
      color: '#363636',
      height: Ti.UI.SIZE,
      width: Ti.UI.SIZE
    },

    h3: {
      font: {fontSize: 14, fontWeight: 'bold'},
      color: '#444',
      height: Ti.UI.SIZE,
      width: Ti.UI.SIZE
    },
    
    h4: {
      font: {fontWeight: 'bold', fontFamily: 'Lucida Grande', fontSize: 13},
      color: '#3b5998',
      height: Ti.UI.SIZE,
      width: Ti.UI.SIZE
    },

    p3: {
      font: {fontSize: 12, fontWeight: 'regular'},
      color: '#999999',
      height: Ti.UI.SIZE,
      width: Ti.UI.SIZE
    },
    
    p4: {
      font: {fontWeight: 'normal', fontFamily: 'Georgia', fontSize: 18, fontStyle: 'italic'},
      color: "#707070",
      height: Ti.UI.SIZE,
      width: Ti.UI.SIZE
    },
    
    p5: {
      font:{fontFamily:'Helvetica medium', fontSize:13},
      color: '#444444',
      height: Ti.UI.SIZE,
      width: Ti.UI.SIZE
    },
    
    list_table: {
      separatorColor: 'rgba(183,183,183,0.5)'
    },
    
    android: {
      list_table: {
        separatorColor: '#999'
      }
    },

    ipad: {
      news_photo: { top: 25, left: 10 },
      
      news_row: {selectionStyle: "NONE"},
      
      tweet_btn: {left: null, right: 100},
            
      top_banner: {
        width: "100%",
        backgroundImage: '/images/backgrounds/logo_donate_bar_tablet_bg.png'
      },
      
      twitter_share_button: {
        backgroundImage: '/images/buttons/about_tablet_twitter_share_btn.png',
        backgroundSelectedImage: '/images/buttons/about_tablet_twitter_share_btn_p.png',
        width: 247,
        height: 37
      },
      
      fb_share_button: {
        width: 247,
        height: 37,
        backgroundImage: '/images/buttons/about_tablet_fb_share_btn.png',
        backgroundSelectedImage: '/images/buttons/about_tablet_fb_share_btn_p.png'
      },
      
      photo_upload_button: {
        width: 340,
        height: 340,
        backgroundImage: '/images/buttons/photo_grid_add_btn_lrg.png',
        backgroundSelectedImage: '/images/buttons/photo_grid_add_btn_lrg_p.png'
      },
      
      about_photo_container: {
        width: 300,
        height: 213,
        backgroundImage: "/images/backgrounds/about_tablet_featured_img_bg.png"
      },
      
      about_photo: {
        top: 8
      },
      
      news_container: {
        top: 25,
        left: 65,
        bottom: 25
      }
    }
};
