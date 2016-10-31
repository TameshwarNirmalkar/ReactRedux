import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setJsonData, openImageModal, closeImageModal, deleteImage } from '../actions/customContentAction';

import OpenImage from '../components/OpenImage';


function mapStateToProps(state) {

	return {
		customContentReducerObj : state.customContentReducer
	};
}

function mapDispatchToProps(dispatch) {

	return {
		actions : {
			setJsonData : function(){
				return dispatch(setJsonData());
			},
			openImageModal : function(targetImageId,staticJsonData){
                return dispatch(openImageModal(targetImageId,staticJsonData));
            },
            closeImageModal : function(){
                return dispatch(closeImageModal());
            },
            deleteImage : function(elementId,staticDeleteData){
            	return dispatch(deleteImage(elementId,staticDeleteData));
            }
		}
	};
}


class CustomContent extends Component
{

	constructor(props){
		super(props);
		this.handleOpenClick = this.handleOpenClick.bind(this);
		this.deleteImage = this.deleteImage.bind(this);
		this.printImage = this.printImage.bind(this);
	}

	componentDidMount(){
		this.props.actions.setJsonData();
	}

	componentDidUpdate(prevProps, prevState) {

	var classSelector = document.getElementsByClassName('imgClass');
		for(var i =0 ; i< classSelector.length ; i++){
			classSelector[i].addEventListener("mouseenter",this.mouseEnterCallback);
			classSelector[i].addEventListener("mouseleave",this.mouseLeaveCallback);
		}
	}

	mouseEnterCallback(){
		var getElementId = this.id;
		var element = document.getElementById(getElementId);
		element.className += " " + "hover";
	}

	mouseLeaveCallback(){
		var getElementId = this.id;
		var element = document.getElementById(getElementId);
		element.className = " imgClass";
	}

	handleOpenClick(e){
		var targetImageId = e.target.id;
		var staticJsonData = this.props.customContentReducerObj.contentData;
		this.props.actions.openImageModal(targetImageId,staticJsonData);
	}

	deleteImage(e){
		var deleteImageIdWithString = e.target.id;
		var deleteImageCombinedId = deleteImageIdWithString.split("_");
		var staticDeleteData = this.props.customContentReducerObj.deleteImage;
		this.props.actions.deleteImage(deleteImageCombinedId[1],staticDeleteData);
	}

	printImage(e){
		var printImageWithString = e.target.id;
		var printImageCombinedId = printImageWithString.split("_");
		var printImageId = printImageCombinedId[1];
		var staticData= this.props.customContentReducerObj.contentData;
		
		for(var key in staticData){
			if(staticData[key]['id'] == printImageId){
				var popup;

				popup = window.open( staticData[key]['imageLocation'] );
				popup.onbeforeunload = this.closePrint;
				popup.onafterprint = this.closePrint;
				popup.focus();
				popup.print();
			}
		}
	}

	closePrint () {
		if ( popup ) {
			popup.close();
		}
	}

	render(){
		var imageContentHtml = [];
		var imageContentFields = this.props.customContentReducerObj.contentData;
		var i=1;
		
		for(var key in imageContentFields){
			imageContentHtml.push(
				<div className = {"col-md-3 col-sm-6 col-xs-12" + this.props.customContentReducerObj.deleteImage[imageContentFields[key]['id']]} key = {++i}>
					<div className = "imgClass " key = {++i} id = {"imgId_" + imageContentFields[key]['id']}>
						
						<img src = {imageContentFields[key]['imageLocation']} width = "100%"/>
						<div className="overlay">
							<OpenImage
								id = {imageContentFields[key]['id']}
								handleOpenClick = {this.handleOpenClick}
								imageModalVisibility = {this.props.customContentReducerObj.imageModalVisibility}
								onImageCloseClick = {this.props.actions.closeImageModal.bind(this)}
								showImage = {this.props.customContentReducerObj.clickedImage}
							/>

				            <a  id = {"deleteImage_" + imageContentFields[key]['id'] } onClick = {this.deleteImage} className="expand">Delete</a>
				            
				            <a id = {"printImage_" + imageContentFields[key]['id'] } onClick = {this.printImage} className="expand">Print</a>
				            
				            <a className="closeOverlay hidden">x</a>
				        </div>
					</div>
					<div className = "imageTextStyle">
						{imageContentFields[key]['imageText']}
					</div>
				</div>
			);
		}

		return(

			<div className = "bottomSlideEffect effects clearfix">
				{imageContentHtml}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomContent);