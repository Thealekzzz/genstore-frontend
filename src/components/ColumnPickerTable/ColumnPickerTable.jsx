import React from 'react';
import { PropTypes } from 'prop-types';

import styles from './ColumnPickerTable.module.css';

// eslint-disable-next-line react/display-name
const columnPickerTable = React.forwardRef((props, ref) => {
  // TODO запоминать элементы inputs чтобы не искать их на каждом рендере
  const inputs = [...document.querySelectorAll('.' + styles.tableInput)];

  return (
    <div ref={ref} className={[styles.table, styles.animated].join(' ')} style={props.style}>
      <div className={[styles.row, styles.rowHeader].join(' ')}>
        <p className={styles.cell}>Столбец</p>
        <p className={styles.cell}>О</p>
        <p className={styles.cell}>ОМ</p>
        <p className={styles.cell}>ОММ</p>
      </div>
      <div className={styles.row}>
        <p className={styles.cell}>С кличкой предка</p>
        <input
          onChange={() => props.onInputChange(inputs)}
          type="text"
          autoComplete="new-password"
          className={[styles.cell, styles.tableInput].join(' ')}
          name="nameOColumn"
          data-hint="Буква колонки в excel, в которой записаны клички отцов"
        />
        <input
          onChange={() => props.onInputChange(inputs)}
          type="text"
          autoComplete="new-password"
          className={[styles.cell, styles.tableInput].join(' ')}
          name="nameOMColumn"
          data-hint="Буква колонки в excel, в которой записаны клички отцов матерей"
        />
        <input
          onChange={() => props.onInputChange(inputs)}
          type="text"
          autoComplete="new-password"
          className={[styles.cell, styles.tableInput].join(' ')}
          name="nameOMMColumn"
          data-hint="Буква колонки в excel, в которой записаны клички отцов матерей матерей"
        />
      </div>
      <div className={styles.row}>
        <p className={styles.cell}>С семенным кодом предка</p>
        <input
          onChange={() => props.onInputChange(inputs)}
          type="text"
          autoComplete="new-password"
          className={[styles.cell, styles.tableInput].join(' ')}
          name="NAABOColumn"
          data-hint="Буква колонки в excel, в которой записаны семенные коды отцов"
        />
        <input
          onChange={() => props.onInputChange(inputs)}
          type="text"
          autoComplete="new-password"
          className={[styles.cell, styles.tableInput].join(' ')}
          name="NAABOMColumn"
          data-hint="Буква колонки в excel, в которой записаны семенные коды отцов матерей"
        />
        <input
          onChange={() => props.onInputChange(inputs)}
          type="text"
          autoComplete="new-password"
          className={[styles.cell, styles.tableInput].join(' ')}
          name="NAABOMMColumn"
          data-hint="Буква колонки в excel, в которой записаны семенные коды отцов матерей матерей"
        />
      </div>
      <div className={styles.row}>
        <p className={styles.cell}>С ID предка</p>
        <input
          onChange={() => props.onInputChange(inputs)}
          type="text"
          autoComplete="new-password"
          className={[styles.cell, styles.tableInput].join(' ')}
          name="IDOColumn"
          data-hint="Буква колонки в excel, в которой записаны международные идентификаторы отцов"
        />
        <input
          onChange={() => props.onInputChange(inputs)}
          type="text"
          autoComplete="new-password"
          className={[styles.cell, styles.tableInput].join(' ')}
          name="IDOMColumn"
          data-hint="Буква колонки в excel, в которой записаны международные идентификаторы отцов матерей"
        />
        <input
          onChange={() => props.onInputChange(inputs)}
          type="text"
          autoComplete="new-password"
          className={[styles.cell, styles.tableInput].join(' ')}
          name="IDOMMColumn"
          data-hint="Буква колонки в excel, в которой записаны международные идентификаторы отцов матерей матерей"
        />
      </div>
      <div className={styles.row}>
        <p className={styles.cell}>С инвентарным номером предка</p>
        <input
          onChange={() => props.onInputChange(inputs)}
          type="text"
          autoComplete="new-password"
          className={[styles.cell, styles.tableInput].join(' ')}
          name="InvOColumn"
          data-hint="Буква колонки в excel, в которой записаны инвентарные номера отцов"
        />
        <input
          onChange={() => props.onInputChange(inputs)}
          type="text"
          autoComplete="new-password"
          className={[styles.cell, styles.tableInput].join(' ')}
          name="InvOMColumn"
          data-hint="Буква колонки в excel, в которой записаны инвентарные номера отцов матерей"
        />
        <input
          onChange={() => props.onInputChange(inputs)}
          type="text"
          autoComplete="new-password"
          className={[styles.cell, styles.tableInput].join(' ')}
          name="InvOMMColumn"
          data-hint="Буква колонки в excel, в которой записаны инвентарные номера отцов матерей матерей"
        />
      </div>
    </div>
  );
});

columnPickerTable.propTypes = {
  onInputChange: PropTypes.func,
  style: PropTypes.Object,
};

export default columnPickerTable;
