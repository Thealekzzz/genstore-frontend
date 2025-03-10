import React from 'react';

import styles from './PreviewTable.module.css';

const PreviewTable = (props) => {
  return (
    <div className={styles.tableWrapper} style={props.style}>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.letters}>
            {props.tableDump?.[0]?.map((cellData, index) => {
              return (
                <td key={index} className={styles.cell}>
                  {String.fromCharCode(65 + index)}
                </td>
              );
            })}
          </tr>

          {props.tableDump.map((row, i) => {
            return (
              <tr key={i} className={styles.row}>
                {row.map((cellData, index) => {
                  return (
                    <td key={index} className={styles.cell}>
                      {cellData}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PreviewTable;
