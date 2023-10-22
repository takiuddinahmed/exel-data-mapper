import { useState } from 'react';
import { FileUploadForm } from './file-upload-form.component';

enum View {
    FileUploadForm = 'file-upload-form',
}

export function Uploader() {
    const [view, setView] = useState<View>(View.FileUploadForm);
    return <>{view === View.FileUploadForm && <FileUploadForm />}</>;
}
