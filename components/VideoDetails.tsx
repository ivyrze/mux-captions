import useSWR from "swr";
import type Mux from "@mux/mux-node";
import { swrFetcher } from "@/app/util";
import { Accordion, Spinner } from "@chakra-ui/react";
import { PiCalendar, PiClock, PiCrop, PiFile, PiFileVideo, PiResize, PiTimer } from "react-icons/pi";
import { DurationFormat } from '@formatjs/intl-durationformat';
import VideoThumbnail from "./VideoThumbnail";
import TrackDetails from "./TrackDetails";
import UploadAction from "./UploadAction";

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
    const playbackId = video.playback_ids?.[0].id;

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

            <h2>Metadata</h2>
            <div>
                <div><PiFile /> Asset ID: { assetId }</div>
                <div><PiFileVideo /> Playback ID: { playbackId }</div>
                <div><PiClock /> Duration: { durationFormatted }</div>
                <div><PiResize /> Max Resolution: { video.max_resolution_tier }</div>
                <div><PiTimer /> Frame Rate: { video.max_stored_frame_rate }</div>
                <div><PiCrop /> Aspect Ratio: { video.aspect_ratio }</div>
                <div><PiCalendar /> Uploaded On: { createdAtFormatted }</div>
            </div>

            <h2>Tracks</h2>
            <Accordion allowMultiple={ true }>
                { video?.tracks?.map(track => (
                    <TrackDetails
                        key={ track.id }
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