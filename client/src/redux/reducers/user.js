import { produce } from 'immer';

const initialState = {
   user: {
      name: '',
      email: '',
      password: '',
      token: '',
      congratulation:{}
   }
};

export default produce((state, action) => {
   switch (action.type) {
      case 'SET_USER_NAME':
         state.user.name = action.payload;
         break;
      case 'SET_USER_MAIL':
         state.user.email = action.payload;
         break;
      case 'SET_USER_PASSWORD':
         state.user.password = action.payload;
         break;
      case 'SET_USER_TOKEN':
         state.user.token = action.payload;
         break;
      case 'SET_USER_CONGRATULATION':
         state.user.congratulation = action.payload;
         break;
   }
}, initialState)