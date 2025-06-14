export interface Users {
    id: number;
    name: string;
    username: string;
    role: string;
    avatar: string;
    password: string;
}

export interface Products {
    id: number;
    name: string;
    description: string;
    highlight?: string;
    photo: string;
    price: number;
    discount?: number;
    discountPrice?: number;
    stock: number;
    weight: number;
    type: string;
}

export interface RoastedBeansProduct extends Products {
    technicalSpecification: {
        origin: string;
        process: string;
    };

    testNotes: string;

    servingRecommendation: Array<{
        name: string;
        description: string;
    }>;

    packaging: {
        package: string;
        roastDate: string;
        bestBefore: string;
    };
}

export interface GreenBeansProduct extends Omit<Products,
    "stock"
> {
    technicalSpecification: {
        origin: string;
        elevation: number;
        process: string;
        moistureContent: number;
        density: number;
        defect: string;
        screenSize: number;
    };

    roastPotential: {
        roastLevel: string;
        flavorDescription: string;  
    };

    qcReport: {
        waterActivity: number;
        quakers: number;
        cuppingPotential: number;
    };
}

export interface ToolsProduct extends Products {
    mainFeature: Array<{
        emoji: string;
        name: string;
        description: string;
    }>;

    technicalSpecification: {
        material: string;
        capacity: string;
        settings: string;
        accessories: string;
    };

    packaging: {
        package: string;
    };
}

export interface Reviews {
    id: number;
    productId: number;
    name: string;
    location: string;
    rating: number;
    content: string;
    date: string;
    isHidden: boolean;
}