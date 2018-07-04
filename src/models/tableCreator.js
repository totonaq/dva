export default {

  namespace: 'tableCreator',

  state: {
    cols: 3,
    rows: 3,
    randomNumbers: []
  },

  reducers: {

    setCols(state, action) {
      return(
        {
          ...state,
          cols: action.cols
        }
      )
    },

    setRows(state, action) {
      return(
        {
          ...state,
          rows: action.rows
        }
      )
    },

    setNumbers(state, action) {
      return(
        {
          ...state,
          randomNumbers: action.randomNumbers
        }
      )
    },

    editRandomNumbers(state, action) {

      let editedNumbers = state.randomNumbers.map((rows, idx) => {
        if (idx === action.rowId) {
          return rows.map((number, idx) => {
            return number.id === action.colId ? 
            {...number, value: action.value} :
            number
          })
        }
        return rows
      })

      return(
        {
          ...state,
          randomNumbers: editedNumbers
        }
      )
    },
  },

};
