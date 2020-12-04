import React from 'react';
import {Section} from '@fox-zero/web/components/layout';
import {Subscription} from '@fox-zero/web/components/pricing';
import {solutions} from '@fox-zero/web/data';

export default class extends Section {
  render() {
    return (
      <Section solution={solutions[4]} title={<>SQUAD™ PLM<br />Pricing</>}>
        <Subscription />
        <p>Click below to learn more or contact us about our subscription model.</p>
      </Section>
    );
  }
}
