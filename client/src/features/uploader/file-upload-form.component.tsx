import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
interface FormValue {
    file: FileList | null;
}

const initialFormValue: FormValue = {
    file: null,
};

export function FileUploadForm() {
    const [formValue, setFormValue] = useState<FormValue>(initialFormValue);

    const handleSubmit = async () => {
        if (formValue.file) {
            const formdata = new FormData();

            formdata.append('file', formValue.file[0]);
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formdata,
            });
            const data = await res.json();
            console.log({ data });
        }
    };

    console.log(formValue);
    return (
        <div>
            <h1 className="text-center">Upload Exel File</h1>
            <div>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Select exel file to upload</Form.Label>
                        <Form.Control
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={(e) =>
                                setFormValue({
                                    file: (
                                        e.target as unknown as {
                                            files: FileList;
                                        }
                                    ).files,
                                })
                            }
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}
