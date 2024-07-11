import { useDropzone } from "react-dropzone";

interface Props {
    onChange: (file: File) => void
}

export const FileDropzone = (props: Props) => {
    const { onChange } = props;

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'text/vtt': [ '.vtt' ],
            'text/plain': [ '.srt' ]
        },
        multiple: false,
        onDropAccepted: files => onChange(files[0])
    });

    return (
        <div { ...getRootProps({ className: 'dropzone' }) }>
            <input { ...getInputProps() } />
            <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
    );
};

export default FileDropzone;