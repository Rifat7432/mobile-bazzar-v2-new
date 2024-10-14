import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store/store.ts'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.tsx'
import { Toaster } from 'react-hot-toast'
import Loader from './Pages/Shered/Loader/Loader.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
      <Toaster position="bottom-right" reverseOrder={false} />
        <RouterProvider
          router={router}
          fallbackElement={<Loader></Loader>}
        ></RouterProvider>
      </Provider>
    </PersistGate>
  </StrictMode>,
)
