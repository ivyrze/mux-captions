import { useCallback } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalContent, ModalOverlay, Button, useDisclosure } from "@chakra-ui/react";
import { PiUpload } from "react-icons/pi";
import FileDropzone from "./FileDropzone";
import { fetchAuthorized } from "@/app/util";

interface Props {
    assetId: string
}

export const UploadAction = (props: Props) => {
    const { assetId } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();

    const uploadFile = useCallback((file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        fetchAuthorized(`/api/assets/${ assetId }/tracks`, {
            method: 'POST',
            body: formData
        });
    }, [ assetId ]);

    return (
        <>
            <Button
                onClick={ onOpen }
                rightIcon={ <PiUpload /> }
            >
                Upload
            </Button>
            <Modal
                isOpen={ isOpen }
                onClose={ onClose }
            >
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            Upload
                        </ModalHeader>

                        <ModalBody>
                            <FileDropzone onChange={ uploadFile } />
                        </ModalBody>

                        <ModalFooter>
                            <Button>
                                Done
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
};

export default UploadAction;