import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Header} from '@boilerplatejs/core/components/layout';
import {transition} from '@boilerplatejs/core/actions/Transition';
import {Logo} from '@fox-zero/web/components/layout';
import {solutions} from '@fox-zero/web/data';

const PROGRESS_INCREMENT = 100;

@connect((state, props) => ({
  slide: state['@boilerplatejs/core'].Transition.slide || props.slide || 0,
  pause: state['@boilerplatejs/core'].Transition['timer.pause'],
  initial: state['@boilerplatejs/core'].Transition['slide.initial'],
  rendered: state['@boilerplatejs/core'].Transition['page.rendered']
}), {transition})

export default class extends Header {
  static propTypes = {
    onTransitionComplete: PropTypes.func,
    onTransitionBegin: PropTypes.func,
    runOnMount: PropTypes.bool,
    cycle: PropTypes.bool,
    pause: PropTypes.bool,
    timer: PropTypes.number,
    children: PropTypes.any,
    classNames: PropTypes.object,
    slide: PropTypes.number.isRequired,
    initial: PropTypes.any,
    transition: PropTypes.func.isRequired,
    images: PropTypes.array,
    rendered: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    classNames: {},
    runOnMount: false,
    cycle: false,
    images: [],
    timer: 0,
    initial: null,
    pause: false,
    rendered: false,
    forceAnimation: false
  };

  state = {
    index: 0,
    previous: undefined,
    animating: true,
    ready: false
  };

  timer = null;
  progress = null;

  componentDidMount() {
    setTimeout(() => {
      const preview = document.querySelector('.header.container header > div.hidden');
      this.setState({ ready: true });
      preview && preview.classList.remove('hidden');
    }, 0);
    setTimeout(this.complete, 450);
  }

  componentWillUnmount() {
    const preview = document.querySelector('.header.container header > div.hidden');
    this.setState({ animating: false, index: 0, previous: undefined });
    preview && preview.classList.add('hidden');
    this.clearTimer();
  }

  componentDidUpdate(props, state) {
    if (this.props.pause) {
      this.clearTimer();
    } else {
      this.resetTimer();
    }

    if (props.slide !== this.props.slide) {
      this.setState({ previous: props.slide });
    }
  }

  componentWillUpdate(props) {
    if (props.slide !== this.props.slide) {
      this.begin();
      setTimeout(this.complete, 450);
    }
  }

  resetTimer = () => {
    this.clearTimer();

    if (this.props.timer) {
      this.startTimer();
    }
  };

  getElements = () => {
    const { slide, initial } = this.props;
    const app = document.querySelector('#app');
    const parallax = document.body;
    const section = parallax && parallax.querySelector(`.section-${initial === null ? slide : 0}`);
    return { app, parallax, section };
  }

  hasScroll = () => {
    const { slide, initial } = this.props;
    return (slide !== null && slide === initial) || (initial === null && this.getElements().section);
  }

  clearTimer = () => {
    if (__CLIENT__ && this.progress) {
      document.querySelector('.header.container header .preview > div').style.transform = `scale3d(0, 1, 1)`;
    }

    window.clearTimeout(this.timer);
    this.timer = null;
    window.cancelAnimationFrame(this.progress);
    this.progress = null;

    return this;
  };

  startTimer = () => {
    const { timer } = this.props;
    const duration = timer * 1000;
    let start = 0;

    this.timer = setTimeout(this.next.bind(this), duration);

    if (__CLIENT__) {
      const bar = document.querySelector('.header.container header .preview > div');

      const step = timestamp => {
        if (!start) start = timestamp;
        const progress = timestamp - start;

        bar.style.transform = `scale3d(${Math.min(progress / duration, .99)}, 1, 1)`;

        if (progress < duration) {
          this.progress = window.requestAnimationFrame(step);
        }
      };

      this.progress = window.requestAnimationFrame(step);
    }

    return this;
  };

  next = () => this.props.transition('slide', this.props.slide === this.props.children.length - 1 ? 0 : this.props.slide + 1);

  previous = () => this.props.transition('slide', this.props.slide === 0 ? this.props.children.length - 1 : this.props.slide - 1);

  begin = () => {
    const { onTransitionBegin } = this.props;

    this.setState({ animating: true });

    if (onTransitionBegin) {
      onTransitionBegin(this.state);
    }
  };

  complete = () => {
    const { onTransitionComplete } = this.props;

    this.setState({ animating: false });

    if (onTransitionComplete) {
      onTransitionComplete(this.state);
    }
  };

  scrollTo = () => {
    const { app, section } = this.getElements();
    const top = section.getBoundingClientRect().top + window.scrollY - 30;

    if (app.scrollTo) {
      app.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      global.scrollTo({ top, left: 0, behavior: 'smooth' });
    } else {
      app.scrollTop = 0;
      window.scroll(top, 0);
    }
  };

  render() {
    const { className, classNames, children, slide, images, cycle, initial: initialSlide, rendered, forceAnimation } = this.props;
    const { animating, previous, ready } = this.state;
    const { length } = children;
    const initial = global.SLIDE_INITIAL || initialSlide || 0;

    const getFlipState = (direction = 'next') => {
      return {
        disabled: cycle && ((slide === children.length - 1 && direction === 'next') || (!slide && direction === 'previous'))
      };
    };

    return (
      <Header className={['slide', rendered ? 'rendered' : '', className, (length || forceAnimation) && animating ? `${classNames.animating || ''} animating` : ''].join(' ')}>
        {images.map((image, i) => {
          const main = __SERVER__ ? initial : slide;
          const current = i === main;
          const next = i - 1 === main;
          const className = (ready && current) || images.length === 1 ? 'current' : i === previous ? 'previous' : '';
          const fetch = (!ready && current) || className || next;
          return <div key={i} className={`hero ${className} hero-${i}`} style={{ opacity: 0, backgroundImage: fetch ? `url(${image})` : '' }}/>;
        })}
        <Logo/>
        {length ? (
          <div className={__CLIENT__ ? 'hidden presentation' : 'presentation'}>
            {children[__SERVER__ ? initial : slide]}
            <div className="flippers">
              <button {...getFlipState('previous')} onClick={this.previous} className="flip left">
                <span>{(solutions[!slide ? solutions.length - 1 : slide - 1]).section}{(solutions[!slide ? solutions.length - 1 : slide - 1]).section === 'SQUAD' ? <sup>®</sup> : ''}</span>
                <i className="fa fa-angle-left"></i>
              </button>
              <button {...getFlipState('next')} onClick={this.next} className="flip right">
                <span>{(solutions[slide === solutions.length - 1 ? 0 : slide + 1]).section}{(solutions[slide === solutions.length - 1 ? 0 : slide + 1]).section === 'SQUAD' ? <sup>®</sup> : ''}</span>
                <i className="fa fa-angle-right"></i>
              </button>
              <div className="scroll">
                <button disabled={__CLIENT__ && (!rendered || !this.hasScroll())} onClick={this.scrollTo}><span/></button>
              </div>
            </div>
          </div>
        ) : children}
      </Header>
    );
  }
}
