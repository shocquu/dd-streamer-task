import { Platform } from '../shared/enums';

type ChipProps = {
    label: string;
};

const Chip = ({ label }: ChipProps) => {
    const getPlatformColor = (platform: string) => {
        switch (platform.toLowerCase()) {
            case Platform.Twitch.toLowerCase():
                return 'text-twitch border-twitch';
            case Platform.Youtube.toLowerCase():
                return 'text-youtube border-youtube';
            case Platform.Tiktok.toLowerCase():
                return 'text-tiktok border-tiktok';
            case Platform.Kick.toLowerCase():
                return 'text-kick border-kick';
            case Platform.Rumble.toLowerCase():
                return 'text-rumble border-rumble';
            default:
                return 'text-blue-900 border-blue-400';
        }
    };

    return (
        <span
            className={`${getPlatformColor(
                label
            )} bg-white dark:bg-gray-900 text-blue-800 opacity-80 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border`}>
            {label}
        </span>
    );
};

export default Chip;
