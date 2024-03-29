import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Modal from 'react-bootstrap-modal';
import {Logo} from '@fox-zero/web/components/layout';
import {ShareButtons} from 'react-share';
import _ from 'lodash';

const {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton
} = ShareButtons;

export default class extends Component {
  static propTypes = {
    onHide: PropTypes.func,
    children: PropTypes.object,
    className: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
    share: PropTypes.object,
    hero: PropTypes.string
  };

  static defaultProps = {
    onHide: () => {},
    className: '',
    share: {}
  };

  state = {
    ready: false
  };

  componentWillReceiveProps(next) {
    if (next.hero !== this.props.hero) {
      this.setState({ ready: false });
      global.setTimeout(() => this.setState({ ready: true }), 250);
    }
  }

  render() {
    const { id, children, title, dek, icon, slug, className, share = {}, hero } = this.props;
    const { ready } = this.state;
    const { url, caption, subject, hashtags } = share;

    return (
      <Modal {..._.omit(this.props, ['share', 'title', 'icon', 'hero'])} className={`${className} ${ready ? 'ready' : ''}`} title="" id={id}>
        {hero ? <div className="modal-hero" style={{ backgroundImage: `url(${hero})` }} /> : <></>}
        <div className="modal-nav">
          <Modal.Dismiss className="dismiss">
            <i className="fa fa-arrow-circle-left"></i>
          </Modal.Dismiss>
          {url && <div className="share">
            <LinkedinShareButton url={url} title={title} source="Fox Zero™" summary={caption}>
              <i className="fa fa-linkedin-square"/>
            </LinkedinShareButton>
            <FacebookShareButton url={url} quote={caption} hashtag={hashtags.map(tag => `#${tag}`).join(',')}>
              <i className="fa fa-facebook-official"/>
            </FacebookShareButton>
            <TwitterShareButton url={url} title={caption} hashtags={share.hashtags} related="@fox_zero_agency">
              <i className="fa fa-twitter"/>
            </TwitterShareButton>
            <EmailShareButton url={url} subject={`Fox Zero™ · ${subject}`} body={`${caption}\n\nRead More: ${url}\n\n`}>
              <i className="fa fa-envelope"/>
            </EmailShareButton>
          </div>}
        </div>
        <Modal.Header>
          <Logo/>
          {title && <Modal.Title>
            {icon && <div><span>{dek === 'SQUAD' ? <>SQUAD<sup>®</sup></> : dek}</span><i className={`fa fa-${icon}`}></i></div>}<span>{title === 'SQUAD Pricing' ? <>SQUAD<sup>®</sup> Pricing</> : title}</span>
          </Modal.Title>}
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <span>&copy; {(new Date()).getFullYear()} · Fox Zero · A <a href="https://vitruviantech.com">VitruvianTech</a> Brand</span>
        </Modal.Footer>
      </Modal>
    );
  }
}