export declare const metaSchema: {
    id: string;
    type: string;
    required: string[];
    properties: {
        componentType: {
            type: string;
        };
        group: {
            type: string;
        };
        name: {
            type: string;
        };
        imageUrl: {
            type: string;
        };
        title: {
            type: string;
        };
        editor: {
            type: string;
            properties: {
                groups: {
                    type: string;
                    items: {
                        type: string;
                        properties: {
                            props: {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        path: {
                                            type: string;
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
