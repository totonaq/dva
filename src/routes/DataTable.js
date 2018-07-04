import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, Icon } from 'antd';
import { withRouter } from 'dva/router';

class DataTable extends Component {

	changeNumber = (e, index) => {
		
		let target = e.target;

		if (!target.id) {
			target = target.closest("span[id]")
		}
	
		setTimeout(() => {
			
			console.log('Current value after editing: ', target.textContent)

			this.editNumbers(target, index)

		}, 4)

	}

	editNumbers = (target, index) => {
		this.props.dispatch({
			type: 'tableCreator/editRandomNumbers',
			rowId: index,
			colId: +target.id,
			value: target.textContent
		})
	}

	shouldComponentUpdate() {
		return false
	}

	render() {

		const { history, tableCreator } = this.props;
		const { randomNumbers } = tableCreator;

		let columns = [];
		let data = [];

		if (randomNumbers.length > 0) {
			columns = randomNumbers[0].map((rows, idx) => {
				return({
				  dataIndex: idx,
				  key: idx,
				  render: text => <span
				  	id={idx}
				  	contentEditable
	   				suppressContentEditableWarning="true"
	  				>
	   			{text}</span>,
				})
			})

			data = randomNumbers.map((rows, i) => {
				let prop = rows.map((number) => number.value)
				return({
					key: i,
					...prop
				})
			})
		}
		
	  return (
	  	<div>
		  	<Table columns={columns} dataSource={data} 
		  		onRow={(record, index) => {
				    return {
				      onKeyDown: e => this.changeNumber(e, index),
				      onPaste: e => this.changeNumber(e, index),
				      onCut: e => this.changeNumber(e, index),
				    };
				  }}
				/>

				<Button type="primary" onClick={() => history.goBack()}>
	        <Icon type="left" />Назад
	      </Button>
	  	</div>
	  );
	}
}

DataTable.propTypes = {
};

function mapStateToProps(state) {
	return {
		tableCreator: state.tableCreator
	}
}

export default connect(mapStateToProps)(withRouter(DataTable));