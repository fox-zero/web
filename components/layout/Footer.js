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

  scrollTo = (id, track) => {
    const { transition } = this.props;
    const app = document.querySelector('#app');
    const parallax = app.querySelector('.section.container > .parallax');
    let label;

    if (app.scrollTo) {
      app.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      parallax && parallax.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      app.scrollTop = 0;
      parallax && (parallax.scrollTop = 0);
    }

    transition('page.impression', false);

    if (track) {
      label = formatters.section(id);
      analytics.Section.Footer.Click.track(label);
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
                <img src="/@fox-zero/web/images/logo.png" title="Fox Zero™ - High-Performance/Zero-Latency Consultancy™"/>
              </Link>
            </div>
            <div className="col-sm-9 col-xs-12">
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
                      <a title="Twitter: @fox_zero_agency" href="https://twitter.com/fox_zero_agency" target="_blank">
                        <i className="fa fa-twitter"/>
                      </a>
                    </li>
                    <li>
                      <a title="Instagram: @fox_zero_agency" href="https://www.instagram.com/fox_zero_agency" target="_blank">
                        <i className="fa fa-instagram"/>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="col-sm-3 col-xs-6">
                <li className="subnav">
                  <h4><i className="fa fa-cogs"/> Services</h4>
                  <ul>
                    <li><Link to="/consulting" onClick={update(solutions[0].slug, true)}><i className="fa fa-lightbulb-o"/> Consulting</Link></li>
                    <li><Link to="/development" onClick={update(solutions[1].slug, true)}><i className="fa fa-wrench"/> Development</Link></li>
                    <li><Link to="/maintenance" onClick={update(solutions[2].slug, true)}><i className="fa fa-heartbeat"/> Maintenance</Link></li>
                  </ul>
                </li>
              </ul>
              <ul className="col-sm-3 col-xs-6">
                <li className="subnav">
                  <h4><i className="fa fa-cubes"/> Framework</h4>
                  <ul>
                    <li><Link to="/strategy" onClick={update(solutions[3].slug, true)}><i className="fa fa-road"/> Strategy</Link></li>
                    <li><Link to="/process" onClick={update(solutions[7].slug, true)}><i className="fa fa-fighter-jet"/> Process</Link></li>
                  </ul>
                </li>
              </ul>
              <ul className="col-sm-3 col-xs-6">
                <li className="subnav">
                  <h4><i className="fa fa-usd"/> Pricing</h4>
                  <ul>
                    <li><Link to="/subscription" onClick={update(solutions[4].slug, true)}><i className="fa fa-refresh"/> Subscription</Link></li>
                    <li><Link to="/warranty" onClick={update(solutions[5].slug, true)}><i className="fa fa-umbrella"/> Warranty</Link></li>
                    <li><Link to="/on-demand" onClick={update(solutions[6].slug, true)}><i className="fa fa-power-off"/> On Demand</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="col-sm-3 col-xs-12">
              <h4><i className="fa fa-info-circle"/> Support</h4>
              <p>For sales and customer service, please call or text <a title="Phone/SMS: +1 (855) FOX-ZERO" href="tel:+18553473369" target="_blank">+1 (855) FOX-ZERO</a>, or <a title="Email: hello@foxzero.io" href="mailto:hello@foxzero.io?subject=Hello!">email us</a>.</p>
              <p><strong>Operating Hours:</strong><br />9am-6pm (EST), M-F</p>
            </div>
            <div className="col-xs-12 text-center">
              <img src="/@fox-zero/web/images/seal.png" title="Fox Zero (a VitruvianTech® brand)"/>
              <p><small>&copy; Fox Zero (a VitruvianTech® brand)</small></p>
            </div>
          </div>
        </div>
      </Footer>
    );
  }
}
