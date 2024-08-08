interface IEvent {
    _id?: any;
    location: string;
    eventName: string;
    eventAcronym: string;
    eventDescription: string;
    eventImages: string[];
    sponsorImages: string[];
    videoUrl?: string;
    tags: [string];
    startdate: any;
    enddate: any;
    startHour: string;
    endHour: string;
    mobile: string;
    website: string;
    linkInscription: string;
    type: string;
    Categorie: string;
    accessibilite: string;
    portee: string;
    public: string;
    lieu: string;
    organizerId: any;
    status: string;
}
export type { IEvent };