import { Component } from "react";

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { size: 15 };
  }
  render() {
    let rows = [];
    for (var i = 0; i < this.state.size; i++) {
      let rowID = `row-${i}`;
      let col = [];
      for (var idx = 0; idx < this.state.size; idx++) {
        let colID = `row${i}-col${idx}`;
        col.push(
          <td key={colID} id={colID}>
            <a href='/'>{`${i},${idx}`}</a>
          </td>
        );
      }
      rows.push(
        <tr key={i} id={rowID}>
          {col}
        </tr>
      );
    }
    return (
      <div>
        <table className='board'>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}
