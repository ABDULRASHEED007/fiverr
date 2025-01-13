import React from 'react'
import './Footer.scss';
import insta from '../../static/fiver-img/instagram.png'
import twitter from '../../static/fiver-img/twitter.png'
import linkdin from '../../static/fiver-img/linkedin.png'
import facebook from '../../static/fiver-img/facebook.png'
import pinterest from '../../static/fiver-img/pinterest.png'
import access from '../../static/fiver-img/accessibility.png'
import english from '../../static/fiver-img/language.png'
import coin from '../../static/fiver-img/coin.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <span>Graphic & Design</span>
            <span>Digital Marketing</span>
            <span>Writing & Translation</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Fiverr Logo Maker</span>
            <span>Programming & Tech</span>
            <span>Data</span>
            <span>Business</span>
            <span>Lifestyle</span>
            <span>Photography</span>
          </div>
          <div className="item">
            <h2>About</h2>
            <span>Careers</span>
            <span>Press & News</span>
            <span>Partnership</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
            <span>Investor Relations</span>

          </div>
          <div className="item">
            <h2>Support and Education</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on Fiverr</span>
            <span>Buying on Fiverr</span>
            <span>Fiverr Guides</span>
            <span>Learn</span>
    
          </div>
          <div className="item">
            <h2>Community</h2>
            <span>Customer Success Stories</span>
            <span>Community Hub</span>
            <span>Forum</span>
            <span>Events</span>
            <span>Blog</span>
            <span>Creators</span>
            <span>Affiliates</span>
            <span>Podcast</span>
            <span>Invite a Friend</span>
            <span>Become a Seller</span>

          </div>
          <div className="item">
            <h2>Business Solutions</h2>
            <span>About Business Solutions</span>
            <span>Fiverr Pro</span>
            <span>Fiverr Certified</span>
            <span>Become an Agency</span>
            <span>fiverr Enterprise</span>
            <span>ClearVoice</span>
            <span>Contact Sales</span>
          </div>
        </div>



        <hr />
        <div className="bottom">
          <div className="left">
            <h2>fiverr</h2>
            <span>Fiverr International Ltd. 2023</span>
          </div>



          <div className="right">
            <div className="social">
              <img src={insta} alt="instagram" />
              <img src={facebook} alt="facebook" />
              <img src={twitter} alt="twitter" />
              <img src={linkdin} alt="linkdin" />
              <img src={pinterest} alt="pinterest" />
            </div>
            <div className="link">
              <img src={english} alt="english" />
              <span>English</span>
            </div>
            <div className="link">
              <img src={coin} alt="coin" />
              <span>USD</span>
            </div>
            <img src={access} alt="access" />
          </div>
        </div>


        
      </div>
    </div>
  )
}

export default Footer
