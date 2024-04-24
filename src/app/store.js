import { configureStore } from '@reduxjs/toolkit'
import { formApi } from '../features/form/formSlice'

export const store = configureStore({

    reducer: {
        [formApi.reducerPath]: formApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(formApi.middleware)
})