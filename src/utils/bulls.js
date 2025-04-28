const numericFieldsToCount = [
  'tpi',
  'nm_dollar',
  'cm_dollar',
  'fm_dollar',
  'gm_dollar',
  'milk',
  'protein',
  'prot_percent',
  'fat',
  'fat_percent',
  'cfp',
  'fe',
  'feed_saved',
  'prel',
  'pl',
  'c_liv',
  'h_liv',
  'fi',
  'dpr',
  'scs',
  'sce',
  'sce_rel',
  'sce_obs',
  'dce',
  'ssb',
  'dsb',
  'ccr',
  'hcr',
  'efc',
  'gl',
  'mast',
  'ket',
  'rp',
  'met',
  'da',
  'mf',
  'ms',
  'dwp_dollar',
  'wt_dollar',
  'cw_dollar',
  'ptat',
  'udc',
  'flc',
  'bwc',
  'dc',
  't_rel',
  'stature',
  'strength',
  'body_depth',
  'dairy_form',
  'rump_angle',
  'thurl_width',
  'rlsv',
  'rlrv',
  'foot_angle',
  'fls',
  'f_udder_att',
  'r_udder_height',
  'rear_udder_width',
  'udder_cleft',
  'udder_depth',
  'ftp',
  'rtp',
  'teat_length',
  'rha',
  'efi',
];

export default function getAvarageValues(bulls) {
  const acc = {};
  const result = {};

  numericFieldsToCount.forEach((fieldName) => {
    bulls.forEach((bull) => {
      if (bull[fieldName] && !isNaN(+bull[fieldName])) {
        if (!acc[fieldName]) {
          acc[fieldName] = { count: 0, value: 0 };
        }

        acc[fieldName].value += +bull[fieldName];
        acc[fieldName].count += 1;
      }
    });

    try {
      if (acc[fieldName]?.count) {
        result[fieldName] = acc[fieldName].value / acc[fieldName].count;
      } else {
        result[fieldName] = 0;
      }
    } catch (e) {
      console.error('Ошибка при расчете среднего значения характеристик');
      console.log(e);
    }
  });

  return result;
}
