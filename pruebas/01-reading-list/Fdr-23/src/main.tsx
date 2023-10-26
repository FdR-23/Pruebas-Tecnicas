//import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './page/App.tsx'
import './index.css'
import BooksProvider from './components/BooksProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    //<React.StrictMode>
    <BooksProvider>
        <App />
    </BooksProvider >
    // </React.StrictMode >,
)
