import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './features/home'
import { Uploader } from './features/uploader'
import { Container } from 'react-bootstrap'
import { SelectTaxTypes } from './features/uploader/select-tax-type.component'

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/uploader', element: <Uploader /> },
    { path: '/uploader/:filename', element: <SelectTaxTypes />}
])

function App() {
    return (
        <Container className="mt-5">
            <RouterProvider router={router} />
        </Container>
    )
}

export default App
