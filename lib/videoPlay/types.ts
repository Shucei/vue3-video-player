interface IVideoPlay {
    play(): void;
    pause(): void;
    stop(): void;
    seek(time: number): void;
    setVolume(volume: number): void;
    getVolume(): number;
    getDuration(): number;
    getCurrentTime(): number;
    getBuffered(): number;
    getBufferedTime(): number;
    getBufferedTimeRange(): number[];
    getBufferedRanges(): number[][];
    getBufferedRangesTime(): number[][];
    getBufferedRangesTimeRange(): number[][]
}
