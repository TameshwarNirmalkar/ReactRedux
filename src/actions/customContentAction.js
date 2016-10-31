var customJsonData  = require('../json/customContent.json');

module.exports = {

	setJsonData : function(){
     
     return function(dispatch) {
      	var data; 

			function loadJSON(jsonfile, callback) {   

				var xhr = new XMLHttpRequest();
				xhr.overrideMimeType("application/json");
				xhr.open('GET', "js/customContent/src/json/customContent.json", true);
				xhr.onreadystatechange = function () {
			    	if (xhr.readyState == 4 && xhr.status == "200") {
			        	callback(xhr.responseText);
			     }
			};

				xhr.send(null);  

			}

			function load() {

				loadJSON(customJsonData, function(response) {
				    data = JSON.parse(response);			    
				    dispatch({type: 'JSON_RESPONSE_RETURNED',data : data});
				});
			}

			load();
     	}
 	},

 	openImageModal : function(targetImageId,staticJsonData){
 		return {
 			type: 'OPEN_IMAGE_MODAL',
 			targetImageId : targetImageId,
 			staticJsonData : staticJsonData
 		}
 	},

 	closeImageModal : function(){
 		return {
 			type : 'CLOSE_IMAGE_MODAL'
 		}
 	},

 	deleteImage : function(deleteElementId,staticDeleteData){
 		return {
 			type : 'DELETE_IMAGE',
 			deleteElementId : deleteElementId,
 			staticDeleteData : staticDeleteData
 		}
 	}
}