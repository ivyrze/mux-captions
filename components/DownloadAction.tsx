import { Button } from "@chakra-ui/react";
import { PiDownload } from "react-icons/pi";
import Link from "next/link";

interface Props {
    playbackId: string,
    trackId: string
}

export const DownloadAction = (props: Props) => {
    const { playbackId, trackId } = props;

    const trackUrl = 
        `https://stream.mux.com/${ playbackId }/text/${ trackId }.vtt`;

    return (
        <Link href={ trackUrl } target="_blank" legacyBehavior>
            <Button as="a">
                Download <PiDownload />
            </Button>
        </Link>
    );
};

export default DownloadAction;