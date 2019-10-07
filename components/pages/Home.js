import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Page} from '@boilerplatejs/core/components/layout';
import {transition} from '@boilerplatejs/core/actions/Transition';
import {dismiss} from '@aim-digital/web/actions/Nav';
import {Footer} from '@aim-digital/web/components/layout';
import {Solution} from '@aim-digital/web/components/buttons';
import {update} from '@boilerplatejs/hubspot/actions/Contact';
import * as modals from '@aim-digital/web/components/modals';
import * as forms from '@boilerplatejs/core/components/forms';
import ReactGA from 'react-ga';
import {solutions} from '@aim-digital/web/data';
import _ from 'lodash';
import 'react-spring';
import {Parallax, ParallaxLayer} from '@react-spring/addons/parallax.cjs';

const SOLUTION_DELAY = 100;

const SECTIONS = {
  home: { index: 0, header: 0, slide: 0, param: '', next: 'services' },
  services: { index: 1, header: 0, slide: 1, param: 'services', next: 'plans', prev: 'home' },
  plans: { index: 2, header: 0, slide: 2, param: 'plans', next: 'rates', prev: 'services' },
  rates: { index: 3, header: 0, slide: 3, param: 'rates', next: 'hosting', prev: 'plans' },
  hosting: { index: 4, header: 0, slide: 4, param: 'hosting', next: 'leadership', prev: 'rates' },
  leadership: { index: 5, header: 0, slide: 5, param: 'leadership', next: 'communications', prev: 'hosting' },
  communications: { index: 6, header: 1, slide: 0, param: 'communications', next: 'headquarters', prev: 'network' },
  headquarters: { index: 7, header: 1, slide: 1, param: 'headquarters', prev: 'communications' }
};

@connect(state => {
  const { header = 0, slide = 0 } = state['@boilerplatejs/core'].Transition;
  return ({ param: state.router.params, header, slide, query: state.router.location.query });
}, {transition, dismiss, update})

export default class extends Page {
  static propTypes = {
    transition: PropTypes.func.isRequired,
    dismiss: PropTypes.func.isRequired,
    classNames: PropTypes.object,
    param: PropTypes.object,
    query: PropTypes.object,
    header: PropTypes.number.isRequired,
    slide: PropTypes.number.isRequired,
    section: PropTypes.string,
    hide: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    classNames: {}
  };

  state = {
    animating: false,
    contact: null,
    solution: null,
    form: {
      message: null
    }
  };

  componentDidMount = () => {
    document.querySelector('#app .nav + .page').addEventListener('click', this.props.dismiss);
    document.getElementById('app').classList.add('home');
  }

  componentWillMount = () => {
    const { solution } = this.props.query;

    this.updateHeader();
    this.setState({ solution: _.find(solutions, ['id', 1 * solution]) || null });
  };

  componentWillUnmount = () => {
    document.querySelector('#app .nav + .page').removeEventListener('click', this.props.dismiss);
    this.props.transition({ progress: 0.2 });
    document.getElementById('app').classList.remove('home');
  }

  componentWillUpdate = props => {
    if (this.props.param.section !== props.param.section) {
      this.updateHeader(props);
    }
  };

  openSolutionModal = solution => {
    this.setState({ solution });
    ReactGA.event({ category: `Solution`, action: `Click`, label: solution.summary });
  };

  prepareSolutionList = transition => (solution, i) => <Solution
    key={i}
    onClick={() => this.openSolutionModal(solution)}
    icon={solution.icon}
    transition={transition(i)}>{solution.summary}</Solution>

  submit = values => {
    const { update } = this.props;
    const { email } = values;
    const ga = { category: 'Quote Form', action: 'Submit' };

    if (email) {
      ReactGA.event({ ...ga, label: `Attempt` });

      update({
        lead: true,
        newsletter: !(values.newsletter === false),
        properties: {
          email,
          message: values.comment,
          firstname: values.firstName,
          lastname: values.lastName
        }
      })
        .then(contact => this.setState({ contact, form: { message: null } }))
        .then(() => ReactGA.event({ ...ga, label: `Success` }))
        .catch(({message}) => this.setState({ form: { message } }));
    }
  };

  updateHeader = (props = this.props) => {
    const { transition } = this;
    const { header, slide } = SECTIONS[props.section || props.param.section] || SECTIONS.home;
    transition('header', header).then(() => transition('slide', slide));
    this.props.transition({ progress: 1 });
  };

  transition = (type, index) => this.props[type] === index ? Promise.resolve() : this.props.transition({ [type]: index });

  afterSlide = header => this.transition('slide', 0).then(() => this.transition('header', header));

  wrap = sections => sections.map((section, i) => <div key={String(i)}>{section}</div>);

  render() {
    const { headers, sections, className, classNames = {}, param, header, section, hide } = this.props;
    const { index/*, prev, next*/ } = SECTIONS[section || param.section] || SECTIONS.home;
    const { animating, contact, solution } = this.state;
    const { message } = this.state.form;
    const { prepareSolutionList } = this;
    const single = headers.length === 1;

    const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`;
  
    return (
        <Page {...this.props} className={`home ${className} ${animating ? `${classNames.animating || ''} animating` : ''}`}>
          <section className="section container">
            <Parallax className="parallax" pages={5} style={{ left: 0 }}>
              <section className="solutions">
                <h3>Find a Solution</h3>
                <div className="left">{solutions.slice(0, 3).map(prepareSolutionList(i => ({ delay: (5 - i) * SOLUTION_DELAY, from: { transform: 'translate3d(-200%, 0, 0)', opacity: 0 }, to: { transform: 'translate3d(0, 0, 0)', opacity: .85 } })))}</div>
                <div className="right">{solutions.slice(3).map(prepareSolutionList(i => ({ delay: (7.5 - i) * SOLUTION_DELAY, from: { transform: 'translate3d(200%, 0, 0)', opacity: 0 }, to: { transform: 'translate3d(0, 0, 0)', opacity: .85 } })))}</div>
              </section>

              <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />
              <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />
              <ParallaxLayer offset={0} speed={0} factor={3} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} />
              <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
                <img src={url('satellite4')} style={{ width: '15%', marginLeft: '70%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
                <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
                <img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
                <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
                <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={2.5} speed={-0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <img src={url('earth')} style={{ width: '60%' }} />
              </ParallaxLayer>
              <ParallaxLayer
                offset={2}
                speed={-0.3}
                style={{
                  backgroundSize: '80%',
                  backgroundPosition: 'center',
                  backgroundImage: url('clients', true)
                }}/>
              <ParallaxLayer
                offset={0}
                speed={0.1}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '96vh' }}>
                {headers.length ? (
                  <section className={`${single ? 'single' : ''} header container`}>
                    {single ? headers : (
                      // <NukaCarousel initialSlideWidth={2000} afterSlide={this.afterSlide} slideIndex={header}>
                      //   {headers}
                      // </NukaCarousel>
                      headers[0]
                    )}
                  </section>
                ) : <span/>}
              </ParallaxLayer>
              <ParallaxLayer
                offset={1}
                speed={0.1}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <section className="section">
                  <h3>Testing</h3>
                </section>
              </ParallaxLayer>
              <ParallaxLayer
                offset={2}
                speed={0.1}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <section className="quote">
                  <div>
                    <h3>Get a Free Consultation</h3>
                    <p>Say hello to our guaranteed services and fair prices!</p>
                    {contact ?
                      <div className="success"><strong>Thank you, {contact.firstname.value}, for your inquiry!</strong><br />We will contact you within 24 hours.</div> :
                      <forms.Contact quote newsletterText="Join the AIM™ TV newsletter for project management tips, industry trends, free-to-use software, and more." onSubmit={this.submit}/>}
                    {message && <div className="error">{message}</div>}
                  </div>
                </section>
              </ParallaxLayer>
              <ParallaxLayer
                offset={3}
                speed={-0}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={url('clients-main')} style={{ width: '40%' }} />
              </ParallaxLayer>
              <ParallaxLayer
                offset={4}
                speed={-0}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Footer/>
              </ParallaxLayer>
            </Parallax>
          </section>
          <modals.Solution show={!!solution} solution={solution || {}} onHide={() => this.setState({ solution: null })}/>
        </Page>
    );
  }
}
