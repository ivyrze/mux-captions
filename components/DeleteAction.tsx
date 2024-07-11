import { fetchAuthorized } from "@/app/util";
import { mutate } from "swr";
import { Button } from "@chakra-ui/react";
import { useCallback } from "react";
import { PiTrash } from "react-icons/pi";

interface Props {
    assetId: string,
    trackId: string
}

export const DeleteAction = (props: Props) => {
    const { assetId, trackId } = props;

    const deleteTrack = useCallback(async () => {
        await fetchAuthorized(`/api/assets/${ assetId }/tracks/${ trackId }`, {
            method: 'DELETE'
        });
        mutate(`/api/assets/${ assetId }`);
    }, []);

    return (
        <Button onClick={ deleteTrack } colorScheme="red">
            Delete <PiTrash />
        </Button>
    );
};

export default DeleteAction;