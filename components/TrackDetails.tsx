import type Mux from "@mux/mux-node";
import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import DeleteAction from "./DeleteAction";
import DownloadAction from "./DownloadAction";
import { PiMusicNotes, PiSubtitles, PiVideoCamera } from "react-icons/pi";
import styles from "../styles/components/TrackDetails.module.css";

interface Props {
    assetId: string,
    playbackId: string,
    track: Mux.Video.Track
}

export const TrackDetails = (props: Props) => {
    const { assetId, playbackId, track } = props;

    if (!track.id) { return; }

    const isGenerated = track.type == "text" &&
        track.text_source?.startsWith("generated");
    const isDeletable = track.type == "text" ||
        (track.type == "audio" && !track.primary);
    const isDownloadable = track.type == "text" &&
        track.status == "ready";

    return (
        <AccordionItem>
            <AccordionButton className={ styles['track-details__disclosure'] }>
                <span className={ styles['track-details__type'] }>
                    { track.type == "video" ? (
                        <PiVideoCamera />
                    ) : track.type == "audio" ? (
                        <PiMusicNotes />
                    ) : (
                        <PiSubtitles />
                    ) }
                    { track.type }
                    { isGenerated && ' (autogen)' }
                </span>
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