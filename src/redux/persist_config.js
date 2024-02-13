
import storage from 'redux-persist/lib/storage'; 
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth_reducer'], 
  };

  export default persistConfig;