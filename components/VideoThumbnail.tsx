interface Props {
    playbackId?: string
}

export const VideoThumbnail = (props: Props) => {
    const { playbackId } = props;

    if (!playbackId) { return null; }

    const animatedSrc = `https://image.mux.com/${ playbackId }/animated.gif`;

    return (
        <img src={ animatedSrc } />
    );
};

export default VideoThumbnail;