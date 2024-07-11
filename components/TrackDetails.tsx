import type Mux from "@mux/mux-node";
import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import DeleteAction from "./DeleteAction";

interface Props {
    assetId: string,
    track: Mux.Video.Track
}

export const TrackDetails = (props: Props) => {
    const { assetId, track } = props;

    if (!track.id) { return; }

    const isDeletable = track.type == "text" ||
        (track.type == "audio" && !track.primary);

    return (
        <AccordionItem>
            <AccordionButton>
                { track.type }
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
                { JSON.stringify(track) }
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