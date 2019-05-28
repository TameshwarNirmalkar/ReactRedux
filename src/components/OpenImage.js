import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

export default class OpenImage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var openId = this.props.id;
    return (
      <span>
        <a className="expand" onClick={this.props.handleOpenClick} id={this.props.id} >Open</a>
        <Modal isOpen={this.props.imageModalVisibility[openId]} contentLabel="Modal Window" className="ModalClass" overlayClassName="OverlayClass" >

          <div className='centerContainer'>
            <div className='mainContainer'>
              <img src={this.props.showImage[openId]} height="400px" width="100%" />

              <div className="topPadding">
                <button className="btn btn-primary" onClick={this.props.onImageCloseClick}>Close</button>
              </div>
            </div>
          </div>
        </Modal>
      </span>
    );
  }
}