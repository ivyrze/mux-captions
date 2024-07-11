import type Mux from '@mux/mux-node';
import Link from 'next/link';
import { Button } from '@chakra-ui/react';
import { DurationFormat } from '@formatjs/intl-durationformat';
import VideoThumbnail from './VideoThumbnail';
import { PiCalendar, PiClock, PiPencil } from 'react-icons/pi';

interface Props {
    video: Mux.Video.Asset
}

export const VideoPreview = (props: Props) => {
    const { video } = props;

    const durationFormatter = new DurationFormat('en-US', {
        style: 'digital'
    });
    const durationFormatted = durationFormatter.format({
        seconds: Math.floor(video.duration ?? 0)
    });
    const createdAt = new Date(parseInt(video.created_at) * 1000);
    const createdAtFormatted = createdAt.toISOString().substring(0, 10);

    return (
        <div>
            <VideoThumbnail playbackId={ video.playback_ids?.[0].id } />
            <div>
                { video.id }
            </div>
            <div>
                <span><PiClock /> { durationFormatted }</span>
                <span><PiCalendar /> { createdAtFormatted }</span>
            </div>
            <div>
                <Link href={ `/assets/${ video.id }` } passHref legacyBehavior>
                    <Button as="a">
                        <PiPencil /> Details
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default VideoPreview;