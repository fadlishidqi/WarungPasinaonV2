export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Book {
    id: number;
    title: string;
    slug: string;
    author: string;
    description: string;
    cover_image?: string;
    cover_url?: string;
    pdf_file: string;
    pdf_url: string;
    category: 'fiksi' | 'non-fiksi' | 'pendidikan' | 'sejarah' | 'teknologi' | 'agama';
    isbn?: string;
    pages?: number;
    published_year?: number;
    publisher?: string;
    status: 'draft' | 'published';
    download_count: number;
    file_size?: string;
    tags?: string[];
    created_at: string;
    updated_at: string;
}

export interface PaginatedBooks {
    data: Book[];
    links: PaginationLink[];
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

export interface PaginationLink {
    url?: string;
    label: string;
    active: boolean;
}

export interface BookFilters {
    search?: string;
    category?: string;
}

export interface BookCategories {
    [key: string]: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};