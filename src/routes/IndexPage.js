import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { InputNumber, Input, Button } from 'antd';
import { withRouter } from 'dva/router';

function IndexPage({ tableCreator, dispatch, history }) {
  const InputGroup = Input.Group;

  function setCols(cols) {
    dispatch({
      type: 'tableCreator/setCols',
      cols
    });
  }

  function setRows(rows) {
    dispatch({
      type: 'tableCreator/setRows',
      rows
    });
  }

  function createTable() {
    let randomNumbers = [];

    for (let i = 0; i < tableCreator.rows; i++) {
      randomNumbers[i] = []
      for (let j = 0; j < tableCreator.cols; j++) {
        randomNumbers[i][j] = {
          id: j,
          value: Math.floor(Math.random() * 21)
        }
      }
      
    }

    dispatch({
      type: 'tableCreator/setNumbers',
      randomNumbers
    });

    history.push('/table');
  }

  return (
    <div className={styles.normal}>
      <InputGroup compact>
        <InputNumber
          min={1}
          onChange={ value => setCols(value) }
          value={tableCreator.cols} />
        <InputNumber
          min={1}
          onChange={ value => setRows(value) }
          value={tableCreator.rows} />
        <Button
          type="primary"
          onClick={() => createTable()}>
          Создать таблицу
        </Button>
      </InputGroup>
    </div>
  );
}

function mapStateToProps(state) {
  return { tableCreator: state.tableCreator };
}

IndexPage.propTypes = {
};

export default connect(mapStateToProps)(withRouter(IndexPage));