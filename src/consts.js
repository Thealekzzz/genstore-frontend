export const regions = [
  'Алтайский край',
  'Амурская область',
  'Архангельская область',
  'Астраханская область',
  'Белгородская область',
  'Брянская область',
  'Владимирская область',
  'Волгоградская область',
  'Вологодская область',
  'Воронежская область',
  'город федерального значения Москва',
  'город федерального значения Санкт-Петербург',
  'город федерального значения Севастополь',
  'Еврейская автономная область',
  'Забайкальский край',
  'Ивановская область',
  'Иркутская область',
  'Кабардино-Балкарская Республика',
  'Калининградская область',
  'Калужская область',
  'Камчатский край',
  'Карачаево-Черкесская Республика',
  'Кемеровская область — Кузбасс',
  'Кировская область',
  'Костромская область',
  'Краснодарский край',
  'Красноярский край',
  'Курганская область',
  'Курская область',
  'Ленинградская область',
  'Липецкая область',
  'Магаданская область',
  'Московская область',
  'Мурманская область',
  'Ненецкий автономный округ',
  'Нижегородская область',
  'Новгородская область',
  'Новосибирская область',
  'Омская область',
  'Оренбургская область',
  'Орловская область',
  'Пензенская область',
  'Пермский край',
  'Приморский край',
  'Псковская область',
  'Республика Адыгея (Адыгея)',
  'Республика Алтай',
  'Республика Башкортостан',
  'Республика Бурятия',
  'Республика Дагестан',
  'Республика Ингушетия',
  'Республика Калмыкия',
  'Республика Карелия',
  'Республика Коми',
  'Республика Крым',
  'Республика Марий Эл',
  'Республика Мордовия',
  'Республика Саха (Якутия)',
  'Республика Северная Осетия — Алания',
  'Республика Татарстан (Татарстан)',
  'Республика Тыва',
  'Республика Хакасия',
  'Ростовская область',
  'Рязанская область',
  'Самарская область',
  'Саратовская область',
  'Сахалинская область',
  'Свердловская область',
  'Смоленская область',
  'Ставропольский край',
  'Тамбовская область',
  'Тверская область',
  'Томская область',
  'Тульская область',
  'Тюменская область',
  'Удмуртская Республика',
  'Ульяновская область',
  'Хабаровский край',
  'Ханты-Мансийский автономный округ — Югра',
  'Челябинская область',
  'Чеченская Республика',
  'Чувашская Республика — Чувашия',
  'Чукотский автономный округ',
  'Ямало-Ненецкий автономный округ',
  'Ярославская область',
];

export const columnNames = {
  AltaGenetic: [
    {
      dbColumnName: 'naab_code',
      tableColumnName: 'Семенной код',
    },
    {
      dbColumnName: 'inter_reg_number',
      tableColumnName: 'ID',
    },
    {
      dbColumnName: 'inventory_number',
      tableColumnName: 'Инвентарный номер',
    },
    {
      dbColumnName: 'name',
      tableColumnName: 'Кличка',
    },
    {
      dbColumnName: 'full_name',
      tableColumnName: 'Полная кличка',
    },
    {
      dbColumnName: 'breed',
      tableColumnName: 'Порода',
    },
    {
      dbColumnName: 'tpi',
      tableColumnName: 'TPI',
    },
    {
      dbColumnName: 'nm_dollar',
      tableColumnName: 'NM$',
    },
    {
      dbColumnName: 'cm_dollar',
      tableColumnName: 'CM$',
    },
    {
      dbColumnName: 'fm_dollar',
      tableColumnName: 'FM$',
    },
    {
      dbColumnName: 'gm_dollar',
      tableColumnName: 'GM$',
    },
    {
      dbColumnName: 'milk',
      tableColumnName: 'Milk',
    },
    {
      dbColumnName: 'protein',
      tableColumnName: 'Protein',
    },
    {
      dbColumnName: 'prot_percent',
      tableColumnName: 'Prot%',
    },
    {
      dbColumnName: 'fat',
      tableColumnName: 'Fat',
    },
    {
      dbColumnName: 'fat_percent',
      tableColumnName: 'Fat %',
    },
    {
      dbColumnName: 'cfp',
      tableColumnName: 'CFP',
    },
    {
      dbColumnName: 'fe',
      tableColumnName: 'FE',
    },
    {
      dbColumnName: 'feed_saved',
      tableColumnName: 'Feed Saved',
    },
    {
      dbColumnName: 'prel',
      tableColumnName: 'Prel',
    },
    {
      dbColumnName: 'd_h',
      tableColumnName: 'D / H',
    },
    {
      dbColumnName: 'pl',
      tableColumnName: 'PL',
    },
    {
      dbColumnName: 'c_liv',
      tableColumnName: 'C-LIV',
    },
    {
      dbColumnName: 'h_liv',
      tableColumnName: 'H-LIV',
    },
    {
      dbColumnName: 'fi',
      tableColumnName: 'FI',
    },
    {
      dbColumnName: 'dpr',
      tableColumnName: 'DPR',
    },
    {
      dbColumnName: 'scs',
      tableColumnName: 'SCS',
    },
    {
      dbColumnName: 'sce',
      tableColumnName: 'SCE',
    },
    {
      dbColumnName: 'sce_rel',
      tableColumnName: 'SCE Rel',
    },
    {
      dbColumnName: 'sce_obs',
      tableColumnName: 'SCE Obs',
    },
    {
      dbColumnName: 'dce',
      tableColumnName: 'DCE',
    },
    {
      dbColumnName: 'ssb',
      tableColumnName: 'SSB',
    },
    {
      dbColumnName: 'dsb',
      tableColumnName: 'DSB',
    },
    {
      dbColumnName: 'ccr',
      tableColumnName: 'CCR',
    },
    {
      dbColumnName: 'hcr',
      tableColumnName: 'HCR',
    },
    {
      dbColumnName: 'efc',
      tableColumnName: 'EFC',
    },
    {
      dbColumnName: 'gl',
      tableColumnName: 'GL',
    },
    {
      dbColumnName: 'mast',
      tableColumnName: 'MAST',
    },
    {
      dbColumnName: 'ket',
      tableColumnName: 'KET',
    },
    {
      dbColumnName: 'rp',
      tableColumnName: 'RP',
    },
    {
      dbColumnName: 'met',
      tableColumnName: 'MET',
    },
    {
      dbColumnName: 'da',
      tableColumnName: 'DA',
    },
    {
      dbColumnName: 'mf',
      tableColumnName: 'MF',
    },
    {
      dbColumnName: 'ms',
      tableColumnName: 'MS',
    },
    {
      dbColumnName: 'dwp_dollar',
      tableColumnName: 'DWP$',
    },
    {
      dbColumnName: 'wt_dollar',
      tableColumnName: 'WT$',
    },
    {
      dbColumnName: 'cw_dollar',
      tableColumnName: 'CW$',
    },
    {
      dbColumnName: 'ptat',
      tableColumnName: 'PTAT',
    },
    {
      dbColumnName: 'udc',
      tableColumnName: 'UDC',
    },
    {
      dbColumnName: 'flc',
      tableColumnName: 'FLC',
    },
    {
      dbColumnName: 'bwc',
      tableColumnName: 'BWC',
    },
    {
      dbColumnName: 'dc',
      tableColumnName: 'DC',
    },
    {
      dbColumnName: 't_rel',
      tableColumnName: 'TRel',
    },
    {
      dbColumnName: 'd_h2',
      tableColumnName: 'D / H2',
    },
    {
      dbColumnName: 'stature',
      tableColumnName: 'Stature',
    },
    {
      dbColumnName: 'strength',
      tableColumnName: 'Strength',
    },
    {
      dbColumnName: 'body_depth',
      tableColumnName: 'Body Depth',
    },
    {
      dbColumnName: 'dairy_form',
      tableColumnName: 'Dairy form',
    },
    {
      dbColumnName: 'rump_angle',
      tableColumnName: 'Rump Angle',
    },
    {
      dbColumnName: 'thurl_width',
      tableColumnName: 'Thurl Width',
    },
    {
      dbColumnName: 'rlsv',
      tableColumnName: 'RLSV',
    },
    {
      dbColumnName: 'rlrv',
      tableColumnName: 'RLRV',
    },
    {
      dbColumnName: 'foot_angle',
      tableColumnName: 'Foot Angle',
    },
    {
      dbColumnName: 'fls',
      tableColumnName: 'FLS',
    },
    {
      dbColumnName: 'f_udder_att',
      tableColumnName: 'F. Udder Att.',
    },
    {
      dbColumnName: 'r_udder_height',
      tableColumnName: 'R Udder Height',
    },
    {
      dbColumnName: 'rear_udder_width',
      tableColumnName: 'Rear Udder Width',
    },
    {
      dbColumnName: 'udder_cleft',
      tableColumnName: 'Udder Cleft',
    },
    {
      dbColumnName: 'udder_depth',
      tableColumnName: 'Udder Depth',
    },
    {
      dbColumnName: 'ftp',
      tableColumnName: 'FTP',
    },
    {
      dbColumnName: 'rtp',
      tableColumnName: 'RTP',
    },
    {
      dbColumnName: 'rtp_sv',
      tableColumnName: 'RTP SV',
    },
    {
      dbColumnName: 'teat_length',
      tableColumnName: 'Teat Length',
    },
    {
      dbColumnName: 'pedigree',
      tableColumnName: 'Pedigree',
    },
    {
      dbColumnName: 'aaa',
      tableColumnName: 'aAa',
    },
    {
      dbColumnName: 'dms',
      tableColumnName: 'DMS',
    },
    {
      dbColumnName: 'kappa_casein',
      tableColumnName: 'Kappa-Casein',
    },
    {
      dbColumnName: 'beta_casein',
      tableColumnName: 'Beta-Casein',
    },
    {
      dbColumnName: 'bbr',
      tableColumnName: 'BBR',
    },
    {
      dbColumnName: 'b_lact',
      tableColumnName: 'B-LACT',
    },
    {
      dbColumnName: 'genetic_codes',
      tableColumnName: 'Genetic Codes',
    },
    {
      dbColumnName: 'haplotypes',
      tableColumnName: 'Haplotypes',
    },
    {
      dbColumnName: 'rha',
      tableColumnName: 'RHA',
    },
    {
      dbColumnName: 'efi',
      tableColumnName: 'EFI',
    },
    {
      dbColumnName: 'birth_date',
      tableColumnName: 'Birth Date',
    },
    {
      dbColumnName: 'proof',
      tableColumnName: 'Proof',
    },
    {
      dbColumnName: 'adv',
      tableColumnName: 'ADV',
    },
    {
      dbColumnName: 'gs',
      tableColumnName: 'GS',
    },
    {
      dbColumnName: 'fs',
      tableColumnName: 'FS',
    },
    {
      dbColumnName: 'num_511',
      tableColumnName: 'CP511',
    },
    {
      dbColumnName: 'edge',
      tableColumnName: 'EDGE',
    },
    {
      dbColumnName: 'cp',
      tableColumnName: 'CP',
    },
    {
      dbColumnName: 'cp511',
      tableColumnName: '511',
    },
  ],
};
