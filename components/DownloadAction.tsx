import type Mux from "@mux/mux-node";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import { PiDownload } from "react-icons/pi";

interface Props {
    playbackId: string,
    trackId: string
}

export const DownloadAction = (props: Props) => {
    const { playbackId, trackId } = props;

    const router = useRouter();
    const downloadTrack = () => router.push(
        `https://stream.mux.com/${ playbackId }/text/${ trackId }.vtt`
    );

    return (
        <Button onClick={ downloadTrack }>
            Download <PiDownload />
        </Button>
    );
};

export default DownloadAction;