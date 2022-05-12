import { produce } from 'immer';

const initialState = {
    allCategories: [],
    allWallpapers: [],
    privteCongratulationDetails: {
        subject: '',
        email: '',
        picked: '',
        note: ''
    }
};


export default produce((state, action) => {
    switch (action.type) {
        case 'SET_ALL_CATEGORIES':
            state.allCategories = action.payload;
            break;
        case 'SET_ALL_WALLPAPERS':
            state.allWallpapers = action.payload;
            break;
        case 'SET_PC_SUBJECT':
            state.privteCongratulationDetails.subject = action.payload;
            break;
        case 'SET_PC_EMAIL':
            state.privteCongratulationDetails.email = action.payload;
            break;
        case 'SET_PC_PICKED':
            state.privteCongratulationDetails.picked = action.payload;
            break;
        case 'SET_PC_NOTE':
            state.privteCongratulationDetails.note = action.payload;
            break;

    }
}, initialState)