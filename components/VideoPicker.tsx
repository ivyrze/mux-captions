import useSWR from "swr";
import { swrFetcher } from "@/app/util";
import { useState } from "react";
import { Button, Spinner } from "@chakra-ui/react";
import VideoPreview from "./VideoPreview";
import type Mux from '@mux/mux-node';

export const VideoPicker = () => {
    const [ page, setPage ] = useState(1);

    const params = new URLSearchParams();
    params.set('page', page.toString());

    const { 
        data: response
    } = useSWR<Mux.BasePage<Mux.Video.Asset>>(
        `/api/assets?${ params }`,
        swrFetcher
    );

    if (!response) {
        return <Spinner />;
    }

    return (
        <>
            { response?.data.map(video => (
                <VideoPreview key={ video.id } video={ video } />
            )) }
            <div>
                <Button
                    onClick={ () => setPage(page - 1) }
                    disabled={ page === 1 }
                >
                    Prev
                </Button>
                { page }
                <Button
                    onClick={ () => setPage(page + 1) }
                >
                    Next
                </Button>
            </div>
        </>
    )
};

export default VideoPicker;