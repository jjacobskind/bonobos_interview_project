import React from 'react';

export default class Loader extends React.Component {
  render() {
    const {hidden, message} = this.props;
    let classes = ['Loader'];
    if(hidden) { classes.push('hidden'); }

    return (
      <div className={classes.join(' ')}>
        <div className='content'>
          <div className='spinner-container' />
          {message ? <div><p>{message}</p></div> : null}
        </div>
      </div>
    );
  }
}
