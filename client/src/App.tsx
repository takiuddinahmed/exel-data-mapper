import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './features/home'
import { Uploader } from './features/uploader'
import { Container } from 'react-bootstrap'

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/uploader', element: <Uploader /> },
])

function App() {
    return (
        <Container className="mt-5">
            <RouterProvider router={router} />
        </Container>
    )
}

export default App
