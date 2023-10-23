import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

interface ResData {
    product_types: string[];
    tax_types: string[];
}
interface MappedData {
    [key: string]: string;
}

function SelectTaxType({
    tax_types,
    value,
    onChange,
}: {
    tax_types: string[];
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <Form.Select
            aria-label="Default select example"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {/* <option>Select tax type</option> */}
            {tax_types.map((tt) => (
                <option value={tt}>{tt}</option>
            ))}
        </Form.Select>
    );
}

export function SelectTaxTypes() {
    const { filename } = useParams();
    const [resData, setResData] = useState<ResData | null>(null);
    const [mappedData, setMappedData] = useState<MappedData>({});
    const navigate = useNavigate();

    useEffect(() => {
        if (filename) {
            fetch('/api/upload/' + filename)
                .then((res) => res.json())
                .then((data) => setResData(data))
                .catch((err) => console.log(err));
        }
    }, [filename]);

    useEffect(() => {
        if (resData) {
            const _mappedData: MappedData = {};
            for (const pt of resData.product_types) {
                _mappedData[pt] = resData.tax_types[0];
            }

            setMappedData(_mappedData);
        }
    }, [resData]);

    const submit = () => {
        if (mappedData) {
            fetch('/api/upload/' + filename, {
                method: 'POST',
                body: JSON.stringify(mappedData),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data?.error) {
                        alert(data?.message || 'Error in update');
                    } else {
                        navigate('/');
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    // return <> {resData && JSON.stringify(resData)}</>;
    return (
        <>
            <h1 className="text-center">Select Tax Type</h1>

            {resData && (
                <div>
                    {Object.entries(mappedData).map(
                        ([product_type, tax_type]) => {
                            return (
                                <div className="row mt-2">
                                    <div className="col-6">{product_type} </div>
                                    <div className="col-6">
                                        {' '}
                                        <SelectTaxType
                                            tax_types={resData.tax_types}
                                            value={tax_type}
                                            onChange={(value: string) => {
                                                setMappedData((md) => ({
                                                    ...md,
                                                    [product_type]: value,
                                                }));
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        }
                    )}
                    <div className="mt-2 d-flex justify-content-center">
                        <Button onClick={() => submit()}> Submit </Button>
                    </div>
                </div>
            )}
        </>
    );
}
