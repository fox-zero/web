import React from 'react';
import ReactGA from 'react-ga';
import {VelocityTransitionGroup} from 'velocity-react';
import {Header} from '@aim-digital/web/components/layout';

export default class extends Header {
  state = {
    loaded: false
  };

  transitionBegin = () => {
    this.setState({ loaded: false });
  };

  transitionComplete = state => {
    this.setState({ loaded: true });

    ReactGA.event({
      category: 'Title Header',
      action: 'View',
      label: `Slide ${state.index + 1}`
    });
  };

  render() {
    const styles = require('./Component.scss');

    return (
        <Header runOnMount className={styles.slide} onTransitionComplete={this.transitionComplete} onTransitionBegin={this.transitionBegin}>
          {[
            <div className={[styles.content, 'content', styles.virtues].join(' ')} key="0">
              <section className={['preview'].join(' ')}>
                <div className={styles.logo}>
                  <VelocityTransitionGroup enter={{easing: [ 0.17, 0.67, 0.83, 0.67 ], animation: 'transition.shrinkIn', duration: 500 }}>
                    {this.state.loaded && (
                      <div className="logo">
                        <div className={`${styles.corporate} corporate`}>
                          <div className="name">
                            <span>VitruvianTech</span>
                          </div>
                          <div className="tagline">
                            <span className="color-primary-blue">Roman</span>&nbsp;
                            <span className="color-primary-green">Inspired</span>&nbsp;
                            <span className="color-primary-yellow">Software</span>&nbsp;
                            <span className="color-secondary-red">Designers</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </VelocityTransitionGroup>
                </div>
                <h3>accelerator-program</h3>
                <ul className={'columns'}>
                  <li><i className="fa fa-universal-access"/> Personnel Mgmt.</li>
                  <li><i className="fa fa-cubes"/> App Development</li>
                  <li><i className="fa fa-comment"/> Artist Marketing</li>
                  <li><i className="fa fa-money"/> Payment Handling</li>
                  <li><i className="fa fa-hashtag"/> Content Creation</li>
                  <li><i className="fa fa-clock-o"/> Appt. Booking</li>
                  <li className={'more'} data-next="Services"/>
                </ul>
              </section>
            </div>,

            // <div className={[styles.content, 'content', styles.portfolio].join(' ')} key="1">
            //   <section className={['preview'].join(' ')}>
            //     <h3>Missions</h3>
            //     <ul className={'columns'}>
            //       <li>Verizon</li>
            //       <li>Viacom</li>
            //       <li>Halliburton</li>
            //       <li>HUGE</li>
            //       <li>The Daily Beast</li>
            //       <li>Refinery29</li>
            //       <li>Wall Street Journal</li>
            //       <li>Condé Nast</li>
            //       <li>The New Yorker</li>
            //       <li>GQ</li>
            //       <li>Wired Magazine</li>
            //       <li>Bon Appétit</li>
            //       <li>Golf Digest</li>
            //       <li>Architectural Digest</li>
            //       <li>Condé Nast Traveler</li>
            //       <li>Saks 5th Avenue</li>
            //       {/*<li>Marvel Comics</li>*/}
            //       <li>UrbanDaddy</li>
            //       <li>OneRx®</li>
            //       {/* <li>RealtyMX™</li> */}
            //       <li className={'more'} data-next="Services"/>
            //     </ul>
            //   </section>
            // </div>,

            <div className={[styles.content, 'content', styles.services].join(' ')} key="1">
              <section className={['preview'].join(' ')}>
                <h3>Services</h3>
                <ul>
                  <li>Consulting <span className={[styles.service].join(' ')}>Strategic / Tactical / Business / Analysis</span></li>
                  <li>Project Management <span className={[styles.service].join(' ')}>Planning / Process / Sourcing</span></li>
                  <li>Software Development <span className={[styles.service].join(' ')}>Web / Mobile / eCommerce</span></li>
                  <li>Marketing <span className={[styles.service].join(' ')}> SEO / Social Media / Print / Merchandise</span></li>
                  <li>Design <span className={[styles.service].join(' ')}>Software / UI / UX / Graphic / Product</span></li>
                  <li>Quality Assurance <span className={[styles.service].join(' ')}>Performance / Automation</span></li>
                  <li>IT/System Admin. <span className={[styles.service].join(' ')}>Database / Network / Cloud</span></li>
                  <li>Content Production <span className={[styles.service].join(' ')}>Photo / Video / Audio</span></li>
                  <li className={'more'} data-next="Plans"/>
                </ul>
              </section>
            </div>,

            <div className={[styles.content, 'content', styles.pricing, styles.products].join(' ')} key="2">
              <section className={['preview'].join(' ')}>
                <h3>Plans</h3>
                <ul>
                  <li><strong>Team</strong> <i>Subscription</i> <span className={[styles.price].join(' ')}><strong>$3k<sub>/mo. (per resource)</sub></strong></span></li>
                  <li className={styles.asterisk}><small><i><strong>High quality</strong> (most cost-effective.)</i></small></li>
                  <li className={styles.asterisk}><small><i><strong>Flat monthly fee</strong>, per resource.</i></small></li>
                  <li className={styles.asterisk}><small><i><strong>Includes proprietary <em>Foxtrot℠</em></strong> project management system.</i></small></li>
                  <li className={styles.asterisk}><small><i><strong>Requires</strong> at least <strong>two</strong> simultaneous subscriptions (resources.)</i></small></li>
                  <li className={styles.asterisk}><small><i>Cost of resources <strong>not included</strong>.</i></small></li>
                  <li><strong>Freelance</strong> <i>Time &amp; Materials</i> <span className={[styles.price].join(' ')}><strong>+25% <sub>(of resource rate)</sub></strong></span></li>
                  <li className={styles.asterisk}><small><i><strong>Industry-standard quality</strong> (least cost-effective.)</i></small></li>
                  <li className={styles.asterisk}><small><i>Resource is <strong>independently managed</strong>.</i></small></li>
                  <li className={styles.asterisk}><small><i><strong>Conventional</strong> for hourly-based, <strong>ad-hoc projects</strong>.</i></small></li>
                  <li><strong>Value</strong> <i>Point System</i> <span className={[styles.price].join(' ')}><strong>$250<sub>/pt.</sub></strong></span></li>
                  <li className={styles.asterisk}><small><i><strong>Highest quality</strong> (<strong>guaranteed quality assurance</strong>.)</i></small></li>
                  <li className={styles.asterisk}><small><i><strong>Only pay</strong> for <strong>warrantied features</strong> produced.</i></small></li>
                  <li className={styles.asterisk}><small><i><strong>Includes proprietary <em>Foxtrot℠</em></strong> project management system.</i></small></li>
                  <li className={'more'} data-next="Rates"/>
                </ul>
              </section>
            </div>,

            <div className={[styles.content, 'content', styles.pricing].join(' ')} key="3">
              <section className={['preview'].join(' ')}>
                <h3>Rates</h3>
                <ul>
                  <li>Consultants <span className={[styles.price].join(' ')}><strong>$75<sub>/hr.</sub></strong></span></li>
                  <li>Project Managers <span className={[styles.price].join(' ')}><strong>$75<sub>/hr.</sub></strong></span></li>
                  <li>Software Developers <span className={[styles.price].join(' ')}><strong>$50-75<sub>/hr.</sub></strong></span></li>
                  <li>Marketers <span className={[styles.price].join(' ')}><strong>$50-75<sub>/hr.</sub></strong></span></li>
                  <li>Designers <span className={[styles.price].join(' ')}><strong>$50-75<sub>/hr.</sub></strong></span></li>
                  <li>System Administrators <span className={[styles.price].join(' ')}><strong>$50-75<sub>/hr.</sub></strong></span></li>
                  <li>Content Producers <span className={[styles.price, styles.starting].join(' ')}><strong>$25<sub>/hr.</sub></strong></span></li>
                  <li className={styles.asterisk}><small><i>Our studio includes copywriters, videographers, photographers, printers, musicians, and brand curators.</i></small></li>
                  <li>Interns <span className={[styles.price].join(' ')}><strong>$20<sub>/hr.</sub></strong></span></li>
                  <li className={styles.asterisk}><small><i>Boost your project's performance while maximizing workforce potential by providing training opportunities for young professionals and aspiring individuals.</i></small></li>
                  <li className={'more'} data-next="Hosting"/>
                </ul>
              </section>
            </div>,

            <div className={[styles.content, 'content', styles.pricing, styles.products].join(' ')} key="4">
              <section className={['preview'].join(' ')}>
                <h3>Hosting</h3>
                <ul>
                  <li><strong>Managed</strong> <i>Shared</i> <span className={[styles.price, styles.starting].join(' ')}><strong>$19<sub><sup>.99</sup>/mo.</sub></strong></span></li>
                  <li className={styles.asterisk}><small><i><strong><em>Amazon Web Services</em></strong> high-availability hosting.</i></small></li>
                  <li className={styles.asterisk}><small><i><strong>Dedicated hosting</strong> services available.</i></small></li>
                  <li className={styles.asterisk}><small><i>Web, database, and storage <strong>server management</strong>.</i></small></li>
                  <li className={styles.asterisk}><small><i><strong>Infrastructure design</strong> and architecture consulting.</i></small></li>
                  <li className={'more'} data-next="Leadership"/>
                </ul>
              </section>
            </div>,

            <div className={[styles.content, 'content', styles.team].join(' ')} key="5">
              <section className={['preview'].join(' ')}>
                <h3>Leadership</h3>
                <ul>
                  <li>
                    <a href="mailto:pete@vitruvian.tech?subject=<VitruvianTech>%20Connect" target="_blank">
                      <i className="fa fa-envelope"/>
                    </a>
                    <a href="https://www.linkedin.com/in/peter-c-romano-3360b311" target="_blank">
                      <i className="fa fa-linkedin-square"/>
                    </a>
                    <a href="https://angel.co/peteromano" target="_blank">
                      <i className="fa fa-angellist"/>
                    </a>
                    <a href="https://www.facebook.com/peteromano/" target="_blank">
                      <i className="fa fa-facebook-official"/>
                    </a>
                    <a href="https://github.com/peteromano" target="_blank">
                      <i className="fa fa-github"/>
                    </a>
                    <span>Peter C. Romano<small> / Founder</small></span>
                  </li>
                  <li>
                    <a href="mailto:reza@evolvinx.com?subject=<VitruvianTech>%20Connect" target="_blank">
                      <i className="fa fa-envelope"/>
                    </a>
                    <a href="https://www.linkedin.com/in/reza-khan-7b15ab9a" target="_blank">
                      <i className="fa fa-linkedin-square"/>
                    </a>
                    <span>Reza Khan<small> / Infrastructure</small></span>
                  </li>
                  <li>
                    <a href="mailto:pamelaschwilk@gmail.com?subject=<VitruvianTech>%20Connect" target="_blank">
                      <i className="fa fa-envelope"/>
                    </a>
                    <a href="https://www.linkedin.com/in/pamelaschwilk/" target="_blank">
                      <i className="fa fa-linkedin-square"/>
                    </a>
                    <span>Pamela Schwilk<small> / Marketing</small></span>
                  </li>
                  <li>
                    <a href="http://www.pamelasisson.com/" target="_blank">
                      <i className="fa fa-external-link"/>
                    </a>
                    <a href="https://www.linkedin.com/in/pamelasisson/" target="_blank">
                      <i className="fa fa-linkedin-square"/>
                    </a>
                    <span>Pamela Sisson<small> / Design</small></span>
                  </li>
                  <li>
                    <a href="mailto:Valk82@gmail.com?subject=<VitruvianTech>%20Connect" target="_blank">
                      <i className="fa fa-envelope"/>
                    </a>
                    <a href="https://www.linkedin.com/in/valeria-kalaidjian-70627738/" target="_blank">
                      <i className="fa fa-linkedin-square"/>
                    </a>
                    <span>Valeria Kalaidjian<small> / Administration</small></span>
                  </li>
                  <li style={{'padding': '1.25em 0 0'}}>
                    <p className={'humility' + ' ' + 'instruction'}>"You just gotta show up, and be consistent. 'Perfection' is merely the <em>pursuit</em> of perfection, with quality engineered over time by a well-planned, incremental process. After all, great management leads to quality, and our objective is to secure quality for all."<i> -Peter C. Romano, Founder</i></p>
                    <p className={'humility'} style={{'margin': '0'}}><small><strong>Scroll down</strong> or <strong>swipe right</strong> to <strong>contact us</strong> today! &darr;&rarr;</small></p>
                  </li>
                  <li className={'more'} data-next="Network"/>
                </ul>
              </section>
            </div>
          ]}
        </Header>
    );
  }
}
