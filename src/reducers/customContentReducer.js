const initialState = {
    contentData : [],
    hoverClass : [],
    imageModalVisibility : [],
    clickedImage: [],
    deleteImage : []
};

export default function customContentReducer(state = initialState, action) 
{
    switch (action.type) {

        case 'JSON_RESPONSE_RETURNED' : {

            var jsonData = action.data;
            var initializeHoverClass = [];
            var initializeModal = [];
            var clickedImage = [];
            var initializeDeleteImage = [];


            for(var key in jsonData){
              initializeHoverClass[jsonData[key]['id']] = '';
              initializeModal[jsonData[key]['id']] = false;
              clickedImage[jsonData[key]['id']] = '';
              initializeDeleteImage[jsonData[key]['id']] = '';
            }
            
            return $.extend(true,{}, state, {
                contentData: jsonData,
                hoverClass : initializeHoverClass,
                imageModalVisibility : initializeModal,
                deleteImage : initializeDeleteImage
            });
        }

        case 'OPEN_IMAGE_MODAL' : {
            var clickedId = action.targetImageId;
            var staticJsonData = action.staticJsonData;

            var initializeModal = [];
            var clickedImage = [];

            for(var key in staticJsonData){
                if(staticJsonData[key]['id'] == clickedId){
                    initializeModal[staticJsonData[key]['id']] = true;
                }
                else{
                    initializeModal[staticJsonData[key]['id']] = false;
                }
              clickedImage[staticJsonData[key]['id']] = staticJsonData[key]['imageLocation']
            }

            return $.extend(true,{}, state, {
                imageModalVisibility : initializeModal,
                clickedImage : clickedImage
            });
        }

        case 'CLOSE_IMAGE_MODAL' : {
            return $.extend(true,{}, state, {
                imageModalVisibility : false
            });
        }

        case 'DELETE_IMAGE' : {
            var elementId = action.deleteElementId;
            var staticDeleteData = action.staticDeleteData;

            for(var key in staticDeleteData){
                if(key == elementId){
                    staticDeleteData[key] = ' hide'
                }
            }

            return $.extend(true,{}, state, {
                deleteImage : staticDeleteData
            });
        }
        
        default:
            return state;
    }
}