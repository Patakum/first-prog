import './App.css'
import { Layout } from './Components/Layout'
import { Page, Content } from './Components/DummyPages'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import { BreedImage, FavoriteImg, RandomImg } from './Components/ImageCollections'
import Child from './Components/Child'
import { PopupBtn } from './Components/Popup'
import DogsContextProvider from './Components/Context'

function App() {
  return <DogsContextProvider >
    <BrowserRouter>
      <Routes>
        <Route index element={<Page />} />
        <Route path='page' element={<Layout />}>
          <Route path='home' element={<RandomImg />} />
          <Route path=':breed?' element={<BreedImage />} />
          <Route path='favorite' element={<FavoriteImg />} />
        </Route>

        <Route path='child' element={<Child />} />
        <Route path='popup' element={<PopupBtn />} />
      </Routes>
    </BrowserRouter>
  </DogsContextProvider>

}

export default App
