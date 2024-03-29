import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Footer} from '@boilerplatejs/core/components/layout';
import {transition} from '@boilerplatejs/core/actions/Transition';
import {solutions} from '@fox-zero/web/data';
import formatters from '@fox-zero/web/lib/formatters';
import * as analytics from '@fox-zero/web/lib/analytics';

const DEFAULT_ID = 'home';

@connect(() => ({}), {transition})
export default class extends Footer {
  static propTypes = {
    transition: PropTypes.func.isRequired
  };

  id = DEFAULT_ID;

  scrollTo = (id, source) => {
    const { transition } = this.props;
    const app = document.querySelector('#app');
    let label;

    if (app.scrollTo) {
      app.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      global.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      app.scrollTop = 0;
      window.scroll(0, 0);
    }

    label = formatters.section(id);
    analytics.Section.Footer.Click.track(label);

    transition('page.impression', false);

    if (source) {
      transition('analytics.sources', [['Section.Footer.Click', label].join('|')]);
    } else {
      transition('analytics.sources', undefined);
    }
  };

  render() {
    const { scrollTo } = this;
    const update = (id, track) => () => scrollTo(id, track);

    return (
      <Footer>
        <div className="colors container">
          <div className="row">
            <div className="blue col-sm-3"></div>
            <div className="green col-sm-3"></div>
            <div className="yellow col-sm-3"></div>
            <div className="red col-sm-3"></div>
          </div>
        </div>
        <div className="content container">
          <div className="row">
            <div className="col-xs-12 logo text-center">
              <Link to="/" onClick={update(DEFAULT_ID, true)}>
                <img src="https://d3w33imimg0eu8.cloudfront.net/images/logo.png" alt="Fox Zero · Zero Latency Software Agency™"/>
              </Link>
            </div>
            <div className="col-xs-12">
              <ul className="col-sm-3 col-xs-6">
                <li>
                  <h4><i>@</i> Follow Us</h4>
                  <ul className="social">
                    <li>
                      <a title="LinkedIn: Fox Zero™" href="https://www.linkedin.com/company/fox-zero" target="_blank">
                        <i className="fa fa-linkedin-square"/>
                      </a>
                    </li>
                    <li>
                      <a title="GitHub: Fox Zero™" href="https://github.com/fox-zero" target="_blank">
                        <i className="fa fa-github"/>
                      </a>
                    </li>
                    <li>
                      <a title="Facebook: @fox.zero.agency" href="https://www.facebook.com/fox.zero.agency" target="_blank">
                        <i className="fa fa-facebook-official"/>
                      </a>
                    </li>
                    <li>
                      <a title="Instagram: @fox.zero.agency" href="https://www.instagram.com/fox.zero.agency" target="_blank">
                        <i className="fa fa-instagram"/>
                      </a>
                    </li>
                    <li>
                      <a title="Twitter: @fox_zero_agency" href="https://twitter.com/fox_zero_agency" target="_blank">
                        <i className="fa fa-twitter"/>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="col-sm-3 col-xs-6">
                <li className="subnav">
                  <h4><i className="fa fa-file-text-o"/> About</h4>
                  <ul>
                    <li><Link to="/about" onClick={update(solutions[0].slug, true)}><i className="fa fa-flag"/> Mission</Link></li>
                    <li><Link to="/agents" onClick={update(solutions[1].slug, true)}><i className="fa fa-id-badge"/> Agents</Link></li>
                    <li><Link to="/squad" onClick={update(solutions[2].slug, true)}><i className="fa fa-fighter-jet"/> SQUAD<sup>®</sup></Link></li>
                  </ul>
                </li>
              </ul>
              <ul className="col-sm-3 col-xs-6">
                <li className="subnav">
                  <h4><i className="fa fa-cogs"/> Services</h4>
                  <ul>
                    <li><Link to="/design" onClick={update('design', true)}><i className="fa fa-road"/> Design</Link></li>
                    <li><Link to="/development" onClick={update('development', true)}><i className="fa fa-bullseye"/> Development</Link></li>
                    <li><Link to="/support" onClick={update('support', true)}><i className="fa fa-wrench"/> Support</Link></li>
                  </ul>
                </li>
              </ul>
              <ul className="col-sm-3 col-xs-6 products">
                <li className="subnav">
                  <h4><i className="fa fa-tags"/> Products</h4>
                  <ul>
                    <li><Link to="/packages" onClick={update(solutions[3].slug, true)}><i className="fa fa-dollar"/> <span><strong>SQUAD<sup>®</sup></strong><sub>Packages</sub></span></Link></li>
                    <li><Link to="/warranty" onClick={update(solutions[4].slug, true)}><i className="fa fa-umbrella"/> <span><strong>Wingman™</strong><sub>Warranty</sub></span></Link></li>
                  </ul>
                </li>
              </ul>
              <ul className="col-md-3 col-xs-12">
                <li className="subnav">
                  <div>
                    <h4><i className="fa fa-question-circle"/> Help</h4>
                    <ul>
                      <li><Link to="/contact" onClick={update(solutions[5].slug, true)}><i className="fa fa-phone"/> Contact Us</Link></li>
                      <li><Link to="/privacy" onClick={update('privacy', true)}><i className="fa fa-user-secret"/> Privacy Policy</Link></li>
                    </ul>
                  </div>
                  <div>
                    <p>
                      <strong>Customer Service:</strong>
                      <br />
                      <small><strong>Email:</strong></small> <a title="Email: hello@foxzero.io" href="mailto:hello@foxzero.io?subject=Hello!">hello@foxzero.io</a>
                      <br />
                      <small><strong>Phone:</strong></small> <a title="Phone: +1 (855) FOX-ZERO" href="tel:+18553699376" target="_blank"><small>+1</small> 855-FOX-ZERO</a>
                      <br />
                      <small><strong>Office Hours:</strong></small>
                      <br />
                      Mon.-Fri.
                      <br />
                      9am-1pm <sup>(EST)</sup>
                      <br />
                      5pm-7pm <sup>(EST)</sup>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-xs-12 text-center">
              <img src="https://d3w33imimg0eu8.cloudfront.net/images/corp-transparent.png" alt="Fox Zero · A VitruvianTech Brand"/>
              <p><small>&copy; {(new Date()).getFullYear()} · Fox Zero · A <a href="https://vitruviantech.com">VitruvianTech</a> Brand</small></p>
            </div>
          </div>
        </div>
      </Footer>
    );
  }
}
