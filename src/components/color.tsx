import React from 'react';
import { SketchPicker } from 'react-color';

export interface IColorState {
  background: string;
}

export default class Color extends React.Component<any, IColorState> {
  state: IColorState = {
    background: '#fff',
  };

  handleChangeComplete = (color: any) => {
    this.setState({ background: color.hex });
  };

  render() {
    return (
      <SketchPicker
        color={ this.state.background }
        onChangeComplete={ this.handleChangeComplete }
      />
    );
  }
}
