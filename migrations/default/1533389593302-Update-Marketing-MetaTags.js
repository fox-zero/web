import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    const NAME = 'Fox Zero';
    const TITLE = 'Zero Latency Software Agency™'
    const DESCRIPTION = 'Stop burning capital on software waste with our zero latency product lifecycle and budget planning framework, and guaranteed consulting services.';

    await MetaTag.update({
      content: 'Fox Zero, fox_zero_agency, fox.zero.agency, NYC software, long island software, garden city software, VitruvianTech, Vitruvian Tech, Vitruvian Technology, agile consulting, agile coaching, pivotal labs, project management, software management, consulting agency, software development, software agency, digital agency, software consulting, software insurance, SQUAD framework, product lifecycle management, SQUAD PLM, Wingman bond, Peter C. Romano'
    }, {
      where: { value: 'keywords' }
    });

    await MetaTag.update({
      content: `${NAME} · ${TITLE}`
    }, {
      where: { value: 'name', key: 'itemprop' }
    });

    await MetaTag.update({
      content: TITLE
    }, {
      where: { value: 'og:title' }
    });

    await MetaTag.update({
      content: TITLE
    }, {
      where: { value: 'twitter:title' }
    });

    await MetaTag.update({
      content: TITLE
    }, {
      where: { value: 'twitter:image:alt' }
    });

    await MetaTag.update({
      content: DESCRIPTION
    }, {
      where: { value: 'description', key: 'name' }
    });

    await MetaTag.update({
      content: DESCRIPTION
    }, {
      where: { value: 'description', key: 'itemprop' }
    });

    await MetaTag.update({
      content: DESCRIPTION
    }, {
      where: { value: 'og:description' }
    });

    await MetaTag.update({
      content: DESCRIPTION
    }, {
      where: { value: 'twitter:description' }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
