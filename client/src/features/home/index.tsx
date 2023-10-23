import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
interface Data {
    _id: string;
    product_name: string;
    description: string;
    product_type: string;
    tax_type: string;
}

export function Home() {
    const [data, setData] = useState<Data[]>([]);
    useEffect(() => {
        fetch('/api')
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => alert(err));
    }, []);
    return (
        <div>
            <div className="row">
                <div className="col-9">
                    <h1>View Data</h1>
                </div>
                <div className="col-3">
                    <Link className="btn btn-primary" to={'/uploader'}>
                        Uploader
                    </Link>
                </div>
            </div>

            {!!data.length && (
                <>
                    <Table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Desctiption</th>
                                <th>Type of Product</th>
                                <th>Tax Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d) => (
                                <tr key={d._id.toString()}>
                                    <td>{d?.product_name}</td>
                                    <td>{d?.description}</td>
                                    <td>{d?.product_type}</td>
                                    <td>{d?.tax_type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
            {!data?.length && <h2>Please wait....</h2>}
        </div>
    );
}
