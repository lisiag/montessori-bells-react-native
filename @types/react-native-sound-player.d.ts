declare module 'react-native-sound-player' {
    declare const _default: {
        playSoundFile: (name: string, type: string) => void;
        loadSoundFile: (name: string, type: string) => void;
        playUrl: (url: string) => void;
        loadUrl: (url: string) => void;
        onFinishedPlaying: (callback: (success: boolean) => any) => void;
        onFinishedLoading: (callback: (success: boolean) => any) => void;
        addEventListener: (eventName: 'FinishedLoading' | 'FinishedPlaying' | 'FinishedLoadingURL' | 'FinishedLoadingFile', callback: any) => any;
        play: () => void;
        pause: () => void;
        resume: () => void;
        stop: () => void;
        seek: (seconds: number) => void;
        setVolume: (volume: number) => void;
        setSpeaker: (on: boolean) => void;
        getInfo: () => Promise<any>;
        unmount: () => void;
    };
    export default _default;
}
