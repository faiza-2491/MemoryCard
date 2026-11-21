export interface Image {
    name: string;
    id: string;
    url?: string;
    wasClicked: boolean;
}

export interface ImageData {
    about: string;
    images: Image[];
}

export interface Card {
    name: string;
    url?: string;
    onClick: () => void;
}