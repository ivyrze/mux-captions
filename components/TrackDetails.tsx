import type Mux from "@mux/mux-node";
import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import DeleteAction from "./DeleteAction";
import DownloadAction from "./DownloadAction";

interface Props {
    assetId: string,
    playbackId: string,
    track: Mux.Video.Track
}

export const TrackDetails = (props: Props) => {
    const { assetId, playbackId, track } = props;

    if (!track.id) { return; }

    const isDeletable = track.type == "text" ||
        (track.type == "audio" && !track.primary);
    const isDownloadable = track.type == "text" &&
        track.status == "ready";

    return (
        <AccordionItem>
            <AccordionButton>
                { track.type }
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
                { JSON.stringify(track) }
                { isDownloadable && (
                    <DownloadAction
                        playbackId={ playbackId }
                        trackId={ track.id }
                    />
                ) }
                { isDeletable && (
                    <DeleteAction
                        assetId={ assetId }
                        trackId={ track.id }
                    />
                ) }
            </AccordionPanel>
        </AccordionItem>
    );
};

export default TrackDetails;