export const checkSize = (dispatch, setIsMobile) => {
    
    if (window.innerWidth <= 960) {
        dispatch(setIsMobile(true));
    } else {
        dispatch(setIsMobile(false));
    }
}
