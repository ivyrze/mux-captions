import useSWR from "swr";
import type Mux from "@mux/mux-node";
import { swrFetcher } from "@/app/util";
import { Accordion, Spinner } from "@chakra-ui/react";
import { PiCalendar, PiClock, PiCrop, PiFile, PiFileVideo, PiResize, PiTimer } from "react-icons/pi";
import { DurationFormat } from '@formatjs/intl-durationformat';
import VideoThumbnail from "./VideoThumbnail";
import TrackDetails from "./TrackDetails";
import UploadAction from "./UploadAction";
import styles from "../styles/components/VideoDetails.module.css";

interface Props {
    assetId: string
}

export const VideoDetails = (props: Props) => {
    const { assetId } = props;

    const {
        data: response
    } = useSWR<{ data: Mux.Video.Asset }>(
        `/api/assets/${ assetId }`,
        swrFetcher
    );

    if (!response) {
        return <Spinner />;
    }

    const video = response.data;
    const playbackId = video.playback_ids?.[0].id ?? '';

    const durationFormatter = new DurationFormat('en-US', {
        style: 'digital'
    });
    const durationFormatted = durationFormatter.format({
        seconds: Math.floor(video.duration ?? 0)
    });
    const createdAt = new Date(parseInt(video.created_at ?? '0') * 1000);
    const createdAtFormatted = createdAt.toLocaleString();

    return (
        <>
            <VideoThumbnail playbackId={ playbackId } />

            <h2 className={ styles['video-details__heading'] }>
                Metadata
            </h2>
            <ul className={ styles['video-details__metadata'] }>
                <li>
                    <PiFile />
                    <span className={ styles['video-details__metadata-label'] }>
                        Asset ID:
                    </span>
                    { assetId }
                </li>
                <li>
                    <PiFileVideo />
                    <span className={ styles['video-details__metadata-label'] }>
                        Playback ID:
                    </span>
                    { playbackId }
                </li>
                <li>
                    <PiClock />
                    <span className={ styles['video-details__metadata-label'] }>
                        Duration:
                    </span>
                    { durationFormatted }
                </li>
                <li>
                    <PiResize />
                    <span className={ styles['video-details__metadata-label'] }>
                        Max Resolution:
                    </span>
                    { video.max_resolution_tier }
                </li>
                <li>
                    <PiTimer />
                    <span className={ styles['video-details__metadata-label'] }>
                        Frame Rate:
                    </span>
                    { video.max_stored_frame_rate }
                </li>
                <li>
                    <PiCrop />
                    <span className={ styles['video-details__metadata-label'] }>
                        Aspect Ratio:
                    </span>
                    { video.aspect_ratio }
                </li>
                <li>
                    <PiCalendar />
                    <span className={ styles['video-details__metadata-label'] }>
                        Uploaded On:
                    </span>
                    { createdAtFormatted }
                </li>
            </ul>

            <h2 className={ styles['video-details__heading'] }>
                Tracks
            </h2>
            <Accordion
                className={ styles['video-details__tracks'] }
                allowMultiple={ true }
            >
                { video?.tracks?.map(track => (
                    <TrackDetails
                        key={ track.id }
                        playbackId={ playbackId }
                        assetId={ assetId }
                        track={ track }
                    />
                )) }
            </Accordion>
            <UploadAction assetId={ assetId } />
        </>
    );
};

export default VideoDetails;