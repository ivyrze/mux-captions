import type Mux from "@mux/mux-node";
import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";

interface Props {
    track: Mux.Video.Track
}

export const TrackDetails = (props: Props) => {
    const { track } = props;

    if (!track.id) { return; }

    return (
        <AccordionItem>
            <AccordionButton>
                { track.type }
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
                { JSON.stringify(track) }
            </AccordionPanel>
        </AccordionItem>
    );
};

export default TrackDetails;