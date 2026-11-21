export interface Image {
    name: string;
    url?: string;
    wasClicked: boolean;
}

export interface Card {
    name: string;
    url?: string;
    
    onClick: () => void;
}